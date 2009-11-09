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

            Backpack.on('status-ready', function(event, status)
            {
                console.log(status);
                $statusBody = $(status.documentElement);
                $statusBody.append('Blalalal');
            });
        },

        run: function()
        {
        }
    };

    Backpack.addModule(Backpack.scrap);
})(Backpack);
