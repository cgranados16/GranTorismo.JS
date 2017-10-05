
$(function () {
    IsFollowing();
    $(".rating").rating({ disabled: true, showCaption: false, showClear: false, });
});



function IsFollowing() {
    $.ajax({
        type: "POST",
        url: "http://localhost:51336/api/User/IsFollowing",
        data: { 'idCard': IdCard, 'idFriend' :  IdFriend},
        success: function (following) {
        	console.log(following);
            if (following) {
                $("#followButton").hide();
                $("#unfollowButton").show();
            } else {
                $("#followButton").show();
                $("#unfollowButton").hide();
            }
        },
        error: function (xhr) {
            alert('Something went wrong.');
        }
    });
}

function Follow() {
    $.ajax({
        type: "POST",
        url: "http://localhost:51336/api/User/Follow",
        data: { 'idCard': IdCard, 'idFriend' :  IdFriend},
        success: function (result) {
            IsFollowing();
        },
        error: function (xhr) {
            alert('Something went wrong.');
        }
        
    });
}

function Unfollow() {
    $.ajax({
        type: "POST",
        url: "http://localhost:51336/api/User/Unfollow/",
        data: { 'idCard': IdCard, 'idFriend' :  IdFriend}, 
        success: function (result) {
            IsFollowing();
        },
        error: function (xhr) {
            alert('Something went wrong.');
        }
    });
}