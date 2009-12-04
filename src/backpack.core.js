var Backpack = (function()
{
    return {
        run: function()
        {
            ;;;console.log('Backpack.run');

            Backpack.running = true;
            Backpack.event.fireEvent('running');
        }
    };
})();
