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
            getFriendsWithPageable('0');
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