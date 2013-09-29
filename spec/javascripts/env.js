(function() {
  this.DatabaseCleaner = (function() {
    function DatabaseCleaner() {}

    DatabaseCleaner.reset = function() {
      this.destroy();
      return this.create();
    };

    DatabaseCleaner.create = function() {
      return MappingDSL.create("http://localhost:9200/test_adapter");
    };

    DatabaseCleaner.destroy = function() {
      return MappingDSL["delete"]("http://localhost:9200/test_adapter");
    };

    return DatabaseCleaner;

  })();

  this.TestEnv = (function() {
    function TestEnv() {
      var mapping;
      DatabaseCleaner.reset();
      if (!window.Fixture) {
        this.models();
        mapping = {
          user: User
        };
        window.Fixture = window.setupStore(mapping);
      }
      this;
    }

    TestEnv.prototype.models = function() {
      return window.User = DS.Model.extend({
        name: DS.attr('string'),
        job: DS.attr('string')
      });
    };

    TestEnv.prototype.loadData = function() {
      BulkDSL.store({
        host: "http://localhost:9200/test_adapter",
        index: "test_adapter",
        type: "user"
      }, function() {
        this.create({
          id: 2,
          name: "bar2",
          job: "foo bar test"
        });
        this.create({
          id: 3,
          name: "bar3",
          job: "foo bar test"
        });
        this.create({
          id: 4,
          name: "bar4",
          job: "foo bar test"
        });
        return this.create({
          id: 5,
          name: "bar5",
          job: "foo bar test"
        });
      });
      return BulkDSL.refresh('http://localhost:9200/test_adapter');
    };

    TestEnv.prototype.loadFacets = function() {
      var mapping;
      MappingDSL["delete"]("http://localhost:9200/test_adapter");
      mapping = MappingDSL.mapping(function() {
        return this.mapping("user", function() {
          this.mapping("title", {
            type: "string",
            boost: 2.0,
            analyzer: "snowball"
          });
          return this.mapping("tags", {
            type: "string",
            analyzer: "keyword"
          });
        });
      });
      MappingDSL.create("http://localhost:9200/test_adapter", mapping);
      BulkDSL.store({
        host: "http://localhost:9200/test_adapter",
        index: "test_adapter",
        type: "user"
      }, function() {
        this.create({
          id: 1,
          title: "One",
          tags: ["elixir"]
        });
        this.create({
          id: 2,
          title: "Two",
          tags: ["elixir", "ruby"]
        });
        this.create({
          id: 3,
          title: "Three",
          tags: ["java"]
        });
        return this.create({
          id: 4,
          title: "Four",
          tags: ["erlang"]
        });
      });
      return BulkDSL.refresh('http://localhost:9200/test_adapter');
    };

    return TestEnv;

  })();

  window.setupStore = function(options) {
    var adapter, container, env, prop;
    env = {};
    options = options || {};
    container = env.container = new Ember.Container();
    adapter = env.adapter = DS.ElasticSearchAdapter.extend({
      host: "http://localhost:9200",
      url: "test_adapter/user"
    });
    delete options.adapter;
    for (prop in options) {
      container.register("model:" + prop, options[prop]);
    }
    container.register("serializer:_default", DS.RESTSerializer);
    container.register("store:main", DS.Store.extend({
      adapter: adapter
    }));
    container.register('transform:boolean', DS.BooleanTransform);
    container.register('transform:date', DS.DateTransform);
    container.register('transform:number', DS.NumberTransform);
    container.register('transform:string', DS.StringTransform);
    container.injection("serializer", "store", "store:main");
    env.serializer = container.lookup("serializer:_default");
    env.restSerializer = container.lookup("serializer:_rest");
    env.store = container.lookup("store:main");
    env.adapter = env.store.get("defaultAdapter");
    return env;
  };

}).call(this);
