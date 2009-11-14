(function(Backpack)
{
    var $setups = {},
        $suspendSetups = false;

    function handleRunning()
    {
        for(var j in $setups) {
            for(var i = 0; i < $setups[j].length; i++) {
                $setups[j][i]();
            }
        }
    };

    Backpack.event =
    {
        fireEvent: Backpack.fireEvent,
        on: function(type, data)
        {
            ;;;console.log('Backpack.event.on', type);
            // this is the first time something has subscribed to this event
            // run through all the setups so the firing components get ready.
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

    Backpack.event.on('running', handleRunning);
})(Backpack);
