<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%
    /***********************************************************************************
     * ○ 파일	: palSurpporter.jsp
     * ● 설명	: 팔 서포터
     ***********************************************************************************/
%>
<!DOCTYPE html>

<!DOCTYPE html>
<html>
<head>


    <!-- 제목 -->
    <title>aflk::개인정보처리방침</title>

    <!-- 뷰포트 설정 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

    <!-- CSRF -->

    <!-- Favicon -->
    <link rel="shortcut icon" href="">
    <link rel="icon" href="">

    <!-- You MUST include jQuery before Fomantic -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>

    <!----------------------------------------------------------------------------------------------------------------------->
    <!-- Fomantic UI -->
    <!----------------------------------------------------------------------------------------------------------------------->

    <link rel="stylesheet" type="text/css" href="/dist/semantic.min.css">
    <script src="/dist/semantic.min.js"></script>

    <link rel="stylesheet" href="/dist/components/container.min.css">

    <link rel="stylesheet" href="/dist/components/dropdown.min.css">

    <!--
        Callback Issue Fixed in 2.8.8
        https://github.com/fomantic/Fomantic-UI/issues/1712#issuecomment-710634604
    -->
    <script src="/dist/components/dropdown.min.js"></script>

    <script src="/dist/components/calendar.min.js"></script>
    <link href="/dist/components/calendar.min.css" rel="stylesheet" type="text/css"/>

    <script src="/dist/components/modal.min.js"></script>
    <link href="/dist/components/modal.min.css" rel="stylesheet" type="text/css"/>

    <link href="/dist/components/table.min.css" rel="stylesheet" type="text/css"/>
    <link href="/dist/components/menu.min.css" rel="stylesheet" type="text/css"/>

    <link rel="stylesheet" href="/dist/components/segment.min.css">

    <link rel="stylesheet" href="/dist/components/divider.min.css">

    <link rel="stylesheet" href="/dist/components/grid.min.css">

    <link rel="stylesheet" href="/dist/components/header.min.css">

    <link rel="stylesheet" href="/dist/components/list.min.css">

    <script src="/dist/components/toast.min.js"></script>
    <link rel="stylesheet" href="/dist/components/toast.min.css">

    <script src="/dist/components/rating.min.js"></script>
    <link rel="stylesheet" href="/dist/components/rating.min.css">

    <link rel="stylesheet" href="/dist/components/modal.min.css">
    <script src="/dist/components/modal.min.js"></script>

    <link rel="stylesheet" href="/dist/components/slider.min.css">
    <script src="/dist/components/slider.min.js"></script>

    <!----------------------------------------------------------------------------------------------------------------------->

    <!----------------------------------------------------------------------------------------------------------------------->
    <!-- Datatables -->
    <!----------------------------------------------------------------------------------------------------------------------->

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.21/css/dataTables.semanticui.css"/>
    <link rel="stylesheet" type="text/css"
          href="https://cdn.datatables.net/responsive/2.2.5/css/responsive.semanticui.css"/>
    <link rel="stylesheet" type="text/css"
          href="https://cdn.datatables.net/scroller/2.0.2/css/scroller.semanticui.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/select/1.3.1/css/select.semanticui.css"/>

    <script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/dataTables.semanticui.js"></script>
    <script type="text/javascript"
            src="https://cdn.datatables.net/responsive/2.2.5/js/dataTables.responsive.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/scroller/2.0.2/js/dataTables.scroller.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/select/1.3.1/js/dataTables.select.js"></script>

    <link rel="stylesheet" href="//cdn.datatables.net/plug-ins/preview/searchPane/dataTables.searchPane.min.css">
    <script src="//cdn.datatables.net/plug-ins/preview/searchPane/dataTables.searchPane.min.js"></script>

    <!----------------------------------------------------------------------------------------------------------------------->

    <!-- Master CSS -->
    <link rel="stylesheet" href="/static/css/master.min.css"/>

    <!-- Configuration JS -->
    <script type="text/javascript" src="/config/json"></script>

    <!-- Functional JS -->
    <script type="text/javascript" src="/static/js/common/func.min.js"></script>

    <!-- DOM JS -->
    <script type="text/javascript" src="/static/js/common/dom.min.js"></script>

    <!-- FLAG JS -->
    <script type="text/javascript" src="/static/js/common/flag.min.js"></script>

    <!-- Language JS -->
    <script type="text/javascript" src="/static/js/language/ko.min.js"></script>


