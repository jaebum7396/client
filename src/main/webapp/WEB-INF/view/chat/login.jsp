<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <title>Login - chat</title>
        <jsp:directive.include file="../common/head.jsp"/>
        <link href="css/styles.css" rel="stylesheet" />
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
        <script src="js/login.js<%= version %>" type="text/javascript"></script>
    </head>
    <%

    %>
    <body class="bg-primary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <div class="" style='margin:20px; margin-top:15%;'>
                    <div>
                        <div class="card-header" style="display:flex;justify-content: center;">
                            <img src="/chat/image/logo_app.png" style="width:200px;">
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-floating mb-3">
                                    <input class="form-control" id="userId" type="email" placeholder="name@example.com" />
                                    <label for="userId">아이디</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input class="form-control" id="userPw" type="password" placeholder="Password" />
                                    <label for="userPw">비밀번호</label>
                                </div>
                                <%--<div class="form-check mb-3">
                                    <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                    <label class="form-check-label" for="inputRememberPassword">Remember Password</label>
                                </div>--%>
                                <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                    <%--<a class="small" href="password">Forgot Password?</a>--%>
                                    <div class="btn btn-primary" onclick="location.href='signup'">회원가입</div>
                                    <div class="btn btn-primary" onclick='login();'>로그인</div>
                                </div>
                            </form>
                        </div>
                        <%--<div class="card-footer text-center py-3">
                            <div class="small"><a href="signup">회원가입</a></div>
                        </div>--%>
                    </div>
                </div>
                <%--<main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">

                            </div>
                        </div>
                    </div>
                </main>--%>
            </div>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; AFLK 2023</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
    </body>
</html>
