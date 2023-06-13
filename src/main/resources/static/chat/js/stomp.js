const clientDomainCd = 1;

var sock;
var wsClient;
var reconnect;

//웹소켓 연결
var websocket;
function webSocketConnectHub() {
	console.log('webSocketConnectHub start')
	sock = new SockJS(SOCKET_STREAM_URL+"/ws-stomp?Authorization="+localStorage.getItem("token"));
	sock.onopen = function () {
		// 연결이 열리면 실행되는 코드
		// 헤더를 설정할 수 있습니다.
		let transport = sock._transport;
		transport.xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
	}
	wsClient = Stomp.over(sock);
	reconnect = 0;
	
	wsClient.connect({'Authorization' : localStorage.getItem("token")}, function (frame) {
		//메인 채널 구독
		wsClient.subscribe("/user/direct/"+clientDomainCd, function (message) {
			console.log('connect.user-pool', message);
			let recv = JSON.parse(message.body);
			onMessage(recv);
		});
		
		let loadMyChannelPromise = loadMyChannel();
		loadMyChannelPromise
		.then((response) => {
			console.log("loadMyChannelResp", response);
			let channelArr = response.data.result.channelArr;
			for(let i = 0; i<channelArr.length; i++){
				stompSubscribe(clientDomainCd, channelArr[i].channelCd)
			}
		})
		.catch((response) => {
			console.log(response);
		})
		
	}, function (error) {
		if (reconnect++ <= 5) {
			setTimeout(function () {
				console.log("connection reconnect : "+ error);
				sock = new SockJS(SOCKET_STREAM_URL+"/ws-stomp?Authorization="+localStorage.getItem("token"));
				wsClient = Stomp.over(sock);
				reconnect = 0;
			}, 10 * 1000);
		}
	});
}

//현재 로그인 된 사용자의 모든 채널목록을 불러온다.
function loadMyChannel() {
	console.log('loadMyChannel>>>>>>>>>>>>');
	return new Promise(function (resolve, reject) {
		axios.get(CHAT_URL + '/channels?page=null&size=null', {
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
		"/pub/enter"
		, {'Authorization' : localStorage.getItem("token")}
    	, JSON.stringify({
      		transferType: 1,
      		domainCd: domainCd,
      		channelCd: channelCd,
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
		if(channelUsers[i].userCd==localStorage.getItem('loginUserCd')){
			stompSubscribe(clientDomainCd, channelCd)
		}else{
			let p_chat = new Object();
			p_chat.transferType = 99
			p_chat.domainCd = clientDomainCd
			p_chat.channelCd = channelCd
			p_chat.toUser = channelUsers[i].userCd
			sendChat(p_chat);
		}
	}
}

function sendChat(p_chat) {
	console.log('sendChat>>>>>>>>>>>>', p_chat)
	wsClient.send(
		"/pub/message"
		, {'Authorization' : localStorage.getItem("token")}
		, JSON.stringify(p_chat)
	);
}
