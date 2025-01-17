/// <reference types = "cypress"/>  
it('Test 1', () => {
    cy.visit('http://localhost:8080/api/Instructor')
    cy.wait(2000)
    cy.contains("Instructor Management Pannel")
    cy.get('td.Homeworks').first().click
}) 




