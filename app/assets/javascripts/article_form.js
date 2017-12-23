var simplemde = new SimpleMDE({
    element: document.getElementById("article_context"),
    toolbar: ["preview","guide","|",
    "bold", "italic", "heading", "|",
    "link", "code", "quote", "strikethrough", "|",
    "unordered-list","ordered-list","table", "|",
    "horizontal-rule","clean-block"],
    spellChecker: false,
    status: false
});
/*
$.ajax({
    url:"/categories.json",
    dataType: "json",
    error: function(jqXHR, textStatus, errorThrown)
    {
        $("#select_category div.append.view").addClass("hide");
        $("#select_category div.ajaxfail").removeClass("hide");
        console.log([jqXHR, textStatus, errorThrown]);
        return;
    },
    success: function(data)
    {   // Main program
        var article_category_ids = $("input#article_category_ids").val() == "" ? [] : $("input#article_category_ids").val().split(" ");
        add_option_actions(data);
        category_label_render( article_category_ids , data );

        // Actions
        $("#select_category button.add").click(function() {add_category(article_category_ids,data)});
        $("#select_category .label_viiew .close").click(function(ev) {delete_category(ev,article_category_ids,data)});
    }
});
*/
function nothing_here( nothing_what )
{
    return " 看起來" + nothing_what + "還沒設定喔 :-) ";
}

function add_option_actions(aoa)
{
    var options = "";
    if(aoa.length>0)
    {
        aoa.forEach(function( odval )
        {
            options += "<option value='" +odval.id+ "'>" +
                odval.tag_name +
            "</option>";
        });
    }
    else
    {
        $("#select_category div.append.view").addClass("hide");
        $("#select_category div.ajaxfail").html(nothing_here( "目錄" )).removeClass("hide");
    }
    $("#select_category .view select").html(options);
    return;
}

function category_label_render( clr_main , clr_refer )
{
    if ( $("input#article_category_ids").val() != "" )
    {   // If not empty
        var tempelte = "";
        clr_main.forEach(function( clrmain_value )
        {
            var clr_current_tag = clr_refer.filter(function(element)
            {
                var panding_tag_number = parseInt(element["id"],10);
                var current_number = parseInt(clrmain_value,10);
                return current_number == panding_tag_number;
            })[0];
            tempelte += "<span class='label'>"
                + clr_current_tag.tag_name + "<span class='close small' data-num='" +clr_current_tag.id+ "'></span>"
            + "</span>";
        });
        $("#select_category .label_viiew").html(tempelte);
    }
    else
    {
        $("#select_category .label_viiew").html(nothing_here( "分類" ));
    }
    return;
}

function render_new_ids( input_array , for_clr_refer_use )
{
    var new_value = "";
    input_array.forEach(function(v,i,a)
    {
        var anavtmp_space = i === a.length-1 ? "" : " ";
        var anavtmp_x = v.toString();
        new_value += anavtmp_x + anavtmp_space;
    });
    // $("#article_category_ids").val(new_value);
}

function add_category( ac_input , for_clr_refer_use )
{
    var selected_item = parseInt($("#select_category select").val(),10);
    var ac_new_array = ac_input;
    var has_category = ac_new_array.filter(function (val)
    {
        return val == selected_item;
    });

    var new_value = "";

    if ( has_category.length == 0 )
    {   // [1,4,5,6] => '1 4 5 6'
        ac_new_array.push(selected_item);
        ac_new_array.sort(function(a, b) { return a - b; });
        ac_new_array.forEach(function(v,i,a)
        {
            var anavtmp_space = i === a.length-1 ? "" : " ";
            var anavtmp_x = v.toString();
            new_value += anavtmp_x + anavtmp_space;
        });
        $("#article_category_ids").val(new_value);
    } else { $("#article_category_ids").val(new_value); }

    category_label_render( ac_new_array , for_clr_refer_use );
    return;
}

function delete_category( clicked_dom , dc_input_array , for_clr_refer_use )
{
    var panding_delete = parseInt( clicked_dom.currentTarget.dataset.num , 10 );
    var dc_new_array = dc_input_array.filter(function (val)
    {
        return val != panding_delete;
    });
    render_new_ids( dc_new_array , for_clr_refer_use );
    $("#article_category_ids").val(new_value);
    
    category_label_render( dc_new_array , for_clr_refer_use );
    console.log(dc_new_array);
}