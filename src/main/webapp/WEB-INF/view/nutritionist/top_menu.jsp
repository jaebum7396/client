<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2024-03-19
  Time: 오후 4:14
--%>
<style>
    #topmenu {
        position:fixed;
        display: flex;
        justify-content: space-between;
        z-index:9998;
        width: 100%;
        border-bottom: 1px solid #e7ebee;
    }

    #topmenu span {
        float: left;
    }

    .app_header_menu .app_header{
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        margin: 10px;
        cursor: pointer;
        height: 24px;
    }

    .app_header_menu .app_header i{
        font-size:22px;
        color : red;
        font-weight: 800;
    }
</style>
<div id="topmenu">
    <div id='app_title_container'>
        <div id="app_title_img" class='app_title'>
            <img src="../common/image/favicon.png" style='width:25px;'/>
        </div>
        <div id="app_title"class='app_title'>
            <div id="app_title_text"></div>
        </div>
    </div>
    <div class="app_header_menu">
        <span class="app_header user_add">
            <img src="image/user_add.svg"/>
        </span>
        <span class="app_header settings">
            <img src="image/settings.svg"/>
            <ul class='dropdown-list'>
                <li onclick=''>리스트</li>
                <li onclick=''>리스트</li>
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

