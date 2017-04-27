(function($){
    $.fn.demo = function(params){
        var settings = $.extend({
            speed : 1000,
            sleep : 2000,
        }, params);

        var stages = [
            {class: 'mkst-browser'},
            {class: 'mkst-browser mkst-alt'},
            {class: 'mkst-browser mkst-url mkst-alt'},
            {class: 'mkst-browser mkst-url', data: {'mkst-url' : "http://repraze.com"}},
            {class: 'mkst-browser mkst-url mkst-alt', data: {'mkst-url' : "http://repraze.com"}},

            {class: 'mkst-app'},
            {class: 'mkst-app mkst-alt'},
            {class: 'mkst-app', data: {'mkst-app' : "Repraze"}},
            {class: 'mkst-app mkst-alt', data: {'mkst-app' : "Repraze"}},

            {class: 'mkst-stack'},
            {class: 'mkst-stack mkst-alt'},

            {class: 'mkst-shuffled'},
            {class: 'mkst-shuffled mkst-nice'},
            {class: 'mkst-shuffled mkst-nice mkst-alt'},
            {class: 'mkst-shuffled mkst-messy'},
            {class: 'mkst-shuffled mkst-messy mkst-alt'},
        ];

        return this.each(function(){
            var $this = $(this);

            var outer = $this.find('.demo-animate');
            var inner = outer.find('> *');

            var infoClass = $this.find('.demo-info > .class');
            var infoData = $this.find('.demo-info > .data');

            var n = -1;
            var nextStage = function(el){
                if(stages[n]){
                    var stage = stages[n];
                    el.removeClass(stage.class);
                    if(stage.data){
                        for(var key in stage.data){
                            el.removeAttr(key);
                        }
                    }
                }
                n = (n+1)%stages.length;
                stage = stages[n];
                el.addClass(stage.class);
                infoClass.text('class="'+stage.class+'"');
                if(stage.data){
                    var text = [];
                    for(var key in stage.data){
                        var dataKey = 'data-'+key;
                        el.attr(dataKey, stage.data[key]);
                        text.push(dataKey+'="'+stage.data[key]+'"')
                    }
                    infoData.text(text.join(', '));
                }else{
                    infoData.text('');
                }
            };

            var loop = function(){
                inner.css({
                    width: '300px',
                    height: '200px'
                });

                inner
                    .animate({width: '600px'}, settings.speed, function(){nextStage(outer);})
                    .delay(settings.sleep)
                    .animate({height: '400px'}, settings.speed, function(){nextStage(outer);})
                    .delay(settings.sleep)
                    .animate({width: '300px'}, settings.speed, function(){nextStage(outer);})
                    .delay(settings.sleep)
                    .animate({height: '200px'}, settings.speed, function(){nextStage(outer);})
                    .delay(settings.sleep)
                    .queue(function(next){
                        loop();
                        next();
                    });
            }

            nextStage(outer);
            loop();
        });
    };
}(jQuery));
