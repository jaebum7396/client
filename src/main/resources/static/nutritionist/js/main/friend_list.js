function initFriendTab(friendDivision){
    $('.chat_header').css('color', 'black');
    $('.chat_header.friends').css('color', '#f18a1c');
    activeTab = 'friend';
    closeSearchUserContainer();
    getChannelUserUnreadCountHub();
    $('.dropdown-list').removeClass('openToggle');
    //먼저 어테치된 페이징을 제거한다.
    $('#friend_list_container').off('scroll');

    $('.app_header_menu').css('display', 'none');

    $('#friend_division').val(friendDivision);
    let appTitleText = '';
    if(friendDivision=='normal'){
        appTitleText = '친구 목록';
    }else if(friendDivision=='hide'){
        appTitleText = '숨김 목록';
    }else if(friendDivision=='block'){
        appTitleText = '차단 목록';
    }
    $('.app_header_menu.friend.'+friendDivision).css('display', 'block');
    $('#app_title_text').html(appTitleText);

    $('.list_container').css('display', 'none');
    $('#friend_list_container').css('display', 'block');

    $("#friend_list_container input[name='current_page_num']").val('0');
    $('#friend_list_container .friend_list').empty();

    if (friendDivision == 'normal') {
        let getMyInfoPromise = getMyInfo();
        getMyInfoPromise
        .then((response) => {
            //console.log('getMyInfoResp', response)
            //유저 코드 로컬스토리지 세팅
            localStorage.setItem('loginUserCd', response.data.result.user.userCd);
            let myInfoMakerPromise = myInfoMaker(response.data.result.user, true);
            myInfoMakerPromise.then((myInfoMakerResp) => {
                $('#friend_list_container .friend_list').prepend(myInfoMakerResp);
                getFriendsWithPageable();
            });
        })
    }else{
        getFriendsWithPageable();
    }
}

function getMyInfo(){
    return axios.get(USER_URL+'/me', {})
}

//친구리스트 페이징
var OPEN_FRIEND_LIST_YN = false;
function getFriendsWithPageable() {
    //먼저 어테치된 페이징을 제거한다.
    $('#friend_list_container').off('scroll');
    $('#channel_list_container').css('display', 'none')
    $('#friend_list_container').css('display', 'block')
    let p_page;
    if (OPEN_FRIEND_LIST_YN == false) {
        OPEN_FRIEND_LIST_YN = true;
        if (!p_page) {
            p_page = $("#tab_container input[name='current_page_num']").val();
        }

        let friendDivision = $('#friend_division').val();
        let queryString = '';
        if(friendDivision=='normal'){
            queryString = 'blockYn=N&hideYn=N';
        }else if(friendDivision=='hide'){
            queryString = 'hideYn=Y&blockYn=N';
        }else if(friendDivision=='block'){
            queryString = 'blockYn=Y';
        }

        axios.get(CHAT_URL+'/friends?'+queryString+'&size=11&page='+p_page, {})
        .then(response => {
            //console.log('getFriendsWithPageableResp', response)
            let result = response.data.result;
            let friendArr = result.friendArr
            let p_page = result.p_page;
            $("#tab_container input[name='current_page_num']").val(p_page);
            friendMakerHub(friendArr, $("#friend_list_container .friend_list"), true);

            OPEN_FRIEND_LIST_YN = false;
        })
    }
    addInfiniteScroll('friend_list_container');
}

async function friendMakerHub(friendArr, p_obj, rowClickActivate){
    //console.log('friendMakerHub start')
    for (let i = 0; i < friendArr.length; i++) {
        let friend = friendArr[i];
        await friendRowMaker(friend, p_obj, rowClickActivate);
    }
    //console.log('friendMakerHub done')
}

function friendRowMaker(friend, p_obj, rowClickActivate){
    let friendMakerPromise = friendMaker(friend, rowClickActivate);
    friendMakerPromise.then((friendMakerResp) => {
        p_obj.append(friendMakerResp);
    });
}

function myInfoMaker(user, rowClickActivate) {
    return new Promise((resolve, reject) => {
        let htmlText = "";
        let p_division = 'me';
        htmlText += "<div class='chat_row friend " + user.userCd + "' style='border-top:2px solid #f1f4f6'>";
        htmlText += "   <input class='FRIEND_USER_CD' id='FRIEND_USER_CD' name='FRIEND_USER_CD' type='hidden' value='" + user.userCd + "'/>";
        htmlText += "   <div id='"+user.userCd+"' class='profile_container'>"
        htmlText += 	    profileMaker(user.userInfo.userProfileImages[0].profileImgUrl, ' left:auto; top:auto;');
        htmlText += "   </div>";
        htmlText += "   <div class='friend_contents' onclick='initUserInfoTab();' style=''>";
        htmlText += "       <strong class='friend_alias alias' style='color: #f18a1c;'>" + (user.userInfo.userNickNm != null ? user.userInfo.userNickNm + "(나)" : user.userNm + "(나)") + "</strong>";
        /*htmlText += "       <div class='friend_message'>" + (user.userInfo.aboutMe != null ? user.userInfo.aboutMe : "") + "</div>";*/
        htmlText += "   </div>";
        htmlText += "   <div style='margin: auto;'>";
        htmlText += "       <input id='check_" + user.userCd + "' class='friend_check' type='checkbox' style='' value='" + user.userCd + "'/>";
        htmlText += "       <label for='check_" + user.userCd + "' class='friend_check_label'></label>"
        htmlText += "   </div>";
        htmlText += "</div>";
        resolve(htmlText);
    })
}

