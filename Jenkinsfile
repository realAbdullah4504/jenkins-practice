pipeline {
    agent { docker { 
        image 'node:16-alpine' 
        args '-v /usr/bin/scp:/usr/bin/scp -v /usr/bin/ssh:/usr/bin/ssh -v /usr/bin/ssh-keyscan:/usr/bin/ssh-keyscan'
        // args '-v /usr/bin/scp:/usr/bin/scp'
        // args '--user root'
        } }
    environment {
        CI = 'false'
    }
    stages {
        stage ('Build') {
            steps {
                cache(maxCacheSize: 0, caches: [
                arbitraryFileCache(path: '*.txt', cacheValidityDecidingFile: 'b.txt')
                ]) {
                    sh '''
                    touch a.txt
                    cp b.txt a.txt
                    '''
                }
                    // build job: 'news-app', wait: true
            }
            post {
                success {
                    sh "pwd"
                    stash includes: '*.txt', name: 'build'
                }
            }
        }
        stage ('Deploy') {
            steps {
                unstash 'build'
                sh 'ls -la'
                sh 'pwd'
                sh 'echo $WORKSPACE'
                // sh 'apk add --no-cache openssh-client'
                sh 'ls -al /tmp'

                withCredentials([sshUserPrivateKey(credentialsId:'jenkins-agent',keyFileVariable:'SSH_PRIVATE_KEY')]) {
                sh'''
                cat $SSH_PRIVATE_KEY
                mkdir -p ~/.ssh
                ssh-keyscan -H 172.27.142.51 >> ~/.ssh/known_hosts 
                scp -i $SSH_PRIVATE_KEY -r *.txt abdullah@172.27.142.51:~/test
                '''
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