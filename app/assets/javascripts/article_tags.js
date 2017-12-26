$(document).ready(function()
{
    $.ajax
    ({
        url: "/categories.json",
        dataType: "json",
        error: function(jqXHR, textStatus, errorThrown)
        {
            $("div.index.ajaxfail").removeClass("hide");
            console.log([jqXHR, textStatus, errorThrown]);
            return;
        },
        success: function(data) { init_render( data );return; }
    });

    function init_render( ir_input )
    {
        var btn_curr = "";
        
        ir_input.forEach(function( rgo_input )
        {
            var btn_tmpdata, btn_tmpview, btn_html_dataset;
            btn_tmpdata = {
                idnum: "/categories/" + rgo_input.id,
                value: rgo_input.tag_name
            };

            btn_tmpview = '<button class="button" data-component="modal" data-target="#articles_modal" data-render-api='
            + btn_tmpdata.idnum + ">" + btn_tmpdata.value + "</button>";
            return btn_curr += btn_tmpview;
        });
        
        $("#render_view").html(btn_curr);

        $('#render_view .button').click(function (event)
        {   // What the fucking AJAX...Fucking work in fucking AJAX?
            var clicked_value = event.target.innerText;
            var render_api = event.target.dataset.renderApi;
            var help_text = "以下文章內容與" + clicked_value + "有關：";
            
            $( "#articles_modal .help_text" ).text( help_text );
            $( "#articles_modal .clicked_value" ).text( clicked_value + " 的分類" );
            $( '#articles_modal a.button[data-method="delete"]' ).attr( "href" , render_api );

            $.ajax
            ({
                url: render_api,
                dataType: "json",
                error: function(jqXHR, textStatus, errorThrown)
                {
                    $("div.show.ajaxfail").removeClass("hide");
                    console.log([jqXHR, textStatus, errorThrown]);
                    return;
                },
                success: function(data) {
                    catagroy_render( data );
                    //debugger;
                    return;
                }
            });
        });

        return;
    }

    function catagroy_render( cr_input )
    {
        var render_templete = "";
        if ( cr_input.length > 0 )
        {
            cr_input.forEach(function( rgo_input )
            {
                render_templete += "<li><a href='/articles/" +rgo_input.id+ "'>" +rgo_input.title+ "</a></li>";
            });
        }
        else
        {
            render_templete = "<li> 目前還沒有屬於這個分類的條目 ＠＠ </li>";
        }
        $( "#articles_modal .render_texts" ).html( render_templete );
        return;
    }
});