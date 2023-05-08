const serverUrl = 'http://52.79.162.165:8000';
function signup(){
    console.log('signup>>>>>>>>>>>>')
    axios.post(serverUrl+'/user/signup', {
        userId: $('#userId').val()
        , userPw: $('#userPw').val()
        , userPhoneNo: $('#userPhoneNo').val()
        , userNm: $('#userNm').val()
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        let result = response.data.result;
        console.log(response.data);
        //console.log('token >>>>> ', localStorage.getItem("token"))
        location.href='/chat/login';
    })
    .catch(error => {
        alert('회원가입 실패');
        console.error(error);
    });
}