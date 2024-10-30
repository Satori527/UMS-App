//import dotenv from "../.env";
import { app } from "../src/app.js";
import connectDB from "../src/db/index.js";

// dotenv.config({
//     path: './env'
// })

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !! ", err);
})

app.get('/', function(req, res, next) {
    res.send("Hello world");
});
