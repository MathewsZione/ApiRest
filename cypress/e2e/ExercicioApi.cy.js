/// <reference types="cypress" />
import contrato from '../Contracts/usuarios.contract'

var faker = require ('faker-br')
//const { faker } = require('@faker-js/faker');

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() => {
         cy.token('undefined_Braga@yahoo.com', 'teste').then(tkn => { token = tkn })
     });
     

    it('Deve validar contrato de usuários', () => {

       cy.request('usuarios').then( response => {
          return contrato.validateAsync(response.body) 
       })

    });

    it('Deve listar usuários cadastrados', () => {

         cy.request({
          method: 'GET',
          Url: 'usuarios'
         }).then((response) =>{
          expect(response.status).to.equal(200)
         })
    });


    it('Deve cadastrar um usuário com sucesso',async () => {
             
        let usuario = `${faker.name.fullname}`
        let email = `${faker.internet.email(usuario)}`
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": usuario,
                "email": email,
                "password": "teste",
                "administrador": "true"
           }
        })
        .then((response) =>{
          expect(response.status).to.equal(201)
          expect(response.body.message).to.equal("Cadastro realizado com sucesso")
         })
    });

    it('Deve validar um usuário com email inválido', () => {
       cy.cadastrarUsuario('nome', 'beltrano@qa.com.br', 'teste', 'true')
       .then(response =>{
        expect(response.status).to.equal(400)
        expect(response.body.email).to.equal("email deve ser um email válido")
       })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
        cy.request('usuarios').then(response =>{
            let id = response.body.usuarios._id
            let usuario = `${faker.name.fullname}`
            let email = `${faker.internet.email(usuario)}`
            cy.request({
                method: 'POST',
                url: 'usuarios',
                body: {
                    "nome": usuario,
                    "email": email,
                    "password": "teste",
                    "administrador": "true"
               }
        }).then(response =>{
            expect(response.body.message).to.equal("Cadastro realizado com sucesso")
            expect(response.status).to.equal(201)
        })
       })
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        let nome = `Krattos God Of War ${Math.floor(Math.random()*1000)}`
        let email = `kratos.god${Math.floor(Math.random()*1000)}@gmail.com.br`
        let password = `123456987${Math.floor(Math.random()*1000)}`

        cy.cadastrarUsuario(token, nome, email, password, "true")
        .then((response) =>{
            let id = response.body._id
            cy.request({
                method:"DELETE",
                url: `usuarios/${id}`,
                headers: {authorization: token} 
            }).then(response =>{
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Registro excluído com sucesso')
           })
        })
    });


});
