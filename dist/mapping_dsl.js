(function() {
  this.MappingDSL = (function() {
    MappingDSL.mapping = function(options, fun) {
      this._mappings = {
        mappings: {}
      };
      if (fun) {
        this._mappings.settings = options;
      } else {
        fun = options;
      }
      fun.call(new MappingDSL(this._mappings.mappings));
      return this._mappings;
    };

    MappingDSL.create = function(url, json) {
      var hash,
        _this = this;
      this.responce = void 0;
      hash = {};
      hash.url = url;
      hash.type = "PUT";
      hash.dataType = 'json';
      hash.async = false;
      hash.contentType = 'application/json; charset=utf-8';
      hash.data = JSON.stringify(json);
      hash.success = function(data) {
        return _this.responce = data;
      };
      Ember.$.ajax(hash);
      return this.responce;
    };

    MappingDSL["delete"] = function(url) {
      var hash,
        _this = this;
      this.responce = void 0;
      hash = {};
      hash.url = url;
      hash.type = "DELETE";
      hash.async = false;
      hash.success = function(data) {
        return _this.responce = data;
      };
      Ember.$.ajax(hash);
      return this.responce;
    };

    function MappingDSL(_mappings) {
      this._mappings = _mappings;
    }

    MappingDSL.prototype.mapping = function(type, options, fun) {
      var mappings;
      mappings = {};
      if (fun || typeof options === 'function') {
        if (typeof options !== 'function') {
          options.properties = {};
          mappings = options;
        } else {
          fun = options;
          mappings.properties = {};
        }
        this._mappings[type] = mappings;
        return fun.call(new MappingDSL(mappings.properties));
      } else {
        return this._mappings[type] = options || mappings;
      }
    };

    return MappingDSL;

  })();

}).call(this);
