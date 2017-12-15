# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
# https://css-tricks.com/jquery-coffeescript/

$(document).ready ->
    tag_api = "/article_tags.json"
    $.ajax
        url: tag_api
        dataType: "json"
        error: (jqXHR, textStatus, errorThrown) ->
            render_fail(errorThrown)
        success: (data, textStatus, jqXHR) ->
            render_goon( data )

    # Actions after AJAX call
    render_fail = (msg , ipt = "error msg: ") ->
        console.log("#{ipt} #{msg}")

    render_goon = ( rg_data ) ->
        btn_curr = ""
        rg_data.forEach (rgd) ->

            btn_tmpdata =
                idn:"/article_tags/" + rgd.id
                val:rgd.tag_name

            btn_tmpview = "<button class='button'
                data-component='modal' data-target='#articles_modal'
                data-url='#{btn_tmpdata.idn}'> #{btn_tmpdata.val}
            </button>"

            btn_curr += btn_tmpview
        $("#render_view").html(btn_curr)

    $("button").click ->
        alert("NOJNKJBGUKVCYFC")
        #我は官軍　我が敵は
    
    return

# <button class="outline button" data-component="modal" data-target="#articles_modal" data-url="/aa.bb/" > t.tag_name </button>
# var myRow = document.createElement("tr");
# var firstTD = document.createElement("td");
# myRow.class = "myClass";
# firstTD.innerHTML = "first";
# myRow.appendChild(firstTD);
#btn = $ "button.button"
#btn.prop( "data-xcm", "xdcf" )
#btn.appendTo( "#render_view" )
#$ "<button/>", ->
#   class: "button",
#   html: "Hello",
#   val: "Nakaya",
#   dataComponent: "modal",
#   text: "Example Page"
#.appendTo( "#render_view" )
# $("<a/>", {
#    id: 'example-link',
#    href: 'http://www.example.com/',
#    text: 'Example Page'
#}).appendTo("body");
# <button class="button"
# data-component="modal" data-target="#articles_modal"
# data-url="<%= article_tag_path( t.id ) %>" >
# <%= t.tag_name %>
# $("<button/>", {
#    class: "button"
#    data-component: "modal",
#    text: 'Example Page'
# }).appendTo("#render_view");