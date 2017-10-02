function Create(){
  var IdCard = $("#idCard-login").val();
  $.ajax({
        type: "POST",
        url: "http://localhost:51336/api/Register/User/Admin",
        data:  $("#CreateSubmit").serialize(),
        success: function (res) {
            if (res.Response == 'Success'){
                window.location.replace('/admin/Administradores');
            }else{
                window.location.replace('/admin/Administradores/badLogin');
            }

        },
        error: function (xhr) {
            console.log(xhr);
            alert("Oops");
        }
  });
}

function deleteAdministrador(id){
    console.log("http://localhost:51336/api/Administradores/Delete/"+id);
  $.ajax({
        type: "POST",
        url: "http://localhost:51336/api/Administradores/Delete/"+id,
        success: function (res) {
                window.location.replace('/admin/Administradores');
        },
        error: function (xhr) {
            window.location.replace('/admin/Administradores/badLogin');
        }
  });
}

