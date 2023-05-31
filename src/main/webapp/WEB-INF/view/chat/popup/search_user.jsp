<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--
  Created by IntelliJ IDEA.
  User: jaebeom
  Date: 2023-05-14
  Time: 오후 7:03
--%>
<div id = 'search_user_container' style=''>
    <input type='hidden' name='current_page_num' value='0'/>
    <div class='search_input' style='display:flex;'>
        <input type='text' style='margin:5px; padding:5px; width: 100%; border: 1px solid #f18a1c; border-radius:5px;' onkeyup='search(0)'/>
        <%--<button style='margin:5px; padding:5px; width: 20%;'>검색</button>--%>
    </div>
    <div id = 'search_user_list'>
    </div>
</div>