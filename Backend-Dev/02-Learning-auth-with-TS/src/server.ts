import "dotenv/config"
import app from "./app.js";
import { env } from "./common/config/env.confing.js";
import connectDb from "./common/config/db.js";


const startServer = async ()=>{
try {
    await connectDb();

    app.listen(env.PORT, ()=>{
        console.log(`Server is running on: http://localhost:${env.PORT} in ${env.NODE_ENV} mode.`)
    })

} catch (error) {
    console.log("Failed to start the server", error)
    process.exit(1);
}
}


startServer();



