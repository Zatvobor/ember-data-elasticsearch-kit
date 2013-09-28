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
    it('geo_shape', function() {
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
    it('bool query with must', function() {
      var json;
      json = this.subject.query(function() {
        return this.bool(function() {
          return this.must(function() {
            return this.term({
              user: "kimchy"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          bool: {
            must: [
              {
                term: {
                  user: "kimchy"
                }
              }
            ]
          }
        }
      });
    });
    it('bool query with should', function() {
      var json;
      json = this.subject.query(function() {
        return this.bool(function() {
          return this.should(function() {
            return this.term({
              user: "kimchy"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          bool: {
            should: [
              {
                term: {
                  user: "kimchy"
                }
              }
            ]
          }
        }
      });
    });
    it('bool query with must and should', function() {
      var json;
      json = this.subject.query(function() {
        return this.bool(function() {
          this.must(function() {
            this.term({
              user: "kimchy"
            });
            return this.term({
              message: "my message"
            });
          });
          return this.should(function() {
            this.term({
              user: "k"
            });
            return this.term({
              message: 'm'
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          bool: {
            must: [
              {
                term: {
                  user: "kimchy"
                }
              }, {
                term: {
                  message: "my message"
                }
              }
            ],
            should: [
              {
                term: {
                  user: "k"
                }
              }, {
                term: {
                  message: "m"
                }
              }
            ]
          }
        }
      });
    });
    it('bool query with all matchers', function() {
      var json;
      json = this.subject.query(function() {
        return this.bool(function() {
          this.must(function() {
            this.term({
              user: "kimchy"
            });
            return this.term({
              message: "my message"
            });
          });
          this.should(function() {
            this.term({
              user: "k"
            });
            return this.term({
              message: 'm'
            });
          });
          return this.must_not(function() {
            return this.term({
              user: "Dart"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          bool: {
            must: [
              {
                term: {
                  user: "kimchy"
                }
              }, {
                term: {
                  message: "my message"
                }
              }
            ],
            should: [
              {
                term: {
                  user: "k"
                }
              }, {
                term: {
                  message: "m"
                }
              }
            ],
            must_not: [
              {
                term: {
                  user: "Dart"
                }
              }
            ]
          }
        }
      });
    });
    it('boosting', function() {
      var json;
      json = this.subject.query(function() {
        return this.boosting({
          negative_boost: 0.2
        }, function() {
          this.positive(function() {
            return this.term({
              field1: "value1"
            });
          });
          return this.negative(function() {
            return this.term({
              field2: "value2"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
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
        }
      });
    });
    it('custom_score query', function() {
      var json;
      json = this.subject.query(function() {
        return this.custom_score({
          script: "_score * doc['my_numeric_field'].value"
        }, function() {
          return this.query(function() {
            return this.term({
              user: "k"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          custom_score: {
            script: "_score * doc['my_numeric_field'].value",
            query: {
              term: {
                user: "k"
              }
            }
          }
        }
      });
    });
    it('custom_score query with params', function() {
      var json;
      json = this.subject.query(function() {
        return this.custom_score({
          script: "_score * doc['my_numeric_field'].value / pow(param1, param2)"
        }, function() {
          this.query(function() {
            return this.term({
              user: "k"
            });
          });
          return this.params({
            param1: 2,
            param2: 3.1
          });
        });
      });
      return expect(json).toEqual({
        query: {
          custom_score: {
            script: "_score * doc['my_numeric_field'].value / pow(param1, param2)",
            query: {
              term: {
                user: "k"
              }
            },
            params: {
              param1: 2,
              param2: 3.1
            }
          }
        }
      });
    });
    it('custom_boost_factor', function() {
      var json;
      json = this.subject.query(function() {
        return this.custom_boost_factor({
          boost_factor: 5.2
        }, function() {
          return this.query(function() {
            return this.term({
              user: "k"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          custom_boost_factor: {
            boost_factor: 5.2,
            query: {
              term: {
                user: "k"
              }
            }
          }
        }
      });
    });
    it('constant_score', function() {
      var json;
      json = this.subject.query(function() {
        return this.constant_score({
          boost: 1.2
        }, function() {
          return this.query(function() {
            return this.term({
              user: "k"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          constant_score: {
            boost: 1.2,
            query: {
              term: {
                user: "k"
              }
            }
          }
        }
      });
    });
    it('dis_max', function() {
      var json;
      json = this.subject.query(function() {
        return this.dis_max({
          tie_breaker: 0.7,
          boost: 1.2
        }, function() {
          return this.queries(function() {
            this.term({
              age: 34
            });
            return this.term({
              age: 35
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          dis_max: {
            tie_breaker: 0.7,
            boost: 1.2,
            queries: [
              {
                term: {
                  age: 34
                }
              }, {
                term: {
                  age: 35
                }
              }
            ]
          }
        }
      });
    });
    it('filtered', function() {
      var json;
      json = this.subject.query(function() {
        return this.filtered(function() {
          this.query(function() {
            return this.term({
              tag: "wow"
            });
          });
          return this.filter(function() {
            return this.range({
              age: {
                from: 10,
                to: 20
              }
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          filtered: {
            query: {
              term: {
                tag: 'wow'
              }
            },
            filter: {
              range: {
                age: {
                  from: 10,
                  to: 20
                }
              }
            }
          }
        }
      });
    });
    it('has_child', function() {
      var json;
      json = this.subject.query(function() {
        return this.has_child({
          type: "blog_tag"
        }, function() {
          return this.query(function() {
            return this.term({
              tag: "something"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          has_child: {
            type: "blog_tag",
            query: {
              term: {
                tag: "something"
              }
            }
          }
        }
      });
    });
    it('has_parent', function() {
      var json;
      json = this.subject.query(function() {
        return this.has_parent({
          parent_type: "blog_tag"
        }, function() {
          return this.query(function() {
            return this.term({
              tag: "something"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          has_parent: {
            parent_type: "blog_tag",
            query: {
              term: {
                tag: "something"
              }
            }
          }
        }
      });
    });
    it('span_first', function() {
      var json;
      json = this.subject.query(function() {
        return this.span_first({
          end: 3
        }, function() {
          return this.match(function() {
            return this.span_term({
              user: "kimchy"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          span_first: {
            end: 3,
            match: {
              span_term: {
                user: "kimchy"
              }
            }
          }
        }
      });
    });
    it('span_multi', function() {
      var json;
      json = this.subject.query(function() {
        return this.span_multi(function() {
          return this.match(function() {
            return this.prefix({
              user: {
                value: "ki"
              }
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          span_multi: {
            match: {
              prefix: {
                user: {
                  value: "ki"
                }
              }
            }
          }
        }
      });
    });
    it('span_near', function() {
      var json;
      json = this.subject.query(function() {
        return this.span_near({
          slop: 12,
          in_order: false,
          collect_payloads: false
        }, function() {
          return this.clauses(function() {
            this.span_term({
              field: "value"
            });
            this.span_term({
              field: "value1"
            });
            return this.span_term({
              field: "value2"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          span_near: {
            slop: 12,
            in_order: false,
            collect_payloads: false,
            clauses: [
              {
                span_term: {
                  field: "value"
                }
              }, {
                span_term: {
                  field: "value1"
                }
              }, {
                span_term: {
                  field: "value2"
                }
              }
            ]
          }
        }
      });
    });
    it('span_not', function() {
      var json;
      json = this.subject.query(function() {
        return this.span_not(function() {
          this.include(function() {
            return this.span_term({
              field1: "value1"
            });
          });
          return this.exclude(function() {
            return this.span_term({
              field2: "value2"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          span_not: {
            include: {
              span_term: {
                field1: "value1"
              }
            },
            exclude: {
              span_term: {
                field2: "value2"
              }
            }
          }
        }
      });
    });
    it('span_or', function() {
      var json;
      json = this.subject.query(function() {
        return this.span_or(function() {
          return this.clauses(function() {
            this.span_term({
              field: "value"
            });
            this.span_term({
              field: "value1"
            });
            return this.span_term({
              field: "value2"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          span_or: {
            clauses: [
              {
                span_term: {
                  field: "value"
                }
              }, {
                span_term: {
                  field: "value1"
                }
              }, {
                span_term: {
                  field: "value2"
                }
              }
            ]
          }
        }
      });
    });
    it('span_term', function() {
      var json;
      json = this.subject.query(function() {
        return this.span_term({
          field: "value1"
        });
      });
      return expect(json).toEqual({
        query: {
          span_term: {
            field: "value1"
          }
        }
      });
    });
    it('top_children', function() {
      var json;
      json = this.subject.query(function() {
        return this.top_children({
          type: "blog_tag",
          score: "max",
          factor: 5,
          incremental_factor: 2
        }, function() {
          return this.query(function() {
            return this.term({
              tag: "something"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          top_children: {
            type: "blog_tag",
            score: "max",
            factor: 5,
            incremental_factor: 2,
            query: {
              term: {
                tag: "something"
              }
            }
          }
        }
      });
    });
    it('nested', function() {
      var json;
      json = this.subject.query(function() {
        return this.nested({
          path: "obj1",
          score_mode: "avg"
        }, function() {
          return this.query(function() {
            return this.bool(function() {
              return this.must(function() {
                this.match({
                  "obj1.name": "blue"
                });
                return this.range({
                  "obj1.count": {
                    gt: 5
                  }
                });
              });
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          nested: {
            path: "obj1",
            score_mode: "avg",
            query: {
              bool: {
                must: [
                  {
                    match: {
                      "obj1.name": "blue"
                    }
                  }, {
                    range: {
                      "obj1.count": {
                        gt: 5
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      });
    });
    it('custom_filters_score', function() {
      var json;
      json = this.subject.query(function() {
        return this.custom_filters_score({
          score_mode: "first"
        }, function() {
          this.query(function() {
            return this.match_all();
          });
          return this.filters(function() {
            this.filter(function() {});
            return this.filter(function() {});
          });
        });
      });
      return expect(json).toEqual({
        query: {
          custom_filters_score: {
            "score_mode": "first",
            query: {
              "match_all": {}
            },
            filters: [
              {
                filter: {
                  range: {
                    age: {
                      from: 0,
                      to: 10
                    }
                  }
                },
                boost: "3"
              }, {
                filter: {
                  range: {
                    age: {
                      from: 10,
                      to: 20
                    }
                  }
                },
                boost: "2"
              }
            ]
          }
        }
      });
    });
    it('indices', function() {
      var json;
      json = this.subject.query(function() {
        return this.indices({
          indices: ["index1", "index2"]
        }, function() {
          this.query(function() {
            return this.term({
              tag: "wow"
            });
          });
          return this.no_match_query(function() {
            return this.term({
              tag: "kow"
            });
          });
        });
      });
      return expect(json).toEqual({
        query: {
          indices: {
            indices: ["index1", "index2"],
            query: {
              term: {
                tag: "wow"
              }
            },
            no_match_query: {
              term: {
                tag: 'kow'
              }
            }
          }
        }
      });
    });
    it('and filter', function() {
      var json;
      json = this.subject.filter(function() {
        return this.and(function() {
          return this.filters(function() {
            this.term({
              tag: "value"
            });
            return this.term({
              tag: "value1"
            });
          });
        });
      });
      return expect(json).toEqual({
        filter: {
          and: {
            filters: [
              {
                term: {
                  tag: "value"
                }
              }, {
                term: {
                  tag: "value1"
                }
              }
            ]
          }
        }
      });
    });
    it('exists filter', function() {
      var json;
      json = this.subject.filter(function() {
        return this.exists({
          field: 'user'
        });
      });
      return expect(json).toEqual({
        filter: {
          exist: {
            field: 'user'
          }
        }
      });
    });
    it('limit filter', function() {
      var json;
      json = this.subject.filter(function() {
        return this.limit({
          value: 100
        });
      });
      return expect(json).toEqual({
        filter: {
          limit: {
            value: 100
          }
        }
      });
    });
    it('type filter', function() {
      var json;
      json = this.subject.filter(function() {
        return this.type({
          value: "my_type"
        });
      });
      return expect(json).toEqual({
        filter: {
          type: {
            value: "my_type"
          }
        }
      });
    });
    it('geo_bounding_box', function() {
      var json;
      json = this.subject.filter(function() {
        return this.geo_bounding_box({
          "pin.location": {
            "top_left": {
              "lat": 40.73,
              "lon": -74.1
            },
            "bottom_right": {
              "lat": 40.01,
              "lon": -71.12
            }
          }
        });
      });
      return expect(json).toEqual({
        filter: {
          geo_bounding_box: {
            "pin.location": {
              "top_left": {
                "lat": 40.73,
                "lon": -74.1
              },
              "bottom_right": {
                "lat": 40.01,
                "lon": -71.12
              }
            }
          }
        }
      });
    });
    it('geo_distance', function() {
      var json;
      json = this.subject.filter(function() {
        return this.geo_distance({
          distance: "12km",
          "pin.location": [40, -70]
        });
      });
      return expect(json).toEqual({
        filter: {
          geo_distance: {
            distance: "12km",
            "pin.location": [40, -70]
          }
        }
      });
    });
    it('geo_distance_range', function() {
      var json;
      json = this.subject.filter(function() {
        return this.geo_distance_range({
          "from": "200km",
          "to": "400km",
          "pin.location": {
            "lat": 40,
            "lon": -70
          }
        });
      });
      return expect(json).toEqual({
        filter: {
          geo_distance_range: {
            "from": "200km",
            "to": "400km",
            "pin.location": {
              "lat": 40,
              "lon": -70
            }
          }
        }
      });
    });
    it('geo_polygon', function() {
      var json;
      json = this.subject.filter(function() {
        return this.geo_polygon({
          "person.location": {
            "points": [[-70, 40], [-80, 30], [-90, 20]]
          }
        });
      });
      return expect(json).toEqual({
        filter: {
          geo_polygon: {
            "person.location": {
              "points": [[-70, 40], [-80, 30], [-90, 20]]
            }
          }
        }
      });
    });
    it('missing filter', function() {
      var json;
      json = this.subject.filter(function() {
        return this.missing({
          field: "user"
        });
      });
      return expect(json).toEqual({
        filter: {
          missing: {
            field: "user"
          }
        }
      });
    });
    it('not filter', function() {
      var json;
      json = this.subject.filter(function() {
        return this.not(function() {
          return this.filter(function() {
            return this.range({
              postDate: {
                from: "2010-03-01",
                to: "2010-04-01"
              }
            });
          });
        });
      });
      return expect(json).toEqual({
        filter: {
          not: {
            filter: {
              range: {
                postDate: {
                  from: "2010-03-01",
                  to: "2010-04-01"
                }
              }
            }
          }
        }
      });
    });
    it('numeric_range', function() {
      var json;
      json = this.subject.filter(function() {
        return this.numeric_range({
          age: {
            "from": "10",
            "to": "20",
            "include_lower": true,
            "include_upper": false
          }
        });
      });
      return expect(json).toEqual({
        filter: {
          numeric_range: {
            age: {
              "from": "10",
              "to": "20",
              "include_lower": true,
              "include_upper": false
            }
          }
        }
      });
    });
    it('or filter', function() {
      var json;
      json = this.subject.filter(function() {
        return this.or(function() {
          return this.filters(function() {
            this.term({
              "name.second": "banon"
            });
            return this.term({
              "name.nick": "kimchy"
            });
          });
        });
      });
      return expect(json).toEqual({
        filter: {
          or: {
            filters: [
              {
                term: {
                  "name.second": "banon"
                }
              }, {
                term: {
                  "name.nick": "kimchy"
                }
              }
            ]
          }
        }
      });
    });
    return it('script filter', function() {
      var json;
      json = this.subject.filter(function() {
        return this.script({
          "script": "doc['num1'].value &gt; 1"
        });
      });
      return expect(json).toEqual({
        filter: {
          script: {
            script: "doc['num1'].value &gt; 1"
          }
        }
      });
    });
  });

}).call(this);
