const serverUrl = 'http://52.79.162.165:8000';
function login(){
    console.log('login>>>>>>>>>>>>')
    axios.post(serverUrl+'/user/login', {
        userId: $('#userId').val(),
        userPw: $('#userPw').val()
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
}