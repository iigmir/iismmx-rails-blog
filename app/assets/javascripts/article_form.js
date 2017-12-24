var main_dom = "article .category ";
$.ajax({
    url:"/category_relations/" + $("div[data-ajax-request-id]").attr("data-ajax-request-id") + ".json",
    dataType: "json",
    error: function(jqXHR, textStatus, errorThrown)
    {
        $( main_dom + "div.ajaxfail" ).removeClass("hide");
        console.log([jqXHR, textStatus, errorThrown]);
        return;
    },
    success: function(current_categories)
    {   // Main program
        var all_categories;
        $.ajax({
            url:"/categories.json",
            dataType:"json",
            method:"GET",
            error: function(jqXHR, textStatus, errorThrown)
            {
                $( main_dom + "div.ajaxfail" ).removeClass("hide");
                alert("Error");
                console.log([jqXHR, textStatus, errorThrown]);
                return "error";
            },
            success: function(aca)
            {
                all_categories = aca;
                console.log([all_categories,aca]);
            }
        });
        category_select_render( all_categories );
        category_label_render( all_categories , current_categories );
        // Actions
        //$("#select_category button.add").click(function() {add_category(data)});
        //$("#select_category .label_viiew .close").click(function(ev) {delete_category(ev,article_category_ids,data)});
    }
});

function nothing_here( nothing_what )
{
    return " 看起來" + nothing_what + "還沒設定喔 :-) ";
}

function category_select_render( csr_input_data )
{
    var csr_tmp = "";
    csr_input_data.forEach(function(v)
    {
        csr_tmp += "<option value='" +v.id+ "'>" +v.tag_name+ "</option>";
    });
    $("#select_category select").html(csr_tmp);
}

function category_label_render( clr_all_tag , clr_curr_tag )
{
    if ( clr_curr_tag.length > 0 )
    {   // If not empty
        var show_tempelte = "";
        var modal_tempelte = "";
        clr_curr_tag.forEach(function( clrval )
        {
            var current_category = clr_all_tag.filter(function(dhnzcx){ return dhnzcx.id == clrval; });
            // debugger;
            show_tempelte  += "<span class='label'>" + clrval.tag_name + "</span>";
            modal_tempelte += "<li><i class='click fa fa-times' data-category-api='" +clrval.id+ "'></i>" + clrval.tag_name + "</li>";
        });
        $( "article .category .label_view" ).html(show_tempelte);
        $( "#select_category ul.label_view" ).html(modal_tempelte);
    }
    else
    {
        $( "article .category .label_view" ).html(nothing_here( "分類" ));
    }
    return;
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

function add_category( ac_list )
{
    var selected_value = parseInt( $("#select_category option[selected]").val() );
    var xxx = ac_list.filter(function(c){ return c === selected_value; });
    if(xxx.length==0)
    {
        ac_list.push(selected_value);
        ac_list.sort(function(x,y){return x-y;})
    }
    //$("#select_category ul.label_view").html(ac_list);
    //debugger;
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