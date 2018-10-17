const div_one = {
    systemInfo:{
        factory:"LG",
        factory_url:"http://www.google.com",
        frimware:{
            version:"1.0.0",
            url:"http://www.google.com",
            releas:"2012/02/01"
        }
    },
    root:{
        name:"SmartSensore",
        icon:"",
        id:"1$sd@E4d",
        displayName:"LG Home sensore",
        description:"Smart Sensore, sense temp room.",
        in_out:[
            {
                inputType:"text",
                label:"Temperature Sensor:",
                subscribe:"1$sd@E4d/home/room",
            },
            {
                inputType:"text",
                label:"light Sensor:",
                subscribe:"3$sd@E4d/home/outdoor1111",
            }
        ]
    },
    setting:{
        refTime:4000,
        message:"number",
        range:300
    }
    
 };

 const div_two = {
    systemInfo:{
        factory:"Samsung",
        factory_url:"http://www.google.com",
        frimware:{
            version:"1.0.0",
            url:"http://www.google.com",
            releas:"2013/04/11"
        }
    },
     root:{
        name:"SmartSensore",
        icon:"",
        id:"1$sd@Bdd",
        displayName:"Samsung Home Sensore",
        description:"Smart Sensore, sense light of room.",
        in_out:[
            {
                inputType:"text",
                label:"light Sensor:",
                subscribe:"1$sd@Bdd/home/kitchen"
            }
        ]
    },
    setting:{
        refTime:12000,
        message:"number",
        range:100
    }
 };

 const div_three = {
    systemInfo:{
        factory:"Xiaomi",
        factory_url:"http://www.google.com",
        frimware:{
            version:"3.0.0",
            url:"http://www.google.com",
            releas:"2016/04/11"
        }
    },
    root:{
        name:"SmartSensore",
        icon:"",
        id:"1$sd@k32d",
        displayName:"Xiaomi mi Smart Sensore",
        description:"Smart Sensore, sense outdoor light.",
        in_out:[
            {
                inputType:"text",
                label:"light Sensor:",
                subscribe:"1$sd@k32d/home/outdoor"
            }
        ]
     },
     setting:{
         refTime:10000,
         message:"number",
         range:200
     }
    
 }; 


 const div_four = {
    systemInfo:{
        factory:"Ericsson",
        factory_url:"http://www.google.com",
        frimware:{
            version:"3.0.0",
            url:"http://www.google.com",
            releas:"2016/04/11"
        }
    },
     root:{
        name:"SmartSensore",
        icon:"",
        id:"1$sd@3S1d",
        displayName:"Ericsson Smart Sensore",
        description:"Smart Sensore, sense outdoor temp.",
        in_out:[
             {
                 inputType:"text",
                 label:"Temperature Sensor:",
                 subscribe:"1$sd@3S1d/home/gurden"
             }
         ]
     },
     setting:{
         refTime:8000,
         message:"number",
         range:50
     }
    
 };


 
const DevicesList = [
    div_one,
    div_two,
    div_three,
    div_four
]


module.exports ={
    DevicesList,
    device1: div_one,
    device2: div_one,
    device3: div_one,
    device4: div_one
}