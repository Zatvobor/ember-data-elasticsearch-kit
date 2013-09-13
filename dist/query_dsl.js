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
      return this._addWithFunction('query', options, fun);
    };

    QueryDSL.prototype.filter = function(options, fun) {
      return this._addWithFunction('filter', options, fun);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/match-query/
    */


    QueryDSL.prototype.match = function(options, fun) {
      return this._add('match', options, fun);
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

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/bool-query/
    */


    QueryDSL.prototype.bool = function(options, fun) {
      return this._addWithFunction('bool', options, fun);
    };

    QueryDSL.prototype.must = function(options, fun) {
      return this._addWithFunction('must', options, fun, []);
    };

    QueryDSL.prototype.must_not = function(options, fun) {
      return this._addWithFunction('must_not', options, fun, []);
    };

    QueryDSL.prototype.should = function(options, fun) {
      return this._addWithFunction('should', options, fun, []);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/boosting-query/
    */


    QueryDSL.prototype.boosting = function(options, fun) {
      return this._addWithFunction('boosting', options, fun);
    };

    QueryDSL.prototype.positive = function(options, fun) {
      return this._addWithFunction('positive', options, fun);
    };

    QueryDSL.prototype.negative = function(options, fun) {
      return this._addWithFunction('negative', options, fun);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/custom-score-query/
    */


    QueryDSL.prototype.custom_score = function(options, fun) {
      return this._addWithFunction('custom_score', options, fun);
    };

    QueryDSL.prototype.params = function(options) {
      return this._add('params', options);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/constant-score-query/
    */


    QueryDSL.prototype.constant_score = function(options, fun) {
      return this._addWithFunction('constant_score', options, fun);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/custom-boost-factor-query/
    */


    QueryDSL.prototype.custom_boost_factor = function(options, fun) {
      return this._addWithFunction('custom_boost_factor', options, fun);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/dis-max-query/
    */


    QueryDSL.prototype.dis_max = function(options, fun) {
      return this._addWithFunction('dis_max', options, fun);
    };

    QueryDSL.prototype.queries = function(options, fun) {
      return this._addWithFunction('queries', options, fun, []);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/filtered-query/
    */


    QueryDSL.prototype.filtered = function(options, fun) {
      return this._addWithFunction('filtered', options, fun);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/has-child-query/
    */


    QueryDSL.prototype.has_child = function(options, fun) {
      return this._addWithFunction('has_child', options, fun);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/has-parent-query/
    */


    QueryDSL.prototype.has_parent = function(options, fun) {
      return this._addWithFunction('has_parent', options, fun);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/span-first-query/
    */


    QueryDSL.prototype.span_first = function(options, fun) {
      return this._addWithFunction('span_first', options, fun);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/span-multi-term-query/
    */


    QueryDSL.prototype.span_multi = function(options, fun) {
      return this._addWithFunction('span_multi', options, fun);
    };

    QueryDSL.prototype.span_term = function(options, fun) {
      return this._add('span_term', options, fun);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/span-near-query/
    */


    QueryDSL.prototype.span_near = function(options, fun) {
      return this._addWithFunction('span_near', options, fun);
    };

    QueryDSL.prototype.clauses = function(options, fun) {
      return this._addWithFunction('clauses', options, fun, []);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/span-not-query/
    */


    QueryDSL.prototype.span_not = function(options, fun) {
      return this._addWithFunction('span_not', options, fun);
    };

    QueryDSL.prototype.include = function(options, fun) {
      return this._addWithFunction('include', options, fun);
    };

    QueryDSL.prototype.exclude = function(options, fun) {
      return this._addWithFunction('exclude', options, fun);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/span-or-query/
    */


    QueryDSL.prototype.span_or = function(options, fun) {
      return this._addWithFunction('span_or', options, fun);
    };

    /*
      http://www.elasticsearch.org/guide/reference/query-dsl/top-children-query/
    */


    QueryDSL.prototype.top_children = function(options, fun) {
      return this._addWithFunction('top_children', options, fun);
    };

    QueryDSL.prototype.nested = function(options, fun) {
      return this._addWithFunction('nested', options, fun);
    };

    QueryDSL.prototype._extractFun = function(options, fun, optionsType) {
      var _options;
      if (optionsType == null) {
        optionsType = {};
      }
      if (typeof options === 'function') {
        fun = options;
        _options = optionsType;
      } else {
        _options = options;
      }
      return [_options, fun];
    };

    QueryDSL.prototype._add = function(type, options, fun) {
      var params;
      if (fun || typeof options === 'function') {
        return this._addWithFunction(type, options, fun);
      } else {
        params = {};
        params[type] = options;
        if (this._query["push"]) {
          this._query.push(params);
        } else {
          this._query[type] = options;
        }
        return params;
      }
    };

    QueryDSL.prototype._addWithFunction = function(type, options, fun, optionsType) {
      var _options, _ref;
      if (optionsType == null) {
        optionsType = {};
      }
      _ref = this._extractFun(options, fun, optionsType), _options = _ref[0], fun = _ref[1];
      _options = this._add(type, _options);
      if (fun) {
        return fun.call(new QueryDSL(_options[type]));
      }
    };

    return QueryDSL;

  })();

}).call(this);
