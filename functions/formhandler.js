'use strict';
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  try {
    const payload = JSON.parse(event.body);
    const timestamp = new Date().toLocaleString();
    // Expect firstname, lastname, phone, email
    let isOk = (Object.keys(payload).length>=4);
    const msg = mailer(process.env.MAIL_USER, process.env.MAIL_USER_NAME);
    if (msg) {
      payload.submitdate = timestamp;
      const item = msg(process.env.MAIL_USER, 'Contact Added', JSON.stringify(payload), true);
      try {
        const result = await item.send();
        if (result) console.log('Email sent with success!', result);
        else isOk = false;
      } catch (err) {
        console.error(err);
        isOk = false;
      }
    } else isOk = false;

    return {
      statusCode: (isOk ? 200 : 400),
      body: JSON.stringify({
        message: `Submit info (${isOk?'Pass':'Fail'}) at ${timestamp}`,
        success: isOk
      })
    };
  } catch (err) {
    return {
      statusCode: (err ? (err.status||500) : 400),
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        message: err.message,
        code: err.code,
        status: err.status
      })
    };
  }
};

function mailer(senderAddress, senderLabel) {
  const SENDER = (senderLabel ? `${senderLabel} ${senderAddress}`: senderAddress);
  const TRANSPORTER = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_AUTH
    }
  });

  function message(recipient, topic, content, usePlain) {
    const receivers = (Array.isArray(recipient) ? recipient.join(',') : recipient);
    const core = {from: SENDER, to: receivers, subject: topic};
    if (usePlain) core.text = content;
    else          core.html = content;

    function attachPath(name, fullpath) {
      if (core.attachments) core.attachments.push({filename: name, path: fullpath});
      else core.attachments = [{filename: name, path: fullpath}];
      return this;
    }
    function attach(name, data) {
      if (core.attachments) core.attachments.push({filename: name, content: data});
      else core.attachments = [{filename: name, content: data}];
      return this;
    }
    async function send() { return (await TRANSPORTER.sendMail(core)); }
    function toString() { return `Message from ${senderAddress} to ${receivers} about ${topic}, attachments? ${core.attachments?core.attachments.length:'none'}` }
    return {send, attach, attachPath, toString};
  }
  return message;
};
