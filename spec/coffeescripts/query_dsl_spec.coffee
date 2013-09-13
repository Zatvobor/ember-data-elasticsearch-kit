describe 'QueryDSL', ->

  beforeEach ->
    @subject = QueryDSL

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


