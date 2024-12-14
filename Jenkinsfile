pipeline {
    agent { docker { image 'node:16-alpine' } }
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
                unstash 'build'
                sh '''
                scp -i ~/.ssh/id_ubuntu -r build/* abdullah@172.27.142.51:/var/www/html/
                ssh -i ~/.ssh/id_ubuntu abdullah@172.27.142.51 'sudo systemctl restart nginx'
                '''
            }
        }
    }
}