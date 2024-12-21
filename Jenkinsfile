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
                sh "if [ ! -d ~/.ssh ]; then mkdir -p ~/.ssh; fi"
                sh "ssh-keyscan -H $EC_SERVER_DEV >> ~/.ssh/known_hosts"
                sshagent (credentials: ['jenkins-ec2']) {
                sh """
                ssh ubuntu@$EC_SERVER_DEV 'if [ ! -d handyman ]; then mkdir handyman; fi'
                scp -i $EC_SERVER_DEV handyman/*.yml ubuntu@$EC_SERVER_DEV:/home/ubuntu/
                ssh ubuntu@$EC_SERVER_DEV 'cd handyman && if [ ! docker ps -a | grep handyman ]; then docker-compose up -d; else docker-compose down && docker-compose up -d; fi'
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
