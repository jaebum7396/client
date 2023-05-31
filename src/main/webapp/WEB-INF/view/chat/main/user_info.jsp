<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<head>
    <link href="css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
</head>

<script>
    function openCharacterSelectionPopup() {
        $('#characterSelectionPopup').css('display', 'block');
    }

    function closeCharacterSelectionPopup() {
        $('#characterSelectionPopup').css('display', 'none');
    }

    function characterSelect(element) {
        var characterSelectionTrigger = document.getElementById("characterSelectionTrigger");
        var character = document.getElementById("character");
        var button = document.createElement("div");
        button.classList.add("button");
        button.innerText = element.innerText;
        character.appendChild(button);
        //characterSelectionTrigger.innerText = element.innerText;
    }
</script>
<div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
        <main>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-7">
                        <div class="card-body">
                            <form>
                                <div style="display:flex;justify-content: center;">
                                    <img src="/chat/image/logo_app.png" style="width:200px;">
                                </div>
                                <div class="form-floating mb-3">
                                    <input class="form-control" id="userNickNm" type="text" required />
                                    <label for="userNickNm">닉네임</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" id="aboutMe" ></textarea>
                                    <label for="userNickNm">자기소개</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <select class="form-control" id="userGender" required>
                                        <option value="">무관</option>
                                        <option value="M">남자</option>
                                        <option value="W">여자</option>
                                    </select>
                                    <label for="userGender">찾고 싶은 친구의 성별</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <div onclick="openCharacterSelectionPopup()" id="characterSelectionTrigger"></div>
                                    <div id="character" class="form-control"></div>
                                    <label for="character">내 특징</label>
                                </div>
                                <div class="mt-4 mb-0">
                                    <div class="d-grid"><div class="btn btn-primary btn-block" onclick="saveUserInfo();">저장</div></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
<div class="characterSelectionPopup" id="characterSelectionPopup">
    <div class="close-button">
        <div onclick="closeCharacterSelectionPopup()">닫기</div>
    </div>
    <div class="button" onclick="characterSelect(this)">머리꽃밭</div>
    <div class="button" onclick="characterSelect(this)">우리엄마는 내가 제일 예쁘댔어</div>
    <div class="button" onclick="characterSelect(this)">주량 한잔</div>
</div>

<style>
    .button {
        max-width: 150px;
        height: auto;
        background-color: #ccc;
        margin: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        word-wrap: break-word;
    }

    .characterSelectionPopup {
        display: none;
        position: absolute;
        z-index: 1;
        background-color: #f9f9f9;
        border: 1px solid #ccc;
        padding: 10px;
        overflow-y: auto;
        width:80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        flex-wrap: wrap;
    }

    .form-floating.mb-3 {
        position: relative;
    }

    .form-floating.mb-3:hover .characterSelectionPopup {
        display: block;
    }

    #character {
        display:flex;
        border: 1px solid #ccc;
        padding: 10px;
        padding-top:30px;
        margin-top: 10px;
        flex-wrap: wrap;
        height: auto;
        min-height: 58px;
    }

    .close-button {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }

    .close-button button {
        cursor: pointer;
    }
</style>

