<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 4:14
--%>
<script>
    function initAvatarTab() {
        alert('준비중입니다.')
    }
</script>
<div id="botmenu">
    <span class="chat_header avatarMode" onclick='initAvatarTab();'>
        <i class="bi bi-person-heart"></i>
    </span>
    <span class="chat_header friends" onclick="initFriendTab();">
        <%--<img src="image/users.svg"/>--%>
        <i class="bi bi-people-fill"></i>
    </span>
    <span class="chat_header chats" onclick="initChannelTab();" style="font-size:20px;">
        <%--<img src="image/message.svg"/>--%>
        <i class="bi bi-chat-fill"></i>
    </span>
    <span class="chat_header more_info" onclick='initUserInfoTab();'>
        <%--<img src="image/more_info.svg" onclick=""/>--%>
        <i class="bi bi-three-dots"></i>
    </span>
</div>
