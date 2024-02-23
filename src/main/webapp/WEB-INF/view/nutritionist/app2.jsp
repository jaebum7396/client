<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%
/***********************************************************************************
* ○ 파일	: palSurpporter.jsp
* ● 설명	: 팔 서포터
***********************************************************************************/
%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>식단 조언 어플리케이션</title>
	<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
	<%--<link rel="stylesheet" href="style.css">--%>
	<style>
		.modal {
			display: none; /* 기본적으로 모달을 숨깁니다. */
		}

		.modal-active {
			display: flex; /* 모달이 활성화될 때 표시합니다. */
		}

		.modal-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: black;
			opacity: 0.5;
		}

		.modal-container {
			z-index: 10;
		}

		.modal-close {
			cursor: pointer;
		}

		.shadow-lg {
			box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
		}

		.meal-input {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
		}
		.meal-input input[type="text"] {
			flex-grow: 1;
			border: 1px solid #ddd;
			margin-right: 5px;
			padding: 8px;
		}
		.meal-input button {
			width:30px;
			height: 30px;
			background-color: #007bff;
			color: white;
			border: none;
			border-radius: 5px;
			cursor: pointer;
			display:flex;
			justify-content: center;
			align-items: center;
		}
		.meal-input button.removeMealInput {
			background-color: #dc3545;
		}
	</style>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
<!-- 사용자 정보 입력 모달 -->
<div id="userInfoModal" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center hidden">
	<div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

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

<!-- 메인 화면 -->
<div id="mainScreen" class="p-4">
	<div id="nutritionGraph" class="mb-4">
		<canvas id="nutritionChart"></canvas>
	</div>
	<button id="openMealModalBtn" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 focus:outline-none">식사 입력</button>
</div>

<!-- 식사 입력 모달 -->
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
			<div id="mealInputsContainer">
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

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<%--<script src="script.js"></script>--%>
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

	$(document).ready(function() {
		$('#openMealModalBtn').click(function() {
			$('#mealInputModal').addClass('modal-active');
		});

		// 식사 입력란 추가
		$(document).on('click', '.add-meal-input', function() {
			let newInput =
			`<div class="meal-input mb-4">
				<input type="text" class="meal-name shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="식사 내용을 입력하세요">
				<button class="remove-meal-input px-4 py-2 bg-red-500 text-white rounded ml-2">-</button>
			</div>`;
			$('#mealInputsContainer').prepend(newInput);
		});

		// 식사 입력란 제거
		$(document).on('click', '.remove-meal-input', function() {
			if ($('.meal-input').length > 1) {
				$(this).parent('.meal-input').remove();
			}
		});

		// 식사 정보 제출
		$('.submit-meal').click(function() {
			$('#mealInputModal').removeClass('modal-active');
			// 여기서 입력한 식사 정보를 처리하고, 메인 화면의 그래프를 업데이트할 수 있습니다.
		});
	});

	// 영양소 그래프를 위한 변수 선언
	var nutritionChart;

	$(document).ready(function() {
		// 영양소 그래프 초기화
		var ctx = document.getElementById('nutritionChart').getContext('2d');
		nutritionChart = new Chart(ctx, {
			type: 'bar', // 차트의 유형
			data: {
				labels: ['칼로리', '탄수화물', '단백질', '지방'], // 영양소 종류
				datasets: [{
					label: '오늘 섭취한 영양소',
					data: [0, 0, 0, 0], // 초기값
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});

	// 식사 정보 제출 시 그래프 업데이트 함수
	function updateNutritionGraph(newData) {
		// 예시로, newData는 [200, 50, 30, 10] 형태의 배열로 각 영양소의 증가량을 나타냅니다.
		nutritionChart.data.datasets.forEach((dataset) => {
			dataset.data.forEach((value, index) => {
				dataset.data[index] = value + newData[index];
			});
		});
		nutritionChart.update();
	}

	// 식사 정보 제출 시 그래프 업데이트 예시
	$('.submit-meal').click(function() {
		$('#mealInputModal').removeClass('modal-active');

		// 예시 데이터로 그래프 업데이트
		updateNutritionGraph([200, 50, 30, 10]); // 실제 앱에서는 사용자 입력을 기반으로 계산된 데이터를 사용해야 합니다.
	});

</script>
</body>
</html>



