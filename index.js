const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const Product=require('./models/product');
const { urlencoded } = require('express');
const methodOverride=require('method-override');


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
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.get('/dog',(req,res)=>{
    res.send("woof");
})
app.use(methodOverride('_method'));
app.use(urlencoded({extended:true}));
app.get('/products',async (req,res)=>{
 const  product=await  Product.find({})

    res.render('products/index',{product})
})
app.get('/products/new',(req,res)=>{
    res.render('products/new');
})
app.post('/products',async (req,res)=>{
    // console.log(req.body)
   const newProduct= new Product(req.body);
   await newProduct.save()
   console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
})


app.get('/products/:id',async(req,res)=>{
    const{id}=req.params;
    const pro=await Product.findById(id);
    res.render('products/show',{pro});
    
})


app.get('/products/:id/edit',async (req,res)=>{
    const{id}=req.params;
    const product=await Product.findById(id);
    res.render('products/edit',{product});
})
app.put('/products/:id',async(req,res)=>{
    const {id}=req.params;
   const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    console.log(req.body);
res.redirect(`/products/${product._id}`);

})

app.listen('3000' ,()=>{
    console.log("app is listening on port 3000");

})