
function initUserInfoTab() {
    //alert('준비중입니다.');
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
            console.log($('#profile_container img'));
            let cropper = new Cropper($('#profile_container img'), {
                aspectRatio: 1 / 1,
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
    const file = document.getElementById("imageInput").files[0];

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("file", file);

    // HTTP 요청 생성
    const xhr = new XMLHttpRequest();
    xhr.open("POST", API_FILE_STORAGE_URL+'/upload?division=profile', true);
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
}

function saveProfileImage(fileLocation){
    return axios.post(API_USER_URL+'/userInfo', {
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

function saveUserInfoHub(){
    saveUserInfo();
}

function saveUserInfo(){
    let userInfo = {
        userNickNm: $('#user_info_container').find('#userNickNm').val(),
        aboutMe: $('#user_info_container').find('#aboutMe').val(),
    };
    let userCharacterArr = [];
    $('#character').find('.characterSelectHashTag').each(function(){
        userCharacterArr.push($(this).text());
    });
    userInfo.userCharacter = userCharacterArr.toString();
    console.log(userInfo);
    return axios.post(API_USER_URL+'/userInfo', userInfo, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("token"),
        },
        params: {
            // 기타 파라미터가 있다면 여기에 추가
        }
    });
}

