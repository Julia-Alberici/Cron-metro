 
            (function(){
                
                var $cronometro = document.querySelector('#cronometro');
                var $iniciar = document.querySelector('#iniciar');
                var $pausar = document.querySelector('#pausar');
                var $parar = document.querySelector('#parar');
                
                $iniciar.addEventListener('click', play);
                $pausar.addEventListener('click', pause);
                $parar.addEventListener('click', stop);

                var msClickInit = 0;
                var msClickPause = 0;
                var msNewInit = 0;
                var counting = 0;
                var running = false;
                $cronometro.value = 0+':'+0+':'+0;
                function play(){
                    if(running){
                        return;
                    };
                    stop();
                    msClickInit = Date.now();
                    runPlay()
                }    


                function runPlay(ms){
                        running = true;
                        newInit = ms || 0;
                        counting = setInterval(function(){
                        var msNow = Date.now();
                        var timePassed = msNow - msClickInit;
                        $cronometro.value = timeFormat(timePassed + newInit);
                    }, 100);
                };

                function timeFormat(ms){
                    const MINUTO = 60000;

                    var s = parseInt(ms / 1000);
                    var c = ms - (s * 1000);
                    var m = parseInt(ms / MINUTO);

                    if(s > 59){
                        s = parseInt( s - m * 60);
                    }
                    return m +':' +s + ':' + c;
                }
                
                function pause(){
                    if($cronometro.value == 0+':'+0+':'+0){
                        return;
                    }
                    if(running){
                        running = false;
                        clearInterval(counting);
                        msClickPause = Date.now();
                        msNewInit += (msClickPause - msClickInit);
                    }else{
                        running = true;
                        msClickInit = Date.now();
                        runPlay(msNewInit)
                    }
                };


                function stop(){
                    msClickInit = 0;
                    msClickPause = 0;
                    msNewInit = 0;
                    running = false;
                    clearInterval(counting);
                    $cronometro.value = 0+':'+0+':'+0;
                }
            })()
            
    