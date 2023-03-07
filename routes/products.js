import express from 'express';

import prisma from '../script.js';

const router = express.Router();

router.post('/', async (req, res)=>{
    const { category, name, description, price, sellerId, image } = req.body;
    const product = await prisma.product.create({
        data: {
            category,
            name,
            description,
            price,
            sellerId,
            image
        }
    })
    res.json(product);
    }
)

//get all products using error handling
router.get('/', async (req, res)=>{
        try{
            const products = await prisma.product.findMany();
            res.json(products);
        }catch(err){
            res.json({message: err.message});
        }
    }
)


export default router;