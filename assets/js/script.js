$(document).ready(function() {
    'use strict';

    var slideout;

    function initSlideout() {
        slideout = new Slideout({
            'panel': document.getElementById('slideout-content'),
            'menu': document.getElementById('slideout-nav'),
            'padding': 256,
            'tolerance': 70,
            'side': 'right'
        });
        $('.mobile-nav__icon').on('click', function() {
            slideout.toggle();
        });
    }

    var options = {
            prefetch: true,
            cacheLength: 2,
            onStart: {
                duration: 1300,
                render: function($container) {
                    $container.addClass('is-exiting');
                    smoothState.restartCSSAnimations();
                    if ($(window).width() < 768) {
                        slideout.close();
                    }
                }
            },
            onReady: {
                duration: 0,
                render: function($container, $newContent) {
                    $container.removeClass('is-exiting');
                    $container.html($newContent);
                    if ($(window).width() < 768) {
                        initSlideout();
                    }
                    if(document.getElementById("particles-js")!=null){
                        initParticles();
                    }
                    window.retinajs();
                }
            }
        },
        smoothState = $('#animate-wrapper').smoothState(options).data('smoothState');

    var resizeId;

    if ($(window).width() < 768) {
        initSlideout();
    }

    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 500);
    });

    function doneResizing() {
        if ($(window).width() < 768) {
            initSlideout();
        }
        if ($('#slideout-nav').hasClass('slideout-menu') && $(window).width() >= 768) {
            slideout.close();
        }
    }

    function initParticles() {
        particlesJS.load('particles-js', '/assets/json/particles.json');
    }

    if(document.getElementById("particles-js")!=null){
        initParticles();
    }

    window.retinajs();

});
