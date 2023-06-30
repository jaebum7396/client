<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">
<head>
</head>
<script>
    function intentCall(url) {
        let intentURI;
        if (/Android/i.test(navigator.userAgent)) {
            // Android 인 경우
            intentURI = "https://" + url;
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // iOS 인 경우
            intentURI = "youtube://" + url;
        } else {
            // Android 또는 iOS가 아닌 경우
            // 대체 동작을 수행하거나 오류 메시지를 표시할 수 있습니다.
        }
        // 웹뷰에 URL 호출 요청 전달
        window.location.href = intentURI;
    }
</script>
<style>
    html, body {
        margin:0;
        width: 100%;
        height: 100%;
    }
    #app_contents{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
    }
    #app_header{
        height:18%;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:#b10d0c;
    }
    #app_header #logo{
        width:50%;
    }
    #app_body{
        height:50%;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:#ededed;
    }
    #app_footer{
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:#737373;
        color:white;
    }
    #youtube{
        width:100%;
        margin:20px;
        display:flex;
        flex-direction: column;
        justify-content:center;
    }
    #youtube_profile{
        height:70%;
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
    }
    #youtube_profile_img{
        width: 250px;
        border-radius:50%;
    }
    #subscribe_container{
        width:100%;
        height:20%;
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
    }
    #subscribe_btn{
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
        width:95%;
        height:80px;
        border-radius:40px;
        background-color: #333333;
        color:white;
        font-size:30px;
        font-weight:600;
    }
    #bottom{
        width:100%;
    }
</style>
<body>
<div id='app_contents'>
    <div id='app_header'>
        <img id='logo' src='hong/image/app_header.png'/>
    </div>
    <div id='app_body'>
        <div id='youtube'>
            <div id='youtube_profile'>
                <div id='youtube_profile_img_container'>
                    <img id='youtube_profile_img' src='hong/image/youtube_profile_img.jpg'/>
                </div>
                <p style='font-size:24px;'>
                    구독자 5만명 | 홍주식 채널>
                </p>
            </div>
            <div id='subscribe_container'>
                <div id='subscribe_btn' onclick="intentCall('www.youtube.com/channel/UCInTwYQR-ng61-0tlIinkZQ')">
                    구&nbsp;독
                </div>
            </div>
        </div>
    </div>
    <div id='app_footer' onclick="intentCall('www.hongsedu.co.kr')">
        <img id='bottom' src='hong/image/hongs_bottom.png'/>
    </div>
</div>
</body>
</html>