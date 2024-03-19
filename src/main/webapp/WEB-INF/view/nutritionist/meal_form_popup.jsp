<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%
	/***********************************************************************************
	 * ○ 파일	: nutritionist/app.jsp
	 * ● 설명	: 나의 영양사
	 ***********************************************************************************/
%>
<head>
	<link href="css/meal_form_popup.css<%= version %>" rel="stylesheet" type="text/css"/>
	<%--<link rel="stylesheet" href="style.css">--%>
</head>
<script>
	$(document).ready(function() {
		$('#openMealModalBtn').click(function() {
			$('#mealInputModal').addClass('modal-active');
		});

		// 식사 입력란 추가
		$(document).on('click', '.add-meal-input', function() {
			addMealInput();
		});

		// 식사 입력란 제거
		$(document).on('click', '.remove-meal-input', function() {
			removeMealInput(this);
		});

		// 식사 정보 제출
		$('.submit-meal').click(function() {
			$('#mealInputModal').removeClass('modal-active');
			// 여기서 입력한 식사 정보를 처리하고, 메인 화면의 그래프를 업데이트할 수 있습니다.
		});

		function addMealInput() {
			let newInput =
			`<div class="meal-input mb-4">
				<input type="text" class="meal-name shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="식사 내용을 입력하세요">
				<button class="remove-meal-input px-4 py-2 bg-red-500 text-white rounded ml-2">-</button>
			</div>`;
			$('#mealInputContainer').append(newInput);
		}

		function removeMealInput(obj) {
			if ($('.meal-input').length > 1) {
				$(obj).parent('.meal-input').remove();
			}
		}
	});
</script>
<div id="mealInputModal" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center hidden">
	<div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
	<div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
		<!-- 모달 내용 -->
		<div class="modal-content py-4 text-left px-6">
			<div class="flex justify-between items-center pb-3">
				<p class="text-2xl font-bold">식사 입력</p>
				<div class="modal-close cursor-pointer z-50">
					<span class="text-3xl">&times;</span>
				</div>
			</div>
			<div id="mealInputContainer">
				<!-- 사용자가 입력할 수 있는 식사 정보 입력란이 동적으로 추가됩니다. -->
				<div class="meal-input mb-4">
					<input type="text" class="meal-name shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="식사 내용을 입력하세요">
					<button class="add-meal-input px-4 py-2 bg-green-500 text-white rounded ml-2">+</button>
				</div>
			</div>
			<div class="flex justify-end pt-2">
				<button class="submit-meal px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400 focus:outline-none">확인</button>
			</div>
		</div>
	</div>
</div>