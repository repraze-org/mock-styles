(function($){
    $.fn.demo = function(params){
        var settings = $.extend({
            speed : 1000,
            sleep : 2000,
        }, params);

        var stages = [
            {class: 'mkst-browser'},
            {class: 'mkst-browser mkst-alt'},
            {class: 'mkst-browser mkst-url', data: {'mkst-url' : "hello"}},
        ];

        return this.each(function(){
            var $this = $(this);
            var inner = $(this).find('> *');

            var n = 0;
            var nextStage = function(el){
                el.removeClass(stages[n].class);
                el.data({});
                n = (n+1)%stages.length;
                el.addClass(stages[n].class);
                console.log(stages[n].data);
                if(stages[n].data){
                    el.data(stages[n].data);
                }
            };

            var loop = function(){
                inner.css({
                    width: '200px',
                    height: '100px'
                });

                inner
                    .animate({width: '600px'}, settings.speed)
                    .delay(settings.sleep)
                    .animate({height: '400px'}, settings.speed, function(){nextStage($this);})
                    .delay(settings.sleep)
                    .animate({width: '200px'}, settings.speed)
                    .delay(settings.sleep)
                    .animate({height: '100px'}, settings.speed, function(){nextStage($this);})
                    .delay(settings.sleep)
                    .queue(function(next){
                        loop();
                        next();
                    });
            }
            loop();
        });
    };
}(jQuery));
