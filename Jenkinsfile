pipeline {
    agent {
        docker {
            image 'handyman/Dockerfile'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'sleep 180'
            }
        }
    }
}
