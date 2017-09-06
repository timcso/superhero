/*$.getJSON('users', function( users ){
    console.log('all users', users);
});

//Check user
function checkUser( user ){
    if (user.role > 4){
        return true;
    }else {
        return false;
    }
}*/

var superhero = angular.module("superhero", [])
superhero.controller("nameController", function($scope){
    $scope.yourName = 'Joe'
})
