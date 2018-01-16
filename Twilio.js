const accountSid = ''
const authToken = ''
const numberSID = ''
const number = '+5555555555'
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

const http = require('http');
const url = require('url');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4001;
var responseString = ""

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get('/update',(req,res,next)=> {
			res.set({'Access-Control-Allow-Origin': "*"})
			if (responseString) {
				res.send({Message: responseString})
			} else {
				res.send({Message: null})
			}
})

app.get('/response',(req,res,next)=> {
	responseString = req.query.Body
})

app.get('/',(req,res,next)=> {
	let message = req.query.message
	if(message) {
		client.messages.create({
 	   body: message,
	    to: '',  // Text this number
	    from: number // From a valid Twilio numberSID
		})
		.then((message) => {
			message = message.body.replace('Sent from your Twilio trial account - ','')
			res.set({'Access-Control-Allow-Origin': '*'})
			res.send({Message: message})
		});
	}
})

