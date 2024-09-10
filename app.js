const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const User = require('./models/User');

// The defined API routes for all CRUD operation

app.get('/', (req, res) => {
    res.send(`
      <h1>Hello, World!</h1>
      <p>Swagger Docs available at <a href="http://localhost:${port}/api-docs">http://localhost:${port}/api-docs</a></p>
    `);
});

// GET all the users
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
app.get('/users', async (req, res)=> {
    try {
        const users = await User.find();
        res.json(users);
        
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// GET a user by id
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: User not found
 */
app.get('/users/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);  // Added 'await'
      if(!user){
         return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
         res.status(500).send('Server Error');
    }
 });
 

// POST create a new user
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created new user
 */
app.post('/users', async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
  
    try {
        const newUser = new User({ name });
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send('Server Error');
    }
  });
  

// PUT update a user
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user's name
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: User not found
 */
app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name;  // Update the user's name
        await user.save();  // Save the changes
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


// DELETE delete a user
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.deleteOne({ _id: req.params.id });  // Corrected method to delete the user
        res.status(202).send('User deleted');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
})