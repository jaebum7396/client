<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 3:54
--%>
<div class="left_side_btn"></div>
<div onclick="history.back();" class="page_cover"></div>
<div id="menu">
    <ul class="nav">
        <li>
            <div onclick="history.back();" class="close"></div>
        </li>
        <li>
            <a>
                <div class='channel_user_btn'>대화상대</div>
                <div class='channel_user_add_btn' style='' onclick="inviteList('0')">
                    <img class='channel_user_add_btn_img' src="image/close.png" style=''/>
                </div>
            </a>
            <ul class="channel_user_list">
            </ul>
        </li>
    </ul>
</div>
