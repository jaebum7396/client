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
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>나의 영양사</title>
		<jsp:directive.include file="../common/head.jsp"/>
		<link href="css/app.css<%= version %>" rel="stylesheet" type="text/css"/>
		<script src="js/app.js<%= version %>" type="text/javascript"></script>

		<%--<link rel="stylesheet" href="style.css">--%>
		<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
	</head>
<body>
<!-- 사용자 정보 입력 모달 -->
<jsp:directive.include file="user_info_form_popup.jsp"/>
<!-- 식사 입력 모달 -->
<jsp:directive.include file="meal_form_popup.jsp"/>
<!-- 로딩 -->
<jsp:directive.include file="loading.jsp"/>
<!-- 메인 화면 -->
<div id="mainScreen" class="p-4">
	<div id="nutritionGraph" class="mb-4">
		<canvas id="nutritionChart"></canvas>
	</div>
	<button id="openMealModalBtn" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 focus:outline-none">식사 입력</button>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<%--<script src="script.js"></script>--%>
<script>
	// 영양소 그래프를 위한 변수 선언
	var nutritionChart;

	$(document).ready(function() {
		// 영양소 그래프 초기화
		//var ctx = document.getElementById('nutritionChart').getContext('2d');
		//nutritionChart = new Chart(ctx, {
		//	type: 'bar', // 차트의 유형
		//	data: {
		//		labels: ['칼로리', '탄수화물', '단백질', '지방'], // 영양소 종류
		//		datasets: [{
		//			label: '오늘 섭취한 영양소',
		//			data: [0, 0, 0, 0], // 초기값
		//			backgroundColor: [
		//				'rgba(255, 99, 132, 0.2)',
		//				'rgba(54, 162, 235, 0.2)',
		//				'rgba(255, 206, 86, 0.2)',
		//				'rgba(75, 192, 192, 0.2)'
		//			],
		//			borderColor: [
		//				'rgba(255, 99, 132, 1)',
		//				'rgba(54, 162, 235, 1)',
		//				'rgba(255, 206, 86, 1)',
		//				'rgba(75, 192, 192, 1)'
		//			],
		//			borderWidth: 1
		//		}]
		//	},
		//	options: {
		//		scales: {
		//			y: {
		//				beginAtZero: true
		//			}
		//		}
		//	}
		//});
		// 기존 차트 관련 코드 아래에 Radar 차트 초기화 코드 추가
		let ctx = document.getElementById('nutritionChart').getContext('2d');
		let nutritionChart = new Chart(ctx, {
			type: 'radar', // 차트 유형을 'radar'로 변경
			data: {
				labels: ['칼로리', '탄수화물', '단백질', '지방', '비타민', '미네랄'],
				datasets: [{
					label: '당신의 영양소 섭취',
					data: [2000, 59, 90, 81, 56, 55], // 예시 데이터, 실제 앱에서는 사용자 입력에 따라 동적으로 변경될 예정
					fill: true,
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgba(255, 99, 132, 1)',
					pointBackgroundColor: 'rgba(255, 99, 132, 1)',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
				}]
			},
			options: {
				elements: {
					line: {
						borderWidth: 3
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
