<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2024-03-19
  Time: 오후 4:14
--%>
<style>
    #app_title_container .app_title{
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        margin: 10px;
        cursor: pointer;
    }

    #topmenu {
        position:fixed;
        display: flex;
        justify-content: space-between;
        z-index:9998;
        width: 100%;
        border-bottom: 1px solid #e7ebee;
    }

    #topmenu span {
        float: left;
    }

    .app_header_menu .app_header{
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        margin: 10px;
        cursor: pointer;
        height: 24px;
    }

    .app_header_menu .app_header i{
        font-size:22px;
        color : red;
        font-weight: 800;
    }

    /*우측 상단 톱니바퀴 메뉴 관련*/
    .dropdown-list {
        display: none; /* 초기에는 드롭다운을 숨김 */
    }

    .dropdown-list.openToggle {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        top: 40px;
        border: 1px solid black;
        right: 5px;
        align-items: end;
        background-color: white;
        z-index:9999;
        padding: 5px;
        right: 10px;
    }
</style>
<script>
    function dropdownToggle(obj){
        let openToggleYn;
        let dropdownList = $(obj).siblings('.dropdown-list');

        openToggleYn = $(obj).siblings('.dropdown-list').hasClass('openToggle') ? true : false;
        $('.dropdown-list').removeClass('openToggle');

        if(!openToggleYn){
            dropdownList.addClass('openToggle');
        }
    }
</script>
<div id="topmenu">
    <div id='app_title_container'>
        <div id="app_title_img" class='app_title'>
            <img src="../common/image/favicon.png" style='width:25px;'/>
        </div>
        <div id="app_title"class='app_title'>
            <div id="app_title_text"></div>
        </div>
    </div>
    <div class="app_header_menu">
        <span class="app_header settings">
            <img src="image/settings.svg" onclick="dropdownToggle(this)"/>
            <ul class='dropdown-list'>
                <li onclick=''>리스트</li>
                <li onclick=''>리스트</li>
            </ul>
        </span>
    </div>
</div>

