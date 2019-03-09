//console.log("Clientnt.js");
class Main{
    constructor(){
        this.blockchain = null;
    }
    run(){
        let driving = false;
        let odometer = 0;
        $('#start-driving').click(()=>{
            driving = true;
        });

        $('#stop-driving').click(()=>{
            driving = false;
        });

        setInterval(()=>{ //increase odometer every 100ms
            if(!driving)
                return;
            odometer++;
            $('#odometer').val(odometer);
        }, 100);

        setInterval(()=>{ //Upload odometer reading to
            //BLockchain
        }, 10000);
    }
}


var main = new Main();
main.run();


