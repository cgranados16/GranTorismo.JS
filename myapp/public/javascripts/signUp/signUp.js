function login(form){
  $.ajax({
            type: "POST",
            url: "http://localhost:51336/api/Login/Authenticate",
            data: $(form).serialize(),
            success: function (res) {
                console.log(res.Success);
                if (res.Success){
                    Cookies.set('user',  {IdCard : res.IdCard, Role : res.Role});
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

$(document).on("change","input[type=radio]",function(){
    if ($('[name="type"]:checked').val() == 'Owner'){
        $('#hide-account').hide();
    }else{
        $('#hide-account').show();
    }
});

function signUp(){
  var IdCard = $("#idCard-login").val();
  var type = $('[name="type"]:checked').val();
  $.ajax({
        type: "POST",
        url: "http://localhost:51336/api/Register/User/"+type,
        data:  $("#registerSubmit").serialize(),
        success: function (res) {
            if (res.Response == 'Success'){
                Cookies.set('user',  {IdCard : res.IdCard, Role : type });
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

