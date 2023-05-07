const serverUrl = 'http://52.79.162.165:8000';
function login(){
    axios({
        url: serverUrl + '/user/login', // 통신할 웹문서
        method: 'post', // 통신할 방식
        data: { // 인자로 보낼 데이터
            userId: $('#userId').val()
            , userPw: $('#userPw').val()
        }
    });
}