$(document).ready(function() {
    // #menu 요소 하위의 ul 요소 중 class 속성이 channel_user_list인 요소를 숨깁니다.
    $("#menu ul.channel_user_list").hide();

    // #menu 요소 하위의 ul 요소 중 class 속성이 channel_user_list인 요소를 토글합니다.
    $("#menu ul.nav li a .channel_user_btn").click(function(){
        $("ul", '.channel_user_list').slideToggle("fast");
    });

    // .left_side_btn 요소를 클릭하면, leftSideMenuOpen() 함수와 loadChannelUserListHub() 함수를 실행하고, URL 해시값을 #open으로 변경합니다.
    $(".left_side_btn").click(function() {
        leftSideMenuOpen();
        loadChannelUserListHub();
        window.location.hash = "#open";
    });
    $('#sendmessage #msg').keydown((e) => {
        if (e.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
            sendMessageHub(document.getElementById("msg").value, isValidURL(document.getElementById("msg").value)?'5' : '1')
        }
    });
    let getMyInfoPromise = getMyInfo();
        getMyInfoPromise
        .then((response) => {
            console.log('getMyInfoResp', response)
            $('#friend_list_container .friend_list').prepend(myInfoMaker(response.data.result.user));
            getFriendsWithPageable(0);
        })
        .catch((error) => {
            if(error.response.status == 401){
                localStorage.setItem('token', '');
                alert('로그인이 만료되었습니다.');
                location.href = 'login';
            }else{
                alert('데이터를 로딩하는 중 실패했습니다.');
                console.error(error);
            }
        })
});

window.onhashchange = function() {
    if (location.hash != "#open") {
        leftSideMenuClose()
    }
};

function leftSideMenuOpen(){
    $("#menu,.page_cover,html").addClass("open");
}

function leftSideMenuClose(){
    $("#menu,.page_cover,html").removeClass("open");
}

function getMyInfo(){
    return axios.get(backendUrl+'/user/me', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("token"),
        }
    })
}

function myInfoMaker(user, rowClickActivate) {
    let htmlText ="";
    htmlText += "<div class='chat_row friend " + user.userCd + "'>";
    htmlText += 	"<input class='FRIEND_USER_CD' id='FRIEND_USER_CD' name='FRIEND_USER_CD' type='hidden' value='" + user.userCd + "'/>";
    htmlText +=		"<div class='profile_container'>"
    htmlText += 		myProfileMaker(user,' left:auto; top:auto;');
    htmlText += 	"</div>";
    htmlText += 	"<div onclick='openPopupProfile(this);' style='padding:10px;display:flex;flex-direction:column;justify-content:space-between;font-size:15px;'>";
    htmlText += 		"<strong class='friend_alias alias' style='color: #597a96;'>" + (user.friendAlias!=null? user.friendAlias : user.userNm) + "</strong>";
    htmlText += 		"<strong class='friend_message'>" + (user.userMessage!=null? user.userMessage:"") + "</strong>";
    htmlText += 	"</div>";
    htmlText += 	"<div style='margin: auto;'>";
    htmlText += 		"<input id='check_"+user.userCd+"' class='friend_check' type='checkbox' style='' value='" + user.userCd + "'/>";
    htmlText +=     	"<label for='check_"+user.userCd+"' class='friend_check_label'></label>"
    htmlText += 	"</div>";
    htmlText += "</div>";
    return htmlText;
}

function myProfileMaker(user, imgSizestr){
    let htmlText='';
    if(user.userInfo.profileImgUrl){
        htmlText += 	"<div class='profile_img' style='"+imgSizestr+" '>"
        htmlText += 		"<img src='"+user.userInfo.profileImgUrl+"'>";
        htmlText += 	"</div>";
    }else{
        htmlText += 	"<div class='profile_img' style='"+imgSizestr+"'>";
        htmlText += 		"<img src='chat/image/face_common.jpg'>";
        htmlText += 	"</div>";
    }
    return htmlText;
}

//채팅방 보이기 함수
function chatRoomVisible(p_flag) {
    $("#chat_header p").addClass("animate"); $("#chat_header").addClass("animate");;
    $("#chat-messages").addClass("animate");
    $('.cx, .cy').addClass('s1');
    $('.cx, .cy').addClass('s2');
    $('.cx, .cy').addClass('s3');

    $('#tab_container').fadeOut();
    $('#chatview').fadeIn();

    $('#close_chat').unbind("click").click(function() {
        $("#chat-messages, #chat_header, #chat_header p").removeClass("animate");
        $('.cx, .cy').removeClass("s1 s2 s3");
        $('#chatview').fadeOut();
        $('#tab_container').fadeIn();
        $('#OPEN_CHANNEL_CD').val('');
        if("channel" == p_flag){
            getChannelsWithPageable('0')
        }else{
            getFriendsWithPageable('0');
        }
    });
    closePopupProfile();
}

