var app = angular.module('angularTable', ['angularUtils.directives.dirPagination']);

app.controller('listdata',["$scope", "$http", function reposController($scope, $http) {
  $scope.repos = [];//declare an empty array
  $scope.url   = { type: "users", name: "" };
  $scope.fetchRepos = function ( type, name )
  {
    $http.get('https://api.github.com/'+type+'/'+name+'/repos').then(function ( response )
    {
      // success
      if (response.status == 200) {
        $scope.repos = response.data;
      } else {
        console.error(response);
      }
    });
  }
  $scope.sort = function(keyname){
    $scope.sortKey = keyname;   //set the sortKey to the param passed
    $scope.reverse = !$scope.reverse; //if true make it false and vice versa
  }
}]);
