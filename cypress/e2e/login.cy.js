describe('Login', () => {
	it('Login com sucesso', () => {
		cy.visit('https://ddmrp.veaser.com.br/');
		cy.get('#login_form_username').type('WA');
		cy.get('#login_form_password').type('123');
		cy.get('.ant-btn').click();
	});
	it.only('Login com falha', () => {
		cy.visit('https://ddmrp.veaser.com.br/');
		cy.get('#login_form_username').type('WA');
		cy.get('#login_form_password').type('1234');
		cy.get('.ant-btn').click();
		cy.intercept('POST', '/api/Auth/login').as('login');
		cy.wait('@login').its('response.statusCode').should('eq', 401);
		cy
			.get('.ant-notification-notice-message')
			.should('have.text', 'Login Falhou')
			.and('be.visible');
	});
});
