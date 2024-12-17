const { test, expect } = require("@playwright/test"); 
const { Ajv } = require("ajv");


const ajv  = new Ajv()

test('Test GET', async ({ request }) => {
    // API Call
    const response = await request.get('https://reqres.in/api/users/7');
       expect(response.status()).toBe(200)
        // Extract response body in JSON format
       const responseData = await response.json()
       // Assertion
       expect(responseData.data.id).toBe(7)
       expect(responseData.data.email).toBe("michael.lawson@reqres.in")
       expect(responseData.data.first_name).toBe("Michael")
       expect(responseData.data.last_name).toBe("Lawson")
       expect(responseData.data.avatar).toBe("https://reqres.in/img/faces/7-image.jpg")

    // Validasi jsonschema
    const valid = ajv.validate(require('./jsonschema/get-object-schema.json'), responseData) 
    if (!valid) {
        console.log("AJV Validation Errors:", ajv.errorsText());
       }       
        expect(valid).toBe(false)

    })

test('Test POST', async ({ request }) => {

    const bodyData = {
        "name": "morpheus",
        "job": "leader"
    }
    const headerData = {
        Accept: 'application/json'
    }
    // API Call
    const response = await request.post('https://reqres.in/api/users', {
        headers: headerData,
        data: bodyData
    })
    // Extract response body in JSON format
    const responseData = await response.json()
    // Assertion
    expect(response.status()).toBe(201)
    expect(responseData.name).toBe("morpheus")
    expect(responseData.job).toBe("leader")

    // Validasi jsonschema
    const valid = ajv.validate(require('./jsonschema/post-object-schema.json'), responseData) 
    if (!valid) {
        console.log("AJV Validation Errors:", ajv.errorsText());
       }       
        expect(valid).toBe(true)

    })


test('Test DELETE', async ({ request }) => {
    const bodyData = {
        "name": "morpheus",
        "job": "leader"
    }
    const headerData = {
        Accept: 'application/json'
    }
    
    // API Call
    const response = await request.delete('https://reqres.in/api/users/2', {
        headers: headerData,
        data: bodyData
    })
    
    // Assertion
    expect(response.status()).toBe(204)
    
    
})

test('Test PUT', async ({ request }) => {
    
    const bodyData = {
        "name": "morpheus",
        "job": "zion resident"
    }
    const headerData = {
        Accept: 'application/json'
    }
    // API Call
    const response = await request.put('https://reqres.in/api/users/2', {
        headers: headerData,
        data: bodyData
    })
    // Extract response body in JSON format
    const responseData = await response.json()

    // Assertion
    expect(response.status()).toBe(200)
    expect(responseData.name).toBe("morpheus")
    expect(responseData.job).toBe("zion resident")


    // Validasi jsonschema
    const valid = ajv.validate(require('./jsonschema/put-object-schema.json'), responseData) 
    if (!valid) {
        console.log("AJV Validation Errors:", ajv.errorsText());
       }       
        expect(valid).toBe(true)

})
