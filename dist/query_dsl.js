(function() {
  this.QueryDSL = (function() {
    QueryDSL._query = {};

    function QueryDSL(_query) {
      this._query = _query;
    }

    QueryDSL.query = function(fun) {
      this._query = {
        query: {}
      };
      fun.call(new QueryDSL(this._query.query));
      return this._query;
    };

    QueryDSL.prototype.query = function(options, fun) {
      var _options, _ref;
      _ref = this._extractFun(options, fun), _options = _ref[0], fun = _ref[1];
      this._add('query', _options);
      if (fun) {
        return fun.call(new QueryDSL(_options.query));
      }
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/match-query/
    */


    QueryDSL.prototype.match = function(options) {
      return this._add('match', options);
    };

    QueryDSL.prototype.match_phrase = function(options) {
      return this._add('match_phrase', options);
    };

    QueryDSL.prototype.match_phrase_prefix = function(options) {
      return this._add('match_phrase_prefix', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/multi-match-query/
    */


    QueryDSL.prototype.multi_match = function(options) {
      return this._add('multi_match', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/ids-query/
    */


    QueryDSL.prototype.ids = function(options) {
      return this._add('ids', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/field-query/
    */


    QueryDSL.prototype.field = function(options) {
      return this._add('field', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/flt-query/
    */


    QueryDSL.prototype.flt = function(options) {
      return this._add('fuzzy_like_this', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/flt-field-query/
    */


    QueryDSL.prototype.flt_field = function(options) {
      return this.fuzzy_like_this_field(options);
    };

    QueryDSL.prototype.fuzzy_like_this_field = function(options) {
      return this._add('fuzzy_like_this_field', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/fuzzy-query/
    */


    QueryDSL.prototype.fuzzy = function(options) {
      return this._add('fuzzy', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/match-all-query/
    */


    QueryDSL.prototype.match_all = function(options) {
      if (options == null) {
        options = {};
      }
      return this._add('match_all', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/mlt-query/
    */


    QueryDSL.prototype.mlt = function(options) {
      return this.more_like_this(options);
    };

    QueryDSL.prototype.more_like_this = function(options) {
      return this._add('more_like_this', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/mlt-field-query/
    */


    QueryDSL.prototype.more_like_this_field = function(options) {
      return this._add('more_like_this_field', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/prefix-query/
    */


    QueryDSL.prototype.prefix = function(options) {
      return this._add('prefix', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/query-string-query/
    */


    QueryDSL.prototype.query_string = function(options) {
      return this._add('query_string', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/range-query/
    */


    QueryDSL.prototype.range = function(options) {
      return this._add('range', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/regexp-query/
    */


    QueryDSL.prototype.regexp = function(options) {
      return this._add('regexp', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/term-query/
    */


    QueryDSL.prototype.term = function(options) {
      return this._add('term', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/terms-query/
    */


    QueryDSL.prototype.terms = function(options) {
      return this._add('terms', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/common-terms-query/
    */


    QueryDSL.prototype.common = function(options) {
      return this._add('common', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/wildcard-query/
    */


    QueryDSL.prototype.wildcard = function(options) {
      return this._add('wildcard', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/text-query/
    */


    QueryDSL.prototype.text = function(options) {
      return this._add('text', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/geo-shape-query/
    */


    QueryDSL.prototype.geo_shape = function(options) {
      return this._add('geo_shape', options);
    };

    QueryDSL.prototype._extractFun = function(options, fun) {
      var _options;
      if (typeof options === 'function') {
        fun = options;
        _options = {};
      } else {
        _options = options;
      }
      return [_options, fun];
    };

    QueryDSL.prototype._add = function(type, options) {
      var params;
      params = {};
      params[type] = options;
      if (this._query["push"]) {
        this._query.push(params);
      } else {
        this._query[type] = options;
      }
      return params[type];
    };

    return QueryDSL;

  })();

}).call(this);