//친구리스트 페이징
var OPEN_FRIEND_LIST_YN = false;
function getFriendsWithPageable(p_page) {
    console.log('getFriendsWithPageable>>>>>>>>>>>>')
    $('#channel_list_container').css('display', 'none')
    $('#friend_list_container').css('display', 'block')
    if (OPEN_FRIEND_LIST_YN == false) {
        OPEN_FRIEND_LIST_YN = true;
        if (!p_page) {
            var p_page = $("#tab_container input[name='current_page_num']").val();
        } else {
            if (p_page == '0') {
                $("#friend_list_container").html('');
            }
        }
        axios.get(backendUrl+'/chat/friends?size=11&page='+p_page, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            }
        })
        .then(response => {
            console.log('getFriendsWithPageableResp', response)
            let result = response.data.result;
            let friendArr = result.friendArr
            let p_page = result.p_page;
            $("#tab_container input[name='current_page_num']").val(p_page);
            friendMakerHub(friendArr, $("#friend_list_container .friend_list"), true);

            OPEN_FRIEND_LIST_YN = false;
        })
        .catch(error => {
            if(error.response.status == 401){
                localStorage.setItem('token', '');
                alert('로그인이 만료되었습니다.');
                location.href = 'login';
            }else{
                alert('친구 목록을 가져오는데 실패했습니다.');
                console.error(error);
            }
        });
    }
    addInfiniteScroll('friend_list_container');
}

function addInfiniteScroll(p_list_container_id){
    $('#'+p_list_container_id).scroll(function() {
        let noMore = false;
        let scrollTop = $('#'+p_list_container_id).scrollTop();
        let innerHeight = $('#'+p_list_container_id).height();
        let scrollHeight = $('#'+p_list_container_id)[0].scrollHeight;
        let current_page_num = $('#'+p_list_container_id).find("input[name='current_page_num']").val()
        if (!noMore) {
            if (scrollTop + innerHeight >= scrollHeight) {
                if (innerHeight != 0) {
                    //스크롤이 바닥치면 뭐할지 여기에 정의 시작
                    $('#'+p_list_container_id).scrollTop(scrollHeight - 111);
                    $('#'+p_list_container_id).find("input[name='current_page_num']").val(Number(current_page_num) + Number(1))
                    if(p_list_container_id == 'channel_list_container'){
                        getChannelsWithPageable();
                    }else if(p_list_container_id == 'friend_list_container'){
                        getFriendsWithPageable();
                    }
                    noMore = (true);
                }
            }
        }
    });
}

async function friendMakerHub(friendArr, p_obj, rowClickActivate){
    console.log('friendMakerHub start')
    for (var i = 0; i < friendArr.length; i++) {
        let friend = friendArr[i];
        await p_obj.append(friendMaker(friend, rowClickActivate));
    }
    console.log('friendMakerHub done')
}

function friendMaker(friend, rowClickActivate) {
    console.log(friend)
    let htmlText ="";
    htmlText += "<div class='chat_row friend " + friend.friendUserCd + "'>";
    htmlText += 	"<input class='FRIEND_USER_CD' id='FRIEND_USER_CD' name='FRIEND_USER_CD' type='hidden' value='" + friend.friendUserCd + "'/>";
    htmlText +=		"<div class='profile_container'>"
    //htmlText += 		profileMaker(friend,' left:auto; top:auto;');
    htmlText += 	"</div>";
    htmlText += 	"<div onclick='openPopupProfile(this);' style='padding:10px;display:flex;flex-direction:column;justify-content:space-between;font-size:15px;'>";
    htmlText += 		"<strong class='friend_alias alias' style='color: #597a96;'>" + (friend.friendAlias!=null? friend.friendAlias : friend.userNm) + "</strong>";
    htmlText += 		"<strong class='friend_message'>" + (friend.userMessage!=null? friend.userMessage:"") + "</strong>";
    htmlText += 	"</div>";
    htmlText += 	"<div style='margin: auto;'>";
    htmlText += 		"<input id='check_"+friend.friendUserCd+"' class='friend_check' type='checkbox' style='' value='" + friend.friendUserCd + "'/>";
    htmlText +=     	"<label for='check_"+friend.friendUserCd+"' class='friend_check_label'></label>"
    htmlText += 	"</div>";
    htmlText += "</div>";
    return htmlText;
}

//채팅리스트 및 친구 리스트 프로필 생성
function profileMaker(friend, imgSizestr){
    let htmlText='';
    if(friend.userProfile.profileImgUrl){
        htmlText += 	"<div class='profile_img' style='"+imgSizestr+" '>"
        htmlText += 		"<img src='"+friend.userProfile.profileImgUrl+"'>";
        htmlText += 	"</div>";
    }else{
        htmlText += 	"<div class='profile_img' style='"+imgSizestr+"'>";
        htmlText += 		"<img src='chat/image/face_common.jpg'>";
        htmlText += 	"</div>";
    }
    return htmlText;
}