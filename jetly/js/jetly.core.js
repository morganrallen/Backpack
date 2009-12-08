(function(Backpack)
{
    jetpack.future.import("storage.settings");
    jetpack.future.import("storage.simple");

    var $bitlyAPIUrl = 'http://bit.ly/account/your_api_key',
        $bitlyURL = 'http://bit.ly';

    Backpack.projectName = "jetly";

    Backpack.jetly =
    {
        bitlyUrl: $bitlyURL,
        I18N: {
            "Bit.ly Login":
                "Bit.ly Login",

            "Bit.ly API Key":
                "Bit.ly API Key"
        }
    };

    var $sliderBody,
        $statusBody,
        $statusIcon;

    function jetly_handleFirstRun()
    {
        ;;;console.log('I am running the first time, but not again');
    };

    function jetly_handleIconClick(event)
    {
        Backpack.event.fireEvent('jetly-icon-click');

        Backpack.jetly.util.shortenUrl(jetpack.tabs.focused.url, function(info)
        {
            console.log(info);
        });
    };

    function jetly_handlerSliderReady(slider)
    {
        $sliderBody = $('html', slider.contentDocument);

        $sliderBody.find('#bitly-logo').click(function()
        {
            var bitlyTab = Backpack.tabs.getByUrl($bitlyURL);
            if(!bitlyTab) {
                jetpack.tabs.open('http://bit.ly').focus();
            } else {
                bitlyTab.focus();
            }
        });

        $sliderBody.find("#clearFirstRun")
            .click(function(event)
            {
                ;;;console.log('Clearing first-run');
                jetpack.storage.simple.firstRunDone = false;
            });
    };

    function jetly_handlerStatusReady(statusBar)
    {
        $statusBody = $('body', statusBar);

        $statusIcon = $('<img src="' + Backpack.jetly.images.favicon + '" />', $statusBody)
            .click(jetly_handleIconClick);

        $statusBody.append($statusIcon);
    };

    Backpack.event.on('first-run', jetly_handleFirstRun);
    Backpack.event.on('slider-ready', jetly_handlerSliderReady);
    Backpack.event.on('status-ready', jetly_handlerStatusReady);
})(Backpack);

var manifest =
{
    settings:
    [
        {
            label: Backpack.jetly.I18N["Bit.ly Login"],
            name: "login",
            type: "text"
        },
        {
            label: Backpack.jetly.I18N["Bit.ly API Key"],
            name: "apiKey",
            type: "text"
        }
    ]
};
