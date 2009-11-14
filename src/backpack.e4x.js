(function(Backpack)
{
    Backpack.on('running', function()
    {
        function handleSliderReady(event, slider)
        {
            $(slider.contentDocument.documentElement).append(Backpack[Backpack.projectName].xml.slideBar.toString());
        };

        function handleStatusReady(event, statusBody)
        {
            console.log(Backpack[Backpack.projectName].xml.statusBar.toString(),statusBody);
            $(statusBody).append(Backpack[Backpack.projectName].xml.statusBar.toString());
        };

        if(Backpack[Backpack.projectName].xml) {
            if(Backpack[Backpack.projectName].xml.slideBar) {
                Backpack.event.on('slider-ready', handleSliderReady);
            }
            if(Backpack[Backpack.projectName].xml.statusBar) {
                Backpack.event.on('status-ready', handleStatusReady);
            }
        };
    });
})(Backpack);
