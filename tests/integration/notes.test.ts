import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';

let token = "";
let userDetails = {
    firstName: "test",
    lastName: "alpha",
    phoneno: "8327705331",
    password: "test1234",
    email: "sajank@gmail.com"
};
let noteObj = {
    title: "This is Title",
    description: "This is Description",
    colour: "white"
};

describe('Note APIs Test', () => {
    before((done) => {
        // First we create the user
        request(app.getApp())
            .post('/api/v1/users')
            .send(userDetails)
            .end((err, res) => {
                if (err) return done(err);
                console.log(res.body);
                expect(res.statusCode).to.be.equal(201);
            });
        // Then log in the user to get the token
        request(app.getApp())
            .post('/api/v1/users/login')
            .send({ email: "sajankumarswain@gmail.com", password: "test1234" })
            .end((err, res) => {
                if (err) return done(err);
                console.log(res.body);
                token = 'Bearer ' + res.body.data.data; // Set the token
                console.log(token);
                expect(res.statusCode).to.be.equal(200);
                done(); // Call done() after both requests are completed
            });

    });

    describe('/ POST', () => {
        it('Create a Note', (done) => {
            request(app.getApp())
                .post('/api/v1/notes')
                .set('Authorization', token)
                .send(noteObj)
                .end((err, res) => {
                    console.log(token, res.body);
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });

    describe('/:id PUT', () => {
        it('Update a Note', (done) => {
            request(app.getApp())
                .put('/api/v1/notes/update/14') // id of note
                .set('Authorization', token)
                .send({ "description": "food" })
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });

    describe('/ GET', () => {
        it('Should Get All Notes', (done) => {
            request(app.getApp())
                .get('/api/v1/notes/')
                .set('Authorization', token)
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });

    describe('/:id GET', () => {
        it('Should Fetch a Single Note', (done) => {
            request(app.getApp())
                .get('/api/v1/notes/14')
                .set('Authorization', token)
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });

    describe('/archive/:id POST', () => {
        it('Should Archive a Single Note', (done) => {
            request(app.getApp())
                .put('/api/v1/notes/archive/8')
                .set('Authorization', token)
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });

    describe('/trash/:id POST', () => {
        it('Should Trash a Single Note', (done) => {
            request(app.getApp())
                .put('/api/v1/notes/trash/14')
                .set('Authorization', token)
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });

    describe('/delete/:id POST', () => {
        it('Should Delete a Single Note', (done) => {
            request(app.getApp())
                .delete('/api/v1/notes/delete/14')
                .set('Authorization', token)
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });

});
