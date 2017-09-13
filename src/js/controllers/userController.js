superhero.controller("userController",
   [
     "$scope",
     "userService",
     "userFactory",
     function($scope, userService, userFactory){

         //Felhasználók
         $scope.users = []
         $scope.ths = ['#', 'name', 'email', 'phone', 'actions']
         $scope.newUser = {}
         $scope.formError = {}

         //Felhasználók lekérése
         userService.getAll()
         .then(function(userData){
             console.log(userData)
             $scope.users = userData
         }, function(err){
             console.error('hibaaaa getting user data: ', err)
         })

         $scope.updateRecord = function(row){
             userFactory.saveUser(row)
             .then(function(){
              alert("User saved!")
             })
         }

         $scope.deleteRecord = function(row){
             userFactory.deleteUser(row)
             .then(function(deleted){
                 if(deleted.success){
                   //alert("User deleted: " + row.name)
                   var index = $scope.users.indexOf(row)
                   $scope.users.splice(index, 1)
                 }else{
                   alert("Error, not deleted: " + row.name)
                 }

             })
         }

         $scope.checkNewUser = function(row){
           $scope.formError = {}
           var fields = ["name", "email", "phone"]
           var returnValue = true
           for(var k in fields){
               if(row[fields[k]]== "" || angular.isUndefined(row[fields[k]])){
                   $scope.formError[fields[k]] = true
                   returnValue = false
               }
           }
           return returnValue
         }


         $scope.insertRecord = function(row){
             if (!$scope.checkNewUser(row)){
                 return
             }
             userFactory.insertUser(row)
             .then(function(newUser){
               $scope.users.push(newUser);
               $scope.newUser = {}
             })
         }
}])
