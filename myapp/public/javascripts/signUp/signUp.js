function login(){
  $.ajax({
            type: "POST",
            url: "http://localhost:51336/api/Login/Authenticate",
            data: $("#loginSubmit").serialize(),
            success: function (res) {
                console.log(res.Success);
                if (res.Success){
                    //log
                }else{
                    $('#alert-place').load('/signUp/badLogin');
                }

                //Hacer la galleta cremosa para logear
            },
            error: function (xhr) {
                alert("Oops");
            }
  });
}

function signUp(){
      $.ajax({
                type: "POST",
                url: "http://localhost:51336/api/Register/User/Client",
                data: $("#registerSubmit").serialize(),
                success: function (res) {
                    console.log(res);
                    alert(res.Response);
                },
                error: function (xhr) {
                    console.log(xhr);
                    alert("Oops");
                }
      });
}

