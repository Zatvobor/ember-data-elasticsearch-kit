(function() {
  describe('MappingDSL', function() {
    beforeEach(function() {
      return this.subject = MappingDSL;
    });
    it("create simpe mapping", function() {
      var mapping;
      mapping = this.subject.mapping(function() {
        return this.mapping("user", function() {
          this.mapping("firstName", {
            type: "string"
          });
          return this.mapping("lastName", {
            type: "string"
          });
        });
      });
      return expect(mapping).toEqual({
        mappings: {
          user: {
            properties: {
              firstName: {
                type: "string"
              },
              lastName: {
                type: "string"
              }
            }
          }
        }
      });
    });
    it('create two type mapping', function() {
      var mapping;
      mapping = this.subject.mapping(function() {
        this.mapping("user", function() {
          this.mapping("firstName", {
            type: "string"
          });
          return this.mapping("lastName", {
            type: "string"
          });
        });
        return this.mapping("action", function() {
          return this.mapping("type", {
            type: "string"
          });
        });
      });
      return expect(mapping).toEqual({
        mappings: {
          user: {
            properties: {
              firstName: {
                type: "string"
              },
              lastName: {
                type: "string"
              }
            }
          },
          action: {
            properties: {
              type: {
                type: "string"
              }
            }
          }
        }
      });
    });
    it('create mapping with nested', function() {
      var mapping;
      mapping = this.subject.mapping(function() {
        return this.mapping("user", function() {
          this.mapping("firstName", {
            type: "string"
          });
          this.mapping("lastName", {
            type: "string"
          });
          return this.mapping("avatar", {
            type: "nested"
          }, function() {
            this.mapping("id", {
              type: "long"
            });
            return this.mapping("url", {
              type: "string"
            });
          });
        });
      });
      return expect(mapping).toEqual({
        mappings: {
          user: {
            properties: {
              firstName: {
                type: "string"
              },
              lastName: {
                type: "string"
              },
              avatar: {
                type: "nested",
                properties: {
                  id: {
                    type: "long"
                  },
                  url: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      });
    });
    it('create mapping with settings', function() {
      var settings;
      settings = this.subject.mapping({
        analysis: {
          analyzer: {
            lc: {
              filter: ["lowercase"],
              type: "custom",
              tokenizer: "keyword"
            }
          }
        }
      }, function() {
        return this.mapping("user", function() {
          return this.mapping("firstName", {
            type: "string"
          });
        });
      });
      return expect(settings).toEqual({
        settings: {
          analysis: {
            analyzer: {
              lc: {
                filter: ["lowercase"],
                type: "custom",
                tokenizer: "keyword"
              }
            }
          }
        },
        mappings: {
          user: {
            properties: {
              firstName: {
                type: "string"
              }
            }
          }
        }
      });
    });
    it('delete index', function() {
      return this.subject["delete"]("http://localhost:9200/test_index");
    });
    return it("create mapping", function() {
      var mapping, responce;
      mapping = this.subject.mapping(function() {
        return this.mapping("testUser", function() {
          this.mapping("firstName", {
            type: "string"
          });
          return this.mapping("lastName", {
            type: "string"
          });
        });
      });
      responce = this.subject.create("http://localhost:9200/test_index", mapping);
      return expect(responce).toEqual({
        ok: true,
        acknowledged: true
      });
    });
  });

}).call(this);
