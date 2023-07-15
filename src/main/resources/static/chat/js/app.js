const debugYn = CURRENT_PROFILE == 'local' ? true : false;

function getCurrentTime(){
    let today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let milliseconds = today.getMilliseconds();
    let time = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    return time;
}
function debugLog(p_requestUrl, p_msg){
    if(debugYn){
        console.log('[DEBUG]', getCurrentTime(),'\n', p_requestUrl, p_msg);
    }
}

/*axios 관련*/
axios.interceptors.request.use(req => {
    req.headers.Authorization = localStorage.getItem("token");
    req.headers['Content-Type'] = 'application/json';
    return req;
});

let refreshTokenYn = true;
axios.interceptors.response.use(res => {
    if(debugYn){
        debugLog(res.config.url, res)
    }
    return res;
}, err => {
    console.log('[err]','>>>>>', err.response.config.url, err.response);
    if(err.response.status == 401){
        if(refreshTokenYn) {
            refreshTokenYn = false;
            confirm('로그인을 연장하시겠습니까?') ? refreshToken() : alert('로그인이 만료되었습니다');
        }else{
            localStorage.setItem('token', '');
            alert('로그인이 만료되었습니다');
            location.href = 'login';
            refreshTokenYn = true;
        }
        //localStorage.setItem('token', '');
        //alert('로그인이 만료되었습니다');
        //location.href = 'login';
    }else if(err.response.data.statusCodeValue == 401){
        localStorage.setItem('token', '');
        alert('로그인이 만료되었습니다');
        location.href = 'login';
    }else if(err.response.data.statusCode == 500){
        alert('서버에러가 발생했습니다');
        //location.reload();
    }else if(err.response.data.statusCode == 503){
        alert("잠시 후에 다시 시도하세요");
        location.reload();
    }
})

function refreshToken(){
    axios.post(USER_URL+'/login/refresh', {}, {})
    .then(response => {
        let result = response.data.result;
        //console.log(response.data);
        localStorage.setItem("token", result.token);
        //console.log('token >>>>> ', localStorage.getItem("token"))
        alert('token 갱신 완료')
        refreshTokenYn = true;
        //location.href='/chat/app';
    })
}

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
        //loadChannelUserListHub();
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
    preventBrowserZoom();
    webSocketConnectHub();
    initFriendTab('normal');
});

var hasFocus = document.hasFocus();
var hasFocusApp;

function updateFocusStatus() {
    if (document.hasFocus()) {
        hasFocus = true;
        //console.log("해당 창이 포커스를 가지고 있습니다.");
        if($('#OPEN_CHANNEL_CD').val()){
            channelReadHub();
        }
    } else {
        hasFocus = false;
        //console.log("해당 창이 포커스를 잃었습니다.");
    }
}

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
        hasFocusApp = true;
        //console.log("앱이 활성화되었습니다.");
    } else {
        hasFocusApp = false;
        //console.log("앱이 백그라운드에 있습니다.");
    }
});

window.addEventListener("focus", function() {
    updateFocusStatus();
});

window.addEventListener("blur", function() {
    updateFocusStatus();
});

function preventBrowserZoom() {
    function listener(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }

    document.addEventListener("touchmove", listener, { passive: false });
}

window.onhashchange = function() {
    if (location.hash != "#open") {
        leftSideMenuClose()
    }
};

function sendTypingAlarmHub(){
    let p_chat = new Object();
    p_chat.transferType = 89 //타이핑 알람
    p_chat.domainCd = clientDomainCd
    p_chat.channelCd = $('#OPEN_CHANNEL_CD').val();
    sendChat(p_chat);
}

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
            initFriendTab('normal');
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
    //console.log('openChannelWithUserHub start')

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
        //console.log('openChannelWithUserResp', response)
        channelUsers = response.data.result.channel.channelUsers; // 채팅방에 참여한 사용자 정보들
        for(let i=0; i< channelUsers.length; i++){ // 사용자 정보들을 반복문으로 돌면서
            if(channelUsers[i].userCd==localStorage.getItem('loginUserCd')){ // 로그인한 사용자의 채팅방 별명 설정
                $('#channel_alias').html(channelUsers[i].channelAlias);
            }
        }
        let channelCd = response.data.result.channel.channelCd; // 생성된 채팅방 번호
        //console.log('channelCd : '+channelCd)
        //localStorage.setItem("channelCd", channelCd); // 채팅방 번호 업데이트
        $('#OPEN_CHANNEL_CD').val(channelCd);
        channelReadHub(); // 채팅방 읽지 않은 메시지 개수 업데이트

        channelJoin(channelCd, channelUsers); // 채팅방 참여

        //메시지 초기화
        loadChatListHub(channelCd, 'Y');
        $("input[class='friend_check']").prop('checked', false)
        //console.log('rowClick done')
        chatRoomVisible('friend', channelUsers.length);
    })
    .catch((response) => {
        //console.log(response)
    })

    //invite_list_close();
}

