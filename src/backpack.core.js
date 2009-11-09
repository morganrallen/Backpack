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

            ;;;console.log('adding ' + m.NAME);

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
            this.ready = true;
            this.fireEvent('ready');
        },

        run: function()
        {
            ;;;console.log('Backpack.run');
            for(i = 0; i < $runs.length; i++) {
                $modules[$runs[i]].run();
            }

        }
    };
})();
