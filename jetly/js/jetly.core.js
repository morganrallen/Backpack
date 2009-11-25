(function(Backpack)
{
    Backpack.projectName = "jetly";

    Backpack.jetly =
    {
    };

    var $sliderBody,
        $statusBody,
        $statusIcon;

    function jetly_handleIconClick(event)
    {
        ;;;console.log('jetly_handleIconClick');

        jQuery.event.trigger('jetly-icon-click');
    };

    Backpack.event.on('status-ready', function(event, statusBar)
    {
        $statusBody = $('body', statusBar);
        $statusIcon = $('<img src="' + Backpack.jetly.images.favicon + '" />', $statusBody)
            .click(jetly_handleIconClick);

        $statusBody.append($statusIcon);
    });

    Backpack.event.on('slider-ready', function(event, slider)
    {
        ;;;console.log('jetly.on("slider-ready")');
        $sliderBody = $('body', slider.contentDocument);
        console.log($sliderBody);

        console.log($sliderBody.find('#bitly-logo'));
        $sliderBody.find('#bitly-logo').click(function()
        {
            jetpack.tabs.open('http://bit.ly');
        });
    });

    Backpack.event.on('running', function()
    {
    });

    Backpack.firstRun = function()
    {
        console.log('I am running the first time, but not again');
    }
})(Backpack);
        
