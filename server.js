const express=require('express');
const mongoose=require('mongoose');
const app=express()
const path=require('path')
const CompanyRouter=require('./routers/CompanyRouter')
const bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded());
app.set('view engine','ejs')
app.use(express.static(__dirname+'/public'))
mongoose.connect(
    'mongodb://localhost:27017/MielCompany',
    {useUnifiedTopology:true, useNewUrlParser:true }
)
app.get('/',function(req,res){
    res.send('please use Company URL')
    
})
app.use('/Company',CompanyRouter)


app.listen(3000,function(err,result){
    if(err){
        console.log('server is warning'+err);
        
    }else{
        console.log('server is running port 3000');
        
    }
})