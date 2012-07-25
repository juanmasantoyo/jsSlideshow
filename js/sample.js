$(document).ready(function ()
{
    $('#slideshow').jsSlideshow(
    {
        autostart: true
        , effect: 'fade'
//        , width: 400
//        , height: 400
    });

    $('#start-button').click(function (e)
    {
        $('#slideshow').jsSlideshow('start');
    });

    $('#stop-button').click(function (e)
    {
        $('#slideshow').jsSlideshow('stop');
    });

    $('#apply').click(function (e)
    {
        $('#slideshow').jsSlideshow('options'
        , {
            effect: $('#effect').eq(0).val()
            , effectDuration: parseInt($('#effectDuration').eq(0).val())
            , interval: parseInt($('#interval').eq(0).val())
        });
    });

    $('#next').click(function (e)
    {
        $('#slideshow').jsSlideshow('next');
    });

    $('#previous').click(function (e)
    {
        $('#slideshow').jsSlideshow('previous');
    });
});