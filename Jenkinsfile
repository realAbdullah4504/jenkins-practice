pipeline {
    agent { docker { 
        image 'node:16-alpine' 
        args '-v /usr/bin/scp:/usr/bin/scp -v /usr/bin/ssh:/usr/bin/ssh -v /usr/bin/ssh-keyscan:/usr/bin/ssh-keyscan'
        } }
    environment {
        CI = 'false'
    }
    options {
        preserveStashes()
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh '''
                cd react
                npm ci
                '''
            }
        }
        stage ('Build') {
            steps {
                sh '''
                cd react
                # npm run build
                '''
            }
            post {
                success {
                    dir("react/build") {  //changing the current directory
                    sh "pwd"
                    stash includes: '**', name: 'build'
                    }
                }
            }
        }
        stage ('Deploy') {
            steps { 
                    withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-agent',keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                    sh '''
                    # Debug: List contents of current directory
                    pwd
                    ls -la
                    # Deploy files
                    mkdir -p ~/.ssh
                    ssh-keyscan -H 172.27.142.51 >> ~/.ssh/known_hosts 
                    scp -i $SSH_PRIVATE_KEY -r react/deploy.tar.gz abdullah@172.27.142.51:/var/www/news-app/
                    # Debug: List contents of remote directory
                    ssh -i $SSH_PRIVATE_KEY abdullah@172.27.142.51 "cd /var/www/news-app &&  tar xzf deploy.tar.gz && rm deploy.tar.gz"
                    ssh -i $SSH_PRIVATE_KEY abdullah@172.27.142.51 "ls -la var/www/news-app/"
                    ssh -i $SSH_PRIVATE_KEY abdullah@172.27.142.51 'systemctl status nginx'
                    '''
                }
            }
        }
    }
}