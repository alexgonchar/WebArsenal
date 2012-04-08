Installation
=================================
All you have to do is to add GiftsLite theme folder into Themes directory.

Administration side changes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
Go to administration side to Configuration -> All Settings and make changes:
 find adminareasettings.gridpagesize change to "400"
 find catalogsettings.usesmallproductboxonhomepage change to "False"
 find mediasettings.productthumbpicturesize change to "150"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

Optional
=====================================================
If you want add slider to your homepage, you need copy and edit one file.
1. Go to your website Views/Home/Index.cshtml copy it and place to Themes/GiftsLite/Views/Home folder (you need create Home folder)
after:

@{
    Layout = "~/Views/Shared/_ColumnsThree.cshtml";
}

add

<script src="/Themes/GiftsLite/Content/nivoslider/JScripts/jquery.nivo.slider.pack.js" type="text/javascript"></script>
<script type="text/javascript">
    jQuery(window).load(function () {
        jQuery('#slider').nivoSlider({
            slices: 18,
            animSpeed: 800, //Slide transition speed
            pauseTime: 5000,
            startSlide: 0 //Set starting Slide (0 index)
        });
    });
</script>

2. Go to administration side http://yourdomain/Admin/Topic/List and edit HomePageText topic
add html code:

<div id="wrapper">
    <link href="/Themes/GiftsLite/Content/nivoslider/themes/orman/orman.less" media="screen" rel="stylesheet/less" type="text/css" />
    <link href="/Themes/GiftsLite/Content/nivoslider/nivo-slider.css" media="screen" rel="stylesheet" type="text/css" />
    <div class="slider-wrapper theme-orman">
        <div class="ribbon"> </div>
        <div class="nivoSlider" id="slider">          
            <img alt="" src="/Themes/GiftsLite/Content/nivoslider/images/toystory_orman.jpg" />
			<img alt="" src="/Themes/GiftsLite/Content/nivoslider/images/up_orman.jpg" title="This is an example of a caption" />
			<img alt="" src="/Themes/GiftsLite/Content/nivoslider/images/walle_orman.jpg" />
			<img alt="" src="/Themes/GiftsLite/Content/nivoslider/images/nemo_orman.jpg" />            
        </div>
    </div>
</div>

Done!


