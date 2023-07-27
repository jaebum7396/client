<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.core.env.*" %>
<%
//**********************************************************************************
// ○ 파일	: page_head
// ● 설명	: 페이지 공통 head
//**********************************************************************************
String version = "?v=20230720.1"; // CSS 나 JS 수정 후 업데이트 해줄것
WebApplicationContext context = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
Environment env = context.getEnvironment();

String FCM_TOKEN = request.getParameter("fcmToken");

String BACKEND_URL = env.getProperty("backend.url");
String CURRENT_PROFILE = env.getProperty("spring.profiles.active");
System.out.println("CURRENT_PROFILE : " + CURRENT_PROFILE);
String USER_URL = env.getProperty("api.user.url");
System.out.println("USER_URL : " + USER_URL);
String CHAT_URL = env.getProperty("api.chat.url");
System.out.println("CHAT_URL : " + CHAT_URL);
String FILE_STORAGE_URL = env.getProperty("api.file-storage.url");
System.out.println("FILE_STORAGE_URL : " + FILE_STORAGE_URL);
String SOCKET_STREAM_URL = env.getProperty("api.socket-stream.url");
System.out.println("SOCKET_STREAM_URL : " + SOCKET_STREAM_URL);
String GPT_CONNECTOR_URL = env.getProperty("api.gpt-connector.url");
System.out.println("GPT_CONNECTOR_URL : " + GPT_CONNECTOR_URL);
%>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="description" content="" />
<meta name="author" content="" />
<link href="image/favicon.png" rel="icon" type="image/x-icon">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">

<%-- 폰트 --%>
<%--<script	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js<%= version %>"></script>--%>
<script src="/webjars/jquery/1.11.1/jquery.min.js<%= version %>"></script>
<script src="/webjars/axios/0.21.1/dist/axios.min.js<%= version %>"></script>
<%--웹소켓관련--%>
<script src="/webjars/sockjs-client/1.5.1/sockjs.min.js<%= version %>"></script>
<script src="/webjars/stomp-websocket/2.3.4/stomp.min.js<%= version %>"></script>
<%--cropper.js--%>
<script src="https://unpkg.com/cropperjs/dist/cropper.js<%= version %>"></script>
<link rel="stylesheet" href="https://unpkg.com/cropperjs/dist/cropper.css<%= version %>">
<%--swiper.js--%>
<script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js<%= version %>"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css<%= version %>"/>
<%--<script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>--%>

<script>
    const CURRENT_PROFILE = '<%=CURRENT_PROFILE%>';
    const FCM_TOKEN = '<%=FCM_TOKEN%>'
    localStorage.setItem('FCM_TOKEN', FCM_TOKEN);
    const BACKEND_URL = '<%=BACKEND_URL%>';
    const USER_URL = '<%=USER_URL%>';
    const CHAT_URL = '<%=CHAT_URL%>';
    const FILE_STORAGE_URL = '<%=FILE_STORAGE_URL%>';
    const SOCKET_STREAM_URL = '<%=SOCKET_STREAM_URL%>';
    const GPT_CONNECTOR_URL = '<%=GPT_CONNECTOR_URL%>';
</script>
