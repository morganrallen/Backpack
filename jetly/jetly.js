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
    
    Backpack.event.on('first-run', function(event)
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
(function(Backpack)
{
    Backpack.jetly.I18N =
    {
        "Bit.ly Username":
            "Bit.ly Username",

        "Bit.ly API Token":
            "Bit.ly API Token"
    };
})(Backpack);
Backpack.jetly.images = {'favicon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAvBJREFUeNp8k1tIVFEUhv85x8lRZxx1bt7GMS+TqHhXwrK8PfRQBJnTk8VAkEFRQSAkPQViUFjRW28SEUzhBU0RxjBQI0ezEmdEEzUsMy856ow2ZzytfVLLoDZ87L3XXvz7rP+sLausrOQAhBL51VXltwty0rODFtsAhQGcrghnLtSX22w2O/4xAggdcfLO9ZIHUR5bIMZt2KIAF5EP0e1CXKRSj/8MdnsiUTY3O8nE4Pwk4pN4CM61DDiX4mA9f/HJ8GCvu7urpf1mbU3Z3wJ8WlpaDM3mvpEVveurUpWaUcAlx6mhC16HPiYZOjUHQ7g8MD5anVyQlXi2vPhgnldQdI6Ojm7slDBBdBLhBoMxMnW/ipcFxUrq4trkntuCieKsiOP4kddIvpzY+QKBZnWsPujEFUtCslzOA4L7v+hDRbPRlDTSbnc4pRK0Eaqqc6eLLRH8TID9zRz6388jTLEhAWFd4nn3LBwTPvjWF2DSCgg1FhbGJxzoYSYefXjjWE12UnBgz9Ac0suvw1J9Fx0jaoibixIv+j4jvfQSrJfrMThnlGLmmMDYkhxNM3f/3EajuNgPhsfjxcDAAKxWK0JCNYBv5Rd+L6ampmCxWBCs+hX/OvwImarXRn7Gl3lq+vOyNkm7ypk0G3jW5YLPDxQZx2HSbJKTPkSHCeh4OQyfIMPBqFEp7vEr0eYQn7K/YHdM8vu0yk1z1WEvV2fx/rbdv+0+ZV07hj3x3hGZq2VAUcs8aCL6h6YC1jxeOtkSMD0PCbbegZ19W9na3b+b4Zsp4wsTcDGBeTc/9twRtAWREkQ/Hr/RYnohAM5ZXpob7AYsuFlzCGh7q3g39kV+j3rBy0r4TjiIlM4PIVrKMFXkrnJFZq8ksjPY3qT5gabBkI/PHKqrFFpmcZkoisxdFa1zCdZdpTqVkFJX8U0xvSjfFTBpfLjVqm2dWZI30HaQbl+VBOg5SzOhJJKII0Qh8ecrZI70Ea+2W3+NFcMOfgowADS4QJjmu+UEAAAAAElFTkSuQmCC'};Backpack.jetly.xml = {'slideBar':<div id="jetly-header">
    lalal
    <style>
    <![CDATA[
        #body {
            background-color: white;
            height: 100%;
            width: 100%;
        }

        #bitly-logo-outer {
            width: 90px;
            overflow: hidden;
        }]]>
    </style>
    <div id="body">
        <div id="bitly-logo-outer">
            <img id="bitly-logo" src="http://bit.ly/static/images/bitly_logo_top.png" />
        </div>
    </div>
</div>
};