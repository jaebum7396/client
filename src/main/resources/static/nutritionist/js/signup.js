function signupValidate() {
    // 입력값 가져오기
    var userId = document.getElementById("userId").value;
    var userPw = document.getElementById("userPw").value;
    var userPwConfirm = document.getElementById("userPwConfirm").value;
    var userPhoneNo = document.getElementById("userPhoneNo").value;
    var userNm = document.getElementById("userNm").value;
    var userGender = document.getElementById("userGender").value;

    // 빈 값 체크
    if (userId === "" || userPw === "" || userPwConfirm === "" || userPhoneNo === "" || userNm === "" || userGender === "") {
        alert("모든 필드를 입력해주세요.");
        return false;
    }

    // 이메일 형식 유효성 검사
    var emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(userId)) {
        alert("올바른 이메일 형식이 아닙니다.");
        return false;
    }

    // 비밀번호 유효성 검사
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(userPw)) {
        alert("비밀번호는 영어와 숫자를 섞어서 8글자 이상으로 설정해야 합니다.");
        return false;
    }

    // 비밀번호 확인 체크
    if (userPw !== userPwConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

    // 휴대폰 번호 유효성 검사
    var phoneRegex = /^010\d{8}$/;
    if (!phoneRegex.test(userPhoneNo)) {
        alert("올바른 휴대폰 번호 형식이 아닙니다.");
        return false;
    }

    // 추가적인 입력 유효성 검사 로직을 여기에 작성

    // 유효성 검사 통과 후 계정 생성 로직을 이어서 작성
    // ...

    return true;
}

function signup(){
    //console.log('signup>>>>>>>>>>>>')
    if(!signupValidate()){
        return;
    };

    axios.post(USER_URL+'/signup', {
        userId: $('#userId').val()
        , userPw: $('#userPw').val()
        , userPhoneNo: $('#userPhoneNo').val()
        , userNm: $('#userNm').val()
        , userGender: $('#userGender').val()
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        let result = response.data.result;
        //console.log(response.data);
        //console.log('token >>>>> ', localStorage.getItem("token"))
        location.href='/chat/login';
    })
    .catch(error => {
        alert('회원가입 실패');
        console.error(error);
    });
}