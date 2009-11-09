(function(Backpack)
{
    var ready = false,
        statusBody;

    function handleClick(status)
    {
        ;;;console.log('Backpack.statusBody::handleClick');
        if(!ready) {
            ;;;console.error("Slider clicked before ready, did something go wrong?");
            return;
        }
        
        Backpack.fireEvent('status-click', status);
    }

    function handleReady(status)
    {
        ;;;console.log('Backpack.statusBody::handleReady');
        statusBody = status;
        Backpack.fireEvent('status-ready', status);
        ready = true;
    }

    // setup the modules init methods (register, init, run) and external methods
    Backpack.statusBar =
    {
        NAME: 'statusBar',

        // runs during Backpack.init()
        init: function()
        {
            ;;;console.log('Backpack.statusBar.init');
            jetpack.statusBar.append({
                onClick: handleClick,
                onReady: handleReady,
                width: 40
            });
        },
        
        // runs during addModule
        register: function()
        {
        }
    };

    // register the module, this runs register
    Backpack.addModule(Backpack.statusBar);
})(Backpack);
