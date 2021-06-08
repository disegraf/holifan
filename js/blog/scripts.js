/** 
 * Template Name: Apex
 * Template Description: Multipurpose Responsive HTML5 Landing Page
 * By: Exill
 */

(function($) {
    'use strict';
    /*=====================================
    =            01. Preloader            =
    =====================================*/
    $(window).on('load', function() {
        var preloader = '.preloader';
        $(preloader).find('.spinner').fadeOut();
        $(preloader).delay(350).fadeOut('slow');
        $('body').delay(350);
    });
    /*=========================================
    =            02. Smooth Scroll            =
    =========================================*/
    // Custom Smooth Scroll function
    $(document).on('click', 'a[data-scroll][href^="#"]', function(e) {
        var navbarHeight = $('.navbar-area').height();
        var id = $(this).attr('href');
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }
        e.preventDefault();
        $('body, html').animate({
            scrollTop: $id.offset().top - navbarHeight
        }, 750);
    });
    /*=============================================
    =            03. Blog Post Scripts            =
    =============================================*/
    /*===================================
    =            03.01 Rrssb            =
    ===================================*/
    $('.rrssb-buttons').rrssb({
        // required:
        title: 'This is the email subject and/or tweet text',
        url: 'https://www.example.com',
        // optional:
        description: 'Longer description used with some providers',
        emailBody: 'Usually email body is just the description + url, but you can customize it if you want'
    });
    /*===========================================
    =            03.02 Comments form            =
    ===========================================*/
    $('#comments-form').validator({
        disable: false
    }).on('submit', function(event) {
        var form = $(this);
        if (event.isDefaultPrevented()) {
            // Handle the invalid form...
            formError();
            submitMSG(false, 'Did you fill in the form properly?');
        } else {
            // Everything looks good
            event.preventDefault();
            submitForm();
            form.find('button[type="submit"] i').removeClass('icon-paper-plane').addClass('icon-spin6 animate-spin');
        }

        function submitForm() {
            // Post form data to the server-side
            $.ajax({
                type: 'POST',
                url: 'php/blog/comments-form.php',
                data: form.serialize(),
                success: function(text) {
                    if (text == 'Success') {
                        // If the server responded with "Success"
                        formSuccess();
                        submitMSG(true, 'Your message has been sent, We will respond to you as soon as possible!');
                    } else {
                        // else
                        formError();
                        submitMSG(false, 'Oops! Something went wrong. Please check your PHP files configuration.');
                    }
                    form.find('button[type="submit"] i').removeClass('icon-spin6 animate-spin').addClass('icon-paper-plane');
                }
            });
        }

        function formSuccess() {
            // Reset inputs
            form[0].reset();
            $('#comments-form .form-group').removeClass('pmd-textfield-floating-label-active pmd-textfield-floating-label-completed');
        }

        function formError() {}

        function submitMSG(valid, msg) {
            // Print form status
            var msgWrapper = '.submit-msg';
            if (valid) {
                form.find(msgWrapper).fadeIn().removeClass('text-danger').addClass('text-success').text(msg);
            } else {
                form.find(msgWrapper).fadeIn().removeClass('text-success').addClass('text-danger').text(msg);
            }
        }
    });
    /*==============================================================
    =            04. Stay In Touch Area: Subscribe form            =
    ==============================================================*/
    $('#subscribe-form').validator({
        disable: false
    }).on('submit', function(event) {
        var form = $(this);
        if (event.isDefaultPrevented()) {
            // Handle the invalid form...
            formError();
            submitMSG(false, 'Did you fill in the form properly?');
        } else {
            // Everything looks good
            event.preventDefault();
            submitForm();
            form.find('button[type="submit"] i').removeClass('icon-mail-alt').addClass('icon-spin6 animate-spin');
        }

        function submitForm() {
            // Post form data to the server-side
            $.ajax({
                type: 'POST',
                url: 'php/subscribe-form.php',
                data: form.serialize(),
                success: function(text) {
                    if (text == 'Success') {
                        // If the server responded with "Success"
                        formSuccess();
                        submitMSG(true, 'Thanks for subscribing!');
                    } else {
                        // Else
                        formError();
                        submitMSG(false, text);
                    }
                    form.find('button[type="submit"] i').removeClass('icon-spin6 animate-spin').addClass('icon-mail-alt');
                }
            });
        }

        function formSuccess() {
            // Reset inputs
            form[0].reset();
        }

        function formError() {}

        function submitMSG(valid, msg) {
            // Print form status
            var msgWrapper = '.submit-msg';
            if (valid) {
                form.find(msgWrapper).fadeIn().removeClass('text-danger').addClass('text-success').text(msg);
            } else {
                form.find(msgWrapper).fadeIn().removeClass('text-success').addClass('text-danger').text(msg);
            }
        }
    });
    /*==============================================================
    =            05. Stay In Touch Area: Tweetie plugin            =
    ==============================================================*/
    $('.stay-in-touch-area .latest-tweets').twittie({
        username: 'EnvatoMarket', // Twitter username here
        apiPath: 'php/tweetie/tweet.php', // Script URL
        count: 5, // Number of tweets
        template: '<blockquote data-cards="hidden" data-dnt="true" class="twitter-tweet" data-lang="en"><a href="https://twitter.com/{{screen_name}}/status/{{tweet_id}}"><i class="icon-link-ext-alt"></i>View the Tweet</a></blockquote>'
    }, function() {
        // Append Twitter's widgets script to the body
        $('body').append($('<script async src="https://platform.twitter.com/widgets.js"></script>'));
        $('.stay-in-touch-area .latest-tweets .owl-carousel').owlCarousel({
            items: 1,
            center: true,
            loop: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4500,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            mouseDrag: false,
            touchDrag: false
        });
    });
    /*==========================================
    =            Customization Tool            =
    ==========================================*/
    $('.customization-panel .btn.toggler').click(function() {
        var duration = 350;
        //get the outer width of the div
        var divOuterWidth = $('.customization-panel .customization-container').outerWidth();
        var targetMargin = $('.customization-panel .customization-container').css('margin-left') == ((-divOuterWidth) + 'px') ? '0px' : (-divOuterWidth) + 'px';
        $('.customization-panel .customization-container').animate({ marginLeft: targetMargin }, duration);
        $('.customization-panel .btn.toggler i').toggleClass('icon-cog-alt icon-cancel');
        $('.customization-panel .btn.toggler').toggleClass('pmd-z-depth-custom');
    });
    $('.customization-panel .colors-panel ul li').on('click', function() {
        var path = $(this).data('path');
        $('#color-switcher').attr('href', path);
    });
}(jQuery));