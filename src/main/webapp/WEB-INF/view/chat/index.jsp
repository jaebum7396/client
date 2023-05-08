<!doctype html>
<html lang="ko" xmlns:v-on="http://www.w3.org/1999/xhtml"
	xmlns:v-bind="http://www.w3.org/1999/xhtml">
<link rel="shortcut icon" href="#">
<head>
<title>Chat</title>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<!-- CSS -->
<script	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="/webjars/axios/0.21.1/dist/axios.min.js"></script>
<script src="/webjars/sockjs-client/1.5.1/sockjs.min.js"></script>
<script src="/webjars/stomp-websocket/2.3.4/stomp.min.js"></script>

<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'	rel='stylesheet' type='text/css'>
<link href="css/chat.css" rel="stylesheet" type="text/css" />
<script src="js/chat.js" type="text/javascript"></script>
</head>
<%@ page import="java.util.Enumeration, java.util.UUID"%>
<%@ page pageEncoding="UTF-8"%>
<%
String WSS_CD = UUID.randomUUID().toString();
String USER_CD = UUID.randomUUID().toString();
%>
<script>
	if(!localStorage.getItem("token")){
		location.href = "login";
	}
	function invite_list_close(){
		$('#invite_list_popup').css('display','none');
		leftSideMenuClose();
	}
</script>
<div id='alarm_popup' style='position:absolute;bottom:0;right:0;'>
	<div id='chat_contents'></div>
</div>

<div id='invite_list_popup' style='width:100%; height:100%; display:none; z-index:999999; position:absolute;'>
	<div id="chat_header" style='background-color:white;'>
		<div id="" style='margin-left: 10px;' onclick = "invite_list_close();">
			<div class="close_chat close" style='width:50px;'>
			</div>
		</div>
		<div style='margin:15px; margin-right:20px; font-weight:600; font-size: 15px;' onclick='openChannelWithUserHub("friend");'>
			확인
		</div>
	</div>
	<input type='hidden' name='current_page_num' value='0' />
	<div id="invite_list_container" style='height: calc(100% - 130px); overflow-y: scroll; background-color:white;'>
	</div>
	<div id="search">
		<input type="text" id="searchfield" value="Search contacts..." />
	</div>
</div>

<body style='display: flex; justify-content: center;'>
	<div id="chatbox">
		<input type='hidden' class='OPEN_CHANNEL_CD' id='OPEN_CHANNEL_CD' name='OPEN_CHANNEL_CD' value='' /> 
		<input type='hidden' class='WSS_KEY' id='WSS_KEY' name='WSS_KEY' value='<%= WSS_CD %>' />
		<input type='hidden' class='USER_CD' id='USER_CD' name='USER_CD' value='<%= USER_CD %>' />
		<div id="tab_container">
			<div id="topmenu">
				<span class="friends chat_header" onclick="myFriendList('0')">
					<img src="image/people_icon.png" />
				</span> <span class="chats chat_header"> <img
					src="image/sms_icon.png" onclick="myChannelList('0')" />
				</span>
				<!-- <span class="history chat_header">
					<img src="image/etc_icon.png" />
				</span> -->
			</div>
			<input type='hidden' name='current_page_num' value='0' />
			<div id="friend_list_container"
				style='height: calc(100% - 130px); overflow-y: scroll;'></div>
			<div id="channel_list_container"
				style='height: calc(100% - 130px); overflow-y: scroll;'></div>
			<div id="search">
				<input type="text" id="searchfield" value="Search contacts..." />
			</div>
		</div>
		<div id="chatview" class="p1">
			<input type='hidden' name='current_page_num' value='0' />
			<div id="chat_header">
				<!-- 사이드메뉴 -->
				<div class="left_side_btn"></div>
				<div onclick="history.back();" class="page_cover"></div>
				
				<div id="menu">
				   	<ul class="nav">
				   		<li><div onclick="history.back();" class="close"></div></li>
				    	<!-- <li><a href="#">메뉴1</a></li>
				    	<li><a href="#">메뉴2</a></li> -->
				    	<li>
				    		<a>
					    		<div class='channel_user_btn'>대화상대</div> 
					    		<div style='display: flex; text-align: center; align-items: center; z-index:9999;' onclick="inviteList('0')">
					    			<img src="image/close.png" style='width:25px;margin:10px;transform: rotate( 45deg );'/>
				    			</div>
				    		</a>
					    	<ul class="channel_user_list">
						    	<li><a href="#">서브 메뉴1</a></li>
						    	<li><a href="#">서브 메뉴2</a></li>
						    	<li><a href="#">서브 메뉴3</a></li>
						    	<li><a href="#">서브 메뉴4</a></li>
						    </ul>
					    </li>
				    </ul>
				
				</div>
				<!-- 사이드메뉴 끝 -->
				<div id='channel_alias' style='font-weight: 800; font-size: 15px;'>
				
				</div>
				<div id="close_chat" style='margin-left: 10px;'>
					<div class="close_chat close" style='width:50px;'>
					</div>
				</div>
				
				<!-- <p id='opponent_name' class='opponent_name'>Miro Badev</p>
				<span id='opponent_email' class='opponent_email'>miro@badev@gmail.com</span> -->
			</div>
			<div id='chat-message-box' style='height: calc(100% - 130px);'>
				<div id="chat-messages" style='height: 100%;'></div>
			</div>
			<div id="sendmessage">
				<input type="text" id='msg' class='msg' value="Send message..." />
				<button id="send" onclick="sendMessageHub()"></button>
			</div>
		</div>
	</div>
</body>
</html>