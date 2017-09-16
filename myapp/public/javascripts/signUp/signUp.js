function login(){
  $.ajax({
            type: "POST",
            url: "http://localhost:61417/api/Login/Authenticate",
            data: $("#loginSubmit").serialize(),
            success: function (res) {
                console.log(res.Success);
                if (res.Success){
                    Cookies.set('userId', res.IdCard);
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
        url: "http://localhost:61417/api/Register/User/Client",
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

