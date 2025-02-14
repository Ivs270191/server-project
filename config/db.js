import mongoose from "mongoose";
const URI = 'mongodb+srv://ivs270191:cUO264UEXJXFe6fo@testmongo.xsxvv.mongodb.net/?retryWrites=true&w=majority&appName=TestMongo';

mongoose.connect(URI).then(() => { console.log('DB is connected') }).catch(err => console.error(err));