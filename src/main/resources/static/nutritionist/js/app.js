//***********************************************************************************
//* 공통
//***********************************************************************************
$(document).ready(function() {
    preventBrowserZoom();
    initPage();
});
//***********************************************************************************
//* page init 관련
//***********************************************************************************
function initPage() {
    $('.dropdown-list').removeClass('openToggle');
}
//***********************************************************************************
//* debugLog
//***********************************************************************************
const debugYn = CURRENT_PROFILE == 'local' ? true : false;
//const debugYn = true;
function debugLog(p_requestUrl, p_msg){
    if(debugYn){
        console.log('[DEBUG]', getCurrentTime(),'\n', p_requestUrl, p_msg);
    }
}
//***********************************************************************************
//* axios 설정
//***********************************************************************************
axios.interceptors.request.use(req => {
    req.headers.Authorization = localStorage.getItem("token");
    req.headers['Content-Type'] = 'application/json';
    return req;
});

let refreshTokenYn = true;
axios.interceptors.response.use(res => {
    if(debugYn){
        debugLog(res.config.url, res)
    }
    return res;
}, err => {
    console.log('[err]','>>>>>', err.response.config.url, err.response);
    if(err.response.status == 401){
        if(refreshTokenYn) {
            refreshTokenYn = false;
            if(confirm('로그인을 연장하시겠습니까?')){
                refreshToken();
            }else{
                alert('로그인이 만료되었습니다');
                localStorage.setItem('fcmToken', '');
                refreshFcmToken();
                localStorage.setItem('token', '');
                location.href = 'login';
            }
        }
    }else if(err.response.data.statusCodeValue == 401){
        localStorage.setItem('token', '');
        alert('로그인이 만료되었습니다');
        location.href = 'login';
    }else if(err.response.data.statusCode == 500){
        alert('서버에러가 발생했습니다');
        //location.reload();
    }else if(err.response.data.statusCode == 503){
        alert("잠시 후에 다시 시도하세요");
        location.reload();
    }
})
//***********************************************************************************
//* 모바일 디바이스 제어 관련
//***********************************************************************************
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let hasFocus = document.hasFocus();
let hasFocusApp = isMobileDevice();
function updateFocusStatus() {
    if (document.hasFocus()) {
        hasFocus = true;
        debugLog("해당 창이 포커스를 가지고 있습니다.");
    } else {
        hasFocus = false;
        debugLog("해당 창이 포커스를 잃었습니다.");
    }
}
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
        hasFocusApp = true;
        debugLog("앱이 활성화되었습니다.");
    } else {
        hasFocusApp = false;
        debugLog("앱이 백그라운드에 있습니다.");
    }
});
window.addEventListener("focus", function() {
    updateFocusStatus();
});
window.addEventListener("blur", function() {
    updateFocusStatus();
});
function preventBrowserZoom() {
    function listener(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }
    document.addEventListener("touchmove", listener, { passive: false });
}
// 터치 시작 이벤트 리스너 (모바일에서 터치 이벤트를 고려)
$(document).on('touchstart', function(event) {
    // 인풋 요소가 아닌 다른 영역을 터치했을 때 키보드를 숨김
    /*if (isKeyboardActive && !$(event.target).is('#sendmessage .msg')) {
        //$('#sendmessage .msg').blur(); // 포커스 해제
        isKeyboardActive = false;
    }*/
});
//***********************************************************************************
//* 시간관련
//***********************************************************************************
function getCurrentTime(){
    let today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let milliseconds = today.getMilliseconds();
    let time = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    return time;
}
function formatDate(inputDate) {
    let date = new Date(inputDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = hours >= 12 ? '오후' : '오전';
    let formattedTime;

    // 시간 형식 조정
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }

    // 분 형식 조정
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    formattedTime = period + ' ' + hours + ':' + minutes + '분';
    return formattedTime;
}
function convertTimeFormat(timeString) {
    const [hours, minutes] = timeString.split(':');

    let period = '오전';
    let hour = parseInt(hours, 10);

    if (hour >= 12) {
        period = '오후';
        hour = hour === 12 ? hour : hour - 12;
    }
    return `${period} ${hour}:${minutes}분`;
}
//***********************************************************************************
//* 로딩관련
//***********************************************************************************
function openLoadingCover(loadingText){
    if(loadingText){
        $('#loadingCover').find('#loadingText').html(loadingText);
    }else{
        $('#loadingCover').find('#loadingText').html('로딩중...');
    }
    $('#loadingCover').css('display', 'flex');
}
function closeLoadingCover(){
    $('#loadingCover').css('display', 'none');
}
//***********************************************************************************
//* 모달관련
//***********************************************************************************
function openModal(obj) {
    $(obj).addClass('modal-active');
}
function closeModal(obj) {
    $(obj).removeClass('modal-active');
}
//***********************************************************************************
//* GPT 관련
//***********************************************************************************
function gptQuery(prompt, prevMessages) {
    return axios.post(GPT_CONNECTOR_URL+'/query?prompt='+prompt, prevMessages, {});
}
