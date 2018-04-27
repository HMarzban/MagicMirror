
$.fn.md_news = function (options) {
    let defaults = { id: "" };
    let $settings = $.extend({}, defaults, options);
    if ($settings.id == "")
        throw new moduleError('ID is not defind', "news", ln().end, ln().start);
    const $this = this;
    const $news_module = modul_configList[$settings.id];
    let fade_time = "";

    $this.append(`<div class="nd_online"></div><div class="ho_news"><div>`);
    let fn_news_relaod = function () {
        //if($weather_module.default_config.refresh_time.worke){
        let i = $news_module.refreshTime || 60000;
        console.log(i)
        let md_news_relaod = setInterval(function () {
            //i = i - 1;
            //console.log(i)
            //$this.find('.footer .timer').text(i)
            //if (i <= 0) {
            // get new data
            fn_news_init();
            clearInterval(md_news_relaod);
            clearInterval(fade_time);
            //}
        }, i);// setInterval
        //}//worke or not
    }// fn_news_relaod

    const fn_news_init = function () {

        $.get("http://khabarpu.com/file/kp2/sort_newsagency/latest/newsagency.htm?_=" + moment().valueOf(), function (_data) {
            $this.find('.ho_news').html(_data);

            if ($news_module.show == "scroll")
                $this.addClass('md_news_scroll').find('.ho_news').addClass('ho_news_active');
            else
                $this.addClass('md_news_fade');

            if ($news_module.show == "fade")
                fn_fade_animation();

            //preventDefault ahref tag in develope mode
            fn_link_abandon();

            fn_news_relaod();
        }).fail(function () {
            // if faild try load again
            fn_news_init();
        }); //http get
    }//fn_news_init

    const fn_link_abandon = function () {
        $this.find('a').on('click', function (e) {
            e.preventDefault();
        })
    }

    const fn_fade_animation = function () {
        let array = [];
        let index = 0;
        $('.ho_news > div').each(function (index, val) {
            array.push($(val).html())
        });
        $('.ho_news > div').remove();

        $('.ho_news').hide().delay(400).html(array[0]).fadeIn('slow');
        index = 1;
        fade_time = setInterval(function () {
            $('.ho_news').fadeOut('slow', function () {
                $('.ho_news').html(array[index]).fadeIn()
            });
            index++;
        }, 6000)
    }// fn_fade_animation
    fn_news_init();
};// $.fn.md_news



$(moduleBase.position + " ." + moduleBase.id).md_news({ id: moduleBase.id });