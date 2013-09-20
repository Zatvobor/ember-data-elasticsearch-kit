(function() {
  this.BulkDSL = (function() {
    BulkDSL.store = function(options, fun) {
      this.documents = [];
      fun.call(new BulkDSL(options, this.documents));
      return this.request(options, this.documents);
    };

    BulkDSL.url = function(options) {
      return "%@/%@".fmt(options.host, "_bulk");
    };

    BulkDSL.request = function(options, json) {
      var hash,
        _this = this;
      this.responce = void 0;
      hash = {};
      hash.url = this.url(options);
      hash.type = "POST";
      hash.dataType = 'json';
      hash.async = false;
      hash.contentType = 'application/json; charset=utf-8';
      hash.data = json.join("\n");
      hash.success = function(data) {
        return _this.responce = data;
      };
      Ember.$.ajax(hash);
      return this.responce;
    };

    function BulkDSL(options, documents) {
      this.options = options;
      this.documents = documents;
      this.meta = ["_type", "_index"];
      this._index = this.options.index;
      this._type = this.options.type || "document";
    }

    BulkDSL.prototype.create = function(options) {
      this.documents.push(JSON.stringify({
        create: this._createHeader(options)
      }));
      return this.documents.push(JSON.stringify(options));
    };

    BulkDSL.prototype["delete"] = function(options) {
      this.documents.push(JSON.stringify({
        "delete": this._createHeader(options)
      }));
      return this.documents.push(JSON.stringify(options));
    };

    BulkDSL.prototype.index = function(options) {
      this.documents.push(JSON.stringify({
        index: this._createHeader(options)
      }));
      return this.documents.push(JSON.stringify(options));
    };

    BulkDSL.prototype.update = function(options) {
      this.documents.push(JSON.stringify({
        update: this._createHeader(options)
      }));
      return this.documents.push(JSON.stringify(options));
    };

    BulkDSL.prototype._createHeader = function(options) {
      var headers,
        _this = this;
      headers = {};
      ["_type", "_index", "_version", "_routing", "_percolate", "_parent", "_timestamp", "_ttl"].forEach(function(type) {
        if (_this.meta.indexOf(type) >= 0) {
          if (!options[type]) {
            headers[type] = _this[type];
          } else {
            headers[type] = options[type];
            delete options[type];
          }
        } else {
          if (options[type]) {
            headers[type] = options[type];
            delete options[type];
          }
        }
        return headers._id = options.id;
      });
      return headers;
    };

    return BulkDSL;

  })();

}).call(this);
