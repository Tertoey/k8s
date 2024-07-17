const mongoose = require('mongoose');

// Mongo atlas
const am319 = new mongoose.Schema({
  dr: {
    bandwidth: Number,
    modulation: String,
    spreadFactor: Number,
  },
    adr: Boolean,
    freq: Number,
    snr: Number,
    rssi: Number,
    time: String,
    fcnt: Number,
    fport: Number,
    deveui: String,
    payload: {
      Timestamp: String,
      temperature: Number,
      humidity: Number,
      pir: String,
      light_level: Number,
      co2: Number,
      tvoc: Number,
      pressure: Number,
      pm2_5: Number,
      pm10: Number,
      o3: Number,
    },
    object: String,
    _msgid: String,
    buffer: { type: Buffer, contentType: String } // Binary data
});

// Mongo local
const rawData = new mongoose.Schema({
    Timestamp:{type:Date},
    Temperature:{type:String},
    Humidity:{type:String},
  });

// const user = new mongoose.Schema({
//     fname :{type:String},
//     lname : {type:String},
//     email : {type:String,require:true,unique:true}
// })

const user = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email:{type:String, 
      require:true,
      unique: true,
      index:true
      // ,match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ // use validator instead
  },
  password:{type:String, require:true},
  fname:{type:String, require:true},
  lname:{type:String, require:true},
  // createdAt:{type:String, default:createdAt},
  // updatedAt:{type:String,default:createdAt},
  // lastLoginAt:{type:String},
  isVerified:{type:Boolean,default:true},
},
  {
      timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
)

const milesight = mongoose.model('am319',am319)
const sensorData = mongoose.model('rawData', rawData);
const userData = mongoose.model('user',user)

module.exports = {
    sensorData, 
    userData,
    milesight
}

////////////// or

// module.exports = {
//     AM319Model: am319Data , 
//     UserModel:  userData  
// }