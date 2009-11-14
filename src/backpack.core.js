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
