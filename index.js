var express = require('express');
var cors = require('cors');
const multer = require('multer');
const upload=multer({dest: 'uploads/'})
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// upload is a multer function which here we used as middleware, so it add file to req.file.

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  //here req.file is the file data added by middleware.
  let resObj={
    name:req.file.originalname,
    type:req.file.mimetype,
    size:req.file.size 
  }
  res.json(resObj);
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
