(function(Backpack)
{
    var $setups = {};

    Backpack.event =
    {
        fireEvent: Backpack.fireEvent,
        on: function(type, data)
        {
            ;;;console.log('Backpack.event.on', type);
            if($setups[type]) {
                var cb;
                while(cb = $setups[type].shift()) {
                    cb();
                }
                delete $setups[type];
            }
            jQuery.event.add(Backpack, type, data);
        },
        setup: function(type, cb)
        {
            ;;;console.log('Backpack.event.setup', type);
            if(!$setups[type]) {
                $setups[type] = [];
            }

            $setups[type].push(cb);
        }
    }
})(Backpack);
