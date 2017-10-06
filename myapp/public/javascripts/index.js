$(function () {
    var locations = [];
    var bounds = new google.maps.LatLngBounds();

    $(".info_local").each(function () {
        var input = $(this);
        var contentLocation = [input.val(), input.attr("data-lat"), input.attr("data-lng")];
        locations.push(contentLocation);
    });
    
    var map = new google.maps.Map(document.getElementById('Mapau'), {
        zoom: 1,   
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });
        bounds.extend(marker.position);
        map.fitBounds(bounds);

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent($("#content_" + locations[i][0]).html());
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
});