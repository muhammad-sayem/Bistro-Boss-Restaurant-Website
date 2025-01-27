const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

// Middlewares //
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.crzce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const userCollection = client.db("bistroDB").collection('users');
        const menuCollection = client.db("bistroDB").collection('menu');
        const reviewCollection = client.db("bistroDB").collection('reviews');
        const cartCollection = client.db("bistroDB").collection('carts');
        const paymentCollection = client.db("bistroDB").collection('payments');

        // JWT token create //
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.send({ token });
        });

        // Middlewares //
        const verifyToken = (req, res, next) => {
            // console.log("Inside verify token", req.headers.authorization);
            if (!req.headers.authorization) {
                res.status(401).send({ message: "unauthorized Access!!" });
            }
            const token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: "unauthorized Access!!" });
                }
                req.decoded = decoded;
                next();
            })
        }

        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const isAdmin = user?.role === 'admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'firbidden access!!' })
            }
            next();
        }

        // Add a new user to userCollection //    
        app.post('/users', async (req, res) => {
            const user = req.body;

            // Check if this email already exists or not // 
            const query = { email: user.email };
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'User already exists!!' });
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        // Get all users from userCollection //
        app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        });

        // Verify the user admin or not //
        app.get('/users/admin/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: "unauthorized access!!" });
            }
            const query = { email: email }
            const user = await userCollection.findOne(query);
            let admin = false;
            if (user) {
                admin = user?.role === 'admin';
            }
            res.send({ admin });
        })

        // Delete a user from userCollection //
        app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });

        // Make Admin API //
        app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    role: "Admin",
                }
            };
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // Get all from menuCollection //
        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        });

        // Get a specific item from the menuCollection //
        app.get('/menu/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id };
            const result = await menuCollection.findOne(query);
            res.send(result);
        });

        // Add a new item to the menuCollection //
        app.post('/menu', verifyToken, verifyAdmin, async (req, res) => {
            const menuItem = req.body;
            const result = await menuCollection.insertOne(menuItem);
            res.send(result);
        });

        // Update an item from menuCollection //
        app.patch('/menu/:id', async (req, res) => {
            const item = req.body;
            const id = req.params.id;
            const filter = { _id: id };
            const updatedDoc = {
                $set: {
                    name: item.name,
                    category: item.categroy,
                    price: item.price,
                    recipe: item.recipe,
                    image: item.image
                }
            }

            const result = await menuCollection.updateOne(filter, updatedDoc);
            res.send(result);

        })


        // Delete an item from the menuCollection //
        app.delete('/menu/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await menuCollection.deleteOne(query);
            res.send(result);
        })

        // Get all form reviewCollection //
        app.get('/reviews', async (req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result);
        });

        // Add an item to cartCollection //
        app.post('/carts', async (req, res) => {
            const cartItem = req.body;
            const result = await cartCollection.insertOne(cartItem);
            res.send(result);
        });

        // Get All items from the cartCollection (also with email query) //
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            const query = { email, email }
            const result = await cartCollection.find(query).toArray();
            res.send(result);
        });

        // Delete a specific item from the cart //
        app.delete('/carts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        });

        // Create payment intent //
        app.post('/create-payment-intent', async (req, res) => {
            const { totalPrice } = req.body;
            const amount = parseInt(totalPrice * 100);

            console.log("Amount inside payment intent", amount);

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret
            })
        });

        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const paymentResult = await paymentCollection.insertOne(payment);

            // Carefully delete each item from the cart //
            console.log("Payment Info", payment);
            const query = {
                _id: {
                    $in: payment.cartId.map(id => new ObjectId(id))
                }
            };
            const deleteResult = await cartCollection.deleteMany(query);
            res.send({paymentResult, deleteResult});
        });

        app.get('/payments/:email', verifyToken, async(req, res) => {
            const email = req.params.email;
            const query = {email: email};
            if(email !== req.decoded.email){
                return res.status(403).send({message: 'Forbidden Access!!'})
            }
            const result = await paymentCollection.find(query).toArray();
            res.send(result);
        });

        // Stats and Analytics //
        app.get('/admin-stats', verifyToken, verifyAdmin, async(req, res) => {
            const users = await userCollection.estimatedDocumentCount();
            const menuItems = await menuCollection.estimatedDocumentCount();
            const orders = await paymentCollection.estimatedDocumentCount();

            // Calculate revenue (This is not the best way) //
            // const payments = await paymentCollection.find().toArray();
            // const revenue = payments.reduce((total, payment) => total + payment.price, 0)
            
            // Calculate revenue (This is the best way) //
            const result = await paymentCollection.aggregate([
                {
                    $group:{
                        _id: null,
                        totalRevenue: {
                            $sum: "$price"
                        }
                    }
                }
            ]).toArray();

            const revenue = result.length > 0 ? result[0].totalRevenue : 0;

            res.send({
                users,
                menuItems,
                orders,
                revenue
            })
        });

        // Using Aggregate Pipeline //
        app.get('/order-stats', verifyToken, verifyAdmin, async(req, res) => {
            const result = await paymentCollection.aggregate([
                {
                    $unwind: '$menuItemId'
                },
                {
                    $lookup: {
                        from: 'menu',
                        localField: 'menuItemId',
                        foreignField: '_id',
                        as: 'menuItems'
                    }
                },
                {
                    $unwind: '$menuItems'
                },
                {
                    $group: {
                        _id: "$menuItems.category",
                        quantity: {$sum: 1},
                        revenue: {$sum: '$menuItems.price'}
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: '$_id',
                        quantity: '$quantity',
                        revenue: '$revenue'
                    }
                }

            ]).toArray();

            res.send(result);
        })


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }

    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Bistro Boss Restaurant.......")
});

app.listen(port, () => {
    console.log(`Bistro Boss Restaurant server is running on port${port}`);
})