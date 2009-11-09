var Backpack = (function() // XXX change namespace
{
    var $inits = [],
        $modules = {},
        $runs = [];

    return {
        addModule: function(m)
        {
            if(!m.NAME) {
                throw new Error("modules must define NAME");
            }

            if($modules[m.NAME]) {
                throw new Error("module already registered");
            }

            $modules[m.NAME] = m;

            if(m.register) {
                m.register();
            }

            if(m.init) {
                $inits.push(m.NAME);
            }

            if(m.run) {
                $runs.push(m.NAME);
            }
        },

        init: function()
        {
            ;;;console.log('Backpack.init');
            var i;
            // do some core setup
            for(i = 0; i < $inits.length; i++) {
                $modules[$inits[i]].init();
            }
        },

        run: function()
        {
            ;;;console.log('Backpack.run');
            for(i = 0; i < $runs.length; i++) {
                $modules[$runs[i]].run();
            }

            this.ready = true;
            this.fireEvent('ready');
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
    var ready = false,
        sliderBody;

    function handleClick(slider)
    {
        ;;;console.log('Backpack.sliderBody::handleClick');
        if(!ready) {
            ;;;console.error("Slider clicked before ready, did something go wrong?");
            return;
        }
        
        Backpack.fireEvent('slider-click', slider);
    }

    function handleReady(slider)
    {
        ;;;console.log('Backpack.sliderBody::handleReady');
        sliderBody = slider;
        Backpack.fireEvent('slider-ready', slider);
        ready = true;
    }

    // setup the modules init methods (register, init, run) and external methods
    Backpack.slideBar =
    {
        NAME: 'slideBar',

        // runs during Backpack.init()
        init: function()
        {
            ;;;console.log('Backpack.slideBar.init');
            jetpack.slideBar.append({
                onClick: handleClick,
                onReady: handleReady,
                width: 250
            });
        },
        
        // runs during addModule
        register: function()
        {
            jetpack.future.import('slideBar');
        }
    };

    // register the module, this runs register
    Backpack.addModule(Backpack.slideBar);
})(Backpack);
(function(Backpack) // change to projects real namespace
{
    // setup the modules init methods (register, init, run) and external methods
    Backpack.statusBar =
    {
        NAME: 'statusBar',

        // runs during Backpack.init()
        init: function()
        {
        },
        
        // runs during addModule
        register: function()
        {
        }
    };

    // register the module, this runs register
    Backpack.addModule(Backpack.statusBar);
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
            jQuery.event.trigger(type, data, Backpack);
        },
        on: function(elem, type, handler, data)
        {
            jQuery.event.add.call(arguments);
        }
    };
})(Backpack);
if(Backpack.mixins) {
    for(var i in Backpack.mixins) {
        Backpack[i] = Backpack.mixins[i];
    }
}

Backpack.init();
// PRoject
console.log(jQuery);
Backpack.run();
