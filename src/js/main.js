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

var superhero = angular.module("superhero", ['currencyModule'])

superhero.run(["$http", function($http){
  $http.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest'
}])
