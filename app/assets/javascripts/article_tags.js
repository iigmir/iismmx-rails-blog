$(document).ready(function()
{
    $.ajax
    ({
        url: "/article_tags.json",
        dataType: "json",
        error: function(jqXHR, textStatus, errorThrown)
        {
            $("#render_view").val( "error msg: " + errorThrown );
            return;
        },
        success: function(data, textStatus, jqXHR)
        {
            var btn_curr = "";
            data.forEach(function( rgo_input )
            {
                var btn_tmpdata, btn_tmpview, btn_html_dataset;
                btn_tmpdata = {
                    idnum: "/article_tags/" + rgo_input.id,
                    value: rgo_input.tag_name
                };
                btn_html_dataset = `data-component='modal' data-target='#articles_modal' data-url="${ btn_tmpdata.idnum }" `;
                btn_tmpview = `<button class='button' ${ btn_html_dataset }> ${btn_tmpdata.value} </button>`;
                return btn_curr += btn_tmpview;
            });
            
            $("#render_view").html(btn_curr);
    
            $('.button').click(function (event)
            {   // What the fucking AJAX...
                // Fucking work in fucking AJAX?
                console.log('Hooray!');
            });
            return;
        }
    });
});