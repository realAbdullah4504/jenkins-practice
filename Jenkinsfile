pipeline {
    agent { docker { 
        image 'node:16-alpine' 
        args '-v /usr/bin/scp:/usr/bin/scp -v /usr/bin/ssh:/usr/bin/ssh -v /usr/bin/ssh-keyscan:/usr/bin/ssh-keyscan'
        } }
    environment {
        CI = 'false'
        EC_SERVER_DEV = credentials("EC_SERVER_DEV")
    }
    options {
        timeout(time: 1, unit: 'HOURS')
        disableConcurrentBuilds()
    }
    stages {
        stage('Copy App') {
            steps {
                script {
                    try {
                        withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2',keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                            sh '''
                                set -e  # Exit on any error
                                # Debug: List contents of current directory
                                tar -czvf backend.tar.gz  -C backend .
                                pwd
                                ls -la
                                # Deploy files
                                mkdir -p ~/.ssh
                                chmod 700 ~/.ssh
                                ssh-keyscan -H $EC_SERVER_DEV >> ~/.ssh/known_hosts 
                                chmod 600 ~/.ssh/known_hosts
                                
                                # Check if connection is possible before proceeding
                                ssh -i $SSH_PRIVATE_KEY -o BatchMode=yes ubuntu@$EC_SERVER_DEV "echo 'Connection successful'"
                                
                                ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "if [ ! -d ~/news-app-backend ]; then mkdir -p ~/news-app-backend; fi"
                                ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "rm -rf ~/news-app-backend/*"
                                scp -i $SSH_PRIVATE_KEY -r backend.tar.gz ubuntu@$EC_SERVER_DEV:~/news-app-backend/
                                ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "cd ~/news-app-backend && tar xzf backend.tar.gz && rm backend.tar.gz"
                            '''
                        }
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error "Failed in Copy App stage: ${e.message}"
                    }
                }
            }
        }
        stage ('Install Dependencies') {
            steps { 
                script {
                    try {
                        withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2',keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                            sh '''
                                set -e  # Exit on any error
                                # Create and activate virtual environment
                                ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "cd news-app-backend && python3 -m venv venv"
                                # Check if .env already exists before creating
                                ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "cd news-app-backend && if [ ! -f .env ]; then echo 'MONGO_URI=mongodb://localhost:27017/' >> .env; fi"
                                
                                # Install dependencies
                                ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "cd news-app-backend && source venv/bin/activate && pip install -r requirements.txt"
                                
                                # Check if pm2 is installed
                                ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "which pm2 || npm install -g pm2"
                                
                                # Stop existing process if running
                                ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "pm2 stop article_api.py || true"
                                
                                # Start the application
                                ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "cd news-app-backend && source venv/bin/activate && pm2 start article_api.py --interpreter python3"
                            '''
                        }
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error "Failed in Install Dependencies stage: ${e.message}"
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        failure {
            echo 'Pipeline failed! Sending notification...'
        }
        success {
            echo 'Pipeline succeeded!'
        }
    }
}
