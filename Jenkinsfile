pipeline {
    agent { docker { 
        image 'node:16-alpine' 
        args '-v /usr/bin/scp:/usr/bin/scp -v /usr/bin/ssh:/usr/bin/ssh'
        } }
    environment {
        CI = 'false'
    }
    stages {
        stage ('Build') {
            steps {
                sh '''
                echo "hello" > a.txt
                '''
            }
            post {
                success {
                    sh "pwd"
                    stash includes: '**', name: 'build'
                }
            }
        }
        stage ('Deploy') {
            steps {
                unstash 'build'
                sh 'ls -la'
                sh 'pwd'
                sh 'echo $WORKSPACE'
                withCredentials([sshUserPrivateKey(credentialsId:'jenkins-agent',keyFileVariable:'SSH_PRIVATE_KEY')]) {
                sh'''
                cat $SSH_PRIVATE_KEY
                ssh-keyscan -H 172.27.142.51 >> ~/.ssh/known_hosts
                scp -i $SSH_PRIVATE_KEY -r ./ abdullah@172.27.142.51:~/test
                '''
                }
            }
        }
    }
}