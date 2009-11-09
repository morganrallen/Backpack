(function(Backpack)
{
    Backpack.mixins =
    {
        fireEvent: function(type, data)
        {
            ;;;console.log('Backpack.fireEvent', type);
            jQuery.event.trigger(type, data, Backpack);
        },
        on: Backpack.util.curry(jQuery.event.add, Backpack)
    };
})(Backpack);
