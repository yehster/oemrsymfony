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
                bind_keyword_events();
            })

}
function keyword_keydown(evt)
{
    if(evt.keyCode == 13)
        {
            keyword_search();
        }
}
function select_code()
{
    var row=$(this).parent("tr");
    var code = row.find(".code").text();
    var codeDescription=row.find(".codeDescription").text();
    var code_type=row.find(".code_type").text();
    window.alert(code+":"+codeDescription+":"+code_type);
}

function bind_keyword_events()
{
    $("#CodeSearch > .results .codeDescription").on({
        click: select_code
    });
}

$("#keyword_input").on({
    keypress: keyword_keydown
});
$("input[name='searchType']").on({
    change: keyword_search
})