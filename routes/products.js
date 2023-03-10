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
    const { userId, productId , name, price, description, image} = req.body;

    const product = await prisma.wishlist.create({
        data: {
            userId,
            productId,
            name,
            price,
            description,
            image
        }
    })

          
    res.json(product);
    }
)



//delete user's product from wishlist
router.delete('/wishlist/:id', async (req, res)=>{
    const product = await prisma.wishlist.deleteMany({
        where: {
            productId: String(req.params.id)
        }
    })
    res.json(product);
    }
) 

//check if product is in wishlist
router.get('/wishlist/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.wishlist.findMany({
        where: {
            productId: String(req.params.id),
        }
    })
    res.json(product);
    }
)

//check if product is in cart
router.get('/cart/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.cart.findMany({
        where: {
            productId: String(req.params.id),
        }
    })
    res.json(product);
    }
)

//get all products in wishlist for a specific user
router.get('/wishlist/user/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.wishlist.findMany({
        where: {
            userId: String(req.params.id)
        }
    })
    res.json(product);
    }
)


//cart routes
//add product to cart
router.post('/cart', async (req, res)=>{
    const { userId, productId , name, price, description, image} = req.body;

    const product = await prisma.cart.create({
        data: {
            userId,
            productId,
            name,
            price,
            description,
            image,
        }
    })

          
    res.json(product);
    }
)

// PUT (update) the quantity of an existing cart item by ID
router.put('/:id/add', async (req, res) => {
    const { id } = req.params;
    try {
      const cartItem = await prisma.cart.findUnique({
        where: { productId: parseInt(id) },
      });
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      const updatedCartItem = await prisma.cartItem.update({
        where: {
            productId: parseInt(id),
        },
        data: { quantity: cartItem.quantity + 1 },
      });
      res.json(updatedCartItem);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update cart item quantity' });
    }
  });
  

//fetch all products in cart for a specific user
router.get('/cart/user/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.cart.findMany({
        where: {
            userId: String(req.params.id)
        }
    })
    res.json(product);
    }
)

//get all pruducts in cart
router.get('/cart', async (req, res)=>{
    const product = await prisma.cart.findMany();
    res.json(product);
    }
)
export default router;