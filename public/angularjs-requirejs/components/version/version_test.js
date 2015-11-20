'use strict';

describe('shufabeitie.version module', function() {
  beforeEach(module('shufabeitie.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
