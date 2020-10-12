const  express          =       require('express'),
       app              =       express(),
       bodyParser       =       require('body-parser'),
       cors             =       require('cors'),
       csrf             =       require('csurf'),
       csrfProtection   =       csrf({cookie:true}),
       cookieParser     =       require('cookie-parser'),
       fs               =       require('fs'),
       path             =       require('path'),
       morgan           =       require('morgan');

const admin = require('firebase-admin'),
      serviceAccount = require("./config/fbServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nastoletni-pl.firebaseio.com"
});



const indexRoutes       =       require('./routes/indexRoutes');


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan("combined",{ stream: accessLogStream }));

app.use(csrfProtection, (req,res,next) => {
    res.locals.csrfToken       = req.csrfToken();
    next();
})


app.use(indexRoutes);


const port = process.env.PORT || 8000;
// listen on the port
app.listen(port, () => console.log(`Listening on ${port}`));