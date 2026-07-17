import app from "./src/app.js";
import dbConnect from "./src/config/db.js";
dbConnect();
app.listen(3000,()=>{
    console.log("Server started on port 3000");
});