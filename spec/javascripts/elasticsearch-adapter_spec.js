(function() {
  describe('DS.ElasticSearchAdapter', function() {
    beforeEach(function() {
      return this.subject = new TestEnv();
    });
    return describe("find", function() {
      it("by id", function() {
        this.subject.loadData();
        return runs(function() {
          var model;
          model = window.Fixture.store.find('user', 2);
          waitsFor(function() {
            return model.get('name') !== null && model.get('name') !== void 0;
          });
          return runs(function() {
            return expect(model.get('name')).toEqual('bar2');
          });
        });
      });
      it("by query", function() {
        var json;
        this.subject.loadData();
        json = QueryDSL.query(function() {
          return this.match({
            job: {
              query: "bar"
            }
          });
        });
        return runs(function() {
          var model;
          model = window.Fixture.store.find('user', json);
          waitsFor(function() {
            return model.toArray().length === 3;
          });
          return runs(function() {
            return expect(model.toArray().length).toEqual(3);
          });
        });
      });
      return it('get total', function() {
        var json, model;
        model = void 0;
        this.subject.loadData();
        json = QueryDSL.query(function() {
          return this.match({
            job: {
              query: "bar"
            }
          });
        });
        return runs(function() {
          window.Fixture.store.find('user', json).then(function(_model) {
            return model = _model;
          });
          waitsFor(function() {
            return model !== void 0 && model.toArray().length === 3;
          });
          return runs(function() {
            return expect(model.total).toEqual(3);
          });
        });
      });
    });
  });

}).call(this);