//채널생성 -- 현재 로그인 되어있는 세션 유저코드와 클릭한 행의 유저코드를 통해 채널 생성함
function openChannelWithUser(p_objArr) {
    //console.log('openChannelWithUser>>>>>>>>>>>>', p_objArr)
    return new Promise((resolve, reject) => {
        let userCdArr = [];
        p_objArr.forEach((p_obj) => {
            userCdArr.push($(p_obj).find('#FRIEND_USER_CD').val());
        })
        axios.get(CHAT_URL + '/channel?userCdArr=' + encodeURIComponent(userCdArr.join(',')), {})
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

    channelReadHub();

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
        let imgUrl;
        if(profileImgUrl.indexOf('image/profile') == 0){
            //console.log('기본', profileImgUrl, profileImgUrl.indexOf('image/profile'))
            imgUrl = profileImgUrl;
        }else{
            //console.log('기본아님', profileImgUrl, profileImgUrl.indexOf('image/profile'))
            imgUrl = 'http://www.aflk-chat.com:8000/file-storage/display?fileLocation='+profileImgUrl;
        }
        htmlText += 	"<div class='profile_img' style='"+imgSizestr+" '>"
        htmlText += 		"<img src = "+imgUrl+">";
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
//    //console.log('profileMaker', friend);
//    return new Promise((resolve, reject) => {
//        let htmlText = '';
//
//        if (!friend.userInfo) {
//            //console.log('프로필 이미지가 없습니다.');
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
//                axios.get(FILE_STORAGE_URL+'/display?fileLocation='+userProfileImages[userProfileImages.length-1].profileImgUrl, {
//                    responseType:'blob',
//                    headers: {
//                        'Content-Type': 'application/json',
//                        
//                    }
//                }).then(response => {
//                    //console.log('해당 이미지가 있습니다.',response);
//                    const imageURL = window.URL.createObjectURL(response.data)
//                    htmlText += 	"<div class='profile_img' style='"+imgSizeStr+" '>"
//                    htmlText += 		"<img src='"+ imageURL +"'>";
//                    htmlText += 	"</div>";
//                    resolve(htmlText);
//                }).catch(error => {
//                    //console.log('해당 이미지가 없습니다.', error.response);
//                    htmlText += 	"<div class='profile_img' style='"+imgSizeStr+"'>"
//                    htmlText += 		"<img src='image/face_common.jpg'>";
//                    htmlText += 	"</div>";
//                    resolve(htmlText);
//                })
//            }
//        }else{
//            //console.log('프로필 이미지가 없습니다.', error.response);
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
        axios.get(FILE_STORAGE_URL+'/display?fileLocation='+fileLocation, {
            responseType:'blob'
        }).then(response => {
            //console.log('해당 이미지가 있습니다.',response);
            const imageURL = window.URL.createObjectURL(response.data)
            htmlText += 	"<div class='profile_img' style='"+imgSizeStr+" '>"
            htmlText += 		"<img src='"+ imageURL +"'>";
            htmlText += 	"</div>";

            //$(p_obj).html(htmlText)
            //return htmlText;
            resolve(htmlText);
        }).catch(error => {
            //console.log('해당 이미지가 없습니다.', error.response);
            htmlText += 	"<div class='profile_img' style='"+imgSizeStr+"'>"
            htmlText += 		"<img src='image/face_common.jpg'>";
            htmlText += 	"</div>";

            //$(p_obj).html(htmlText)
            //return htmlText;
            resolve(htmlText);
        })
    });
}

function formatLastChatDateTime(messageDt) {
    var now = new Date();
    var messageDate = new Date(messageDt);

    if (
        now.getFullYear() === messageDate.getFullYear() &&
        now.getMonth() === messageDate.getMonth() &&
        now.getDate() === messageDate.getDate()
    ) {
        // 오늘일 경우 오전 XX:XX 포맷으로 표기
        var formattedTime = messageDate.toLocaleTimeString('ko-KR', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        return formattedTime;
    } else {
        // 오늘이 아닐 경우 날짜로 표기
        var formattedDate = messageDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        return formattedDate;
    }
}

function formatDate(inputDate) {
    var date = new Date(inputDate);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period = hours >= 12 ? '오후' : '오전';

    // 시간 형식 조정
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }

    // 분 형식 조정
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    var formattedTime = period + ' ' + hours + ':' + minutes + '분';
    return formattedTime;
}

function convertTimeFormat(timeString) {
    const [hours, minutes] = timeString.split(':');

    let period = '오전';
    let hour = parseInt(hours, 10);

    if (hour >= 12) {
        period = '오후';
        hour = hour === 12 ? hour : hour - 12;
    }

    return `${period} ${hour}:${minutes}분`;
}

function openLoadingCover(loadingText){
    if(loadingText){
        $('#loadingCover').find('#loadingText').html(loadingText);
    }else{
        $('#loadingCover').find('#loadingText').html('로딩중...');
    }
    $('#loadingCover').css('display', 'flex');
}

function closeLoadingCover(){
    $('#loadingCover').css('display', 'none');
}