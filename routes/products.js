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

//get product for a specific seller
router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.product.findMany({
        where: {
            sellerId: String(req.params.id)
        }
    })
    res.json(product);
    }
)

//specific seller can delete a product
router.delete('/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.product.delete({
        where: {
            id: String(id)
        }
    })
    res.json(product);
    }
)

//adding a product to wishlist
router.post('/wishlist', async (req, res)=>{
    const { userId, productId } = req.body;

    const product = await prisma.wishlist.create({
        data: {
            userId,
            productId
        }
    })
   
        
    res.json(product);
    }
)

//delete user's product from wishlist
router.delete('/wishlist/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.wishlist.delete({
        where: {
            productId: 'f24d5a9a-d662-4d8d-b540-3415c393fb15'
        }
    })
    res.json(product);
    }
) 
//get all products in wishlist for a specific user
router.get('/wishlist/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.wishlist.findMany({
        where: {
            userId: String(req.params.id)
        }
    })
    res.json(product);
    }
)

//get wishlist based on product id
router.get('/wishlist/product/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.wishlist.findMany({
        where: {
            productId: String(req.params.id)
        }
    })
    res.json(product);
    }
)



export default router;