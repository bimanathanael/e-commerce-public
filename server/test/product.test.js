const request = require('supertest')
const app = require('../app.js')
const { User, sequelize, Product } = require('../models')
const { jwtSign , jwtVerify} = require('../helpers/jwt')
const { queryInterface , Sequelize } = sequelize 

let access_token = ""
let manager_token = ""

let resultProduct = ""


beforeAll( done =>{
    let user1 = { 
        email: "admin@mail.com",
        password:"1234",
        role: "admin"
    }

    let user2 = {
        email: "manager@mail.com",
        password:"1234",
        role: "manager"
    }
    User.create(user1)
    .then( adminData => {
        // console.log(adminData.dataValues,"adminDataadminData")
        access_token = jwtSign({
            id : adminData.dataValues.id,
            email: adminData.dataValues.email
        })
        return User.create(user2)
    })
    .then( notAdminData => {
        manager_token = jwtSign({
            id : notAdminData.dataValues.id,
            email: notAdminData.dataValues.email
        })
        // console.log(access_token,"123access_tokenaccess_token")
        done()
    })
    // console.log(access_token,"access_tokenaccess_token")
    .catch( err => {
        done(err)
    })

    
})

afterAll( done => {
    queryInterface.dropTable('Products')
    .then( data => {
        return queryInterface.dropTable('Users')
    })
    .then( data =>{
        return queryInterface.createTable('Products', {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
            },
            name: {
              allowNull: false,
              type: Sequelize.STRING
            },
            image_url: {
              allowNull: false,
              type: Sequelize.STRING
            },
            price: {
              allowNull: false,
              type: Sequelize.INTEGER
            },
            stock: {
              allowNull: false,
              type: Sequelize.INTEGER
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          });
    })
    .then( data => {
        return queryInterface.createTable('Users', {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
            },
            email: {
              allowNull: false,
              type: Sequelize.STRING
            },
            password: {
              allowNull: false,
              type: Sequelize.STRING
            },
            role: {
              allowNull: false,
              type: Sequelize.STRING
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          });
    })
    .then ( data => {
        done()
    })
    .catch ( err =>{
        done(err)
    })
})

