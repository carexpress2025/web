describe('Teste E2E com NextAuth', () => {
  beforeEach(() => {
    // Simulando a autenticação via NextAuth
    cy.request('POST', '/api/auth/callback/credentials', {
      username: 'cypress@carexpress.com',
      password: 'cypress2025',
    }).then((response) => {
      // Guardar o token ou outras informações necessárias
      window.localStorage.setItem(
        'next-auth.session-token',
        response.body.token,
      );
    });
  });

  it('Deve acessar a página inicial do Dashboard', () => {
    cy.visit('/dashboard');
    cy.contains('Hello World').should('be.visible');
  });
});
