module 'QueryDSL',
  setup: ->
    @subject = EDEK.QueryDSL

test "match-query", ->
  expect 1
  json = @subject.query ->
    @match { message: "this is a test" }
  deepEqual json,
    query:
      match:
        message: "this is a test"

test "match-query with options", ->
  expect 1
  json = @subject.query ->
    @match
      message:
        query: "this is a test",
        operator: "and"
  deepEqual json,
    query:
      match:
        message:
          query: "this is a test"
          operator: "and"

test "multi_match", ->
  expect 1
  json = @subject.query ->
    @multi_match
      query: "this is a test"
      fields: [ "subject^2", "message" ]
  deepEqual json,
    query:
      multi_match:
        query: "this is a test"
        fields: [ "subject^2", "message" ]

test "ids", ->
  expect 1
  json = @subject.query ->
    @ids
      type: "my_type"
      values: ["1", "4", "100"]
  deepEqual json,
    query:
      ids:
        type: "my_type", 
        values: ["1", "4", "100"]

test "field", ->
  expect 1
  json = @subject.query ->
    @field {"name.first": "+something -else"}
  deepEqual json,
    query:
      field: {"name.first": "+something -else"}

test 'flt', ->
  expect 1
  json = @subject.query ->
    @flt
      fields: ["name.first", "name.last"]
      like_text: "text like this one"
      max_query_terms: 12
  deepEqual json,
    query:
      fuzzy_like_this:
        fields: ["name.first", "name.last"]
        like_text: "text like this one"
        max_query_terms: 12

test 'fuzzy_like_this_field', ->
  expect 1
  json = @subject.query ->
    @fuzzy_like_this_field
      "name.first":
        like_text: "text like this one"
        max_query_terms: 12
  deepEqual json,
    query:
      fuzzy_like_this_field:
        "name.first":
          like_text: "text like this one"
          max_query_terms: 12

test 'fuzzy', ->
  expect 1
  json = @subject.query ->
    @fuzzy
      user: "ki"
  deepEqual json,
    query:
      fuzzy:
        user: "ki"

test 'match_all', ->
  expect 1
  json = @subject.query ->
    @match_all()
  deepEqual json,
    query:
      match_all: {}

test 'more_like_this', ->
  expect 1
  json = @subject.query ->
    @more_like_this
      fields: ["name.first", "name.last"]
      like_text: "text like this one"
      min_term_freq: 1
      max_query_terms: 12
  deepEqual json,
    query:
      more_like_this:
        fields: ["name.first", "name.last"]
        like_text: "text like this one"
        min_term_freq: 1
        max_query_terms: 12

test 'more_like_this_field', ->
  expect 1
  json = @subject.query ->
    @more_like_this_field
      "name.first":
        "like_text": "text like this one"
        "min_term_freq": 1
        "max_query_terms": 12
  deepEqual json,
    query:
      more_like_this_field:
        "name.first":
          "like_text": "text like this one"
          "min_term_freq": 1
          "max_query_terms": 12

test 'prefix', ->
  expect 1
  json = @subject.query ->
    @prefix
      user: "ki"
  deepEqual json,
    query:
      prefix:
        user: "ki"

test 'query_string', ->
  expect 1
  json = @subject.query ->
    @query_string
      default_field: "content"
      query: "this AND that OR thus"
  deepEqual json,
    query:
      query_string:
        default_field: "content"
        query: "this AND that OR thus"

test 'range', ->
  expect 1
  json = @subject.query ->
    @range
      "age":
        "from": 10
        "to": 20
        "include_lower": true
        "include_upper": false
        "boost": 2.0
  deepEqual json,
    query:
      range:
        "age":
          "from": 10
          "to": 20
          "include_lower": true
          "include_upper": false
          "boost": 2.0

test 'regexp', ->
  expect 1
  json = @subject.query ->
    @regexp
      "name.first": "s.*y"
  deepEqual json,
    query:
      regexp:
        "name.first": "s.*y"

test "term", ->
  expect 1
  json = @subject.query ->
    @term
      user: "kimchy"
  deepEqual json,
    query:
      term:
        user: "kimchy"

test "term with options", ->
  expect 1
  json = @subject.query ->
    @term
      user:
        value: "kimchy"
        boost: 2.0
  deepEqual json,
    query:
      term:
        user:
          value: "kimchy"
          boost: 2.0

