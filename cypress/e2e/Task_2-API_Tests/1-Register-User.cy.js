describe('Register User API Test Suite', () => {

    it('Register User - Success test', () => {
    
          const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
          
          // Using faker library to generate a random email address.
          const faker = require('faker');
          const generateRandomEmail = () => {
            return faker.internet.email();
          };
          
      
          // Create random email
          const randomEmail = generateRandomEmail();

          const requestBody = {
            email: randomEmail,
            password: 'password123',
          };
    
          cy.request({
            method: 'POST',
            url: 'register/',
            body: requestBody,
            headers: headers,
            failOnStatusCode: false
          })
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("User created successfully")
            cy.log(randomEmail);
          })
    })


    it('Register User - Incorrect email entered', () => {
    
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }

      const faker = require('faker');
      const generateRandomName = () => {
        return faker.name.firstName();
      };
      
  
      // Create random number
      const randomName = generateRandomName();

      const requestBody = {
        email: randomName,
        password: 'password123',
      };

      cy.request({
        method: 'POST',
        url: 'register/',
        body: requestBody,
        headers: headers,
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("User created successfully")
      })
})

it('Register User - Blank email entered', () => {
    
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const requestBody = {
    email: '',
    password: 'password123',
  };

  cy.request({
    method: 'POST',
    url: 'register/',
    body: requestBody,
    headers: headers,
    failOnStatusCode: false
  })
  .then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body.detail).to.eq("Incorrect data passed")
  })
})

it('Register User - Duplicate Email passed', () => {
    
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const requestBody = {
    email: 'Nathaniel.Legros50@hotmail.com',
    password: 'password123',
  };

  cy.request({
    method: 'POST',
    url: 'register/',
    body: requestBody,
    headers: headers,
    failOnStatusCode: false
  })
  .then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body.detail).to.eq("Email exists");
  })
})

})