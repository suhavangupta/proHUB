/**
 * Created by lite on 10/10/16.
 */

    new WOW().init();

    $( document ).ready(function(){
        $(".button-collapse").sideNav();
        $('.modal-trigger').leanModal();
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();

    /* ====================================== For signup ====================================== */

        $(".signup-form").submit(function(evt){
        evt.preventDefault();

        var post_data = {};

        post_data.fullname = $(evt.target).find("[name='fullname']").val();
        post_data.username = $(evt.target).find("[name='username']").val();
        post_data.email = $(evt.target).find("[name='email']").val();
        post_data.password = $(evt.target).find("[name='password']").val();

        var repeatpassword = $(evt.target).find("[name='repeatpassword']").val();

        if(post_data.password !== repeatpassword)
            alert("Passwords don't match");

        else {
                $.ajax({
                url : '/signup',
                method: 'post',
                data: post_data,
                dataType: 'json',
            }).
                done(function(res){

                    alert(res.message);

                    if(res.status == 0)
                        window.location.assign('/user_dashboard');
            }).
                fail(function(err){
                    console.log(err);
            });

        }

    });

    /* ====================================== For login ====================================== */

         $(".login-form").submit(function(evt){
        evt.preventDefault();

        var post_data = {};

        post_data.username = $(evt.target).find("[name='username']").val();
        post_data.password = $(evt.target).find("[name='password']").val();

        $.ajax({
            url : '/login',
            method: 'post',
            data: post_data,
            dataType: 'json',
        }).
            done(function(res){

                alert(res.message);

                if(res.status == 0)
                    window.location.assign('/user_dashboard');
        }).
            fail(function(err){
                console.log(err);
        });
    });

    });
