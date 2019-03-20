$(document).ready(() => {
    // /scrape
    // /articles
    $("#scrape").click(() => {
        $.ajax({
            method: "GET",
            url: "/scrape"
        });
    });
    $(document).on("click", ".articles", function () {
    // $(".articles").click(() => {
        let articleId = $(this).attr("data-id");
        $("#submit").attr("data-id", articleId);
        $.ajax({
            method: "GET",
            url: "/oneArticle/" + articleId,
        }).then(data => {
            console.log(data)
        });
    });

    $(document).on("click", "#submit", function () {
        let articleId = $(this).attr("data-id");
        console.log(articleId);
        if (!articleId) {
            return console.log("no article selected");
        };
        let data = {
            title: $("#comment").val().trim()
        };
        $.ajax({
            method: "POST",
            url: "/oneArticle/" + articleId,
            data: data
        }).then(() => {
            $("#submit").removeAttr("data-id");
        });
    });
});