function friendMaker(friend, rowClickActivate) {
    //console.log('friendMaker', friend);
    let friendDivision = $('#friend_division').val();
    return new Promise((resolve, reject) => {
        let htmlText ="";
        htmlText += "<div class='chat_row friend " + friend.userInfo.userCd + "'>";
        htmlText += 	"<input class='FRIEND_USER_CD' id='FRIEND_USER_CD' name='FRIEND_USER_CD' type='hidden' value='" + friend.userInfo.userCd + "'/>";
        htmlText += "   <div id='"+friend.userInfo.userCd+"' class='profile_container'>"
        htmlText += 	    profileMaker(friend.userInfo.userProfileImages[0].profileImgUrl, ' left:auto; top:auto;');
        htmlText += 	"</div>";
        htmlText += 	"<div class='friend_contents' onclick='rowClick(this, "+rowClickActivate+");' style=''>";
        htmlText += 		"<strong class='friend_alias alias' style='color: #f18a1c;'>" + (friend.friendAlias!=null? friend.friendAlias : friend.userInfo.userNickNm) + "</strong>";
        /*htmlText +=         "<div class='friend_message'>" + (friend.userInfo.aboutMe != null ? friend.userInfo.aboutMe : "") + "</div>";*/
        htmlText += 	"</div>";
        htmlText += 	"<div style='margin: auto;'>";
        htmlText += 		"<input id='check_"+friend.userInfo.userCd+"' class='friend_check' type='checkbox' style='' value='" + friend.userInfo.userCd + "'/>";
        htmlText +=     	"<label for='check_"+friend.userInfo.userCd+"' class='friend_check_label'></label>"
        htmlText +=     	"<i class='bi bi-three-dots' onclick='dropdownToggle(this)'></i>"
        htmlText +=     	"<ul class='dropdown-list'>"
        if(friendDivision=='normal'){
            htmlText +=    	    "<li onclick='updateFriendHub(\"hide\", \"Y\", \"" + friend.userInfo.userCd + "\")'>숨김</li>"
            htmlText +=    	    "<li onclick='updateFriendHub(\"block\", \"Y\", \"" + friend.userInfo.userCd + "\")'>차단</li>"
        }else if(friendDivision=='hide'){
            htmlText +=    	    "<li onclick='updateFriendHub(\"hide\", \"N\", \"" + friend.userInfo.userCd + "\")'>숨김해제</li>"
            htmlText +=    	    "<li onclick='updateFriendHub(\"block\", \"Y\", \"" + friend.userInfo.userCd + "\")'>차단</li>"
        }else if(friendDivision=='block'){
            htmlText +=    	    "<li onclick='updateFriendHub(\"block\", \"N\", \"" + friend.userInfo.userCd + "\")'>차단해제</li>"
        }
        htmlText +=     	"</ul>"
        htmlText += 	"</div>";
        htmlText += "</div>";
        resolve(htmlText);
    })
}

function updateFriendHub(p_methodType, p_yn, p_userCd){
    /*alert('준비중입니다.')
    return;*/
    let confirmMsg = "";
    let param = new Object();
    param.userInfo = new Object();
    param.userInfo.userCd = p_userCd;
    if(p_methodType == 'hide'){
        if(p_yn == 'Y'){
            confirmMsg = "친구목록에서 보이지 않도록 합니다.";
        }else{
            confirmMsg = "친구목록으로 복귀합니다.";
        }
        param.hideYn = p_yn;
    } else if(p_methodType == 'block') {
        if(p_yn == 'Y'){
            confirmMsg = "차단하시겠습니까?";
        }else{
            confirmMsg = "차단해제 하시겠습니까?";
        }
        param.hideYn = p_yn;
        param.blockYn = p_yn;
    }
    if (confirm(confirmMsg)) {
        updateFriend(param);
    }
}

