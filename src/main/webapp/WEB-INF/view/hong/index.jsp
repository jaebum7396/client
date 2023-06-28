<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
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
    <body>
        <h2 onclick = "intentCall('www.youtube.com/channel/UCInTwYQR-ng61-0tlIinkZQ')">외부 intent- youtube</h2>
        <h2 onclick = "intentCall('www.hongsedu.co.kr')">외부 intent- browser</h2>
    </body>
</html>