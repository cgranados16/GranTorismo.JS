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

function signOut(){
    Cookies.remove('userId');
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

