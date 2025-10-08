describe('Fluxo de Grupos de Alocação', () => {
	before(() => {
		cy.visit('/');
		cy.fixture('user.json').then((user) => {
			cy.login(user.email, user.password);
		});
	});

	it('Criar Grupo de Alocação', () => {
		
		const nomeGrupo = 'Grupo de Alocação Teste';
		//cy.intercept('GET', '/api/AllocationGroup/AllocationGroupWithTotals').as('getGrupos')
		cy.contains('.ant-btn', 'Grupos de alocação priorizada').click();
		cy.get('.ant-modal-content').should('be.visible');
		cy.get('#name').type(nomeGrupo);
		cy.intercept('POST', '/api/AllocationGroup').as('criarGrupo');
		cy.contains('.ant-form-item-control-input-content > .ant-btn', 'Salvar').click();
		cy.wait('@criarGrupo')
		cy.get('ant-modal-body').should('contain.text', nomeGrupo).should('be.visible')
	});
});
