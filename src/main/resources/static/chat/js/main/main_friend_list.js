
function initFriendTab(){
    $("#friend_list_container input[name='current_page_num']").val('0');
    $('#friend_list_container .friend_list').empty();
    let getMyInfoPromise = getMyInfo();
    getMyInfoPromise
        .then((response) => {
            console.log('getMyInfoResp', response)
            let myInfoMakerPromise = myInfoMaker(response.data.result.user);
            myInfoMakerPromise.then((myInfoMakerResp) => {
                $('#friend_list_container .friend_list').prepend(myInfoMakerResp);
                getFriendsWithPageable(0);
            });
        })
        .catch((error) => {
            console.log(error.response);
            if(error.response.data.statusCode == 401||error.response.data.body.statusCode == 401){
                localStorage.setItem('token', '');
                alert(error.response.data.message);
                location.href = 'login';
            }else{
                alert(error.response.data.message);
                console.error(error);
            }
        })
}

function getMyInfo(){
    return axios.get(API_USER_URL+'/me', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("token"),
        }
    })
}

//친구리스트 페이징
var OPEN_FRIEND_LIST_YN = false;
function getFriendsWithPageable(p_page) {
    //먼저 어테치된 페이징을 제거한다.
    $('#friend_list_container').off('scroll');
    console.log('getFriendsWithPageable>>>>>>>>>>>>')
    $('#channel_list_container').css('display', 'none')
    $('#friend_list_container').css('display', 'block')
    if (OPEN_FRIEND_LIST_YN == false) {
        OPEN_FRIEND_LIST_YN = true;
        if (!p_page) {
            var p_page = $("#tab_container input[name='current_page_num']").val();
        } else {
            if (p_page == '0') {
                $("#friend_list_container").html('');
            }
        }
        axios.get(API_CHAT_URL+'/friends?size=11&page='+p_page, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            }
        })
        .then(response => {
            console.log('getFriendsWithPageableResp', response)
            let result = response.data.result;
            let friendArr = result.friendArr
            let p_page = result.p_page;
            $("#tab_container input[name='current_page_num']").val(p_page);
            friendMakerHub(friendArr, $("#friend_list_container .friend_list"), true);

            OPEN_FRIEND_LIST_YN = false;
        })
        .catch((error) => {
            console.log(error.response);
            if(error.response.data.statusCode == 401){
                localStorage.setItem('token', '');
                alert(error.response.data.message);
                location.href = 'login';
            }else{
                alert(error.response.data.message);
                console.error(error);
            }
        })
    }
    addInfiniteScroll('friend_list_container');
}

async function friendMakerHub(friendArr, p_obj, rowClickActivate){
    console.log('friendMakerHub start')
    for (let i = 0; i < friendArr.length; i++) {
        let friend = friendArr[i];
        await friendRowMaker(friend, p_obj, rowClickActivate);
    }
    console.log('friendMakerHub done')
}

function friendRowMaker(friend, p_obj, rowClickActivate){
    console.log('friendRowMaker',friend)
    let friendMakerPromise = friendMaker(friend, rowClickActivate);
    friendMakerPromise.then((friendMakerResp) => {
        p_obj.append(friendMakerResp);
        let profileMakerPromise = profileMaker(friend, ' left:auto; top:auto;');
        profileMakerPromise.then((profileMakerResp) => {
            console.log('.chat_row .profile_container#'+friend.userInfo.userCd);
            $('.chat_row .profile_container#'+friend.userInfo.userCd).html(profileMakerResp);
        })
    });
}

function myInfoMaker(user, rowClickActivate) {
    console.log(user)
    return new Promise((resolve, reject) => {
        let profileMakerPromise = profileMaker(user, ' left:auto; top:auto;');
        profileMakerPromise.then((profileMakerResp) => {
            let htmlText = "";
            let p_division = 'me';
            htmlText += "<div class='chat_row friend " + user.userCd + "' style='border:3px solid #f1f4f6'>";
            htmlText += "   <input class='FRIEND_USER_CD' id='FRIEND_USER_CD' name='FRIEND_USER_CD' type='hidden' value='" + user.userCd + "'/>";
            htmlText += "   <div id='"+user.userCd+"' class='profile_container'>"
            htmlText += 	    profileMakerResp;
            htmlText += "   </div>";
            htmlText += "   <div onclick='openPopupProfile(this, \"" + p_division + "\");' style='padding:10px;display:flex;flex-direction:column;justify-content:space-between;font-size:15px;'>";
            htmlText += "       <strong class='friend_alias alias' style='color: #597a96;'>" + (user.userInfo.userNickNm != null ? user.userInfo.userNickNm + "(나)" : user.userNm + "(나)") + "</strong>";
            htmlText += "       <strong class='friend_message'>" + (user.userInfo.aboutMe != null ? user.userInfo.aboutMe : "") + "</strong>";
            htmlText += "   </div>";
            htmlText += "   <div style='margin: auto;'>";
            htmlText += "       <input id='check_" + user.userCd + "' class='friend_check' type='checkbox' style='' value='" + user.userCd + "'/>";
            htmlText += "       <label for='check_" + user.userCd + "' class='friend_check_label'></label>"
            htmlText += "   </div>";
            htmlText += "</div>";
            resolve(htmlText);
        })
    })
}

