$(document).ready(function()
{
    var main_dom = "article .category ";
    function get_current_categories()
    {   // First AJAX call
        var current_article_id = $("div[data-ajax-request-id]").attr("data-ajax-request-id");
        $.ajax({
            url:"/category_relations/" + current_article_id + ".json",
            dataType: "json",
            error: function(jqXHR, textStatus, errorThrown)
            {
                $( main_dom + "div.ajaxfail" ).removeClass("hide");
                console.log([jqXHR, textStatus, errorThrown]);
                return;
            },
            success: function(current_categories)
            {
                get_all_categories( current_categories );
            }
        });
        return;
    }

    function get_all_categories( gaccc )
    {   // Second AJAX call
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
                main_program(gaccc,aca);
            }
        });
        return;
    }

    function main_program( x , y )
    {
        var current_categories = x;
        var all_categories = y;
        console.log([current_categories , all_categories]);

        function nothing_here( nothing_what )
        {
            return " 看起來" + nothing_what + "還沒設定喔 :-) ";
        }

        function category_select_render( csr_input_data )
        {   // Give all_categories
            var csr_tmp = "";
            csr_input_data.forEach(function(v)
            {
                csr_tmp += "<option value='" +v.id+ "'>" +v.tag_name+ "</option>";
            });
            $("#select_category select").html(csr_tmp);
        }

        function category_label_render( clr_current_cate )
        {   // Generate category labels in article
            if ( clr_current_cate.length > 0 )
            {   // If not empty
                var show_tempelte  = "";
                var modal_tempelte = "";
                clr_current_cate.forEach(function( clrval )
                {
                    var current_category = all_categories.filter(function(dhnzcx){ return dhnzcx.id == clrval; });
                    show_tempelte  += "<span class='label'>" + clrval.tag_name + "</span>";
                    modal_tempelte += "<li><i class='click fa fa-times' data-category-api='" +clrval.id+ "'></i>" + clrval.tag_name + "</li>";
                });
                $( "article .category .label_view"  ).html(show_tempelte );
                $( "#select_category ul.label_view" ).html(modal_tempelte);
            }
            else
            {
                $( "article .category .label_view" ).html(nothing_here( "分類" ));
            }
            return;
        }

        function add_options_render( aor_input )
        {   // generate <option> that user can add category
            var options = "";
            if( aor_input.length>0 )
            {
                aor_input.forEach(function(o)
                {
                    options += "<option value='" +o.id+ "'>" + o.tag_name + "</option>";
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

        function add_category( ac_list )
        {   // Add value to current category array, then sort it.
            var selected_value = parseInt( $("#select_category option[selected]").val() );
            var list_not_dep = ac_list.filter(function(c){ return c === selected_value; }).length === 0;
            if( x )
            {
                ac_list.push(selected_value);
                ac_list.sort(function(x,y){return x-y;})
            }
            //debugger;
            category_label_render( ac_list );
            return;
        }

        function delete_category( clicked_dom , dc_input_array )
        {   // Delete value, then sort array
            var panding_delete = parseInt( clicked_dom.currentTarget.dataset.num , 10 );
            var dc_new_array = dc_input_array.filter(function (val)
            {
                return val != panding_delete;
            });
            if( dc_new_array.length > 0 )
            {
                dc_new_array.sort(function(x,y){return x-y;})
            }
            //console.log(dc_new_array);
            category_label_render( dc_new_array );
            return;
        }

        function category_ajax(ca_input)
        {
            console.log(ca_input);
            return;
        }
        // Render
        category_label_render( current_categories );
        category_select_render( all_categories );
        // Actions
        $("#select_category button.add").click(function(){add_category(current_categories)});
        $("#select_category .label_viiew .fa-times").click(function(e){delete_category(eev,current_categories)});
        return;
    }

    
    get_current_categories();
    return;
});
