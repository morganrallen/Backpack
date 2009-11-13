(function(Backpack)
{
    var $eventQueue = [];
    Backpack.mixins =
    {
        fireEvent: function(type, data)
        {
            if(!Backpack.ready) {
                return $eventQueue.push(arguments);
            }
            
            if($eventQueue.length > 0) {
                var e;
                while(e = $eventQueue.shift()) {
                    ;;;console.log('Backpack.fireEvent', type);
                    jQuery.event.call(arguments);
                }
            }

            ;;;console.log('Backpack.fireEvent' + (Backpack.ready ? '' : '(!ready)'), type);
            jQuery.event.trigger(type, data, Backpack);
        },
        on: function(type, data)
        {
            jQuery.event.add(Backpack, type, data);
        }
    };

    for(var i in Backpack.mixins) {
        Backpack[i] = Backpack.mixins[i];
    }
})(Backpack);
