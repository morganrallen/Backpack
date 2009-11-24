(function(Backpack)
{
    Backpack.__defineSetter__('firstRun', function(f)
    {
        ;;;console.log('Backpack.firstRun');
        // this is basically a proof of concept. Eventually 
        // (after Backpack.storage is implemented) this will
        // run throught that.

        if(!jetpack.storage.simple) {
            jetpack.future.import("storage.simple");
        };

        if(jetpack.storage.simple.firstRun !== true) {
            jetpack.storage.simple.firstRun = true;
            f();
        };
    });
})(Backpack);
