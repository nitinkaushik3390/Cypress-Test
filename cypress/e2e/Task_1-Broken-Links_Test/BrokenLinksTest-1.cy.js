Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });


describe('Test 1 - Broken Links Verification Test Suite', () => {
  
    it('Find all broken links', () => {
  
      cy.visit('https://www.softwaretestingmaterial.com/')
  
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