//행 클릭
function rowClick(p_obj, rowClickActivate) {
    if($(p_obj).parents('.chat_row').find("input:checkbox[class='friend_check']").prop('checked')){
        $(p_obj).parents('.chat_row').find("input:checkbox[class='friend_check']").prop("checked", false);
    }else{
        $(p_obj).parents('.chat_row').find("input:checkbox[class='friend_check']").prop("checked", true);
    }
    if(rowClickActivate){
        console.log($(p_obj).parents('.chat_row')[0]);
        openPopupProfile($(p_obj).parents('.chat_row'));
    }
}

function friendMaker(friend, rowClickActivate) {
    console.log('friendMaker', friend);
    return new Promise((resolve, reject) => {
        let htmlText ="";
        htmlText += "<div class='chat_row friend " + friend.userInfo.userCd + "'>";
        htmlText += 	"<input class='FRIEND_USER_CD' id='FRIEND_USER_CD' name='FRIEND_USER_CD' type='hidden' value='" + friend.userInfo.userCd + "'/>";
        htmlText += "   <div id='"+friend.userInfo.userCd+"' class='profile_container'>"
        htmlText += 	    "<div class='profile_img' style='left:auto; top:auto;'>"
        htmlText += 	    	"<img src='image/face_common.jpg'>";
        htmlText += 	    "</div>";
        htmlText += 	"</div>";
        htmlText += 	"<div onclick='rowClick(this, "+rowClickActivate+");' style='padding:10px;display:flex;flex-direction:column;justify-content:space-between;font-size:15px;'>";
        htmlText += 		"<strong class='friend_alias alias' style='color: #597a96;'>" + (friend.friendAlias!=null? friend.friendAlias : friend.userNm) + "</strong>";
        htmlText += 		"<strong class='friend_message'>" + (friend.userMessage!=null? friend.userMessage:"") + "</strong>";
        htmlText += 	"</div>";
        htmlText += 	"<div style='margin: auto;'>";
        htmlText += 		"<input id='check_"+friend.userInfo.userCd+"' class='friend_check' type='checkbox' style='' value='" + friend.userInfo.userCd + "'/>";
        htmlText +=     	"<label for='check_"+friend.userInfo.userCd+"' class='friend_check_label'></label>"
        htmlText += 	"</div>";
        htmlText += "</div>";
        resolve(htmlText);
    })
}

//채팅리스트 및 친구 리스트 프로필 생성
function profileMaker(friend, imgSizestr){
    console.log('profileMaker', friend);
    return new Promise((resolve, reject) => {
        let htmlText = '';
        if (friend.userInfo.userProfileImages){
            let userProfileImages = friend.userInfo.userProfileImages;
            if(friend.userInfo.userProfileImages.length == 0){
                htmlText += 	"<div class='profile_img' style='"+imgSizestr+" '>"
                htmlText += 		"<img src='image/face_common.jpg'>";
                htmlText += 	"</div>";
                resolve(htmlText);
            }else if(friend.userInfo.userProfileImages.length > 0){
                axios.get(API_FILE_STORAGE_URL+'/display?fileLocation='+userProfileImages[userProfileImages.length-1].profileImgUrl, {
                    responseType:'blob',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem("token"),
                    }
                }).then(response => {
                    console.log('해당 이미지가 있습니다.',response);
                    const imageURL = window.URL.createObjectURL(response.data)
                    htmlText += 	"<div class='profile_img' style='"+imgSizestr+" '>"
                    htmlText += 		"<img src='"+ imageURL +"'>";
                    htmlText += 	"</div>";
                    resolve(htmlText);
                }).catch(error => {
                    console.log('해당 이미지가 없습니다.', error.response);
                    htmlText += 	"<div class='profile_img' style='"+imgSizestr+"'>"
                    htmlText += 		"<img src='image/face_common.jpg'>";
                    htmlText += 	"</div>";
                    resolve(htmlText);
                })
            }
        }else{
            console.log('프로필 이미지가 없습니다.', error.response);
            htmlText += 	"<div class='profile_img' style='"+imgSizestr+"'>";
            htmlText += 		"<img src='image/face_common.jpg'>";
            htmlText += 	"</div>";
            resolve(htmlText);
        }
    });
}