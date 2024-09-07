const app = angular.module('app', ['ngRoute', 'ngCookies']);
const server = this.location.origin || 'http://localhost:8080';

// MAIN APP CONTROLLER
app.controller('control', ($scope, $http) => {

    $scope.dataPaths = ['products', 'categories', 'users'];
    $scope.data = {
        name: "STU-DEV 1922",
        phone: '(+84)946810203',
        email: 'sdhoa1922@gmail.com',
    }
    $scope.elemt = {};

    $scope.get = (path = 'products') => $http.get(`${server}/api/${path}`)
        .then(rs => {
            $scope.data.array = rs.data
        }).catch(err => {
            console.error(err);
            $scope.data.array = [err]
        }).finally(_ => $scope.keys = $scope.data.array[0] ? Object.keys($scope.data.array[0]) : []);


    $scope.post = (path = 'products') => {
        console.log($scope.elemt);

        if ($scope.elemt) $http.post(`${server}/api/${path}`)
            .then(rs => {
                $scope.data.array.push(rs.data);
                Object.assign($scope.elemt, rs.data);
            }).catch(err => {
                console.error(err);
                $scope.data.array = [err]
            })
    }
});