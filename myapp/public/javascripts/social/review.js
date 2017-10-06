$(function () {
    $(".rating").rating();
});

$("form#reviewForm").submit(function(){
    var formData = $(this).serialize();
   $.ajax({
             type: "POST",
             url: "http://localhost:51336/api/Review/Create",
             data: formData,
             success: function (res) {
                 if (res > 0){
                     alert("Calificacion registrada con exito")
                     window.location.replace('/');
                 }else{
                    alert("Error al enviar la calificacion");
                 }
             },
             error: function (xhr) {
                 alert("Oops");
             }
   });
});