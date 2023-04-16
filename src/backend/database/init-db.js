import * as dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';
import { User } from './user-schema';

// This is a standalone program which will populate the database with initial data.
async function run() {
    console.log(`Connecting to database at ${process.env.MONGODB_CONNECTION_STRING}...`);
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true }); // Connect using the connection string obtained from the environment

    console.log('Clearing db...');
    await User.deleteMany({});

    console.log('Adding data...');
    await User.create(
        {
            username: 'root',
            password: '123'
        }
    );

    await mongoose.disconnect();
    console.log('Done!');
}

run();