</head>
<body>

<div class="wrapper">


    <div class="main nav">
        <div id="common_nav" class="ui inverted menu">
            <div class="ui container">
                <a href="/" class="header item">
                    <img class="logo" src="/uploads/mmHyaOB3hi5lbEwBdrhjnyK8Myey0azHIc8bCUvvMjGmys0cEyDsBDty4KA4KaVy">&nbsp;&nbsp;aflk
                </a>
                <a href="/apply" class="item">
                    <img class="logo" src="/uploads/lEtduM3X2eNqjupT4eftlKzx7Dw0ltW1Sfdx06IJQYXVHAcfYAKpntWhD3iLa1Ov"/>
                    <span class="nav_text">이석 신청</span>
                </a>
                <a href="/check" class="item">
                    <img class="logo" src="/uploads/LMLDr0arSpDGmZcRs7ZG9m6v6haj4NXSHqfVzwUxaHzb4Ja7Kcs8pOuRIJGuORAr"/>
                    <span class="nav_text">이석 확인</span>
                </a>
                <a href="/manage" class="item">
                    <img class="logo" src="/uploads/YX0c48933aTQMQ0ocIeAY89ByUSE8g2bYdQb1p8VwlHBIjkgCKi3wkDmy4spe80Z"/>
                    <span class="nav_text">이석 관리</span>
                </a>

                <div class="right menu">

                    <div id="nav_right_item" class="right item">

                        <!-- 관리자 메뉴 -->


                        <!-- 관리자 메뉴 끝 -->

                        <!-- 기숙사 메뉴 -->


                        <!-- 기숙사 메뉴 끝 -->


                        <!-- 로그아웃 시 메뉴 -->

                        <a class="ui inverted button" href="/login">
                            <i class="sign in alternate icon"></i>
                            <span>로그인</span>
                        </a>

                        <!-- 로그아웃 시 메뉴 끝 -->


                    </div>
                </div>
            </div>
        </div>

        <div id="common_nav_stackable" class="ui inverted menu stackable">

            <div class="ui container">
                <a href="/" class="header item">
                    <img class="logo" src="/uploads/mmHyaOB3hi5lbEwBdrhjnyK8Myey0azHIc8bCUvvMjGmys0cEyDsBDty4KA4KaVy">&nbsp;&nbsp;aflk
                </a>
                <div class="item" style="padding:0;">
                    <a href="/apply" class="subitem imageicon">
                        <img class="logo"
                             src="/uploads/lEtduM3X2eNqjupT4eftlKzx7Dw0ltW1Sfdx06IJQYXVHAcfYAKpntWhD3iLa1Ov"/>
                        <span class="nav_text">이석 신청</span>
                    </a>
                    <a href="/check" class="subitem imageicon">
                        <img class="logo"
                             src="/uploads/LMLDr0arSpDGmZcRs7ZG9m6v6haj4NXSHqfVzwUxaHzb4Ja7Kcs8pOuRIJGuORAr"/>
                        <span class="nav_text">이석 확인</span>
                    </a>
                    <a href="/manage" class="subitem imageicon">
                        <img class="logo"
                             src="/uploads/YX0c48933aTQMQ0ocIeAY89ByUSE8g2bYdQb1p8VwlHBIjkgCKi3wkDmy4spe80Z"/>
                        <span class="nav_text">이석 관리</span>
                    </a>

                    <div class="right menu">

                        <div id="nav_right_item" class="right item">

                            <!-- 관리자 메뉴 -->


                            <!-- 관리자 메뉴 끝 -->

                            <!-- 기숙사 메뉴 -->


                            <!-- 기숙사 메뉴 끝 -->


                            <!-- 로그아웃 시 메뉴 -->

                            <a class="ui inverted button" href="/login">
                                <i class="sign in alternate icon"></i>
                                <span>로그인</span>
                            </a>

                            <!-- 로그아웃 시 메뉴 끝 -->

                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>


    <div class="main content_wrapper">
        <div class="ui main container">

            <h1 class="ui header">개인정보처리방침</h1>
            <p>통합 이석 관리 플랫폼 aflk의 개인정보처리방침입니다.</p>

            <div class="ui piled segment"><h4 class="ui header">개요</h4>
                <p><em>
                    <aflk> ('https://aflk.com', 'https://xn--3i4bz9iu8d.com' 이하 'aflk')
                </em> 은 개인정보보호법에 따라 이용자의 개인정보 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원할하게 처리하고자 다음과 같은 처리방침을 두고 있습니다.
                </p>
                <p><em>
                    <aflk>
                </em> 은 개인정보처리방침을 개정하는 경우 최소 1개월 전에 웹사이트 공지사항(또는 개별공지)를 통하여 공지할 것입니다.
                </p>
                <p> 본 방침은 2022년 3월 2일부터 시행됩니다. </p>
                <p> 본 방침은 개인정보보호 종합포털에서 제공하는 <em>개인정보처리방침 만들기</em> 기능을 바탕으로 작성되었습니다. </p></div>
            <div class="ui raised segment">
                <p><strong>제 1조. 개인정보의 처리 목적</strong> <br/> <em>
                    <aflk>
                </em> 은 이용자의 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 명시된 목적 이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 최소 1개월 전에 웹사이트
                    공지사항(또는 개별공지)을 통해 사전 동의를 구할 예정입니다.
                <ol class="ui suffixed list">
                    <li>
                        <div>홈페이지 회원 가입 및 관리</div>
                        <div class="list">
                            <div class="item">- 회원 가입의사 확인</div>
                            <div class="item">- 회원제 서비스 제공에 따른 본인 식별 및 인증</div>
                            <div class="item">- 회원자격 유지 및 관리</div>
                            <div class="item">- 제한적 본인확인제 시행에 따른 본인확인</div>
                            <div class="item">- 서비스 부정 이용 방지</div>
                            <div class="item">- 각종 고지 및 통지</div>
                            <div class="item">- 분쟁 조정을 위한 기록 보존</div>
                        </div>
                    </li>
                    <li>
                        <div>재화 또는 서비스 제공</div>
                        <div class="list">
                            <div class="item">- 서비스 제공</div>
                            <div class="item">- 콘텐츠 제공</div>
                            <div class="item">- 맞춤 서비스 제공</div>
                            <div class="item">- 본인인증</div>
                            <div class="item">- 연령인증</div>
                        </div>
                    </li>
                </ol>
                </p></div>
            <div class="ui raised segment">
                <p><strong>제 2조. 개인정보 파일 현황</strong> <br/> <em>
                    <aflk>
                </em> 이 개인정보 보호법 제 32조에 따라 등록 및 공개하는 개인정보파일은 다음과 같습니다.
                <ol class="ui suffixed list">
                    <li> aflk 데이터베이스
                        <div class="list">
                            <div class="item">- 수집 방법 : 홈페이지</div>
                            <div class="item">- 보유 근거 : 정보 주체 동의</div>
                            <div class="item">- 보유 기간 : 회원 탈퇴 시 지체 없이 파기</div>
                        </div>
                    </li>
                </ol>
                기타 <em>
                <aflk>
            </em> 의 개인정보 파일 등록 사항 공개는 행정안전부 개인정보보호종합지원포털(https://privacy.go.kr) → 개인정보민원 → 개인정보열람등 요구 → 개인정보파일 목록검색 메뉴를
                활용해주시기 바랍니다. </p></div>
            <div class="ui raised segment">
                <p><strong>제 3조. 개인정보의 처리 및 보유 기간</strong> <br/> <em>
                    <aflk>
                </em> 은 법령에 따른 개인정보 보유 및 이용 기간 또는 정보 주체로부터 개인정보를 수집할 당시에 동의 받은 개인정보의 보유 및 이용 기간 내에서 개인정보를 처리 및 보유합니다. 제
                    1조에 명시된 개인정보의 처리 목적에 따른 개인정보의 처리 및 보유 기간은 아래와 같습니다.
                <ol class="ui suffixed list">
                    <li> 홈페이지 회원 가입 및 관리 <br/>
                        <p> 홈페이지 회원 가입 및 관리와 관련한 개인정보는 수집 및 이용에 관한 동의일로부터 회원 탈퇴 시 까지 보유 및 이용되며 회원 탈퇴 시에는 개인정보를 지체 없이
                            파기합니다. </p>
                        <div class="list">
                            <div class="item">- 보유 근거 : 정보 주체 동의</div>
                            <div class="item">- 예외 사유 : 이용자의 부정 이용 기록이 발생한 경우 혹은 관계 법령에 의거해 일정 기간 이상 개인정보를 보관해야 하는 경우
                            </div>
                        </div>
                        <br/> 이용자의 부정 이용이 발생한 경우 부정 이용 방지를 위하여 부정 이용이 발생한 시점으로부터 6개월간 보관하고 파기합니다. <br/> 또한, 통신비밀보호법에 따라
                        회원의 로그인 기록은 수집 시점으로부터 3개월간 법령의 규정에 따라 의무적으로 개인정보를 보관하고 있습니다.
                    </li>
                    <li> 재화 또는 서비스 제공 <br/>
                        <p> 재화 또는 서비스 제공과 관련한 개인정보는 수집 및 이용에 관한 동의일로부터 회원 탈퇴 시까지 보유 및 이용되며 회원 탈퇴 시에는 개인정보를 지체 없이
                            파기합니다. </p>
                        <div class="list">
                            <div class="item">- 보유 근거 : 정보 주체 동의</div>
                            <div class="item">- 예외 사유 : 이용자의 부정 이용 기록이 발생한 경우 혹은 관계 법령에 의거해 일정 기간 이상 개인정보를 보관해야 하는 경우
                            </div>
                        </div>
                        <br/> 이용자의 부정 이용이 발생한 경우 부정 이용 방지를 위하여 부정 이용이 발생한 시점으로부터 6개월간 보관하고 파기합니다.
                    </li>
                </ol>
                </p></div>
            <div class="ui raised segment">
                <p><strong>제 4조. 정보 주체의 권리 행사 보장</strong> <br/> <em>
                    <aflk>
                </em> 은 개인정보 주체의 권익을 보호하고자 정보 주체의 권리 행사를 보장하고 있으며 아래와 같은 권리를 행사하실 수 있음을 알려드립니다.
                <ol class="ui suffixed list">
                    <li> 정보 주체는 <em>
                        <aflk>
                    </em> 에 언제든지 개인정보 열람, 정정, 삭제, 처리 정지 요구 등의 권리를 행사할 수 있습니다.
                    </li>
                    <li> 제 1항에 따른 권리 행사는 정보 주체의 법정 대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행 규칙 별지 제 11호 서식에
                        따른 위임장을 제출하여야 합니다.
                    </li>
                    <li> 개인정보의 열람 및 처리 정지 요구는 개인정보보호법 제 35조 제 5항, 제 37조 제 2항에 의하여 정보 주체의 권리가 제한 될 수 있습니다.</li>
                    <li> 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에 그 삭제를 요구할 수 없습니다.</li>
                    <li><em>aflk</em>은 정보 주체 권리에 따른 열람의 요구, 정정 및 삭제의 요구, 처리 정지의 요구 시 열람 등을 요구한 자가 본인이거나 정당한 대리인인지를 확인합니다.
                    </li>
                </ol>
                </p></div>
            <div class="ui raised segment">
                <p><strong>제 5조. 개인정보 처리 항목</strong> <br/> <em>
                    <aflk>
                </em> 은 제 1조에 명시된 개인정보의 처리 목적에 따라 아래의 개인정보의 항목을 처리하고 있습니다. 자동 생성 항목의 경우 서비스 이용 도중 자동으로 생성되는 항목이며 제 7조에
                    따라 개인정보 자동 수집을 거부할 수 있습니다. 자동 생성 항목은 상황에 따라 개인정보에 해당할 수도 있고 그렇지 않을 수도 있음을 알려드립니다.
                <ol class="ui suffixed list">
                    <li> 홈페이지 회원 가입 및 관리
                        <div class="list">
                            <div class="item">- 필수 항목 : 이메일, 비밀번호, 로그인 ID, 성별, 이름, 서비스 이용 기록, 접속 IP 정보, 학적</div>
                            <div class="item">- 선택 항목 : 휴대 전화 번호, 생년 월일</div>
                            <div class="item">- 자동 생성 항목 : 서비스 이용 기록, 접속 로그, 쿠키</div>
                        </div>
                    </li>
                    <li> 재화 또는 서비스 제공
                        <div class="list">
                            <div class="item">- 필수 항목 : 이메일, 비밀번호, 로그인 ID, 성별, 이름, 서비스 이용 기록, 접속 IP 정보, 학적</div>
                            <div class="item">- 선택 항목 : 휴대 전화 번호, 생년 월일</div>
                            <div class="item">- 자동 생성 항목 : 서비스 이용 기록, 접속 로그, 쿠키</div>
                        </div>
                    </li>
                </ol>
                </p></div>
            <div class="ui raised segment">
                <p><strong>제 6조. 개인정보의 파기</strong> <br/> <em>
                    <aflk>
                </em> 은 원칙적으로 개인정보 처리 목적이 달성된 경우에는 지체 없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.
                <ul class="ui list">
                    <li> 파기 절차 <p> 이용자가 입력한 정보는 목적 달성 후 별도의 데이터베이스(종이의 경우 별도의 서류)에 옮겨서 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후
                        혹은 즉시 파기됩니다. 이때, 데이터베이스로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다. </p></li>
                    <li> 파기 기한 <p> 이용자의 개인정보는 개인정보의 보유 기간이 경과된 경우에는 보유 기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지,
                        사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다. </p></li>
                    <li> 파기 방법 <p> 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다. </p></li>
                </ul>
                </p></div>
            <div class="ui raised segment">
                <p><strong>제 7조. 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항</strong> <br/> <em>
                    <aflk>
                </em> 은 개별적인 맞춤 서비스를 제공하기 위해 이용 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터
                    브라우저에 보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내의 하드 디스크에 저장되기도 합니다.
                <ol class="ui suffixed list">
                    <li> 쿠키의 사용 목적
                        <div class="list">
                            <div class="item"> 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용 형태, 인기 검색어, 보안 접속 여부 등을 파악하여 이용자에게
                                최적화된 정보 제공을 위해 사용됩니다.
                            </div>
                        </div>
                    </li>
                    <li> 쿠키의 설치, 운영 및 거부
                        <div class="list">
                            <div class="item"> (Internet Explorer) 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을
                                거부할 수 있습니다.
                            </div>
                            <div class="item"> (Chrome) 웹 브라우저 상단의 주소창 왼쪽 아이콘(http 연결일 경우 i 모양 아이콘, https 연결일 경우 자물쇠 모양
                                아이콘) > 쿠키 > 삭제 등의 방법을 통해 저장을 거부할 수 있습니다.
                            </div>
                            <div class="item"> (타 브라우저) 타 브라우저의 경우 각 브라우저의 홈페이지 > 사용 매뉴얼을 참고하셔서 쿠키 저장을 거부할 수 있습니다.</div>
                        </div>
                    </li>
                    <li> 쿠키 저장 거부 후 서비스 사용에 대한 안내
                        <div class="list">
                            <div class="item"> 쿠키 저장을 거부할 경우 로그인 제한, 맞춤형 서비스 제한과 같이 정상적인 서비스 이용에 어려움이 발생할 수 있습니다.</div>
                        </div>
                    </li>
                </ol>
                </p></div>
            <div class="ui raised segment">
                <p><strong>제 8조. 개인정보 보호 책임자</strong> <br/> <em>
                    <aflk>
                </em> 은 개인정보 처리에 관한 업무를 총괄해서 책임지고 개인정보 처리와 관련한 정보 주체의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호 책임자를 지정하고
                    있습니다.
                <ul class="ui list">
                    <li> 개인정보 보호 책임자
                        <div class="list">
                            <div class="item"> 성명 : 남정연</div>
                            <div class="item"> 연락처 : <a href="/cdn-cgi/l/email-protection" class="__cf_email__"
                                                        data-cfemail="9ce8f3f2e5f2fdf1e5dcfdececf9eee6b2fff3b2f7ee">[email&#160;protected]</a>
                            </div>
                        </div>
                    </li>
                    <li> 개인정보 보호 책임 부서
                        <div class="list">
                            <div class="item"> 담당자 : 남정연</div>
                            <div class="item"> 연락처 : <a href="/cdn-cgi/l/email-protection" class="__cf_email__"
                                                        data-cfemail="64100b0a1d0a05091d2405141401161e4a070b4a0f16">[email&#160;protected]</a>
                            </div>
                        </div>
                    </li>
                    <br/>
                    <p> 정보 주체께서는 <em>
                        <aflk>
                    </em> 의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해 구제 등의 관한 사항을 개인정보 보호 책임자 및 담당 부서로 문의하실 수 있습니다.
                        <em>
                            <aflk>
                        </em> 은 정보 주체의 문의에 대해 지체 없이 답변을 드리고 처리해드릴 것입니다.
                    </p>
                </ul>
                </p></div>
            <div class="ui raised segment"><p><strong>제 9조. 개인정보 처리 방침의 변경</strong> <br/> 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및
                방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는 변경 사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다. </p></div>
            <div class="ui raised segment">
                <p><strong>제 10조. 개인정보의 안전성 확보 조치</strong> <br/> <em>
                    <aflk>
                </em> 은 개인정보보호법 제 29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
                <ol class="ui suffixed list">
                    <li> 정기적인 자체 감사 실시
                        <div class="list">
                            <div class="item"> 개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.</div>
                        </div>
                    </li>
                    <li> 개인정보 취급 직원의 최소화 및 교육
                        <div class="list">
                            <div class="item"> 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.</div>
                        </div>
                    </li>
                    <li> 내부관리계획의 수립 및 시행
                        <div class="list">
                            <div class="item"> 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</div>
                        </div>
                    </li>
                    <li> 해킹 등에 대비한 기술적 대책
                        <div class="list">
                            <div class="item"><em>
                                <aflk>
                            </em> 은 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된
                                구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.
                            </div>
                        </div>
                    </li>
                    <li> 개인정보의 암호화
                        <div class="list">
                            <div class="item"> 이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를
                                암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.
                            </div>
                        </div>
                    </li>
                    <li> 접속기록의 보관 및 위변조 방지
                        <div class="list">
                            <div class="item"> 개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능
                                사용하고 있습니다.
                            </div>
                        </div>
                    </li>
                    <li> 정기적인 자체 감사 실시
                        <div class="list">
                            <div class="item"> 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를
                                하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
                            </div>
                        </div>
                    </li>
                </ol>
                </p></div>
        </div>
    </div>

</div>


<div class="ui inverted vertical footer segment">
    <div class="ui aligned container">
        <div class="ui horizontal inverted small divided link list">

            <div class="ui stackable inverted divided equal height stackable grid">

                <div class="wide column">

                    <p class="item footer_sitemap" style="display:inline">

                        <a class="item footer_item" href="/privacy_policy">개인정보처리방침</a>

                    </p>
                </div>
            </div>

        </div>
    </div>
</div>
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
<script type="text/javascript">

    window.logged_in = false;

    window.user_id = 'null';
    window.user_name = 'null';

</script>


</body>
</html>