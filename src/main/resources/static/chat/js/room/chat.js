//메시지 수신
function onMessage(msg) {
    //debugLog('', msg)
    let innerHeight = $('#chat_messages').height();
    if (msg) {
        let data = msg;
        getChatFriend(data)
        .then((response) => {
            if(response.data.result.friendArr.length>0){
                if(response.data.result.friendArr[0].blockYn=='Y'){
                    //debugLog('', '차단된 사용자입니다.');
                    return;
                }
            }else{
                if(localStorage.getItem('loginUserCd')==data.userCd){
                    //debugLog('', '나임.');
                }else{
                    //debugLog('', '친구가 아닙니다.');
                }
            }
            if(data.transferType==3){
                //$('#WSS_KEY').val(data.objMap.wssKey);
            }else if(data.transferType == 9){
                // 현재 읽음처리 요청된 메시지의 메시지 코드보다 이후에 온 메시지들을 조회
                getChatsAfterReadChat(data)
                .then((response) => {
                    //console.log('getChatsAfterReadChatResp', response);
                    let chatArr = response.data.result.chatArr;
                    for(let i=0; i<chatArr.length; i++){
                        $('.bubble_box.'+chatArr[i].chatCd).find('.unread_count').html(chatArr[i].unreadCount)
                        if(chatArr[i].unreadCount==0){
                            $('.bubble_box.'+chatArr[i].chatCd).find('.unread_count').css('display','none');
                        }
                    }
                })
            }else if(data.transferType == 98){
                alert(data.message);
                $('#close_chat').click();
                //console.log('채팅방 신규 개설', data);
            }else if(data.transferType == 99){
                //console.log('채팅방 신규 개설', data);
                if(data.userCd!=localStorage.getItem('loginUserCd')){
                    stompSubscribe(data.domainCd, data.channelCd);
                }
            }else if(data.transferType == 89){
                if (localStorage.getItem('loginUserCd') != data.userCd && data.channelCd == $('#OPEN_CHANNEL_CD').val()){
                    //console.log('상대방이 타이핑 중입니다.', data);
                    $('#chat_alarm').css('display', 'flex');
                    $('#chat_alarm').html("<div class='alarm_payload'>상대방이 타이핑 중입니다.</div")
                    setTimeout(function() {
                        $('#chat_alarm').fadeOut('slow', function() {});
                    }, 2000);
                }
            }else{
                //수신한 메시지를 조회한다.
                getChat(data)
                .then((response) => {
                    sendFcm(data)
                    getChannelUserUnreadCountHub();
                    //console.log('getChatResp', response)
                    let chatArr = response.data.result.chatArr;
                    let channelInfo = response.data.result.channelInfo;

                    //채팅 목록이 활성화 되어 있을때
                    if($('#channel_list_container').css('display')=='block'){
                        let channelUsers = channelInfo.channelUsers;
                        let unreadCount = 0;
                        for(let i =0; i<channelUsers.length; i++){
                            //메시지 수신자 중 로그인한 유저코드와 같은 유저코드를 찾아서 안읽음 메시지 카운트 세팅
                            if(channelUsers[i].userCd == localStorage.getItem('loginUserCd')){
                                unreadCount = channelUsers[i].unreadCount
                            }
                        }
                        //채팅방이 있을때
                        if($('.chat_row.'+chatArr[0].channelCd).length!=0){
                            //수신한 최신 메시지를 미리보기에 세팅한다.
                            $('.chat_row.'+chatArr[0].channelCd).find('.recent_message_container .recent_message').html(chatArr[0].message);
                            $('.chat_row.'+chatArr[0].channelCd).find('.recent_message_container .recent_messageDt').html(formatLastChatDateTime(chatArr[0].messageDt.substr(0, 16)));
                            //수신한 최신 메시지에 해당하는 채팅룸을 맨 위로 올린다.
                            $('.chat_row.'+chatArr[0].channelCd).insertBefore($('#channel_list_container .chat_row')[0]);
                            //안읽음 메시지 카운트를 미리보기에 세팅한다.
                            $('.chat_row.'+chatArr[0].channelCd).find('.unread_count div').html(unreadCount);
                            if(unreadCount==0){
                                $('.chat_row.'+chatArr[0].channelCd).find('.unread_count_container .unread_count').css('display','none');
                            }else{
                                $('.chat_row.'+chatArr[0].channelCd).find('.unread_count_container .unread_count').css('display','flex');
                            }
                        }else{ //채팅방이 없을때
                            $("#channel_list_container").append(channelMaker(channelInfo));
                        }
                    }
                    //채팅방이 활성화 되어 있을때 (현재 오픈되어 있는 채널코드가 수신 메시지의 채널코드와 같을 시)
                    if (chatArr[0].channelCd == $('#OPEN_CHANNEL_CD').val()) {
                        //수신 메시지가 본인이 송신한 것이 아닐때(로그인 유저와 송신유저가 다를때)
                        if ((localStorage.getItem('loginUserCd') != chatArr[0].sender.userCd)){
                            if (isMobileDevice()) {
                                // 모바일 환경에서 실행할 로직
                                if (hasFocusApp) {
                                    // 앱이 활성화된 경우
                                    chatReadHub(chatArr[0]);
                                } else {
                                    // 앱이 백그라운드에 있는 경우
                                }
                            } else {
                                // PC 환경에서 실행할 로직
                                if (hasFocus) {
                                    // 해당 창이 포커스를 가지고 있는 경우
                                    chatReadHub(chatArr[0]);
                                } else {
                                    // 해당 창이 포커스를 잃은 경우
                                }
                            }
                        }
                        /*if ((localStorage.getItem('loginUserCd') != chatArr[0].sender.userCd)){
                            if(hasFocus||hasFocusApp){
                                //debugLog('custom', "해당 채팅을 읽었습니다.");
                                chatReadHub(chatArr[0]);
                                //debugLog('custom', 안읽음 카운트를 0으로 갱신해준다.(채팅방에 현재 들어와 있으므로));
                            }else{
                                //console.log("해당 채팅을 읽지않았습니다.");
                            }
                        }*/
                        let prevScrollHeight = $('#chat_messages')[0].scrollHeight;
                        //현재 최근 메시지 시간과 방금 수신한 메시지 시간이 같을시
                        let messageDt = chatArr[0].messageDt;
                        //console.log($('.message_content_container').last().find('.sender').val(), chatArr[0].sender.userCd, $('.message_content_container').last().find('.messageTime').val(), chatArr[0].messageDt.substr(0, 16));
                        if($('.message_content_container').last().find('.sender').val() == chatArr[0].sender.userCd && $('.message_content_container').last().find('.messageTime').val() == chatArr[0].messageDt.substr(0, 16)){
                            //버블로 추가
                            $('.message_content_container').last().find('.bubble_container').append(bubbleMaker(chatArr[0]))
                        }else{
                            //통째 talk 단위로 추가
                            $('#chat_messages').append(talkMaker(chatArr,'Y'))
                        }
                        //수신 메시지가 본인이 송신한 것이거나 스크롤이 현재 맨 밑일때
                        //console.log(prevScrollHeight, Number($('#chat_messages').scrollTop() + innerHeight));
                        if ((localStorage.getItem('loginUserCd') == chatArr[0].sender.userCd) || prevScrollHeight-5 <= Number($('#chat_messages').scrollTop() + innerHeight)) {
                            //debugLog('custom', '스크롤을 아래로 내려준다.');
                            moveBottom();
                        }
                    }else{
                        //alarmMaker(chatArr[0])
                    }
                })
            }
        });
    }
}

