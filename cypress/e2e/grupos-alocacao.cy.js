describe('Fluxo de Grupos de Alocação', () => {
	before(() => {
		cy.visit('/');
		cy.fixture('user.json').then((user) => {
			cy.login(user.email, user.password);
		});
	});

	it('CRUD Grupos de Alocação', () => {
		
		const nomeGrupo = 'Grupo de Alocação Teste';
		
		// Create
		cy.contains('.ant-btn', 'Grupos de alocação priorizada').click();
		cy.get('.ant-modal-content').should('be.visible');
		cy.get('#name').type(nomeGrupo);
		cy.intercept('POST', '/api/AllocationGroup').as('criarGrupo');
		cy.contains('.ant-form-item-control-input-content > .ant-btn', 'Salvar').click();
		cy.wait('@criarGrupo')
		cy.contains('td', nomeGrupo ).should('be.visible');

		const nomeGrupoUpdate = 'Grupo de Alocação Atualizado';

		//Update
		cy.contains('td', nomeGrupo) 
			.parent('tr') 
			.within(() => { 
				cy.contains('button', 'Editar').click() // 
			})
		cy.get('#name').clear().type(nomeGrupoUpdate);
		cy.intercept('PUT', '/api/AllocationGroup/**').as('atualizarGrupo');
		cy.contains('.ant-form-item-control-input-content > .ant-btn', 'Atualizar').click();
		cy.wait('@atualizarGrupo')
		
		//Delete

		cy.contains('td', nomeGrupo ).should('not.exist')
		cy.contains('td', nomeGrupoUpdate ).should('be.visible');
		cy.contains('td', nomeGrupoUpdate) 
			.parent('tr') 
			.within(() => { 
				cy.contains('button', 'Excluir').click() // 
			})
		cy.get('.ant-popconfirm').should('be.visible')
		cy.contains('span', 'OK').click()


		cy.get('.ant-modal-content').its('length').should('be.at.least', 1)
    	cy.contains('td', nomeGrupoUpdate).should('not.exist')

	});
});
