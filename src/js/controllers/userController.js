superhero.controller("userController",
   [
     "$scope",
     "userService",
     function($scope, userService){

         //Felhasználók
         $scope.users = []

         //Felhasználók lekérése
         userService.getAll()
         .then(function(userData){
             console.log(userData)
             $scope.users = userData
         }, function(err){
             console.error('hibaaaa getting user data: ', err)
         })
}])
