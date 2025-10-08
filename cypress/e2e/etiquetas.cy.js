describe('Fluxo de Etiquetas', () => {
	before(() => {
		cy.visit('/');
		cy.fixture('user.json').then((user) => {
			cy.login(user.email, user.password);
		});
	});

	it('Criar Etiquetas', () => {
		cy.contains('.ant-btn', 'Criar etiqueta').click();
		cy.get('.ant-modal-content').should('be.visible');
		cy.get('#name').type('Etiqueta Teste');
		cy.get('.ant-form-item-control-input-content > .ant-btn').click();
		cy.intercept('POST', '/api/Tags').as('criarTag');
		cy.wait('@criarTag').then((interception) => {
			expect(interception.response.statusCode).to.eq(201);
			const tagId = interception.response.body.data.id;
			cy.excluirEtiqueta(tagId);
		});
		cy.get('ant-modal-body').should('contain.text', 'Etiqueta Teste');
	});
});
