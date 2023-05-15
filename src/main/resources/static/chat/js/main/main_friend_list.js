
function initFriendTab(){
    $('#friend_list_container .friend_list').empty();
    let getMyInfoPromise = getMyInfo();
    getMyInfoPromise
        .then((response) => {
            console.log('getMyInfoResp', response)
            $('#friend_list_container .friend_list').prepend(myInfoMaker(response.data.result.user));
            getFriendsWithPageable(0);
        })
        .catch((error) => {
            if(error.response.status == 401){
                localStorage.setItem('token', '');
                alert('로그인이 만료되었습니다.');
                location.href = 'login';
            }else{
                alert('데이터를 로딩하는 중 실패했습니다.');
                console.error(error);
            }
        })
}

function getMyInfo(){
    return axios.get(backendUrl+'/user/me', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("token"),
        }
    })
}

function myInfoMaker(user, rowClickActivate) {
    let htmlText ="";
    let p_division= 'me';
    htmlText += "<div class='chat_row friend " + user.userCd + "' style='border:3px solid #f1f4f6'>";
    htmlText += 	"<input class='FRIEND_USER_CD' id='FRIEND_USER_CD' name='FRIEND_USER_CD' type='hidden' value='" + user.userCd + "'/>";
    htmlText +=		"<div class='profile_container'>"
    htmlText += 		myProfileMaker(user,' left:auto; top:auto;');
    htmlText += 	"</div>";
    htmlText += 	"<div onclick='openPopupProfile(this, \""+p_division+"\");' style='padding:10px;display:flex;flex-direction:column;justify-content:space-between;font-size:15px;'>";
    htmlText += 		"<strong class='friend_alias alias' style='color: #597a96;'>" + (user.userInfo.userNickNm!=null? user.userInfo.userNickNm+"(나)" : user.userNm+"(나)") + "</strong>";
    htmlText += 		"<strong class='friend_message'>" + (user.userInfo.aboutMe!=null? user.userInfo.aboutMe:"") + "</strong>";
    htmlText += 	"</div>";
    htmlText += 	"<div style='margin: auto;'>";
    htmlText += 		"<input id='check_"+user.userCd+"' class='friend_check' type='checkbox' style='' value='" + user.userCd + "'/>";
    htmlText +=     	"<label for='check_"+user.userCd+"' class='friend_check_label'></label>"
    htmlText += 	"</div>";
    htmlText += "</div>";
    return htmlText;
}

function myProfileMaker(user, imgSizestr){
    let htmlText='';
    if(user.userInfo.profileImgUrl){
        htmlText += 	"<div class='profile_img' style='"+imgSizestr+" '>"
        htmlText += 		"<img src='"+user.userInfo.profileImgUrl+"'>";
        htmlText += 	"</div>";
    }else{
        htmlText += 	"<div class='profile_img' style='"+imgSizestr+"'>";
        htmlText += 		"<img src='image/face_common.jpg'>";
        htmlText += 	"</div>";
    }
    return htmlText;
}

//친구리스트 페이징
var OPEN_FRIEND_LIST_YN = false;
function getFriendsWithPageable(p_page) {
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
        axios.get(backendUrl+'/chat/friends?size=11&page='+p_page, {
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
            .catch(response => {
                if(response.status == 401){
                    localStorage.setItem('token', '');
                    alert('로그인이 만료되었습니다.');
                    location.href = 'login';
                }else{
                    alert('친구 목록을 가져오는데 실패했습니다.');
                    console.error(response);
                }
            });
    }
    addInfiniteScroll('friend_list_container');
}

async function friendMakerHub(friendArr, p_obj, rowClickActivate){
    console.log('friendMakerHub start')
    for (var i = 0; i < friendArr.length; i++) {
        let friend = friendArr[i];
        await p_obj.append(friendMaker(friend, rowClickActivate));
    }
    console.log('friendMakerHub done')
}

function friendMaker(friend, rowClickActivate) {
    console.log(friend)
    let htmlText ="";
    htmlText += "<div class='chat_row friend " + friend.friendUserCd + "'>";
    htmlText += 	"<input class='FRIEND_USER_CD' id='FRIEND_USER_CD' name='FRIEND_USER_CD' type='hidden' value='" + friend.friendUserCd + "'/>";
    htmlText +=		"<div class='profile_container'>"
    htmlText += 		profileMaker(friend,' left:auto; top:auto;');
    htmlText += 	"</div>";
    htmlText += 	"<div onclick='openPopupProfile(this);' style='padding:10px;display:flex;flex-direction:column;justify-content:space-between;font-size:15px;'>";
    htmlText += 		"<strong class='friend_alias alias' style='color: #597a96;'>" + (friend.friendAlias!=null? friend.friendAlias : friend.userNm) + "</strong>";
    htmlText += 		"<strong class='friend_message'>" + (friend.userMessage!=null? friend.userMessage:"") + "</strong>";
    htmlText += 	"</div>";
    htmlText += 	"<div style='margin: auto;'>";
    htmlText += 		"<input id='check_"+friend.friendUserCd+"' class='friend_check' type='checkbox' style='' value='" + friend.friendUserCd + "'/>";
    htmlText +=     	"<label for='check_"+friend.friendUserCd+"' class='friend_check_label'></label>"
    htmlText += 	"</div>";
    htmlText += "</div>";
    return htmlText;
}

//채팅리스트 및 친구 리스트 프로필 생성
function profileMaker(friend, imgSizestr){
    let htmlText='';
    if(friend.friendInfo.profileImgUrl){
        htmlText += 	"<div class='profile_img' style='"+imgSizestr+" '>"
        htmlText += 		"<img src='"+friend.friendInfo.profileImgUrl+"'>";
        htmlText += 	"</div>";
    }else{
        htmlText += 	"<div class='profile_img' style='"+imgSizestr+"'>";
        htmlText += 		"<img src='image/face_common.jpg'>";
        htmlText += 	"</div>";
    }
    return htmlText;
}