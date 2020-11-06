require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Reminder: Water your tomatoes today!',
        from: '+12058966426',
        to: '+18015542378'
    })
    .then(message => console.log(message.sid));