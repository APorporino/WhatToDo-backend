// THIS CODE IS NOT BEING USED
// IT IS HERE AS REFERENCE IF I EVER DECIDE TO USE IT AGAIN

const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    from: "anthony.porporino21@gmail.com",
    to: email,
    subject: "Welcome to WhatToDo!",
    text: `Welcome to WhatToDo, ${name}, please click the button below to confirm your email and get started!`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    from: "anthony.porporino21@gmail.com",
    to: email,
    subject: "WhatToDo Cancellation email",
    text: `Sorry to see you go, ${name}, is there anything we could have done to make your experience better?`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
