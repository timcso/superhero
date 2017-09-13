superhero.service( "userService",
               ["userFactory",
                "$q",
                function(userFastory, $q){
                    var service = this
                    service.users = []
                    service.getAll = function(){
                        var deferred = $q.defer()
                        if (service.users.length < 1){
                          userFastory.getAll()
                            .then(function(users){
                              service.users = users
                              deferred.resolve(users)
                          })
                        }else{
                           deferred.resolve(service.users)
                        }
                      return deferred.promise
                    }
                }] )
