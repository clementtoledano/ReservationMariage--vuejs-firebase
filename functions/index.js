const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const twilio = require("twilio");
const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;

const client = new twilio(accountSid, authToken);

const twilioNumber = "+17743773775"; // your twilio phone number
const myPhoneNumber = "+33651532351"; // your twilio phone number

exports.sendSms = functions.firestore
  .document("confirmation/{createdAt}")
  .onCreate((change, context) => {
    const textMessage = {
      body: `Boom !`,
      to: myPhoneNumber, // Text to this number
      from: twilioNumber, // From a valid Twilio number
    };

    client.messages
      .create(textMessage)
      .then((message) => {
        console.log(message.sid);
      })
      .catch((err) => {
        throw err;
      });
  });
