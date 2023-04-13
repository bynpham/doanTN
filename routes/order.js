;var express = require('express');
var router = express.Router();
const orderController = require("../controllers/order")

router.get('/lichsumuahang', async function(req, res, next) {
    const orders = await orderController.get();
    console.log(orders,"dong7")
      res.render('lichsumuahang',{orders:orders});
      
    });


    router.get('/chitietdonhang/:id', async function(req, res, next) {
        const ordersid = req.params.id
    const orders = await orderController.get();
    const order = orders?.filter(i=>i._id==ordersid)[0] || {}
    const products = order.productArr

      res.render('chi-tiet-don-hang', {products});
      
    });

router.post("/addOrder", async(req, res)=>{
    const { checkOutData } = req.body
    console.log(checkOutData)
    try{
        const result = await orderController.checkoutdata(checkOutData)
        if(result){
            res.json({...result, success:true})
        }else{
            res.json({...result, success:false})
        }
    }catch(e){
        
        res.json({e, success:false})
        console.log(e)
    }

});

router.get('/getorderbyuserid/:userid', async function(req, res, next) {
    const {userid} = req.params   
     console.log(userid,"dong7")
    const orders = await orderController.getorderbyuserid(userid);

    if(orders){
        res.json(orders);
    }else{
        res.json(null)
    }
    
      
    });


    




module.exports = router;