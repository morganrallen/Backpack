(function(Backpack)
{
    var $setups = {},
        $suspendSetups = false;

    Backpack.event =
    {
        fireEvent: Backpack.fireEvent,
        on: function(type, data)
        {
            ;;;console.log('Backpack.event.on', type);
            // this is the first time something has subscribed to this event
            // run through all the setups so the firing components get ready.
            if($setups[type] && !$suspendSetups) {
                $suspendSetups = true;
                for(var i = 0; i < $setups[type].length; i++) {
                    $setups[type][i]();
                }
                $suspendSetups = false;
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
