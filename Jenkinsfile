pipeline{
    agent any
    tools {nodejs "node"}
    environment{
        imageName = "devinanugrahp/vote-app-backend" 
        registryCredential =  'devinanugrahp'
    }

    stages{
        stage("Install Dependencies"){
            steps{
                sh 'yarn install'
            }
        }

        stage("Build"){
            steps{
                script{
                    dockerImage = docker.build imageName
                }
            }
        }
        stage("Deploy"){
            steps{
                script{
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-creds'){
                        dockerImage.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }

        stage("Cleanup previous container"){
            steps{
                script{
                    sh 'docker stop vote-app-backend || true'
                    sh 'docker rm vote-app-backend || true'
                }
            }
        }

        stage("Run container"){
            steps{
                script{
                    sh 'docker run -d -p 3000:3000 --name vote-app-backend ${imageName}'
                }
            }
        }
    }
}