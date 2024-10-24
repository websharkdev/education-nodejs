const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')

const Product = require('./models/product')
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        req.user = user
        next();
    }).catch(e => console.log(e)) 
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
    constraints:true,
    onDelete: 'CASCADE'
})

User.hasMany(Product)


sequelize.sync().then((res) => {
    return User.findByPk(1)})
    .then((user) => {
        if(!user) {
            return User.create({
              name: "Alex",
              surname: "Bortnytskyi",
              email: "example@email.com",
              photo:
                "https://plus.unsplash.com/premium_photo-1729708654660-8c14ff5e408c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            });
        }
        return user
    })
    .then((result) => app.listen(3001))
    
    
    .catch(e => console.log(e))
