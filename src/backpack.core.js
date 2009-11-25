var Backpack = (function()
{
    return {
        run: function()
        {
            ;;;console.log('Backpack.run');
            Backpack.event.fireEvent('running');
        }
    };
})();
