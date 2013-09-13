class @QueryDSL
  @_query: {}

  constructor: (@_query) ->

  #for elasticsearch search type 'query'

  @query: (fun) ->
    @_query = {query: {}}
    fun.call(new QueryDSL(@_query.query))
    @_query

  #for dsl query
  query: (options, fun) ->
    @_addWithFunction('query', options, fun)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/match-query/
  ###

  match: (options) ->
    @_add('match', options)

  match_phrase: (options) ->
    @_add('match_phrase', options)

  match_phrase_prefix: (options) ->
    @_add('match_phrase_prefix', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/multi-match-query/
  ###

  multi_match: (options) ->
    @_add('multi_match', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/ids-query/
  ###

  ids: (options) ->
    @_add('ids', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/field-query/
  ###

  field: (options) ->
    @_add('field', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/flt-query/
  ###

  flt: (options) ->
    @_add('fuzzy_like_this', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/flt-field-query/
  ###

  flt_field: (options) ->
    @fuzzy_like_this_field(options)

  fuzzy_like_this_field: (options) ->
    @_add('fuzzy_like_this_field', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/fuzzy-query/
  ###

  fuzzy: (options) ->
    @_add('fuzzy', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/match-all-query/
  ###

  match_all: (options={}) ->
    @_add('match_all', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/mlt-query/
  ###

  mlt: (options) ->
    @more_like_this(options)

  more_like_this: (options) ->
    @_add('more_like_this', options)


  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/mlt-field-query/
  ###

  more_like_this_field: (options) ->
    @_add('more_like_this_field', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/prefix-query/
  ###

  prefix: (options) ->
    @_add('prefix', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/query-string-query/
  ###

  query_string: (options) ->
    @_add('query_string', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/range-query/
  ###

  range: (options) ->
    @_add('range', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/regexp-query/
  ###

  regexp: (options) ->
    @_add('regexp', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/term-query/
  ###

  term: (options) ->
    @_add('term', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/terms-query/
  ###

  terms: (options) ->
    @_add('terms', options)


  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/common-terms-query/
  ###

  common: (options) ->
    @_add('common', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/wildcard-query/
  ###

  wildcard: (options) ->
    @_add('wildcard', options)


  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/text-query/
  ###

  text: (options) ->
    @_add('text', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/geo-shape-query/
  ###

  geo_shape: (options) ->
    @_add('geo_shape', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/bool-query/
  ###

  bool: (options, fun) ->
    @_addWithFunction('bool', options, fun)

  must: (options, fun) ->
    @_addWithFunction('must', options, fun, [])

  must_not: (options, fun) ->
    @_addWithFunction('must_not', options, fun, [])

  should: (options, fun) ->
    @_addWithFunction('should', options, fun, [])


  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/boosting-query/
  ###

  boosting: (options, fun) ->
    @_addWithFunction('boosting', options, fun)

  positive: (options, fun) ->
    @_addWithFunction('positive', options, fun)

  negative: (options, fun) ->
    @_addWithFunction('negative', options, fun)


  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/custom-score-query/
  ###

  custom_score: (options, fun) ->
    @_addWithFunction('custom_score', options, fun)

  params: (options) ->
    @_add('params', options)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/constant-score-query/
  ###

  constant_score: (options, fun) ->
    @_addWithFunction('constant_score', options, fun)

  ###
    http://www.elasticsearch.org/guide/reference/query-dsl/custom-boost-factor-query/
  ###

  custom_boost_factor: (options, fun) ->
    @_addWithFunction('custom_boost_factor', options, fun)

  #private methods

  _extractFun: (options, fun, optionsType={}) ->
    if typeof options == 'function'
      fun = options
      _options = optionsType
    else
      _options = options
    [_options, fun]

  _add: (type, options) ->
    params = {}
    params[type] = options
    if @_query["push"]
      @_query.push(params)
    else
      @_query[type] = options
    params

  _addWithFunction: (type, options, fun, optionsType={}) ->
    [_options, fun] = @_extractFun(options, fun, optionsType)
    _options = @_add(type, _options)
    if fun
      fun.call(new QueryDSL(_options[type]))