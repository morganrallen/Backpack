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

    Backpack.on('running', function()
    {
        jetpack.statusBar.append({
            onClick: handleClick,
            onReady: handleReady,
            width: 40
        });
    });
})(Backpack);
