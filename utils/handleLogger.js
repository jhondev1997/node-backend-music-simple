const {IncomingWebhook} = require ('@slack/webhook')
const slackWebhook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

const loggerStream = {
    write: message =>{
       slackWebhook.send({
          text:message
       });
    },
};

module.exports = {loggerStream};