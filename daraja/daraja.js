import express from 'express';
import axios from 'axios';
const router = express.Router();



//middleware function to generate access token
var token;
const generateToken = async (req, res, next) => {
    const secretKey ='fC7ZAezPOuDTINAM'
    const consumerKey = 'UbyuVPqNRjAoELu3AnQybvSIXafPckqt'
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

router.post('/', (req, res) => {
    const phone = req.body.phone;
    const amount = req.body.amount;
  
    console.log(`Received transaction request: phone=${phone}, amount=${amount}`);
  
    })


router.post('/stk',   async (req, res)=>{
    const phone = req.body;
   

    console.log(phone);

    

    
} )



export default router;
