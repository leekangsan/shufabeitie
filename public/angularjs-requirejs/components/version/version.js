'use strict';

angular.module('shufabeitie.version', [
  'shufabeitie.version.interpolate-filter',
  'shufabeitie.version.version-directive'
])

.value('version', 'angularjs');
