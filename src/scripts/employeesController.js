dashboardApp.controller("employeesController",['$scope','$http', '$timeout',function($scope,$http, $timeout){

	$scope.markers = '';

	    $http.get("https://corporate-dashboard.firebaseio.com/locations.json")
    .then(function(response) {

        for (x in response.data){
        	$scope.markers = response.data;
        }
    });

  var poll = function() {
        $timeout(function() {
      $http.get("https://corporate-dashboard.firebaseio.com/locations.json")
    .then(function(response) {

        $scope.markers = "";
        for (x in response.data){

          $scope.markers = response.data;
        }
        console.log("Fetching data");
    });
            poll();
        }, 10000);
  };  

  poll();

  $scope.map = { 
    center: { latitude: 39.8282, longitude: -98.5795 }, 
    zoom: 2
  };
}]);