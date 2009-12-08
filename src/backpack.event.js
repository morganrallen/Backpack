(function(Backpack)
{
    var $events = {},
        $setups = {},
        $suspendSetups = false;

    function events_runSetups(type)
    {
        $suspendSetups = true;
        $setups[type].forEach(function(event, index) {
            ;;;console.log('Backpack.event.on(%s) %o', type, event);
            event();
        })
        $suspendSetups = false;
        delete $setups[type];
    };

    Backpack.event =
    {
        fireEvent: function(type, data)
        {
            ;;;console.log('Backpack.event.fireEvent(%s)', type);
            if($setups[type] && !$suspendSetups) {
                events_runSetups(type);
            }

            if($events[type]) {
                $events[type].forEach(function(event, index)
                {
                    ;;;console.log('Backpack.event.fireEvent(%s) %o', type, event.cb);
                    event.cb.call(Backpack, data);
                });
            }
        },
        on: function(type, cb, data)
        {
            if($setups[type] && !$suspendSetups) {
                events_runSetups(type);
            }

            if(!$events[type]) {
                $events[type] = [];
            }
            $events[type].push({cb:cb,data:data});
        },
        setup: function(type, cb)
        {
            ;;;console.log('Backpack.event.setup(%s) %o', type, cb);
            if(!$events[type]) {
                if(!$setups[type]) {
                    $setups[type] = [];
                }

                $setups[type].push(cb);
            } else {
                cb();
            }
        }
    }
})(Backpack);
