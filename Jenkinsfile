pipeline {
    agent { docker { 
        image 'node:16-alpine' 
        args '''
            -v /usr/bin/scp:/usr/bin/scp 
            -v /usr/bin/ssh:/usr/bin/ssh 
            -v /usr/bin/ssh-keyscan:/usr/bin/ssh-keyscan 
            -v /tmp/.cache:/tmp/.cache
            '''
        } }
    environment {
        CI = 'false'
        EC_SERVER="ec2-3-110-196-87.ap-south-1.compute.amazonaws.com"
    }
    stages {
        stage('Cache Dependencies') {
            steps {
            cache(maxCacheSize: 0, caches: [
            arbitraryFileCache(path: 'react/node_modules', cacheValidityDecidingFile: 'react/package.json')
            ]) {
                sh '''
                cd react
                if [ ! -d "node_modules" ]; then
                npm ci
                fi
                '''
                }
            }
        }
        stage ('Build') {
            steps {
                cache(maxCacheSize: 0, caches: [
                arbitraryFileCache(path: 'react/build', cacheValidityDecidingFile: 'react/**',excludes:'react/build')
                ]) {

                sh '''
                cd react
                if [ ! -d "build" ]; then
                npm run build
                fi
                '''
                }
            }
            post {
                success {
                    dir("react/") { 
                    sh "pwd"
                    sh "tar -czvf build.tar.gz  -C build ."
                    stash includes: 'build.tar.gz', name: 'build'
                    }
                }
            }
        }
        stage ('Deploy') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2', keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                    dir("react") {
                        unstash "build"

                        sh '''
                        # Debug: List contents of current directory
                        pwd
                        ls -la
                        # Deploy files
                        mkdir -p ~/.ssh
                        ssh-keyscan -H $EC_SERVER >> ~/.ssh/known_hosts 
                        scp -i $SSH_PRIVATE_KEY build.tar.gz ubuntu@$EC_SERVER:/var/www/news-app/
                        # Debug: List contents of remote directory
                        ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER "cd /var/www/news-app && tar xzf build.tar.gz && rm build.tar.gz"
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