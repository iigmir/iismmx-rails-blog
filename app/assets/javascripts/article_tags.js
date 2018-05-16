function ajax_fail( hidden_html , error_input )
{
    document.querySelector( hidden_html ).classList.remove("hide");
    console.error( error_input );
    return;
}

window.onload = function()
{
    fetch("/categories.json").then( (response) =>
    {
        if( response.ok ) { return response.json(); }
        throw new Error('Network response was not ok.');
    }).catch( (error) => ajax_fail( "div.index.ajaxfail" , error ) )
    .then( ( tag_api ) =>
    {   // Main
        let btn_curr = "";
        document.querySelector(".ajax-inline-waiting").classList.add("hide");
        tag_api.forEach( ( rgo_input ) =>
        {
            let btn_tmpdata, btn_tmpview, btn_html_dataset;
            btn_tmpdata = {
                idnum: "/categories/" + rgo_input.id,
                value: rgo_input.tag_name
            };
            btn_tmpview = '<button class="button" data-component="modal" data-target="#articles_modal" data-render-api='
            + btn_tmpdata.idnum + ">" + btn_tmpdata.value + "</button>";
            return btn_curr += btn_tmpview;
        });
        document.querySelector("#render_view").innerHTML = btn_curr;
        $('#render_view .button').click(function (event)
        {
            let click_value = event.target.innerText;
            let render_api  = event.target.dataset.renderApi;
            document.querySelector("#articles_modal .help_text").innerText = "以下文章內容與" + click_value + "有關：";
            document.querySelector("#articles_modal .clicked_value").innerText = click_value + " 的分類";
            document.querySelector("#articles_modal .clicked_value").innerText = click_value + " 的分類";
            $( '#articles_modal a.button[data-method="delete"]' ).attr( "href" , render_api );

            fetch( render_api ).then( (response) =>
            {
                if( response.ok ) { return response.json(); }
                throw new Error("Network response was not ok");
            }).catch( (error) => ajax_fail( "div.index.ajaxfail" , error ) )
            .then( ( catagroy_api ) =>
            {
                let has_article = catagroy_api.length > 0;
                let render_templete = has_article ? "" : "<li> 目前還沒有屬於這個分類的條目 ＠＠ </li>"
                catagroy_api.forEach( ( rgo_input ) => render_templete += "<li><a href='/articles/" +rgo_input.id+ "'>" +rgo_input.title+ "</a></li>" );
                $( "#articles_modal .render_texts" ).html( render_templete );
            });
        });
    });
}