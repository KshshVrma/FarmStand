const mongoose=require('mongoose');
const Product=require('./models/product');
mongoose.connect('mongodb://localhost:27017/farmStand',{
useNewUrlParser:true,useUnifiedTopology:true
}).then(
    ()=>{
        console.log("connection open")
    }
).catch(e=>{
    console.log("oh no error!!")
    console.log(e)
})
// const p=new Product({
//     name:'grapefruit',
//     price:2,
//     category:'fruit'
// })
// p.save().then(p=>{
//     console.log(p)
// }).catch(e=>{
//     console.log(e)
// })
const seedProducts=[{
    name:'fairy eggplant',
    price:3,
    category:'dairy'
},
{
    name:'Organic',
    price:5,
    category:'fruit'
}

]
Product.insertMany(seedProducts).then(res=>{
    console.log(res)
}).catch(e=>{
    console.log(e)
})