
function initUserInfoTab() {
    //alert('준비중입니다.');
    $('.list_container').css('display', 'none');
    $('#user_info_container').css('display', 'block');

    let getMyInfoPromise = getMyInfo();
    getMyInfoPromise
        .then((response) => {
            console.log('getMyInfoResp', response)
        })
        .catch((error) => {
            console.log(error);
            if(error.response.data.statusCode == 401||error.response.data.body.statusCode == 401){
                localStorage.setItem('token', '');
                alert('로그인이 만료되었습니다');
                location.href = 'login';
            }else{
                alert(error.response.data.message);
                console.error(error);
            }
        })
}
function openCharacterSelectionPopup() {
    $('#characterSelectionPopup').css('display', 'block');
}

function closeCharacterSelectionPopup() {
    $('#characterSelectionPopup').css('display', 'none');
}

function characterSelect(element) {
    var character = document.getElementById("character");
    var button = document.createElement("div");
    button.classList.add("button");
    button.innerText = element.innerText;
    character.appendChild(button);
}