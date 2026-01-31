Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });


describe('Test 2 - Broken Links Verification Test Suite', () => {
  
    it('Find all broken links', () => {
  
      cy.visit('http://100.27.30.112/docs')
  
      cy.get("a").each(page => {
        const link = page.prop('href')
        cy.request({
          url: link,
          failOnStatusCode: false  // allow good and bad response to pass into then
        }).then(response => {
        // log the broken links
        if(response.status!=200){ //condition for broken/bad links.
          var result = {
            status: response.status,
            name: link,
        }; 
          cy.log(JSON.stringify(result));
            }
        })
      })
  
    })
  
  })