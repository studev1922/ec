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

    $scope.get = (path = 'products') => $http.get(`${server}/api/${path}`)
        .then(rs => {
            $scope.data.array = rs.data
        }).catch(err => {
            console.error(err);
            $scope.data.array = [err]
        });
});