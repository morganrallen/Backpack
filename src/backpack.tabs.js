(function(Backpack)
{
    // this will eventually be an option
    var $tabs =
        {
            byUrl: {},
            byTabNumber: {}
        },
        $tracking = false;

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
        Backpack.event.fireEvent('tab-close', doc);
    };

    function tabs_handleTabOnFocus(doc)
    {
        if($tracking && !(this.url in $tabs.byUrl)) {
            tabs_trackTab(this);
        }

        Backpack.event.fireEvent('tab-focus', doc);
    };

    function tabs_handleTabOnOpen(doc)
    {
        if($tracking) {
            tabs_trackTab(this);
        }

        Backpack.event.fireEvent('tab-open', doc);
    };

    function tabs_handleTabOnReady(doc)
    {
        Backpack.event.fireEvent('tab-ready', doc);
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
            // caching doesn't realyl work yet...
//            if(url in $tabs.byUrl) {
//                return $tabs.byUrl[url];
//            }

            for(var i = 0; i < jetpack.tabs.length; i++) {
                if(jetpack.tabs[i].url.indexOf(url) > -1) {
                    // cache find
                    $tabs.byUrl[url] = jetpack.tabs[i];
                    return jetpack.tabs[i];
                }
            }

            return false;
        },

    };
})(Backpack);
