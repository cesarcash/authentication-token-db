const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const {PORT = 3000} = process.env;
const app = express();

mongoose.connect('mongoose://localhost:27017/authdb')
.then(() => {
    console.log('Connected to mongoDB')
})
.catch((err) => {
    console.log('MongoDB connection error:', err)
})

app.use(express.json());

app.get('/',(req,res) => {
    res.status(200).send('Hola mundo');
})

app.use('/users',userRoutes);

// app.post('/signup', async (req,res) => {

//     try {
        
//         const {email, password} = req.body;
//         if(!email || !password) return res.status(400).send({message: 'Email and Password are required'});
//         const hash = await bcrypt.hash(password,10);
//         const user = await User.create({email, password: hash})

//         res.status(201).send({_id: user._id, email: user.email});

//     }catch(err){
//         res.status(400).send({message: err.message});
//     }

//     // bcrypt.hash(req.body.password,10)
//     // .then((hash) => User.create({
//     //     email: req.body.email,
//     //     password: hash
//     // }))
//     // .then((user) => {
//     //     res.status(201).send({
//     //         _id: user._id,
//     //         email: user.email
//     //     })
//     // })
//     // .catch((erro) => {
//     //     res.status(400).send(erro)
//     // })
// })

// app.post('/signin', async (req,res) => {

//     try {

//         const {email,password} = req.body;
//         const user = await User.findUserByCredentials(email,password);
//         res.status(200).send({message: 'Login!!!'})
        
//     }catch(err){
//         res.status(401).send({message: err.message})
//     }

//     // const {email,password} = req.body;

//     // User.findUserByCredentials(email,password)
//     // .then((user) => {
//     //     res.status(200).send({message: 'logeado'})
//     // })
//     // .catch(err => {
//     //     res.status(400).send({message: err.message})
//     // })

// })

app.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}`);
})