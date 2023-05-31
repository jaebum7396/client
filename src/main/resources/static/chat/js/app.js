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

    $("#sendmessage input").focus(function() {
        if ($(this).val() == "Send message...") {
            $(this).val("");
        }
    });
    $("#sendmessage input").focusout(function() {
        if ($(this).val() == "") {
            $(this).val("Send message...");

        }
    });

    $('#sendmessage #msg').keydown((e) => {
        if (e.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
            sendChatHub(document.getElementById("msg").value, isValidURL(document.getElementById("msg").value)?'5' : '1')
        }else{
            sendTypingAlarmHub();
        }
    });
    webSocketConnectHub();
    initFriendTab();
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
    $("#menu,.page_cover, html").removeClass("open");
}

//채팅방 보이기 함수
function chatRoomVisible(p_flag) {
    $("#chat_header p").addClass("animate"); $("#chat_header").addClass("animate");;
    $("#chat_messages").addClass("animate");
    $('.cx, .cy').addClass('s1');
    $('.cx, .cy').addClass('s2');
    $('.cx, .cy').addClass('s3');

    $('#tab_container').fadeOut();
    $('#chat_room_view').fadeIn();

    $('#close_chat').unbind("click").click(function() {
        $("#chat_messages, #chat_header, #chat_header p").removeClass("animate");
        $('.cx, .cy').removeClass("s1 s2 s3");
        $('#chat_room_view').fadeOut();
        $('#tab_container').fadeIn();
        $('#OPEN_CHANNEL_CD').val('');
        //localStorage.setItem("channelCd", ''); // 채팅방 번호 업데이트
        if("channel" == p_flag){
            getChannelsWithPageable('0')
        }else{
            initFriendTab();
        }
    });
    closePopupProfile();
}

