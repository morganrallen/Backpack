var Backpack = (function() // XXX change namespace
{
    return {
        run: function()
        {
            ;;;console.log('Backpack.run');

            this.ready = true;
            this.fireEvent('running');
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
    var $events =
    {
    };

    function eventQueue(type)
    {
        this.subscriptions = [];
        this.setups = [];
    };

    function handleRunning()
    {
    };

    eventQueue.prototype =
    {
        fireEvent: function(data)
        {
        },
        on: function(cb, data, scope)
        {
        },
        setup: function(type)
        {
        }
    };

    Backpack.event =
    {
        fireEvent: function(type, data)
        {
        },
        on: function(type, cb, data, scope)
        {
        },
        setup: function(type, cb)
        {
        }
    };

    Backpack.event.on('running', handleRunning);
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
        
        Backpack.fireEvent('slider-click', slider);
    }

    function slideBar_handleSliderReady(slider)
    {
        ;;;console.log('Backpack.sliderBody::slideBar_handleSliderReady');
        $sliderBody = slider;
        Backpack.fireEvent('slider-ready', slider);
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
        
        Backpack.fireEvent('status-click', status);
    }

    function statusBar_handleStatusReady(status)
    {
        ;;;console.log('Backpack.statusBody::statusBar_handleStatusReady');
        statusBody = status;
        Backpack.fireEvent('status-ready', status);
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
    var $eventQueue = [];
    Backpack.mixins =
    {
        fireEvent: function(type, data)
        {
            if(!Backpack.ready) {
                return $eventQueue.push(arguments);
            }
            
            if($eventQueue.length > 0) {
                var e;
                while(e = $eventQueue.shift()) {
                    ;;;console.log('Backpack.fireEvent', type);
                    jQuery.event.call(arguments);
                }
            }

            ;;;console.log('Backpack.fireEvent' + (Backpack.ready ? '' : '(!ready)'), type);
            jQuery.event.trigger(type, [data], Backpack);
        },
        on: function(type, data)
        {
            jQuery.event.add(Backpack, type, data);
        }
    };

    for(var i in Backpack.mixins) {
        Backpack[i] = Backpack.mixins[i];
    }
})(Backpack);
