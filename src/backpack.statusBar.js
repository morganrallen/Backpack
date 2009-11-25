(function(Backpack)
{
    var ready = false,
        statusBody;

    function statusBar_handleStatusClick(status)
    {
        ;;;console.log('Backpack.statusBody::statusBar_handleStatusClick');
        if(!ready) {
            ;;;console.error("Slider clicked before ready, did something go wrong?");
            return;
        }
        
        Backpack.event.fireEvent('status-click', status);
    }

    function statusBar_handleStatusReady(status)
    {
        ;;;console.log('Backpack.statusBody::statusBar_handleStatusReady');
        statusBody = status;
        Backpack.event.fireEvent('status-ready', status);
        ready = true;
    }

    function statusBar_handleStatusReadySetup()
    {
        ;;;console.log('Backpack.statusBar #Backpack.event.setup("status-ready")');
        jetpack.statusBar.append({
            onClick: statusBar_handleStatusClick,
            onReady: statusBar_handleStatusReady,
            width: 40
        });
    }

    Backpack.event.setup('status-ready', statusBar_handleStatusReadySetup);
})(Backpack);
