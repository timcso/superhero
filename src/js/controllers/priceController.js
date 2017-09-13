superhero.controller("priceController",
   [
     "$scope",
     "$http",
     function($scope, $http){

      $scope.yourPrice = 1500;
      // $scope.yourName = 'Timcsó';
      //Figyelt változó
      $scope.$watch('yourPrice', function(newValue, oldValue){
          console.log(newValue, oldValue);
      })

      $scope.calcOwnprice = function(price){
        price = price.toString().replace( /[^0-9]/g, '')
        newPrice = Math.round( parseInt(price)*0.7);
        return isNaN( newPrice ) ? 0 : newPrice;
      }
      $scope.calcOtherprice = function(price){
        price = price.toString().replace( /[^0-9]/g, '')
        newPrice = Math.round( parseInt(price)*0.85);
        return isNaN( newPrice ) ? 0 : newPrice;
      }
}])
