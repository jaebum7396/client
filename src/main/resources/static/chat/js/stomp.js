const clientDomainCd = 1;

var sock;
var wsClient;
var reconnect;

//웹소켓 연결
var websocket;
function webSocketConnectHub() {
	console.log('webSocketConnectHub start')
	
	sock = new SockJS(SOCKET_STREAM_URL+"/ws-stomp");
	sock.onopen = function () {
		// 연결이 열리면 실행되는 코드
		// 헤더를 설정할 수 있습니다.
		let transport = sock._transport;
		transport.xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
	}
	wsClient = Stomp.over(sock);
	reconnect = 0;
	
	wsClient.connect({Authorization : localStorage.getItem("token")}, function (frame) {
		//메인 채널 구독
		//stompSubscribe(clientDomainCd, 0)
		
		wsClient.subscribe("/user/direct/"+clientDomainCd, function (message) {
			console.log('connect.user-pool', message);
			let recv = JSON.parse(message.body);
			onMessage(recv);
		});
		
		let loadMyChannelPromise = loadMyChannel();
		loadMyChannelPromise
		.then((response) => {
			let channelList = response.result.channelList;
			console.log(channelList)
			for(let i = 0; i<channelList.length; i++){
				stompSubscribe(clientDomainCd, channelList[i].channelCd)
			}
		})
		.catch((response) => {
			console.log(response);
		})
		
	}, function (error) {
		if (reconnect++ <= 5) {
			setTimeout(function () {
				console.log("connection reconnect : "+ error);
				sock = new SockJS(SOCKET_STREAM_URL+"/ws-stomp?userCd="+$('#LOGIN_USER_CD').val());
				wsClient = Stomp.over(sock);
				reconnect = 0;
			}, 10 * 1000);
		}
	});
}

// Set 객체 생성 (구독 정보를 저장하기 위한 Set)
var subscriptionSet = new Set();

function stompSubscribe(domainCd, channelCd) {
  	const channel = "/sub/channel/" + domainCd + "/" + channelCd;

  	// 중복 구독 체크
  	if (isDuplicateSubscription(channelCd)) {
    	console.log('중복 구독입니다.', channelCd);
    	return; // 중복 구독일 경우 함수를 종료합니다.
  	}

  	// 구독 요청 메시지 전송
  	wsClient.send(
    	"/pub/enter",
    	{},
    	JSON.stringify({
      		transferType: 1,
      		domainCd: domainCd,
      		channelCd: channelCd,
      		userCd: $('#LOGIN_USER_CD').val()
    	})
  	);

  	// 구독 처리
  	console.log('신규 구독입니다.', channel);
  	console.log('먼저 기존 구독 채널 제거');
  	unsubscribe(channelCd);
  	let subscription = wsClient.subscribe(channel, function (message) {
    	console.log('connect.subscribe', message);
    	let recv = JSON.parse(message.body);
    	onMessage(recv);
  	});

  	// 구독 정보 저장
  	subscriptionSet.add({ channelCd: channelCd, subscription: subscription });
}

// 구독 해제 함수
function unsubscribe(channelCd) {
  // Set에서 해당 channelCd에 맞는 구독 정보 찾기
  subscriptionSet.forEach(function (item) {
      if (item.channelCd == channelCd) {
		  console.log('현재구독채널',channelCd, item.channelCd);	  
      	  // 해당 구독 정보를 Set에서 제거하고 구독을 해제
      	  subscriptionSet.delete(item);
      	  item.subscription.unsubscribe();
      }
   });
}

function isDuplicateSubscription(channelCd) {
	var chk = false;
	subscriptionSet.forEach(function (item) {
	    if (item.channelCd === channelCd) {
			chk = true;
    	}
  	});
  	return chk;
}

//채널 입장
function channelJoin(channelCd, channelUsers) {
	console.log('channelJoin>>>>>>>>>>>>', channelCd, channelUsers)
	
	for(let i=0; i<channelUsers.length; i++){
		if(channelUsers[i].userCd==$('#LOGIN_USER_CD').val()){
			stompSubscribe(clientDomainCd, channelCd)
		}else{
			let p_messageDTO = new Object();
			p_messageDTO.transferType = 99
			p_messageDTO.domainCd = clientDomainCd
			p_messageDTO.channelCd = channelCd
			p_messageDTO.toUserCd = channelUsers[i].userCd
			sendMessage(p_messageDTO);
		}
	}
}

function sendMessage(p_messageDTO) {
	console.log('sendMessage>>>>>>>>>>>>', p_messageDTO)
	wsClient.send(
		"/pub/message"
		, {}
		, JSON.stringify(p_messageDTO)
	);
}

