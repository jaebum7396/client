<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 4:21
--%>
<style>
    .list_container{
        margin-top: 44.8px;
        height: calc(100% - 112.6px);
        overflow-y: scroll;
    }
</style>
<div id="tab_container">
    <%-- 어플리케이션 탑 메뉴 Start --%>
    <jsp:directive.include file="top_menu.jsp"/>
    <%-- 어플리케이션 탑 메뉴 End --%>

    <div id="friend_list_container" class='list_container' style=''>
        <input type='hidden' name='current_page_num' value='0'/>
        <div class='friend_list'></div>
    </div>
    <div id="channel_list_container" class='list_container' style=''>
        <input type='hidden' name='current_page_num' value='0'/>
        <div class='channel_list'></div>
    </div>

    <%-- 어플리케이션 바텀 메뉴 Start --%>
    <jsp:directive.include file="bot_menu.jsp"/>
    <%-- 어플리케이션 바텀 메뉴 끝 End --%>
</div>