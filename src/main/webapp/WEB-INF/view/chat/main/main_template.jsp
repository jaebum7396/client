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
    <script src="js/main/main_friend_list.js" type="text/javascript"></script>
    <script src="js/main/main_channel_list.js" type="text/javascript"></script>

    <div id="friend_list_container" class='list_container' style=''>
        <div id = 'search_user_container' style=''>
            <input type='hidden' name='current_page_num' value='0'/>
            <div class='search_input' style='display:flex;'>
                <input type='text' style='margin:5px; padding:5px; width: 100%; border: 1px solid #f18a1c; border-radius:5px;' onkeyup='search(0)'/>
                <%--<button style='margin:5px; padding:5px; width: 20%;'>검색</button>--%>
            </div>
            <div id = 'search_user_list'>
            </div>
        </div>
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