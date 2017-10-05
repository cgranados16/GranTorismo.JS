
$(function () {
    $('#servicesTable').DataTable({
        "paging": true,
        "pageLength": 10,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });
});


function setServiceStatus(idService, status){
if (confirm('Realmente desea cambiar el estado del Servicio?')) {
$.ajax({
             type: "POST",
             url: "http://localhost:51336/api/Servicios/Edit/Status",
             data: {IdService: idService, Status: !status},
             success: function (res) {
                 if (res){                    
                    window.location.reload()
                 }else{
                    alert("Error")
                 }
             },
             error: function (xhr) {
                 alert("Oops");
             }
   });
}


}