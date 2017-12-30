$(document).ready(function()
{
    // var main_dom = "article .category ";
    var current_article_id = $("div[data-ajax-request-id]").attr("data-ajax-request-id");
    function get_all_categories()
    {
        $.ajax({
            url:"/categories.json",
            dataType:"json",
            method:"GET",
            error: function(jqXHR, textStatus, errorThrown)
            {
                $( "article .category div.ajaxfail" ).removeClass("hide");
                alert("Error");
                console.log([jqXHR, textStatus, errorThrown]);
                return "error";
            },
            success: function(aca)
            {
                //debugger;
                get_current_categories(aca);
            }
        });
        return;
    }

    function get_current_categories( allcat )
    {
        $.ajax({
            url:"/category_relations/" + current_article_id + ".json",
            dataType: "json",
            error: function(jqXHR, textStatus, errorThrown)
            {
                $( "article .category div.ajaxfail" ).removeClass("hide");
                console.log([jqXHR, textStatus, errorThrown]);
                return;
            },
            success: function(currc)
            {
                //debugger;
                main_program(allcat,currc);
            }
        });
        return;
    }

    function main_program( x , y )
    {
        var all_categories = x;
        var current_categories = y;

        function add_options_render( aor_input )
        {   // generate <option> that user can add category
            var options = "";
            if( aor_input.length>0 )
            {
                aor_input.forEach(function(o)
                {
                    options += "<option value='" +o.id+ "'>" + o.tag_name + "</option>";
                });
                $("#select_category .view select").html(options);
            }
            else
            {
                $("#select_category div.append.view").addClass("hide");
                $("#select_category div.ajaxfail").html(nothing_here( "目錄" )).removeClass("hide");
            }
            return;
        }

        function nothing_here( nothing_what )
        {
            return " 看起來" + nothing_what + "還沒設定喔 :-) ";
        }

        function category_select_render( csr_all_cate )
        {   // Give all_categories
            var csr_tmp = "";
            csr_all_cate.forEach(function(v)
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
                    var current_category = all_categories.filter(function(dhnzcx){ return dhnzcx.id == clrval; })[0];
                    show_tempelte  += "<span class='label'>" + current_category.tag_name + "</span>";
                    modal_tempelte += "<li><i class='click fa fa-times remove_request' data-category-api='" +current_category.id+ "'></i>" + current_category.tag_name + "</li>";
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

        function add_category( ac_current_categroies , ac_clicked_dom )
        {   // Add value to current category array, then sort it.
            var selected_value = parseInt( ac_clicked_dom , 10 );
            var not_repeat_in_list = ac_current_categroies.filter(function(c){ return c === selected_value; }).length === 0;
            if( not_repeat_in_list )
            {
                ac_current_categroies.push(selected_value);
                ac_current_categroies.sort(function(x,y){return x-y;});
            }
            current_categories = ac_current_categroies;
            category_label_render( current_categories );
            $("#select_category .warning.message").removeClass("hide");
            return;
        }

        function delete_category( clicked_dom , dc_input_array )
        {   // Delete value, then sort array
            var panding_delete = parseInt( clicked_dom.currentTarget.dataset.categoryApi , 10 );
            var dc_new_array = dc_input_array.filter(function (val)
            {   // A array that don't have selected("deleted") value
                return val != panding_delete;
            });
            if( dc_new_array.length > 0 )
            {
                dc_new_array.sort(function(x,y){return x-y;});
            }
            current_categories = dc_new_array;
            category_label_render( current_categories );
            $("#select_category .warning.message").removeClass("hide");
            return;
        }

        function category_ajax(ca_input)
        {
            $("div.ajax-waiting").removeClass("hide");
            $.ajax({
                url:"/category_relations/" + current_article_id,
                data:{ cate_id : ca_input },
                method:"PATCH",
                done: function()
                {
                    
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    alert("資料更新失敗！");
                    $("div.ajax-waiting").addClass("hide");
                    console.log([jqXHR, textStatus, errorThrown]);
                },
                success: function(aca)
                {
                    $("#select_category .warning.message").addClass("hide");
                    $("div.ajax-waiting").addClass("hide");
                    alert("資料傳送成功！");
                    get_all_categories();
                }
            });
            return;
        }
        // Render
        category_select_render( all_categories );
        category_label_render( current_categories );
        // Actions
        $("#select_category button.add").click(function() {
            add_category( current_categories, $("#select_category select").val() );
        });
        $("#select_category .label_view .remove_request").click(function(ev) {
            delete_category(ev,current_categories);
        });
        $("#select_category button.save").click(function() {
            category_ajax(current_categories);
        });
        return;
    }
    get_all_categories();
    return;
});