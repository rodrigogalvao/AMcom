pipeline {
     agent {
      node { mestre 'dotnet-5-rc' }
           }
           options {
      timestamps ()
      buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
      disableConcurrentBuilds()
      skipDefaultCheckout()
    }
    stages {
        stage('CheckOut') {            
            steps { checkout scm }            
        }
        
        stage('Build') {
          when { anyOf { branch 'DevAMcom'; branch 'HomAMcom'; branch "PrdAMcom"; } } 
       
        stage('Deploy'){
            when { anyOf { branch 'DevAMcom'; branch 'HomAMcom'; branch "PrdAMcom"; } }   
