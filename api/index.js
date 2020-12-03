const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.modify',
'https://www.googleapis.com/auth/gmail.compose','https://www.googleapis.com/auth/gmail.send'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
    if(err){
        return console.log('Error loading client secret file:', err);
    }

    // Authorize the client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), getAuth);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if(err){
            return getNewToken(oAuth2Client, callback);
        }
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
        });
    });
}

function getAuth(auth){
  let Check = require('./Check');
  let obj = new Check(auth);

  obj.checkForMails();
}

// function checkForMails(auth){
//   const gmail = google.gmail({version: 'v1', auth});
//   var query = 'subject: your order';

//   gmail.users.messages.list({
//     "userId": 'me',
//     "maxResults": 2,
//     q: query
//   })

//   .then(function(response) {
//     let mails = response.data.messages;
//     mails.forEach(message => console.log("message id:", message.id));
//     mails.forEach(messagetwo => {
//       gmail.users.messages.get({
//         'userId': 'me',
//         'id': messagetwo.id
//         //'id': "175d2831bedd3f8a"
//       })

//       .then(function(responsetwo) {
//         //console.log(responsetwo);
      
//          let body = responsetwo.data.payload.body.data;
//          let htmlbody = base64.decode(body.replace(/-/g, '+').replace(/_/g, '/'));
//          //console.log(htmlbody);
//          let $ = cheerio.load(htmlbody.contents);
//          //console.log($);
//         //let orderNum = $('*:contains("Order")').next().next().text().trim();
//         //let orderNum = $('*:contains("Order")').last();
//         //console.log("Order Number: " + orderNum.text());
//         $('*:contains("Order")').each(function(i,e){
//           console.log($(this).text());
//         });

//       }, function(err){console.log("parse error", err)});

//     });

//   }, function(err) {
//     console.error("execute error", err);
//   });


// }
