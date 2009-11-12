var Backpack = (function() // XXX change namespace
{
    var $inits = [],
        $modules = {},
        $runs = [];

    return {
        addModule: function(m)
        {
            if(!m.NAME) {
                throw new Error("modules must define NAME");
            }

            if($modules[m.NAME]) {
                throw new Error("module already registered");
            }

            $modules[m.NAME] = m;

            ;;;console.log('adding ' + m.NAME);

            if(m.register) {
                m.register();
            }

            if(m.init) {
                $inits.push(m.NAME);
            }

            if(m.run) {
                $runs.push(m.NAME);
            }
        },

        init: function()
        {
            ;;;console.log('Backpack.init');
            var i;
            // do some core setup
            for(i = 0; i < $inits.length; i++) {
                $modules[$inits[i]].init();
            }
            this.ready = true;
            this.fireEvent('ready');
        },

        run: function()
        {
            ;;;console.log('Backpack.run');
            for(i = 0; i < $runs.length; i++) {
                $modules[$runs[i]].run();
            }

        }
    };
})();
(function(Backpack)
{
    Backpack.util =
    {
        curry: function(b, f)
        {
            return function()
            {
                return b.apply(this, [f].concat(Array.prototype.splice.call(arguments,0)));
            }
        }
    };
})(Backpack);
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
(function(Backpack)
{
    var ready = false,
        statusBody;

    function handleClick(status)
    {
        ;;;console.log('Backpack.statusBody::handleClick');
        if(!ready) {
            ;;;console.error("Slider clicked before ready, did something go wrong?");
            return;
        }
        
        Backpack.fireEvent('status-click', status);
    }

    function handleReady(status)
    {
        ;;;console.log('Backpack.statusBody::handleReady');
        statusBody = status;
        Backpack.fireEvent('status-ready', status);
        ready = true;
    }

    // setup the modules init methods (register, init, run) and external methods
    Backpack.statusBar =
    {
        NAME: 'statusBar',

        // runs during Backpack.init()
        init: function()
        {
            ;;;console.log('Backpack.statusBar.init');
            jetpack.statusBar.append({
                onClick: handleClick,
                onReady: handleReady,
                width: 40
            });
        },
        
        // runs during addModule
        register: function()
        {
        }
    };

    // register the module, this runs register
    Backpack.addModule(Backpack.statusBar);
})(Backpack);
(function(Backpack)
{
    var $eventQueue = [];
    Backpack.mixins =
    {
        fireEvent: function(type, data)
        {
            if(!Backpack.ready) {
                return $eventQueue.push(arguments);
            }
            
            if($eventQueue.length > 0) {
                var e;
                while(e = $eventQueue.shift()) {
                    ;;;console.log('Backpack.fireEvent', type);
                    jQuery.event.call(arguments);
                }
            }

            ;;;console.log('Backpack.fireEvent' + (Backpack.ready ? '' : '(!ready)'), type);
            jQuery.event.trigger(type, data, Backpack);
        },
        on: Backpack.util.curry(jQuery.event.add, Backpack)
    };
})(Backpack);
if(Backpack.mixins) {
    for(var i in Backpack.mixins) {
        Backpack[i] = Backpack.mixins[i];
    }
}

