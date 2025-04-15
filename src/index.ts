import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        // Start your application logic here
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });