pipeline {
    agent {
        docker {
            image 'docker:dind'  // Using docker-in-docker official image
            args '--privileged -v /var/run/docker.sock:/var/run/docker.sock -u root'
        }
    }

    environment {
        DOCKER_IMAGE = 'abdullah111111/handyman-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
        EC_SERVER_DEV = credentials("EC_SERVER_DEV")
        DOCKER_CREDENTIALS = credentials('docker-credentials')
        HOME = '/root'
        // Add application version for better tracking
        APP_VERSION = "1.0.${BUILD_NUMBER}"
    }

    stages {
        stage('Preparation') {
            steps {
                // Clean workspace before build
                cleanWs()
                // Add build information
                echo "Building version: ${APP_VERSION}"
            }
        }

        stage('Security Scan') {
            steps {
                // Add security scanning for Dockerfile
                sh 'docker run --rm -v $(pwd):/root aquasec/trivy filesystem --no-progress /'
            }
        }

        stage('Build and Push') {
            steps {
                script {
                    // Docker login with improved error handling
                    retry(3) {
                        sh '''
                            mkdir -p /root/.docker
                            echo "${DOCKER_CREDENTIALS_PSW}" | docker login -u "${DOCKER_CREDENTIALS_USR}" --password-stdin
                        '''
                    }

                    // Build with proper labels and build args
                    sh """
                        docker build \
                            --cache-from ${DOCKER_IMAGE}:latest \
                            --build-arg BUILDKIT_INLINE_CACHE=1 \
                            --build-arg APP_VERSION=${APP_VERSION} \
                            --label "org.opencontainers.image.created=\$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
                            --label "org.opencontainers.image.version=${APP_VERSION}" \
                            --label "org.opencontainers.image.revision=${GIT_COMMIT}" \
                            -t ${DOCKER_IMAGE}:${DOCKER_TAG} \
                            -t ${DOCKER_IMAGE}:latest \
                            handyman/
                    """

                    // Push images with error handling
                    retry(3) {
                        sh """
                            docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                            docker push ${DOCKER_IMAGE}:latest
                        """
                    }
                }
            }
        }

        stage('Deploy to Development') {
            environment {
                SSH_PRIVATE_KEY = credentials('jenkins-ec2')
            }
            steps {
                script {
                    // Create deployment script
                    writeFile file: 'deploy.sh', text: '''
                        #!/bin/bash
                        set -e

                        echo "Starting deployment process..."
                        
                        # Health check function
                        health_check() {
                            local retries=30
                            local wait_time=10
                            local container_name=$1
                            
                            echo "Performing health check for $container_name..."
                            
                            for i in $(seq 1 $retries); do
                                if docker ps | grep -q "$container_name"; then
                                    echo "Container $container_name is running"
                                    return 0
                                fi
                                echo "Waiting for container to be healthy... ($i/$retries)"
                                sleep $wait_time
                            done
                            
                            echo "Health check failed for $container_name"
                            return 1
                        }

                        # Backup current state
                        timestamp=$(date +%Y%m%d_%H%M%S)
                        mkdir -p ~/backups
                        docker-compose -f ~/handyman-app/handyman-docker-compose.yml config > ~/backups/backup_$timestamp.yml

                        # Stop existing containers
                        if docker ps -q -f "name=handyman-app" | grep -q .; then
                            echo "Gracefully stopping existing containers..."
                            docker-compose -f ~/handyman-app/handyman-docker-compose.yml down --timeout 30
                            docker-compose -f ~/handyman-app/mongo-docker-compose.yml down --timeout 30
                        fi

                        # Pull and start new containers
                        echo "Pulling latest images..."
                        docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}

                        echo "Starting new containers..."
                        docker-compose -f ~/handyman-app/handyman-docker-compose.yml -f ~/handyman-app/mongo-docker-compose.yml up -d

                        # Perform health checks
                        if ! health_check "handyman-app"; then
                            echo "Deployment failed! Rolling back..."
                            docker-compose -f ~/backups/backup_$timestamp.yml up -d
                            exit 1
                        fi

                        echo "Deployment successful!"
                    '''

                    // Execute deployment
                    sh """
                        chmod +x deploy.sh
                        scp -i \$SSH_PRIVATE_KEY -o StrictHostKeyChecking=no deploy.sh ubuntu@\$EC_SERVER_DEV:~/
                        ssh -i \$SSH_PRIVATE_KEY -o StrictHostKeyChecking=no ubuntu@\$EC_SERVER_DEV './deploy.sh'
                    """
                }
            }
        }
    }

    post {
        always {
            // Cleanup
            sh 'docker logout'
            cleanWs()
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            // Send notification on failure
            echo "Pipeline failed! Sending notification..."
            // Add your notification mechanism here (email, Slack, etc.)
        }
    }
}