// 키보드가 활성화된 상태인지 확인하기 위한 변수
let isKeyboardActive = false;

// 인풋 요소를 클릭했을 때 이벤트 리스너
$('#textInput').on('click', function() {
    isKeyboardActive = true;
});

/*// 문서 전체를 감싸는 외부 영역 클릭 시 이벤트 리스너
$(document).on('click', function(event) {
    // 인풋 요소가 아닌 다른 영역을 클릭했을 때 키보드를 숨김
    if (isKeyboardActive && !$(event.target).is('#sendmessage .msg')) {
        $('#sendmessage .msg').blur(); // 포커스 해제
        isKeyboardActive = false;
    }
});*/

// 터치 시작 이벤트 리스너 (모바일에서 터치 이벤트를 고려)
$(document).on('touchstart', function(event) {
    // 인풋 요소가 아닌 다른 영역을 터치했을 때 키보드를 숨김
    if (isKeyboardActive && !$(event.target).is('#sendmessage .msg')) {
        $('#sendmessage .msg').blur(); // 포커스 해제
        isKeyboardActive = false;
    }
});

function getChannelUserUnreadCountHub(){
    getChannelUserUnreadCount()
    .then((response) => {
        /*console.log('getChannelUserUnreadCountHub', response)*/
        if(response.data.result.unreadCount==0){
            $('.chat_header .unread_count').css('display','none');
        }else{
            $('.chat_header .unread_count').css('display','flex');
        }
        $('.chat_header .unread_count').html(response.data.result.unreadCount);
    })
}

