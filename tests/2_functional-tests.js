const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  test('Translation with text and locale fields', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({
        text: 'Paracetamol takes up to an hour to work.',
        locale: 'british-to-american'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.body.translation,
          '<span class="highlight">Tylenol</span> takes up to an hour to work.'
        );
        done();
      });
  })
  test('Translation with text and invalid locale field', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({
        text: 'I had a bicky then went to the chippy.',
        locale: 'french-to-german'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value for locale field');
        done();
      });
  });
  test('Translation with missing text field', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });
  test('Translation with missing locale field', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({
        text: 'I had a bicky then went to the chippy.'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });
  test('Translation with empty text', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ text: '', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'No text to translate');
        done();
      });
  });
});
