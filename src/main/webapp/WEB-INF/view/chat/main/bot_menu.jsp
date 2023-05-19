<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 4:14
--%>
<div id="botmenu">
    <span class="chat_header friends" onclick="initFriendTab();">
        <img src="image/users.svg"/>
    </span>
    <span class="chat_header chats">
        <img src="image/message.svg" onclick="myChannelList('0')"/>
    </span>
    <span class="chat_header more_info">
        <img src="image/more_info.svg" onclick=""/>
    </span>
</div>
