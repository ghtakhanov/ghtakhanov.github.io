'use strict';

/**
 * @ngdoc overview
 * @name erdbApp
 * @description
 * # erdbApp
 *
 * Main module of the application.
 */
angular
  .module('erdbApp', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngDialog',
    'angular-loading-bar',
    'sun.scrollable',
    'datePicker',
    'angularMoment',
    'ngStorage',
    'multipleSelect',
    'w11k.select',
    'ng-bs3-datepicker',
    'ui.bootstrap',
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, ngDialogProvider, $provide, moment) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $provide.decorator('mFormatFilter', function() {
      return function newFilter(m, format, tz) {
        if (_.isNull(m)) {
          return moment().format(format);
        } else if (!(moment.isMoment(m))) {
          return '';
        }
        return tz ? moment.tz(m, tz).format(format) : m.format(format);
      };
    });
    ngDialogProvider.setDefaults({
      className: 'ngdialog-theme-default',
      showClose: false,
      closeByDocument: true,
      closeByEscape: true
    });
    $stateProvider
      .state('index', {
        title: 'Главная',
        url: '/',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('aboutUs', {
        title: 'О нас',
        url: '/aboutUs',
        templateUrl: 'views/aboutUs.html',
        controller: 'aboutUsCtrl',
        controllerAs: 'au'
      })
      .state('cost', {
        title: 'Цены',
        url: '/cost',
        templateUrl: 'views/cost.html',
        controller: 'costCtrl',
        controllerAs: 'cs',
      })
      .state('contacts', {
        title: 'Контакты',
        url: '/contacts',
        templateUrl: 'views/contacts.html',
        controller: 'contactsCtrl',
        controllerAs: 'contacts',
      });
  })
  .run(function(amMoment, $rootScope, $window, $http, $localStorage, $state, $cookies, $interval) {
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
          $('#navbar').removeClass('in');
      });
    amMoment.changeLocale('ru');
    $rootScope.online = navigator.onLine;
    $rootScope.isLogin = $localStorage.isLogin;
    var currentDomain = location.hostname === 'localhost' ? 'localhost:9000' : 'rdb.minzdrav.kz';
    var expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + (60 * 60 * 60 * 100));
    var homeLink = 'http://5.104.236.197:222';
    $window.addEventListener('offline', function() {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }, false);

    $rootScope.isLogin=true;
    $window.addEventListener('online', function() {
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }, false);
    $rootScope.login = function() {
      $window.location.href = homeLink + '/oauth/authorize?client_id=f16efbf28acd4842a3023dff1c5a61d1&scope=profile&response_type=token&redirect_uri=http://' + currentDomain + '?redirect';
    };
    // if (location.hash.length > 0) {
    //   var token = location.hash.split('&')[0].split('=')[1];
    //   $cookies.put('token', token, {
    //     'expires': expireDate
    //   });
    //   $rootScope.isLogin = true;
    // }
    $rootScope.isNavBar = true;
    $rootScope.logout = function() {
      $cookies.remove('token');
      $http.defaults.headers.common.Authorization = '';
      $state.go('index');
      delete $localStorage.firstName;
      delete $localStorage.middleName;
      $rootScope.isLogin = false;
    };
    // if ($cookies.get('token')) {
    //   $rootScope.token = $cookies.get('token');
    //   $rootScope.isLogin = true;
    //   $interval(function() {
    //     if (!$cookies.get('token')) {
    //       $rootScope.logout();
    //       console.log('Токен просрочен');
    //     }
    //   }, 100000);
    // }
    // $http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.token;
  });
