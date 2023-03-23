import express from 'express';
import prisma from '../script.js';

const router = express.Router();

router.post('/', async (req, res)=>{
    const { category, name, description, price, quantity,  sellerId, sellerName, image } = req.body;
    const product = await prisma.product.create({
        data: {
            sellerName,
            category,
            name,
            description,
            price,
            quantity,
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

//get product by id
router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.product.findUnique({
        where: {
            id: String(id)
        }
    })
    res.json(product);
    }
)

//get product for a specific seller
router.get('/seller/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.product.findMany({
        where: {
            sellerId: String(req.params.id)
        }
    })
    res.json(product);
    }
)

//GET A PRODUCT BY CATEGORY
router.get('/category/:category', async (req, res)=>{
    const { category } = req.params;
    const product = await prisma.product.findMany({
        where: {
            category: String(category)
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

// adding quantity to cart
router.put('/cart/:id', async (req, res)=>{
    const { id } = req.params;
    const { quantity } = req.body;
    const product = await prisma.cart.update({
        where: {
           id: String(req.params.id)
        },
        data: {
            quantity
        }
    })
    res.json(product);
    }
)

  

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

//get cart product based on product id
router.get('/cart/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.cart.findMany({
        where: {
            productId: String(req.params.id)
        }
    })
    res.json(product);
    }
)

//delete user's product from cart
router.delete('/cart/:id', async (req, res)=>{
    const product = await prisma.cart.deleteMany({
        where: {
            productId: String(req.params.id)
        }
    })
    res.json(product);
    }
)


//orders routes
//add product to orders
router.post('/orders', async (req, res)=>{
    const { userId, productId , name, price, delivery, image, quantity} = req.body;

    const product = await prisma.orders.create({
        data: {
            userId,
            productId,
            name,
            price,
            image,
            quantity,
            delivery
        }
    })
    res.json(product);
    }
)

//remove product from orders
router.delete('/orders/delete/:id', async (req, res)=>{
    const product = await prisma.orders.deleteMany({
        where: {
            productId: String(req.params.id)
        }
    })
    res.json(product);
    }
)

//get all products in orders for a specific user
router.get('/orders/user/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.orders.findMany({
        where: {
            userId: String(req.params.id)
        }
    })
    res.json(product);
    }
)

//get all products in orders by product id
router.get('/orders/:id', async (req, res)=>{
    const { id } = req.params;
    const product = await prisma.orders.findMany({
        where: {
            productId: String(req.params.id)
        }
    })
    res.json(product);
    }
)

//update product qunatity to 0 after order is placed
router.put('/orders/product/:id', async (req, res)=>{
    const { id } = req.params;
    const { quantity } = req.body;
    const product = await prisma.product.update({
        where: {
           id: String(req.params.id)
        },
        data: {
            quantity
        }
    })
    res.json(product);
    }
)

export default router;