function addInfiniteScroll(p_list_container_id){
    $('#'+p_list_container_id).scroll(function() {
        let noMore = false;
        let scrollTop = $('#'+p_list_container_id).scrollTop();
        let innerHeight = $('#'+p_list_container_id).height();
        let scrollHeight = $('#'+p_list_container_id)[0].scrollHeight;
        let current_page_num = $('#'+p_list_container_id).find("input[name='current_page_num']").val()
        if (!noMore) {
            if (1+scrollTop + innerHeight >= scrollHeight) {
                if (innerHeight != 0) {
                    //스크롤이 바닥치면 뭐할지 여기에 정의 시작
                    $('#'+p_list_container_id).scrollTop(scrollHeight - 110);
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

//친구 리스트에서 클릭시 채팅방 오픈하기 위한 함수
function openChannelWithUserHub(p_me){
    console.log('openChannelWithUserHub start')

    // 전역변수 초기화
    //localStorage.setItem("channelCd", ''); // 채팅방 번호 업데이트// 채팅방 번호
    $('#OPEN_CHANNEL_CD').val('');
    $('#chat_messages').off('scroll'); // 채팅 스크롤
    $('#chat_messages').html(''); // 채팅 메시지
    let p_objArr = new Array(); // 선택된 친구들의 채팅 행 정보를 저장할 배열 초기화
    if (p_me != 'me') { // 로그인한 사용자가 아닌 경우
        $("input[class='friend_check']").each(function (idx, item) { // friend_check 클래스를 가진 모든 input 태그에 대해 반복문 수행
            if ($(item).prop('checked') == true) { // 친구 선택상태이면
                p_objArr.push($(item).parents('.chat_row')); // 친구의 채팅 행 정보를 배열에 추가
            }
        });
    }
    let channelUsers
    // 선택된 친구들과의 채팅방 생성
    var openChannelWithUserPromise = openChannelWithUser(p_objArr);
    openChannelWithUserPromise
    .then((response) => { // 채팅방 생성 성공시 수행될 코드
        console.log('openChannelWithUserResp', response)
        channelUsers = response.data.result.channel.channelUsers; // 채팅방에 참여한 사용자 정보들
        for(let i=0; i< channelUsers.length; i++){ // 사용자 정보들을 반복문으로 돌면서
            if(channelUsers[i].userCd==localStorage.getItem('loginUserCd')){ // 로그인한 사용자의 채팅방 별명 설정
                $('#channel_alias').html(channelUsers[i].channelAlias);
            }
        }
        let channelCd = response.data.result.channel.channelCd; // 생성된 채팅방 번호
        console.log('channelCd : '+channelCd)
        //localStorage.setItem("channelCd", channelCd); // 채팅방 번호 업데이트
        $('#OPEN_CHANNEL_CD').val(channelCd);
        channelReadHub(channelCd); // 채팅방 읽지 않은 메시지 개수 업데이트

        channelJoin(channelCd, channelUsers); // 채팅방 참여

        //메시지 초기화
        loadChatListHub(channelCd, 'Y');
        $("input[class='friend_check']").prop('checked', false)
        console.log('rowClick done')
        chatRoomVisible('friend', channelUsers.length);
    })
    .catch((response) => {
        console.log(response)
    })

    //invite_list_close();
}

//채널생성 -- 현재 로그인 되어있는 세션 유저코드와 클릭한 행의 유저코드를 통해 채널 생성함
function openChannelWithUser(p_objArr) {
    console.log('openChannelWithUser>>>>>>>>>>>>', p_objArr)
    return new Promise((resolve, reject) => {
        let userCdArr = [];
        p_objArr.forEach((p_obj) => {
            userCdArr.push($(p_obj).find('#FRIEND_USER_CD').val());
        })
        axios.get(API_CHAT_URL + '/channel?userCdArr=' + encodeURIComponent(userCdArr.join(',')), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            }
        })
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error.response)
        });
    })
}

//채팅 리스트에서 클릭시 채팅방 오픈하기 위한 함수
function openChannel(p_channelCd, p_channelAlias, p_channelUserCount) {
    let channelCd = p_channelCd;
    //localStorage.setItem("channelCd", p_channelCd);
    $('#OPEN_CHANNEL_CD').val(channelCd);

    $('#chat-messages').off('scroll');
    $('#chat-messages').html('');

    channelReadHub(channelCd);

    $('#channel_alias').html(p_channelAlias);
    $('#channel_user_count').html(p_channelUserCount);
    //메시지 초기화
    loadChatListHub(channelCd, 'Y')
    chatRoomVisible('channel');
}

//채팅리스트 및 친구 리스트 프로필 생성
function profileMaker(profileImgUrl, imgSizestr){
    let htmlText='';
    if(profileImgUrl){
        htmlText += 	"<div class='profile_img' style='"+imgSizestr+" '>"
        htmlText += 		"<img src='"+profileImgUrl+"'>";
        htmlText += 	"</div>";
    }else{
        htmlText += 	"<div class='profile_img' style='"+imgSizestr+"'>";
        htmlText += 		"<img src='chat/image/profile/common.jpg'>";
        htmlText += 	"</div>";
    }
    return htmlText;
}

//채팅리스트 및 친구 리스트 프로필 생성
//function profileMaker(friend, imgSizeStr){
//    console.log('profileMaker', friend);
//    return new Promise((resolve, reject) => {
//        let htmlText = '';
//
//        if (!friend.userInfo) {
//            console.log('프로필 이미지가 없습니다.');
//            htmlText += "<div class='profile_img' style='" + imgSizeStr + "'>";
//            htmlText += "<img src='image/face_common.jpg'>";
//            htmlText += '</div>';
//            resolve(htmlText);
//            return;
//        }
//        if (friend.userInfo.userProfileImages){
//            let userProfileImages = friend.userInfo.userProfileImages;
//            if(friend.userInfo.userProfileImages.length == 0){
//                htmlText += 	"<div class='profile_img' style='"+imgSizeStr+" '>"
//                htmlText += 		"<img src='image/face_common.jpg'>";
//                htmlText += 	"</div>";
//                resolve(htmlText);
//            }else if(friend.userInfo.userProfileImages.length > 0){
//                axios.get(API_FILE_STORAGE_URL+'/display?fileLocation='+userProfileImages[userProfileImages.length-1].profileImgUrl, {
//                    responseType:'blob',
//                    headers: {
//                        'Content-Type': 'application/json',
//                        Authorization: localStorage.getItem("token"),
//                    }
//                }).then(response => {
//                    console.log('해당 이미지가 있습니다.',response);
//                    const imageURL = window.URL.createObjectURL(response.data)
//                    htmlText += 	"<div class='profile_img' style='"+imgSizeStr+" '>"
//                    htmlText += 		"<img src='"+ imageURL +"'>";
//                    htmlText += 	"</div>";
//                    resolve(htmlText);
//                }).catch(error => {
//                    console.log('해당 이미지가 없습니다.', error.response);
//                    htmlText += 	"<div class='profile_img' style='"+imgSizeStr+"'>"
//                    htmlText += 		"<img src='image/face_common.jpg'>";
//                    htmlText += 	"</div>";
//                    resolve(htmlText);
//                })
//            }
//        }else{
//            console.log('프로필 이미지가 없습니다.', error.response);
//            htmlText += 	"<div class='profile_img' style='"+imgSizeStr+"'>";
//            htmlText += 		"<img src='image/face_common.jpg'>";
//            htmlText += 	"</div>";
//            resolve(htmlText);
//        }
//    });
//}

function imageProvider(fileLocation, imgSizeStr){
    return new Promise((resolve, reject) => {
        let htmlText = "";
        axios.get(API_FILE_STORAGE_URL+'/display?fileLocation='+fileLocation, {
            responseType:'blob',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            }
        }).then(response => {
            console.log('해당 이미지가 있습니다.',response);
            const imageURL = window.URL.createObjectURL(response.data)
            htmlText += 	"<div class='profile_img' style='"+imgSizeStr+" '>"
            htmlText += 		"<img src='"+ imageURL +"'>";
            htmlText += 	"</div>";

            //$(p_obj).html(htmlText)
            //return htmlText;
            resolve(htmlText);
        }).catch(error => {
            console.log('해당 이미지가 없습니다.', error.response);
            htmlText += 	"<div class='profile_img' style='"+imgSizeStr+"'>"
            htmlText += 		"<img src='image/face_common.jpg'>";
            htmlText += 	"</div>";

            //$(p_obj).html(htmlText)
            //return htmlText;
            resolve(htmlText);
        })
    });
}
