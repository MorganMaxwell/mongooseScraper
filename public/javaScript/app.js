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
        // why won't this way \/ work?
        // $(".articles").click(() => {
        let articleId = $(this).attr("data-id");
        $("#submit").attr("data-id", articleId);
        $.ajax({
            method: "GET",
            url: "/oneArticle/" + articleId,
        }).then(function (data) {
            $("#articleComment").empty();
            $("#articleComment").append(data.comment.title);
            $("#articleComment").attr("data-id", data.comment._id);
        });
    });
    $(document).on("click", "#submit", function () {
        let articleId = $(this).attr("data-id");
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
            $("#comment").val("");
        });
    });
    $(document).on("click", "#delete", function () {
        let commentId = $("#articleComment").attr("data-id");
        $.ajax({
            method: "DELETE",
            url: "/deleteComment/" + commentId,
        }).then(() => {
            $("#submit").removeAttr("data-id");
            $("#articleComment").val("Article Note Will Go Here");
        });
    });
});