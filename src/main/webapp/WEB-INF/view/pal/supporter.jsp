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
					option.innerHTML = list[i].palId+'. '+list[i].palNameKR + ' (' + list[i].palNameEN + ')';
					selectPal.appendChild(option);
				}
			});
			/*$('#pal_search').blur(function() {
				palListDisabled();
			});*/
		});

		function palSelect(palId){
			$('#selectSubPal').empty();
			$('#selectSubPal').css('display','none');
			$('#selectPal').val(palId);
			palListDisabled();
			getCombinationRecipe($('#selectPal')[0]);
		}

		function palListDisabled(){
			let search_result_container = $('.search_result_container');
			search_result_container.empty();
			search_result_container.css('display', 'none');
		}

		function getPalList(objParam){
			let params = new Object();
			let palNameValue = $(objParam).val();
			if(!palNameValue){
				palListDisabled();
				return;
			}
			params.PalName = $(objParam).val();
			axios.get(PAL_URL + '/pal', {
				params: params
			})
			.then(function(response){
				let palList = response.data.result.palList;
				let search_result_container = $('.search_result_container');
				if(palList.length>0){
					search_result_container.empty();
					search_result_container.css('display', 'block');
					search_result_container.css('top',$(objParam).position().top + $(objParam).outerHeight());
					for(let pal of palList){
						palRowMaker(pal);
					}
				}else{
					palListDisabled();
				}
			});
		}

		function palRowMaker(pal) {
			//console.log(pal)
			let abilityList = ['cooling','farming','gathering','generate_electricity','handiwork','kindling','lumbering','medicine_production','mining','planting','transporting','watering'];
			let palProfileImage = pal.palProfileImage;
			if(palProfileImage){
				let palProfileImageUrl = 'http://www.aflk-chat.com:8000/file-storage/display?fileLocation='+palProfileImage;
				let recipeHtml = '';
				recipeHtml += "<div class='pal_list_row' style='background-color:white;' onclick='palSelect(\""+pal.palId+"\")'>";
				recipeHtml += 	  '<div class="pal_list_col" style="">';
				recipeHtml += 		  "<div class='profile_img_container' style='width:100%;height:100%;display:flex;'>"
				recipeHtml +=    		  "<img class='pal_profile_img' src='"+palProfileImageUrl+"' style='width:40px;height:40px;''>"
				recipeHtml +=		  '</div>';
				recipeHtml += 		  "<div class='name_container' style='height:40px;display:flex;justify-content:center;align-items: center;'>"
				recipeHtml +=			  pal.palId+'. '+pal.palNameKR + ' (' + pal.palNameEN + ')';
				recipeHtml +=		  '</div>';
				recipeHtml += 		  "<div class='ability_container' style='height:100%;display:flex;'>"
				$.each(pal.palAbility, (key, value) => {
					//console.log(key,value);
				});
				recipeHtml +=		  '</div>';
				recipeHtml += 	  '</div>';
				recipeHtml += '</div>';
				$('.search_result_container').append(recipeHtml);
			}
		}

		function getCombinationRecipe(paramObj){
			let params = new Object();
			params.cPalId = $('#selectPal').val();
			if($(paramObj).attr('id') == 'selectPal'){

			}else if($(paramObj).attr('id') == 'selectSubPal'){
				params.aPalId = $('#selectSubPal').val();
			}
			axios.get(PAL_URL + '/combination-recipe', {
				params: params
			}).then(function(response){
				$('.recipe_container').empty();
				let combinationRecipeList = response.data.result.combinationRecipeList
				//console.log(combinationRecipeList)
				let palArray = new Array();
				for (let combinationRecipe of combinationRecipeList){
					recipeMaker(combinationRecipe);
					let pal = new Object();
					pal.palId = combinationRecipe.apalId;
					pal.palNameKR = combinationRecipe.apalNameKR;
					pal.palNameEN = combinationRecipe.apalNameEN;
					pal.palProfileImage = combinationRecipe.apalProfileImage;
					palArray.push(pal);
					pal = new Object();
					pal.palId = combinationRecipe.bpalId;
					pal.palNameKR = combinationRecipe.bpalNameKR;
					pal.palNameEN = combinationRecipe.bpalNameEN;
					pal.palProfileImage = combinationRecipe.bpalProfileImage;
					palArray.push(pal);
				}

				let palArrayUnique =
				Array.from(new Set(palArray.map(recipe => JSON.stringify(recipe))))
				.map(recipe => JSON.parse(recipe))
				.sort(customSort);

				if($(paramObj).attr('id') == 'selectPal'){
					if(combinationRecipeList.length>3){
						$('#selectSubPal').empty();
						$('#selectSubPal').css('display','block');
						//console.log(palArrayUnique)
						let defaultOption = '<option value="0;">재료 팔을 선택하세요</option>'
						$('#selectSubPal').append(defaultOption);
						for(let i=0; i<palArrayUnique.length; i++){
							let option = document.createElement('option');
							option.value = palArrayUnique[i].palId;
							option.innerHTML = palArrayUnique[i].palId+'. '+palArrayUnique[i].palNameKR + ' (' + palArrayUnique[i].palNameEN + ')';
							$('#selectSubPal').append(option);
						}
					}else{
						$('#selectSubPal').empty();
						$('#selectSubPal').css('display','none');
					}
				}
				//console.log(palArrayUnique);
			});
		}

		function customSort(a, b) {
			const regex = /^(\d+)([a-zA-Z]*)$/; // 대문자를 포함하도록 정규 표현식 수정
			const matchA = a.palId.match(regex);
			const matchB = b.palId.match(regex);

			const numA = parseInt(matchA[0], 10);
			const numB = parseInt(matchB[0], 10);

			// 먼저 숫자 부분을 비교
			if (numA !== numB) {
				return numA - numB;
			}

			// 숫자 부분이 같다면 문자 부분을 비교
			if (matchA[1] < matchB[1]) return -1;
			if (matchA[1] > matchB[1]) return 1;
			return 0;
		}

		function recipeMaker(combinationRecipe){
			//console.log(combinationRecipe)
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
				recipeHtml += 	  '<div class="" style="height:100%;display:flex;align-items: center;justify-content: center;">';
				recipeHtml += 		  "<span style='color:red;'>♥</span>"
				recipeHtml +=     '</div>';
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
		input, select {
			border: 2px solid #1c93d1;
			border-radius: 10px;
		}
		html, body {
			height: 100%;
			width:100%;
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
		.search_result_container{
			position:absolute;
			display:none;
			max-height: 300px;
			width:100%;
			overflow: scroll;
			z-index:9999;
		}
		.pal_list_col{
			display:flex;
			flex-direction:row;
			justify-content: space-between;
			margin-left:10px;
			margin-right:10px;
			border-top:0;
			border:1px solid #e8e8e8;
			padding: 5px;
		}
	</style>
	<body>
		<div class="page_content" style='margin-left:0;height:100%;width:100%;'>
			<div style='padding:10px;'>
				<span>팔 레시피 v.1.0.0</span>
			</div>
			<div style='width:100%;height: calc(100% - 50px);display:flex;flex-direction:column;justify-content:space-around;'>
				<div style="height:20%; position: relative;">
					<div class='search_result_container' style=''>
					</div>
					<div style='height:100%;display:flex;flex-direction:column;justify-content: space-around;padding:10px;position:relative;'>
						<input id='pal_search' type='text' style='height:48px;font-size:14px;' placeholder="팔을 검색해보세요" onkeyup='getPalList(this)'/>
						<select id='selectPal' style='width:100%;height:52px;' onchange='getCombinationRecipe(this)'>
							<option value="0;">목표 팔을 선택하세요</option>
						</select>
					</div>
				</div>
				<div style='display:flex;flex-direction:column;justify-content: space-around;padding:10px;position:relative;'>
					<select id='selectSubPal' style='display:none;width:100%;height:52px;' onchange='getCombinationRecipe(this)'>
						<option value="0;">재료 팔을 선택하세요</option>
					</select>
				</div>
				<div class='recipe_container' style='height:65%;'>
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