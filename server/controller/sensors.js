const {sensorData,userData,milesight} = require('../model/dbSelect')
const mongoose = require('mongoose')
const os = require('os')
require('dotenv').config()
const url = require('url')
const axios = require('axios')
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

exports.sensors = (req,res)=>{
    sensorData.find().sort({'Timestamp':-1}).limit(1)
    .exec()
    .then(result=>{
        return res.json({result:result,Server:`${os.hostname}`})
    })
    .catch(err=>{
        return res.json({error:err})
    })
}

exports.users = (req,res)=>{
    userData.find().limit(1)
    .exec()
    .then(result=>{
        return res.json({result:result})
    })
    .catch(err=>{
        return res.json({error:err})
    })
}

exports.findusers = async (req,res)=>{
    const email = req.body.email
    const data = await userData.findOne({email:email})
    if(data){
        console.log("data",data)
        return res.json({result:data})
    }else{
        return res.json({result:"err"})
    }
}

exports.saveSensorsData = (req,res)=>{
    const data = new sensorData({
        Timestamp: req.body.timestamp,
        Temperature: req.body.temperature,
        Humidity: req.body.humidity,
    })
    data.save()
    .then(result=>{
        return res.json(result)
    })
    .catch(err=>{
        return res.json(err)
    })
}

exports.saveUser = (req,res)=>{
    const user = new userData({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
    })
    user.save()
    .then(result=>{
        return res.json(result)
    })
    .catch(err=>{
        return res.json(err)
    })
}

exports.am319 = (req,res)=>{
    milesight.find().sort({'time':-1}).limit(1)
    .exec()
    .then(result=>{
        return res.json({result:result[0].payload})
    })
    .catch(err=>{
        return res.json({error:err})
    })
}

exports.weather = async (req,res)=>{
    const city = req.body.city
    console.log(url.parse(req.url, true).query)
    const params = new URLSearchParams({
        ...url.parse(req.url, true).query,
        [API_KEY_NAME]: API_KEY_VALUE,
      })
    try{
        const response = await axios.get(`${API_BASE_URL}?${params}`)
        const data = response.data
        console.log(data)
        console.log(req.ip)
        res.json(data)
    }catch(error){
        res.json({error:"sdfsd"})
    }
}

exports.weatherSearch = async (req,res)=>{
    const city = req.body.city
    console.log(city)
    const params = new URLSearchParams({
        q:city,
        [API_KEY_NAME]: API_KEY_VALUE,
      })
    try{
        const response = await axios.post(`${API_BASE_URL}?${params}`)
        console.log(`REQUEST: ${API_BASE_URL}?${params}`);
        const data = response.data
        res.json({status:"ok",result:data})
    }catch(error){
        res.json({status:"error",result:"city not found"})
    }
}