test 'terms', ->
  expect 1
  json = @subject.query ->
    @terms
      tags: ["blue", "pill"]
  deepEqual json,
    query:
      terms:
        tags: ["blue", "pill"]

test 'common', ->
  expect 1
  json = @subject.query ->
    @common
      "body":
        "query": "nelly the elephant as a cartoon"
        "cutoff_frequency": 0.001
        "minimum_should_match": 2
  deepEqual json,
    query:
      common:
        "body":
          "query": "nelly the elephant as a cartoon"
          "cutoff_frequency": 0.001
          "minimum_should_match": 2

test 'wildcard', ->
  expect 1
  json = @subject.query ->
    @wildcard
      user: "ki*y"
  deepEqual json,
    query:
      wildcard:
        user: "ki*y"

test 'text', ->
  expect 1
  json = @subject.query ->
    @text
      message: "this is a test"
  deepEqual json,
    query:
      text:
        message: "this is a test"

test 'geo_shape', ->
  expect 1
  json = @subject.query ->
    @geo_shape
      "location":
        "shape":
          "type": "envelope"
          "coordinates": [[13, 53],[14, 52]]
  deepEqual json,
    query:
      geo_shape:
        "location":
          "shape":
            "type": "envelope"
            "coordinates": [[13, 53],[14, 52]]

test 'bool query with must', ->
  expect 1
  json = @subject.query ->
    @bool ->
      @must ->
        @term {user: "kimchy"}
  deepEqual json,
    query:
      bool:
        must: [{term: {user: "kimchy"}}]

test 'bool query with should', ->
  expect 1
  json = @subject.query ->
    @bool ->
      @should ->
        @term {user: "kimchy"}
  deepEqual json,
    query:
      bool:
        should: [{term: {user: "kimchy"}}]

test 'bool query with must and should', ->
  expect 1
  json = @subject.query ->
    @bool ->
      @must ->
        @term {user: "kimchy"}
        @term {message: "my message"}
      @should ->
        @term {user: "k"}
        @term {message: 'm'}
  deepEqual json,
    query:
      bool:
        must: [
          {term: {user: "kimchy"}}
          {term: {message: "my message"}}
        ]
        should: [
          {term: {user: "k"}}
          {term: {message: "m"}}
        ]

test 'bool query with all matchers', ->
  expect 1
  json = @subject.query ->
    @bool ->
      @must ->
        @term {user: "kimchy"}
        @term {message: "my message"}
      @should ->
        @term {user: "k"}
        @term {message: 'm'}
      @must_not ->
        @term {user: "Dart"}
  deepEqual json,
    query:
      bool:
        must: [
          {term: {user: "kimchy"}}
          {term: {message: "my message"}}
        ]
        should: [
          {term: {user: "k"}}
          {term: {message: "m"}}
        ]
        must_not: [
          {term: {user: "Dart"}}
        ]

test 'boosting', ->
  expect 1
  json = @subject.query ->
    @boosting {negative_boost: 0.2}, ->
      @positive ->
        @term {field1: "value1"}
      @negative ->
        @term {field2: "value2"}
  deepEqual json,
    query:
      boosting:
        negative_boost: 0.2
        positive:
          term:
            field1: "value1"
        negative:
          term:
            field2: "value2"

test 'custom_score query', ->
  expect 1
  json = @subject.query ->
    @custom_score {script: "_score * doc['my_numeric_field'].value"}, ->
      @query ->
        @term {user: "k"}
  deepEqual json,
    query:
      custom_score:
        script: "_score * doc['my_numeric_field'].value"
        query:
          term:
            user: "k"

test 'custom_score query with params', ->
  expect 1
  json = @subject.query ->
    @custom_score {script: "_score * doc['my_numeric_field'].value / pow(param1, param2)"}, ->
      @query ->
        @term {user: "k"}
      @params
        param1: 2
        param2: 3.1
  deepEqual json,
    query:
      custom_score:
        script: "_score * doc['my_numeric_field'].value / pow(param1, param2)"
        query:
          term:
            user: "k"
        params:
          param1: 2
          param2: 3.1

test 'custom_boost_factor', ->
  expect 1
  json = @subject.query ->
    @custom_boost_factor {boost_factor: 5.2}, ->
      @query ->
        @term {user: "k"}
  deepEqual json,
    query:
      custom_boost_factor:
        boost_factor: 5.2
        query:
          term:
            user: "k"

