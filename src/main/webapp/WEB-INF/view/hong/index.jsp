<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="ko">
    <head>
    </head>
    <script>
        function intentCall(url) {
            let channelID = "UCInTwYQR-ng61-0tlIinkZQ";  // 유튜버의 채널 ID를 입력하세요.
            let youtubeURL = "www.youtube.com/channel/" + channelID;

            let intentURI;
            if (/Android/i.test(navigator.userAgent)) {
                // Android 인 경우
                intentURI = "vnd.youtube://" + youtubeURL;
            } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                // iOS 인 경우
                intentURI = "youtube://" + youtubeURL;
            } else {
                // Android 또는 iOS가 아닌 경우
                // 대체 동작을 수행하거나 오류 메시지를 표시할 수 있습니다.
            }
            // 유튜브 앱 실행을 시도합니다.
            window.location.href = intentURI;
            // 유튜브 앱이 없는 경우, 웹 사이트로 이동합니다.
            let fallbackURL = "https://www.youtube.com";  // 유튜브 앱이 없는 경우, 웹 사이트로 이동할 URL을 입력하세요.
            setTimeout(function() {
                window.location.href = fallbackURL;
            }, 2000);  // 2초 후에 fallbackURL로 이동합니다.
        }
    </script>
    <body>
        <h2 onclick = "intentCall('')">외부 intent- youtube</h2>
        <h2>외부 intent- browser</h2>
    </body>
</html>