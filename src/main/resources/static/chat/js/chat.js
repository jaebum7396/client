const channelUrl = "http://192.168.0.8:9090";
const clientDomainCd = 1;
const clientUrl = "192.168.0.8:7089";
const mainUrl = window.location.href.split('http://')[1];

var sock = new SockJS(channelUrl+"/ws-stomp?userCd="+$('#USER_CD').val());
var wsClient = Stomp.over(sock);
var reconnect = 0;

if (mainUrl.indexOf('.com') > 0 || mainUrl.indexOf('.co.kr')) {
	requestDomain = mainUrl.split('/')[0] + '/' + mainUrl.split('/')[1];
} else {
	requestDomain = mainUrl.split('/')[0];
}

$(document).ready(function() {
	var preloadbg = document.createElement("img");
	preloadbg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png";

	$("#searchfield").focus(function() {
		if ($(this).val() == "Search contacts...") {
			$(this).val("");
		}
	});
	$("#searchfield").focusout(function() {
		if ($(this).val() == "") {
			$(this).val("Search contacts...");

		}
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
			sendMessageHub(document.getElementById("msg").value, isValidURL(document.getElementById("msg").value)?'5' : '1')
		}
	});
	wsClientConnectHub();
});

function wsClientConnectHub() {
	console.log('wsClientConnectHub start')
	wsClientConnect()
	console.log('wsClientConnectHub done')
}
function wsClientConnect() {
	wsClient.connect({}, function (frame) {
		let mainChannelCd = 0;
		let wssKey = $('#WSS_KEY').val();
		wsClient.subscribe("/sub/channel/"+clientDomainCd+"/"+0, function (message) {
			console.log('connect.subscribe', message);
			let recv = JSON.parse(message.body);
			recvMessage(recv);
		});
		wsClient.send(
			"/pub/message"
			, {}
			, JSON.stringify({
				transferType: 1
				,domainCd: clientDomainCd
				,channelCd: mainChannelCd
				,sender: wssKey
		}));
	}, function (error) {
		if (reconnect++ <= 5) {
			setTimeout(function () {
				console.log("connection reconnect");
				sock = new SockJS(channelUrl+"/ws-stomp");
				wsClient = Stomp.over(sock);
				wsClientConnect();
			}, 10 * 1000);
		}
	});
}
function sendMessage(channelCd, message) {
	let mainChannelCd = 0;
	let wssKey = $('#WSS_KEY').val();
	wsClient.send(
		"/pub/message"
		, {}
		, JSON.stringify({
			transferType: 4
			, domainCd: clientDomainCd
			, channelCd: channelCd
			, sender: wssKey
			, message: message
		})
	);
	document.getElementById("msg").value = ''; // 입력창 초기화
}
function recvMessage(msg){

	console.log(msg)
	alarmMaker(msg);
}
function alarmMaker(p_message){
	console.log('alarmMaker>>>>>>>>>>>>', p_message)
	let html = '';
	html+="<div class='alarm "+p_message.messageCd+"' style='max-width: 400px; display:flex; border-radius: 5px; margin: 5px; background-color:white;' onclick='closeAlarm(this)'>"
	//html+=		"<div style='width: 50px; height:50px; background:url(\""+p_message.userInfo.userProfile.profileImgUrl+"\");background-size: cover; border-radius:5px;'></div>"
	html+=		"<div class='oneLineAlarm' style='margin: 10px; font-size: 15px; font-weight: 600;'>"+p_message.message+"</div>"
	html+="</div>"

	console.log(html)

	$('#alarm_popup #chat_contents').prepend(html);

	setTimeout(function() {
		$(".alarm."+p_message.messageCd).fadeOut('slow', function() {
			$(this).remove();
		});
	}, 50000);
}
function findAllChannel() {

}
function createChannel() {

}
function enterChannel(channelCd) {

}
function findChannel(){

}
