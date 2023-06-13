<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<head>
    <link href="css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <script src="js/main/user_info.js" type="text/javascript"></script>
</head>
<div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
        <main>
            <div id='user_info_container' class="container">
                <div class="row justify-content-center" style="margin-bottom: 20px;">
                    <div class="col-lg-7">
                        <div class="card-body">
                            <form>
                                <div style="display:flex;justify-content:center;margin:10px;overflow:hidden;">
                                    <input style='display:none;' type='file' id='imageInput' onchange='updateProfileImageHub()'>
                                    <div id='profile_container' class='profile_container' style='width:300px; height:300px;'>
                                    </div>
                                </div>
                                <div class="form-floating mb-3">
                                    <input class="form-control" id="userNickNm" type="text" required />
                                    <label for="userNickNm">닉네임</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" id="aboutMe" style='height:auto;  min-height: 150px; resize:none;'></textarea>
                                    <label for="aboutMe">자기소개</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <select class="form-control" id="lookingForGender" required>
                                        <option value="무관">무관</option>
                                        <option value="남자">남자</option>
                                        <option value="여자">여자</option>
                                    </select>
                                    <label for="lookingForGender">찾고 싶은 친구의 성별</label>
                                </div>
                                <div class="form-floating mb-3" onclick="openCharacterSelectionPopup()">
                                    <div id="character" class="form-control"></div>
                                    <label for="character">내 특징</label>
                                </div>
                                <div class="mt-4 mb-0">
                                    <div class="d-grid"><div class="btn btn-primary btn-block" onclick="saveUserInfoHub();">저장</div></div>
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
    <div class="close-button" style="width:100%;">
        <div onclick="closeCharacterSelectionPopup()">닫기</div>
    </div>
    <select class="characterSelectButton" onchange="characterSelect(this)">
        <option value="MBTI?">MBTI?</option>
        <option value="ENFP">ENFP</option>
        <option value="ENTP">ENTP</option>
        <option value="ENFJ">ENFJ</option>
        <option value="ENTJ">ENTJ</option>
        <option value="ESFP">ESFP</option>
        <option value="ESTP">ESTP</option>
        <option value="ESFJ">ESFJ</option>
        <option value="ESTJ">ESTJ</option>
        <option value="INFP">INFP</option>
        <option value="INTP">INTP</option>
        <option value="INFJ">INFJ</option>
        <option value="INTJ">INTJ</option>
        <option value="ISFP">ISFP</option>
        <option value="ISTP">ISTP</option>
        <option value="ISFJ">ISFJ</option>
        <option value="ISTJ">ISTJ</option>
    </select>
    <%--<div class="characterSelectButton" onclick="characterSelect(this)">우리엄마는 내가 제일 예쁘댔어..</div>--%>
    <select class="characterSelectButton" onchange="characterSelect(this)">
        <option id='주량?'>주량?</option>
        <option id='한잔_밖에_못마셔요'>한잔_밖에_못마셔요</option>
        <option id='분위기를_즐기는_수준의_주량'>분위기를_즐기는_수준의_주량</option>
        <option id='잘은_못마시지만_너랑은_더_마실_수_있어'>잘은_못마시지만_너랑은_더_마실_수_있어</option>
        <option id='술을_너무_잘마셔서_술에_취해본적이_없음'>술을_너무_잘마셔서_술에_취해본적이_없음</option>
    </select>
    <div id='혼자살아요' class="characterSelectButton" onclick="characterSelect(this)">혼자살아요</div>
    <div id='돈이많음' class="characterSelectButton" onclick="characterSelect(this)">돈이많음</div>
    <div id='요리를_좋아해요' class="characterSelectButton" onclick="characterSelect(this)">요리를_좋아해요</div>
    <div id='유명인(셀럽이란뜻)' class="characterSelectButton" onclick="characterSelect(this)">유명인(셀럽이란뜻)</div>
</div>

<style>
    .characterSelectButton {
        max-width: 150px;
        height: auto;
        border-radius: 5px;
        background-color: #eb8b1b;
        color:white;
        margin: 5px;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        word-wrap: break-word;
        border:0;
    }

    .characterSelectHashTag{
        margin:3px;
        padding:3px;
        border-radius: 5px;
        border:1px solid black;
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

