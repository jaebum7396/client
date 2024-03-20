<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 4:21
--%>
<script>
    initPage();
    function initPage() {
        $('.dropdown-list').removeClass('openToggle');
    }
</script>

<div id="layout"> <%--tab_container--%>
    <%-- 어플리케이션 탑 메뉴 Start --%>
    <jsp:directive.include file="top_menu.jsp"/>
    <%-- 어플리케이션 탑 메뉴 End --%>

    <%-- 어플리케이션 메인 메뉴 Start --%>
    <jsp:directive.include file="main_menu.jsp"/>
    <%-- 어플리케이션 메인 메뉴 End --%>

    <%-- 어플리케이션 바텀 메뉴 Start --%>
    <jsp:directive.include file="bot_menu.jsp"/>
    <%-- 어플리케이션 바텀 메뉴 끝 End --%>
</div>