dashboardApp.controller("employeesController",function(o,a,t){o.markers="",a.get("https://corporate-dashboard.firebaseio.com/locations.json").then(function(a){for(x in a.data)o.markers=a.data});var e=function(){t(function(){a.get("https://corporate-dashboard.firebaseio.com/locations.json").then(function(a){o.markers="";for(x in a.data)o.markers=a.data;console.log("Fetching data")}),e()},1e4)};e(),o.map={center:{latitude:39.8282,longitude:-98.5795},zoom:2}});