(function() {
  describe('QueryDSL', function() {
    beforeEach(function() {
      return this.subject = QueryDSL;
    });
    it("match-query", function() {
      var json;
      json = this.subject.query(function() {
        return this.match({
          message: "this is a test"
        });
      });
      return expect(json).toEqual({
        query: {
          match: {
            message: "this is a test"
          }
        }
      });
    });
    it("match-query with options", function() {
      var json;
      json = this.subject.query(function() {
        return this.match({
          message: {
            query: "this is a test",
            operator: "and"
          }
        });
      });
      return expect(json).toEqual({
        query: {
          match: {
            message: {
              query: "this is a test",
              operator: "and"
            }
          }
        }
      });
    });
    it("multi_match", function() {
      var json;
      json = this.subject.query(function() {
        return this.multi_match({
          query: "this is a test",
          fields: ["subject^2", "message"]
        });
      });
      return expect(json).toEqual({
        query: {
          multi_match: {
            query: "this is a test",
            fields: ["subject^2", "message"]
          }
        }
      });
    });
    it("ids", function() {
      var json;
      json = this.subject.query(function() {
        return this.ids({
          type: "my_type",
          values: ["1", "4", "100"]
        });
      });
      return expect(json).toEqual({
        query: {
          ids: {
            type: "my_type",
            values: ["1", "4", "100"]
          }
        }
      });
    });
    it("field", function() {
      var json;
      json = this.subject.query(function() {
        return this.field({
          "name.first": "+something -else"
        });
      });
      return expect(json).toEqual({
        query: {
          field: {
            "name.first": "+something -else"
          }
        }
      });
    });
    it('flt', function() {
      var json;
      json = this.subject.query(function() {
        return this.flt({
          fields: ["name.first", "name.last"],
          like_text: "text like this one",
          max_query_terms: 12
        });
      });
      return expect(json).toEqual({
        query: {
          fuzzy_like_this: {
            fields: ["name.first", "name.last"],
            like_text: "text like this one",
            max_query_terms: 12
          }
        }
      });
    });
    it('fuzzy_like_this_field', function() {
      var json;
      json = this.subject.query(function() {
        return this.fuzzy_like_this_field({
          "name.first": {
            like_text: "text like this one",
            max_query_terms: 12
          }
        });
      });
      return expect(json).toEqual({
        query: {
          fuzzy_like_this_field: {
            "name.first": {
              like_text: "text like this one",
              max_query_terms: 12
            }
          }
        }
      });
    });
    it('fuzzy', function() {
      var json;
      json = this.subject.query(function() {
        return this.fuzzy({
          user: "ki"
        });
      });
      return expect(json).toEqual({
        query: {
          fuzzy: {
            user: "ki"
          }
        }
      });
    });
    it('match_all', function() {
      var json;
      json = this.subject.query(function() {
        return this.match_all();
      });
      return expect(json).toEqual({
        query: {
          match_all: {}
        }
      });
    });
    it('more_like_this', function() {
      var json;
      json = this.subject.query(function() {
        return this.more_like_this({
          fields: ["name.first", "name.last"],
          like_text: "text like this one",
          min_term_freq: 1,
          max_query_terms: 12
        });
      });
      return expect(json).toEqual({
        query: {
          more_like_this: {
            fields: ["name.first", "name.last"],
            like_text: "text like this one",
            min_term_freq: 1,
            max_query_terms: 12
          }
        }
      });
    });
    it('more_like_this_field', function() {
      var json;
      json = this.subject.query(function() {
        return this.more_like_this_field({
          "name.first": {
            "like_text": "text like this one",
            "min_term_freq": 1,
            "max_query_terms": 12
          }
        });
      });
      return expect(json).toEqual({
        query: {
          more_like_this_field: {
            "name.first": {
              "like_text": "text like this one",
              "min_term_freq": 1,
              "max_query_terms": 12
            }
          }
        }
      });
    });
    it('prefix', function() {
      var json;
      json = this.subject.query(function() {
        return this.prefix({
          user: "ki"
        });
      });
      return expect(json).toEqual({
        query: {
          prefix: {
            user: "ki"
          }
        }
      });
    });
    it('query_string', function() {
      var json;
      json = this.subject.query(function() {
        return this.query_string({
          default_field: "content",
          query: "this AND that OR thus"
        });
      });
      return expect(json).toEqual({
        query: {
          query_string: {
            default_field: "content",
            query: "this AND that OR thus"
          }
        }
      });
    });
    it('range', function() {
      var json;
      json = this.subject.query(function() {
        return this.range({
          "age": {
            "from": 10,
            "to": 20,
            "include_lower": true,
            "include_upper": false,
            "boost": 2.0
          }
        });
      });
      return expect(json).toEqual({
        query: {
          range: {
            "age": {
              "from": 10,
              "to": 20,
              "include_lower": true,
              "include_upper": false,
              "boost": 2.0
            }
          }
        }
      });
    });
    it('regexp', function() {
      var json;
      json = this.subject.query(function() {
        return this.regexp({
          "name.first": "s.*y"
        });
      });
      return expect(json).toEqual({
        query: {
          regexp: {
            "name.first": "s.*y"
          }
        }
      });
    });
    it("term", function() {
      var json;
      json = this.subject.query(function() {
        return this.term({
          user: "kimchy"
        });
      });
      return expect(json).toEqual({
        query: {
          term: {
            user: "kimchy"
          }
        }
      });
    });
    it("term with options", function() {
      var json;
      json = this.subject.query(function() {
        return this.term({
          user: {
            value: "kimchy",
            boost: 2.0
          }
        });
      });
      return expect(json).toEqual({
        query: {
          term: {
            user: {
              value: "kimchy",
              boost: 2.0
            }
          }
        }
      });
    });
    it('terms', function() {
      var json;
      json = this.subject.query(function() {
        return this.terms({
          tags: ["blue", "pill"]
        });
      });
      return expect(json).toEqual({
        query: {
          terms: {
            tags: ["blue", "pill"]
          }
        }
      });
    });
    it('common', function() {
      var json;
      json = this.subject.query(function() {
        return this.common({
          "body": {
            "query": "nelly the elephant as a cartoon",
            "cutoff_frequency": 0.001,
            "minimum_should_match": 2
          }
        });
      });
      return expect(json).toEqual({
        query: {
          common: {
            "body": {
              "query": "nelly the elephant as a cartoon",
              "cutoff_frequency": 0.001,
              "minimum_should_match": 2
            }
          }
        }
      });
    });
    it('wildcard', function() {
      var json;
      json = this.subject.query(function() {
        return this.wildcard({
          user: "ki*y"
        });
      });
      return expect(json).toEqual({
        query: {
          wildcard: {
            user: "ki*y"
          }
        }
      });
    });
    it('text', function() {
      var json;
      json = this.subject.query(function() {
        return this.text({
          message: "this is a test"
        });
      });
      return expect(json).toEqual({
        query: {
          text: {
            message: "this is a test"
          }
        }
      });
    });
    return it('geo_shape', function() {
      var json;
      json = this.subject.query(function() {
        return this.geo_shape({
          "location": {
            "shape": {
              "type": "envelope",
              "coordinates": [[13, 53], [14, 52]]
            }
          }
        });
      });
      return expect(json).toEqual({
        query: {
          geo_shape: {
            "location": {
              "shape": {
                "type": "envelope",
                "coordinates": [[13, 53], [14, 52]]
              }
            }
          }
        }
      });
    });
  });

}).call(this);
