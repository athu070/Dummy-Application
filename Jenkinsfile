pipeline {
    agent any

    tools {
        // Ensure you have a Node.js tool named 'node' in "Manage Jenkins" -> "Tools"
        // Or remove this block if Node is already in your Mac's system PATH
        nodejs 'node'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Client Install') {
                    steps {
                        dir('client') { // Enters the 'client' folder
                            echo 'Installing Client dependencies...'
                            sh 'npm install'
                        }
                    }
                }
                stage('Server Install') {
                    steps {
                        dir('server') { // Enters the 'server' folder
                            echo 'Installing Server dependencies...'
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build & Test') {
            parallel {
                stage('Client Build') {
                    steps {
                        dir('client') {
                            echo 'Building React Client...'
                            // CI=false prevents the build from failing on minor warnings
                            sh 'CI=false npm run build' 
                        }
                    }
                }
                stage('Server Start Check') {
                    steps {
                        dir('server') {
                            echo 'Checking Server...'
                            // A simple check to ensure no syntax errors exist
                            // (If you have a test script, change this to 'npm test')
                            sh 'node --check index.js' 
                        }
                    }
                }
            }
        }
    }
}