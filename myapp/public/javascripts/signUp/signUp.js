function login(form){
  $.ajax({
            type: "POST",
            url: "http://localhost:51336/api/Login/Authenticate",
            data: $(form).serialize(),
            success: function (res) {
                console.log(res.Success);
                if (res.Success){
                    Cookies.set('user', res.IdCard);
                    window.location.replace('/');
                }else{
                   window.location.replace('/signUp/badLogin');
                }

                //Hacer la galleta cremosa para logear
            },
            error: function (xhr) {
                alert("Oops");
            }
  });
}

function signUp(){
  var IdCard = $("#idCard-login").val();
  $.ajax({
        type: "POST",
        url: "http://localhost:51336/api/Register/User/Client",
        data:  $("#registerSubmit").serialize(),
        success: function (res) {
            if (res.Response == 'Success'){
                Cookies.set('user', IdCard);
                window.location.replace('/');
            }else{
                window.location.replace('/signUp/badLogin');
            }
            
        },
        error: function (xhr) {
            console.log(xhr);
            alert("Oops");
        }
  });
}

