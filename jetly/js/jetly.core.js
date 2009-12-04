(function(Backpack)
{
    jetpack.future.import("storage.settings");

    Backpack.projectName = "jetly";

    Backpack.jetly =
    {
        I18N: {
            "Bit.ly Username":
                "Bit.ly Username",

            "Bit.ly API Token":
                "Bit.ly API Token"
        }
    };

    var $sliderBody,
        $statusBody,
        $statusIcon;

    function jetly_handleIconClick(event)
    {
        ;;;console.log('jetly_handleIconClick');

        jQuery.event.trigger('jetly-icon-click');
        jetpack.storage.simple.firstRunDone = false;
    };

    Backpack.event.on('status-ready', function(statusBar)
    {
        ;;;console.log('jetly.on("status-ready")');
        $statusBody = $('body', statusBar);
        console.log(statusBar);
        $statusIcon = $('<img src="' + Backpack.jetly.images.favicon + '" />', $statusBody)
            .click(jetly_handleIconClick);

        $statusBody.append($statusIcon);
    });

    Backpack.event.on('slider-ready', function(slider)
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
    
    Backpack.event.on('first-run', function()
    {
        console.log('I am running the first time, but not again');
    });

    Backpack.event.on('running', function()
    {
    });
})(Backpack);

var manifest =
{
    settings:
    [
        {
            label: Backpack.jetly.I18N["Bit.ly Username"],
            name: "username",
            type: "text"
        },
        {
            label: Backpack.jetly.I18N["Bit.ly API Token"],
            name: "apiToken",
            type: "text"
        }
    ]
};
