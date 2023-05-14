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
