var Project = (function() // XXX change name
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
(function(Project) // change to projects real namespace
{
    // declare functions used by this module
    function doSomething()
    {
    };

    // setup the modules init methods (register, init, run) and external methods
    Project.module =
    {
        NAME: 'module',

        // runs during Project.init()
        init: function()
        {
            print('module inited');
        },
        
        // runs during addModule
        register: function()
        {
            print('module registered');
        }
    };

    // register the module, this runs register
    Project.addModule(Project.module);
})(Project);
Project.init();
