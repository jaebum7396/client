<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>register - chat</title>
        <jsp:directive.include file="../common/head.jsp"/>
        <link href="css/styles.css" rel="stylesheet" />

        <script src="js/signup.js<%= version %>" type="text/javascript"></script>
    </head>
    <body class="bg-primary">
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
                                            <input class="form-control" id="userId" type="email" placeholder="name@example.com" required />
                                            <label for="userId">유저 아이디(name@example.com)</label>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input class="form-control" id="userPw" type="password" placeholder="(영문과 숫자 조합, 8글자 이상)" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" required />
                                                    <label for="userPw">비밀번호(영문과 숫자 조합, 8글자 이상)</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input class="form-control" id="userPwConfirm" type="password" placeholder="Confirm password" required />
                                                    <label for="userPwConfirm">비밀번호 확인(Confirm password)</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input class="form-control" id="userPhoneNo" type="text" placeholder="010XXXXXXXX (숫자만 입력)" pattern="^010\d{8}$" required />
                                            <label for="userPhoneNo">휴대폰 번호(숫자만 입력)</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input class="form-control" id="userNm" type="text" placeholder="홍길동" required />
                                            <label for="userNm">사용자 이름</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <select class="form-control" id="userGender" required>
                                                <option value="">성별 선택</option>
                                                <option value="남자">남자</option>
                                                <option value="여자">여자</option>
                                            </select>
                                            <label for="userGender">성별</label>
                                        </div>
                                        <div class="mt-4 mb-0">
                                            <div class="d-grid"><div class="btn btn-primary btn-block" onclick="signup();">계정 생성</div></div>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-footer text-center py-3">
                                    <div class="small"><a href="login">이미 계정이 있나요? 로그인하기</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <%--<div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2023</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>--%>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
    </body>
</html>