function sendFcm(data){
    let fcmToken = localStorage.getItem('fcmToken');
    axios.post(CHAT_URL + '/fcm?fcmToken='+fcmToken, data)
    .then((response) => {
        console.log('sendFcm', response)
    })
}

function getChannelUserUnreadCount(){
    return axios.get(CHAT_URL + '/channeluser/unreadcount', {});
}

function blockCheckHub(p_chat){
    let booleanExpression = false;
    getChatFriend(p_chat)
    .then((response) => {
        console.log('blockCheckHub', response)
        if(response.data.result.friendArr.length==0){
            console.log('친구가 아닙니다.');
        }else{
            if(response.data.result.friendArr[0].blockYn=='Y'){
                console.log('차단된 사용자입니다.');
                booleanExpression = true;
            }
        }
        return booleanExpression;
    })
}

function getChatFriend(p_chat) {
    //console.log('getChat>>>>>>>>>>>>', p_chat)
    return new Promise((resolve, reject) => {
        axios.get(CHAT_URL + '/friends', {
            params: {
                friendUserCd: p_chat.userCd
            }
        })
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
}


//마지막 읽은 메시지 이후의 메시지들을 모두 읽음 처리 해주기 위한 함수
function channelReadHub() {
    //console.log('channelReadHub start')
    let channelReadPromise = channelRead($('#OPEN_CHANNEL_CD').val());
    channelReadPromise
    .then((response) => {
        //console.log("channelReadHubResp", response);
        let chat = response.data.result.prevLastChat;
        chat.transferType = 9;
        //console.log('이게 맞습니까?', chat)
        sendChat(chat);
    })
    //console.log('channelReadHub done')
}

//메시지 읽음 처리
function channelRead(p_channelCd) {
    //console.log('updateUnreadCount>>>>>>>>>>>>', p_channelCd)
    return new Promise((resolve, reject) => {
        axios.post(CHAT_URL +'/channel/read', {channelCd : p_channelCd})
        .then(response => {
            resolve(response)
        })
    })
}

//단일 메시지를 읽음 표시 해주기 위해 사용하는 함
function chatReadHub(p_chat) {
    //console.log('updateUnreadCountPerHub start')
    let chatReadPromise = chatRead(p_chat);
    chatReadPromise
    .then((response) => {
        //console.log("chatReadResp", response);
        let chat = response.data.result.chat;
        chat.domainCd = 1;
        chat.transferType = 9;
        sendChat(chat);
    })
    //console.log('updateUnreadCountPerHub done')
}

//메시지 읽음 처리
function chatRead(p_chat) {
    //console.log('chatRead>>>>>>>>>>>>', p_chat)
    return new Promise((resolve, reject) => {
        axios.post(CHAT_URL +'/chat/read', p_chat)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error.response)
        });
    })
}

