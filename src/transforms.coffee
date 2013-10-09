EDEK.ArrayTransform = DS.Transform.extend

  deserialize: (serialized) ->
    switch Em.typeOf(serialized)
      when 'array'
        serialized
      when 'string' then return serialized.split(',').map((item)-> jQuery.trim(item))
      else          return []

  serialize: (deserialized) ->
    switch Em.typeOf(deserialized)
      when "array"
        deserialized
      else
        []
