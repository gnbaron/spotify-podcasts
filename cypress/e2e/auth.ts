/// <reference path="../support/index.d.ts" />

describe('Authentication', () => {
  it('gets redirected to /login and authenticate with spotify account', () => {
    // login

    Cypress.Cookies.debug(true)

    cy.visit('/login')

    // cy.url().should('include', '/login')
    // cy.findByRole('link', { name: /Log in using spotify/i }).click()

    // cy.findByLabelText(/Email address or username/i).type(
    //   Cypress.env('SPOTIFY_USER_EMAIL')
    // )
    // cy.findByLabelText(/Password/i).type(Cypress.env('SPOTIFY_USER_PASSWORD'))

    // cy.findByRole('button', { name: /Log in/i }).click()

    // cy.visit('https://accounts.spotify.com')

    // cy.findByLabelText(/endereço de e-mail ou nome de usuário/i).type(
    //   Cypress.env('SPOTIFY_USER_EMAIL')
    // )
    // cy.findByLabelText(/senha/i).type(Cypress.env('SPOTIFY_USER_PASSWORD'))

    // cy.findByRole('button', { name: /entrar/i }).click()

    // cy.wait(10000)
    // cy.url().should('include', '/shows')
  })
})
