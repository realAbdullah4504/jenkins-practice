pipeline {
    agent { docker { 
        image 'python:3.12.7-slim' 
        args '-v /usr/bin/scp:/usr/bin/scp -v /usr/bin/ssh:/usr/bin/ssh -v /usr/bin/ssh-keyscan:/usr/bin/ssh-keyscan'
        } }
    environment {
        CI = 'false'
        EC_SERVER = 'ec2-3-110-196-87.ap-south-1.compute.amazonaws.com'
    }
    options {
        preserveStashes()
    }
    stages {
        stage('Copy App') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2',keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                    sh '''
                    # Debug: List contents of current directory
                    pwd
                    ls -la
                    # Deploy files
                    mkdir -p ~/.ssh
                    ssh -i $SSH_PRIVATE_KEY ubuntu@$EC2_SERVER "mkdir -p ~/news-app/backend"
                    ssh-keyscan -H $EC2_SERVER >> ~/.ssh/known_hosts 
                    scp -i $SSH_PRIVATE_KEY -r backend/ ubuntu@$EC2_SERVER:~/news-app-backend/
                    # Debug: List contents of remote directory
                    
                    '''
                }
            }
        }
        // pip install -r requirements.txt && pip install "lxml[html_clean]
        stage ('Install Dependencies') {
            steps { 
                    withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2',keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                        sh '''
                        ssh -i $SSH_PRIVATE_KEY ubuntu@$EC2_SERVER "cd news-app-backend && pip install -r requirements.txt"
                        ssh -i $SSH_PRIVATE_KEY ubuntu@$EC2_SERVER "cd news-app-backend &&  python3 article_api.py"
                        '''
                    }
                }
            }
        }
    }
}