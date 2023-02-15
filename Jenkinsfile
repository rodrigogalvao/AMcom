pipeline {
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
                        dockerImage = docker.build "localhost:32000/portalapp:${BRANCH_NAME}"
                            dockerImage.push()                                                      
                    }
                }
          }
        }
            
       
        stage('Deploy'){
            when { anyOf { branch 'DevAMcom'; branch 'HomAMcom'; branch "PrdAMcom"; } } 
                steps {
            script{ 
                 sh "kubectl get pods -n --all-namespaces" 
            }
          }
        } 
      }
}