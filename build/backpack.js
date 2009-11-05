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
            var i;
            // do some core setup
            for(i = 0; i < $inits.length; i++) {
                $modules[$inits[i]].init();
            }

            // do some core stuff

            for(i = 0; i < $runs.length; i++) {
                $modules[$runs[i]].run();
            }
        }
    };
})();
(function(Backpack) // change to projects real namespace
{
    // setup the modules init methods (register, init, run) and external methods
    Backpack.slideBar =
    {
        NAME: 'slideBar',

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
Backpack.init();
