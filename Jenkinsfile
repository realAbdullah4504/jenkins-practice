pipeline {
    agent {
        docker {
            image 'docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock -u root'  // Added root user
        }
    }

    environment {
        DOCKER_IMAGE = 'abdullah111111/handyman-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
        HOME = '/root'  // Set HOME for Docker config
    }

    stages {
        stage('Build and Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-credentials',
                            usernameVariable: 'DOCKER_USERNAME',
                            passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        mkdir -p /root/.docker
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    '''
                    
                    sh """
                        docker build \
                            --cache-from ${DOCKER_IMAGE}:latest \
                            --build-arg BUILDKIT_INLINE_CACHE=1 \
                            -t ${DOCKER_IMAGE}:${DOCKER_TAG} \
                            -t ${DOCKER_IMAGE}:latest \
                            handyman/
                    """
                    
                    sh """
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker push ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
    }
}
