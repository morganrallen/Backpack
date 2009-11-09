(function(Backpack)
{
    var ready = false,
        sliderBody;

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

    // setup the modules init methods (register, init, run) and external methods
    Backpack.slideBar =
    {
        NAME: 'slideBar',

        // runs during Backpack.init()
        init: function()
        {
            ;;;console.log('Backpack.slideBar.init');
            jetpack.slideBar.append({
                onClick: handleClick,
                onReady: handleReady,
                width: 250
            });
        },
        
        // runs during addModule
        register: function()
        {
            jetpack.future.import('slideBar');
        }
    };

    // register the module, this runs register
    Backpack.addModule(Backpack.slideBar);
})(Backpack);
