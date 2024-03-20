<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%
	/***********************************************************************************
	 * ○ 파일	: nutritionist/app.jsp
	 * ● 설명	: 나의 영양사
	 ***********************************************************************************/
%>
<head>
	<link href="css/user_info_form_popup.css<%= version %>" rel="stylesheet" type="text/css"/>
	<%--<link rel="stylesheet" href="style.css">--%>
</head>
<script>
	$(document).ready(function() {
		// 사용자 정보 입력 모달을 엽니다.
		$('#userInfoModal').addClass('modal-active');

		// 모달 닫기
		$('.modal-close').on('click', function() {
			$(this).closest('.modal').removeClass('modal-active');
		});
	});

	function closeUserInfoModal() {
		$('#userInfoModal').removeClass('modal-active');
		// 여기서 사용자 입력 데이터를 처리할 수 있습니다.
	}
</script>
<div id="userInfoModal" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center hidden">
	<%--<div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>--%>
	<div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
		<div class="modal-content py-4 text-left px-6">
			<!-- 모달 헤더 -->
			<div class="flex justify-between items-center pb-3">
				<p class="text-2xl font-bold">사용자 정보 입력</p>
				<div class="modal-close cursor-pointer z-50">
					<span class="text-3xl">&times;</span>
				</div>
			</div>

			<!-- 모달 바디 -->
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="activity">활동량</label>
				<select id="activity" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
					<option value="low">낮음</option>
					<option value="medium">중간</option>
					<option value="high">높음</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="gender">성별</label>
				<select id="gender" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
					<option value="male">남성</option>
					<option value="female">여성</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="height">신장 (cm)</label>
				<input type="number" id="height" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="신장을 입력하세요">
			</div>

			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="weight">체중 (kg)</label>
				<input type="number" id="weight" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="체중을 입력하세요">
			</div>

			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="birthdate">생년월일</label>
				<input type="date" id="birthdate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
			</div>

			<!-- 모달 푸터 -->
			<div class="flex justify-end pt-2">
				<button class="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400 focus:outline-none" onclick="closeUserInfoModal()">확인</button>
			</div>
		</div>
	</div>
</div>

