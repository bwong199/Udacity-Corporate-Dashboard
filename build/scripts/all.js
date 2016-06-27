var dashboardApp = angular.module('dashboardApp', ['ngRoute', 'ngResource', 'zingchart-angularjs', 'uiGmapgoogle-maps']);










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
dashboardApp.controller('issuesController', ['$scope',  '$resource', "$timeout", function($scope, $resource, $timeout){

  	$scope.orderByField = 'closed_timestamp';
  	$scope.reverseSort = false;

    $scope.issuesAPI = $resource("https://corporate-dashboard.firebaseio.com/issues.json", { get: { method: "JSON" }});


	$scope.issuesResult = $scope.issuesAPI.query({});

	var poll = function() {
        $timeout(function() {

        	$scope.issuesResult = "";

		    $scope.issuesAPI = $resource("https://corporate-dashboard.firebaseio.com/issues.json", { get: { method: "JSON" }});

			$scope.issuesResult = $scope.issuesAPI.query({});
			console.log("getting results");
            poll();
        }, 100000);
    };     
   poll();


	var response = $scope.issuesAPI.query({});

	console.log(response);

	console.log($scope.issuesResult);
}])

dashboardApp.controller('keyMetricsController',  [ '$scope', '$resource', '$routeParams', "$http", "$timeout", function($scope, $resource, $routeParams, $http, $timeout){
 //  	$scope.orderByField = 'closed_timestamp';
 //  	$scope.reverseSort = false;

 //    $scope.keyMetricsAPI = $resource("https://corporate-dashboard.firebaseio.com/key_metrics.json", { get: { method: "JSON" }});


	// $scope.keyMetricsResult = $scope.keyMetricsAPI.query({});

	// console.log($scope.keyMetricsResult)

	var array = [];

 $scope.customerArray = [];
 $scope.dateArray = [];
 $scope.reportedIssues = [];

  $scope.response = '';

  var poll = function() {
        $timeout(function() {
                 $http.get("https://corporate-dashboard.firebaseio.com/key_metrics.json")
    .then(function(response) {

         $scope.customerArray = [];
         $scope.dateArray = [];
         $scope.reportedIssues = [];

        for (x in response.data){

          $scope.customerArray.push(response.data[x].number_of_paying_customers)
          $scope.dateArray.push(response.data[x].date);
          $scope.reportedIssues.push(response.data[x].reported_issues);
        }

        console.log($scope.customerArray)
        console.log("Fetching Data");
    });  
            poll();
        }, 100000);
    };     
  poll();



     $http.get("https://corporate-dashboard.firebaseio.com/key_metrics.json")
    .then(function(response) {

        for (x in response.data){

          $scope.customerArray.push(response.data[x].number_of_paying_customers)
          $scope.dateArray.push(response.data[x].date);
          $scope.reportedIssues.push(response.data[x].reported_issues);
        }

        console.log($scope.customerArray)
        console.log("Fetching Data");
    });   
  // }



  $scope.myJson = {
    type: "line", 
    title: {
      textAlign:'left',
    },
    crosshairX : {
      lineColor : "#b6b6b6",
      trigger : "move",
      lineStyle : 'dashed',
      marker : {
        visible : true,
      size : 4
      },
      scaleLabel : {
        bold : true,
        backgroundColor : "#fff",
        fontColor : "#474747",
        fontSize : "16px",
        callout : false,
        paddingTop : 2,
        
      },
      plotLabel : {
        backgroundColor : "white",
        borderColor : "#bababa",
        borderRadius : "5px",
        bold : true,
        fontSize : "12px",
        fontColor : "#2f2f2f",
        textAlign : 'right',
        padding : '10px',
        shadow : true,
        shadowAlpha : 0.2,
        shadowBlur : 5,
        shadowDistance : 4,
        shadowColor : "#a1a1a1",
        
      }
    },
    plot : {
      tooltip : {
        visible : false
      },
      aspect : 'spline',
      marker : {
        backgroundColor : "white",
        borderWidth : "2px",
      },
      hoverMarker : {
        backgroundColor : 'none',
        size : 10
      }
    },
    scaleX : {
      lineColor : "#E3E8E9",
      fontColor : "#879CAB",
      guide :{
        visible : true,
        lineWidth : "1px",
        lineColor : "#E3E8E9",
        lineStyle : "solid"
      },
      tick : {
        visible : false
      },
      labels : $scope.dateArray
    },
    scaleY : {
      lineColor : "#E3E8E9",
      fontColor : "#879CAB",
      guide :{
        visible : true,
        lineWidth : "1px",
        lineColor : "#E3E8E9",
        lineStyle : "solid"
      },
       tick : {
        visible : false
      }
    },
    series : [
        {
            values : $scope.customerArray,
            text : "Paying Customers",
            lineColor : "#00ACF2",
            marker : {
        borderColor : "#00ACF2"
      }
        }
    ]
};

  $scope.myJson2 = {
    type: "bar", 
    title: {
      textAlign:'left',
    },
    crosshairX : {
      lineColor : "#b6b6b6",
      trigger : "move",
      lineStyle : 'dashed',
      marker : {
        visible : true,
      size : 4
      },
      scaleLabel : {
        bold : true,
        backgroundColor : "#fff",
        fontColor : "#474747",
        fontSize : "16px",
        callout : false,
        paddingTop : 2,
        
      },
      plotLabel : {
        backgroundColor : "white",
        borderColor : "#bababa",
        borderRadius : "5px",
        bold : true,
        fontSize : "12px",
        fontColor : "#2f2f2f",
        textAlign : 'right',
        padding : '10px',
        shadow : true,
        shadowAlpha : 0.2,
        shadowBlur : 5,
        shadowDistance : 4,
        shadowColor : "#a1a1a1",
        
      }
    },
    plot : {
      tooltip : {
        visible : false
      },
      aspect : 'spline',
      marker : {
        backgroundColor : "white",
        borderWidth : "2px",
      },
      hoverMarker : {
        backgroundColor : 'none',
        size : 10
      }
    },
    scaleX : {
      lineColor : "#E3E8E9",
      fontColor : "#879CAB",
      guide :{
        visible : true,
        lineWidth : "1px",
        lineColor : "#E3E8E9",
        lineStyle : "solid"
      },
      tick : {
        visible : false
      },
      labels : $scope.dateArray
    },
    scaleY : {
      lineColor : "#E3E8E9",
      fontColor : "#879CAB",
      guide :{
        visible : true,
        lineWidth : "1px",
        lineColor : "#E3E8E9",
        lineStyle : "solid"
      },
       tick : {
        visible : false
      }
    },
    series : [
        {
            values : $scope.reportedIssues,
            text : "Paying Customers",
            lineColor : "#00ACF2",
            marker : {
        borderColor : "#00ACF2"
      }
        }
    ]
};

}])
dashboardApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/assets/issues.htm', 
		controller: 'issuesController'
	})
	.when('/keyMetrics', {
		templateUrl: '/assets/key_metrics.htm', 
		controller: 'keyMetricsController'
	})
	.when('/employees', {
		templateUrl: '/assets/employees.htm', 
		controller: 'employeesController'
	})
}])
var dashboardApp = angular.module('dashboardApp', ['ngRoute', 'ngResource', 'zingchart-angularjs', 'uiGmapgoogle-maps']);










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
dashboardApp.controller('issuesController', ['$scope',  '$resource', "$timeout", function($scope, $resource, $timeout){

  	$scope.orderByField = 'closed_timestamp';
  	$scope.reverseSort = false;

    $scope.issuesAPI = $resource("https://corporate-dashboard.firebaseio.com/issues.json", { get: { method: "JSON" }});


	$scope.issuesResult = $scope.issuesAPI.query({});

	var poll = function() {
        $timeout(function() {

        	$scope.issuesResult = "";

		    $scope.issuesAPI = $resource("https://corporate-dashboard.firebaseio.com/issues.json", { get: { method: "JSON" }});

			$scope.issuesResult = $scope.issuesAPI.query({});
			console.log("getting results");
            poll();
        }, 100000);
    };     
   poll();


	var response = $scope.issuesAPI.query({});

	console.log(response);

	console.log($scope.issuesResult);
}])

