(function(Backpack)
{
    var $ready = false,
        $sliderBody;

    function handleClick(slider)
    {
        ;;;console.log('Backpack.sliderBody::handleClick');
        if(!$ready) {
            ;;;console.error("Slider clicked before ready, did something go wrong?");
            return;
        }
        
        Backpack.fireEvent('slider-click', slider);
    }

    function handleReady(slider)
    {
        ;;;console.log('Backpack.sliderBody::handleReady');
        $sliderBody = slider;
        Backpack.fireEvent('slider-ready', slider);
        $ready = true;
    }

    Backpack.event.setup('slider-ready', function()
    {
        jetpack.future.import('slideBar');
        jetpack.slideBar.append({
            onClick: handleClick,
            onReady: handleReady,
            width: 250
        });
    });
})(Backpack);
