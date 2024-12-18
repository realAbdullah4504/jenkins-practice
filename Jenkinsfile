pipeline {
    agent { docker { 
        image 'node:16-alpine' 
        args '-v /usr/bin/scp:/usr/bin/scp -v /usr/bin/ssh:/usr/bin/ssh -v /usr/bin/ssh-keyscan:/usr/bin/ssh-keyscan'
        } }
    environment {
        CI = 'false'
        EC_SERVER_DEV = credentials("EC_SERVER_DEV")
    }
    stages {
        stage('Copy App') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2',keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                    sh '''
                    # Debug: List contents of current directory
                    tar -czvf backend.tar.gz  -C backend .
                    pwd
                    ls -la
                    # Deploy files
                    mkdir -p ~/.ssh
                    ssh-keyscan -H $EC_SERVER_DEV >> ~/.ssh/known_hosts 
                    ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "mkdir -p ~/news-app-backend"
                    ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "rm -rf ~/news-app-backend/*"
                    scp -i $SSH_PRIVATE_KEY -r backend.tar.gz ubuntu@$EC_SERVER_DEV:~/news-app-backend/
                    ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "cd ~/news-app-backend && tar xzf backend.tar.gz && rm backend.tar.gz"
                    # Debug: List contents of remote directory
                    '''
                }
            }
            post {
                success{
                sh 'ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "cd news-app-backend && ls -a" '
                }
            }
        }
        // pip install -r requirements.txt && pip install "lxml[html_clean]
        stage ('Install Dependencies') {
            steps { 
                    withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2',keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                        sh '''
                        ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "cd news-app-backend && python -m venv venv && source venv/bin/activate"
                        ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "cd news-app-backend && echo 'MONGO_URI' >> .env"
                        ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "cd news-app-backend && pip install -r requirements.txt"
                        ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "cd news-app-backend && pm2 start article_api.py"
                        '''
                    }
                }
            }
            post {
                success {
                    sh 'ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "pm2 status"'
                    sh 'ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV "pm2 logs"'
                }
            }
    }
}