function initChannelTab(){
    $('#app_header_menu').css('display', 'none');
    $('#app_title_text').html('채팅 목록');
    $('.list_container').css('display', 'none');
    $('#channel_list_container').css('display', 'block');
    getChannelsWithPageable('0');
}

//채팅리스트 무한스크롤
var OPEN_CHANNEL_LIST_YN = false;
function getChannelsWithPageable(p_page) {
    $('#channel_list_container').off('scroll')
    console.log('getChannelsWithPageable>>>>>>>>>>>>')
    $('#friend_list_container').css('display', 'none')
    $('#channel_list_container').css('display', 'block')
    if (OPEN_CHANNEL_LIST_YN == false) {
        OPEN_CHANNEL_LIST_YN = true;
        if (!p_page) {
            var p_page = $("#tab_container input[name='current_page_num']").val();
        } else {
            if (p_page == 0) {
                $("#channel_list_container").html('');
            }
        }
        axios.get(CHAT_URL+'/channels?size=11&page='+p_page, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            }
        })
        .then(response => {
            console.log('getChannelsWithPageableResp', response)
            let result = response.data.result;
            let channelArr = result.channelArr
            let p_page = result.p_page;
            $("#tab_container input[name='current_page_num']").val(p_page);
            channelMakerHub(channelArr);
            OPEN_CHANNEL_LIST_YN = false;
        })
        .catch((error) => {
            console.log(error.response);
            if(error.response.data.statusCode == 401||error.response.data.body.statusCode == 401){
                localStorage.setItem('token', '');
                alert('로그인이 만료되었습니다.');
                location.href = 'login';
            }else{
                alert(error.response.data.message);
                console.error(error);
            }
        })
    }
    addInfiniteScroll('channel_list_container');
}



async function channelMakerHub(channelArr){
    console.log('channelMakerHub start', channelArr)
    for (let i = 0; i < channelArr.length; i++) {
        let channel = channelArr[i];
        //await channelRowMaker(channel);
        await $("#channel_list_container").append(channelMaker(channel));
    }
    console.log('channelMakerHub done')
}

//채널 생성 해주는 함수
function channelMaker(channel){
    console.log('channelMaker', channel)
    let htmlText = "";
    let channelUsers = channel.channelUsers;
    let lastChat = channel.lastChat;
    let unreadCount = '';
    let profileArr = new Array();

    //마지막 메시지 코드가 없을시(메시지가 한개도 없을시) 채팅방 화면에서 생성 하지 않는다.
    if (!channel.lastChat) {
        return false;
    }
    //해당 채팅방의 유저를 순회
    let channelName;
    for (let j = 0; j < channelUsers.length; j++) {
        //현재 로그인한 유저의 채널 별칭을 가져온다.
        if (channelUsers[j].userCd == localStorage.getItem('loginUserCd')) {
            if (channelUsers.length == 1) {
                profileArr.push(channelUsers[j]);
            }
            channelName = channelUsers[j].channelAlias
            //안읽음 메시지가 있을시 화면에 세팅
            if (channelUsers[j].unreadCount != 0) {
                unreadCount = channelUsers[j].unreadCount
            }
        } else {
            if (profileArr.length < 4) {
                profileArr.push(channelUsers[j]);
            }
        }
    }

    htmlText += "<div class='chat_row channel " + channel.channelCd + "' style='display:flex;'>";
    htmlText +=     "<input class='CHANNEL_CD' id='CHANNEL_CD' name='CHANNEL_CD' type='hidden' value='" + channel.channelCd + "'/>";
    htmlText +=     "<div id='"+channel.channelCd+"' class='profile_container' onclick='rowClick(this, " + true + ");'>"

    //프로필 이미지를 순회하며 화면에 세팅
    htmlText +=         channelProfileMaker(profileArr);

    htmlText +=     "</div>";
    htmlText +=     "<div class='channel_row_contents' style=''>";
    htmlText +=         "<div style='display: flex;'>";
    htmlText +=             "<strong class='channel_alias alias' onclick='openChannel(\"" + channel.channelCd + "\" ,\"" + channelName + "\",\"" + channelUsers.length + "\");' style=''>" + channelName + "</strong>";
    if (channelUsers.length > 2) {
        htmlText +=         "<div class='channel_user_count' style='display:inline;'>" + (channelUsers.length) + "</div>"
    }
    //htmlText +=             "<div class='exit btn' style='border-radius: 10%; background-color:red; color:white; padding:3px;' onclick='exitChannelHub(\"" + channel.channelCd + "\")'>나가기</div>";
    htmlText +=         "</div>";
    htmlText +=         "<div class='recent_message_container' style='color:#737373'>"
    if (lastChat != null && lastChat && lastChat.message) {
        htmlText +=         "<div class='recent_message'>" + lastChat.message + "</div>";
        htmlText +=         "<div class='recent_messageDt'>" + formatLastChatDateTime(lastChat.messageDt.substr(0, 16)) + "</div>";
    }
    htmlText +=         "</div>";
    htmlText +=     "</div>";
    htmlText +=     "<div class='unread_count_container' style=''>"
    htmlText +=         "<div class='unread_count' style='" + (unreadCount != 0 ? "display:flex;" : "display:none;") + "'>"
    htmlText +=             "<div>" + unreadCount + "</div>"
    htmlText +=         "</div>"
    htmlText +=     "</div>";
    htmlText += "</div>";

    return htmlText;
}

