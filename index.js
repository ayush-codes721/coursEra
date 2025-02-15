import  {app} from "./app.js";
import connectDB from "./config/connectDB.js";


async function startServer() {
    await connectDB();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT} ${new Date().toString()}`);
    });
}

await startServer();
