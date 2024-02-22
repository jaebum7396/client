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
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
	<style>
		body, select, input, button {
			font-family: 'Roboto', sans-serif;
			color: #333;
		}

		body {
			background-color: #f4f4f4;
			margin: 0;
			padding: 20px;
		}

		.modal {
			display: none;
			position: fixed;
			z-index: 1;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			overflow: auto;
			background-color: rgba(0,0,0,0.4);
			border-radius: 5px;
		}

		.modal-content {
			background-color: #fefefe;
			margin: 10% auto;
			padding: 20px;
			border: 1px solid #888;
			width: 80%;
			max-width: 400px;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		}

		label, select, input {
			display: block;
			margin: 10px 0;
			border-radius: 4px;
			border: 1px solid #ccc;
			padding: 8px;
		}

		button {
			background-color: #4CAF50;
			color: white;
			padding: 10px 20px;
			border: none;
			cursor: pointer;
			border-radius: 4px;
			transition: background-color 0.3s;
		}

		button:hover {
			background-color: #45a049;
		}

		#addInputBtn, #confirmMealBtn {
			margin-top: 10px;
		}

		#addInputBtn {
			margin-right: 10px;
		}
	</style>
</head>
<body>
<!-- 사용자 입력 모달 -->
<div id="userInputModal" class="modal">
	<div class="modal-content">
		<h2>사용자 정보 입력</h2>
		<label for="activityLevel">활동량:</label>
		<select id="activityLevel">
			<option value="low">낮음</option>
			<option value="medium">중간</option>
			<option value="high">높음</option>
		</select>
		<label for="gender">성별:</label>
		<select id="gender">
			<option value="male">남성</option>
			<option value="female">여성</option>
			<option value="other">기타</option>
		</select>
		<label for="height">신장(cm):</label>
		<input type="number" id="height" placeholder="신장을 입력하세요">
		<label for="weight">체중(kg):</label>
		<input type="number" id="weight" placeholder="체중을 입력하세요">
		<label for="birthdate">생년월일:</label>
		<input type="date" id="birthdate">
		<button id="confirmBtn">확인</button>
	</div>
</div>

<!-- 메인 화면 -->
<div id="mainScreen" style="display:none;">
	<h2>오늘의 영양소 정보</h2>
	<canvas id="nutritionChart"></canvas>
	<button id="addMealBtn">식사 입력</button>
</div>

<!-- 식사 입력 모달 -->
<div id="mealInputModal" class="modal">
	<div class="modal-content">
		<h2>식사 입력</h2>
		<div id="mealInputs">
			<input type="text" class="mealInput" placeholder="식사 입력...">
		</div>
		<button id="addInputBtn">+</button>
		<button id="confirmMealBtn">확인</button>
	</div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
	$(document).ready(function() {
		$('#userInputModal').fadeIn();

		$('#confirmBtn').click(function() {
			$('#userInputModal').fadeOut();
			$('#mainScreen').fadeIn();
			initializeChart();
		});

		$('#addMealBtn').click(function() {
			$('#mealInputModal').fadeIn();
		});

		$('#addInputBtn').click(function() {
			$('#mealInputs').append('<input type="text" class="mealInput" placeholder="식사 입력...">');
		});

		$('#confirmMealBtn').click(function() {
			$('#mealInputModal').fadeOut();
			// 식사 정보 업데이트 로직을 여기에 추가할 수 있습니다.
		});

		function initializeChart() {
			var ctx = $('#nutritionChart')[0].getContext('2d');
			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['칼로리', '탄수화물', '단백질', '지방', '기타 영양소'],
					datasets: [{
						label: '오늘의 영양소 섭취량',
						data: [2000, 300, 50, 70, 30],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)'
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
		}
	});
</script>
</body>
</html>

