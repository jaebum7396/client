<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 4:21
--%>
<div id="tab_container">
    <%-- 어플리케이션 탑 메뉴 Start --%>
    <jsp:directive.include file="top_menu.jsp"/>
    <%-- 어플리케이션 탑 메뉴 End --%>
    <input type='hidden' name='current_page_num' value='0'/>

    <div id="friend_list_container" class='list_container' style=''></div>
    <div id="channel_list_container" class='list_container' style=''></div>

    <%-- 어플리케이션 바텀 메뉴 Start --%>
    <jsp:directive.include file="bot_menu.jsp"/>
    <%-- 어플리케이션 바텀 메뉴 끝 End --%>
</div>