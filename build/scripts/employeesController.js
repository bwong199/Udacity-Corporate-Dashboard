dashboardApp.controller("employeesController",["$scope","$http","$timeout",function(o,t,a){o.markers="",t.get("https://corporate-dashboard.firebaseio.com/locations.json").then(function(t){for(x in t.data)o.markers=t.data});var e=function(){a(function(){t.get("https://corporate-dashboard.firebaseio.com/locations.json").then(function(t){o.markers="";for(x in t.data)o.markers=t.data;console.log("Fetching data")}),e()},1e4)};e(),o.map={center:{latitude:39.8282,longitude:-98.5795},zoom:2}}]);