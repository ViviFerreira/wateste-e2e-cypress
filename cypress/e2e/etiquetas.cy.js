describe('Fluxo de etiquetas', () => {
	before(() => {
		cy.visit('http://localhost:3000/');
		cy.fixture('user.json').then((user) => {
			cy.login(user.email, user.password);
		});
	});

	it('Criar etiqueta', () => {
		cy.contains('.ant-btn', 'Criar etiqueta', { timeout: 60000 }).click();
		cy.get('.ant-modal-content').should('be.visible');
		cy.get('#name').type('Etiqueta Teste');
		cy.get('.ant-form-item-control-input-content > .ant-btn').click();
		cy.intercept('POST', '/api/Tags').as('criarTag');
		cy.wait('@criarTag').then((interception) => {
			expect(interception.response.statusCode).to.eq(201);
			const tagId = interception.response.body.id;
			cy.excluirEtiqueta(tagId);
		});
		cy.get('ant-modal-body').should('contain.text', 'Etiqueta Teste');
	});
});
