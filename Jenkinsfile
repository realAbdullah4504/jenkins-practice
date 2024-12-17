pipeline {
    agent { docker { 
        image 'node:16-alpine' 
        args '-v /usr/bin/scp:/usr/bin/scp -v /usr/bin/ssh:/usr/bin/ssh -v /usr/bin/ssh-keyscan:/usr/bin/ssh-keyscan -v /tmp/.cache:/tmp/.cache'
        } }
    environment {
        CI = 'false'
        EC_SERVER="ec2-3-110-196-87.ap-south-1.compute.amazonaws.com"
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
                npm run build
                '''
            }
            post {
                success {
                    dir("react/") {  //changing the current directory
                    sh "pwd"
                    sh "tar -cvf build.tar build/*"
                    stash includes: 'build.tar', name: 'build'
                    }
                }
            }
        }
        stage ('Deploy') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2', keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                    dir("react") {
                        sh '''
                        # Debug: List contents of current directory
                        pwd
                        unstash "build"  # Unstash the build file
                        ls -la
                        # Deploy files
                        mkdir -p ~/.ssh
                        ssh-keyscan -H $EC_SERVER >> ~/.ssh/known_hosts 
                        scp -i $SSH_PRIVATE_KEY build.tar ubuntu@$EC_SERVER:/var/www/news-app/
                        # Debug: List contents of remote directory
                        ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER "cd /var/www/news-app && tar xzf build.tar && rm build.tar"
                        ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER "ls -la /var/www/news-app/"
                        ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER 'systemctl status nginx'
                        '''
                    }
                }
            }
            post {
                always {
                    cleanWs()
                }
            }
        }
    }
}