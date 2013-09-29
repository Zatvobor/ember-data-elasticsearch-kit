(function() {
  this.ArrayTransform = DS.Transform.extend({
    deserialize: function(serialized) {
      switch (Em.typeOf(serialized)) {
        case 'array':
          return serialized;
        case 'string':
          return serialized.split(',').map(function(item) {
            return jQuery.trim(item);
          });
        default:
          return [];
      }
    },
    serialize: function(deserialized) {
      switch (Em.typeOf(deserialized)) {
        case "array":
          return deserialized;
        default:
          return [];
      }
    }
  });

}).call(this);
