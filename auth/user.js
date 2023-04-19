import express from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../script.js';
// how to generate token after a register using name , email and password using nodejs and prisma
const router = express.Router();

router.post('/register', async (req, res)=>{
    const { firstName, lastName, email, password, phone } = req.body;
    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password,
            phone
        },
    })
   

    //create profile
    const profile = await prisma.profile.create({
        data: {
            bio: '',
            profilePic: '',
            phone: user.phone,
            userId: user.id
    }
})

    const secretKey = process.env.JWT_SECRET;
   const payload = {userId : user.id};
   const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secretKey, options);
    //return the token to be stored in the frontend
    res.json({token});
   //return the token
    console.log(token);
    }
)

//middleware to verify token
export const verifyToken = (req, res, next)=>{
   const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403);
        req.userId = user.userId;
        next();
    }
    )
}



router.post('/login', async (req, res)=>{
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(user?.password === password){
        res.json(user);
    }else{
        res.json({message: 'Wrong credentials'});
    }
}
)

//get all users
router.get('/', async (req, res)=>{
    const users = await prisma.user.findMany();
    res.json(users);
}
)

export default router;