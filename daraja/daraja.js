import express from 'express';
import axios from 'axios';
const router = express.Router();


//middleware function to generate access token
var token;

const generateToken = async (req, res, next) => {
    const secretKey =process.env.SECRET_KEY
    const consumerKey = process.env.CONSUMER_KEY
    const auth = new Buffer.from(consumerKey + ':' + secretKey).toString('base64');
    await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
        headers: {
            Authorization: 'Basic ' + auth
            }
    })
    .then((response) => {
        console.log(`Bearer ${response.data.access_token}`)
         token = `${response.data.access_token}`;
        next();
    })
    .catch((error) => {
        console.log(error);
    })

}

router.post('/', generateToken,  async (req, res) => {
    const phone = req.body.phone.replace(/^0+/, '');
    const amount = req.body.amount;

    const date = new Date()
    const timestamp= 
    date.getFullYear().toString() +
    ("0" + (date.getMonth() +1 )).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2)

    const shortcode = '174379'
    const passkey ='bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
    const password = new Buffer.from(shortcode + passkey + timestamp).toString('base64')

    if (!phone || !amount) {
      return res.status(400).send('Phone and amount are required');
    }
  
    await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        {    
            BusinessShortCode: shortcode, 
            Password: password,    
          Timestamp: timestamp,    
          TransactionType: "CustomerPayBillOnline",    
            Amount: amount,    
           PartyA:`254${phone}`,    
            PartyB:shortcode,    
          PhoneNumber:`254${phone}`,    
          CallBackURL:"https://odd-slip-ant.cyclic.app/daraja/callback",    
          AccountReference:`254${phone}`,    
          TransactionDesc:"Test"
         },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }       
    )

    .then((response) => {
        console.log(response.data)
        res.send(response.data)
    })
    .catch((error) => {
        console.log(error)

    })

 
  }
    
)


router.post('/callback', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

router.get('/callback', (req, res) => {
    console.log(req.body)
    res.send('req.body')
})







export default router;
