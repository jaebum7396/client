<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%
/***********************************************************************************
* ○ 파일	: palSurpporter.jsp
* ● 설명	: 팔 서포터
***********************************************************************************/
%>
<!DOCTYPE html>
<html>
	<head>
		<jsp:directive.include file="../common/head.jsp"/>
		
		<!-- tui-pagination -->
		<link rel="stylesheet" href="https://uicdn.toast.com/tui.pagination/latest/tui-pagination.css" />
		<script src="https://uicdn.toast.com/tui.pagination/latest/tui-pagination.js"></script>
		<!-- tui-date-picker -->
		<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
		<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
		<!-- tui-grid -->
		<link rel="stylesheet" href="https://uicdn.toast.com/grid/latest/tui-grid.css" />
		<script src="https://uicdn.toast.com/grid/latest/tui-grid.js"></script>

		<%--<script src="js/user.js"></script>--%>
		<link href="css/admin.css" type="text/css" rel="stylesheet"/>
	</head>
	<script>
		$(document).ready(function(){
			console.log(axios.get("www.aflk-chat.com:8000" + '/pal', {}));
		});
	</script>
	<body>
		<div class="page_content" style='margin-left:0;'>
			<select>
				<option value="0;">목표 팔을 선택하세요</option>
			</select>
		</div>
	</body>
</html>