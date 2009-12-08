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
Backpack.jetly.css = {'slideBar': 'data:text/css;base64,I2JvZHkgewogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7CiAgICBoZWlnaHQ6IDEwMCU7CiAgICB3aWR0aDogMTAwJTsKfQoKI2JpdGx5LWxvZ28tb3V0ZXIgewogICAgd2lkdGg6IDkwcHg7CiAgICBvdmVyZmxvdzogaGlkZGVuOwp9Cg=='};(function(Backpack)
{
    Backpack.jetly.I18N =
    {
        "Bit.ly Username":
            "Bit.ly Username",

        "Bit.ly API Token":
            "Bit.ly API Token"
    };
})(Backpack);
Backpack.jetly.images = {'favicon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAvBJREFUeNp8k1tIVFEUhv85x8lRZxx1bt7GMS+TqHhXwrK8PfRQBJnTk8VAkEFRQSAkPQViUFjRW28SEUzhBU0RxjBQI0ezEmdEEzUsMy856ow2ZzytfVLLoDZ87L3XXvz7rP+sLausrOQAhBL51VXltwty0rODFtsAhQGcrghnLtSX22w2O/4xAggdcfLO9ZIHUR5bIMZt2KIAF5EP0e1CXKRSj/8MdnsiUTY3O8nE4Pwk4pN4CM61DDiX4mA9f/HJ8GCvu7urpf1mbU3Z3wJ8WlpaDM3mvpEVveurUpWaUcAlx6mhC16HPiYZOjUHQ7g8MD5anVyQlXi2vPhgnldQdI6Ojm7slDBBdBLhBoMxMnW/ipcFxUrq4trkntuCieKsiOP4kddIvpzY+QKBZnWsPujEFUtCslzOA4L7v+hDRbPRlDTSbnc4pRK0Eaqqc6eLLRH8TID9zRz6388jTLEhAWFd4nn3LBwTPvjWF2DSCgg1FhbGJxzoYSYefXjjWE12UnBgz9Ac0suvw1J9Fx0jaoibixIv+j4jvfQSrJfrMThnlGLmmMDYkhxNM3f/3EajuNgPhsfjxcDAAKxWK0JCNYBv5Rd+L6ampmCxWBCs+hX/OvwImarXRn7Gl3lq+vOyNkm7ypk0G3jW5YLPDxQZx2HSbJKTPkSHCeh4OQyfIMPBqFEp7vEr0eYQn7K/YHdM8vu0yk1z1WEvV2fx/rbdv+0+ZV07hj3x3hGZq2VAUcs8aCL6h6YC1jxeOtkSMD0PCbbegZ19W9na3b+b4Zsp4wsTcDGBeTc/9twRtAWREkQ/Hr/RYnohAM5ZXpob7AYsuFlzCGh7q3g39kV+j3rBy0r4TjiIlM4PIVrKMFXkrnJFZq8ksjPY3qT5gabBkI/PHKqrFFpmcZkoisxdFa1zCdZdpTqVkFJX8U0xvSjfFTBpfLjVqm2dWZI30HaQbl+VBOg5SzOhJJKII0Qh8ecrZI70Ea+2W3+NFcMOfgowADS4QJjmu+UEAAAAAElFTkSuQmCC'};(function(Backpack)
{
    var $bitlyShortenUrl = 'http://api.bit.ly/shorten';

    function jetly_handleShortenUrlError(data, status)
    {
        ;;;console.log("%o", jetly_handleShortenUrlError);
        console.log(data.responseText);
    };

    function jetly_handleShortenUrlSuccess(data, status)
    {
        ;;;console.log("%o", jetly_handleShortenUrlSuccess);
        console.log(data);
    };

    function jetly_utilAJAX(url, extraData, cb)
    {
        var data = 
        {
            login: jetpack.storage.settings.login,
            apiKey: jetpack.storage.settings.apiKey,
            format: 'json',
            version: '2.0.1'
        };

        for(var i in extraData)
            data[i] = extraData[i];

        jQuery.ajax(
        {
            data: data,
            dataMethod: 'jsonp',
            error: jetly_handleShortenUrlError,
            success: jetly_handleShortenUrlSuccess,
            url: url
        });
    }

    Backpack.jetly.util =
    {
        shortenUrl: function(url, cb)
        {
            ;;;console.log('Backpack.jetly.util.shortenUrl(%s, %o)', url, cb);
            jetly_utilAJAX($bitlyShortenUrl, {longUrl: url}, cb);
        }
    };
})(Backpack);
Backpack.jetly.xml = {'slideBar':<div id="jetly-header">
    <div id="body">
        <div id="bitly-logo-outer">
            <img id="bitly-logo" src="http://bit.ly/static/images/bitly_logo_top.png" />
        </div>

        <div id="debugFooter">
            <div id="clearFirstRun">[clear first-run]</div>
        </div>
    </div>
</div>
};