$(document).ready(function()
{
    

    $.ajax
    ({
        url: "/article_tags.json",
        dataType: "json",
        error: function(jqXHR, textStatus, errorThrown)
        {
            $("#render_view").val( "error message: " + errorThrown );
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
                idnum: "/article_tags/" + rgo_input.id,
                value: rgo_input.tag_name
            };
            // btn_html_dataset = `data-component="modal" data-target="#articles_modal" data-render-api="${btn_tmpdata.idnum}" `;
            btn_tmpview = `<button class='button'
                data-component="modal" data-target="#articles_modal"
                data-render-api="${btn_tmpdata.idnum}"
            > ${btn_tmpdata.value} </button>`;
            return btn_curr += btn_tmpview;
        });
        
        $("#render_view").html(btn_curr);

        $('#render_view .button').click(function (event)
        {   // What the fucking AJAX...Fucking work in fucking AJAX?
            var clicked_value = event.target.innerHTML;
            var render_api = event.target.dataset.renderApi;
            var help_text = "以下文章內容與" + clicked_value + "有關：";
            
            $( "#articles_modal .help_text" ).text( help_text );
            $( "#articles_modal .clicked_value" ).text( clicked_value );
            $( '#articles_modal a.button[data-method="delete"]' ).attr( "href" , render_api );

            $.ajax
            ({
                url: render_api,
                dataType: "json",
                error: function(jqXHR, textStatus, errorThrown)
                {
                    $( "#articles_modal .render_texts" ).html( "<li>Error message: " + errorThrown + "</li>" );
                    return;
                },
                success: function(data) { catagroy_render( data );return; }
            });
        });

        return;
    }

    function catagroy_render( cr_input )
    {
        var render_templete = "";
        cr_input.forEach(function( rgo_input )
        {
            render_templete += `<li>
                <a href="articles/${ rgo_input.id }">${ rgo_input.title }</a>
            </li>`;
        });
        $( "#articles_modal .render_texts" ).html( render_templete );
        return;
    }
});