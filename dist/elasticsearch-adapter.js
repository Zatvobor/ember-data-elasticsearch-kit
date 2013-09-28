(function() {
  DS.ElasticSearchAdapter = DS.Adapter.extend({
    buildURL: function() {
      var host, namespace, url;
      host = Ember.get(this, "host");
      namespace = Ember.get(this, "namespace");
      url = [];
      if (host) {
        url.push(host);
      }
      if (namespace) {
        url.push(namespace);
      }
      url.push(Ember.get(this, "url"));
      url = url.join("/");
      if (!host) {
        url = "/" + url;
      }
      return url;
    },
    ajax: function(url, type, normalizeResponce, hash) {
      return this._ajax('%@/%@'.fmt(this.buildURL(), url || ''), type, normalizeResponce, hash);
    },
    _ajax: function(url, type, normalizeResponce, hash) {
      var adapter;
      if (hash == null) {
        hash = {};
      }
      adapter = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {
        var headers;
        if (url.split("/").pop() === "") {
          url = url.substr(0, url.length - 1);
        }
        hash.url = url;
        hash.type = type;
        hash.dataType = 'json';
        hash.contentType = 'application/json; charset=utf-8';
        hash.context = adapter;
        if (hash.data && type !== 'GET') {
          hash.data = JSON.stringify(hash.data);
        }
        if (adapter.headers) {
          headers = adapter.headers;
          hash.beforeSend = function(xhr) {
            return forEach.call(Ember.keys(headers), function(key) {
              return xhr.setRequestHeader(key, headers[key]);
            });
          };
        }
        if (!hash.success) {
          hash.success = function(json) {
            var _modelJson;
            _modelJson = normalizeResponce.call(adapter, json);
            return Ember.run(null, resolve, _modelJson);
          };
        }
        hash.error = function(jqXHR, textStatus, errorThrown) {
          if (jqXHR) {
            jqXHR.then = null;
          }
          return Ember.run(null, reject, jqXHR);
        };
        return Ember.$.ajax(hash);
      });
    },
    find: function(store, type, id) {
      var normalizeResponce;
      normalizeResponce = function(data) {
        var _modelJson;
        _modelJson = {};
        _modelJson[type.typeKey] = data['_source'];
        return _modelJson;
      };
      return this.ajax(id, 'GET', normalizeResponce);
    },
    findMany: function(store, type, ids) {
      var data, normalizeResponce;
      data = {
        ids: ids
      };
      normalizeResponce = function(data) {
        var json;
        json = {};
        json[Ember.String.pluralize(type.typeKey)] = data['docs'].getEach('_source');
        return json;
      };
      return this.ajax('_mget', 'POST', normalizeResponce, {
        data: data
      });
    },
    findQuery: function(store, type, query, modelArray) {
      var normalizeResponce;
      normalizeResponce = function(data) {
        var json, _type,
          _this = this;
        json = {};
        _type = Ember.String.pluralize(type.typeKey);
        modelArray.set('total', data['hits'].total);
        json[_type] = data['hits']['hits'].getEach('_source');
        json[_type].forEach(function(item) {
          if (item._id && !item.id) {
            return item.id = item._id;
          }
        });
        if (query.fields && query.fields.length === 0) {
          json[_type] = data['hits']['hits'].getEach('_id');
        }
        return json;
      };
      return this.ajax('_search', 'POST', normalizeResponce, {
        data: query
      });
    },
    createRecord: function(store, type, record) {},
    updateRecord: function(store, type, record) {},
    deleteRecord: function(store, type, record) {}
  });

}).call(this);
