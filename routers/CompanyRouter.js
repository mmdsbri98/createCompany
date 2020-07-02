const mongoose=require('mongoose');
const express=require('express');
const root=express.Router();
const path=require('path')
const Company=require('../models/Company')
root.get('/',function(req,res){
      Company.find({},function(err,Companies){
          if(err) res.status(404).send('gomsho')
          
          
          else res.render(path.join(__dirname,'../views/Companies.ejs'),{Companies})
        })
        
})
root.get('/Update1/:id',function(req,res){
    let name1=req.params.id
    Company.findOne({_id:name1},function(err,company){
        if(err){
            res.status(500).send('gomsho')
        }else{
            res.render(path.join(__dirname,'../views/Update.ejs'),{company})
        }
    })
})
root.get('/CreatCompany1',function(req,res){
    res.render(path.join(__dirname,'../views/CreatCompany.ejs'))
})
root.post('/CreatCompany',function(req,res){
    // Company.find({name:req.body.name},function(err,company) {
    //     if(company) res.status(500).send('name is not valid\n'+err)
    //     else{
    let NEW_COMPANY=new Company({
         name:req.body.name,
         number:req.body.number,
         dateStablish:req.body.dateStablish,
         phone:req.body.phone
      })
    NEW_COMPANY.save(function(err,result) {
         if(err){
             res.json(err);
             
         }else{
             res.redirect('/Company')
             
         }
         
     })
        // }
        
     })
     
// })
root.post('/updateCompany/:id',function(req,res){
    
    
    let id=req.params.id
  
    
    Company.findOneAndUpdate({_id:id},{$set:{name:req.body.name,phone:req.body.phone,dateStablish:req.body.dateStablish,number:req.body.number}},{new:true},function(err,com){
        if(err){
            res.send(err)
        }else{
            res.redirect('/Company')
        }

    })
})

root.get('/deleteCompany/:nameCompany',function(req,res) {
    let nameCompany=req.params.nameCompany;
    Company.findOneAndRemove({name:nameCompany},function(err) {
        if(err){
            res.send('ridi')
        }else{
            res.redirect('/Company')
        }
        
    })
    
})
root.get('/Read/:nameCompany',function(req,res){
    let nameCompany=req.params.nameCompany;
    Company.findOne({name:nameCompany},function(err,result){
        if(err){
            res.send('error')
        }else{
            res.render(path.join(__dirname,'../views/Read.ejs'),{result})
        }
    })

})
root.post('/search',async function(req,res){
    let com=await Company.find({dateStablish:{$lt:req.body.date2 ,$gt:req.body.date1}});

    console.log(req.body.date1);
    console.log(req.body.date2);
    
    
    
    res.render(path.join(__dirname,'../views/search.ejs'),{com})
})


module.exports=root;