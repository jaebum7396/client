<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="ko">
    <head>
        <title>app - chat</title>
        <jsp:directive.include file="../common/head.jsp"/>
        <!-- CSS -->
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
        <link href="css/app.css<%= version %>" rel="stylesheet" type="text/css"/>
        <script src="js/app.js<%= version %>" type="text/javascript"></script>
        <script src="js/stomp.js<%= version %>" type="text/javascript"></script>
    </head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-D5DTCR537R"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-D5DTCR537R');
    </script>
    <script>
        // 로그인 체크
        if (!localStorage.getItem("token")) {
            location.href = "login";
        }
    </script>
    <div class="loading-container">
        <div class="loading"></div>
    </div>
    <div id='loadingCover' style=''>
        <div id="circonf"></div>
        <div id='loadingText'>Loading...</div>
    </div>
    <div id='alarm_popup' style='position:absolute;bottom:0;right:0;z-index:9999;'>
        <div id='chat_contents'></div>
    </div>
    <body>
        <div id="chatbox">
            <%--main_template Start--%>
            <jsp:directive.include file="main/main_template.jsp"/>
            <%--main_template End--%>
            <%--room_template Start--%>
            <jsp:directive.include file="room/room_template.jsp"/>
            <%--room_template End--%>
        </div>
        <jsp:directive.include file="popup/profile.jsp"/>
    </body>
    <script src="js/loading.js<%= version %>" type="text/javascript"></script>
    <link href="css/loading.css<%= version %>" rel="stylesheet" type="text/css"/>
</html>