function login(){
    console.log('login>>>>>>>>>>>>')
    axios.post(backendUrl+'/user/login', {
        userId: $('#userId').val(),
        userPw: $('#userPw').val()
    }, {
        headers: {
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