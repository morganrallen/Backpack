(function(Backpack)
{
    var $ready = false,
        $sliderBody;

    function slideBar_handleSliderClick(slider)
    {
        ;;;console.log('Backpack.sliderBody::slideBar_handleSliderClick',slider);
        if(!$ready) {
            ;;;console.error("Slider clicked before ready, did something go wrong?");
            return;
        }
        
        Backpack.fireEvent('slider-click', slider);
    }

    function slideBar_handleSliderReady(slider)
    {
        ;;;console.log('Backpack.sliderBody::slideBar_handleSliderReady');
        $sliderBody = slider;
        Backpack.fireEvent('slider-ready', slider);
        $ready = true;
    }
    
    function sliderBar_handleSliderReadySetup()
    {
        ;;;console.log('Backpack.sliderBar #Backpack.event.setup("slider-ready")');
        jetpack.future.import('slideBar');
        jetpack.slideBar.append({
            onClick: slideBar_handleSliderClick,
            onReady: slideBar_handleSliderReady,
            width: 250
        });
    };

    Backpack.event.setup('slider-ready', sliderBar_handleSliderReadySetup);
})(Backpack);
