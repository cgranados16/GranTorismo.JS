function Like(IdCard, IdService) {
    $.ajax({
     type: "POST",
     url: "http://localhost:51336/api/Like",
     data: { 'IdClient': IdCard, 'IdService' :  IdService},
     success: function (result) {
        $("#likeButton").hide();
        $("#dislikeButton").show();
     },
     error: function (xhr) {
         alert('Something went wrong.');
     }

 });
}

function Dislike(IdCard, IdService) {
    $.ajax({
     type: "POST",
     url: "http://localhost:51336/api/Dislike",
     data: { 'IdClient': IdCard, 'IdService' :  IdService},
     success: function (result) {
        $("#likeButton").show();
        $("#dislikeButton").hide();
     },
     error: function (xhr) {
         alert('Something went wrong.');
     }
     
 });
}