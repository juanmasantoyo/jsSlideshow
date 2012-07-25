/*
    jsCarousel by Juanma Santoyo, version 1.1.0.
    http://www.juanmasantoyo.es/index.php/jscarousel/

    Changelog:
    - Changed the image costruction, so the a element doesn't loses their attributes
*/

(function ($)
{
    var globals =
    {
        settings: null
        , interval: null
        , counter: 0
        , loaded: false
    };

    /*var callbacks =
    {
    onLoad: null
    };*/

    var methods =
    {
        // This method inits the jsCarousel
        _init: function (options)
        {
            var _this = this;

            var el = $(this);

            // Extends settings with passed options
            globals.settings = $.extend({
                interval: 1000
                , autoStart: true
                , direction: 1
                , effect: 'simple'
                , effectDuration: 500
                , width: 'auto'
                , height: 'auto'
            }, options);

            // Sets some CSS to the element
            el.css({
                'display': 'block'
                , 'margin': 0
                , 'padding': 0
                , 'width': globals.settings.width
                , 'height': globals.settings.height
                , 'border': 0
            });

            // If autostart is enabled, starts the carousel
            if (globals.settings.autoStart)
            {
                methods._start(_this);
            }

            return _this;
        }
        // This method starts the carousel
        , start: function ()
        {
            return methods._start(this);
        }
        , _start: function (_this)
        {
            if ($('img', _this).size() > 1)
            {
                globals.interval = window.setInterval(
                    function ()
                    {
                        methods._next(_this);
                    }
                    , globals.settings.interval);
            }

            return _this;
        }
        // This method stops the carousel
        , stop: function (interval)
        {
            return methods._stop(this);
        }
        , _stop: function (_this)
        {
            window.clearInterval(globals.interval);

            return _this;
        }
        // This method moves to the next image
        , next: function ()
        {
            return methods._next(this);
        }
        , _next: function (_this)
        {
            return _this.each(function ()
            {
                var el = $(this);
                var imgs = $('img', el);
                var size = imgs.size();

                var current = (globals.counter + size) % size;
                globals.counter += globals.settings.direction;
                var next = (globals.counter + size) % size;

                methods._applyEffect(imgs, current, next);
            });
        }
        // This method moves to the previous image
        , previous: function ()
        {
            return methods._previous(this)
        }
        , _previous: function (_this)
        {
            globals.settings.direction *= -1;
            methods._next(_this);
            globals.settings.direction *= -1;

            return _this;
        }
        // This method adds a callback
        /*, addCallback: function (name, callback)
        {
        return methods._addCallback(this, name, callback);
        }
        , _addCallback: function (_this, name, callback)
        {
        callbacks[name] = callback;

        return _this;
        }
        // This method removes a callback
        , removeCallback: function (name)
        {
        return methods._removeCallback(this, name);
        }
        , _removeCallback: function (_this, name)
        {
        callbacks[name] = null;

        return _this;
        }*/
        // This method returns the current options, and allows to change the values
        , options: function (opt)
        {
            return methods._options(this, opt);
        }
        , _options: function (_this, opt)
        {
            globals.settings = $.extend(
                globals.settings
                , (opt) ? opt : {});

            // This will reset the interval
            methods._stop(_this);
            methods._start(_this);

            return globals.settings;
        }
        , _applyEffect: function (imgs, current, next)
        {
            if (globals.settings.effect === 'simple')
            {
                methods._applySimpleEffect(imgs, current, next);
            }
            else if (globals.settings.effect === 'fade')
            {
                methods._applyFadeEffect(imgs, current, next);
            }
            else if (globals.settings.effect === 'slide')
            {
                methods._applySlideEffect(imgs, current, next);
            }
        }
        , _applySimpleEffect: function (imgs, current, next)
        {
            $(imgs[current]).css(
            {
                'display': 'none'
            });

            $(imgs[next]).css(
            {
                'display': 'inline'
            });
        }
        , _applyFadeEffect: function (imgs, current, next)
        {
            $(imgs[current]).parent().css({
                'position': 'relative'
            });

            $(imgs[current]).css({
                'position': 'absolute'
                , 'top': '0'
                , 'left': '0'
                , 'z-index': '2'
                , 'display': 'inline'
            });

            $(imgs[next]).css({
                'position': 'absolute'
                , 'top': '0'
                , 'left': '0'
                , 'z-index': '1'
                , 'display': 'inline'
            });

            $(imgs[current]).fadeOut(globals.settings.effectDuration);
        }
        , _applySlideEffect: function (imgs, current, next)
        {
            $(imgs[current]).parent().css({
                'position': 'relative'
            });

            $(imgs[current]).css({
                'position': 'absolute'
                , 'top': '0'
                , 'left': '0'
                , 'z-index': '2'
                , 'display': 'inline'
            });

            $(imgs[next]).css({
                'position': 'absolute'
                , 'top': '0'
                , 'left': '0'
                , 'z-index': '1'
                , 'display': 'inline'
            });

            $(imgs[current]).slideUp(globals.settings.effectDuration);
        }
        , _isPublic: function (method)
        {
            return method.charAt(0) != '_';
        }
    };

    $.fn.jsSlideshow = function (method)
    {
        // Call the method if exists.
        if (methods[method] && methods._isPublic(method))
        {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method)
        {
            return methods._init.apply(this, arguments);
        }
        else
        {
            $.error('Method ' + method + ' does not exist on jQuery.jsSlideshow');
        }
    }
})(jQuery);