/*
MyBook App controller

 - myApp.config defines the path of subpage
 - myBookApp.factory defines the communication protocol with backend
 - myBookApp.controller defines controller for each subpage

*/

var myBookApp = angular.module('myBookApp', ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'ngResource']);
myBookApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/index', {
            // My Books page
            controller: 'indexCtrl',
            templateUrl: '/assets/partials/index.html'
        })
        .when('/manage', {
            // Manage page
            controller: 'indexCtrl',
            templateUrl: '/assets/partials/manage.html'
        })
        .when('/addbook', {
            // Add a New book page
            controller: 'addCtrl',
            templateUrl: '/assets/partials/addbook.html'
        })
        .when('/book/:id', {
            // Edit Information page
            controller: 'bookCtrl',
            templateUrl: '/assets/partials/book.html'
        })
        .otherwise({
            redirectTo: '/index'
        });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

myBookApp.factory('books', function($resource) {
    //Update an existing book on server
    var resource = $resource('http://45.77.36.60/book/:id', {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
    //Add a new book to the server
    var resource2 = $resource('http://45.77.36.60/books/:id', {
        id: '@id'
    }, {
        add: {
            method: 'POST'
        }
    });
    return {
        get: function() {
            //Get all books' information from server
            return resource2.query();
        },
        find: function(id, success, error) {
            //Get a single book from server
            return resource.query({
                id: id
            }, success, error);
        },
        create: function() {
            //Create a new book on server
            return new resource2();
        },
        destroy: function(id) {
            //Delete one book on the server
            resource.delete({
                id: id
            });
        }
    };
    return resource.get({
        id: id
    }, function() {
        window.alert('Success!');
    }, function() {
        window.alert('Error!');
    });
});

myBookApp.controller('indexCtrl', function($scope, books) {
    // Get all books from server
    $scope.books = books.get();
    $scope.delete = function(index) {
        // Delete a book
        books.destroy($scope.books[index].id);
        $scope.books.splice(index, 1);
    };
    $scope.orderByMe = function(x) {
        // Sort books by index
        $scope.myOrderBy = x;
    }
});

myBookApp.controller('bookCtrl', function($scope, $routeParams, books, $timeout) {
    // Get a single book from server
    var response = books.find($routeParams.id)
    response.$promise.then(function onSuccess(data) {
            $scope.book = data[0];
        },
        function onFail(data) {
            window.alert('There was an error!');
        });
    //Saving the edited book
    $scope.$on('saved', function() {
        $timeout(function() {
            $scope.book.$update();
        }, 0);
    });
});

myBookApp.controller('addCtrl', function($scope, books, $location) {
    $scope.book = {
        completed: false
    }
    $scope.book = books.create();
    // Create a new book and redirect to manage page
    $scope.submit = function() {
        $scope.book.$add();
        $scope.book = books.create();
        $location.path('/manage');
    };
});

myBookApp.controller('searchCtrl', function($scope, $location) {
    // Redirect to manage page after inputting words on the search block
    $scope.startSearch = function() {
        $location.path('/manage');
    };
});

myBookApp.directive('editable', function() {
    // Linking the editor after clicking on edit
    return {
        restrict: 'A',
        templateUrl: '/assets/partials/editable.html',
        scope: {
            value: '=editable',
            field: '@fieldType'
        },
        controller: function($scope) {
            // For showing the editor
            $scope.editor = {
                showing: false,
                value: $scope.value
            };
            $scope.field = ($scope.field) ? $scope.field : 'text';
            $scope.save = function() {
                $scope.value = $scope.editor.value;
                $scope.toggleEditor();
                $scope.$emit('saved');
            };
            $scope.toggleEditor = function() {
                $scope.editor.showing = !$scope.editor.showing;
            };
        }
    };
});