//마지막으로 읽은 메시지를 포함한 이후의 메시지들을 가져오는 함수
function getChatsAfterReadChat(p_chat) {
    //console.log('getChatsAfterReadChat>>>>>>>>>>>>', p_chat)
    return new Promise((resolve, reject) => {
        axios.get(CHAT_URL +'/chats/read', {params: {chatCd :p_chat.chatCd}})
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error.response)
        });
    })
}

function alarmMaker(p_chat){
    //console.log('alarmMaker>>>>>>>>>>>>', p_chat)
    let html = '';
    html+="<div class='alarm "+p_chat.chatCd+"' style='max-width: 400px; display:flex; border-radius: 5px; margin: 5px; background-color:white;' onclick='closeAlarm(this)'>"
    html+=		"<div style='width: 50px; height:50px; background:url(\""+p_chat.sender.userProfileImages[0].profileImgUrl+"\");background-size: cover; border-radius:5px;'></div>"
    html+=		"<div class='oneLine' style='padding: 10px; font-size: 15px; font-weight: 600;'>"+p_chat.message+"</div>"
    html+="</div>"

    $('#alarm_popup #chat_contents').prepend(html);

    setTimeout(function() {
        $(".alarm."+p_chat.chatCd).fadeOut('slow', function() {
            $(this).remove();
        });
    }, 5000);
}

//url 판별 함수
function isValidURL(str) {
    // URL 정규식
    var pattern = new RegExp('^(https?:\\/\\/)?' + // 프로토콜
        '((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+' + // 도메인 이름
        '([a-zA-Z]{2,}|(\\d{1,3}\\.){3}\\d{1,3}))' + // 최상위 도메인 레벨
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // 포트 번호 및 경로
        '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // 쿼리 매개변수
        '(\\#[-a-zA-Z\\d_]*)?$','i'); // 프래그먼트 식별자

    return pattern.test(str);
}

function moveBottom() {
    let scrollHeight = $('#chat_messages')[0].scrollHeight;
    $('#chat_messages').scrollTop(scrollHeight);
}

//메시지 전송 API 호출
function sendChatHub() {
    let message = document.getElementById("msg").value;
    let p_chatType = isValidURL(message)?'5' : '1'
    //console.log(message, message.length)
    if(message.trim().length==0){
        return;
    }
    //console.log('sendChatHub start', p_chatType)

    // chat 객체 생성
    let chat = new Object();
    chat.domainCd = 1; // 상점 코드
    chat.channelCd = $('#OPEN_CHANNEL_CD').val(); // 채널 코드
    chat.transferType = '4'; // 전송 타입
    chat.messageType = p_chatType; // 메시지 타입
    chat.message = message; // 메시지 내용

    // saveChat 함수 호출하여 메시지 저장하기
    let saveChatPromise = saveChat(chat)
    saveChatPromise
    .then((response) => {
        let result = response.data.result
        //console.log('saveChatResp', response)
        result.chat.domainCd = 1;
        // sendChat 함수 호출하여 메시지 전송하기
        sendChat(result.chat);
    })
    document.getElementById("msg").value = '';
    document.getElementById("msg").defaultValue = '';
}

function saveChat(p_chat) {
    //console.log('saveChat>>>>>>>>>>>>', p_chat)
    return new Promise((resolve, reject) => {
        axios.post(CHAT_URL +'/chat', p_chat, {})
        .then(response => {
            resolve(response)
        })
    })
}

//메시지코드로 메시지를 가져옴
function getChat(p_chat) {
    //console.log('getChat>>>>>>>>>>>>', p_chat)
    return new Promise((resolve, reject) => {
        axios.get(CHAT_URL + '/chat', {params: {chatCd: p_chat.chatCd}})
        .then(response => {
            resolve(response)
        })
    });
}

