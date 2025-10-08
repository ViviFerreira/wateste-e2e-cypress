Cypress.Commands.add('login', (email, password) => {
	cy.get('#login_form_username').type(email);
	cy.get('#login_form_password').type(password), { log: false };
	cy.get('.ant-btn').click();

	cy.intercept('POST', '/api/Auth/login').as('login');
	cy.wait('@login').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('sessionLogin', (username, password) => {
	const login = () => cy.login(username, password);
	cy.session(username, login);
});

Cypress.Commands.add('excluirEtiqueta', (id) => {
	cy.request({
		method: 'DELETE',
		url: `/https://backend-ddmrp.veaser.com.br/api/Tags/${id}`,
		headers: {
			Authorization: `Bearer ${localStorage.getItem('authToken')}`,
		},
	});
});
