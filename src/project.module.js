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
        },
        
        // runs during addModule
        register: function()
        {
        }
    };

    // register the module, this runs register
    Project.addModule(Project.module);
})(Project);