//메시지 리스트를 새로고침 하기 위한 함수
function loadChatListHub(p_channelCd, p_openYn) {
    $('#chat_messages').off('scroll')
    //console.log('loadChatListHub start')
    //새로 열리는 채팅방일 경우엔 현재 페이지를 0으로 세팅한다.
    let noMore = false;
    if (p_openYn == 'Y') {
        $("#chat_room_view input[name='current_page_num']").val(0)
        $("#chat_messages").html('');
    }

    const loadChatListPromise = loadChatList(p_channelCd);
    loadChatListPromise
    .then((response) => {
        //console.log("loadChatListResp", response)
        //이전 메시지가 prepend 되어지기 전 스크롤 총 길이
        let prevScrollHeight = $('#chat_messages')[0].scrollHeight;

        let chatArr = response.data.result.chatArr;
        let talkMakerHubPromise = talkMakerHub(chatArr);
        talkMakerHubPromise
        .then(() => {
            channelReadHub();
            $('#chat_messages').scroll(function() {
                let scrollHeight = $('#chat_messages')[0].scrollHeight;
                //console.log('scroll>>>>>>>>>>>>',scrollHeight)
                let current_page_num = $("#chat_room_view input[name='current_page_num']").val()
                let scrollTop = $('#chat_messages').scrollTop();

                if (!noMore) {
                    if (scrollTop == 0) {
                        //스크롤이 맨 위일때 뭐할지 여기에 정의 시작
                        $("#chat_room_view input[name='current_page_num']").val(Number(current_page_num) + Number(1))
                        loadChatListHub(p_channelCd);
                        noMore = (true);
                    }
                }
            });
            if (p_openYn == 'Y') {//새로 열리는 채팅방일 경우엔 맨 아래쪽 리스트로 이동시킨다.
                moveBottom();
                //console.log('loadChatListHub done')
            } else {//이전 메시지 로딩일 경우에는 이전 메시지가 prepend 되어지기 전의 스크롤 위치로 스크롤 위치를 복구 시킨다.
                let currentScrollHeight = $('#chat_messages')[0].scrollHeight;
                $('#chat_messages').scrollTop(currentScrollHeight - prevScrollHeight); //현재 스크롤 총 높이에서 이전 스크롤 총 높이를 빼서 추가된 스크롤 만큼 스크롤 위치 다시 이동
            }
        })
        //로딩 되어진 메시지가 세팅된 사이즈보다 작을 경우 더이상 로딩되지 않게 한다.
        if (chatArr.length < 20) {
            noMore = true;
        }
    })
}

//메시지 리스트를 불러온다.
function loadChatList(p_channelCd) {
    //console.log('loadChatList>>>>>>>>>>>>')
    let p_page = $("#chat_room_view input[name='current_page_num']").val();
    return new Promise((resolve, reject) => {
        axios.get(CHAT_URL + '/chats?size=100&page=' + p_page + '&channelCd=' + p_channelCd, {})
        .then(response => {
            //console.log('loadChatListResp', response)
            resolve(response);
        })
        .catch(error => {
            reject(response)
        })
    });
}
async function talkMakerHub(chatArr) {
    //console.log('talkMakerHub start', chatArr)

    let bubbleArr = new Array();
    for (let i = 0; i < chatArr.length; i++) {
        if(i==0){
            //console.log(i,chatArr[i],0)
            bubbleArr.push(chatArr[i]);
            if(chatArr.length==1){
                await $('#chat_messages').prepend(talkMaker(bubbleArr));
            }
        }else{
            if(chatArr[i-1].sender.userCd == chatArr[i].sender.userCd && chatArr[i-1].messageDt.substr(0, 16) == chatArr[i].messageDt.substr(0, 16)){
                bubbleArr.push(chatArr[i]);
                if(i == chatArr.length-1){
                    await $('#chat_messages').prepend(talkMaker(bubbleArr));
                }
            }else{
                await $('#chat_messages').prepend(talkMaker(bubbleArr));
                bubbleArr = new Array();
                bubbleArr.push(chatArr[i]);
                if(i == chatArr.length-1){
                    await $('#chat_messages').prepend(talkMaker(bubbleArr));
                }
            }
        }
    }
}

