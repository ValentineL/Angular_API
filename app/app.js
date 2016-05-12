/*var app = angular.module('angularTable', ['angularUtils.directives.dirPagination']);

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
}]);*/

angular.module('angularTable', ['angularUtils.directives.dirPagination'])

    .controller('listdata', function ($scope, SimpleGithubUser, GithubUserFactory) {

      $scope.repos = [];
      $scope.url = {type:"users", name:""};

      $scope.fetchRepos = function (type, name) {
        repos.forEach(function (userName) {
          var user = GithubUserFactory.create(userName);
          user.getProfile().then(function (type, name) {
            $scope.repos.push(user);
          });
        });
      }

      $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
      }
    })

    .factory('SimpleGithubUser', function ($http) {
      var apiUrl = 'https://api.github.com/'+type+'/'+name+'/repos';

      // instantiate our object
      var SimpleGithubUser = function (username) {
        this.username = username;
        this.profile = null;
      };
      // this method will fetch data from GH API and return a promise
      SimpleGithubUser.prototype.getProfile = function (type, name) {
        // Generally, javascript callbacks, like here the $http.get callback, change the value of the "this" variable inside callbacks so we need ot keep a reference to the current instance "this", and we do it with the following :
        var self = this;
        return $http.get(apiUrl).then(function (response) {
          // we store the API result in user.profile.
          self.profile = response.data
          // promises success should always return something in order to allow promise chaining
          return response;
        });
      };
      return SimpleGithubUser;
    })

