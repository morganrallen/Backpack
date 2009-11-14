(function(Backpack)
{
    function handleSelection()
    {
        Backpack.fireEvent('selection', jetpack.selection);
    };

    Backpack.event.setup('selection', function()
    {
        jetpack.future.import("selection");
        jetpack.selection.onSelection(handleSelection);
    });
})(Backpack);
