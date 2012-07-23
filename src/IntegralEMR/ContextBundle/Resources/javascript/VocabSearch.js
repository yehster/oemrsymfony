/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function keyword_keyup(evt)
{
    var searchText=$(this).val();
    
}

function keyword_keydown(evt)
{
    if(evt.keyCode == 13)
        {
            var searchText=$(this).val();
            $.post("/openemr/library/doctrine/Symfony/web/app_dev.php/keywords/"+searchText,
            {},
            function(data)
            {
                $("#CodeSearch > .results").html(data);
            })
        }
}

$("#keyword_input").on({
    keyup: keyword_keyup,
    keypress: keyword_keydown
});