function updateFriend(param){
    axios.put(CHAT_URL+'/friend', param, {})
    .then(function (response) {
        const data = response.data;
        /*for(let i=0; i<data.channelArr.length; i++){
            let p_channelCd = data.channelArr[i];
            let message = '상대방이 채팅방을 나갔습니다.';

            let p_chat = new Object();
            p_chat.transferType = 98 // 채널 퇴장 코드
            p_chat.domainCd = clientDomainCd
            p_chat.channelCd = p_channelCd
            p_chat.message = message; // 메시지 내용
            sendChat(p_chat);

            unsubscribe(p_channelCd);
        }*/
        alert(response.data.message);
        initFriendTab('normal');
    })
    .catch(function (error) {
        console.error(error);
    });
}

//행 클릭
function rowClick(p_obj, rowClickActivate, p_division) {
    if($(p_obj).parents('.chat_row').find("input:checkbox[class='friend_check']").prop('checked')){
        $(p_obj).parents('.chat_row').find("input:checkbox[class='friend_check']").prop("checked", false);
    }else{
        $(p_obj).parents('.chat_row').find("input:checkbox[class='friend_check']").prop("checked", true);
    }
    if(rowClickActivate){
        //console.log($(p_obj).parents('.chat_row'))
        openPopupProfile($(p_obj).parents('.chat_row'), p_division);
    }
}

function dropdownToggle(obj){
    //console.log('dropdownToggle', obj)
    let openToggleYn;
    let dropdownList = $(obj).siblings('.dropdown-list');

    openToggleYn = $(obj).siblings('.dropdown-list').hasClass('openToggle') ? true : false;
    $('.dropdown-list').removeClass('openToggle');

    if(!openToggleYn){
        dropdownList.addClass('openToggle');
    }
}

function toggleSearchUserContainer() {
    $('.dropdown-list').removeClass('openToggle');
    if ($('#search_user_container').css('display') === 'block') {
        closeSearchUserContainer();
    } else {
        openSearchUserContainer();
    }
}
function openSearchUserContainer() {
    $('.search_input input').val('');
    $('#search_user_list').html('');
    $('#search_user_container').css('display', 'block');
}
function closeSearchUserContainer() {
    $('.search_input input').val('');
    $('#search_user_list').html('');
    $('#search_user_container').css('display', 'none');
}
function search(p_page) {
    $('#search_user_container').off('scroll')
    const searchInput = document.querySelector('.search_input input').value;
    // 입력이 비어있을 경우 검색하지 않음
    if (searchInput.trim() === '') {
        return;
    }
    // 실시간 검색 요청
    axios.get(USER_URL+'/users?size=11&page='+p_page, {params: {queryString: searchInput}})
        .then(function (response) {
            // 이전 검색 결과 초기화
            $('#search_user_list').html('');
            const data = response.data;
            //console.log(data)
            // 검색 결과를 동적으로 표시
            if(data.result.userArr.length > 0){
                if(data.result.userArr[0].userCd == localStorage.getItem('loginUserCd')){
                    return;
                }else{
                    data.result.userArr.forEach(function (user) {
                        let innerHTML = '';
                        let profileImgUrl = user.userInfo.userProfileImages[0].profileImgUrl;
                        if(profileImgUrl.indexOf('image/profile') == 0){
                            //console.log('기본', profileImgUrl, profileImgUrl.indexOf('image/profile'))
                            imgUrl = profileImgUrl;
                        }else{
                            //console.log('기본아님', profileImgUrl, profileImgUrl.indexOf('image/profile'))
                            imgUrl = 'http://www.aflk-chat.com:8000/file-storage/display?fileLocation='+profileImgUrl;
                        }
                        innerHTML += '<div class="friend_list_item" onclick="addFriend(\''+user.userCd+'\')">'
                        innerHTML += '   <div class="friend_info" style="display:flex;">'
                        innerHTML += '       <div class="friend_list_item_img" style="width:auto;">'
                        innerHTML += '          <img src="'+imgUrl+'" alt="" style="height: 24px;">'
                        innerHTML += '       </div>'
                        innerHTML += '       <div class="friend_list_item_info" style="margin-left: 10px;">'
                        innerHTML += '           <div class="name">'+user.userNm+'</div>'
                        //innerHTML += '           <div class="aboutMe">'+user.userInfo.aboutMe+'</div>'
                        innerHTML += '       </div>'
                        innerHTML += '   </div>'
                        innerHTML += '   <div>'
                        innerHTML += '      친구추가'
                        innerHTML += '   </div>'
                        innerHTML += '</div>'
                        $('#search_user_list').append(innerHTML);
                    });
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}
function addFriend(p_userCd){
    axios.post(CHAT_URL+'/friend', {userCd: p_userCd}, {})
        .then(function (response) {
            const data = response.data;
            //console.log(data)
            if(data.result.processYn === 'Y'){
                alert('친구등록이 완료되었어요.');
                closeSearchUserContainer();
                initFriendTab('normal');
            }
            else if(data.result.processYn === 'N'){
                alert('이미 친구에요.');
                closeSearchUserContainer();
                initFriendTab('normal');
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}