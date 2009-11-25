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