dashboardApp.controller('keyMetricsController',  [ '$scope', '$resource', '$routeParams', "$http", "$timeout", function($scope, $resource, $routeParams, $http, $timeout){
 //  	$scope.orderByField = 'closed_timestamp';
 //  	$scope.reverseSort = false;

 //    $scope.keyMetricsAPI = $resource("https://corporate-dashboard.firebaseio.com/key_metrics.json", { get: { method: "JSON" }});


	// $scope.keyMetricsResult = $scope.keyMetricsAPI.query({});

	// console.log($scope.keyMetricsResult)

	var array = [];

 $scope.customerArray = [];
 $scope.dateArray = [];
 $scope.reportedIssues = [];

  $scope.response = '';

  var poll = function() {
        $timeout(function() {
                 $http.get("https://corporate-dashboard.firebaseio.com/key_metrics.json")
    .then(function(response) {

         $scope.customerArray = [];
         $scope.dateArray = [];
         $scope.reportedIssues = [];

        for (x in response.data){

          $scope.customerArray.push(response.data[x].number_of_paying_customers)
          $scope.dateArray.push(response.data[x].date);
          $scope.reportedIssues.push(response.data[x].reported_issues);
        }

        console.log($scope.customerArray)
        console.log("Fetching Data");
    });  
            poll();
        }, 100000);
    };     
  poll();



     $http.get("https://corporate-dashboard.firebaseio.com/key_metrics.json")
    .then(function(response) {

        for (x in response.data){

          $scope.customerArray.push(response.data[x].number_of_paying_customers)
          $scope.dateArray.push(response.data[x].date);
          $scope.reportedIssues.push(response.data[x].reported_issues);
        }

        console.log($scope.customerArray)
        console.log("Fetching Data");
    });   
  // }



  $scope.myJson = {
    type: "line", 
    title: {
      textAlign:'left',
    },
    crosshairX : {
      lineColor : "#b6b6b6",
      trigger : "move",
      lineStyle : 'dashed',
      marker : {
        visible : true,
      size : 4
      },
      scaleLabel : {
        bold : true,
        backgroundColor : "#fff",
        fontColor : "#474747",
        fontSize : "16px",
        callout : false,
        paddingTop : 2,
        
      },
      plotLabel : {
        backgroundColor : "white",
        borderColor : "#bababa",
        borderRadius : "5px",
        bold : true,
        fontSize : "12px",
        fontColor : "#2f2f2f",
        textAlign : 'right',
        padding : '10px',
        shadow : true,
        shadowAlpha : 0.2,
        shadowBlur : 5,
        shadowDistance : 4,
        shadowColor : "#a1a1a1",
        
      }
    },
    plot : {
      tooltip : {
        visible : false
      },
      aspect : 'spline',
      marker : {
        backgroundColor : "white",
        borderWidth : "2px",
      },
      hoverMarker : {
        backgroundColor : 'none',
        size : 10
      }
    },
    scaleX : {
      lineColor : "#E3E8E9",
      fontColor : "#879CAB",
      guide :{
        visible : true,
        lineWidth : "1px",
        lineColor : "#E3E8E9",
        lineStyle : "solid"
      },
      tick : {
        visible : false
      },
      labels : $scope.dateArray
    },
    scaleY : {
      lineColor : "#E3E8E9",
      fontColor : "#879CAB",
      guide :{
        visible : true,
        lineWidth : "1px",
        lineColor : "#E3E8E9",
        lineStyle : "solid"
      },
       tick : {
        visible : false
      }
    },
    series : [
        {
            values : $scope.customerArray,
            text : "Paying Customers",
            lineColor : "#00ACF2",
            marker : {
        borderColor : "#00ACF2"
      }
        }
    ]
};

  $scope.myJson2 = {
    type: "bar", 
    title: {
      textAlign:'left',
    },
    crosshairX : {
      lineColor : "#b6b6b6",
      trigger : "move",
      lineStyle : 'dashed',
      marker : {
        visible : true,
      size : 4
      },
      scaleLabel : {
        bold : true,
        backgroundColor : "#fff",
        fontColor : "#474747",
        fontSize : "16px",
        callout : false,
        paddingTop : 2,
        
      },
      plotLabel : {
        backgroundColor : "white",
        borderColor : "#bababa",
        borderRadius : "5px",
        bold : true,
        fontSize : "12px",
        fontColor : "#2f2f2f",
        textAlign : 'right',
        padding : '10px',
        shadow : true,
        shadowAlpha : 0.2,
        shadowBlur : 5,
        shadowDistance : 4,
        shadowColor : "#a1a1a1",
        
      }
    },
    plot : {
      tooltip : {
        visible : false
      },
      aspect : 'spline',
      marker : {
        backgroundColor : "white",
        borderWidth : "2px",
      },
      hoverMarker : {
        backgroundColor : 'none',
        size : 10
      }
    },
    scaleX : {
      lineColor : "#E3E8E9",
      fontColor : "#879CAB",
      guide :{
        visible : true,
        lineWidth : "1px",
        lineColor : "#E3E8E9",
        lineStyle : "solid"
      },
      tick : {
        visible : false
      },
      labels : $scope.dateArray
    },
    scaleY : {
      lineColor : "#E3E8E9",
      fontColor : "#879CAB",
      guide :{
        visible : true,
        lineWidth : "1px",
        lineColor : "#E3E8E9",
        lineStyle : "solid"
      },
       tick : {
        visible : false
      }
    },
    series : [
        {
            values : $scope.reportedIssues,
            text : "Paying Customers",
            lineColor : "#00ACF2",
            marker : {
        borderColor : "#00ACF2"
      }
        }
    ]
};

}])
dashboardApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/assets/issues.htm', 
		controller: 'issuesController'
	})
	.when('/keyMetrics', {
		templateUrl: '/assets/key_metrics.htm', 
		controller: 'keyMetricsController'
	})
	.when('/employees', {
		templateUrl: '/assets/employees.htm', 
		controller: 'employeesController'
	})
}])