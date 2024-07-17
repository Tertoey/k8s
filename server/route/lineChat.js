const express = require('express')
const router = express.Router()
const lineBot = require('../controller/line')
const line = require('@line/bot-sdk')
require('dotenv').config();

const config = {
    channelAccessToken: process.env.token,
    channelSecret: process.env.secrettoken
}

router.post('/webhook',line.middleware(config),lineBot.lineWebhook)


module.exports = router