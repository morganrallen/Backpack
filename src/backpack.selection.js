(function(Backpack)
{
    function selection_handleSelection()
    {
        Backpack.fireEvent('selection', jetpack.selection);
    };

    function selection_handleSelectionSetup()
    {
        jetpack.future.import("selection");
        jetpack.selection.onSelection(selection_handleSelection);
    }

    Backpack.event.setup('selection', selection_handleSelectionSetup);
})(Backpack);