function channelProfileMaker(profileArr) {
    console.log('channelProfileMaker', profileArr);
    let htmlText = '';
    let imgSizeStr = '';

    // 프로필 이미지의 갯수에 따라 각 프로필 이미지 사이즈를 정의해준다.
    if (profileArr.length == 1) {
        imgSizeStr = 'height : 50px; width: 50px;';
    } else if (profileArr.length == 2) {
        imgSizeStr = 'height : 35px; width: 35px;';
    } else if (profileArr.length == 3) {
        imgSizeStr = 'height : 30px; width: 30px;';
    } else if (profileArr.length == 4) {
        imgSizeStr = 'height : 25px; width: 25px;';
    }

    profileArr.forEach((item, idx) => {
        if(idx>=4){
            return false;
        }
        if(profileArr.length==1){
            htmlText += profileMaker(item.userInfo.userProfileImages[0].profileImgUrl,imgSizeStr+' left:auto; top:auto;');
        }else if(profileArr.length==2 && idx==1){
            htmlText += profileMaker(item.userInfo.userProfileImages[0].profileImgUrl,imgSizeStr+' left:40%; top:40%; z-index:3;');
        }else if(profileArr.length==3){
            if(idx==0){
                htmlText += profileMaker(item.userInfo.userProfileImages[0].profileImgUrl,imgSizeStr+'left:27%; top:10%; z-index:3;');
            }else if(idx==1){
                htmlText += profileMaker(item.userInfo.userProfileImages[0].profileImgUrl,imgSizeStr+'left:48%; top:45%');
            }else if(idx==2){
                htmlText += profileMaker(item.userInfo.userProfileImages[0].profileImgUrl,imgSizeStr+'left:7%; top:45%; z-index:3; ');
            }
        }else if(profileArr.length==4){
            if(idx==0){
                htmlText += profileMaker(item.userInfo.userProfileImages[0].profileImgUrl,imgSizeStr+' ');
            }else if(idx==1){
                htmlText += profileMaker(item.userInfo.userProfileImages[0].profileImgUrl,imgSizeStr+' ');
            }else if(idx==2){
                htmlText += profileMaker(item.userInfo.userProfileImages[0].profileImgUrl,imgSizeStr+' ');
            }else if(idx==3){
                htmlText += profileMaker(item.userInfo.userProfileImages[0].profileImgUrl,imgSizeStr+' ');
            }
        }else{
            htmlText += profileMaker(item.userInfo.userProfileImages[0].profileImgUrl,imgSizeStr);
        }
    });
    return htmlText;
}

function exitChannelHub(p_channelCd){
    let deleteChannelUserPromise = deleteChannelUser(p_channelCd);
    deleteChannelUserPromise
        .then((response) => {
            sendChatHub(p_channelCd, response.result.friendList[0].userNm+' 님이 나가셨습니다.', 1)

            unsubscribe(p_channelCd);
            getChannelsWithPageable('0');
        })
        .catch((response) => {
            console.log(response)
        })
}

function deleteChannelUser(p_channelCd) {
    console.log('deleteChannelUser>>>>>>>>>>>>')

    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://' + clientUrl + '/deleteChannelUser?channelCd='+p_channelCd+'&loginUserCd='+$("#chatbox input[name='LOGIN_USER_CD']").val()
            , async: true
            , type: 'POST'
            , success: function(response) {
                resolve(response)
            }
            , error: function(response) {
                reject(response)
                console.log(response);
            }
        });
    });
}