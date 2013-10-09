describe 'QueryDSL', ->

  beforeEach ->
    @subject = EDEK.QueryDSL

  it "match-query", ->
    json = @subject.query ->
      @match { message: "this is a test" }

    expect(json).toEqual({query: {match: {message: "this is a test"}}})

  it "match-query with options", ->
    json = @subject.query ->
      @match {
        message: {
          query: "this is a test",
          operator: "and"
        }
      }
    expect(json).toEqual({query: {match: {message: { query: "this is a test", operator: "and"}}}})

  it "multi_match", ->
    json = @subject.query ->
      @multi_match {query: "this is a test", fields: [ "subject^2", "message" ]}

    expect(json).toEqual({query: {multi_match: {query: "this is a test", fields: [ "subject^2", "message" ]}}})

  it "ids", ->
    json = @subject.query ->
      @ids {type: "my_type", values: ["1", "4", "100"]}

    expect(json).toEqual({query: {ids: {type: "my_type", values: ["1", "4", "100"]}}})

  it "field", ->
    json = @subject.query ->
      @field {"name.first": "+something -else"}

    expect(json).toEqual({query: {field: {"name.first": "+something -else"}}})

  it 'flt', ->
    json = @subject.query ->
      @flt {
        fields: ["name.first", "name.last"],
        like_text: "text like this one",
        max_query_terms: 12
      }
    expect(json).toEqual({query: {fuzzy_like_this: {fields: ["name.first", "name.last"], like_text: "text like this one", max_query_terms: 12}}})

  it 'fuzzy_like_this_field', ->
    json = @subject.query ->
      @fuzzy_like_this_field {"name.first": {
        like_text: "text like this one",
        max_query_terms: 12
      }}
    expect(json).toEqual({query: {fuzzy_like_this_field: {"name.first": {
      like_text: "text like this one",
      max_query_terms: 12
    }}}})

  it 'fuzzy', ->
    json = @subject.query ->
      @fuzzy {user: "ki"}
    expect(json).toEqual({query: {fuzzy: {user: "ki"}}})

  it 'match_all', ->
    json = @subject.query ->
      @match_all()
    expect(json).toEqual({query: {match_all: {}}})

  it 'more_like_this', ->
    json = @subject.query ->
      @more_like_this { fields: ["name.first", "name.last"], like_text: "text like this one", min_term_freq: 1, max_query_terms: 12}

    expect(json).toEqual({query: {more_like_this:
      {
        fields: ["name.first", "name.last"],
        like_text: "text like this one",
        min_term_freq: 1,
        max_query_terms: 12
      }}}
    )

  it 'more_like_this_field', ->
    json = @subject.query ->
      @more_like_this_field(
        "name.first": {
          "like_text": "text like this one",
          "min_term_freq": 1,
          "max_query_terms": 12
        }
      )

    expect(json).toEqual(
      {query: {
        more_like_this_field: {
          "name.first": {
            "like_text": "text like this one",
            "min_term_freq": 1,
            "max_query_terms": 12
          }
        }
      }}
    )

  it 'prefix', ->
    json = @subject.query ->
      @prefix {user: "ki"}

    expect(json).toEqual({query: {prefix: {user: "ki"}}})

  it 'query_string', ->
    json = @subject.query ->
      @query_string {default_field: "content", query: "this AND that OR thus"}

    expect(json).toEqual({query: {query_string: {default_field: "content", query: "this AND that OR thus"}}})

  it 'range', ->
    json = @subject.query ->
      @range(
        {
          "age" : {
            "from" : 10,
            "to" : 20,
            "include_lower" : true,
            "include_upper": false,
            "boost" : 2.0
          }
        }
      )

    expect(json).toEqual(
      {
        query: {
          range: {
            "age" : {
              "from" : 10,
              "to" : 20,
              "include_lower" : true,
              "include_upper": false,
              "boost" : 2.0
            }
          }
        }
      }
    )

  it 'regexp', ->
    json = @subject.query ->
      @regexp {"name.first": "s.*y"}

    expect(json).toEqual({query: {regexp: {"name.first": "s.*y"}}})

  it "term", ->
    json = @subject.query ->
      @term { user: "kimchy" }

    expect(json).toEqual({query: {term: {user: "kimchy"}}})

  it "term with options", ->
    json = @subject.query ->
      @term {user: {value: "kimchy", boost: 2.0 } }

    expect(json).toEqual({query: {term: {user: {value: "kimchy", boost: 2.0 } }}})

  it 'terms', ->
    json = @subject.query ->
      @terms {tags: ["blue", "pill"]}

    expect(json).toEqual({query: {terms: {tags: ["blue", "pill"]}}})

  it 'common', ->
    json = @subject.query ->
      @common({
        "body": {
          "query":                "nelly the elephant as a cartoon",
          "cutoff_frequency":     0.001,
          "minimum_should_match": 2
        }
      })

    expect(json).toEqual({
      query:{
        common: {
          "body": {
            "query":                "nelly the elephant as a cartoon",
            "cutoff_frequency":     0.001,
            "minimum_should_match": 2
          }
        }
      }
    })

  it 'wildcard', ->
    json = @subject.query ->
      @wildcard {user: "ki*y"}

    expect(json).toEqual({query: {wildcard: {user: "ki*y"}}})

  it 'text', ->
    json = @subject.query ->
      @text {message: "this is a test"}

    expect(json).toEqual({query: {text: {message: "this is a test"}}})

  it 'geo_shape', ->
    json = @subject.query ->
      @geo_shape(
        "location": {
          "shape": {
            "type": "envelope",
            "coordinates": [[13, 53],[14, 52]]
          }
        }
      )

    expect(json).toEqual({
      query: {
        geo_shape: {
          "location": {
            "shape": {
              "type": "envelope",
              "coordinates": [[13, 53],[14, 52]]
            }
          }
        }
      }
    })

  it 'bool query with must', ->
    json = @subject.query ->
      @bool ->
        @must ->
          @term {user: "kimchy"}

    expect(json).toEqual({query:{
      bool: {
        must: [{term: {user: "kimchy"}}]
      }
    }})

  it 'bool query with should', ->
    json = @subject.query ->
      @bool ->
        @should ->
          @term {user: "kimchy"}

    expect(json).toEqual({query:{
      bool: {
        should: [{term: {user: "kimchy"}}]
      }
    }})

  it 'bool query with must and should', ->
    json = @subject.query ->
      @bool ->
        @must ->
          @term {user: "kimchy"}
          @term {message: "my message"}
        @should ->
          @term {user: "k"}
          @term {message: 'm'}

    expect(json).toEqual({
      query:{bool:{
        must: [{term: {user: "kimchy"}}, {term: {message: "my message"}}  ],
        should: [{term: {user: "k"}}, {term: {message: "m"}}]
      }}
    })

  it 'bool query with all matchers', ->
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

    expect(json).toEqual({query:{
      bool:{
        must: [{term: {user: "kimchy"}}, {term: {message: "my message"}}  ],
        should: [{term: {user: "k"}}, {term: {message: "m"}}],
        must_not: [{term: {user: "Dart"}}]
      }
    }})

  it 'boosting', ->
    json = @subject.query ->
      @boosting {negative_boost: 0.2}, ->
        @positive ->
          @term {field1: "value1"}
        @negative ->
          @term {field2: "value2"}

    expect(json).toEqual({query: {
      boosting: {
        negative_boost: 0.2,
        positive: {
          term: {
            field1: "value1"
          }
        },
        negative: {
          term: {
            field2: "value2"
          }
        }
      }
    }})

  it 'custom_score query', ->
    json = @subject.query ->
      @custom_score {script: "_score * doc['my_numeric_field'].value"}, ->
        @query ->
          @term {user: "k"}

    expect(json).toEqual({query:{
      custom_score: {
        script: "_score * doc['my_numeric_field'].value",
        query: {
          term: {user: "k"}
        }
      }
    }})

  it 'custom_score query with params', ->
    json = @subject.query ->
      @custom_score {script: "_score * doc['my_numeric_field'].value / pow(param1, param2)"}, ->
        @query ->
          @term {user: "k"}
        @params {param1: 2, param2: 3.1}

    expect(json).toEqual({query:{
      custom_score: {
        script: "_score * doc['my_numeric_field'].value / pow(param1, param2)",
        query: {
          term: {user: "k"}
        },
        params: {param1: 2, param2: 3.1}
      }
    }})

  it 'custom_boost_factor', ->
    json = @subject.query ->
      @custom_boost_factor {boost_factor: 5.2}, ->
        @query ->
          @term {user: "k"}

    expect(json).toEqual({query: {
      custom_boost_factor:{
        boost_factor: 5.2,
        query: {
          term: {user: "k"}
        }
      }
    }})

  it 'constant_score', ->
    json = @subject.query ->
      @constant_score {boost: 1.2}, ->
        @query ->
          @term {user: "k"}

    expect(json).toEqual({query: {
      constant_score: {
        boost: 1.2,
        query: {
          term: {user: "k"}
        }
      }
    }})

  it 'dis_max', ->
    json = @subject.query ->
      @dis_max {tie_breaker: 0.7, boost: 1.2}, ->
        @queries ->
          @term {age: 34}
          @term {age: 35}

    expect(json).toEqual({query:{
      dis_max: {
        tie_breaker: 0.7,
        boost: 1.2,
        queries: [{
          term: { age: 34 }
        },
        {
          term: { age: 35 }
        }]
      }
    }})

  it 'filtered', ->
    json = @subject.query ->
      @filtered ->
        @query ->
          @term {tag: "wow"}
        @filter ->
          @range {age: {from: 10, to: 20}}

    expect(json).toEqual({query:{
      filtered:{
        query: {
          term: { tag: 'wow' }
        },
        filter: {
          range: {
            age: { from: 10, to: 20 }
          }
        }
      }
    }})

  it 'has_child', ->
    json = @subject.query ->
      @has_child {type: "blog_tag"}, ->
        @query ->
          @term {tag: "something"}

    expect(json).toEqual({query: {
      has_child: {
        type: "blog_tag",
        query: {
          term: {tag: "something"}
        }
      }
    }})

  it 'has_parent', ->
    json = @subject.query ->
      @has_parent {parent_type: "blog_tag"}, ->
        @query ->
          @term {tag: "something"}

    expect(json).toEqual({query: {
      has_parent: {
        parent_type: "blog_tag",
        query: {
          term: {tag: "something"}
        }
      }
    }})

  it 'span_first', ->
    json = @subject.query ->
      @span_first {end: 3}, ->
        @match ->
          @span_term {user: "kimchy"}

    expect(json).toEqual({query:{
      span_first: {
        end: 3,
        match: {
          span_term: {user: "kimchy"}
        }
      }
    }})

  it 'span_multi', ->
    json = @subject.query ->
      @span_multi ->
        @match ->
          @prefix {user: {value: "ki"}}

    expect(json).toEqual({query: {
      span_multi: {
        match: {prefix: {user: {value: "ki"}}}
      }
    }})

  it 'span_near', ->
    json = @subject.query ->
      @span_near {slop: 12, in_order: false, collect_payloads: false}, ->
        @clauses ->
          @span_term {field: "value"}
          @span_term {field: "value1"}
          @span_term {field: "value2"}

    expect(json).toEqual({query: {
      span_near: {
        slop: 12, in_order: false, collect_payloads: false,
        clauses: [{ span_term: { field: "value" } },
        { span_term: { field: "value1" } },
        { span_term: { field: "value2" } }]
      }
    }})

  it 'span_not', ->
    json = @subject.query ->
      @span_not ->
        @include ->
          @span_term {field1: "value1"}
        @exclude ->
          @span_term {field2: "value2"}

    expect(json).toEqual({query: {
      span_not: {
        include: {
          span_term: { field1: "value1" }
        },
        exclude: {
          span_term: { field2: "value2" }
        },
      }
    }})

  it 'span_or', ->
    json = @subject.query ->
      @span_or ->
        @clauses ->
          @span_term {field: "value"}
          @span_term {field: "value1"}
          @span_term {field: "value2"}

    expect(json).toEqual({query: {
      span_or: {
        clauses: [{ span_term: { field: "value" } },
        { span_term: { field: "value1" } },
        { span_term: { field: "value2" } }]
      }
    }})

  it 'span_term', ->
    json = @subject.query ->
      @span_term { field: "value1" }

    expect(json).toEqual({query:{
      span_term: { field: "value1" }
    }})

  it 'top_children', ->
    json = @subject.query ->
      @top_children {type: "blog_tag", score: "max", factor: 5, incremental_factor: 2}, ->
        @query ->
          @term {tag: "something"}

    expect(json).toEqual({query: {
      top_children: {
        type: "blog_tag",
        score: "max",
        factor: 5,
        incremental_factor: 2,
        query: {
          term: {tag: "something"}
        }
      }
    }})

  it 'nested', ->
    json = @subject.query ->
      @nested {path: "obj1", score_mode: "avg"}, ->
        @query ->
          @bool ->
            @must ->
              @match {"obj1.name": "blue"}
              @range {"obj1.count": {gt: 5}}

    expect(json).toEqual({query:{
      nested: {
        path: "obj1",
        score_mode: "avg",
        query: {
          bool: {
            must: [{
              match: {"obj1.name": "blue"}
            },
            {
              range: {"obj1.count": {gt: 5}}
            }]
          }
        }
      }
    }})

  it 'custom_filters_score', ->
    json = @subject.query ->
      @custom_filters_score {score_mode: "first"}, ->
        @query ->
          @match_all()

        @filters ->
          @filter ->
