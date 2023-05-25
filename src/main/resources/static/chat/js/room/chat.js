//url 판별 함수
function isValidURL(str) {
    // URL 정규식
    var pattern = new RegExp('^(https?:\\/\\/)?' + // 프로토콜
        '((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+' + // 도메인 이름
        '([a-zA-Z]{2,}|(\\d{1,3}\\.){3}\\d{1,3}))' + // 최상위 도메인 레벨
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // 포트 번호 및 경로
        '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // 쿼리 매개변수
        '(\\#[-a-zA-Z\\d_]*)?$','i'); // 프래그먼트 식별자

    return pattern.test(str);
}

//메시지 전송 API 호출
function sendChatHub(message, p_messageType) {
    console.log(message, message.length)
    if(message.trim().length==0){
        return;
    }
    console.log('sendChatHub start', p_messageType)

    // chat 객체 생성
    let chat = new Object();
    chat.domainCd = 1; // 상점 코드
    chat.channelCd = localStorage.getItem("channelCd"); // 채널 코드
    chat.transferType = '4'; // 전송 타입
    chat.messageType = p_messageType; // 메시지 타입
    chat.message = message; // 메시지 내용

    // saveChat 함수 호출하여 메시지 저장하기
    let saveChatPromise = saveChat(chat)
    saveChatPromise
        .then((response) => {
            let result = response.data.result
            console.log('saveChatResp', response)
            result.chat.domainCd = 1;
            // sendChat 함수 호출하여 메시지 전송하기
            sendChat(result.chat);
        })
        .catch((response) => {
            console.log(response);
        })
    document.getElementById("msg").value = '';
    document.getElementById("msg").defaultValue = '';
}

function saveChat(p_chat) {
    console.log('saveChat>>>>>>>>>>>>', p_chat)
    return new Promise((resolve, reject) => {
        axios.post(API_CHAT_URL +'/chat', p_chat, {
            headers: {
                'Content-Type': 'application/json'
                , Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error.response)
        });
    })
}

//메시지코드로 메시지를 가져옴
function getChat(p_chat) {
    console.log('getChat>>>>>>>>>>>>', p_chat)
    return new Promise((resolve, reject) => {
        axios.get(API_CHAT_URL + '/chat', p_chat, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            }
        })
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error.response)
        });
    });
}