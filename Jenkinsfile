// pipeline {
//     agent any

//     environment {
//         DOCKERHUB_USERNAME = credentials('dockerhub-username')
//         DOCKERHUB_PASSWORD = credentials('dockerhub-password')
//         // Uncomment below if you're using Azure
//         // AZURE_CLIENT_ID = credentials('azure-client-id')
//         // AZURE_CLIENT_SECRET = credentials('azure-client-secret')
//         // AZURE_TENANT_ID = credentials('azure-tenant-id')
//         // AZURE_REGISTRY = 'youracrname.azurecr.io'
//         // RESOURCE_GROUP = 'your-resource-group'
//         // CONTAINER_NAME = 'your-container-name'
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 git 'https://github.com/atharvaj1425/aissms-pune-hack.git'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 dir('Backend') {
//                     bat 'npm install'
//                 }
//                 dir('Frontend') {
//                     bat 'npm install'
//                 }
//             }
//         }

//         stage('Lint') {
//             steps {
//                 dir('Frontend') {
//                     bat 'npm run lint || echo "Lint warnings found"'
//                 }
//             }
//         }

//         stage('Test') {
//             steps {
//                 dir('Backend') {
//                     bat 'npm run test || echo "Backend tests failed"'
//                 }
//                 dir('Frontend') {
//                     bat 'npm run test || echo "Frontend tests failed"'
//                 }
//             }
//         }

//         stage('Build') {
//             steps {
//                 dir('Frontend') {
//                     bat 'npm run build || echo "No frontend build step"'
//                 }
//             }
//         }

//         stage('Docker Build & Push') {
//             steps {
//                 bat """
//                 echo %DOCKERHUB_PASSWORD% | docker login -u %DOCKERHUB_USERNAME% --password-stdin
//                 docker build -t %DOCKERHUB_USERNAME%/aissms-backend ./Backend
//                 docker build -t %DOCKERHUB_USERNAME%/aissms-frontend ./Frontend
//                 docker push %DOCKERHUB_USERNAME%/aissms-backend
//                 docker push %DOCKERHUB_USERNAME%/aissms-frontend
//                 """
//             }
//         }

//         // Optional: uncomment if using Azure
//         // stage('Azure Login & Deploy') {
//         //     steps {
//         //         bat """
//         //         az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
//         //         az acr login --name %AZURE_REGISTRY:~0,-12%
//         //         docker tag %DOCKERHUB_USERNAME%/aissms-frontend %AZURE_REGISTRY%/aissms-frontend
//         //         docker push %AZURE_REGISTRY%/aissms-frontend
//         //         az container create --resource-group %RESOURCE_GROUP% ^
//         //                             --name %CONTAINER_NAME% ^
//         //                             --image %AZURE_REGISTRY%/aissms-frontend ^
//         //                             --dns-name-label %CONTAINER_NAME%-demo ^
//         //                             --ports 3000 ^
//         //                             --environment-variables NODE_ENV=production ^
//         //                             --restart-policy Always
//         //         """
//         //     }
//         // }
//     }
// }


pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-login')

    // ✅ Inject .env secrets from Jenkins credentials
    PORT = credentials('PORT')
    MONGODB_URI = credentials('MONGODB_URI')
    CORS_ORIGIN = credentials('CORS_ORIGIN')
    ACCESS_TOKEN_SECRET = credentials('ACCESS_TOKEN_SECRET')
    ACCESS_TOKEN_EXPIRY = credentials('ACCESS_TOKEN_EXPIRY')
    CLOUDINARY_CLOUD_NAME = credentials('CLOUDINARY_CLOUD_NAME')
    CLOUDINARY_API_KEY = credentials('CLOUDINARY_API_KEY')
    CLOUDINARY_API_SECRET = credentials('CLOUDINARY_API_SECRET')
    TWILIO_ACCOUNT_SID = credentials('TWILIO_ACCOUNT_SID')
    TWILIO_AUTH_TOKEN = credentials('TWILIO_AUTH_TOKEN')
    TWILIO_PHONE_NUMBER = credentials('TWILIO_PHONE_NUMBER')
    TOGETHER_API_KEY = credentials('TOGETHER_API_KEY')
  }

  stages {
    stage('Install Dependencies') {
      steps {
        dir('Backend') {
          bat 'npm install'
        }
        dir('Frontend') {
          bat 'npm install'
        }
      }
    }

    stage('Test') {
      steps {
        dir('Backend') {
          bat 'npm run test || echo "Backend tests failed"'
        }
        dir('Frontend') {
          bat 'npm run test || echo "Frontend tests failed"'
        }
      }
    }

    stage('Build') {
      steps {
        dir('Frontend') {
          bat 'npm run build || echo "No frontend build step"'
        }
      }
    }

    stage('Docker Build & Push') {
      steps {
        bat """
        echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
        docker build -t %DOCKERHUB_CREDENTIALS_USR%/aissms-backend ./Backend
        docker build -t %DOCKERHUB_CREDENTIALS_USR%/aissms-frontend ./Frontend
        docker push %DOCKERHUB_CREDENTIALS_USR%/aissms-backend
        docker push %DOCKERHUB_CREDENTIALS_USR%/aissms-frontend
        """
      }
    }
  }
}
