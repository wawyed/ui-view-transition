'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'ngAnimate',
  'myApp.version'
]).
config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('state1', {
    url: '/state1',
    views: {
      'view1': {
        templateUrl: 'view1/view1.html'
      }
    },
    resolve: {
      delay1: function($q, $timeout) {
        //return $timeout(angular.noop, 3000);
      }
    }
  })
    .state('state2', {
      url: '/state2',
      views: {
        'view1': {
          templateUrl: 'view2/view2.html'
        }
      },
      resolve: {
        delay2: function($q, $timeout) {
          //return $timeout(angular.noop, 3000);
        }
      }
    });
}])
.directive('transition', function($animate, $compile) {
    return {
      controller: function($scope, $element, $attrs) {
        var views = [];
        var loader = angular.element('<div class="view-transition">loading</div>');
        this.register = function(element) {
          views = element;
        };
        $scope.$on('$stateChangeStart', function() {
          $animate.leave(views);
          $animate.enter(loader, $element);
        });
        $scope.$on('$stateChangeSuccess', function() {
          $animate.leave(loader);
        })
      }
    }
  })
.directive('transitionView', function($animate) {
  return {
    require: '^transition',
    link: function(scope, element, attr, ctrl) {
      ctrl.register(element);
    }
  }
});
