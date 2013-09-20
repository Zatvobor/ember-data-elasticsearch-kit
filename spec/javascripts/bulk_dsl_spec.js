(function() {
  describe('BulkDSL', function() {
    beforeEach(function() {
      return this.subject = BulkDSL;
    });
    return it("create docs", function() {
      MappingDSL["delete"]("http://localhost:9200/test_index");
      MappingDSL.create("http://localhost:9200/test_index", {});
      this.subject.store({
        host: "http://localhost:9200/test_index",
        index: "test_index"
      }, function() {
        this.create({
          id: 2,
          title: "bar2",
          description: "foo bar test"
        });
        this.create({
          id: 3,
          title: "bar3",
          description: "foo bar test"
        });
        this.create({
          id: 4,
          title: "bar4",
          description: "foo bar test"
        });
        this.create({
          id: 5,
          title: "bar5",
          description: "foo bar test"
        });
        this.update({
          id: 2,
          title: "bar2 updated",
          description: "foo bar test"
        });
        return this["delete"]({
          id: 3
        });
      });
      return expect(this.subject.documents).toEqual(['{"create":{"_type":"document","_id":2,"_index":"test_index"}}', '{"id":2,"title":"bar2","description":"foo bar test"}', '{"create":{"_type":"document","_id":3,"_index":"test_index"}}', '{"id":3,"title":"bar3","description":"foo bar test"}', '{"create":{"_type":"document","_id":4,"_index":"test_index"}}', '{"id":4,"title":"bar4","description":"foo bar test"}', '{"create":{"_type":"document","_id":5,"_index":"test_index"}}', '{"id":5,"title":"bar5","description":"foo bar test"}', '{"update":{"_type":"document","_id":2,"_index":"test_index"}}', '{"id":2,"title":"bar2 updated","description":"foo bar test"}', '{"delete":{"_type":"document","_id":3,"_index":"test_index"}}', '{"id":3}']);
    });
  });

}).call(this);