//메시지 수신 
function onMessage(msg) {
	console.log('onMessage>>>>>>>>>>>>', msg)
	let innerHeight = $('#chat-messages').height();
	if (msg) {
		let data = msg;
		console.log('onMessageResp', data)
		if(data.transferType==3){
			//$('#WSS_KEY').val(data.objMap.wssKey);
		}else if(data.transferType == 9){
			console.log('읽음처리resp', data);
			// 현재 읽음처리 요청된 메시지의 메시지 코드보다 이후에 온 메시지들을 조회
			let getMessagesByMessageCdPromise = getMessagesByGreaterThanLastMessageCd(data);
			// 화면에 라스트 메시지 이후의 데이터들을 업데이트 해준다.
			getMessagesByMessageCdPromise
			.then((response) => {
				console.log('getMessagesByGreaterThanLastMessageCdResp', response);
				let updateMessageArr = response.result.messageArr;
				for(let i=0; i<updateMessageArr.length; i++){
					$('.bubble_box.'+updateMessageArr[i].messageCd).find('.unread_count').html(updateMessageArr[i].unreadCount)
					if(updateMessageArr[i].unreadCount==0){
						$('.bubble_box.'+updateMessageArr[i].messageCd).find('.unread_count').css('display','none');
					}
				}
			})
			.catch((response) => {
				console.log(response);
			})
		}else if(data.transferType == 99){
			console.log('채팅방 신규 개설', data);
			if(data.userCd!=$('#LOGIN_USER_CD').val()){
				stompSubscribe(data.domainCd, data.channelCd);
			}
		}else{
			//수신한 메시지를 조회한다.
			let getMessagesByMessageCdPromise = getMessagesByMessageCd(data)
			getMessagesByMessageCdPromise
			.then((response) => {
				console.log('getMessagesByMessageCdResp', response)
				let messageArr = response.result.messageArr;
				//채팅 목록이 활성화 되어 있을때
				if($('#channel_list_container').css('display')=='block'){
					let channelUsers = messageArr[0].channelInfo.channelUsers;
					let unreadCount = 0;
					for(let i =0; i<channelUsers.length; i++){
						//메시지 수신자 중 로그인한 유저코드와 같은 유저코드를 찾아서 안읽음 메시지 카운트 세팅
						if(channelUsers[i].userCd == $('#LOGIN_USER_CD').val()){
							unreadCount = channelUsers[i].unreadCount
						}
					}
					//채팅방이 있을때
					if($('.chat_row.'+messageArr[0].channelCd).length!=0){
						//수신한 최신 메시지를 미리보기에 세팅한다.
						$('.chat_row.'+messageArr[0].channelCd).find('.recent_message_container .recent_message').html(messageArr[0].message);
						$('.chat_row.'+messageArr[0].channelCd).find('.recent_message_container .recent_messageDt').html(messageArr[0].messageDt.substr(0, 16));
						//수신한 최신 메시지에 해당하는 채팅룸을 맨 위로 올린다.
						$('.chat_row.'+messageArr[0].channelCd).insertBefore($('#channel_list_container .chat_row')[0]);
						//안읽음 메시지 카운트를 미리보기에 세팅한다.
						$('.chat_row.'+messageArr[0].channelCd).find('.unread_count div').html(unreadCount);
						if(unreadCount==0){
							$('.chat_row.'+messageArr[0].channelCd).find('.unread_count_container .unread_count').css('display','none');
						}else{
							$('.chat_row.'+messageArr[0].channelCd).find('.unread_count_container .unread_count').css('display','flex');
						}
					}else{ //채팅방이 없을때
						$("#channel_list_container").append(channelMaker(messageArr[0].channelInfo));
					}
				}
				//채팅방이 활성화 되어 있을때 (현재 오픈되어 있는 채널코드가 수신 메시지의 채널코드와 같을 시)
				if ($('#OPEN_CHANNEL_CD').val() == messageArr[0].channelCd) {
					//수신 메시지가 본인이 송신한 것이 아닐때(로그인 유저와 송신유저가 다를때)
					if (($('#LOGIN_USER_CD').val() != messageArr[0].userCd)){
						//안읽음 카운트를 0으로 갱신해준다.(채팅방에 현재 들어와 있으므로)
						updateUnreadCountPerHub($('#LOGIN_USER_CD').val(), messageArr[0]);
					}
					let prevScrollHeight = $('#chat-messages')[0].scrollHeight;
					//현재 최근 메시지 시간과 방금 수신한 메시지 시간이 같을시
					if($('.message').last().find('.sender').val() == messageArr[0].userCd && $('.message').last().find('.messageTime').val() == messageArr[0].messageDt.substr(0, 16)){
						//버블로 추가
						$('.message').last().find('.bubble_container').append(bubbleMaker(messageArr[0]))
					}else{
						//통째 talk 단위로 추가
						$('#chat-messages').append(talkMaker(messageArr,'Y'))
					}
					//수신 메시지가 본인이 송신한 것이거나 스크롤이 현재 맨 밑일때
					if (($('#LOGIN_USER_CD').val() == messageArr[0].userCd) || prevScrollHeight == Number($('#chat-messages').scrollTop() + innerHeight)) {
						//스크롤을 아래로 내려준다.
						moveBottom();
					}
				}else{
					alarmMaker(messageArr[0])
				}
			})
			.catch((response) => {
				console.log(response);
			})
		}
	}
}