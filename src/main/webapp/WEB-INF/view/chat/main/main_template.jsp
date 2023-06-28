<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 4:21
--%>
<style>

</style>
<div id="tab_container">
    <%-- 어플리케이션 탑 메뉴 Start --%>
    <jsp:directive.include file="top_menu.jsp"/>
    <%-- 어플리케이션 탑 메뉴 End --%>
    <script src="js/main/friend_list.js<%= version %>" type="text/javascript"></script>
    <script src="js/main/channel_list.js<%= version %>" type="text/javascript"></script>

    <div id="friend_list_container" class='list_container' style=''>
        <jsp:directive.include file="../popup/search_user.jsp"/>
        <input type='hidden' name='current_page_num' value='0'/>
        <div class='friend_list'></div>
    </div>
    <div id="channel_list_container" class='list_container' style=''>
        <input type='hidden' name='current_page_num' value='0'/>
        <div class='channel_list'></div>
    </div>
    <div id="user_info_container" class='list_container' style='display:none; background-color:white;'>
        <jsp:directive.include file="user_info.jsp"/>
    </div>

    <%-- 어플리케이션 바텀 메뉴 Start --%>
    <jsp:directive.include file="bot_menu.jsp"/>
    <%-- 어플리케이션 바텀 메뉴 끝 End --%>
</div>