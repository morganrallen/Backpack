What is Backpack?
=================
Backpack is an event based framework and build environment.

The Framework
=============
The base of the framework is a modified jQuery event system. Setup methods allow modules to initialize only when another component has subscribed to its event.
So, if there are nothing listening for the 'slider-ready' event, jetpack.future.import('slideBar') is never run.

The Build Environment
=====================
Currently it is an Apache ANT based build script. Most of the script simply consists of concatenating all the scripts together. The really nice features come in for inline inclusion of (so far) images, XML, (planned[1]) and CSS.
The layout of the project source dictates what is included.

    /backpack/project/js
     project.core.js
     /backpack/project/xml
      sliderBar
      statusBar
     /backpack/project/images
      icon

This layout would build /backpack/project/project.js
and would include the contents of .../js/project.xml.js and .../js/project.images.js

Image Encoding
==============
All PNGs[2] in the project/images are base64[3] encoded. The build script then includes them under the project namespace.

    Backpack.project.images =
    {
         "icon": "data:image/png;base64,iVBORw0......"
    };

All images in the project are simply referenced here.

    $('#icon').attr('src', Backpack.project.images.icon);

XML Inclusion
=============
This works similarly to the Image Encoding except that there is no base64 encoding. XML is including directly using e4x. Same namespacing applies.
    Backpack.project.xml =
    {
         "sliderBar": <sliderBar>
          <div id="icon"></div>
          </sliderBar>
    };
This is the newest addition and still needs some testing. I know there will need to be consideration for inline CSS and scripts. CDATA blocks will be required for anything inline or the e4x parser will fail.

XML Helpers
===========
With e4x data being included there are helper modules that will automate population of various Jetpack components. So far, if you include sliderBar.xml or statusBar.xml, the sliderBar or statusBar HTML bodies will automagically get the contents appended.

In the end, this is basically something I am just hacking on. But would like to know peoples thoughts on in. Good idea? Was of time? Overkill?

+ [1] Including CSS is trivial, I just cannot decide how/where to put it.
+ [2] probably should just be any image, data URI can be set arbitrarily
+ [3] requires base64 to be install and available in $PATH
