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
    // Navbar Area Smooth Scroll
    $('.navbar-area').onePageNav({
        currentClass: 'active',
        navItems: '.hash-link > a',
        scrollSpeed: 750, // Scroll speed
        scrollThreshold: 0.5, // Scroll speed when nearing the beginning or end of the section
        easing: 'swing'
    });
    /*=======================================
    =            03. Navbar Area            =
    =======================================*/
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
        var navbar = '.navbar-area';
        var navbarV1Class = 'navbar-v1';
        var navbarV2Class = 'navbar-v2';
        var downloadBtn = '.navbar-nav>.btn-download .btn-custom';
        var btnOutlineClass = 'pmd-btn-outline';
        if (scroll > 50) {
            // If scroll position reached the value
            $(navbar).addClass(navbarV2Class).removeClass(navbarV1Class);
            $(navbar + '.' + navbarV2Class).find(downloadBtn).removeClass(btnOutlineClass);
        } else {
            // Else
            $(navbar).addClass(navbarV1Class).removeClass(navbarV2Class);
            $(navbar + '.' + navbarV1Class).find(downloadBtn).addClass(btnOutlineClass);
        }
    });
    /*======================================
    =            04. Video Area            =
    ======================================*/
    $('.video-area .video-part .video-popup').magnificPopup({
        type: 'iframe',
        fixedContentPos: false,
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
                }
            }
        }
    });
    /*======================================
    =            05. Facts Area            =
    ======================================*/
    /*var factsExecuted = false; // DO NOT CHANGE THIS
    function startCount() {
        // To make sure countTo() function is called for the first time
        if (!factsExecuted) {
            $('.facts-area .single-fact .fact-counter').countTo({
                refreshInterval: 100,
                speed: 2250,
                decimals: 3,
                formatter: function(value, options) {
                    return value.toFixed(options.decimals);
                },
                onComplete: function() {
                    // Counting finished
                    $('<span style="margin-left:4px;">+</span>').hide().appendTo(this).fadeIn();
                }
            });
            factsExecuted = true;
        }
    }
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
        var element = $('.facts-area').offset().top - $(this).height() + 100;
        if (scroll > element) {
            // If scroll position reached the element
            startCount();
        }
    });*/
    /*============================================
    =            06. Screenshots Area            =
    ============================================*/
    var screenshotsCarousel = '.screenshots-area .owl-carousel';
    $(screenshotsCarousel).owlCarousel({
        center: true,
        loop: true,
        dots: false,
        nav: false,
        smartSpeed: 400,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });

    function screenshotsAreaPlugins() {
        var screenshotsSwiperBtn = '.screenshots-area .swipe-buttons .btn-custom';
        $(screenshotsCarousel).magnificPopup({
            type: 'image',
            delegate: '.item a',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: false,
            image: {
                verticalFit: true
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                opener: function(element) {
                    return element.find('img');
                }
            }
        });
        $(screenshotsSwiperBtn).click(function() {
            if (this.id == 'screenshots-owl-prev') {
                // If "Previous" button is clicked
                $(screenshotsCarousel).trigger('prev.owl.carousel');
            } else if (this.id == 'screenshots-owl-next') {
                // If "Next" button is clicked
                $(screenshotsCarousel).trigger('next.owl.carousel');
            }
        });
        // When the carousel is hovered
        $(screenshotsCarousel + ',' + screenshotsSwiperBtn).hover(function() {
            $(screenshotsSwiperBtn).css('opacity', '1');
        }, function() {
            $(screenshotsSwiperBtn).css('opacity', '0');
        });
    }
    screenshotsAreaPlugins(); // Execute the function
    /*========================================
    =            07. Reviews Area            =
    ========================================*/
    var reviewsCarousel = '.reviews-area .owl-carousel';
    $(reviewsCarousel).owlCarousel({
        margin: 10,
        loop: true,
        dots: false,
        nav: false,
        smartSpeed: 400,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });
    $('.reviews-area .swipe-buttons span').click(function() {
        if (this.id == 'reviews-owl-prev') {
            // If "Previous" button is clicked
            $(reviewsCarousel).trigger('prev.owl.carousel');
        } else if (this.id == 'reviews-owl-next') {
            // If "Next" button is clicked
            $(reviewsCarousel).trigger('next.owl.carousel');
        }
    });
    /*======================================================
    =            08. Support Area: Contact Form            =
    ======================================================*/
    $('#contact-form').validator({
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
                url: 'http://totemsocial.com/index.php',
                data: form.serialize(),
                success: function(text) {
                    if (text == 'Success') {
                        // If the server responded with "Success"
                        formSuccess();
                        submitMSG(true, 'Your message has been sent, We will respond to you as soon as possible!');
                    } else {
                        // else
                        formError();
                        submitMSG(false, 'Oops! Something went wrong. Please check your PHP files/Hosting mail configuration.');
                    }
                    form.find('button[type="submit"] i').removeClass('icon-spin6 animate-spin').addClass('icon-mail-alt');
                }
            });
        }

        function formSuccess() {
            // Reset inputs
            form[0].reset();
            $('#contact-form .form-group').removeClass('pmd-textfield-floating-label-active pmd-textfield-floating-label-completed');
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
    /*=====================================
    =            09. Team Area            =
    =====================================*/
    $('.team-area .owl-carousel').owlCarousel({
        items: 4,
        margin: 30,
        dots: true,
        smartSpeed: 400,
        responsive: {
            0: {
                items: 1
            },
            320: {
                items: 1
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });
    /*==============================================================
    =            10. Stay In Touch Area: Subscribe Form            =
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
    =            11. Stay In Touch Area: Tweetie Plugin            =
    ==============================================================*/
    /*$('.stay-in-touch-area .latest-tweets').twittie({
        username: 'EnvatoMarket', // Twitter username here
        apiPath: 'php/tweetie/tweet.php', // Script URL
        count: 5, 
        template: '<blockquote data-cards="hidden" data-dnt="true" class="twitter-tweet" data-lang="en"><a href="https://twitter.com/{{screen_name}}/status/{{tweet_id}}"><i class="icon-link-ext-alt"></i>View the Tweet</a></blockquote>'
    }, function() {
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
    });*/
    /*==================================================
    =            12. Floating Action Button            =
    ==================================================*/
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
        var button = '.pmd-floating-action';
        var animationV1 = 'bounceIn';
        var animationV2 = 'bounceOut';
        if (scroll > 300) {
            // If scroll position reached the value
            $(button).addClass(animationV1).removeClass(animationV2);
        } else {
            // Else
            $(button).removeClass(animationV1).addClass(animationV2);
        }
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
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
        if (scroll > 500) {
            $('.customization-panel').removeClass('fadeOut');
            $('.customization-panel').addClass('fadeIn');
        } else {
            $('.customization-panel').removeClass('fadeIn');
            $('.customization-panel').addClass('fadeOut');
        }
    });
    $(window).trigger('scroll');
}(jQuery));
