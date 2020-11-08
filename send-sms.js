require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
const client = require('twilio')(accountSid, authToken);

// BASIC OUTBOUND SMS 
// client.messages
//     .create({
//         body: 'Reminder: Water your tomatoes today!',
//         from: '+12058966426',
//         to: '+18015542378'
//     })
//     .then(message => console.log(message.sid));

// TEST OUTBOUND ON TIMER (EVERY MINUTE)
const CronJob = require('cron').CronJob;

function smsReminderInit () {
    const job = new CronJob('*/1 * * * *', function() {
        client.messages
            .create({
                body: `${new Date().getHours()} / ${new Date().getMinutes()} / ${new Date().getSeconds()}`,
                from: '+12058966426',
                to: '+18015542378'
            })
            .then(message => console.log(message.sid));
    });

    job.start();
};

module.exports = smsReminderInit();