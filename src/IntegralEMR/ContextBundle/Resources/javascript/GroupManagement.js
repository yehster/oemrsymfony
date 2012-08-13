

function createGroup()
{
    var sec=$("#sectionChoice")
    var section_code=sec.attr("code");
    var section_code_type=sec.attr("code_type");
    var context=$("#contextChoice");
    var context_code=context.attr("code");
    var context_code_type=context.attr("code_type");
    $.post("/openemr/library/doctrine/content/groupManagement.php",
    {
        section_code: section_code,
        section_code_type: section_code_type,
        context_code: context_code,
        context_code_type: context_code_type
    },
    function(data)
    {
        window.alert(data.msg);
    },
    "json"
    );
}

$("#create_group").on({click: createGroup});