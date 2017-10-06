$(function () {
    IsFollowing(false);
});

function IsFollowing(following) {
	if (following) {
		$("#likeButton").hide();
        $("#dislikeButton").show();
	} else {
        $("#likeButton").show();
	    $("#dislikeButton").hide();
	}
    // $.ajax({
    //     type: "POST",
    //     url: "http://localhost:51336/api/User/IsFollowing",
    //     data: { 'idCard': IdCard, 'idFriend' :  IdFriend},
    //     success: function (following) {
    //     	console.log(following);
    //         if (following) {
    //             $("#followButton").hide();
    //             $("#unfollowButton").show();
    //         } else {
    //             $("#followButton").show();
    //             $("#unfollowButton").hide();
    //         }
    //     },
    //     error: function (xhr) {
    //         alert('Something went wrong.');
    //     }
    // });
}

function Like() {
	IsFollowing(true);
    // $.ajax({
    //     type: "POST",
    //     url: "http://localhost:51336/api/User/Follow",
    //     data: { 'idCard': IdCard, 'idFriend' :  IdFriend},
    //     success: function (result) {
    //         IsFollowing();
    //     },
    //     error: function (xhr) {
    //         alert('Something went wrong.');
    //     }
        
    // });
}

function Dislike() {
	IsFollowing(false);
    // $.ajax({
    //     type: "POST",
    //     url: "http://localhost:51336/api/User/Unfollow/",
    //     data: { 'idCard': IdCard, 'idFriend' :  IdFriend}, 
    //     success: function (result) {
    //         IsFollowing();
    //     },
    //     error: function (xhr) {
    //         alert('Something went wrong.');
    //     }
    // });
}