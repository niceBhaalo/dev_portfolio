pipeline {
	agent any
	environment {
        GIT_CREDENTIALS_ID = '2010b226-8d51-49e7-a799-7742b0378723' // Replace with your credentials ID
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
					echo 'Hello'
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                      userRemoteConfigs: [[url: 'https://github.com/niceBhaalo/dev_portfolio', 
                                           credentialsId: env.GIT_CREDENTIALS_ID]]])
					sh 'ls -la'
					withCredentials([usernamePassword(credentialsId: 'mongo-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
						writeFile file: '.env', text: "USERNAME=${env.USERNAME}\nPASSWORD=${env.PASSWORD}"
					}
					sh 'cat .env'
                }
            }
        }
	}
}
