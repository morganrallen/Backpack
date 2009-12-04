(function(Backpack)
{
    var $events = {},
        $setups = {},
        $suspendSetups = false;

    Backpack.event =
    {
        fireEvent: function(type, data)
        {
            ;;;console.log('Backpack.event.fireEvent(' + type + ')');
            if($events[type]) {
                $events[type].forEach(function(event, index)
                {
                    event.cb.call(Backpack, data);
                });
            }
//            jQuery.event.trigger(type, data, Backpack);
        },
        on: function(type, cb, data)
        {
            ;;;console.log('Backpack.event.on', type);
            if($setups[type] && !$suspendSetups) {
                $suspendSetups = true;
                $setups[type].forEach(function(event, index) {
                    event();
                })
                $suspendSetups = false;
                delete $setups[type];
            }

            if(!$events[type]) {
                $events[type] = [];
            }
            $events[type].push({cb:cb,data:data});
        },
        setup: function(type, cb)
        {
            ;;;console.log('Backpack.event.setup', type);
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
