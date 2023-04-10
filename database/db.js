import mongoose, { mongo } from "mongoose";

const Connections = async () => {
    const USER = process.env.DB_USERNAME;
    const PASSWORD = process.env.DB_PASSWORD;

    const URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.djmj1ek.mongodb.net/Clone-Whatsapp`;

    try {
        await mongoose.connect(URL, {
            useUnifiedTopology: true, 
            useNewUrlParser: true
        });
        console.log(`Db is connected successfully`);
    } catch (error) {
        console.log(`Db could not be connected!`, error.message);
    }
};

export default Connections;