test 'constant_score', ->
  expect 1
  json = @subject.query ->
    @constant_score {boost: 1.2}, ->
      @query ->
        @term {user: "k"}
  deepEqual json,
    query:
      constant_score:
        boost: 1.2
        query:
          term:
            user: "k"

test 'dis_max', ->
  expect 1
  json = @subject.query ->
    @dis_max {tie_breaker: 0.7, boost: 1.2}, ->
      @queries ->
        @term {age: 34}
        @term {age: 35}
  deepEqual json,
    query:
      dis_max:
        tie_breaker: 0.7
        boost: 1.2
        queries: [
          {term: { age: 34 }}
          {term: { age: 35 }}
        ]

test 'filtered', ->
  expect 1
  json = @subject.query ->
    @filtered ->
      @query ->
        @term {tag: "wow"}
      @filter ->
        @range {age: {from: 10, to: 20}}
  deepEqual json,
    query:
      filtered:
        query:
          term:
            tag: 'wow'
        filter:
          range:
            age:
              from: 10
              to: 20

test 'has_child', ->
  expect 1
  json = @subject.query ->
    @has_child {type: "blog_tag"}, ->
      @query ->
        @term {tag: "something"}
  deepEqual json,
    query:
      has_child:
        type: "blog_tag"
        query:
          term:
            tag: "something"

test 'has_parent', ->
  expect 1
  json = @subject.query ->
    @has_parent {parent_type: "blog_tag"}, ->
      @query ->
        @term {tag: "something"}
  deepEqual json,
    query:
      has_parent:
        parent_type: "blog_tag"
        query:
          term:
            tag: "something"

test 'span_first', ->
  expect 1
  json = @subject.query ->
    @span_first {end: 3}, ->
      @match ->
        @span_term {user: "kimchy"}
  deepEqual json,
    query:
      span_first:
        end: 3
        match:
          span_term:
            user: "kimchy"

test 'span_multi', ->
  expect 1
  json = @subject.query ->
    @span_multi ->
      @match ->
        @prefix {user: {value: "ki"}}
  deepEqual json,
    query:
      span_multi:
        match:
          prefix:
            user:
              value: "ki"

test 'span_near', ->
  expect 1
  json = @subject.query ->
    @span_near {slop: 12, in_order: false, collect_payloads: false}, ->
      @clauses ->
        @span_term {field: "value"}
        @span_term {field: "value1"}
        @span_term {field: "value2"}
  deepEqual json,
    query:
      span_near:
        slop: 12
        in_order: false
        collect_payloads: false
        clauses: [
          {span_term: {field: "value"}}
          {span_term: {field: "value1"}}
          {span_term: {field: "value2"}}
        ]

test 'span_not', ->
  expect 1
  json = @subject.query ->
    @span_not ->
      @include ->
        @span_term {field1: "value1"}
      @exclude ->
        @span_term {field2: "value2"}
  deepEqual json,
    query:
      span_not:
        include:
          span_term:
            field1: "value1"
        exclude:
          span_term:
            field2: "value2"

test 'span_or', ->
  expect 1
  json = @subject.query ->
    @span_or ->
      @clauses ->
        @span_term {field: "value"}
        @span_term {field: "value1"}
        @span_term {field: "value2"}
  deepEqual json,
    query:
      span_or:
        clauses: [
          {span_term: {field: "value"}}
          {span_term: {field: "value1"}}
          {span_term: {field: "value2"}}
        ]

test 'span_term', ->
  expect 1
  json = @subject.query ->
    @span_term {field: "value1"}
  deepEqual json,
    query:
      span_term:
        field: "value1"

test 'top_children', ->
  expect 1
  json = @subject.query ->
    @top_children {type: "blog_tag", score: "max", factor: 5, incremental_factor: 2}, ->
      @query ->
        @term {tag: "something"}
  deepEqual json,
    query:
      top_children:
        type: "blog_tag"
        score: "max"
        factor: 5
        incremental_factor: 2
        query:
          term:
            tag: "something"

test 'nested', ->
  expect 1
  json = @subject.query ->
    @nested {path: "obj1", score_mode: "avg"}, ->
      @query ->
        @bool ->
          @must ->
            @match {"obj1.name": "blue"}
            @range {"obj1.count": {gt: 5}}
  deepEqual json,
    query:
      nested:
        path: "obj1"
        score_mode: "avg"
        query:
          bool:
            must: [
              {match: {"obj1.name": "blue"}}
              {range: {"obj1.count": {gt: 5}}}
            ]

