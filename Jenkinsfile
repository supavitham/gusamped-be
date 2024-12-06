pipeline {
    agent any  // ใช้ agent ใดก็ได้ในการรันงาน

    environment {
        // กำหนดตัวแปรสิ่งแวดล้อม เช่น การตั้งค่าที่อยู่ของ NodeJS
        NODE_HOME = tool name: 'NodeJS', type: 'NodeJSInstallation'
        PATH = "${NODE_HOME}/bin:${env.PATH}" // เพิ่ม node และ npm ใน PATH
    }

    stages {
        stage('Checkout') {
            steps {
                // ดึงโค้ดจาก Git repository
                checkout scm
            }
        }

        stage('Check Node Version') {
            steps {
                script {
                    sh 'node -v'  // พิมพ์เวอร์ชันของ Node.js ที่ใช้งาน
                }
         
        }       

        stage('Install Dependencies') {
            steps {
                // ติดตั้ง dependencies ด้วย npm
                script {
                    sh 'npm install'  // ใช้คำสั่ง `sh` เพื่อรัน shell command บน Jenkins
                }
            }
        }

        stage('Lint') {
            steps {
                // ตรวจสอบข้อผิดพลาดในการเขียนโค้ดด้วย eslint (ถ้ามีการติดตั้ง)
                script {
                    sh 'npm run lint'  // ถ้ามีคำสั่ง lint ใน package.json
                }
            }
        }

        stage('Test') {
            steps {
                // รันการทดสอบ (เช่นด้วย Jest หรือ Mocha)
                script {
                    sh 'npm test'  // ใช้คำสั่ง `npm test` เพื่อรันการทดสอบ
                }
            }
        }

        stage('Build') {
            steps {
                // การ build แอปพลิเคชัน ถ้ามีคำสั่ง build
                script {
                    // sh 'npm run build'  // รันคำสั่ง build จาก `package.json`
                    sh 'npm start'
                }
            }
        }

        stage('Deploy') {
            steps {
                // กำหนดขั้นตอนการ deploy (หากมี)
                script {
                    // คำสั่ง deploy ขึ้นอยู่กับว่าเป็น environment ใด
                    echo 'Deploying to production...'
                    // เช่น การรันคำสั่ง deployment ไปยัง server หรือ cloud
                }
            }
        }
    }

    post {
        success {
            // ในกรณีที่ job สำเร็จ
            echo 'Pipeline ran successfully.'
        }
        failure {
            // ในกรณีที่ job ล้มเหลว
            echo 'Pipeline failed.'
        }
        always {
            // ขั้นตอนที่ต้องทำเสมอ (เช่นการ cleanup หรือส่งการแจ้งเตือน)
            echo 'Cleaning up...'
        }
    }
}