function dateMaker(p_date){
    //console.log(p_date)
    let html ='';
    html+="<div style='width:100%; display: flex;justify-content: center;'><div style=''>"+p_date+"</div></div>"
    return html
}

//talk 세팅을 위한 함수
function talkMaker(chatArr, singleMessageYn) {
    //console.log(chatArr[0].messageDt.substr(0, 10),$('#chat-messages div.message').first().find('.messageDate').val());
    if(singleMessageYn=='Y'){
        //console.log('현재보내온 메시지 날짜 : ',chatArr[0].messageDt.substr(0, 10), '마지막 메시지 날짜 : '+ $('#chat-messages div.message').last().find('.messageDate').val())
        if(chatArr[0].messageDt.substr(0, 10)!=$('#chat-messages div.message').last().find('.messageDate').val()){
            $('#chat-messages').append(dateMaker(chatArr[0].messageDt.substr(0, 10)));
        }
    }else{
        //console.log('현재보내온 메시지 날짜 : ',chatArr[0].messageDt.substr(0, 10), '첫번째 메시지 날짜 : '+ $('#chat-messages div.message').first().find('.messageDate').val(), $('#chat-messages div.message').first().find('.messageDate').val())
        if(chatArr[0].messageDt.substr(0, 10)!=$('#chat-messages div.message').first().find('.messageDate').val()&&$('#chat-messages div.message').first().find('.messageDate').val()){
            $('#chat-messages').prepend(dateMaker($('#chat-messages div.message').first().find('.messageDate').val()));
        }
    }
    //console.log('talkMaker>>>>>>>>>>>>',chatArr)
    //현재 세션에 로그인 한 사람
    var loginUserCd = localStorage.getItem('loginUserCd')
    var chatStr = '';
    //로그인 한 클라이언트와 타 클라이언트를 분류하기 위함
    if (loginUserCd == chatArr[0].sender.userCd) {
        chatStr += "<div class='message right'>";
        chatStr += "	<input type='hidden' class='messageDate' value='"+chatArr[0].messageDt.substr(0, 10)+"'/>"
        chatStr += "	<div class='message_content_container'>";
        chatStr += "		<div style='display:flex; flex-direction:column;'>"
        chatStr += "		    <div class='bubble_container' style='display:flex; flex-direction:column; align-items:flex-end;'>"
        for(let i=chatArr.length-1; i>=0; i--){
            chatStr += bubbleMaker(chatArr[i]);
        }
        chatStr += "		    </div>";
        chatStr += "		</div>";
        chatStr += "	</div>";
        chatStr += "	<span class='' style='display:block; font-size:12px;'>" + formatDate(chatArr[0].messageDt) + "</span>"
        chatStr += "</div>";
    } else {
        chatStr += "<div class='message'>";
        chatStr += "	<input type='hidden' class='messageDate' value='"+chatArr[0].messageDt.substr(0, 10)+"'/>"
        chatStr += "	<div class='message_content_container'>";
        let imgUrl;
        let profileImgUrl = chatArr[0].sender.userProfileImages[0].profileImgUrl;
        if(profileImgUrl.indexOf('image/profile') == 0){
            //console.log('기본', profileImgUrl, profileImgUrl.indexOf('image/profile'))
            imgUrl = profileImgUrl;
        }else{
            //console.log('기본아님', profileImgUrl, profileImgUrl.indexOf('image/profile'))
            imgUrl = 'http://www.aflk-chat.com:8000/file-storage/display?fileLocation='+profileImgUrl;
        }

        //if(chatArr[0].sender.userProfileImages[0]){
        //    chatStr += "	<img src='http://www.aflk-chat.com:8000/file-storage/display?"+chatArr[0].sender.userProfileImages[0].profileImgUrl+"' style='width:40px;height:40px;object-fit:cover;'>";
        //}else{
        //    chatStr += "	<img src='image/face_common.jpg' style='width:40px;height:40px;object-fit:cover;'>";
        //}
        chatStr += "	<img src='"+imgUrl+"' style='width:40px;height:40px;object-fit:cover;'>";
        chatStr += "		<div style='display:flex; flex-direction:column;'>"
        chatStr += "			<div style='margin-top:10px;'>"
        chatStr += 					chatArr[0].sender.userNickNm? chatArr[0].sender.userNickNm : chatArr[0].sender.userNm;
        chatStr += "			</div>"
        chatStr += "		    <div class='bubble_container' style='display:flex; flex-direction:column; align-items:flex-start;'>"
        for(let i=chatArr.length-1; i>=0; i--){
            chatStr += bubbleMaker(chatArr[i]);
        }
        chatStr += "		    </div>"
        chatStr += "		</div>"
        chatStr += "	</div>";
        //chatStr += "	<span style='display:block;'>" + convertTimeFormat(chatArr[0].messageDt.substring(chatArr[0].messageDt.indexOf(" "), chatArr[0].messageDt.lastIndexOf(":"))) + "</span>"
        chatStr += "	<span style='display:block; font-size:12px;'>" + formatDate(chatArr[0].messageDt) + "</span>"
        chatStr += "</div>";
    }
    return chatStr;
}
function createThumbnailDom(url, target, maxWidth, maxHeight, callback) {
    if(url.indexOf('https://')<0&&url.indexOf('http://')<0){
        url = 'https://'+url
    }
    // JSONP 호출을 위한 URL 생성
    const jsonpUrl = '/metadata?url='+encodeURIComponent(url)+'&target='+target+'&maxWidth='+maxWidth+'&maxHeight='+maxHeight+'&callback='+callback;

    // JSONP 호출
    const script = document.createElement('script');
    script.src = jsonpUrl;
    document.head.appendChild(script);
}

