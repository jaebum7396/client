function initFriendTab(){
    $('#app_header_menu').css('display', 'block');
    $('#app_title_text').html('친구 목록');
    $('.list_container').css('display', 'none');
    $('#friend_list_container').css('display', 'block');

    $("#friend_list_container input[name='current_page_num']").val('0');
    $('#friend_list_container .friend_list').empty();
    let getMyInfoPromise = getMyInfo();
    getMyInfoPromise
    .then((response) => {
        //console.log('getMyInfoResp', response)
        //유저 코드 로컬스토리지 세팅
        localStorage.setItem('loginUserCd', response.data.result.user.userCd);
        let myInfoMakerPromise = myInfoMaker(response.data.result.user, true);
        myInfoMakerPromise.then((myInfoMakerResp) => {
            $('#friend_list_container .friend_list').prepend(myInfoMakerResp);
            getFriendsWithPageable(0);
        });
    })
}

function getMyInfo(){
    return axios.get(USER_URL+'/me', {})
}

//친구리스트 페이징
var OPEN_FRIEND_LIST_YN = false;
function getFriendsWithPageable(p_page) {
    //먼저 어테치된 페이징을 제거한다.
    $('#friend_list_container').off('scroll');
    //console.log('getFriendsWithPageable>>>>>>>>>>>>')
    $('#channel_list_container').css('display', 'none')
    $('#friend_list_container').css('display', 'block')
    var p_page;
    if (OPEN_FRIEND_LIST_YN == false) {
        OPEN_FRIEND_LIST_YN = true;
        if (!p_page) {
            p_page = $("#tab_container input[name='current_page_num']").val();
        } else {
            if (p_page == '0') {
                $("#friend_list_container").html('');
            }
        }
        axios.get(CHAT_URL+'/friends?size=11&page='+p_page, {})
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
        htmlText += "       <div class='friend_message'>" + (user.userInfo.aboutMe != null ? user.userInfo.aboutMe : "") + "</div>";
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
    return new Promise((resolve, reject) => {
        let htmlText ="";
        htmlText += "<div class='chat_row friend " + friend.userInfo.userCd + "'>";
        htmlText += 	"<input class='FRIEND_USER_CD' id='FRIEND_USER_CD' name='FRIEND_USER_CD' type='hidden' value='" + friend.userInfo.userCd + "'/>";
        htmlText += "   <div id='"+friend.userInfo.userCd+"' class='profile_container'>"
        htmlText += 	    profileMaker(friend.userInfo.userProfileImages[0].profileImgUrl, ' left:auto; top:auto;');
        htmlText += 	"</div>";
        htmlText += 	"<div class='friend_contents' onclick='rowClick(this, "+rowClickActivate+");' style=''>";
        htmlText += 		"<strong class='friend_alias alias' style='color: #f18a1c;'>" + (friend.friendAlias!=null? friend.friendAlias : friend.userInfo.userNickNm) + "</strong>";
        htmlText +=         "<div class='friend_message'>" + (friend.userInfo.aboutMe != null ? friend.userInfo.aboutMe : "") + "</div>";
        htmlText += 	"</div>";
        htmlText += 	"<div style='margin: auto;'>";
        htmlText += 		"<input id='check_"+friend.userInfo.userCd+"' class='friend_check' type='checkbox' style='' value='" + friend.userInfo.userCd + "'/>";
        htmlText +=     	"<label for='check_"+friend.userInfo.userCd+"' class='friend_check_label'></label>"
        htmlText +=     	"<i class='bi bi-three-dots' onclick='dropdownToggle(this)'></i>"
        htmlText +=     	"<ul class='dropdown-list'>"
        htmlText +=     	    "<li>삭제</li>"
        htmlText +=     	    "<li>차단</li>"
        htmlText +=     	"</ul>"
        htmlText += 	"</div>";
        htmlText += "</div>";
        resolve(htmlText);
    })
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
                    innerHTML += '<div class="friend_list_item" onclick="addFriend(\''+user.userCd+'\')">'
                    innerHTML += '   <div class="friend_info">'
                    innerHTML += '       <div class="friend_list_item_img">'
                    //innerHTML += '       <img src="'+user+'" alt="">'
                    innerHTML += '       </div>'
                    innerHTML += '       <div class="friend_list_item_info">'
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
            initFriendTab();
        }
        else if(data.result.processYn === 'N'){
            alert('이미 친구에요.');
            closeSearchUserContainer();
            initFriendTab();
        }
    })
    .catch(function (error) {
        console.error(error);
    });
}