(function(Backpack)
{
    var $sliderBody,
        $statusBody;

    // not so sure about this....
    Backpack.scrap =
    {
        images: {}
    };

    Backpack.event.on('slider-ready', function(event, slider)
    {
        ;;;console.log('Backpack.scrap.on("slider-ready")');
        $sliderBody = $(slider.contentDocument.documentElement);

        $sliderBody.append('Blalalal');
    });

    Backpack.event.on('slider-click', function(event, slider)
    {
        // won't work without patched Jetpack ( https://bugzilla.mozilla.org/show_bug.cgi?id=528308 )
//        slider.icon = Backpack.scrap.images.icon;
    });

    Backpack.event.on('status-ready', function(event, status)
    {
        ;;;console.log('Backpack.scrap.on("status-ready")');
        $statusBody = $(status.documentElement);
        $statusBody.append('<img src="' + Backpack.scrap.images.icon + '" />');
    });
})(Backpack);
