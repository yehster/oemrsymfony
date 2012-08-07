/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function document_search()
{
            var searchText=$("#document_input").val();
            var post_url="/openemr/library/doctrine/Symfony/web/app_dev.php/section";
            if(searchText.length>0)
                {
                    post_url+="/"+searchText;
                }
            $.post(post_url,
            {},
            function(data)
            {
                $("#section_list").html(data);
            })

}

function document_keydown(evt)
{
    if(evt.keyCode == 13)
        {
            document_search();
        }}
$("#document_input").on({
    keypress: document_keydown
});

$(document).ready(document_search);