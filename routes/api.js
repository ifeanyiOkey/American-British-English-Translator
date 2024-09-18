'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;
      console.log(req.body);
      if (!text) return res.json({ error: 'No text to translate' });
      if (!locale)
        return res.json({ error: 'Invalid value for locale field' });
      if (!Object.hasOwn(req.body, 'text') || !Object.hasOwn(req.body, 'locale'))
        return res.json({ error: 'Required field(s) missing' })
      const translation = translator.translate(text, locale);
      return res.json({ 'text': text, 'translation': translation });
    });
};