test 'indices', ->
  expect 1
  json = @subject.query ->
    @indices {indices: ["index1", "index2"]}, ->
      @query ->
        @term {tag: "wow"}
      @no_match_query ->
        @term {tag: "kow"}
  deepEqual json,
    query:
      indices:
        indices: ["index1", "index2"]
        query:
          term:
            tag: "wow"
        no_match_query:
          term:
            tag: 'kow'

test 'and filter', ->
  expect 1
  json = @subject.filter ->
    @and ->
      @filters ->
        @term {tag: "value"}
        @term {tag: "value1"}
  deepEqual json,
    filter:
      and:
        filters: [
          {term: {tag: "value"}}
          {term: {tag: "value1"}}
        ]

test 'exists filter', ->
  expect 1
  json = @subject.filter ->
    @exists {field: 'user'}
  deepEqual json,
    filter:
      exist:
        field: 'user'

test 'limit filter', ->
  expect 1
  json = @subject.filter ->
    @limit {value: 100}
  deepEqual json,
    filter:
      limit:
        value: 100

test 'type filter', ->
  expect 1
  json = @subject.filter ->
    @type {value: "my_type"}
  deepEqual json,
    filter:
      type:
        value: "my_type"

test 'geo_bounding_box', ->
  expect 1
  json = @subject.filter ->
    @geo_bounding_box
      "pin.location":
        "top_left":
          "lat": 40.73
          "lon": -74.1
        "bottom_right":
          "lat": 40.01
          "lon": -71.12
  deepEqual json,
    filter:
      geo_bounding_box:
        "pin.location":
          "top_left":
            "lat": 40.73
            "lon": -74.1
          "bottom_right":
            "lat": 40.01
            "lon": -71.12

test 'geo_distance', ->
  expect 1
  json = @subject.filter ->
    @geo_distance
      distance: "12km"
      "pin.location": [40, -70]
  deepEqual json,
    filter:
      geo_distance:
        distance: "12km"
        "pin.location": [40, -70]

test 'geo_distance_range', ->
  expect 1
  json = @subject.filter ->
    @geo_distance_range
      "from": "200km"
      "to": "400km"
      "pin.location":
        "lat": 40
        "lon": -70
  deepEqual json,
    filter:
      geo_distance_range:
        "from": "200km"
        "to": "400km"
        "pin.location":
          "lat": 40
          "lon": -70

test 'geo_polygon', ->
  expect 1
  json = @subject.filter ->
    @geo_polygon
      "person.location":
        "points": [
          [-70, 40]
          [-80, 30]
          [-90, 20]
        ]
  deepEqual json,
    filter:
      geo_polygon:
        "person.location":
          "points": [ 
            [-70, 40]
            [-80, 30]
            [-90, 20]
          ]

test 'missing filter', ->
  expect 1
  json = @subject.filter ->
    @missing {field: "user"}
  deepEqual json,
    filter:
      missing:
        field: "user"

test 'not filter', ->
  expect 1
  json = @subject.filter ->
    @not ->
      @filter ->
        @range {postDate: {from: "2010-03-01", to: "2010-04-01"}}
  deepEqual json,
    filter:
      not:
        filter:
          range:
            postDate: {from: "2010-03-01", to: "2010-04-01"}

test 'numeric_range', ->
  expect 1
  json = @subject.filter ->
    @numeric_range
      age:
        "from": "10"
        "to": "20"
        "include_lower": true
        "include_upper": false
  deepEqual json,
    filter:
      numeric_range:
        age:
          "from": "10"
          "to": "20"
          "include_lower": true
          "include_upper": false

test 'or filter', ->
  expect 1
  json = @subject.filter ->
    @or ->
      @filters ->
        @term {"name.second": "banon"}
        @term {"name.nick": "kimchy"}
  deepEqual json,
    filter:
      or:
        filters: [
          {term: {"name.second": "banon"}}
          {term: {"name.nick": "kimchy"}}
        ]

test 'script filter', ->
  expect 1
  json = @subject.filter ->
    @script
      "script": "doc['num1'].value &gt; 1"
  deepEqual json,
    filter:
      script:
        script: "doc['num1'].value &gt; 1"
