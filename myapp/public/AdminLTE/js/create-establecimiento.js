var finalFiles = [];

$(function () {

    var selectType = "#local_IdDistrict";
    $(selectType).select2({
        placeholder: 'Select a District',
        width: '100%'
    });

    $(selectType).select2("val", null);

    $('#searchMap').geocomplete({
        map: "#Mapau",
        mapOptions: {
            scrollwheel: true
        },
        markerOptions: {
            draggable: true
        },
        location: "CR SJ"
    });


    $("#searchMap").bind("geocode:result", function (event, result) {
        $("#Latitude").val(result.geometry.location.lat());
        $("#Longitude").val(result.geometry.location.lng());
    });
    $("#searchMap").bind("geocode:dragged", function (event, latLng) {
        $("#Latitude").val(latLng.lat());
        $("#Longitude").val(latLng.lng());
    });

    
    var inputLocalFont = document.getElementById("uploadFiles");
    inputLocalFont.addEventListener("change", previewImages, false);

    function previewImages() {
        var fileList = this.files;

        var anyWindow = window.URL || window.webkitURL;

        for (var i = 0; i < fileList.length; i++) {
            var objectUrl = anyWindow.createObjectURL(fileList[i]);
            finalFiles.push(fileList[i].name);
            var index = finalFiles.indexOf(fileList[i].name);

            var content = "<div class='col-md-3' style='overflow: hidden; height: 250px;margin-bottom:10px;' id='image_" + index +"'>";
            content += "<a class='fa fa-remove btn btn-danger' style='float:right;position: absolute;' OnClick='deleteImage(this)' index-element='" + index+"'></a>";
            content += "<img class='img-responsive img-rounded' src='" + objectUrl + "' />";
            content += "</div>";

            $('#contentImages').append(content);
            window.URL.revokeObjectURL(fileList[i]);
        }

        $(inputLocalFont).hide();
        inputLocalFont = $('<input type="file" name="fotos" accept=".jpg,.jpeg,.png" multiple />').appendTo("#filecontainer").get(0);
        inputLocalFont.addEventListener("change", previewImages, false);
        $("#uploadFilesNames").val(finalFiles);
    }
});


function deleteImage(object) {
    var index = $(object).attr("index-element");
    $("#image_" + index + "").remove();
    delete finalFiles[index];
    $("#uploadFilesNames").val(finalFiles);
}
/*
$("form#createEstablecimiento").submit(function(){
    var formData = new FormData(this);
         $.ajax({
                type: "POST",
                 url: "http://localhost:51336/api/Upload",
                 data: formData,
                 processData: false,
                 contentType:false,
                 success: function (res) {
                     console.log("yea");
                     window.location.replace('/myStore');
                }
       });
});
*/
$("form#createEstablecimiento").submit(function(){
    var formData = $(this).serialize();
   $.ajax({
             type: "POST",
             url: "http://localhost:51336/api/Establecimiento/Create",
             data: formData,
             success: function (res) {
                 console.log(res.Success);
                 if (res){
                     window.location.replace('/myStore');
                 }else{
                    alert("Error");
                 }
             },
             error: function (xhr) {
                 alert("Oops");
             }
   });
});
