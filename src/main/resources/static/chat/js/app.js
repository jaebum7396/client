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
    $("#menu,.page_cover,html").removeClass("open");
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
    $('#OPEN_CHANNEL_CD').val(''); // 채팅방 번호
    $('#chat-messages').off('scroll'); // 채팅 스크롤
    $('#chat-messages').html(''); // 채팅 메시지
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
            if(channelUsers[i].userCd==$('#LOGIN_USER_CD').val()){ // 로그인한 사용자의 채팅방 별명 설정
                $('#channel_alias').html(channelUsers[i].channelAlias);
            }
        }
        let channelCd = response.data.result.channel.channelCd; // 생성된 채팅방 번호
        console.log('channelCd : '+channelCd)
        $('#OPEN_CHANNEL_CD').val(channelCd); // 채팅방 번호 업데이트
        //updateUnreadCountHub($('#LOGIN_USER_CD').val(), channelCd); // 채팅방 읽지 않은 메시지 개수 업데이트

        channelJoin(channelCd, channelUsers); // 채팅방 참여

        // 채팅방 생성을 위한 소켓서버통신
        let messageDTO = new Object();
        messageDTO.domainCd = 1;
        messageDTO.channelCd = 0;
        messageDTO.userCd = $("#chatbox input[name='LOGIN_USER_CD']").val();
        messageDTO.wssKey = $('#WSS_KEY').val();
        messageDTO.transferType = '99';
        messageDTO.messageType = '1';
        //sendMessage(messageDTO);

        //메시지 초기화
        //loadMessageListHub(channelCd, 'Y');
        $("input[class='friend_check']").prop('checked', false)
        console.log('rowClick done')
        chatRoomVisible('friend', channelUsers.length);
    })
    .catch((response) => {
        console.log(response)
    })

    invite_list_close();
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