$(document).ready(function(){
    $('#layoutAuthentication #userId').keyup(function(e) {
        if (e.keyCode == 13) {
            $('#userPw').focus();
        }
    });
    $('#layoutAuthentication #userPw').keyup(function(e) {
        if (e.keyCode == 13) {
            login();
        }
    });
})
function login(){
    axios.post(USER_URL+'/login', {
        userId: $('#userId').val(),
        userPw: $('#userPw').val()
    }, {
        headers: {
            withCredentials: true,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        let result = response.data.result;
        //console.log(response.data);
        localStorage.setItem("token", result.token);
        //console.log('token >>>>> ', localStorage.getItem("token"))
        location.href='/chat/app';
    })
    .catch(error => {
        alert('로그인 실패');
        console.error(error);
    });
}