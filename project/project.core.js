(function(Backpack)
{
    var $sliderBody;

    Backpack.scrap =
    {
        NAME: 'scrap',
        init: function()
        {
            ;;;console.log('Backpack.scrap.init');
            Backpack.on('slider-ready', function(event, slider)
            {
                $sliderBody = $(slider.contentDocument.documentElement);

                $sliderBody.append('Blalalal');
            });
        },

        run: function()
        {
        }
    };

    Backpack.addModule(Backpack.scrap);
})(Backpack);
