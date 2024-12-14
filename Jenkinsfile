pipeline {
agent { docker { image 'node:16-alpine' } }
stages {
    stage('Build') {
        steps {
            echo 'Building the app with node checking the webhook .....'
            }
    }
    stage('Test') {
        steps {
            echo 'Testing the app with node checking the webhook.....'
            }
    }
    stage('Deploy') {
        steps {
            echo 'Deploying the app with node....'
        }
    }
}
}