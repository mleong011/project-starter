const {google} = require('googleapis');
var base64 = require('js-base64').Base64;
const cheerio = require('cheerio');
var open = require('open');


class Check{

    //auth is the constructor parameter.
    constructor(auth){
        this.me = "102201229648850837598";
        this.gmail = google.gmail({version: 'v1', auth});
        this.auth = auth;
    }

    //Returns the mails in the user's inbox.
    checkInbox(){
        this.gmail.users.messages.list({
            userId: this.me
        }, (err, res) => {
            if(!err){
                console.log(res.data);
            }
            else{
                console.log("error check inbox: " +err);
            }
        })
    }

     //THis function checks for mails sent by medium.
    //We attatch a query parameter to the request body.
    checkForMails(){
        var query = 'subject: your order';
        this.gmail.users.messages.list({
            userId: this.me,
            maxResults: 10,
            q: query 
        }, (err, res) => { 
            if(!err){

                //mail array stores the mails.
                let mails = res.data.messages;

                //We call the getMail function passing the id of first mail as parameter.
                //  this.getMail('175d27ed2510289b');
                console.log(mails[2].id);
                mails.forEach(message => {
                    // console.log(message.id);
                    this.getMail(message.id);
                });
            }
            else{
                console.log("error 1 : " + err);
            }
        });        
    }

    //getMail function retrieves the mail body and parses it for useful content.
    //In our case it will parse for all the links in the mail.
    getMail(msgId){
        
        //This api call will fetch the mailbody.
        this.gmail.users.messages.get({
            'userId': this.me,
            'id': msgId
        })
        .then(function(res) {
            if(res.data.payload.parts != undefined && res.data.payload.parts[0].body.data != ""){
            var body = res.data.payload.parts[0].body.data;
            var htmlBody = base64.decode(body.replace(/-/g, '+').replace(/_/g, '/'));

            //console.log(htmlBody);
                const $ = cheerio.load(htmlBody.toLowerCase());
                let orderNum = $('*:contains("order #"), *:contains("order number"), *:contains("ordernumber")').last();
                console.log("Order Number 1: " + orderNum.text());
                //console.log(msgId);
            }else if(res.data.payload.parts != undefined && res.data.payload.parts[1].body.data){
                var bodyt = res.data.payload.parts[1].body.data;
                var htmlBodyt = base64.decode(bodyt.replace(/-/g, '+').replace(/_/g, '/'));

                //console.log(htmlBodyt);
                const $ = cheerio.load(htmlBodyt.toLowerCase());
                let orderNum = $('*:contains("order #"), *:contains("order number"), *:contains("ordernumber")').last();
                console.log("Order Number 2: " + orderNum.text());
                //console.log(msgId);
            }
            else{

                // let body_content = JSON.stringify(res.data.payload.body.data);
                // let data, buff, text;
                // data = body_content;
                // buff = new Buffer.from(data, "base64");
                // let mailBody = buff.toString();
                // // display the result
                //  console.log(mailBody);
                 var bodyy = res.data.payload.body.data;
                 var htmlBodyy = base64.decode(bodyy.replace(/-/g, '+').replace(/_/g, '/'));

                //console.log(htmlBodyy.toLowerCase());
                const $ = cheerio.load(htmlBodyy.toLowerCase());
                let orderNum = $('*:contains("order #"), *:contains("order number"), *:contains("ordernumber")').last();
                //let re = /\d+/;
                //let texts = orderNum.nextUntil(/\d+/);

                console.log("Order Number 3: " + orderNum.text());
                //console.log(msgId);
                
            
            }
        })
        .catch(function(err) {
            console.log("Error 2 :" + err);
        });
    }




}
module.exports = Check;