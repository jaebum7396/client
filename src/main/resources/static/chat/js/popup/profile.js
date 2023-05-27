function openPopupProfile(p_obj, p_division){
    console.log('openPopupProfile>>>>>>>', $(p_obj));
    $('#profile_popup').find('.CHANNEL_CD').val('');
    $('#profile_popup').find('.USER_CD').val('');
    $('#profile_popup').find('#chat_footer').html('');
    $('#profile_popup').find('.profile_container').html('')
    $('#profile_popup').find('.profile_container').off('click')
    let profileArr = $(p_obj).find('.profile_img');
    let cloneArr = new Array();
    profileArr.each((idx, item) => {
        if(profileArr.length==1){
            let clone = $(item).clone();
            cloneArr.push(clone);
        }else if(profileArr.length==2){
            let clone = $(item).clone();
            clone.css('width','55px')
            clone.css('height','55px')
            cloneArr.push(clone);
        }else if(profileArr.length==3){
            let clone = $(item).clone();
            clone.css('width','50px')
            clone.css('height','50px')
            cloneArr.push(clone);
        }else if(profileArr.length==4){
            let clone = $(item).clone();
            clone.css('width','40px')
            clone.css('height','40px')
            cloneArr.push(clone);
        }
    });
    console.log($(p_obj), p_obj.attr('class'))

    if($(p_obj).attr('class').indexOf('friend')>0){
        $('#profile_popup').find('.popup_flag').val('friend');
        $('#profile_popup').find('.USER_CD').val($(p_obj).find('.USER_CD').val());
        if(p_division== 'me'){
            $('#profile_popup').find('.name_edit_btn').css('display','block');
            $('#profile_popup').find('.message_edit_btn').css('display','block');
            $('#profile_popup')
                .find('#chat_footer')
                .html($("<div class='chat_btn' onclick='openChannelWithUserHub(\"me\");' style=''>나와의대화</div>"))
            $('#profile_popup').find('#profile_container').click(function() {
                $("#imageInput")[0].click()
            })
        }else{
            $('#profile_popup').find('.name_edit_btn').css('display','none');
            $('#profile_popup').find('.message_edit_btn').css('display','none');
            $('#profile_popup').find('#chat_footer')
                .html($("<div class='chat_btn' onclick='openChannelWithUserHub();' style=''>채팅하기</div>"))
        }
    }else{
        $('#profile_popup').find('.popup_flag').val('channel');
        $('#profile_popup').find('.CHANNEL_CD').val($(p_obj).find('.CHANNEL_CD').val());
        $('#profile_popup').find('.message_edit_btn').css('display','none');
        $('#profile_popup').find('.name_edit_btn').css('display','block');
        $('#profile_popup')
            .find('#chat_footer')
            .html($("<div class='chat_btn' onclick='openChannel(\""+$(p_obj).find('.CHANNEL_CD').val()+"\",\""+$(p_obj).find('.alias').html()+"\,\""+$(p_obj).find('.channel_user_count').html()+"\");' style=''>채팅하기</div>"))
    }

    $('#profile_popup').css('display','block');
    $('#profile_popup').find('.profile_container').append(cloneArr);
    $('#profile_popup').find('.name_container .name').val($(p_obj).find('.alias').html());
    $('#profile_popup').find('.message_container .message').val($(p_obj).find('.friend_message').html());
}

function closePopupProfile(){
    $('#profile_popup').css('display','none')
    if($('#profile_popup').find('.popup_flag').val()=='channel'){
        getChannelsWithPageable('0');
    } else {
        initFriendTab();
    }
}

function updateProfileImageHub(){
    let previewProfileImagePromise = previewProfileImage();
    previewProfileImagePromise
    .then(function(){
        uploadProfileImageFile();
    }).catch(function(err){
        console.log(err);
    });
}

function previewProfileImage(){
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
                    const imgWrapper = document.createElement('div');
                    imgWrapper.classList.add('profile_img');
                    imgWrapper.style.left = 'auto';
                    imgWrapper.style.top = 'auto';
                    imgWrapper.appendChild(image);

                    $('#profile_popup').find('.profile_container').html(imgWrapper);
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
    console.log(saveProfileImage);
    return axios.post(API_USER_URL+'/userInfo', {
    //return axios.post('localhost:8001/userInfo', {
        userProfileImages: [
            {
                profileImgUrl: fileLocation
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