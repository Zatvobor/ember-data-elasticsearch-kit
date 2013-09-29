(function() {
  describe('Facets', function() {
    beforeEach(function() {
      return this.subject = QueryDSL;
    });
    return it("custom facet name", function() {
      var facet, json;
      facet = this.subject.query(function() {
        return this.terms({
          tags: ["java", "erlang"]
        });
      });
      json = this.subject.query(function() {
        this.match({
          title: "T*"
        });
        return this.facets(function() {
          return {
            global_tags: $.extend({
              global: true
            }, facet.query)
          };
        });
      });
      return expect(json).toEqual({
        query: {
          match: {
            title: 'T*'
          }
        },
        facets: {
          global_tags: {
            global: true,
            terms: {
              tags: ['java', 'erlang']
            }
          }
        }
      });
    });
  });

}).call(this);
