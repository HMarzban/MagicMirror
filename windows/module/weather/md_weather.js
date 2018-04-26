
(function ( $ ) {

    $.fn.md_weather = function() {
      
        const $this = this;
        const ModuleID = $this.parent().attr('class').split(' ').filter(s => s.includes('ID_'));
        const $weather_module = modul_configList[ModuleID];

        let fn_weather_relaod = function(){
            if($weather_module.worke){
                let i = $weather_module.time || 30;
                let md_weather_relaod = setInterval(function() {
                    i = i - 1;
                    //console.log(i)
                    $this.find('.footer .timer').text(i)
                    if (i <= 0) {
                        // get new data
                        fn_weather_init();
                        clearInterval(md_weather_relaod);
                    }
                },1000);// setInterval
            }//worke or not
        }


        let fn_weather_init = function(){
            //TODO: set spinner for loading
            $.ajax( "http://api.openweathermap.org/data/2.5/weather?q="+$weather_module.city_name+"&units=metric&lang=fa&appid="+$weather_module.api_key )
            .done(function(res) {
            $this.html(`
                <div class="header ${$weather_module.showHeader ? '':'nd_display_hide'} ">
                        <div class="cityName">${$weather_module.cityName}</div>
                        <div class="waDec">${res.weather[0].description}</div>   
                </div>
                <div class="lay_tree">
                    <div class="top"></div><!--top-->
                    <div class="mid">
                        <div class="icon"><i class="wi wi-owm-day-${res.weather[0].id}"></i></div> 
                        <div class="temp"><i class="wi wi-celsius"></i> ${parseInt( res.main.temp )} <i class="wi wi-wind from-${res.wind.deg}-deg"></i> </div>
                    </div><!--mid-->
                    <div class="bot">
                        <div>
                            <div class="sunrise"> <p>  ${ moment.unix(res.sys.sunrise).format("hh:mm ")} </p> <i class="wi wi-sunrise"></i> </div>
                            <div class="sunset"> <p> ${ moment.unix(res.sys.sunset).format("hh:mm ")} </p> <i class="wi wi-sunset"></i> </div>
                        </div>
                        <div>
                            <div class="temp_max">  <i class="wi wi-degrees"></i> ${res.main.temp_max} <i class="wi wi-thermometer"></i>   </div>
                            <div class="temp_min">  <i class="wi wi-degrees"></i> ${res.main.temp_min} <i class="wi wi-thermometer-exterior"></i> </div>  
                        </div>
                        <div>
                            <div class="wind"> 
                                    ${res.wind.speed } <i class="wi wi-wind-beaufort-${ parseInt( res.wind.speed )}"></i>
                            </div>
                            <div class="humidity">  ${res.main.humidity} <i class="wi wi-humidity"></i> </div>
                        </div>
                    </div><!--bot-->
                </div><!--lay_tree-->
                <div class="footer ${$weather_module.worke ? '':'nd_display_hide'}"> <span class="timer ${$weather_module.showTimer ? '':'nd_display_hide'}"></span> <i class="wi wi-refresh"></i> </div><!--footer-->
            `)

                fn_weather_relaod();
            })
            .fail(function() {
                // if faild try load again
                fn_weather_init();
            });
        }// fn_weather_init
        
        //fire firstr time
        fn_weather_init();


    };//

    $('#md_weather').md_weather();
    
}( jQuery ));  





