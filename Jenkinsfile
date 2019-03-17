pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = "shashmca/api-server"
    }
    tools {nodejs "node"}
    stages {
        stage('Build') {
             steps {
              dir('api-server') {
                sh 'npm install'
                // sh 'npm test'
              }
            }
        }
        stage('Build Docker Image') {
            steps {
              dir('api-server') {
                script {
                    app = docker.build(DOCKER_IMAGE_NAME)
                }
              }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'Dockerhubcred') {
                        app.push("${env.BUILD_NUMBER}")
                        //app.push("latest")
                    }
                }
            }
        }
        stage('DeployToProduction') {
            steps {
                input 'Deploy to Production?'
                milestone(1)
                //implement Kubernetes deployment here
            }
        }
    }
}
