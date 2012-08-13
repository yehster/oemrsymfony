/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function vocab_item(source)
{
    this.description =source.find(".description").text();
    this.code=source.find(".code").text();
    this.code_type=source.find(".code_type").text();
    return this;
}
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
                bind_document_events();
            })

}
function select_section()
{
    var row=$(this).parent("tr");
    var vocab_info=new vocab_item(row);
    var sec=$("#sectionChoice");
    sec.html(vocab_info.description);
    sec.attr("code",vocab_info.code);
    sec.attr("code_type",vocab_info.code_type);
}

function bind_document_events()
{
    $("#section_list").find(".description").on({click: select_section});
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