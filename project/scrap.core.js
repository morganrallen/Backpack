(function(Backpack)
{
    var $sliderBody,
        $statusBody;

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

            Backpack.on('slider-click', function(event, slider)
            {
                // won't work without patched Jetpack
//                slider.icon = Backpack.scrap.images.icon;
            });

            Backpack.on('status-ready', function(event, status)
            {
                console.log(status);
                $statusBody = $(status.documentElement);
                $statusBody.append('<img src="' + Backpack.scrap.images.icon + '" />');
            });
        },

        run: function()
        {
        }
    };

    Backpack.addModule(Backpack.scrap);
})(Backpack);
