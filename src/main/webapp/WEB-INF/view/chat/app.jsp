<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="ko">
    <head>
        <title>app - chat</title>
        <jsp:directive.include file="../common/head.jsp"/>
        <!-- CSS -->
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
        <link href="css/app.css" rel="stylesheet" type="text/css"/>
        <script src="js/app.js" type="text/javascript"></script>
    </head>
<script>
    // 로그인 체크
    if (!localStorage.getItem("token")) {
        location.href = "login";
    }
</script>
<style>

</style>
<body>
    <div id="chatbox">
        <input type='hidden' class='OPEN_CHANNEL_CD' id='OPEN_CHANNEL_CD' name='OPEN_CHANNEL_CD' value=''/>
        <div id="tab_container">
            <div id="topmenu">
                <div id='app_title_container'>
                    <div id="app_title_img" class='app_title'>
                        <img src="image/logo.png" style='width: 100%;'/>
                    </div>
                    <div id="app_title"class='app_title'>
                        <div id="app_title_text">채팅</div>
                    </div>
                </div>
                <div id='app_header_menu'>
                    <span class="app_header user_add">
                        <img src="image/user_add.svg" onclick=""/>
                    </span>
                    <span class="app_header settings">
                        <img src="image/settings.svg" onclick=""/>
                    </span>
                </div>
            </div>
            <input type='hidden' name='current_page_num' value='0'/>
            <div id="friend_list_container" class='list_container' style=''></div>
            <div id="channel_list_container" class='list_container' style=''></div>
            <div id="botmenu">
                <span class="chat_header friends" onclick="myFriendList('0')">
                    <img src="image/users.svg"/>
                </span>
                <span class="chat_header chats">
                    <img src="image/message.svg" onclick="myChannelList('0')"/>
                </span>
                <span class="chat_header more_info">
                    <img src="image/more_info.svg" onclick=""/>
                </span>
            </div>
        </div>
        <div id="chatview" class="p1">
            <input type='hidden' name='current_page_num' value='0'/>
            <div id="chat_header">
                <!-- 사이드메뉴 -->
                <div class="left_side_btn"></div>
                <div onclick="history.back();" class="page_cover"></div>
                <div id="menu">
                    <ul class="nav">
                        <li>
                            <div onclick="history.back();" class="close"></div>
                        </li>
                        <li>
                            <a>
                                <div class='channel_user_btn'>대화상대</div>
                                <div class='channel_user_add_btn' style='' onclick="inviteList('0')">
                                    <img class='channel_user_add_btn_img' src="image/close.png" style=''/>
                                </div>
                            </a>
                            <ul class="channel_user_list">
                            </ul>
                        </li>
                    </ul>
                </div>
                <!-- 사이드메뉴 끝 -->
                <div id='channel_alias' style='font-weight: 800; font-size: 15px;'>

                </div>
                <div id="close_chat" style='margin-left: 10px;'>
                    <div class="close_chat close" style='width:50px;'>
                    </div>
                </div>
            </div>
            <div id='chat-message-box' style='height: calc(100% - 130px);'>
                <div id="chat-messages" style='height: 100%;'></div>
            </div>
            <div id="sendmessage">
                <input type="text" id='msg' class='msg' value="Send message..."/>
                <button id="send" onclick="sendMessageHub()"></button>
            </div>
        </div>
    </div>
</body>
</html>