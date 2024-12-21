pipeline {
    agent {
        docker {
            image 'docker:dind'
        }
    }

    environment {
        DOCKER_IMAGE = 'abdullah111111/handyman-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
        EC_SERVER_DEV=credentials("EC_SERVER_DEV")
    }

    stages {
        stage('Build and Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-credentials',
                            usernameVariable: 'DOCKER_USERNAME',
                            passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        mkdir -p ~/.docker
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
        stage ("Deploy on Server") {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2', keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                sh """
                echo "hello"
                """
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
