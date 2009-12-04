(function(Backpack)
{
    function e4x_handleSliderReady(slider)
    {
        ;;;console.log("Backpack.e4x::e4x_handleSliderReady");
        if(Backpack[Backpack.projectName].xml && Backpack[Backpack.projectName].xml.slideBar) {
            $(slider.contentDocument.documentElement).append(Backpack[Backpack.projectName].xml.slideBar.toString());
        }
    };

    function e4x_handleSliderSetup(event, slider)
    {
        Backpack.event.on('slider-ready', e4x_handleSliderReady);
    };

    function e4x_handleStatusReady(event, statusBody)
    {
        ;;;console.log("Backpack.e4x::e4x_handleStatusReady");
        if(Backpack[Backpack.projectName].xml && Backpack[Backpack.projectName].xml.statusBar) {
            $(statusBody).append(Backpack[Backpack.projectName].xml.statusBar.toString());
        }
    };

    function e4x_handleStatusSetup(event, status)
    {
        Backpack.event.on('status-ready', e4x_handleStatusReady);
    };

    Backpack.event.setup('slider-ready', e4x_handleSliderSetup);
    Backpack.event.setup('status-ready', e4x_handleStatusSetup);
})(Backpack);
