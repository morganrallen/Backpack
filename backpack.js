var Backpack = (function()
{
    return {
        run: function()
        {
            ;;;console.log('Backpack.run');
            Backpack.event.fireEvent('running');
        }
    };
})();
(function(Backpack)
{
    Backpack.util =
    {
        curry: function(b, f)
        {
            return function()
            {
                return b.apply(this, [f].concat(Array.prototype.splice.call(arguments,0)));
            }
        }
    };
})(Backpack);
(function(Backpack)
{
    var $setups = {};

    Backpack.event =
    {
        fireEvent: function(type, data)
        {
            ;;;console.log('Backpack.event.fireEvent(' + type + ')');
            jQuery.event.trigger(type, data, Backpack);
        },
        on: function(type, data)
        {
            ;;;console.log('Backpack.event.on', type);
            if($setups[type]) {
                var cb;
                while(cb = $setups[type].shift()) {
                    cb();
                }
                delete $setups[type];
            }
            jQuery.event.add(Backpack, type, data);
        },
        setup: function(type, cb)
        {
            ;;;console.log('Backpack.event.setup', type);
            if(!$setups[type]) {
                $setups[type] = [];
            }

            $setups[type].push(cb);
        }
    }
})(Backpack);
(function(Backpack)
{
    function e4x_handleSliderReady(event, slider)
    {
        ;;;console.log("Backpack.e4x::e4x_handleSliderReady");
        $(slider.contentDocument.documentElement).append(Backpack[Backpack.projectName].xml.slideBar.toString());
    };

    function e4x_handleSliderSetup(event, slider)
    {
        if(Backpack[Backpack.projectName].xml && Backpack[Backpack.projectName].xml.slideBar) {
            Backpack.event.on('slider-ready', e4x_handleSliderReady);
        }
    };

    function e4x_handleStatusReady(event, statusBody)
    {
        ;;;console.log("Backpack.e4x::e4x_handleStatusReady");
        $(statusBody).append(Backpack[Backpack.projectName].xml.statusBar.toString());
    };

    function e4x_handleStatusSetup(event, status)
    {
        if(Backpack[Backpack.projectName].xml && Backpack[Backpack.projectName].xml.statusBar) {
            Backpack.event.on('status-ready', e4x_handleStatusReady);
        }
    };

    Backpack.event.setup('slider-ready', e4x_handleSliderSetup);
    Backpack.event.setup('status-ready', e4x_handleStatusSetup);
})(Backpack);
(function(Backpack)
{
    var $ready = false,
        $sliderBody;

    function slideBar_handleSliderClick(slider)
    {
        ;;;console.log('Backpack.sliderBody::slideBar_handleSliderClick',slider);
        if(!$ready) {
            ;;;console.error("Slider clicked before ready, did something go wrong?");
            return;
        }
        
        Backpack.event.fireEvent('slider-click', slider);
    }

    function slideBar_handleSliderReady(slider)
    {
        ;;;console.log('Backpack.sliderBody::slideBar_handleSliderReady');
        $sliderBody = slider;
        Backpack.event.fireEvent('slider-ready', slider);
        $ready = true;
    }
    
    function sliderBar_handleSliderReadySetup()
    {
        ;;;console.log('Backpack.sliderBar #Backpack.event.setup("slider-ready")');
        jetpack.future.import('slideBar');
        jetpack.slideBar.append({
            onClick: slideBar_handleSliderClick,
            onReady: slideBar_handleSliderReady,
            width: 250
        });
    };

    Backpack.event.setup('slider-ready', sliderBar_handleSliderReadySetup);
})(Backpack);
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
(function(Backpack)
{
    function selection_handleSelection()
    {
        Backpack.fireEvent('selection', jetpack.selection);
    };

    function selection_handleSelectionSetup()
    {
        jetpack.future.import("selection");
        jetpack.selection.onSelection(selection_handleSelection);
    }

    Backpack.event.setup('selection', selection_handleSelectionSetup);
})(Backpack);
(function(Backpack)
{
    // this will eventually be an option
    var $tabs =
        {
            byUrl: {},
            byTabNumber: {}
        },
        $tracking = true;

    function tabs_handleTabsOnCloseSetup()
    {
        jetpack.tabs.onClose(tabs_handleTabOnClose);
    };

    function tabs_handleTabsOnFocusSetup()
    {
        jetpack.tabs.onFocus(tabs_handleTabOnFocus);
    };

    function tabs_handleTabsOnOpenSetup()
    {
        jetpack.tabs.onOpen(tabs_handleTabOnOpen);
    };

    function tabs_handleTabsOnReadySetup()
    {
        jetpack.tabs.onReady(tabs_handleTabOnReady);
    };

    function tabs_handleTabOnClose(doc)
    {
        jQuery.event.trigger('tab-close', doc);
    };

    function tabs_handleTabOnFocus(doc)
    {
        if($tracking && !(this.url in $tabs.byUrl)) {
            tabs_trackTab(this);
        }

        jQuery.event.trigger('tab-focus', doc);
    };

    function tabs_handleTabOnOpen(doc)
    {
        if($tracking) {
            tabs_trackTab(this);
        }

        jQuery.event.trigger('tab-open', doc);
    };

    function tabs_handleTabOnReady(doc)
    {
        jQuery.event.trigger('tab-ready', doc);
    };

    function tabs_trackTab(tab)
    {
        $tabs.byUrl[tab.url] = tab;
        $tabs.byTabNumber[jetpack.tabs.indexOf(tab)] = tab;
    };

    if($tracking) {
        tabs_handleTabsOnCloseSetup();
        tabs_handleTabsOnFocusSetup();
        tabs_handleTabsOnOpenSetup();
        tabs_handleTabsOnReadySetup();
    } else {
        Backpack.event.setup('tab-close', tabs_handleTabsOnCloseSetup);
        Backpack.event.setup('tab-focus', tabs_handleTabsOnFocusSetup);
        Backpack.event.setup('tab-open', tabs_handleTabsOnOpenSetup);
        Backpack.event.setup('tab-ready', tabs_handleTabsOnReadySetup);
    };

    Backpack.tabs =
    {
        getByUrl: function(url)
        {
            if(url in $tabs.byUrl) {
                return $tabs.byUrl[url];
            }

            for(var i = 0; i < jetpack.tabs.length; i++) {
                if(url == jetpack.tabs[i].url) {
                    // cache find
                    return jetpack.tabs[i];
                }
            }

            return false;
        },

    };
})(Backpack);
(function(Backpack)
{
    function firstRun_handleFirstRunSetup()
    {
        ;;;console.log('Backpack.firstRun #Backpack.event.setup("first-run")');
        jetpack.future.import("storage.simple");

        if(jetpack.storage.simple.firstRunDone !== true) {
            jetpack.storage.simple.firstRunDone = true;
            Backpack.event.fireEvent('first-run');
        };
    };

    Backpack.event.setup('running', firstRun_handleFirstRunSetup);
})(Backpack);
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
        jetpack.storage.simple.firstRunDone = false;
    };

    Backpack.event.on('status-ready', function(event, statusBar)
    {
        ;;;console.log('jetly.on("status-ready")');
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
    
    Backpack.event.on('first-run', function(event)
    {
        console.log('I am running the first time, but not again');
    });

    Backpack.event.on('running', function()
    {
    });
})(Backpack);
Backpack.jetly.images = {'favicon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAvBJREFUeNp8k1tIVFEUhv85x8lRZxx1bt7GMS+TqHhXwrK8PfRQBJnTk8VAkEFRQSAkPQViUFjRW28SEUzhBU0RxjBQI0ezEmdEEzUsMy856ow2ZzytfVLLoDZ87L3XXvz7rP+sLausrOQAhBL51VXltwty0rODFtsAhQGcrghnLtSX22w2O/4xAggdcfLO9ZIHUR5bIMZt2KIAF5EP0e1CXKRSj/8MdnsiUTY3O8nE4Pwk4pN4CM61DDiX4mA9f/HJ8GCvu7urpf1mbU3Z3wJ8WlpaDM3mvpEVveurUpWaUcAlx6mhC16HPiYZOjUHQ7g8MD5anVyQlXi2vPhgnldQdI6Ojm7slDBBdBLhBoMxMnW/ipcFxUrq4trkntuCieKsiOP4kddIvpzY+QKBZnWsPujEFUtCslzOA4L7v+hDRbPRlDTSbnc4pRK0Eaqqc6eLLRH8TID9zRz6388jTLEhAWFd4nn3LBwTPvjWF2DSCgg1FhbGJxzoYSYefXjjWE12UnBgz9Ac0suvw1J9Fx0jaoibixIv+j4jvfQSrJfrMThnlGLmmMDYkhxNM3f/3EajuNgPhsfjxcDAAKxWK0JCNYBv5Rd+L6ampmCxWBCs+hX/OvwImarXRn7Gl3lq+vOyNkm7ypk0G3jW5YLPDxQZx2HSbJKTPkSHCeh4OQyfIMPBqFEp7vEr0eYQn7K/YHdM8vu0yk1z1WEvV2fx/rbdv+0+ZV07hj3x3hGZq2VAUcs8aCL6h6YC1jxeOtkSMD0PCbbegZ19W9na3b+b4Zsp4wsTcDGBeTc/9twRtAWREkQ/Hr/RYnohAM5ZXpob7AYsuFlzCGh7q3g39kV+j3rBy0r4TjiIlM4PIVrKMFXkrnJFZq8ksjPY3qT5gabBkI/PHKqrFFpmcZkoisxdFa1zCdZdpTqVkFJX8U0xvSjfFTBpfLjVqm2dWZI30HaQbl+VBOg5SzOhJJKII0Qh8ecrZI70Ea+2W3+NFcMOfgowADS4QJjmu+UEAAAAAElFTkSuQmCC'};Backpack.jetly.xml = {'slideBar':<div id="jetly-header">
    <style>
    <![CDATA[
        body {
            background-color: white;
        }

        #bitly-logo-outer {
            width: 90px;
            overflow: hidden;
        }]]>
    </style>
    <div id="bitly-logo-outer">
        <img id="bitly-logo" src="http://bit.ly/static/images/bitly_logo_top.png" />
    </div>
</div>
};Backpack.run();