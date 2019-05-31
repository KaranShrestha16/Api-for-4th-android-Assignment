const Express = require('express');
const port = process.env.PORT || 8001;
const Userroutes = require('./routes/users');
const Itemsroutes = require('./routes/items');
const ImageUpload=require('./routes/image')
const app = new Express();
const path = require('path');


app.use(Userroutes);
app.use(Itemsroutes);
app.use(ImageUpload);

app.use(Express.static(path.join(__dirname, './images')));
// Handeling routes Error
app.use((req,res,next)=>{
    const error = new Error("Url not Found");
    error.status= 404;
    next(error);
});

app.use((error,req,res,next)=> {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});



app.listen(port, function () {
    console.log("listening on port: ", port);
});


