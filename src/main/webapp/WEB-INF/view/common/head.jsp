<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.core.env.*" %>
<%@ page import="java.util.stream.StreamSupport" %>
<%@ page import="java.util.Arrays" %>
<%
//**********************************************************************************
// ○ 파일	: page_head
// ● 설명	: 페이지 공통 head
//**********************************************************************************
String version = "?v=20230102.1"; // CSS 나 JS 수정 후 업데이트 해줄것
WebApplicationContext context = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
Environment env = context.getEnvironment();

//MutablePropertySources propSrcs = ((ConfigurableEnvironment) env).getPropertySources();
//StreamSupport.stream(propSrcs.spliterator(), false)
//        .filter(ps -> ps instanceof EnumerablePropertySource)
//        .map(ps -> ((EnumerablePropertySource) ps).getPropertyNames())
//        .flatMap(Arrays::<String>stream)
//        .forEach(propName -> System.out.println(propName + " = " + env.getProperty(propName)));

String BACKEND_URL = env.getProperty("backend.url");
String API_USER_URL = env.getProperty("api.user.url");
System.out.println("API_USER_URL : " + API_USER_URL);
String API_CHAT_URL = env.getProperty("api.chat.url");
System.out.println("API_CHAT_URL : " + API_CHAT_URL);
String API_FILE_STORAGE_URL = env.getProperty("api.file-storage.url");
System.out.println("API_FILE_STORAGE_URL : " + API_FILE_STORAGE_URL);
%>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="description" content="" />
<meta name="author" content="" />
<link href="image/favicon.png" rel="icon" type="image/x-icon">

<%-- 폰트 --%>
<%--<script	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js<%= version %>"></script>--%>
<script src="/webjars/jquery/1.11.1/jquery.min.js"></script>
<script src="/webjars/axios/0.21.1/dist/axios.min.js"></script>
<script src="/webjars/sockjs-client/1.5.1/sockjs.min.js"></script>
<script src="/webjars/stomp-websocket/2.3.4/stomp.min.js"></script>
<script>
    const BACKEND_URL = '<%=BACKEND_URL%>';
    const API_USER_URL = '<%=API_USER_URL%>';
    const API_CHAT_URL = '<%=API_CHAT_URL%>';
    const API_FILE_STORAGE_URL = '<%=API_FILE_STORAGE_URL%>';
</script>
