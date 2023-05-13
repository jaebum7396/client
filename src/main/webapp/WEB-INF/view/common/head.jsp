<%@ page import="org.springframework.beans.factory.annotation.Value" %>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%
//**********************************************************************************
// ○ 파일	: page_head
// ● 설명	: 페이지 공통 head
//**********************************************************************************
String version = "?v=20230102.1"; // CSS 나 JS 수정 후 업데이트 해줄것
ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(application);
String BACKEND_URL = context.getBean("${backend.url}", String.class);
%>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="description" content="" />
<meta name="author" content="" />
<link href="/common/image/favicon.ico" rel="icon" type="image/x-icon">

<%-- 폰트 --%>
<%--<script	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js<%= version %>"></script>--%>
<script src="/webjars/jquery/1.11.1/jquery.min.js"></script>
<script src="/webjars/axios/0.21.1/dist/axios.min.js"></script>
<script src="/webjars/sockjs-client/1.5.1/sockjs.min.js"></script>
<script src="/webjars/stomp-websocket/2.3.4/stomp.min.js"></script>
<script>
    const backendUrl = '<%=BACKEND_URL%>>';
</script>
