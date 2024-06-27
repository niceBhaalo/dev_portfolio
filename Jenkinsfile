pipeline {
	agent any
	environment {
        GIT_CREDENTIALS_ID = '2010b226-8d51-49e7-a799-7742b0378723' // Replace with your credentials ID
        NODEJS_INSTALLATION = 'npmNexus'
		FRONT_VERSION = '1'
		BACK_VERSION = '1'
    }
    stages {
		stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }
		stage('Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                      userRemoteConfigs: [[url: 'https://github.com/niceBhaalo/dev_portfolio', 
                                           credentialsId: env.GIT_CREDENTIALS_ID]]])
					withCredentials([usernamePassword(credentialsId: 'mongo-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
						writeFile file: '.env', text: "MONGO_INITDB_ROOT_USERNAME=${env.USERNAME}\nMONGO_INITDB_ROOT_PASSWORD=${env.PASSWORD}"
						writeFile file: 'back_end./env', text: "MONGO_INITDB_ROOT_USERNAME=${env.USERNAME}\nMONGO_INITDB_ROOT_PASSWORD=${env.PASSWORD}"
					}
                }
            }
        }
        stage('Installing Libraries') {
			steps {
				script {
					dir('front_end') {
						nodejs(nodeJSInstallationName: env.NODEJS_INSTALLATION) {	
							sh 'npm install'
						}
					}
					dir('back_end') {
						nodejs(nodeJSInstallationName: env.NODEJS_INSTALLATION) {	
							sh 'npm install'
						}
					}
				}
			}
		}
        stage('Creating Docker Containers') {
			steps {
				script {
					sh 'pwd'
					 // sh 'docker-compose -f docker-compose-jenkins.yml up -d'
				}
			}
        }
        stage('Closing Up') {
			steps {
				script {
					sh 'pwd'
					// sh 'docker-compose down'
				}
			}
        }
        stage('Making Front End Build') {
			steps {
				script {
					dir('front_end') {
						nodejs(nodeJSInstallationName: env.NODEJS_INSTALLATION) {	
							sh 'CI=false npm run build'
							sh 'tar -czvf build.tar.gz build'
						}
					}
				}
			}
		}
		stage ('Uploading Front End Artifact') {
			steps {
				script {
					nexusArtifactUploader artifacts: [[
						artifactId: 'dev_portfolio',
						classifier: '',
						file: 'front_end/build.tar.gz', // Path to the artifact file
						type: 'tar'
					]],
					credentialsId: 'jenkinsNexusID', // Nexus credentials stored in Jenkins
					groupId: 'fazeel',
					nexusUrl: 'nexus:8081',
					nexusVersion: 'nexus3',
					protocol: 'http',
					repository: 'dev_portfolio_artifacts',
					version: '1.0.' + FRONT_VERSION
				}
			}
        }
        stage ('Packing Backend') {
			steps {
				script {
						'sh tar -czvf back_end.tar.gz back_end' 
				}
			}
        }
        stage ('Uploading Backend') {
			steps {
				script {
					nexusArtifactUploader artifacts: [[
						artifactId: 'dev_portfolio_back',
						classifier: '',
						file: 'back_end.tar.gz', // Path to the artifact file
						type: 'tar'
					]],
					credentialsId: 'jenkinsNexusID', // Nexus credentials stored in Jenkins
					groupId: 'fazeel',
					nexusUrl: 'nexus:8081',
					nexusVersion: 'nexus3',
					protocol: 'http',
					repository: 'dev_portfolio_artifacts',
					version: '1.0.' + BACK_VERSION
				}
			}
        }
	}
}
