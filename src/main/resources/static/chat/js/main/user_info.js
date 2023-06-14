let changeUserInfoFlag = false;
var cropper;

function initUserInfoTab() {
    $('#app_header_menu').css('display', 'none');
    $('#app_title_text').html('내 정보');
    $('.list_container').css('display', 'none');
    $('#user_info_container').css('display', 'block');

    $('#profile_container').click(function() {
        $("#imageInput")[0].click()
    })
    //캐릭터 선택 초기화
    $('#user_info_container').find('#character').html('');

    let getMyInfoPromise = getMyInfo();
    getMyInfoPromise
    .then((response) => {
        console.log('getMyInfoResp', response)
        let userInfo = response.data.result.user.userInfo;
        if(userInfo.userProfileImages.length>0){
            profileImgUrl = userInfo.userProfileImages[0].profileImgUrl;
            $('#profile_container').html("<img src='"+profileImgUrl+"' style='width: 100%;'>");
        }
        $('#user_info_container').find('#userNickNm').val(userInfo.userNickNm);
        $('#user_info_container').find('#aboutMe').val(userInfo.aboutMe);
        $('#user_info_container').find('#lookingForGender').val(userInfo.lookingForGender);

        //userCharacter가 있다면
        if(userInfo.userCharacter){
            userInfo.userCharacter.split(',').forEach((item, idx) => {
                console.log(item, idx);
                let element = $('#characterSelectionPopup').find(item);
                console.log(element);
                let tagName = element.prop("tagName"); // 선택한 요소의 태그 이름을 가져옵니다.
                console.log(tagName); // 태그 이름을 콘솔에 출력합니다.
                if(tagName == 'OPTION'){
                    $('#characterSelectionPopup').find(item).parent('select').val(item.replaceAll('#',''));
                    console.log($('#characterSelectionPopup').find(item).parent('select'))
                    characterSelect($('#characterSelectionPopup').find(item).parent('select')[0]);
                }else{
                    $('#characterSelectionPopup').find(item).click();
                }
            })
        }

        $('#aboutMe').on('scroll', function() {
            if ($(this).scrollTop() > 0) {
                $('label[for="aboutMe"]').css('display', 'none');
            } else {
                $('label[for="aboutMe"]').css('display', 'block');
            }
        });

        // 변경을 감지할 대상 요소를 선택합니다.
        var targetElement = document.getElementById('user_info_container');
        // MutationObserver 인스턴스를 생성하고 콜백 함수를 정의합니다.
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // 변경된 내용에 대한 처리를 수행합니다.
                console.log('내용변경')
                changeUserInfoFlag = true;
            });
        });
        // MutationObserver를 대상 요소에 등록합니다.
        observer.observe(targetElement, { childList: true, subtree: true });

        var inputs = document.querySelectorAll('#user_info_container input, #user_info_container select');
        inputs.forEach(function(input) {
            input.addEventListener('change', function() {
                console.log('내용변경')
                changeUserInfoFlag = true;
            });
        });
    })
    .catch((error) => {
        console.log(error);
        if(error.response.data.statusCode == 401||error.response.data.body.statusCode == 401){
            localStorage.setItem('token', '');
            alert('로그인이 만료되었습니다');
            location.href = 'login';
        }else{
            alert(error.response.data.message);
            console.error(error);
        }
    })
}

// input과 select 태그의 변경을 감지하는 함수
function observeInputAndSelect() {

}

function userCharacterInit(){
    let userCharacter = $('#characterSelectionPopup').find('.character');
    userCharacter.each(function(){
        $(this).removeClass('selected');
    })
}

function updateProfileImageHub(){
    let previewProfileImagePromise = previewProfileImage();
    previewProfileImagePromise
        .then(function(){
            //uploadProfileImageFile();
            console.log($('#profile_container img')[0]);
            cropper = new Cropper($('#profile_container img')[0], {
                viewMode: 3,
                dragMode: 'move',
                autoCropArea: 1,
                restore: false,
                modal: false,
                guides: false,
                preview: true,
                highlight: false,
                cropBoxMovable: false,
                cropBoxResizable: false,
                toggleDragModeOnDblclick: false,
                crop(event) {
                    console.log(event.detail.x);
                    console.log(event.detail.y);
                    console.log(event.detail.width);
                    console.log(event.detail.height);
                    console.log(event.detail.rotate);
                    console.log(event.detail.scaleX);
                    console.log(event.detail.scaleY);
                }
            });
        }).catch(function(err){
        console.log(err);
    });
}

function previewProfileImage(){
    console.log('previewProfileImage');
    return new Promise(function(resolve, reject){
        const fileInput = document.querySelector('#imageInput');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                const imageUrl = URL.createObjectURL(file);
                const image = new Image();
                image.src = imageUrl;
                image.onload = function() {
                    /*const imgWrapper = document.createElement('div');
                    imgWrapper.classList.add('profile_img');
                    imgWrapper.style.left = 'auto';
                    imgWrapper.style.top = 'auto';
                    imgWrapper.appendChild(image);*/
                    //$('#user_info_container').find('.profile_container').html(imgWrapper);
                    //profileImgUrl = response.data.result.user.userInfo.userProfileImages[0].profileImgUrl;

                    $('#profile_container').html("<img src='"+imageUrl+"' style='width: 100%;'>");
                    resolve();
                }
            }
        }
    });
}

