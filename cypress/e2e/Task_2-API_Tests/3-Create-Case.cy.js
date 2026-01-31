describe('Create Case API Test Suite', () => {

  // Login before every executed test case.
  beforeEach(() => {
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
      Cypress.env('newId', response.body.user_id); // store user_id as a variable
    })
  })

    it('Create Case - Success test', () => {
    
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
  
      const requestBody = {
        "case_name": "test case1",
        "user_id": Cypress.env('newId'),
        "item_id": 1
      };
  
      cy.request({
        method: 'POST',
        url: 'cases/',
        body: requestBody,
        headers: headers,
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.eq(200); //verify status code
        expect(response.body.status).to.eq("open") //verify success message
        expect(response.body.case_name).to.eq("test case1") //verify user_id
        expect(response.body.item_id).to.eq(1) // verify item_id
        expect(response.body.id).and.be.a('number').to.not.be.oneOf([null, ""]); //verify new id is generated and it is not blank/null.
        expect(response.body.user_id).to.eq(Cypress.env('newId')) //verify the user id with the logged-in user's id.
      })
          
    })

    it('Create Case - Blank user id passed', () => {
    
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
  
      const requestBody = {
        "case_name": "test case1",
        "user_id": '',
        "item_id": 1
      };
  
      cy.request({
        method: 'POST',
        url: 'cases/',
        body: requestBody,
        headers: headers,
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.eq(422); //verify status code
        expect(response.body.detail[0]).to.have.property('msg').to.eq("Input should be a valid integer, unable to parse string as an integer") //verify error message    
        expect(response.body.detail[0].type).to.eq("int_parsing");
      })


          
    })
    
    it('Create Case - Invalid user id passed', () => {
    
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
  
      const requestBody = {
        "case_name": "test case1",
        "user_id": 'dkljdlk',
        "item_id": 1
      };
  
      cy.request({
        method: 'POST',
        url: 'cases/',
        body: requestBody,
        headers: headers,
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.eq(422); //verify status code
        expect(response.body.detail[0]).to.have.property('msg').to.eq("Input should be a valid integer, unable to parse string as an integer") //verify error message    
        expect(response.body.detail[0].type).to.eq("int_parsing");
      })
          
    })

    it('Create Case - Incorrect item id passed', () => {
    
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
  
      const requestBody = {
        "case_name": "test case1",
        "user_id": '794',
        "item_id": 0
      };
  
      cy.request({
        method: 'POST',
        url: 'cases/',
        body: requestBody,
        headers: headers,
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.eq(400); //verify status code
      })    
    })

})