// Not sure how i am going to sort out this init/run crap... XXX FIXME XXX
//Backpack.init();
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
                $statusBody.append('<img src="' + Backpack.scrap.images.icon + '" />');
            });
        },

        run: function()
        {
        }
    };

    Backpack.addModule(Backpack.scrap);
})(Backpack);
Backpack.scrap.images = {'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARdSURBVFiFxZfPa1xVFMc/586bN/Nm0nSaNnGS2CZtNm0tRUpbKbQbXXUjgiCCOwtuRP8AF4obwXVxqav+AVoUBEFEqAu1QcQWURrS2qbBRJvGmcyv9+5xcd+bmWTeTF5E6NnMzL3nnu/3fs85994RVeVJmnmi6IDX/+PilU/2dfzih2p5XVUL/yeQiITGyGfttry9+PGrK6kEQj947/jc5JXzp4/4ft5NlXyPu2s1OqHdE2DeM8xNjbHVCgHohJG3ePvBS7furLSA11IJqNU3z58+4t/7q0kYWf54sM7lCwu0203urj7eE4G56n7aYcBX3y9xePYQXs5w5uRs7uffVl4ZSsCqFvP5HGHkdrtZa7D88DELMxXu3bvPZm0rE/j4WIlj03PcWXnMZq0BQBhZ8l4OVd2G6e1c3N8U1ckKNxaXODz1LJfOnuCb737g4eraSPDp6iSXzp6gHcKNxSWenp3siz3YcQMErO05HZzYRzsMufb5TV58/hSXX7jI6uqf/HLrNn8/2mBjYwOASqXCxIEKp545SbU6xcp6netf/8TM7CEOTuzrxU7p+EECO5ympw4QFHy++PZX8p5w7tQRzpy7QOB7FHzXxa22pdEOebj+D19eX6QTKgvHZqjsL++InUEBUIxsH5molJmoHKW+1eL20ho/3rpPo9mh2eoAUCzkCYp5SqUCC0dnKJfSO1hSxgYICJDbySCeGR8LGB8LhkZMW7VtPsVhUAGBnNnlgByBNJrE4GyKAjJEgUwII10yKSAySEBVkVGk0kwV2YGYqQbm7n/Ky6vvpLpnvTfTqSo3pz8AqqMJAPjFUhypP9QeFeinG7df5i7wC6UYXEAEVZcazaiBIC5tkoDr9iN2JAEBPyh1wUFQJCaQzRyu4lZol8SuRSgCH/2+wLuP3seIYMTtXCSWLy1CmqnTStURsepOwepECZH6cAIAkXVggiJiMCYmAt2qHpYKibOs6irAKlgLohYh611gnVRiDEbcqSiAMTEBdVBDTRwBa+nWgBqDWLvtohtKQLFJnK78joR063I3UwTJKZF1Z4HEBZjpMopsr1iS3Cfg/eOpwP3xVeI09tZEURYCkbpA0suloqA91N1e8m5drxCTsUwKdFptbBgmSQcrWAEjEhfhbs0oceW7jUSREqliraXdHPT2AMRFlnNvXKNR38Ra9yaIjJAzppeKjG2ofW0YxcVnFbQlEIwjIsa59R6IBvABtjbX45xL3IIOvVuEmQgkaXOyW6uoKi1RysE4QAFoA1E/gSIQbm2seZIAmuQQyip/YhKr4NKgtve9PHUsTLCAyEvkB3IS1a4+dfy5t1TxhGTnccj/QIBkRayICCFh7SqQcyFFxF0akgfGYma5IAgEoFgsxp+Im9qLNWk2HX6z2VSARqOhQAQ0gZqqdhICOVwNFHGFKeVyOf1hmM0GpKrX6/HNRBgTaKtqlBDopoH0f8wyPz+fEdvZ8vJyKhHA4lRQVdV/Af1r6Cdilth8AAAAAElFTkSuQmCC','startcap-secure': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAaCAYAAADBuc72AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAEqElEQVR42uxXW08bRxT+ZncN2/Wau02FbW5FlIaUVAoJ9KKSVFWkViqqoOIiKiH+Ql+Q8tyXCIl/kcipqvQH8NAnogSJh+SNF4QEyAWEgOCCPbue04ed9c76FhS1SJE6sr3jmTNnvjnnO+fMMiLC+9DY+wLUYIxVnZienv7Idd1fOef3hBBNhULBum5wiUQCpmnCsqxKi87MzLRxzp9cXFw8GB8fZxMTE0in0xgYGICmaf85OMd18fLFC6yvr8P6wEI8EUdTUxNC5pydnR05Pz9/nkgkosvLyxgaGrpWC+ZyOTx9+htsm+H+vc+QSFiVHJ2fn799dnb2cnJyUl9cXERDYwMYAQTI0zCQOkAAGAOI5F856FOJPEFPJPAak3p8CxEYQEAud44njx+jr/9DfPXlEGxbDwcTACwsLNi5XO6vubm56NTUVElFWJ1q/AB+eSMFay05UuYYgGLRxbNnf6ClJYqJr4dg25VrDCLC/Pz873dG70R/mJyE67pSR3gTIpLWkFMok5Fdb6lEWzld1vd6r16/RlEUMT72CWy7RtQvLS2lOecPFn5egOs4gARCqGIM393wBaDIqwtDEyXXecuZQgUGx+HY2trC3dERtLbqAIrVgWqa9nB09DaL2TE4jls6KfmMYr47FTtQ4LbAkQEffVD+QRn5/C1RF4wYCIT9/X3EbBvJVCs0rVA7j7qu+9Pw8E1wh1dWA3XDqnWBgfmHqilTv2WzWcTjcVhW/dRnuK7b0tXVBYdzEFN29F3GfChMcSMF4cWCKCLGSoFH5GuiIGrB5KCUJSCfz6O7uxuG7tYHSkS6aTaCO04lIUuRo0aEBFkWHcS8A8jTenLEQpSBekC5jnMO27bBWKE+UF3X4TgONE2vIVIeoxXbXSVr1QdhGADeAtQ0zeLJyanR3tYGqmRnmLHlCf9db0LKcl3XwTkHYADgtYFGo9FcNpttsW1bRjkFSbuiMvkZHb6vQ5WJweMe8zlbozIFiRiIRCI4PT0FdcfBWB2gyWTy+c7Ozve9vb0q2TwHK30PhhogrGrNIVKDrJILVMYT02zE4eEhiiIJQ6/j+rGxsUeZTOa74+NjFos1lVR5mzFpVVKSEYJfRl4+ZBQuEkqSl6lDOZw0gNQTMSI4PDrCyQlHvCMCwKl5cW5YWVnZLBQKN8fG7gbV07+EqHsrlUkFFsiHBOUnoJKXBRCqTADhMn+JqBXFN/dHoGkntW/42Wz2i9XV1T97enoa+vv63yly/40r3vDwIG7c6ADD31UDEESkbWxs/JLJZB6lUimtr78fmqZd8b5UOVlTVjVk+TAR8vk8bt0axMeDbWAsH5LRpRsomUy+am1tdTY3Nz/f29sz7KiNSKQBRARBwnsK70tCyCeBSH6FgCCCIAKISvNCCAghQMLTQQhkSUh54e2haRqy2SO8eXOJRKIdhiHCFlWucvbBwcGPmUzm4e7u7lBLcwvriHfANE3Ytl27MpWsGLrrvb0y1TB0sShAJNDZ2Yl0Oo3m5uaqb6EGgE+3t7e/XVtbmz04OBjknJsXFxeR6+ZtKpWCZVmIxWJ1X5cbAQwASAOIAmj//73+Cu2fAQA0VWJBtRdqjwAAAABJRU5ErkJggg=='};// PRoject
Backpack.init();
