<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%
    //**********************************************************************************
// ○ 파일	: page_head.jsp
// ● 설명	: 페이지 공통 head
//**********************************************************************************
    String 리소스버젼 = "?v=20230102.1"; // CSS 나 JS 수정 후 업데이트 해줄것
%>
<title>TEST</title>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link href="/common/image/favicon.ico" rel="icon" type="image/x-icon">

<%-- 폰트 --%>
<jsp:directive.include file="font.jsp"/>

<script	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js<%= 리소스버젼 %>"></script>
<script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js<%= 리소스버젼 %>"></script>
<script src="login/js/login.js<%= 리소스버젼 %>" type="text/javascript"></script>
<link rel="stylesheet" href="/webjars/bootstrap/3.3.7/css/bootstrap.css<%= 리소스버젼 %>">