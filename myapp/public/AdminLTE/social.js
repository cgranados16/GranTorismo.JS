function SearchUser() {
   
    $.ajax({
        type: "POST",
        url: "http://localhost:51336/api/User/Find",
        data: { 'username': $('#socialSearch').val() },
        dataType: "json",
        success: function (res) {
            if (res!=''){
            	window.location.replace('/social/profile?id=' + res);	
            }else{
            	window.location.replace('/social/profile?id=-1');
            }
        }
    });
}