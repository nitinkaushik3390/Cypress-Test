describe('Login User API Test Suite', () => {

    it('Login User - Success test', () => {
    
          const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
          

          const requestBody = {
            email: 'Neva24@gmail.com',
            password: 'password123',
          };
    
          cy.request({
            method: 'POST',
            url: 'login/',
            body: requestBody,
            headers: headers,
            failOnStatusCode: false
          })
          .then((response) => {
            expect(response.status).to.eq(200); //verify status code
            expect(response.body.message).to.eq("Login successful") //verify success message
            expect(response.body).to.have.property('user_id').and.be.a('number').to.not.be.oneOf([null, ""]); //verify the properties of user_id
            expect(response.body.user_id).to.eq(794) //verify user_id
            Cypress.env('newId', response.body.user_id); // store user_id as a variable
            cy.log(response.body.user_id)
          })
    })


    it('Login User - Invalid user email', () => {
    
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
      

      const requestBody = {
        email: 'test@gmail.com',
        password: 'password123',
      };

      cy.request({
        method: 'POST',
        url: 'login/',
        body: requestBody,
        headers: headers,
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.eq(400); //verify status code
        expect(response.body.detail).to.eq("Invalid email or password") //verify error message
      })

})

it('Login User - Blank password', () => {
    
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }
  

  const requestBody = {
    email: 'Neva24@gmail.com',
    password: '',
  };

  cy.request({
    method: 'POST',
    url: 'login/',
    body: requestBody,
    headers: headers,
    failOnStatusCode: false
  })
  .then((response) => {
    expect(response.status).to.eq(400); //verify status code
    expect(response.body.detail).to.eq("Invalid email or password") //verify error message
  })

})


it('Login User - Wrong parameter key', () => {
    
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }
  

  const requestBody = {
    email1: 'Neva24@gmail.com',
    password: 'password123',
  };

  cy.request({
    method: 'POST',
    url: 'login/',
    body: requestBody,
    headers: headers,
    failOnStatusCode: false
  })
  .then((response) => {
    expect(response.status).to.eq(422); //verify status code
    expect(response.body.detail[0]).to.have.property('msg').to.eq("Field required") //verify error message    
    expect(response.body.detail[0].type).to.eq("missing") //verify error message
    
  })

})


})