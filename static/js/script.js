/**
 * Created by lite on 12/8/16.
 */

$(document).ready(function() {

    var clickedFolder = null;

    // Navbar collapsible dropdown button initialization for mobile
    $(".button-collapse").sideNav();

    // For dropdown button
    $(".dropdown-button").dropdown();

    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();

    // For select buttons
    $('select').material_select();

    // For chips
    $('.chips-placeholder').material_chip({
        placeholder: "More...",
        secondaryPlaceholder: "Enter a technology",
    });

    $('.chips.focus').prev().css('color', 'red');




    $("a#members-form-submit").click(function (evt) {

        console.log('Test');
        evt.preventDefault();
        var userName = $("input#member-name").val();

        $.ajax({
            url: '/check_members',
            method: 'POST',
            data: {member_name: userName},
            dataType: 'json',
        }).done(function (res) {

            if (res.status === 0) {
                $("#member-list").append("<li value=" + res.id + " class='member'>" + userName + "</li>");
                $("input#member-name").val("");
            }

            else if (res.status === 1)
                alert(res['message']);

            else if (res.status === 2) {
                alert(res['message'])
            }
        }).fail(function (err) {
            console.log(err);
        });

    });

    $("form#new_project").submit(function (evt) {

        evt.preventDefault();
        console.log('Test');
        var projectData = {};

        projectData.projectName = $("input#project-name").val();
        projectData.projectDescription = $("#project-description").val();
        projectData.projectMembers = [];
        projectData.projectTags = [];
        projectData.domain = $("#domain").val();
        projectData.type = $("[name='type']").val();

        console.log(projectData.domain);
        console.log(projectData.type);

        projectTags = $(".chips-placeholder").material_chip('data');

        for (p in projectTags) {
            projectData.projectTags.push(projectTags[p].tag);
        }

        var members = $("#member-list li");

        console.log(members.length);

        // for (i in members) {
        //     console.log($(members[i]).attr('value'));
        //     // data.projectMembers.push($(members[i]).attr('value'));
        // }

        console.log(members);

        $.each($("#member-list li"), function (index, value) {
            projectData.projectMembers.push($(value).attr('value'));
        });

        console.log(projectData);


        $.ajax({
            url: '/create_project',
            method: 'POST',
            data: JSON.stringify(projectData),
            contentType: 'application/json',
            dataType: 'json',
        }).done(function (res) {
            console.log(res);
            window.location.assign('/project_dashboard/' + res.id);
        }).fail(function (err) {
            console.log(err);
        });
    });

    /*================ Adds single click functionality for project folder ======================= */

    var folders = $(".single-project-listing");

    folders.click(function () {

        console.log("In single project listing");
        if (clickedFolder)
            clickedFolder.css("background-color", "white");

        $(this).css("background-color", "#BBDEFB");
        $("#nav-bar-right").css("display", "block");
        clickedFolder = $(this);
        $("#download-project-id").val(clickedFolder.attr('id'));
    });

    $(".content-main").click(function (evt) {

        if (!( $(evt.target).hasClass('single-project-listing') || $(evt.target).hasClass('fa') )) {
            if (clickedFolder)
                clickedFolder.css("background-color", "white");

            $("#nav-bar-right").css("display", "none");
        }
    });



    $("#searchForm").submit(function (evt) {
        // $('#submitButton').click(function(evt) {
        evt.preventDefault();
        var domainSearch = [];
        domainSearch = $('#multiselection').val();
        console.log(domainSearch);
        var chipSearch = [];
        var str = $('#search').val();
        chipSearch = str.split(" ");

        var data = {};
        data = {domainSearch: domainSearch, chipSearch: chipSearch};
        // alert(data.domainSearch)
        //alert(multiselect);

        $.ajax({
            url: '/search',
            method: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',

        }).done(function (data) {

            console.log(data);
            console.log(data.array.length);
            var found_results = $("#foundResults");
            $(found_results).empty();
            $(found_results).append(' <h5>Following Results found:</h5>');
            for (var i = 0; i < data.array.length; i++) {

                $('#foundResults').append('<div class="col l2 m4 s6 offset-m1 center-align"><div class="single-project-listing center-align searchResults modal-trigger" id=' + data.array[i]._id +  '> <div class="hide projectName">' + data.array[i].projectName + '</div> <div class="hide projectDescription"> ' + data.array[i].projectDescription + '</div> <div class="hide projectMembers">' + JSON.stringify(data.array[i].memberNames) + '</div> <div class="hide projectOwner">' + data.array[i].ownerName + '</div> <div class="hide projectDomain">' + data.array[i].domain + '</div> <div class="hide projectTags">'  + JSON.stringify(data.array[i].projectTags) + '</div> <a href="#"><i class="fa fa-folder" aria-hidden="true" id="projFolder"></i></a> </div><p>' + data.array[i].projectName + '</p></div>');
            }

        }).fail(function (err) {
            console.log(err);
        });
    });

    $(document).on('click' ,'.searchResults' , function (evt) {
        evt.preventDefault();

        if (clickedFolder)
            clickedFolder.css("background-color", "white");

        $(this).css("background-color", "#BBDEFB");
        $("#nav-bar-right").css("display", "block");
        clickedFolder = $(this);
        $("#searched-project-id").text($(this).attr('id'));

        var name = $(this).find('.projectName').text();
        var description = $(this).find('.projectDescription').text();
        var members = JSON.parse($(this).find('.projectMembers').text());
        var domain = $(this).find('.projectDomain').text();
        var tags = JSON.parse($(this).find('.projectTags').text());
        var owner = $(this).find('.projectOwner').text();

        var container = $("#requestJoin .description-container");

        container.empty();
        container.prepend("<p> Owner : " + owner + "</p>");
        container.prepend("<p>Tags : " + tags + "</p>");
        container.prepend("<p> Domain : " + domain + "</p>");
        container.prepend("<p> Members : " + members + "</p>");
        container.prepend("<p> Description : " + description + "</p>");
        container.prepend("<h3>" +  name + "</h3>");

        $('#requestJoin').openModal();

    });


    $("#rename-project-form").submit(function (evt) {
        evt.preventDefault();

        var data = {};
        data.proj_id = clickedFolder.attr('id');
        data.new_name = $("#new_project_name").val();

        $.ajax({
            url: '/rename',
            method: 'POST',
            data: data,
            dataType: 'json'
        }).done(function (data) {
            clickedFolder.parent().find("p").text(data.new_name);

        }).fail(function (err) {
            console.log(err);
        });

    });

    $("#delete-project").click(function (evt) {
        evt.preventDefault();
        console.log("In delete");
        var data = {};
        data.proj_id = clickedFolder.attr('id');

        $.ajax({
            url: '/delete_project',
            method: 'POST',
            data: data,
            dataType: 'json'
        }).done(function (data) {
            if (data.status == 0) {
                clickedFolder.parent().remove();
                alert(data.message)
            }

            else if (data.status == 1) {
                alert(data.message)
            }
        }).fail(function (err) {
            console.log(err)
        });
    });

    $("#download-project").click(function (evt) {
        $("form#download-project-form").submit();
    });

    $(document).on('dblclick','.single-project-listing',function (evt) {
        var id = $(this).attr('id');
        console.log(id);
        console.log("Test");
        window.location.assign("project_dashboard/" + id);
    });

    /* ====================== For sending contribution request ============================== */

    $(".send-request").click(function(evt){
        evt.preventDefault();
        var id = $("#searched-project-id").text();
        console.log(id);

        $.ajax({
            url: '/apply',
            method: 'post',
            data: {proj_id : id},
            dataType: 'json',
        }).
            done(function(data){
                alert(data.message);
                $("#requestJoin").closeModal();
        }).
            fail(function(err){
                console.log(err);
        });
    });

     /* ====================== For accepting or declining request ============================== */

    $(".accept-decline").click(function(evt){
        evt.preventDefault();

        var id = $(this).attr('id');
        var user = $(this).parent().parent().find("p.request-user-id").text();
        var project = $(this).parent().parent().find("p.request-project-id").text();


        console.log(user);

        $.ajax({
            url: '/notify',
            method: 'post',
            data: { proj_id : project , status: Number(id) , user_id: user },
            dataType: 'json',
        }).
            done(function(data){
                console.log(data);
        }).
            fail(function(err){
                console.log(err);
        });
    });

    $('select').change(function () {
        var newValuesArr = [];
        var select = $(this);
        var ul = select.prev();

        ul.children('li').toArray().forEach(function (li, i) {
            if ($(li).hasClass('active')) {
                newValuesArr.push(select.children('option').toArray()[i].value);
            }
        });

        select.val(newValuesArr);
        console.log(newValuesArr);
    });

});




