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