import express from 'express';

import prisma from '../script.js';

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
        select:{
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
        }
    })
    res.json(user);
    }
)


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