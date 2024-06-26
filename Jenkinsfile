pipeline {
	agent any
	environment {
        GIT_CREDENTIALS_ID = '2010b226-8d51-49e7-a799-7742b0378723' // Replace with your credentials ID
        NODEJS_INSTALLATION = 'npmNexus'
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
        stage('Creating Docker Containers') {
			steps {
				script {
					sh 'pwd'
					sh 'docker-compose -f docker-compose-jenkins.yml up -d'
				}
			}
        }
        stage ('Closing Up') {
			steps {
				script {
					sh 'docker-compose down'
				}
			}
        
        }
        stage('Making Build') {
			steps {
				script {
					dir('front_end') {
						nodejs(nodeJSInstallationName: env.NODEJS_INSTALLATION, configId: 'nodejs') {	
							sh 'pwd'
							sh 'npm -v'
							sh 'npm run build'
						}
					}
					// Archive the build artifact (assuming the artifact is in the 'build' directory)
					archiveArtifacts artifacts: 'front_end/build/**', allowEmptyArchive: false
					sh 'cd front_end/build && zip -r dev_portfolio_artifact.zip *'

					// Upload the artifact to the Nexus repository
					nexusArtifactUploader artifacts: [[
						artifactId: 'dev_portfolio',
						classifier: '',
						file: 'front_end/build/dev_portfolio_artifact', // Path to the artifact file
						type: 'zip'
					]],
					credentialsId: 'jenkinsNexusID', // Nexus credentials stored in Jenkins
					groupId: 'fazeel',
					nexusUrl: 'http://nexus:8081',
					nexusVersion: 'nexus3',
					protocol: 'http',
					repository: 'dev_portfolio_artifacts',
					version: '1.0.0'
				}
			}
        }

	}
}