describe("Product Routes", () => {

    describe("Add Product Test", () => {
        test("201 success add product - return product details", (done) => {
            let product1 = {
                name : "Jelly Drink",
                image_url : "www.jellydrink.com",
                price : 10000,
                stock : 50,
            }
            return request(app)
                .post('/products')
                .send(product1)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
                    
                    resultProduct = body
                    // console.log(resultProduct,"resultProductresultProduct")
                    // console.log(access_token, "access_tokenaccess_token")
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : Price and Stock must be a Number", (done) => {
            let product2 = {
                name : "Tamiya Sonic Sabre",
                image_url : "www.sonicTamiya.com",
                price : "0",
                stock : "0",
            }
            return request(app)
                .post('/products')
                .send(product2)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    // console.log(response,"response")
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message","Price and Stock must be a Number")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : Price and Stock must be more then 0", (done) => {
            let product3 = {
                name : "Tamiya Sonic Sabre",
                image_url : "www.sonicTamiya.com",
                price : -1,
                stock : -1,
            }
            return request(app)
                .post('/products')
                .send(product3)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    // console.log(response,"response")
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    // expect(body).toHaveProperty("message","success login")
                    expect(body).toHaveProperty("message","Price and Stock must be more then 0")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : name cannot be empty", (done) => {
            let product4 = {
                name : "",
                image_url : "www.sonicTamiya.com",
                price : 10000,
                stock : 50,
            }
            return request(app)
                .post('/products')
                .send(product4)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    // console.log(response,"response")
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    // expect(body).toHaveProperty("message","success login")
                    expect(body).toHaveProperty("message","name cannot be empty")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : image_url cannot be empty", (done) => {
            let product5 = {
                name : "Tamiya Sonic Sabre",
                image_url : "",
                price : 10000,
                stock : 50,
            }
            return request(app)
                .post('/products')
                .send(product5)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    // console.log(response,"response")
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    // expect(body).toHaveProperty("message","success login")
                    expect(body).toHaveProperty("message","image_url cannot be empty")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : price cannot be empty", (done) => {
            let product6 = {
                name : "Tamiya Sonic Sabre",
                image_url : "www.sonicTamiya.com",
                price : "",
                stock : 50,
            }
            return request(app)
                .post('/products')
                .send(product6)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    // console.log(response,"response")
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    // expect(body).toHaveProperty("message","success login")
                    expect(body).toHaveProperty("message","price cannot be empty")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : stock cannot be empty", (done) => {
            let product7 = {
                name : "Tamiya Sonic Sabre",
                image_url : "www.sonicTamiya.com",
                price : 10000,
                stock : "",
            }
            return request(app)
                .post('/products')
                .send(product7)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    // console.log(response,"response")
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    // expect(body).toHaveProperty("message","success login")
                    expect(body).toHaveProperty("message","stock cannot be empty")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    })
    
    test("401 Unauthorized", (done) => {
        return request(app)
            .delete(`/products/${resultProduct.id}`)
            .set("Accept", "application/json")
            .set('access_token', manager_token)
            .then( response => {
                const { body, status } = response

                expect(status).toBe(401)
                expect(body).toHaveProperty("message" , "access only for admin")
                done()
            })
            .catch( (err) => {
                done(err)
            });
    })

    test("401 Unauthorized", (done) => {
        return request(app)
            .delete(`/products/${resultProduct.id}`)
            .set("Accept", "application/json")
            .set('access_token', manager_token)
            .then( response => {
                const { body, status } = response

                expect(status).toBe(401)
                expect(body).toHaveProperty("message" , "access only for admin")
                done()
            })
            .catch( (err) => {
                done(err)
            });
    })

    test("401 Not Login", (done) => {
        return request(app)
            .get('/products')
            .set("Accept", "application/json")
            .then( response => {
                const { body, status } = response

                expect(status).toBe(401)
                expect(body).toHaveProperty("message" , "wrong access token")
                done()
            })
            .catch( (err) => {
                done(err)
            });
    })

    describe("Get Product Test", () => {
        it("200 success get all products - return all products", (done) => {
            let getAll = []
            Product.findAll()
            .then( data => { 
                // console.log(data.dataValues,"datadata")
                getAll = data
            })


            // describe('GET /user', function() {
            //     it('responds with json', function(done) {
            //       request(app)
            //         .get('/user')
            //         .set('Accept', 'application/json')
            //         .expect('Content-Type', /json/)
            //         .expect(200, done);
            //     });
            //   });
            // console.log(access_token,"ini access_token")
    
            return request(app)
                .get('/products')
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    // console.log(response, "responseresponse")
                    const { body, status } = response
                    
                    expect(status).toBe(200)
                    expect(body).toEqual(expect.any(Array))

                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    })

    describe("Get selected Product Test", () => {
        test("200 success get selected product - return all products", (done) => {
            return request(app)
                .get(`/products/${resultProduct.id}`)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })

        test("404 failed get selected product - return message : data not found", (done) => {
            return request(app)
                .get(`/products/1000`)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("message","data not found")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    })

    describe("Update selected Product Test", () => {
        test("201 success update product - return update product details", (done) => {
            let product1update = {
                name : "Jelly Drink (Update)",
                image_url : "www.jellydrink.com",
                price : 10000,
                stock : 50,
            }
            return request(app)
                .put(`/products/${resultProduct.id}`)
                .send(product1update)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : Price and Stock must be a Number", (done) => {
            
            let product2 = {
                name : "Tamiya Sonic Sabre",
                image_url : "www.sonicTamiya.com",
                price : "0",
                stock : "0",
            }
            return request(app)
                .put(`/products/${resultProduct.id}`)
                .send(product2)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message","Price and Stock must be a Number")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : Price and Stock must be more then 0", (done) => {
            let product3 = {
                name : "Tamiya Sonic Sabre",
                image_url : "www.sonicTamiya.com",
                price : -1,
                stock : -1,
            }
            return request(app)
                .put(`/products/${resultProduct.id}`)
                .send(product3)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message","Price and Stock must be more then 0")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : name cannot be empty", (done) => {
            let product4 = {
                name : "",
                image_url : "www.sonicTamiya.com",
                price : 10000,
                stock : 50,
            }
            return request(app)
                .put(`/products/${resultProduct.id}`)
                .send(product4)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message","name cannot be empty")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : image_url cannot be empty", (done) => {
            let product5 = {
                name : "Tamiya Sonic Sabre",
                image_url : "",
                price : 10000,
                stock : 50,
            }
            return request(app)
                .put(`/products/${resultProduct.id}`)
                .send(product5)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message","image_url cannot be empty")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : price cannot be empty", (done) => {
            let product6 = {
                name : "Tamiya Sonic Sabre",
                image_url : "www.sonicTamiya.com",
                price : "",
                stock : 50,
            }
            return request(app)
                .put(`/products/${resultProduct.id}`)
                .send(product6)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message","price cannot be empty")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    
        test("400 failed add product - return message : stock cannot be empty", (done) => {
            let product7 = {
                name : "Tamiya Sonic Sabre",
                image_url : "www.sonicTamiya.com",
                price : 10000,
                stock : "",
            }
            return request(app)
                .put(`/products/${resultProduct.id}`)
                .send(product7)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message","stock cannot be empty")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })

        test("404 failed get selected products - return message : data not found", (done) => {
            let product1 = {
                name : "Jelly Drink",
                image_url : "www.jellydrink.com",
                price : 10000,
                stock : 50,
            }
            return request(app)
                .put(`/products/1000`)
                .send(product1)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("message","data not found")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    })

    describe("Delete selected Product Test", () => {
        test("200 success deleted selected product - return deleted products", (done) => {
            return request(app)
                .delete(`/products/${resultProduct.id}`)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    const { body, status } = response
    
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")

                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })

        test("404 failed delete selected product - return message : data not found", (done) => {
            return request(app)
                .delete(`/products/1000`)
                .set("Accept", "application/json")
                .set('access_token', access_token)
                .then( response => {
                    // console.log(response,"responseresponse")
                    const { body, status } = response
    
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("message","data not found")
                    done()
                })
                .catch( (err) => {
                    done(err)
                });
        })
    })
})
