pipeline {
    agent {
        dockerfile {
            dir 'handyman'
            filename 'Dockerfile'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
            additionalBuildArgs '--tag abdullah111111/handyman-app'
        }
    }
    
    environment {
        DOCKER_IMAGE = 'abdullah111111/handyman-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }
    stages {
        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', 
                            usernameVariable: 'DOCKER_USERNAME', 
                            passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
                    sh """
                        docker tag ${DOCKER_IMAGE} ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker tag ${DOCKER_IMAGE} ${DOCKER_IMAGE}:latest
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker push ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
    }
}
