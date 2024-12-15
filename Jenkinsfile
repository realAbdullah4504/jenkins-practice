pipeline {
    agent { docker { 
        image 'node:16-alpine' 
        args '-v /usr/bin/scp:/usr/bin/scp -v /usr/bin/ssh:/usr/bin/ssh'
        } }
    environment {
        CI = 'false'
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
                    dir("react/build") {  //changing the current directory
                    sh "pwd"
                    stash includes: '**', name: 'build'
                    }
                }
            }
        }
        stage ('Deploy') {
            steps {
                // Create a directory for the build files
                sh 'mkdir -p deploy-build'
                dir('deploy-build') {
                    // Unstash into this directory
                    unstash 'build'
                    
                    withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-agent',keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                        sh '''
                            # Debug: List contents of current directory
                            pwd
                            ls -la
                            
                            # Deploy files
                            scp -i $SSH_PRIVATE_KEY -r ./* abdullah@172.27.142.51:/var/www/html/
                            # Debug: List contents of remote directory
                            ssh -i $SSH_PRIVATE_KEY abdullah@172.27.142.51 "ls -la /var/www/html/"
                        '''
                    }
                }
            }
        }
    }
}