// JSONP 콜백 함수
function handleCreateThumbnailResponse(response) {
    //console.log('handleCreateThumbnailResponse', response)
    let html = "";
    html+=	"<div style='display:flex;flex-direction: column;'>"
    html+=		"<p style='font-weight:600; font-size: 16px; color: #597a96;'>"+response.title+"</p>";
    html+= 		"<a href='"+response.url+"' target='_blank' style='display:flex; justify-content:center;align-items:center;'>";
    html+= 			"<img src="+response.imageUrl+" alt='Thumbnail for "+response.imageUrl+"' style='max-width:150px; width:auto; border-radius: 5%;'/>";
    html+= 		"</a>";
    html+=		"<div class='oneLine' style='color:black;'>"+response.url+"</div>"
    html+=	"</div>"
    $('.bubble_box.'+response.target).find('.urlThumbnail').append(html)
}

function createImageDom(chat){
    let html = "";
    html+=	"<div style='display:flex;flex-direction: column;'>"
    html+= 		"<a href='"+chat.message+"' target='_blank' style='display:flex; justify-content:center;align-items:center;'>";
    html+= 			"<img src='"+chat.message+"' style='max-width:150px; width:auto; border-radius: 5%;'/>";
    html+= 		"</a>";
    html+=	"</div>"
    return html
}

function createMovieDom(chat){
    let html = "";
    html+=	"<div style='display:flex;flex-direction: column;'>"
    html+= 		"<video controls autoplay width='100%' height='100%' loop poster='' controlsList='nodownload'>";
    html+= 		    "<source src="+chat.message+"/>"
    html+=		"</video>"
    html+=	"</div>"
    return html
}

