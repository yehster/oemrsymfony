

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
    var vi= new vocab_item(row);
    $("#contextChoice").html(vi.description).attr("code",vi.code).attr("code_type",vi.code_type);
}

function bind_keyword_events()
{
    $("#CodeSearch > .results .context").on({
        click: select_code
    });
}

$("#keyword_input").on({
    keypress: keyword_keydown
});
$("input[name='searchType']").on({
    change: keyword_search
})