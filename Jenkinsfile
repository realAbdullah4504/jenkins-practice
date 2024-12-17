pipeline {
    agent { 
        docker { 
            image 'python:3.12-slim' 
            args '-v /usr/bin/scp:/usr/bin/scp -v /usr/bin/ssh:/usr/bin/ssh -v /usr/bin/ssh-keyscan:/usr/bin/ssh-keyscan'
        } 
    }
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
        withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2', keyFileVariable: 'SSH_PRIVATE_KEY')]) {
            sh '''
            # Set up SSH and Known Hosts
            mkdir -p /root/.ssh
            chmod 700 /root/.ssh
            ssh-keyscan -H $EC_SERVER >> /root/.ssh/known_hosts
            chmod 644 /root/.ssh/known_hosts

            # Create remote directory and copy files
            ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER "mkdir -p ~/news-app-backend"
            scp -i $SSH_PRIVATE_KEY -r backend/ ubuntu@$EC_SERVER:~/news-app-backend/
            '''
        }
    }
}

        stage('Install Dependencies and Run App') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2', keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                    sh '''
                    # Install dependencies and start app in one SSH session
                    ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER "
                        cd ~/news-app-backend &&
                        pip install -r requirements.txt &&
                        python3 article_api.py
                    "
                    '''
                }
            }
        }
    }
}
