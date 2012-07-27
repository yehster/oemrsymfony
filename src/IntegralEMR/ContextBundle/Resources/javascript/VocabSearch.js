/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function keyword_search()
{
            var searchText=$("#keyword_input").val();
            $.post("/openemr/library/doctrine/Symfony/web/app_dev.php/keywords/"+searchText+"/" +$("input[name='searchType']:checked").val(),
            {},
            function(data)
            {
                $("#CodeSearch > .results").html(data);
            })

}
function keyword_keydown(evt)
{
    if(evt.keyCode == 13)
        {
            keyword_search();
        }
}

$("#keyword_input").on({
    keypress: keyword_keydown
});
$("input[name='searchType']").on({
    change: keyword_search
})