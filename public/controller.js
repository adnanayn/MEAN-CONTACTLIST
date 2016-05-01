var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
var refresh = function(){
    $http.get('/contactlist').success(function (response) {
    console.log("GET DATA REQ");
    $scope.contactlist = response;
});
};
    refresh();
    $scope.addContact = function () {
        console.log($scope.contact);
        $http.post('/contactlist',$scope.contact).success(function (res) {
           console.log(res);
            refresh();
        });
    }

    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/contactlist/' + id).success(function (res) {
            console.log(res);
            refresh();
        });
    };

    $scope.edit = function (id) {
        console.log(id);
        $http.get('/contactlist/' + id).success(function (res) {
            console.log(res);
            $scope.contact = res;
        });
    };
    
    $scope.update = function () {
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (res) {
            refresh();
        });
    };
    $scope.deselect = function () {
        $scope.contact ="";
    };
}]);