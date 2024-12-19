pipeline {
    agent {
        docker {
            image 'docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock -u root'
        }
    }

    environment {
        DOCKER_IMAGE = 'abdullah111111/handyman-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
        EC_SERVER_DEV=credentials("EC_SERVER_DEV")
        HOME = '/root' 
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
        stage ("Deploy on Server") {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2', keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                sh """
                ssh -i $SSH_PRIVATE_KEY ubuntu@$EC_SERVER_DEV << EOF
                    set -e
                    
                    echo "Checking for existing containers..."
                    if docker ps -q -f "name=handyman-app" | grep -q .; then
                        echo "Stopping and removing existing containers..."
                        docker-compose -f ~/handyman-app/handyman-docker-compose.yml down || true
                        docker-compose -f ~/handyman-app/mongo-docker-compose.yml down || true
                    else
                        echo "No running containers to stop."
                    fi

                    echo "Pulling the latest Docker image..."
                    docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}

                    echo "Starting new containers..."
                    docker-compose -f ~/handyman-app/handyman-docker-compose.yml -f ~/handyman-app/mongo-docker-compose.yml up -d
                EOF
                """
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
