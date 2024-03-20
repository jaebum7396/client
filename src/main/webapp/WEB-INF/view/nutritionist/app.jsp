<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%
	/***********************************************************************************
	 * ○ 파일	: nutritionist/app.jsp
	 * ● 설명	: 나의 영양사
	 ***********************************************************************************/
%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>나의 영양사</title>
		<jsp:directive.include file="../common/head.jsp"/>
		<link href="css/app.css<%= version %>" rel="stylesheet" type="text/css"/>
		<script src="js/app.js<%= version %>" type="text/javascript"></script>
		<!-- Google tag (gtag.js) -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-D5DTCR537R"></script>
		<%--<link rel="stylesheet" href="style.css">--%>
	</head>
	<script>

	</script>
	<jsp:directive.include file="loading.jsp"/>
	<body>
		<!-- 메인 화면 -->
		<div id="main_screen"> <%--chatbox--%>
			<jsp:directive.include file="layout.jsp"/>
		</div>
		<!-- 사용자 정보 입력 모달 -->
		<jsp:directive.include file="user_physical_modal.jsp"/>
		<!-- 식사 입력 모달 -->
		<%--<jsp:directive.include file="meal_form_popup.jsp"/>--%>
	</body>
	<script src="js/loading.js<%= version %>" type="text/javascript"></script>
	<link href="css/loading.css<%= version %>" rel="stylesheet" type="text/css"/>
</html>
