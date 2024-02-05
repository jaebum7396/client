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
			axios.get(PAL_URL + '/pal', {})
			.then(function(response){
				let list = response.data.result.palList;
				let selectPal = document.getElementById('selectPal');
				for(let i=0; i<list.length; i++){
					let option = document.createElement('option');
					option.value = list[i].palId;
					option.innerHTML = list[i].palNameKR + ' (' + list[i].palNameEN + ')';
					selectPal.appendChild(option);
				}
			});
		});

		function getPalList(objParam){
			let params = new Object();
			params.cPalNameKR = $(objParam).val();
			axios.get(PAL_URL + '/pal', {
				params: params
			})
			.then(function(response){
			});
		}

		function getCombinationRecipe(objParam){
			let params = new Object();
			if($(objParam).is('input')){
				params.cPalNameKR = $(objParam).val();
			}else if($(objParam).is('select')){
				params.cPalId = $(objParam).val();
			}
			axios.get(PAL_URL + '/combination-recipe', {
				params: params
			}).then(function(response){
				$('.recipe_container').empty();
				let combinationRecipeList = response.data.result.combinationRecipeList
				console.log(combinationRecipeList)
				for (let combinationRecipe of combinationRecipeList){
					recipeMaker(combinationRecipe);
				}
			});
		}

		function recipeMaker(combinationRecipe){
			let aPalProfileImage = combinationRecipe.apalProfileImage;
			let bPalProfileImage = combinationRecipe.bpalProfileImage;
			if(aPalProfileImage && bPalProfileImage ){
				let aPalProfileImageUrl = 'http://www.aflk-chat.com:8000/file-storage/display?fileLocation='+aPalProfileImage;
				let bPalProfileImageUrl = 'http://www.aflk-chat.com:8000/file-storage/display?fileLocation='+bPalProfileImage;
				let recipeHtml = '';
				recipeHtml += '<div class="pal_row" style="height:150px;">';
				recipeHtml += 	  '<div class="pal_col" style="">';
				recipeHtml += 		  "<div class='profile_img_container' id='aPal' style='width:100%;height:100%;display:flex;'>"
				recipeHtml +=    		  "<img class='pal_profile_img' src='"+aPalProfileImageUrl+"' style=''>"
				recipeHtml +=		  '</div>';
				recipeHtml += 		  "<div class='name_container' id='aPalName' style='width:100%;height:100%;display:flex;'>"
				recipeHtml +=			  combinationRecipe.apalNameKR;
				recipeHtml +=		  '</div>';
				recipeHtml += 	  '</div>';
				recipeHtml += 	  '<div class="pal_col" style="">';
				recipeHtml += 		  "<div class='profile_img_container' id='aPal' style='width:100%;height:100%;display:flex;'>"
				recipeHtml +=    		  "<img class='pal_profile_img' src='"+bPalProfileImageUrl+"' style=''>"
				recipeHtml +=         '</div>';
				recipeHtml += 		  "<div class='name_container' id='aPalName' style='width:100%;height:100%;display:flex;'>"
				recipeHtml +=			  combinationRecipe.bpalNameKR;
				recipeHtml +=		  '</div>';
				recipeHtml +=     '</div>';
				recipeHtml += '</div>';
				$('.recipe_container').append(recipeHtml);
			}
		}
	</script>
	<style>
		html, body {
			height: 100%;
			margin: 0;
		}
		.pal_row {
			padding: 5px;
			height: 150px;
			overflow: hidden;
			display: flex;
			justify-content: space-around;
		}
		.pal_col {
			width:40%;
			display: flex;
			flex-direction: column;
		}
		.profile_img_container {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.pal_profile_img {
			width: 130px;
			height: 130px;
			border-radius: 50%;
		}
		.name_container {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	</style>
	<body>
		<div class="page_content" style='margin-left:0;height:100%;'>
			<div style='width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-around;'>
				<div style='height:20%;display:flex;flex-direction:column;justify-content: space-around;padding:5px;'>
					<input type='text' style='height:40px;font-size:20px;' onkeyup='getPalList(this)'/>
					<select id='selectPal' style='width:100%;height:40px;' onchange='getCombinationRecipe(this)'>
						<option value="0;">목표 팔을 선택하세요</option>
					</select>
				</div>
				<div class='recipe_container' style='height:70%;'>
					<div class='pal_row' style='height:150px;'>
						<div class='pal_col' style=''>
							<div id="aPal" style="width:100%;height:100%;"></div>
						</div>
						<div class='pal_col' style=''>
							<div id="bPal" style="width:100%;height:100%;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>