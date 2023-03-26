import express from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../script.js';
const router = express.Router();

router.post('/', async (req, res)=>{
    const { bio, profilePic, phone, userId } = req.body;
    const profile = await prisma.profile.create({
        data: {
            bio,
            profilePic,
            phone,
            userId
        },
        select:{
            id: true,
            bio: true,
            profilePic: true,
            phone: true
        }
    })
    res.json(profile);
}
)

//get profile details
router.get('/', async (req, res)=>{
    const profile = await prisma.profile.findMany()
    res.json(profile);
}
)

//get profile details bu user id
router.get('/:id', async (req, res)=>{
    const profile = await prisma.profile.findMany({
        where:{
            userId: String(req.params.id)
        }
    })
    res.json(profile);
}
)

//update profile details
router.put('/:id', async (req, res)=>{
    const { bio, profilePic, phone } = req.body;
    const profile = await prisma.profile.update({
        where:{
            id: String(req.params.id)
        },
        data:{
            bio,
            profilePic,
            phone
        }
    })
    res.json(profile);
}
)

export default router;
