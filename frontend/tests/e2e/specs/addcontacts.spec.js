describe('Cadastro de contatos', () => {
  
  describe('Novo contato', () => {
    let contact = {
      name: 'Vini Santos',
      number: '11999999999',
      description: 'Solicitar orçamento para consultoria em QA'
    }

    describe('Quando submeto o cadastro completo', () => {
      before(() => {
        cy.dash()
        cy.createContact(contact)
      })

      it('Deve cadastrar esse contato', () => {
        cy.contactList().contains(contact.name)
      })

    })

    describe('Quando submeto o cadastro completo sem o nome', () => {

      let contact = {
        number: '11999999999',
        description: 'Solicitar orçamento para consultoria em QA'
      }

      before(() => {
        cy.dash()
        cy.createContact(contact)
      })

      it('Deve mostrar uma notificação', () => {
        cy.alertName().contains('Nome é obrigatório')
      })

    })

    describe('Quando submeto o cadastro completo sem o whatsapp', () => {

      let contact = {
        name: 'Vini Santos',
        description: 'Solicitar orçamento para consultoria em QA'
      }

      before(() => {
        cy.dash()
        cy.createContact(contact)
      })

      it('Deve cadastrar esse contato', () => {
        cy.alertNumber().contains('WhatsApp é obrigatório')
      })

    })

    describe('Quando submeto o cadastro completo sem o assunto', () => {

      let contact = {
        name: 'Vini Santos',
        number: '11999999999'
      }

      before(() => {
        cy.dash()
        cy.createContact(contact)
      })

      it('Deve cadastrar esse contato', () => {
        cy.alertDesc().contains('Assunto é obrigatório')
      })

    })

  })

})