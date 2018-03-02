(function($){

    /**
     * Build a simple Google Map with a single location/marker
     */
    function initMap(){

        // Map Setup
        // ==================== //

        // Location
        var myLat = 50.8321504,
            myLng = -0.4157404,
            location = new google.maps.LatLng(myLat, myLng);

        // Marker Image/Icon
        var iconSVG = 'assets/img/map-marker.svg',
            iconPNG = 'assets/img/map-marker.png';

        // Check for SVG support with Modernizr
        // Serve png fallback if necessary
        if (Modernizr.svg) {
            icon = iconSVG
        } else {
            icon = iconPNG
        }

        // Appearance
        var zoom = 14,
            styles = '';

        // Map Options
        // ==================== //

        // Check for touch support and disable dragging
        if(Modernizr.touch) {
            isDraggable = false
        } else {
            isDraggable = true
        }

        var mapOptions = {
            center: location,
            zoom: zoom,
            draggable: isDraggable,
            // Controls
            mapTypeControl: false,
            panControl: false,
            scrollwheel: false,
            streetViewControl: false,
            zoomControl: true,
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL
            },
            // Styles
            styles: styles
        }

        // Create new map (pass correct element ID)
        var map = new google.maps.Map(document.getElementById('location'), mapOptions);

        // Create marker
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            // icon: new google.maps.MarkerImage(icon, null, null, null, new google.maps.Size(65,65))
        });
    }

    // Initialise map
    // Check if map element exists on page first
    // to avoid console error
    if($('#location').length >= 1) {
        google.maps.event.addDomListener(window, 'load', initMap);
    }

})(jQuery);