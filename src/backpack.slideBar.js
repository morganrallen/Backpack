(function(Backpack)
{
    var ready = false,
        sliderBody;

    jetpack.future.import('slideBar');

    function handleClick(slider)
    {
        ;;;console.log('Backpack.sliderBody::handleClick');
        if(!ready) {
            ;;;console.error("Slider clicked before ready, did something go wrong?");
            return;
        }
        
        Backpack.fireEvent('slider-click', slider);
    }

    function handleReady(slider)
    {
        ;;;console.log('Backpack.sliderBody::handleReady');
        sliderBody = slider;
        Backpack.fireEvent('slider-ready', slider);
        ready = true;
    }

    Backpack.on('running', function()
    {
        jetpack.slideBar.append({
            onClick: handleClick,
            onReady: handleReady,
            width: 250
        });
    });
})(Backpack);
