const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors')
const mongoose=require('mongoose')
const passport = require('passport')
const keys=require('./config/keys');
const {spawn} = require('child_process');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieSession = require('cookie-session')
var fs = require('fs')


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/BTP/New_Resized/banquethall', express.static('BTP/New_Resized/banquethall'))
app.use('/BTP/New_Resized/building', express.static('BTP/New_Resized/building'))
app.use('/BTP/New_Resized/crushingtool', express.static('BTP/New_Resized/crushingtool'))
app.use('/BTP/New_Resized/school', express.static('BTP/New_Resized/school'))

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })
app.post('/image', upload.single('file'), function (req, res) {
	console.log(req.file)
	var dataToSend;
	// spawn new child process to call the python script
	console.log('.\\BPT\\feature_extaction.py ' + req.file.filename);
	const python = spawn('python.exe', ['./BTP/feature_extaction.py',req.file.filename]);
	// collect data from script
	python.stdout.on('data', function (data) {
	 console.log('Pipe data from python script ...');
	 dataToSend = data.toString();
	});
	// in close event we are sure that stream from child process is closed
	python.on('close', (code) => {
	console.log(`child process close all stdio with code ${code}`);
	// send data to browser
	fs.readFile('./BTP/similarities_sorted - Copy.csv', 'utf8', function(err, data) {
		if (err) throw err;
		console.log()
		console.log()
		console.log(data.toString())
		res.send({"data":data.toString()})
	  });
	});
  })

require('./models/Users')
require('./models/Artwork')
require('./models/Rating')
//Import UserModel before passport
require('./services/passport');
const path = require('path')
//Connect to mongoose
mongoose.connect(keys.mongoURI,()=>{
    console.log("Conneted to MongoDB database")
})

app.use(
    cookieSession({
        maxAge:30*24*3600*1000,//30 days life
        keys:[keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute')(app);
require('./routes/userRoute')(app);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Listening on PORT : "+PORT);
})

//set NODE_OPTIONS=--openssl-legacy-provide



// const express = require('express');
// const bodyParser = require("body-parser");
// var cors = require('cors')
// const mongoose=require('mongoose')
// const passport = require('passport')
// const keys=require('./config/keys');
// const {spawn} = require('child_process');
// const app = express();
// const PORT = process.env.PORT || 5000;
// const cookieSession = require('cookie-session')
// var fs = require('fs')

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())

// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images/')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
// })

// const upload = multer({ storage: storage })
// app.post('/image', upload.single('file'), function (req, res) {
//     console.log(req.file)
//     var dataToSend;
//     // spawn new child process to call the python script
//     console.log('.\\BPT\\feature_extaction.py ' + req.file.filename);
//     const python = spawn('python.exe', ['./BTP/feature_extaction.py',req.file.filename]);
//     // collect data from script
//     python.stdout.on('data', function (data) {
//      console.log('Pipe data from python script ...');
//      dataToSend = data.toString();
//     });
//     // in close event we are sure that stream from child process is closed
//     python.on('close', (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     // send data to browser
//     fs.readFile('./BTP/similarities_sorted - Copy.csv', 'utf8', function(err, data) {
//         if (err) throw err;
//         console.log(data.toString())
//         res.send({"data":data.toString()})
//       }); 
//     //res.send(dataToSend)
//     });
    
//     //res.json({})
//   })

// require('./models/Users')
// require('./models/Artwork')
// require('./models/Rating')
// //Import UserModel before passport
// require('./services/passport');
// const path = require('path')
// //Connect to mongoose
// mongoose.connect(keys.mongoURI,()=>{
//     console.log("Conneted to MongoDB database")
// })

// app.use(
//     cookieSession({
//         maxAge:30*24*3600*1000,//30 days life
//         keys:[keys.cookieKey]
//     })
// )

// app.use(passport.initialize());
// app.use(passport.session());

// require('./routes/authRoute')(app);
// require('./routes/userRoute')(app);


// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))
    
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

// app.listen(PORT,()=>{
//     console.log("Listening on PORT : "+PORT);
// })


// //set NODE_OPTIONS=--openssl-legacy-provide