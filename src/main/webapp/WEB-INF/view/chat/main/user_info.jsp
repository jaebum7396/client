<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<head>
    <link href="css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
</head>
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
                                    <div onclick='openCharacterSelectionPopup()'></div>
                                    <div class="characterSelectionPopup">
                                        <div class="button" onclick="characterSelect(this)">머리꽃밭</div>
                                        <div class="button" onclick="characterSelect(this)">우리엄마는 내가 제일 예쁘댔어</div>
                                        <div class="button" onclick="characterSelect(this)">주량 한잔</div>
                                    </div>
                                    <div id="character">

                                    </div>
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
