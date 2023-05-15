<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 7:03
--%>
<link href="css/popup/profile.css" rel="stylesheet" type="text/css"/>
<script src="js/popup/profile.js" type="text/javascript"></script>

<div id='profile_popup' style=''>
    <div id="chat_header" style=''>
        <div id="close_btn" style='' onclick = "closePopupProfile();">
            <div class="close_chat close" style='width:50px;'>
            </div>
        </div>
    </div>
    <div id="contents" style=''>
        <div id='profile_background_container' style=''>
            <div class='null_container' style=''>
            </div>
            <div style='height: 50%;  width: 100%; display: flex; flex-direction: column; align-items: center;'>
                <div id='profile_container' class='profile_container' style='width:100px; height:100px;'>
                </div>
                <input style='display:none;' type="file" id="imageInput">
                <div class='name_container' style='font-size: 20px;'>
                    <div style='max-width: 200px; display:flex;'>
                        <input class='name' type='text' style='font-size:20px; font-weight:600; border:0;' readonly='readonly'/>
                        <div class='name_edit_btn' style='text-align:center;padding-top:5px;' onclick='nameEditable(this);'><img src='/chat/image/edit-3.svg'/></div>
                        <input class='CHANNEL_CD' type='hidden'/>
                        <input class='USER_CD' type='hidden'/>
                        <input class='popup_flag' type='hidden'/>
                    </div>
                </div>
                <div class='message_container' style='font-size: 20px;'>
                    <div style='max-width: 200px; display:flex;'>
                        <input class='message' type='text' style='font-size:20px; font-weight:600; border:0;' readonly='readonly'/>
                        <div class='message_edit_btn' style='text-align:center;padding-top:5px;' onclick='messageEditable(this);'><img src='/chat/image/edit-3.svg'/></div>
                        <input class='USER_CD' type='hidden'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="chat_footer">
    </div>
</div>
<script>
    const fileInput = document.querySelector('#imageInput');
    const imagePreview = document.querySelector('#imagePreview');

    fileInput.addEventListener('change', function() {
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

                    $('#profile_container').html(imgWrapper);
                }
                uploadProfile()
            }
        }
    });

    // 이미지 업로드
    function uploadProfile() {
        // input 요소에서 선택된 파일 가져오기
        const loginUserCd = document.getElementById('LOGIN_USER_CD');
        const file = document.getElementById("imageInput").files[0];

        // FormData 객체 생성
        const formData = new FormData();
        formData.append("file", file);

        // HTTP 요청 생성
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/uploadProfileImage?loginUserCd="+loginUserCd.value, true);

        // 요청 완료 시 처리할 콜백 함수 등록
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log("이미지 업로드 성공");
            } else {
                console.log("이미지 업로드 실패");
            }
        };

        // HTTP 요청 전송
        xhr.send(formData);
    }
</script>
