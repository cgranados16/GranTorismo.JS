var finalFiles = [];

$(function () {
    var inputLocalFont = document.getElementById("uploadFiles");
    inputLocalFont.addEventListener("change", previewImages, false);

    function previewImages() {
        var fileList = this.files;

        var anyWindow = window.URL || window.webkitURL;

        for (var i = 0; i < fileList.length; i++) {
            var objectUrl = anyWindow.createObjectURL(fileList[i]);
            finalFiles.push(fileList[i].name);
            var index = finalFiles.indexOf(fileList[i].name);

            var content = "<div class='col-md-4' style='overflow: hidden; height: 250px;margin-bottom:10px;' id='image_" + index +"'>";
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


$("form#createService").submit(function(){
    var formData = $(this).serialize();
    var formPost = new FormData(this);
   $.ajax({
             type: "POST",
             url: "http://localhost:51336/api/Servicio/Create",
             data: formData,
             success: function (res) {
                 if (res > 0){
                     sendImages(formPost, res);
                 }else{
                    alert("Error al subir los datos");
                 }
             },
             error: function (xhr) {
                 alert("Oops");
             }
   });
});

function sendImages(form, serviceId){
    form.append("idService", serviceId);
     $.ajax({
            type: "POST",
             url: "http://localhost:51336/api/Upload",
             data: form,
             processData: false,
             contentType: false,
             success: function (res) {
                 alert("yea");
                 window.location.replace('/myStore');
            }
   });
}