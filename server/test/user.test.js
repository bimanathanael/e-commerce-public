const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { jwtSign , jwtVerify} = require('../helpers/jwt')
const { queryInterface } = sequelize

let adminCreate = {
    email : "admin@mail.com",
    password : "1234",
    role: "admin"
}

beforeAll( done =>{
    User.create(adminCreate)
    .then( data => {
        access_token = jwtSign({
            id : data.id,
            email: data.email
        })

        done()
    })
    .catch( err => {
        done(err)
    })
    
})

describe("Admin Routes", () => {

    test("200 admin success login - return access_token and id", (done) => {
        let admin1 = {
            email : "admin@mail.com",
            password : "1234"
        }
        return request(app)
            .post('/login')
            .send(admin1)
            .set("Accept", "application/json")
            .then( response => {
                const { body, status } = response

                expect(status).toBe(200)
                // expect(body).toHaveProperty("message","success login")
                expect(body).toHaveProperty("access_token")
                done()
            })
            .catch( (err) => {
                done(err)
            });
    })

    test("404 admin failed login - return message : data not found", (done) => {
        let admin2 = {
            email : "mail@admin.com",
            password : "1234",
        }
        return request(app)
            .post('/login')
            .send(admin2)
            .set("Accept", "appliaction/json")
            .then( response => {
                const { body, status } = response

                expect(status).toBe(404)
                expect(body).toHaveProperty("message","data not found")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    test("400 admin failed login - return message : email cannot be empty", done =>{
        let admin3 = {
            email : "",
            password : "12345",
        }
        return request(app)
        .post('/login')
        .send(admin3)
        .set("Accept", "application/json")
        .then( response => {
            const { body, status } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "email cannot be empty")
            done()
        })
        .catch( err =>{
            done(err)
        })
    })

    test("400 admin failed login - return message : password cannot be empty", done =>{
        let admin4 = {
            email : "admin@mail.com",
            password : "",
        }
        return request(app)
        .post('/login')
        .send(admin4)
        .set("Accept", "application/json")
        .then( response => {
            const { body, status } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "password cannot be empty")
            done()
        })
        .catch( err =>{
            done(err)
        })
    })
})

describe("Customer Routes", () => {

    describe("Customer Register Test", () => {
        test("200 customer success register - return access_token and id", (done) => {
            let customerCreate1 = {
                email : "customer@mail.com",
                password : "customer",
                role: "customer"
            }
            return request(app)
                .post('/registerCust')
                .send(customerCreate1)
                .set("Accept", "application/json")
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(200)
                    // expect(body).toHaveProperty("message","success register")
                    expect(body).toHaveProperty("access_token")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 customer failed register - return message : email cannot be empty", done =>{
            let customerCreate2 = {
                email : "",
                password : "customer",
                role: "customer"
            }
            return request(app)
            .post('/registerCust')
            .send(customerCreate2)
            .set("Accept", "application/json")
            .then( response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "email cannot be empty")
                done()
            })
            .catch( err =>{
                done(err)
            })
        })
    
        test("400 customer failed register - return message : password cannot be empty", done =>{               
            let customerCreate3 = {
                email : "customer@mail.com",
                password : "",
                role: "customer"
            }
            return request(app)
            .post('/registerCust')
            .send(customerCreate3)
            .set("Accept", "application/json")
            .then( response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "password cannot be empty")
                done()
            })
            .catch( err =>{
                done(err)
            })
        })
    })

    describe('Customer Login Test', () => {
        test("200 admin success login - return access_token and id", (done) => {
            let customer1 = {
                email : "customer@mail.com",
                password : "customer"
            }
            return request(app)
                .post('/loginCust')
                .send(customer1)
                .set("Accept", "application/json")
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(200)
                    // expect(body).toHaveProperty("message","success login")
                    expect(body).toHaveProperty("access_token")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("404 customer failed login - return message : data not found", (done) => {
            let customer2 = {
                email : "customersssss@mail.com",
                password : "customer"
            }
            return request(app)
                .post('/loginCust')
                .send(customer2)
                .set("Accept", "appliaction/json")
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("message","data not found")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    
        test("400 customer failed login - return message : email cannot be empty", done =>{
            let customer3 = {
                email : "",
                password : "12345",
            }
            return request(app)
            .post('/loginCust')
            .send(customer3)
            .set("Accept", "application/json")
            .then( response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "email cannot be empty")
                done()
            })
            .catch( err =>{
                done(err)
            })
        })
    
        test("400 customer failed login - return message : password cannot be empty", done =>{
            let customer4 = {
                email : "customer@mail.com",
                password : "",
            }
            return request(app)
            .post('/loginCust')
            .send(customer4)
            .set("Accept", "application/json")
            .then( response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "password cannot be empty")
                done()
            })
            .catch( err =>{
                done(err)
            })
        })
    })
    
})