// 이미지 업로드
function uploadProfileImageFile() {
    // input 요소에서 선택된 파일 가져오기
    //const file = document.getElementById("imageInput").files[0];
    cropper.getCroppedCanvas().toBlob((blob) => {
        // FormData 객체 생성
        const formData = new FormData();
        formData.append('file', blob /*, 'example.png' , 0.7*/);
        //formData.append("file", file);

        // HTTP 요청 생성
        const xhr = new XMLHttpRequest();
        xhr.open("POST", FILE_STORAGE_URL+'/upload?division=profile', true);
        //xhr.open("POST", "localhost:7100/upload", true);
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));

        // 요청 완료 시 처리할 콜백 함수 등록
        xhr.onload = function() {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.response);
                console.log("이미지 업로드 성공 >>>>>", response);
                console.log("파일위치 >>>>>", response.result.fileLocation);
                saveProfileImage(response.result.fileLocation);
            } else {
                console.log("이미지 업로드 실패" + xhr.response);
            }
        };
        // HTTP 요청 전송
        xhr.send(formData);
    })
}

function saveProfileImage(fileLocation){
    return axios.post(USER_URL+'/userInfo', {
        userProfileImages: [
            {
                profileImgUrl: 'http://www.aflk-chat.com:8000/file-storage/display?fileLocation='+fileLocation
            }
        ]
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("token"),
        },
        params: {
            // 기타 파라미터가 있다면 여기에 추가
        }
    });
}

function openCharacterSelectionPopup() {
    $('#characterSelectionPopup').css('display', 'flex');
}

function closeCharacterSelectionPopup() {
    $('#characterSelectionPopup').css('display', 'none');
    if(changeUserInfoFlag){
        if(confirm('변경된 특징을 바탕으로 자동으로 자기소개를 작성할까요?')){
            makeAboutMeHub();
        }
    }
}

function characterSelect(element) {
    var character = document.getElementById("character");
    var characterSelectHashTag = document.createElement("div");
    //var index = Array.prototype.indexOf.call(element.parentNode.children, element);
    var index = Array.from(element.parentNode.children).indexOf(element);
    if (element.tagName.toLowerCase() === "select") {
        $('#characterSelectHashTag-'+index).remove();
        characterSelectHashTag.id = "characterSelectHashTag-" + index;
        characterSelectHashTag.classList.add("characterSelectHashTag");
        characterSelectHashTag.innerText = '#' + $(element).val();
        character.appendChild(characterSelectHashTag);
    }else{
        if($('#characterSelectHashTag-'+index).length>0){
            $(element).css('background-color', '#eb8b1b');
            $('#characterSelectHashTag-'+index).remove();
        }else{
            $(element).css('background-color', '#eb6fa7');
            characterSelectHashTag.id = "characterSelectHashTag-" + index;
            characterSelectHashTag.classList.add("characterSelectHashTag");
            characterSelectHashTag.innerText = '#'+element.innerText;
            character.appendChild(characterSelectHashTag);
        }
    }
}

function makeAboutMeHub(){
    let aboutMe = '';
    let userCharacterArr = [];
    $('#character').find('.characterSelectHashTag').each(function(){
        userCharacterArr.push($(this).text());
    });
    console.log(userCharacterArr)
    let prompt = '';
        prompt += '너의 이름은 '+$('#userNickNm').val() +'이고 ';
        prompt += '너는 성별이 '+$('#lookingForGender').val() +'인 친구를 찾고 있어. ';
        prompt += '네가 해시태그('+userCharacterArr.toString()+')에 해당하는 사람이라고 생각하고 200글자 이내의 자기소개 작성해줘 ';
    console.log('prompt : ' + prompt);
    prompt = encodeURIComponent(prompt);
    //console.log('gptPrompt : ' + prompt);
    gptQuery(prompt, [])
    .then(function(response){
        console.log(response);
        let returnMessage = response.data.result.messages[1].content.replace(/<br>/gi, '\n');
        $('#user_info_container').find('#aboutMe').val(returnMessage);
        //console.log(returnMessage);
        closeLoadingCover();
    })
    .catch(function(error){
        console.log(error);
        alert('네트워크 오류입니다. 잠시 후 다시 시도해주세요.')
        closeLoadingCover();
    });
    //$('#aboutMe').val(aboutMe);
}

function gptQuery(prompt, prevMessages) {
    openLoadingCover('AI가 자기소개를 작성중이에요. </br> 잠시만 기다려주세요!');
    return axios.post(GPT_CONNECTOR_URL+'/query?prompt='+prompt, prevMessages, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("token"),
        },
        params: {
            // 기타 파라미터가 있다면 여기에 추가
        }
    });
}

function saveUserInfoHub(){
    if(confirm('저장할까요?')){
        saveUserInfo().then(function(response){
            uploadProfileImageFile();
            console.log(response);
            alert('저장되었습니다.');
        })
    }
}

function saveUserInfo(){
    let userInfo = {
        userNickNm: $('#user_info_container').find('#userNickNm').val(),
        aboutMe: $('#user_info_container').find('#aboutMe').val(),
        lookingForGender: $('#user_info_container').find('#lookingForGender').val(),
    };
    let userCharacterArr = [];
    $('#character').find('.characterSelectHashTag').each(function(){
        userCharacterArr.push($(this).text());
    });
    userInfo.userCharacter = userCharacterArr.toString();
    console.log(userInfo);
    return axios.post(USER_URL+'/userInfo', userInfo, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("token"),
        },
        params: {
            // 기타 파라미터가 있다면 여기에 추가
        }
    });
}

