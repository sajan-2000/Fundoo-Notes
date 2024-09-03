import { expect } from 'chai';
import request from 'supertest';


import app from '../../src/index';

let forgetToken = '';

describe('Fundoo Notes Integration testing', () => {
    describe('User APIs Test', () => {
        let userDetails: { firstName: string; lastName: string; phoneno: string; password: string; email: string }
            = {
            "firstName": "bheem",
            "lastName": "kumar",
            "phoneno": "8327705331",
            "password": "bheem123",
            "email": "sajankumarswain@gmail.com"
        }
        describe('Register A User', () => {
            it('Registration Of User', (done) => {
                request(app.getApp())
                    .post('/api/v1/users')
                    .send(userDetails)
                    .end((err, res) => {
                        console.log(res.body);
                        expect(res.statusCode).to.be.equal(201);
                        done();
                    });
            });
        });

      describe('Login A User', () => {
          it('Login Of User', (done) => {
              request(app.getApp())
                  .post('/api/v1/users/login')
                  .send({ "email": "salman@gmail.com", "password": "salman1234" })
                  .end((err, res) => {
                      console.log(res.body);
                      expect(res.statusCode).to.be.equal(200);
                      done();
                  });
          });
      });

        describe('User forgot password', () => {
            it('Request for Password Change of User', (done) => {
                request(app.getApp())
                    .post('/api/v1/users/forgotpassword')
                    .send({ email: 'sajankumarswain6@gmail.com' })
                    .end((err, res) => {
                        console.log(res.body);
                        forgetToken = 'bearer ' + res.body.data;
                        console.log(forgetToken);
                        expect(res.statusCode).to.be.equal(202);
                        done();
                    });
            });
        });

        describe('User Profile Password Changing', () => {
            it('Password Change of User', (done) => {
                request(app.getApp())
                    .post('/api/v1/users/resetpwd')
                    .set('Authorization', forgetToken)
                    .send({ password: 'bheem12345' })
                    .end((err, res) => {
                        console.log(res.body);
                        expect(res.statusCode).to.be.equal(202);
                        done();
                    });
            });
        });

  });
});

//   })
// })
