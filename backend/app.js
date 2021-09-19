require('dotenv').config()
const express= require("express");
const app= express();
const axios= require("axios");
const {google} = require('googleapis');
const bodyParser = require("body-parser");
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const cors = require('cors');

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());

async function authorize(flag=1,code=NULL) {
  client_id = process.env.CLIENT_ID;
    client_secret = process.env.CLIENT_SECRET;
    redirect_uris = [process.env.REDIRECT_URIS];
  
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  return flag?await getAuthUrl(oAuth2Client):await getAccessToken(oAuth2Client,code) ;
}

async function getAuthUrl(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl;
}

async function getAccessToken(oAuth2Client,code){
  const {tokens} = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
}

function addEvents(auth, newEvent) {
  const calendar = google.calendar({version: 'v3', auth});

  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    q:newEvent.summary
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (!events.length) {
        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: newEvent
          }, function(err, event) {
            if (err) {
              console.log('There was an error contacting the Calendar service: ' + err);
              return;
            }
            console.log('Event created: %s', event.htmlLink);
          });
    } else {
      console.log('Event already exists');
    }
  });
  
}


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    month_raw=a.getMonth()+1
    var month = ("0" + month_raw).slice(-2);
    var date = ("0" + a.getDate()).slice(-2);
    var hour = ("0" + a.getHours()).slice(-2);
    var min = ("0" + a.getMinutes()).slice(-2);
    var sec = ("0" + a.getSeconds()).slice(-2)
    var time =   year + '-' + month + '-' +date + 'T' + hour + ':' + min + ':' + sec + '+05:30';
    return time;
  }

app.post("/createEvents",async(req,res) => {
    const contests_list = await axios.get("https://codeforces.com/api/contest.list");
    let contests=contests_list.data.result;

    client_id = process.env.CLIENT_ID;
    client_secret = process.env.CLIENT_SECRET;
    redirect_uris = [process.env.REDIRECT_URIS];
    
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    oAuth2Client.setCredentials(req.body);

    contests.map( (event,i) => {
        setTimeout(function(){
            if(event.relativeTimeSeconds < 0){
                const newEvent = {
                    'summary': event.name,
                    'start': {
                      'dateTime': timeConverter(event.startTimeSeconds),
                    },
                    'end': {
                      'dateTime': timeConverter(event.startTimeSeconds+event.durationSeconds),
                    },
                    'reminders': {
                      'useDefault': false,
                      'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10},
                      ],
                    }
                  };
                  addEvents(oAuth2Client,newEvent);
                }
            },1000*i); 
    })

    contests = contests.filter((event) => {
      return event.relativeTimeSeconds < 0;
    })
    res.status(200).json(contests);
});

app.get("/auth",async (req,res) => {
  const authUrl= await authorize(1,0);
  res.redirect(authUrl);
})

app.get("/", (req,res) => {
  res.render("home",{code:req.query.code});
})

app.post("/getToken",async(req,res) => {
  const token = await authorize(0,req.body.tokencode).catch(err => console.log(err));
  if(token===undefined)
    res.status(400).send("Authorization not complete");
  res.status(200).json(token);
});

const PORT = 8080 || process.env.PORT;

app.listen(PORT,(req,res)=>{
    console.log("Server started at port:"+PORT);
});