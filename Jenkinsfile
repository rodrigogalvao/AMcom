pipeline {
     agent {
      node { label 'mestre' }
           }
           options {
      timestamps ()
      
           }
    stages {
        stage('CheckOut') {            
            steps { checkout scm }            
        }
    }
}
        
        stage('Build') {
          when { anyOf { branch 'DevAMcom'; branch 'HomAMcom'; branch "PrdAMcom"; } }
          steps {
            script{ 
                 microk8s kubectl get nodes 
            }
          }
        }
            
       
        stage('Deploy'){
            when { anyOf { branch 'DevAMcom'; branch 'HomAMcom'; branch "PrdAMcom"; } } 
                steps {
            script{ 
                 microk8s kubectl get pods -n --all-namespaces 
            }
          }
        } 