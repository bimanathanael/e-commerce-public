require("dotenv").config();

const api_key = process.env.MAILGUN;
const domain = 'sandbox9edb2bbb952449c4a00e861cd24282f9.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function doMail (data) {
  let email = {
    from: 'admin@e-Commerce.com',
    to: 'bimanathanael95@gmail.com',
    subject: data.title,
    text: data.body
  };
  console.log(email, "email ini")
   
  return mailgun.messages().send(email, function (error, body) {
    console.log(body);
  });
}

module.exports = doMail
