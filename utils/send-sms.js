const fetch = require('node-fetch');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
const client = require('twilio')(accountSid, authToken);

const cron = require('node-cron');

async function smsRemindersInit() {
    // FETCH URL NEEDS TO CHANGE BEFORE IT IS DEPLOYED
    const dailyReminderJob = await cron.schedule('0 10 * * *', function() {
        fetch('http://localhost:3001/api/users/daily-produce', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(dbUserData => {
            dbUserData.forEach(user => {
                client.messages.create({
                    body: `
                        Hello ${user.username}!
                        \nJust a friendly reminder from All Leaf, No Beef...
                        ${user.user_produce
                            .map(({ name, water_amount }) => {
                                return `\nYour ${name} need ${water_amount} of water today.`
                            })
                            .join('')
                        }
                    `,
                    from: '+12058966426',
                    to: `+1${user.phone_number}`
                })
            .then(message => console.log(message.sid));
            });             
        })
        .catch(err => {
            console.log(err);
        });
    });

    // FETCH URL NEEDS TO CHANGE BEFORE IT IS DEPLOYED
    const biWeeklyReminderJob = await cron.schedule('00 10 1-7,15-21,29-31 * 2', function() {
        fetch('http://localhost:3001/api/users/bi-weekly-produce', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(dbUserData => {
            dbUserData.forEach(user => {
                client.messages.create({
                    body: `
                        Hello ${user.username}!
                        \nJust a friendly reminder from All Leaf, No Beef...
                        ${user.user_produce
                            .map(({ name, water_amount }) => {
                                return `\nYour ${name} need ${water_amount} of water today.`
                            })
                            .join('')
                        }
                    `,
                    from: '+12058966426',
                    to: `+1${user.phone_number}`
                })
            .then(message => console.log(message.sid));
            });             
        })
        .catch(err => {
            console.log(err);
        });
    });

    dailyReminderJob.start();
    biWeeklyReminderJob.start();
};

module.exports = smsRemindersInit;