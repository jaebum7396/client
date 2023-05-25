<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 3:54
--%>
<script src="js/room/chat.js" type="text/javascript"></script>
<div id="chatview" class="p1">
    <input type='hidden' name='current_page_num' value='0'/>
    <div id="chat_header">
        <!-- 사이드메뉴 -->
        <jsp:directive.include file="left_side_menu.jsp"/>
        <!-- 사이드메뉴 끝 -->
        <div id='channel_alias' style='font-weight: 800; font-size: 15px;'>
        </div>
        <div id="close_chat" style='margin-left: 10px;'>
            <div class="close_chat close" style='width:50px;'>
            </div>
        </div>
    </div>
    <div id='chat-message-box' style='height: calc(100% - 130px);'>
        <div id="chat-messages" style='height: 100%;'></div>
    </div>
    <div id="sendmessage">
        <input type="text" id='msg' class='msg' value="Send message..."/>
        <button id="send" onclick="sendChatHub()"></button>
    </div>
</div>
