
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var finalFiles = [];

$(function () {
    var selectCat = "#categoriesService";
        $(selectCat).select2({
            placeholder: 'Select a Type',
            multiple: true,
            width: '100%'
        });
        var selectedValues = $("#selectedValues").val().split(',');
        $(selectCat).select2('val',selectedValues);

    var selectType = "#servicePackage";
    $(selectType).select2({
        placeholder: 'Select a Service',
        width: '100%'
    });

    $(selectType).select2("val", null)

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
        inputLocalFont = $('<input type="file" name="fotos_new" accept=".jpg,.jpeg,.png" multiple />').appendTo("#filecontainer").get(0);
        inputLocalFont.addEventListener("change", previewImages, false);
        $("#uploadFilesNames").val(finalFiles);
    }
});

function addToPackage(){
        var selectedService = $("#servicePackage").val();
        var text = $("#servicePackage option:selected").text();
        var content = $("#content-package ul");
        if (selectedService != null && selectedService > 0){
            $("#servicePackage option:selected").remove();
            $("#servicePackage").select2("val", null);
            var htmlContent = '<li>';
            htmlContent += '<span class="text">'+text+'</span>';
            htmlContent += '<input type="hidden" id="option_'+selectedService+'" value="'+selectedService+'" name="packageServices" attr-name="'+text+'" />';
            htmlContent += '<div class="tools"><i onclick="removePackage(this, '+selectedService+')" class="fa fa-trash-o"></i></div>';
            htmlContent += '</li>';
            content.append(htmlContent);
        }
    }

function removePackage(button, serviceId){
    var li = $(button).parent().parent();
    var serviceName = $("#option_"+serviceId).attr("attr-name");
    var htmlOption = '<option value="'+serviceId+'">'+serviceName+'</option>';
    $("#servicePackage").append(htmlOption);
    li.remove();   
}

function deleteImage(object) {
    var index = $(object).attr("index-element");
    $("#image_" + index + "").remove();
    delete finalFiles[index];
    $("#uploadFilesNames").val(finalFiles);
}

function deleteLoadedImage(object, fotoName) {
    var fotos = $("#fotos_array").val().split(",");
    fotos.remove(fotoName);
    $("#fotos_array").val(fotos);
    $(object).parent().remove();
}

$("form#createService").submit(function(){
    var formData = $(this).serialize();
    var formPost = new FormData(this);
   $.ajax({
             type: "POST",
             url: "http://localhost:51336/api/Servicio/Edit",
             data: formData,
             success: function (res) {
                 if (res){
                     sendImages(formPost, $("#idService").val(), $("#idEstablecimiento").val());
                 }else{
                    alert("Error al subir los datos");
                 }
             },
             error: function (xhr) {
                 alert("Oops");
             }
   });
});

function sendImages(form, serviceId, establecimientoId){
     $.ajax({
            type: "POST",
             url: "http://localhost:51336/api/Upload",
             data: form,
             processData: false,
             contentType: false,
             success: function (res) {
                 window.location.replace('/myStore/'+establecimientoId+'/services/');
            }
   });
}