pipeline {
  environment {
      namespace =  env.BRANCH_NAME.toLowerCase()
  }
     agent any
           
      stages {
        stage('CheckOut') {            
            steps { checkout scm }            
        }
    
        
        stage('Build') {
          when { anyOf { branch 'DevAMcom'; branch 'HomAMcom'; branch "PrdAMcom"; } }
          steps {
            script{                               
                    dir("node-project") {
                        dockerImage = docker.build "localhost:32000/portalapp:${env.namespace}"
                            dockerImage.push()                                                      
                    }
                }
          }
        }
            
       
        stage('Deploy'){
            when { anyOf { branch 'DevAMcom'; branch 'HomAMcom'; branch "PrdAMcom"; } } 
                steps {
            script{ 
              withCredentials([string(credentialsId: 'piloto')]) {
                 timeout(time: 24, unit: "HOURS") {
                 input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: "piloto"
                                } 
                       }
                 sh "kubectl rollout restart deployment/deploy-portalapp -n ${env.namespace}"
                 
                 }
        } 
      }
}