#            @range {age: {from: 0, to: 10}}
#            @boost 3
#
          @filter ->
#            @range {age: {from: 0, to: 10}}
#          @boost 3
#
    expect(json).toEqual({query: {custom_filters_score: {
      "score_mode" : "first",
      query: {
        "match_all" : {}
      },
      filters: [{
        filter: { range: { age: {from: 0, to: 10} } },
        boost: "3"
      },
      {
        filter: { range: { age: {from: 10, to: 20} } },
        boost: "2"
      }
      ]
    }}})

  it 'indices', ->
    json = @subject.query ->
      @indices {indices: ["index1", "index2"]}, ->
        @query ->
          @term {tag: "wow"}

        @no_match_query ->
          @term {tag: "kow"}

    expect(json).toEqual({query: {
      indices: {
        indices: ["index1", "index2"],
        query: {
          term: {tag: "wow"}
        },
        no_match_query: {
          term: {tag: 'kow'}
        }
      }
    }})


  it 'and filter', ->
    json = @subject.filter ->
      @and ->
        @filters ->
          @term {tag: "value"}
          @term {tag: "value1"}

    expect(json).toEqual({filter: {
      and:{
        filters: [{
          term: {tag: "value"}},
        {term: {tag: "value1"}}]
      }
    }})

  it 'exists filter', ->
    json = @subject.filter ->
      @exists {field: 'user'}

    expect(json).toEqual({filter: {
      exist: {field: 'user'}
    }})

  it 'limit filter', ->
    json = @subject.filter ->
      @limit {value: 100}

    expect(json).toEqual({filter: {limit: {value: 100}}})

  it 'type filter', ->
    json = @subject.filter ->
      @type {value: "my_type"}

    expect(json).toEqual({filter: {type: {value: "my_type"}}})

  it 'geo_bounding_box', ->
    json = @subject.filter ->
      @geo_bounding_box(
        "pin.location" : {
          "top_left" : {
            "lat" : 40.73,
            "lon" : -74.1
          },
          "bottom_right" : {
            "lat" : 40.01,
            "lon" : -71.12
          }
        }
      )

    expect(json).toEqual({filter: {
      geo_bounding_box:{
        "pin.location" : {
          "top_left" : {
            "lat" : 40.73,
            "lon" : -74.1
          },
          "bottom_right" : {
            "lat" : 40.01,
            "lon" : -71.12
          }
        }
      }
    }})

  it 'geo_distance', ->
    json = @subject.filter ->
      @geo_distance {distance: "12km", "pin.location" : [40, -70]}

    expect(json).toEqual({filter: {geo_distance: {distance: "12km", "pin.location" : [40, -70]}}})

  it 'geo_distance_range', ->
    json = @subject.filter ->
      @geo_distance_range({
        "from" : "200km",
        "to" : "400km"
        "pin.location" : {
          "lat" : 40,
          "lon" : -70
        }
      })
    expect(json).toEqual({filter: {geo_distance_range: {
      "from" : "200km",
      "to" : "400km"
      "pin.location" : {
        "lat" : 40,
        "lon" : -70
      }
    }}})

  it 'geo_polygon', ->
    json = @subject.filter ->
      @geo_polygon({
        "person.location": {
          "points": [
            [-70, 40],
            [-80, 30],
            [-90, 20]
          ]
        }
      })

    expect(json).toEqual({filter: {
      geo_polygon: {
        "person.location": {
          "points": [ [-70, 40],
            [-80, 30],
            [-90, 20]
          ]
        }
      }
    }})

  it 'missing filter', ->
    json = @subject.filter ->
      @missing {field: "user"}

    expect(json).toEqual({filter: {missing: {field: "user"}}})

  it 'not filter', ->
    json = @subject.filter ->
      @not ->
        @filter ->
          @range {postDate: {from: "2010-03-01", to: "2010-04-01"}}

    expect(json).toEqual({filter: {
      not: {
        filter:{
          range: {postDate: {from: "2010-03-01", to: "2010-04-01"}}
        }
      }
    }})

  it 'numeric_range', ->
    json = @subject.filter ->
      @numeric_range {age: {"from" : "10", "to" : "20", "include_lower" : true, "include_upper" : false}}

    expect(json).toEqual({filter: {
      numeric_range: {age: {"from" : "10", "to" : "20", "include_lower" : true, "include_upper" : false}}
    }})

  it 'or filter', ->
    json = @subject.filter ->
      @or ->
        @filters ->
          @term {"name.second" : "banon"}
          @term {"name.nick" : "kimchy"}

    expect(json).toEqual({filter: {
      or: {filters: [{term: {"name.second" : "banon"}},
        {term: {"name.nick" : "kimchy"}}
      ]}
    }})

  it 'script filter', ->
    json = @subject.filter ->
      @script {"script" : "doc['num1'].value &gt; 1"}

    expect(json).toEqual({filter: {
      script: {
        script: "doc['num1'].value &gt; 1"
      }
    }})
