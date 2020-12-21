const port = process.env.PORT || 5050;

const mongoose = require('mongoose')
const { mongoUrl } = require('./mongodb/keys/keys')
const Product = require('./mongodb/collection/products')
const jwt = require('jsonwebtoken')
const secretkey = "!@#$%"
const User = require('./mongodb/collection/user')
const Order = require('./mongodb/collection/order')

mongoose.connect(mongoUrl, {
   useNewUrlParser: false,
   useUnifiedTopology: true,
   useFindAndModify: true,
   useCreateIndex: true
})

module.exports = (app) => {
   app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
   });
   app.post('/addproduct', (req, res) => {

      try {
         const prod = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            img: req.body.img,
            quantity: req.body.quantity,
            author: req.body.author,
         })
         prod.save();
         res.send({ msg: "success" })
      }
      catch (err) {
         res.send({ msg: 'error while saving' })
      }

   })
   app.get('/books', (req, res) => {
      Product.find({}).then((resp) => {
         res.send(resp)
      })

   })
   app.post('/login', (req, res) => {
      try {
         User.find({ email: req.body.email }).then((resp) => {
            if (resp.len === 0) {
               res.send({ msg: 'incorrect username' })
            }
            else {
               if (resp[0].password === req.body.password) {
                  const data = {
                     name: resp[0].name,
                     email: resp[0].email,
                     admin: resp[0].admin
                  }
                  jwt.sign(req.body, secretkey, (err, token) => {
                     if (token) {

                        res.send({ msg: 'success', token: token, data: data, admin: data.admin })
                     }
                     else {
                        res.send({ msg: 'error' })
                     }
                  })

               }
               else {
                  res.send({ msg: 'incorrect password' })
               }

            }
         })
      }
      catch (err) {
         res.send({ msg: 'error' })
      }
   })
   app.post('/signup', (req, res) => {
      try {
         const usr = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            admin: false
         })
         usr.save()
         res.send({ msg: 'success', data: req.body })
      }
      catch (err) {
         res.send({ msg: 'error' })
      }
   })
   app.post('/book', (req, res) => {
      Product.find({ _id: req.body.id }).then((data) => {
         res.send(data)
      })
   })
   app.post('/orders', (req, res) => {
      try {
         const odr = new Order({
            bookId: req.body.id,
            bookName: req.body.bookName,
            price: req.body.price,
            buyer: req.body.buyer,
            dop: req.body.dop,
         })
         odr.save()
         res.send({ msg: 'sucess' })
      }
      catch (err) {
         res.send({ msg: 'error' })
      }
   })
   app.post('/token', (req, res) => {
      jwt.verify(req.body.token, secretkey, (err, decoded) => {
         if (err) {
            res.send({ msg: 'error' })
         }
         else {
            User.find({ email: decoded.email }).then((results) => {
               if (results) {
                  if (results[0].password === decoded.password) {
                     res.send({ msg: 'sucess', data: results[0] })
                  }
                  else {
                     res.send({ msg: 'wrong password  ' })
                  }
               }
               else {
                  res.send({ msg: 'pass err' })
               }
            })
         }
      })

   })
   app.get('/adminPanel', (req, res) => {
      Order.find({}).then((results) => {
         res.send(results)
      })
   })
   app.listen(port, () => {
      console.log(`server is running at port =>${port}`)
   })
}