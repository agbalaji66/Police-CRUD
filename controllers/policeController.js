const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const police = mongoose.model('police');
router.get('/', (req, res) => {
    //res.json('sample text');
    res.render("police/addOrEdit", {
     viewTitle: "Insert New Reocrd"
    });
});

router.post('/', (req, res) => {
    if(req.body._id=="")
    insertRecord(req,res);
    else
    updateRecord(req,res);
});

function insertRecord(req,res){
    var Police= new police();
    Police.fullName= req.body.fullName;
    Police.chrime=req.body.chrime;
    Police.station=req.body.station;
    Police.city=req.body.city;
    Police.save((err, doc)=>{
        if(!err)
        res.redirect('police/list');
        else{console.log('Error'+err);}
    });

}

function updateRecord(req, res) {
    police.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('police/list'); }

            
            else
                console.log('Error during record update : ' + err);
    });
}


router.get('/list', (req, res) => {
    //res.json('from list');
    police.find((err, docs)=>{
        if(!err){
            res.render("police/list",{
                list:docs
            });
        }
    });
}); 

router.get('/:id',(req,res)=>{
    police.findById(req.params.id,(err, doc)=>{
        if(!err)
        {
            res.render("police/addOrEdit",{
                viewTitle:"Update Record",
                police: doc
            });
        }
    })
});

router.get('/delete/:id',(req,res)=>{
    police.findByIdAndRemove(req.params.id,(err, doc)=>{
        if(!err)
        {
            res.redirect('/police/list');
        }
        else{console.log('error:'+err);}
    });
});
module.exports = router;