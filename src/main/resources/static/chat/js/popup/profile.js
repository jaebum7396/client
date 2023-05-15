function openPopupProfile(p_obj, p_division){
    p_obj = $(p_obj).parents('.chat_row')
    console.log('openPopupProfile>>>>>>>', $(p_obj));
    $('#profile_popup').find('.CHANNEL_CD').val('');
    $('#profile_popup').find('.USER_CD').val('');
    $('#profile_popup').find('#chat_footer').html('');
    $('#profile_popup').find('.profile_container').html('')
    $('#profile_popup').find('.profile_container').off('click')
    let profileArr = $(p_obj).find('.profile_img');
    let cloneArr = new Array();
    profileArr.each((idx, item) => {
        if(profileArr.length==1){
            let clone = $(item).clone();
            cloneArr.push(clone);
        }else if(profileArr.length==2){
            let clone = $(item).clone();
            clone.css('width','55px')
            clone.css('height','55px')
            cloneArr.push(clone);
        }else if(profileArr.length==3){
            let clone = $(item).clone();
            clone.css('width','50px')
            clone.css('height','50px')
            cloneArr.push(clone);
        }else if(profileArr.length==4){
            let clone = $(item).clone();
            clone.css('width','40px')
            clone.css('height','40px')
            cloneArr.push(clone);
        }
    });
    console.log($(p_obj).attr('class'))

    if($(p_obj).attr('class').indexOf('friend')>0){
        $('#profile_popup').find('.popup_flag').val('friend');
        $('#profile_popup').find('.USER_CD').val($(p_obj).find('.USER_CD').val());
        if(p_division== 'me'){
            $('#profile_popup').find('.name_edit_btn').css('display','block');
            $('#profile_popup').find('.message_edit_btn').css('display','block');
            $('#profile_popup')
                .find('#chat_footer')
                //.html($("<div class='chat_btn' onclick='openChannelWithUserHub(\"me\");' style=''>나와의대화</div>"))
            $('#profile_popup').find('.profile_container').click(function() {
                $("#imageInput")[0].click()
            })
        }else{
            $('#profile_popup').find('.name_edit_btn').css('display','none');
            $('#profile_popup').find('.message_edit_btn').css('display','none');
            $('#profile_popup')
                .find('#chat_footer')
                //.html($("<div class='chat_btn' onclick='openChannelWithUserHub();' style=''>채팅하기</div>"))
        }
    }else{
        $('#profile_popup').find('.popup_flag').val('channel');
        $('#profile_popup').find('.CHANNEL_CD').val($(p_obj).find('.CHANNEL_CD').val());
        $('#profile_popup').find('.message_edit_btn').css('display','none');
        $('#profile_popup').find('.name_edit_btn').css('display','block');
        $('#profile_popup')
            .find('#chat_footer')
            //.html($("<div class='chat_btn' onclick='openChannel(\""+$(p_obj).find('.CHANNEL_CD').val()+"\",\""+$(p_obj).find('.alias').html()+"\,\""+$(p_obj).find('.channel_user_count').html()+"\");' style=''>채팅하기</div>"))
    }

    $('#profile_popup').css('display','block');
    $('#profile_popup').find('.profile_container').append(cloneArr);
    $('#profile_popup').find('.name_container .name').val($(p_obj).find('.alias').html());
    $('#profile_popup').find('.message_container .message').val($(p_obj).find('.friend_message').html());
}

function closePopupProfile(){
    $('#profile_popup').css('display','none')
    if($('#profile_popup').find('.popup_flag').val()=='channel'){
        getChannelsWithPageable('0');
    } else {
        initFriendTab();
    }
}