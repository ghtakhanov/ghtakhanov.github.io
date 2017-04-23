'use strict';

/**
 * @ngdoc function
 * @name erdbApp.controller:aboutCtrl
 * @description
 * # aboutCtrl
 * Controller of the erdbApp
 */
angular.module('erdbApp')
  .controller('AboutCtrl', function($scope) {
    var about = this;
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;
    var text =[];



    $scope.addSlide = function(b) {
      slides.push({
        image: '//localhost:9000/images/1.jpg',
        text: 'IMAX-зал - это новый экран, спроектированный под геометрию зала и покрытый серебряным напылением',
        id: currIndex++
      });
      slides.push({
        image: '//localhost:9000/images/2.jpg',
        text: 'Super VIP зал. ',
        id: currIndex++
      });
      slides.push({
        image: '//localhost:9000/images/3.jpg',
        text: 'Зал повышенного комфорта. Цифровой проектор NEC, 3D MasterImage; 3D звук (13.1 каналов) - IMM-sound.',
        id: currIndex++
      });
      slides.push({
        image: '//localhost:9000/images/4.jpg',
        text: 'Цифровой проектор NEC, 3D MasterImage; 3Dзвук (13.1 каналов) - IMM-sound.',
        id: currIndex++
      });
      // slides.push({
      //   image: '//localhost:9000/images/5.jpg',
      //   text: 'Цифровой проектор NEC, 3D MasterImage',
      //   id: currIndex++
      // });
      //
      // slides.push({
      //   image: '//localhost:9000/images/6.jpg',
      //   text: 'Цифровой проектор NEC 4K, 3D MasterImage; 3D звук (23.1 канала) - Dolby Atmos',
      //   id: currIndex++
      // });
    };

    $scope.addSlide();


  });