//채팅 내용 생성하기 위한 함수(시간별로 talk에 묶임)
function bubbleMaker(chat) {
    //console.log('bubbleMaker>>>>>>>>>>>>',chat)
    //현재 세션에 로그인 한 사람
    var loginUserCd = localStorage.getItem('loginUserCd')
    var chatStr = '';
    //로그인 한 클라이언트와 타 클라이언트를 분류하기 위함
    if (loginUserCd == chat.sender.userCd) {
        chatStr += "<div class='bubble_box "+chat.chatCd+"'>";
        chatStr += " 	<div class='unread_count_container'>";
        chatStr += " 		<div class='unread_count' style='"+(chat.unreadCount==0?"display:none;":"")+"'>";
        chatStr += 				chat.unreadCount;
        chatStr += " 		</div>";
        chatStr += " 	</div>";
        chatStr += "	<div class='bubble'>";
        if(chat.messageType==2){
            chatStr += 		createImageDom(chat)
        }else if(chat.messageType==3){
            chatStr += 		createMovieDom(chat)
        }else if(chat.messageType==4){
            chatStr +=		"<a href='javascript:downloadFile(\""+chat.message+"\");'>"+chat.message+"</a>"
        }else if(chat.messageType==5){
            createThumbnailDom(chat.message, chat.chatCd, 200, 200,'handleCreateThumbnailResponse')
            chatStr += 		"<div class='urlThumbnail'></div>"
        }else{
            chatStr += 		chat.message.replace(/(?:\r\n|\r|\n)/g,'<br/>');
        }
        chatStr += "		<div class='corner'></div>";
        chatStr += "		<input type='hidden' class='chatCd' style='display:none;' value='"+chat.chatCd+"'>"
        chatStr += "		<input type='hidden' class='sender' style='display:none;' value='"+chat.sender.userCd+"'>"
        chatStr += "		<input type='hidden' class='messageDt' style='display:none;' value='"+chat.messageDt+"'>"
        chatStr += "		<input type='hidden' class='messageTime' style='display:none;' value='"+chat.messageDt.substr(0, 16)+"'>"
        chatStr += "	</div>";
        chatStr += "</div>";
    } else {
        chatStr += "<div class='bubble_box "+chat.chatCd+"'>";
        chatStr += "	<div class='bubble'>";
        if(chat.messageType==2){
            chatStr += 		createImageDom(chat)
        }else if(chat.messageType==3){
            chatStr += 		createMovieDom(chat)
        }else if(chat.messageType==4){
            chatStr +=		"<a href='javascript:downloadFile(\""+chat.message+"\");'>"+chat.message+"</a>"
        }else if(chat.messageType==5){
            createThumbnailDom(chat.message, chat.chatCd, 200, 200,'handleCreateThumbnailResponse')
            chatStr += 		"<div class='urlThumbnail'></div>"
        }else{
            chatStr += 		chat.message.replace(/(?:\r\n|\r|\n)/g,'<br/>');
        }
        chatStr += "		<div class='corner'></div>";
        chatStr += "		<input type='hidden' class='chatCd' style='display:none;' value='"+chat.chatCd+"'>"
        chatStr += "		<input type='hidden' class='sender' style='display:none;' value='"+chat.sender.userCd+"'>"
        chatStr += "		<input type='hidden' class='messageDt' style='display:none;' value='"+chat.messageDt+"'>"
        chatStr += "		<input type='hidden' class='messageTime' style='display:none;' value='"+chat.messageDt.substr(0, 16)+"'>"
        chatStr += "	</div>";
        chatStr += " 	<div class='unread_count_container'>";
        chatStr += " 		<div class='unread_count' style='"+(chat.unreadCount==0?"display:none;":"")+"'>";
        chatStr += 				chat.unreadCount;
        chatStr += " 		</div>";
        chatStr += " 	</div>";
        chatStr += "</div>";
    }
    return chatStr;
}