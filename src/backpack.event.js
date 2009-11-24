(function(Backpack)
{
    var $events =
    {
    };

    function eventQueue(type)
    {
        this.subscriptions = [];
        this.setups = [];
    };

    function handleRunning()
    {
    };

    eventQueue.prototype =
    {
        fireEvent: function(data)
        {
        },
        on: function(cb, data, scope)
        {
        },
        setup: function(type)
        {
        }
    };

    Backpack.event =
    {
        fireEvent: function(type, data)
        {
        },
        on: function(type, cb, data, scope)
        {
        },
        setup: function(type, cb)
        {
        }
    };

    Backpack.event.on('running', handleRunning);
})(Backpack);
