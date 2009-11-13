(function(Backpack)
{
    var $sliderBody,
        $statusBody;

    // not so sure about this....
    Backpack.scrap =
    {
        images: {}
    };

    Backpack.on('slider-ready', function(event, slider)
    {
        $sliderBody = $(slider.contentDocument.documentElement);

        $sliderBody.append('Blalalal');
    });

    Backpack.on('slider-click', function(event, slider)
    {
        // won't work without patched Jetpack ( https://bugzilla.mozilla.org/show_bug.cgi?id=528308 )
//        slider.icon = Backpack.scrap.images.icon;
    });

    Backpack.on('status-ready', function(event, status)
    {
        ;;;console.log('Backpack.scrap.on("status-ready")');
        $statusBody = $(status.documentElement);
        $statusBody.append('<img src="' + Backpack.scrap.images.icon + '" />');
    });
})(Backpack);
