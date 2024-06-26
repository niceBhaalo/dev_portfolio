const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const { Readable } = require('stream');
require('dotenv').config(); // Make sure this is included at the top

let db;
let gfs;

const uri = process.env.MONGODB_URI || 'mongodb://dp_mongo:27017';
const dbName = process.env.DB_NAME || 'signatures';
async function connectToMongoDB() {
	console.log("USERNAME ROUTES: ", process.env.MONGO_INITDB_ROOT_USERNAME);
    try {
        const client = new MongoClient(uri, 
        { 
			useNewUrlParser: true, 
			useUnifiedTopology: true,
			auth: {
				username: process.env.MONGO_INITDB_ROOT_USERNAME,
				password: process.env.MONGO_INITDB_ROOT_PASSWORD
			}
		 });
        await client.connect();
        console.log('Connected to MongoDB using MongoClient');
        db = client.db(dbName);
        bucket = new GridFSBucket(db, { bucketName: 'uploads' });

        gfs = Grid(db, MongoClient);
        gfs.collection('uploads');
	} catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

connectToMongoDB().catch(error => {
    console.error('Error initializing MongoDB connection:', error);
    process.exit(1);
});

// Use Mongoose for GridFS and other Mongoose-specific operations
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

conn.once('open', () => {
    console.log('Connected to MongoDB using Mongoose');
    // Only initialize gfs if it has not been initialized already
    if (!gfs) {
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
    }
});

// Create storage engine for Multer
const storage = multer.memoryStorage();




router.post('/store-signature', async (req, res) => {
    try {		
        const { name, date } = req.body;
        if (!name || !date) {
            return res.status(400).json({ error: 'Name and date of birth are required' });
        }
		const [year, month, day] = date.split('-').map(Number);
		await db.collection('user_data').insertOne({ name, date, day, month, year });
        res.status(201).json({ message: 'Entry stored successfully' });
    } catch (error) {
        console.error('Error storing data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/get-total-number', async (req, res) => {
	try {
		const totalNumber = await db.collection('user_data').countDocuments();
		res.json({ total: totalNumber });
	} catch (error) {
		console.error('Error fetching data');
        res.status(500).json({ error: 'Internal server error' });
	}
});
router.post('/get-first-entry', async (req, res) => {
	try {
        const data = await db.collection('user_data').findOne({}, { sort: { _id: 1 } });
        if (!data) {
            return res.status(404).json({ error: 'No data found' });
        }
        res.json(data);
	} catch (error) {
		console.error('Error fetching data');
        res.status(500).json({ error: 'Internal server error' });
	}
});
router.post('/get-last-entry', async (req, res) => {
	try {
        const data = await db.collection('user_data').findOne({}, { sort: { _id: -1 } });
        if (!data) {
            return res.status(404).json({ error: 'No data found' });
        }
        res.json(data);
	} catch (error) {
		console.error('Error fetching data');
        res.status(500).json({ error: 'Internal server error' });
	}
});
router.post('/get-names', async (req, res) => {
    try {
        const { name } = req.body;
	
        const data = await db.collection('user_data').find({ name: name }).toArray();
        if (data.length === 0) {
            return res.json([]);
        } else if (!data) {
            return res.status(404).json({ error: 'No data found' });
		}
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/get-dates', async (req, res) => {
    try {	
		const { day, month, year } = req.body; 
		let query = {};
		if (year) {
		  query['year'] = parseInt(year); 
		}
		if (month) {
		  query['month'] = parseInt(month);
		}
		if (day) {
		  query['day'] = parseInt(day); 
		}
		console.log(query);

		const data = await db.collection('user_data').find(query).toArray();
		console.log(data);
        if (data.length === 0) {
            return res.json([]);
        } else if (!data) {
			return res.status(404).json({ error: 'No data found' });
		}
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/get-polls', async (req, res) => {
    try {
		const data = await db.collection('polls').find({}).toArray();
		res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/submit-poll', async (req, res) => {
    try {
        const { pollId, selectedOption } = req.body;
        const objectIdPollId = new mongoose.Types.ObjectId(pollId);
        const pollResult = await db.collection('poll_results').findOne({ poll_id: objectIdPollId });
        if (!pollResult) {
            return res.status(404).json({ error: 'Poll result not found' });
        }
        const selectedOptionLowerCase = selectedOption.toLowerCase();
        if (!pollResult.option_counts.hasOwnProperty(selectedOptionLowerCase)) {
            return res.status(400).json({ error: 'Selected option not found' });
        }
        pollResult.option_counts[selectedOptionLowerCase]++;
        await db.collection('poll_results').updateOne(
            { poll_id: objectIdPollId },
            { $set: { option_counts: pollResult.option_counts } }
        );
        console.log(typeof pollResult.option_counts);
        console.log(pollResult.option_counts);
        res.json(pollResult.option_counts);
    } catch (error) {
        console.error('Error submitting poll:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/get-poll-results', async (req, res) => {
	console.log("Request Received");
    try {
        const { pollId } = req.body;
        const objectIdPollId = new mongoose.Types.ObjectId(pollId);
        const pollResult = await db.collection('poll_results').findOne({ poll_id: objectIdPollId });
        if (!pollResult) {
            return res.status(404).json({ error: 'Poll result not found' });
        }
        console.log(pollResult.option_counts);
        res.json(pollResult.option_counts);
    } catch (error) {
        console.error('Error submitting poll:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/db-login', async (req, res) => {
  const formData = req.body;
  try {
    const passwordDocument = await db.collection('Passwords').findOne({ databaseID: formData.databaseID });
    if (passwordDocument) {
      const passwordMatch = await bcrypt.compare(formData.password, passwordDocument.password);
      if (passwordMatch) {
        // Passwords match, user is authenticated
        res.status(200).json({ authenticatedUser: formData.databaseID });
      } else {
        // Passwords don't match
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      // No document found with the specified databaseID
      res.status(404).json({ error: 'DatabaseID not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/db-signup', async (req, res) => {
  const formData = req.body;
  try {
    // Check if a document with the specified databaseID already exists
    const existingDatabase = await db.collection('Passwords').findOne({ databaseID: formData.databaseID });
    if (existingDatabase) {
      // DatabaseID already exists, return an error
      res.status(400).json({ error: 'DatabaseID already exists' });
    } else {
      // DatabaseID does not exist, hash the password and create a new document
      const hashedPassword = await bcrypt.hash(formData.password, 10); // Hash the password
      await db.collection('Passwords').insertOne({ databaseID: formData.databaseID, password: hashedPassword });
      res.status(201).json({ authenticatedUser: formData.databaseID });
    }
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const upload = multer();

router.post('/new-entry', upload.single('picture'), async (req, res) => {
    try {
		console.log(req.body);
        const { formData, databaseID, uniqueKey } = req.body;
        const parsedFormData = JSON.parse(formData);
        console.log("FORM DATA: ", formData);
        console.log("Parsed Form Data: ", parsedFormData);

        if (req.file) {
            const readStream = new Readable();
            readStream.push(req.file.buffer);
            readStream.push(null);

            const uploadStream = bucket.openUploadStream(req.file.originalname);

            readStream.pipe(uploadStream)
                .on('error', (error) => {
                    console.error('Error uploading file:', error);
                    res.status(500).send('Error uploading file');
                })
                .on('finish', async (file) => {
                    console.log('File upload successful');
                    const fileID = file._id;
                    parsedFormData.picture = fileID.toString();
                    console.log(parsedFormData.picture);

                    if (uniqueKey && uniqueKey !== 'undefined') {
                        const result = await db.collection('Databases').updateOne(
                            { UniqueKey: uniqueKey, DatabaseID: databaseID },
                            { $set: { JSONObject: parsedFormData } }
                        );
                        if (result.matchedCount > 0) {
                            res.status(200).send(parsedFormData);
                        } else {
                            res.status(404).send('Entry not found.');
                        }
                    } else {
                        const newUniqueKey = uuidv4();
                        await db.collection('Databases').insertOne({
                            UniqueKey: newUniqueKey,
                            DatabaseID: databaseID,
                            JSONObject: parsedFormData
                        });
                        res.status(201).send(parsedFormData);
                    }
                });
        } else {
            if (uniqueKey && uniqueKey !== 'undefined') {
                const result = await db.collection('Databases').updateOne(
                    { UniqueKey: uniqueKey, DatabaseID: databaseID },
                    { $set: { JSONObject: parsedFormData } }
                );
                if (result.matchedCount > 0) {
                    res.status(200).send(parsedFormData);
                } else {
                    res.status(404).send('Entry not found.');
                }
            } else {
                const newUniqueKey = uuidv4();
                await db.collection('Databases').insertOne({
                    UniqueKey: newUniqueKey,
                    DatabaseID: databaseID,
                    JSONObject: parsedFormData
                });
                res.status(201).send(parsedFormData);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred.');
    }
});




router.post('/get-documents', async (req, res) => {
  const { databaseID } = req.body;

  try {
    const documents = await db.collection('Databases').find({ DatabaseID: databaseID }).toArray();
    
    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching documents.');
  }
});
router.post('/delete-documents', async (req, res) => {
  const { databaseID, uniqueKey } = req.body;
  try {
    const result = await db.collection('Databases').deleteOne({ DatabaseID: databaseID, UniqueKey: uniqueKey });

    if (result.deletedCount === 1) {
      res.status(200).send({ message: 'Document successfully deleted.' });
    } else {
      res.status(404).send({ message: 'Document not found.' });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).send({ message: 'Internal server error.' });
  }
});


router.post('/get-image', async (req, res) => {
    const { fileID } = req.body;
    try {
        if (fileID === '') {
            return res.status(400).send('Invalid file ID');
        }
        if (!ObjectId.isValid(fileID)) {
            return res.status(400).send('Invalid file ID');
        }

        const _id = new ObjectId(fileID);
        const file = await db.collection('uploads.files').findOne({ _id });

        if (!file) {
            return res.status(404).send('File not found');
        }

        const downloadStream = bucket.openDownloadStream(_id);
        res.set('Content-Type', file.contentType);
        downloadStream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving the image.');
    }
});

module.exports = router;
