import routes from '../../src/routes/api/users.js'
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken'
import { signupUser } from '../../src/database/dao/user-dao.js';
import { User } from '../../src/database/schema/user-schema.js';
let mongod;
let token;
let user;
const app = express();
app.use(express.json());
app.use('/', routes);

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    user = await signupUser("test", "test");
    token = createToken(user._id);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe('no authentication needed', () => {
    it('signup', (done) => {
        request(app)
        .post('/signup')
        .send({
            "username": "ben",
            "password": "1234" 
        })
        .expect(201)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.username).toBe("ben");
            expect(res.body.token).toBeTruthy();
            return done();
        })
    })

    it('signup existing', (done) => {
        request(app)
        .post('/signup')
        .send({
            "username": "test",
            "password": "test" 
        })
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.error).toBe('Username already in use')
            return done();
        })
    })

    it('signup missing username', (done) => {
        request(app)
        .post('/signup')
        .send({
            "password": "test" 
        })
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.error).toBe('All fields must be filled')
            return done();
        })
    })

    it('login', (done) => {
        request(app)
        .post('/login')
        .send({
            "username": "test",
            "password": "test" 
        })
        .expect(201)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.username).toBe("test");
            expect(res.body.token).toBeTruthy();
            return done();
        })
    })

    it('login not existing', (done) => {
        request(app)
        .post('/login')
        .send({
            "username": "ben",
            "password": "test" 
        })
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.error).toBe('Invalid login credentials');
            return done();
        })
    })

    it('login missing username', (done) => {
        request(app)
        .post('/login')
        .send({
            "password": "test" 
        })
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.error).toBe('All fields must be filled');
            return done();
        })
    })

    it('login missing username', (done) => {
        request(app)
        .post('/login')
        .send({
            "password": "test" 
        })
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.error).toBe('All fields must be filled');
            return done();
        })
    })
})

describe('authentication needed', () => {
    it('reset username', (done) => {
        request(app)
        .patch('/reset')
        .set('Authorization', `Bearer: ${token}`)
        .send({
            "username": "test2" 
        })
        .expect(200)
        .end(async(err, res) => {
            if (err) {
                return done(err);
            }
            const userDB = await User.findById(user._id);
            expect(res.body.username).toBe(userDB.username);
            return done();
        })
    })

    it('reset password', (done) => {
        request(app)
        .patch('/reset')
        .set('Authorization', `Bearer: ${token}`)
        .send({
            "password": "test2" 
        })
        .expect(200)
        .end(async(err, res) => {
            if (err) {
                return done(err);
            }
            const userDB = await User.findById(user._id);
            expect(res.body.password).toBe(userDB.password);
            return done();
        })
    })

    it('reset missing fields', (done) => {
        request(app)
        .patch('/reset')
        .set('Authorization', `Bearer: ${token}`)
        .send()
        .expect(400)
        .end(async(err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.error).toBe('Username and/or password must be provided');
            return done();
        })
    })
})