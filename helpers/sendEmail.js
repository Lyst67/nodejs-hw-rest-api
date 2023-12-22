const ElasticEmail = require("@elasticemail/elasticemail-client");
require("dotenv").config();
const { ELASTIC_API_KEY, EMAIL_FROM } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;
const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_API_KEY;
const emailsApi = new ElasticEmail.EmailsApi();

function sendEmail({ to, subject, html }) {
  const emailData = {
    Recipients: [{ Email: to }],
    Content: {
      Body: [
        {
          ContentType: "HTML",
          Content: html,
        },
      ],
      From: EMAIL_FROM,
      Subject: subject,
    },
  };
  const callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully.");
    }
  };
  emailsApi.emailsPost(emailData, callback);
}

module.exports = sendEmail;
