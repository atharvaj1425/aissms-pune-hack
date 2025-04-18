pipeline {
    agent any
    environment {
        DOCKERHUB_USERNAME = credentials('dockerhub-username')
        DOCKERHUB_PASSWORD = credentials('dockerhub-password')
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/atharvaj1425/aissms-pune-hack'
            }
        }
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('Lint') {
            steps {
                bat 'npm run lint || echo No linting step'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build || echo No build step'
            }
        }
        stage('Test') {
            steps {
                bat 'npm run test -- --coverage'
            }
        }
        stage('Docker Build & Push') {
            steps {
                bat """
                echo %DOCKERHUB_PASSWORD% | docker login -u %DOCKERHUB_USERNAME% --password-stdin
                docker build -t %DOCKERHUB_USERNAME%/your-app:latest .
                docker push %DOCKERHUB_USERNAME%/your-app:latest
                """
            }
        }
    }
}
// Optional: Add post-build actions or notifications here
    post {
        always {
            archiveArtifacts artifacts: '**/coverage/**', fingerprint: true
            junit '**/test-results.xml'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
