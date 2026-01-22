pipeline {
    agent any

    // REMOVED the 'tools' section. 
    // Jenkins will now look for 'npm' in your Mac's system PATH.

    environment {
        // This ensures Jenkins finds the 'npm' command on your Mac
        PATH = "/opt/homebrew/bin:/usr/local/bin:$PATH"
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
                        dir('client') { 
                            sh 'npm install'
                        }
                    }
                }
                stage('Server Install') {
                    steps {
                        dir('server') { 
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
                            sh 'CI=false npm run build' 
                        }
                    }
                }
                stage('Server Start Check') {
                    steps {
                        dir('server') {
                            sh 'node --check index.js' 
                        }
                    }
                }
            }
        }
    }
}