pipeline {
    agent { docker { image 'node:16-alpine' } }
    stages {
        stage('Build') {
            steps {
                sh '''
                cd react
                npm install
                npm run build
                '''
            }
        }
    }
}