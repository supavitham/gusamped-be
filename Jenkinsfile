pipeline {
    agent any  // ใช้ agent ใดก็ได้ในการรันงาน
    stages{
        stage('Build'){
            steps{
                nodejs('NodeJS'){
                    echo 'run app...'
                    sh 'npm install'
                }
            }
        }
    }    
}
