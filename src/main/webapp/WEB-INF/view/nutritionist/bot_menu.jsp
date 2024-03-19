<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 4:14
--%>
<style>
    .bot_menu{
        position:fixed;
        display: flex;
        justify-content: space-around;
        height: 69px;
        width: 100%;
        bottom:0;
        box-shadow: 6px 6px 10px 4px rgba(226, 154, 22, 0.6);
    }
    .bot_menu_header{
        font-size:30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<div class="bot_menu">
    <span class="bot_menu_header avatarMode" onclick="">
        <i class="bi bi-person-heart"></i>
    </span>
    <span class="bot_menu_header friends" onclick="">
        <i class="bi bi-people-fill"></i>
    </span>
    <span class="bot_menu_header chats" onclick="" style="">
        <i class="bi bi-chat-fill"></i>
    </span>
    <span class="bot_menu_header more_info" onclick="">
        <i class="bi bi-three-dots"></i>
    </span>
</div>
