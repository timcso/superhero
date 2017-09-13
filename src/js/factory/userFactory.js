superhero.factory("userFactory", [
    "$http",
    "$q",
    function($http, $q){
      return {
        getAll: function(){ //Felhasználó lekérése

          var deferred = $q.defer()
          $http.get('/users')
           .then(function(serverData){
            deferred.resolve(serverData.data)
          }, function(err){
              deferred.reject(err)
          })
          return deferred.promise
        }
      }
}])
