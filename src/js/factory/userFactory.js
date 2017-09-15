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
        },
        getOne: function(id){ //Felhasználó lekérése
          var deferred = $q.defer()
          $http.get('/users/' + id)
           .then(function(serverData){
            deferred.resolve(serverData.data)
          }, function(err){
              deferred.reject(err)
          })
          return deferred.promise
        },
          saveUser: function(row){
            var deferred = $q.defer()
            $http.post('/users', row)
             .then(function(serverData){
              deferred.resolve(serverData.data)
             }, function(err){
                deferred.reject(err)
            })
            return deferred.promise
          },
          deleteUser: function(row){
            var deferred = $q.defer()
            $http.delete('/users/' + row._id)
             .then(function(serverData){
              deferred.resolve(serverData.data)
             }, function(err){
                deferred.reject(err)
            })
            return deferred.promise
          },
          insertUser: function(row){
            var deferred = $q.defer()
            $http.put('/users', row)
             .then(function(userData){
              deferred.resolve(userData.data)
             }, function(err){
                deferred.reject(err)
            })
            return deferred.promise
          }
      }
}])
