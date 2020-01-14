// Scripts UOC

jQuery(document).ready(function ($) {
    

    var layer0 = new ol.layer.Tile({
        source: new ol.source.OSM({
            crossOrigin: null,
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
    });

    //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(map);  

    //L.marker([51.5, -0.09]).addTo(map)
     //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      //  .openPopup()
    var address = "Rambla del Poblenou, 16 08018 Barcelona";
    //map.setView([40.91, -96.63], 4);
    /*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);*/
    var lat = 41.390205;
    var lng = 2.154007;
    L.esri.Geocoding.geocode().text(address).run(function (err, results, response) {
        if (err) {
          console.log(err);
          return;
        }//AJAX
        lat= results.results[0].latlng.lat;
        lng= results.results[0].latlng.lng;
        console.log(lat);
        console.log(lng);
    });
    var Markers = [
        {lat: lat, lng: lng},
    ];
    console.log(lat);
    var mapa = new ol.Map({
	
        layers: [ layer0 ],
        target: 'map',
        view: new ol.View({
          center: ol.proj.fromLonLat([lng, lat]),
          zoom: 10
        })
    });
    var features = [];


    for (var i = 0; i < Markers.length; i++) {
        var item = Markers[i];
        var longitude = item.lng;
        var latitude = item.lat;

        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'))
        });

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 1],
                src: "http://cdn.mapmarker.io/api/v1/pin?text=P&size=50&hoffset=1"
            }))
        });

        iconFeature.setStyle(iconStyle);
        features.push(iconFeature);

    }

    var vectorSource = new ol.source.Vector({
        features: features
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });
    mapa.addLayer(vectorLayer);


      /*var address = '"Rambla del Poblenou, 156 08018 Barcelona","08018 Barcelona","Barcelona",';
                                                                
      var geocoder = L.esri.Geocoding.geocodeService();
      
      var map = L.map('mapa');
      
      var results = L.layerGroup().addTo(map);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      geocoder.geocode().text(address).run(function (error, response) {		                    						  
          map.fitBounds(response.results[0].bounds);
          results.addLayer(L.marker(response.results[0].latlng));
      });	*/ 
    //console.log(res);
    //console.log(L.latlng);
    
   
                                                                
    
                    
    /*geocoder.geocode().text(address).run(function (error, response) {		                    						  
        map.fitBounds(response.results[0].bounds);
        results.addLayer(L.marker(response.results[0].latlng));
    });*/

    function calculoWidth() {
        $('.js-width').each(function () {
            var width = $(this).width();
            $(this).find(".js-width-final").width(width)
        });
    }
    
    function removeSticky(){
        if ($(window).width() < 768) {
            $(".js-removeSticky").removeClass("sticky");
        }
    }
    
    //collapse
    function collapse(){

        $('[class*=js-collapseClick]').click(function(e) {
            console.log('jump prevented');
            e.preventDefault();   //prevent the click from jumping esp on hashes
            e.stopPropagation();  //prevent from any parent click handlers that didn't prevent the jump
        
        
            return false;         //the natural way to prevent the jump
        });
        
        $('.js-collapseClick').on('click', function () {
            console.log('clicking collapseClick ... ',$('.js-collapseClick'));
            console.log('has class .subCollapse ? ... ',$(this).closest('.js-collapse').hasClass('subCollapse'));
            if ($(this).closest('.js-collapse').hasClass('subCollapse')){
                
                if ($(this).closest('.js-collapse').next().hasClass('show')) {
                    console.log('already showing sub tab ... ',$(this).closest('.js-collapse').siblings().hasClass('show'));
                    console.log('siblings ... ',$(this).closest('.js-collapse').siblings());
                    $(this).closest('.js-collapse').next().removeClass('show');
                    $(this).attr('aria-expanded', 'false');


                } else {
                    console.log('hidden sub tab ... ',$(this).closest('.js-collapse').next().hasClass('show'));
                    /*$('.subCollapse .js-collapseClick').attr('aria-expanded', 'false');
                    $('.subCollapse').siblings().removeClass('show');*/
                    $(this).closest('.subCollapse').next().addClass('show');
                    $(this).attr('aria-expanded', 'true');
                }


            }else{
                
                if ($(this).closest('.js-collapse').siblings().hasClass('show')) {
                    console.log('already showing tab ... ',$(this).closest('.js-collapse').siblings().hasClass('show'));
                    $(this).closest('.js-collapse').siblings().removeClass('show');
                    $(this).attr('aria-expanded', 'false');


                } else {
                    console.log('hidden tab ... ',$(this).closest('.js-collapse').siblings().hasClass('show'));
                    console.log('siblings ... ',$(this).closest('.js-collapse').siblings());
                    $(this).closest('.js-collapse-group').find('.js-collapseClick').attr('aria-expanded', 'false');
                    $(this).closest('.js-collapse-group').find('.js-collapse').siblings().removeClass('show');
                    $(this).closest('.js-collapse').siblings().addClass('show');
                    $(this).attr('aria-expanded', 'true');
                }
            }

           
            
            
        });
      

    }

    if($('.js-collapseAll').length > 0) {
        console.log('clicking collapseAll ... ',$('.js-collapseAll'));
        $('.js-collapseAll').on('click', function(e) {
            e.preventDefault();
            // console.log($(this).parent().find('a').html())
            $(this).parent().siblings().find('a').attr('aria-expanded', 'false');

            if($(this).siblings().hasClass('show')) {
                $(this).parent().siblings().children().removeClass('show');
                $(this).parent().siblings().children().find('input').prop("checked", false);
            }


        })
    }


    if($('.tag-list').length > 0) {
        $('.tag-list').on('click', 'li', function() {
            $(this).toggleClass('active');
        })
    }

    if($('.tag-icons').length > 0) {
        $('.tag-icons').on('click', 'li', function() {
            $(this).toggleClass('select-icon');
        })
    }

    calculoWidth();
    removeSticky();
    collapse();
    
    $(window).on('resize', function () {
        calculoWidth();
        removeSticky();
        collapse();
    });

    //Smooth anchor click scroll
    $('.hero-section__scroll a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        
    });
    

    $('.filters-main__box').on('click', '.tab', function() {
        var $this = $(this).closest('.filters-main__box');
        //console.log('this...',$(this)[0].getAttribute("href"));
        if(!$this.hasClass('box-green-selected')) {
            $this.addClass('box-green-selected');
            $this.siblings().removeClass('box-green-selected');
            $('.filters-main__content').removeClass('hidde-content');
            $($(this)[0].getAttribute("href")).show().siblings("div").hide();
        } else {
            $this.removeClass('box-green-selected');
            $this.siblings().removeClass('box-green-selected');
            $('.filters-main__content').addClass('hidde-content');
        }
        var ref = $(this)[0];
        console.log('ref-->',ref);
        var x = ref.getAttribute("href").split("-");
        console.log('x--->',x);
        sessionStorage.setItem("target",x[2]);

    });

    if($('.sticky-sidebar').length > 0) {

        if($(window).width() > 992) {
            var sticky = new Sticky('.toStick');
        }
    }
    //     setTimeout(function() {
    //         $('a[href=' + '"' + window.location.hash + '"' + ']').click();
    //         console.log($('a[href=' + '"' + window.location.hash + '"' + ']'))
    //     }, 1000);

    if($('.list-vist').length > 0) {
        $('.js-List a').on('click', function(e) {
            e.preventDefault();
            $('.js-Column').removeClass('active');
            $('.js-List').addClass('active');
            $('.js-changeVist').find('.row:first-child .col-xs-12').removeClass('col-md-4');
            $('.js-changeVist').addClass('change-to-list');
        })

        $('.js-Column a').on('click', function(e) {
            e.preventDefault();
            $('.js-Column').addClass('active');
            $('.js-List').removeClass('active');
            $('.js-changeVist').find('.row:first-child .col-xs-12').addClass('col-md-4');
            $('.js-changeVist').removeClass('change-to-list');
        })
    }

    // $(".js-deleteFilters").on('click', function() {

    //     $('.collapse-filter').find('input').prop('checked', false)
    // });

    $('.js-displayMobile').on('click', function () {
        $('.collapse').toggleClass('show');
        $('.general-filter').toggleClass('show');
        $(this).parent().parent().toggleClass('show-p') 
    });

    var url = document.location.toString();
    if (url.match('#')) {
        $('.ficha-detail a[href="#' + url.split('#')[1] + '"]').addClass('is-active');
        $('.ficha-detail a[href="#' + url.split('#')[1] + '"]').parent().siblings().children().removeClass('is-active');

        $('#' + url.split('#')[1]).addClass('is-active');
        $('#' + url.split('#')[1]).siblings().removeClass('is-active');
    } 

    // Change hash for page-reload
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
        window.location.hash = e.target.hash;
    })

    if($('.filters-mobile').length > 0) {
        $('.filters-mobile').on('click', function(e) {
            e.preventDefault();
            console.log($(this).parent().parent().find('input'))
            $(this).parent().parent().parent().find('input').prop("checked", false);
        })
    }
});
