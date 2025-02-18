const app = angular.module('app', ['ngRoute', 'ngCookies']);
const server = 'http://localhost:8080';

// MAIN APP CONTROLLER
app.controller('control', ($scope, $http) => {

    $scope.dataPaths = ['products', 'categories'];
    $scope.data = {
        name: "STU-DEV 1922",
        phone: '(+84)946810203',
        email: 'sdhoa1922@gmail.com',
    }
    $scope.key = {
        categories: 'cg_id',
        products: 'pr_id',
    }
    $scope.elemt = {};

    function handleErr(err) {
        if (err.status === 500) {
            switch (err.data.errno) {
                case 19: $scope.state = 'Cannot delete constraint data!'; break;
            }
        }
        $scope.status = err.message
        return err
    }

    $scope.get = (path, page = 0, qty = 10) => $http.get(`${server}/api/${path}`) //?page=${page}&qty=${qty}
        .then(rs => {
            $scope.data.array = rs.data
            $scope.state = `GET ${rs.data.length} items from ${server}/api/${path}`
        }).catch(handleErr).finally(_ => $scope.keys = $scope.data.array[0] ? Object.keys($scope.data.array[0]) : [])


    $scope.post = (path) => {
        if ($scope.elemt) $http.post(`${server}/api/${path}`, $scope.elemt)
            .then(rs => {
                $scope.data.array.push(rs.data);
                Object.assign($scope.elemt, rs.data);
                $scope.state = `POST element to ${server}/api/${path} : ${JSON.stringify(rs.data)}`
            }).catch(handleErr)
    }

    $scope.update = (path, elemt) => {
        if (elemt) $http.put(`${server}/api/${path}`, elemt)
            .then(rs => {
                Object.assign(elemt, rs.data);
                $scope.state = `PUT element to ${server}/api/${path} : ${JSON.stringify(rs.data)}`
            }).catch(handleErr)
    }

    $scope.delete = (path, index) => {
        var data = $scope.data.array[index];
        data = { [$scope.key[path]]: data[$scope.key[path]] }

        if (data)
            $http({
                method: 'DELETE',
                url: `${server}/api/${path}`,
                headers: { 'Content-Type': 'application/json' },
                data
            }).then(_rs => {
                $scope.data.array?.splice(index, 1);
            }).catch(handleErr)
    }
});