const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const pool = require('../src/config/db');
const userController = require('../src/controllers/userController');

describe('User Controller', () => {
  let req, res, queryStub;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    queryStub = sinon.stub(pool, 'query');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('getUsers - restituisce lista utenti', async () => {
    const fakeUsers = [{ id: 1, email: 'test@test.com', nome: 'Mario', cognome: 'Rossi' }];
    queryStub.resolves({ rows: fakeUsers });

    await userController.getUsers(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(fakeUsers)).to.be.true;
  });

  it('getUserById - restituisce 404 se utente non esiste', async () => {
    req.params.id = 999;
    queryStub.resolves({ rows: [] });

    await userController.getUserById(req, res);

    expect(res.status.calledWith(404)).to.be.true;
  });

  it('createUser - crea utente e restituisce 201', async () => {
    req.body = { email: 'nuovo@test.com', nome: 'Luca', cognome: 'Verdi' };
    const fakeUser = { id: 2, ...req.body };
    queryStub.resolves({ rows: [fakeUser] });

    await userController.createUser(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(fakeUser)).to.be.true;
  });

  it('deleteUser - restituisce 404 se utente non esiste', async () => {
    req.params.id = 999;
    queryStub.resolves({ rows: [] });

    await userController.deleteUser(req, res);

    expect(res.status.calledWith(404)).to.be.true;
  });
});