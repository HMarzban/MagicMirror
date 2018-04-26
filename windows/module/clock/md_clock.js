
        (function ($) {

            $.fn.md_clock = function (options) {
                let defaults = {id : ""};
                let $settings = $.extend({}, defaults, options);
                



                const $this = this;
        
             
                const $clock_module = modul_configList[$settings.id];

                console.log($clock_module)


                let fn_clock_init = function () {
                    if ($clock_module.show == "analog") {

                        $this.html(`
                                    <style id="clock-animations"></style>
                                    <div class="clock-wrapper">
                                        <div class="clock-base">
                                            <div class="click-indicator">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                            <div class="clock-hour"></div>
                                            <div class="clock-minute"></div>
                                            <div class="clock-second"></div>
                                        </div>
                                    </div>
                                `).css({ 'width': '300px', 'height': '300px' });

                        //generate clock animations use GPU
                        var now = new Date(),
                            hourDeg = now.getHours() / 12 * 360 + now.getMinutes() / 60 * 30,
                            minuteDeg = now.getMinutes() / 60 * 360 + now.getSeconds() / 60 * 6,
                            secondDeg = now.getSeconds() / 60 * 360,
                            stylesDeg = [
                                "@-webkit-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
                                "@-webkit-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
                                "@-webkit-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}",
                                "@-moz-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
                                "@-moz-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
                                "@-moz-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}"
                            ].join("");
                        $this.find("#clock-animations").html(stylesDeg);
                    } else if ($clock_module.show == "digital") {

                        $this.html(`
                                    <div class="digital">
                                        <div class="timer"></div>
                                        <div class="date"></div>
                                        <div class="dayWeek"></div>
                                    </div>
                                `);



                        function update() {
                            //'D. MMMM YYYY H:mm:ss'
                            $this.find('.digital .timer').html(moment().format($clock_module.timeFormat));
                            $this.find('.digital .date').html(moment().format($clock_module.dateFormat))
                            $this.find('.digital .dayWeek').html(moment().format('dddd'))
                            //console.log(moment().format('D. MMMM YYYY H:mm:ss'))
                        }

                        setInterval(update, 1000);

                    }

                }//fn_clock_init

                fn_clock_init();

            };// $.fn.md_clock




        var modulePostion = $('.md_clock').parent('section').attr('class').split(' ').filter(s => s.includes('pos-') )[0].split('-')[1];
        var moduleID =     $('.md_clock').parent('section').attr('class').split(' ').filter(s => s.includes('ID_') )[0];

        console.log('.art.'+modulePostion+' .md_clock')
        $('.art.'+modulePostion+' .md_clock').md_clock({id:moduleID});
        
    }(jQuery));