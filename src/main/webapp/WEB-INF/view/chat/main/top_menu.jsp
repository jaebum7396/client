<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 4:14
--%>
<div id="topmenu">
    <div id='app_title_container'>
        <div id="app_title_img" class='app_title'>
            <img src="../common/image/favicon.png" style='width:25px;'/>
        </div>
        <div id="app_title"class='app_title'>
            <div id="app_title_text">채팅</div>
        </div>
    </div>
    <div class="app_header_menu friend normal">
        <span class="app_header user_add" onclick="toggleSearchUserContainer()">
            <img src="image/user_add.svg"/>
        </span>
        <span class="app_header settings">
            <img src="image/settings.svg" onclick="dropdownToggle(this)"/>
            <ul class='dropdown-list'>
                <li onclick='initFriendTab("hide")'>숨김 친구 리스트</li>
                <li onclick='initFriendTab("block")'>차단 친구 리스트</li>
            </ul>
        </span>
    </div>
    <div class="app_header_menu friend hide">
        <span class="app_header settings">
            <i class="bi bi-x-circle" onclick="initFriendTab('normal')"></i>
        </span>
    </div>
    <div class="app_header_menu friend block">
        <span class="app_header settings">
            <i class="bi bi-x-circle" onclick="initFriendTab('normal')"></i>
        </span>
    </div>
</div>

