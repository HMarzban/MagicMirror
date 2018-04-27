


$.fn.md_calendar = function (options) {
    let defaults = { id: "" };
    let $settings = $.extend({}, defaults, options);
    if ($settings.id == "")
        throw new moduleError('ID is not defind', "calendar", ln().end, ln().start);
    const $this = this;
    const $cal_module = modul_configList[$settings.id];


    //FIXME: we have problem and doesnot show exact closest on
    function closest(array, num) {
        var i = 0;
        var minDiff = array.length;
        var ans;
        for (i in array) {
            var m = Math.abs(num - i)
            if (m < minDiff) {
                minDiff = m;
                ans = array[i];
            }
        }
        return ans;
    }

    const $cal = require(path.join(__dirname, 'module/calendar/api_calendar.json'));
    let $currnet_day = moment().format('D');
    let $Current_month = moment().format('M');
    let $Currnet_year = moment().format('YYYY');


    const fn_cal_fullyDisplay = () => {
        $this.find('.head .dates').html(`
            <div class="jalali">${$cal.cal[$Currnet_year].jalali}</div>
            <div class="miladi">${$cal.cal[$Currnet_year].miladi}</div>
            <div class="qamari">${$cal.cal[$Currnet_year].qamari}</div>
        `);
        $.each($cal.cal[$Currnet_year].event[($Current_month - 1)], function (index, val) {
            //TODO:find way to fix it!
            let close = closest($cal.cal[$Currnet_year].event[($Current_month - 1)], parseInt($currnet_day)).text   
            $this.find('.footer ul').append(` <li class="${val.isHoliday ? 'isHoliday ' : ''}${close === val.text ? 'closest' : ''}"> ` + val.text + ` </li> `);
        });
        $.each($cal.cal[$Currnet_year].days[($Current_month - 1)], function (index, val) {
            $this.find('.body').append(`
            <div class="${val.days.j == $currnet_day ? 'today' : ''}${val.disabled ? 'disabled' : ''}${val.holiday ? ' holiday' : ''}">
                <div class="jalali">${val.days.j}</div>
                <div class="miladi small">${val.days.m}</div>
                <div class="qamari small">${val.days.q}</div>
            </div>
            `);
        });
        //show | scrolle ul to current event.   
        let $position_top = (-($this.find('.footer .closest').position().top) + 60);
        $this.find('.footer ul').css({ "position": "relative", "top": $position_top });

    }// fn_cal_fullyDisplay

    //init Module
    if ($cal_module.show == "full") {
        fn_cal_fullyDisplay();
    }

};// $.fn.md_news


//initialize module 
$(moduleBase.position + " ." + moduleBase.id).md_calendar({ id: moduleBase.id });

