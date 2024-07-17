const line = require('@line/bot-sdk')
const {userData} = require('../model/dbSelect')
require('dotenv').config();
const config = {
    channelAccessToken: process.env.line_token,
    channelSecret:process.env.secrettoken
}
const client = new line.Client(config)

exports.lineWebhook = async(req,res)=>{
    try{
        const events = req.body.events
        console.log(events)
        const reply_token = events[0].replyToken
        const message = req.body.events[0].message.text
        const body = await reply(reply_token, message)
        console.log("tttttt",body)
        const lineEndpoint = 'https://api.line.me/v2/bot/message/reply';
    try {
        const response = fetch(lineEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.line_token,
            },
            body: body
        });
        console.log('LINE API Response:', response);
    } catch (error) {
        console.error('Error:', error);
    }
    }catch(error){
        console.log('Error>>>', error);
    }
}

const handleEvent = async(event) =>{
    console.log(event)
}

async function reply(reply_token, message) {
    let body;
    const response1 = await userData.findOne({fname:message})
    if(response1){
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
                type: 'text',
                text: response1.email
            }]
        })
    }else{
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
                type: 'text',
                text: "not found"
            }]
        })
    }
    console.log("test",body)
    return body;
}

// function reply(reply_token, message) {
//     let body;
//     if(message==="hinano"){
//         body = JSON.stringify({
//             replyToken: reply_token,
//             messages: [{
//                 type: 'text',
//                 text: 'oreapo'
//             },
//             {
//                 type: 'text',
//                 text: 'kamito'
//             }]
//         })
//     }else if(message==="niu"){
//         body = JSON.stringify({
//             replyToken: reply_token,
//             messages: [{
//                 type: 'text',
//                 text: 'asniu'
//             },
//             {
//                 type: 'text',
//                 text: 'astel'
//             }]
//         })
//     }else{
//         body = JSON.stringify({
//             replyToken: reply_token,
//             messages: [{
//                 type: 'text',
//                 text: 'ship not found'
//             }]
//         })
//     }
//     return body;
// }

exports.line_test = async (req, res) => {
    const lineEndpoint = 'https://api.line.me/v2/bot/message/push';

    const payload = {
        to: 'Ud196255204de51fa8e26ab714434fe6d', // Replace with the user's LINE ID
        messages: [
            {
                type: 'text',
                text: 'Hello, this is a test message from your LINE OA!'
            }
        ]
    };

    try {
        const response = await fetch(lineEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.line_token,
                // 'X-Line-Retry-Key': process.env.UUID
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('LINE API Response:', data);
        res.json({ success: true, response: data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
