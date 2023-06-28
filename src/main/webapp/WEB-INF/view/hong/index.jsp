<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="ko">
    <head>
    </head>
    <script>
        function intentCall(url) {
            if (/Android/i.test(navigator.userAgent)) {
                // Android 인 경우
                window.location.href = 'intent://www.youtube.com/watch?v='
                    //+ videoId + '#Intent;package=com.google.android.youtube;end;';
            } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                // iOS 인 경우
                window.location.href = 'youtube://www.youtube.com/watch?v='
                    //+ videoId;
            } else {
                // Android 또는 iOS가 아닌 경우
                // 대체 동작을 수행하거나 오류 메시지를 표시할 수 있습니다.
            }
        }
    </script>
    <body>
        <h2 onclick = "intentCall('vnd.youtube:VIDEO_ID')">외부 intent- youtube</h2>
        <h2>외부 intent- browser</h2>
    </body>
</html>