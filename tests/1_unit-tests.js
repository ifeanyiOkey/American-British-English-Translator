const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
let tranlator = new Translator();

suite("Unit Tests", () => {
  suite("Translate to British English", () => {
    test("Mangoes are my favorite fruit.", () => {
      assert.equal(
        tranlator.translate(
          "Mangoes are my favorite fruit.",
          "american-to-british"
        ),
        'Mangoes are my <span class="highlight">favourite</span> fruit.'
      );
    });
    test("I ate yogurt for breakfast.", () => {
      assert.equal(
        tranlator.translate(
          "I ate yogurt for breakfast.",
          "american-to-british"
        ),
        'I ate <span class="highlight">yoghurt</span> for breakfast.'
      );
    });
    test("We had a party at my friend's condo.", () => {
      assert.equal(
        tranlator.translate(
          "We had a party at my friend's condo.",
          "american-to-british"
        ),
        `We had a party at my friend's <span class="highlight">flat</span>.`
      );
    });
    test("Can you toss this in the trashcan for me?", () => {
      assert.equal(
        tranlator.translate(
          "Can you toss this in the trashcan for me?",
          "american-to-british"
        ),
        'Can you toss this in the <span class="highlight">bin</span> for me?'
      );
    });
    test("The parking lot was full.", () => {
      assert.equal(
        tranlator.translate("The parking lot was full.", "american-to-british"),
        'The <span class="highlight">car park</span> was full.'
      );
    });
    test("Like a high tech Rube Goldberg machine.", () => {
      assert.equal(
        tranlator.translate(
          "Like a high tech Rube Goldberg machine.",
          "american-to-british"
        ),
        'Like a high tech <span class="highlight">Heath Robinson device</span>.'
      );
    });
    test("To play hooky means to skip class or work.", () => {
      assert.equal(
        tranlator.translate(
          "To play hooky means to skip class or work.",
          "american-to-british"
        ),
        'To <span class="highlight">bunk off</span> means to skip class or work.'
      );
    });
    test("No Mr. Bond, I expect you to die.", () => {
      assert.equal(
        tranlator.translate(
          "No Mr. Bond, I expect you to die.",
          "american-to-british"
        ),
        'No <span class="highlight">Mr</span> Bond, I expect you to die.'
      );
    });
    test("Dr. Grosh will see you now.", () => {
      assert.equal(
        tranlator.translate(
          "Dr. Grosh will see you now.",
          "american-to-british"
        ),
        '<span class="highlight">Dr</span> Grosh will see you now.'
      );
    });
    test("Lunch is at 12:15 today.", () => {
      assert.equal(
        tranlator.translate("Lunch is at 12:15 today.", "american-to-british"),
        'Lunch is at <span class="highlight">12.15</span> today.'
      );
    });
  });

  suite("Translate to American English", () => {
    test("We watched the footie match for a while.", () => {
      assert.equal(
        tranlator.translate(
          "We watched the footie match for a while.",
          "british-to-american"
        ),
        'We watched the <span class="highlight">soccer</span> match for a while.'
      );
    });
    test("Paracetamol takes up to an hour to work.", () => {
      assert.equal(
        tranlator.translate(
          "Paracetamol takes up to an hour to work.",
          "british-to-american"
        ),
        '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      );
    });
    test("First, caramelise the onions.", () => {
      assert.equal(
        tranlator.translate(
          "First, caramelise the onions.",
          "british-to-american"
        ),
        'First, <span class="highlight">caramelize</span> the onions.'
      );
    });
    test("I spent the bank holiday at the funfair.", () => {
      assert.equal(
        tranlator.translate(
          "I spent the bank holiday at the funfair.",
          "british-to-american"
        ),
        'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.'
      );
    });
    test("I had a bicky then went to the chippy.", () => {
      assert.equal(
        tranlator.translate(
          "I had a bicky then went to the chippy.",
          "british-to-american"
        ),
        'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-<span class="highlight">fish-and-chip shop</span></span>.'
      );
    });
    test("I've just got bits and bobs in my bum bag.", () => {
      assert.equal(
        tranlator.translate(
          "I've just got bits and bobs in my bum bag.",
          "british-to-american"
        ),
        `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`
      );
    });
    test("The car boot sale at Boxted Airfield was called off.", () => {
      assert.equal(
        tranlator.translate(
          "The car boot sale at Boxted Airfield was called off.",
          "british-to-american"
        ),
        'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.'
      );
    });
    test("Have you met Mrs Kalyani?", () => {
      assert.equal(
        tranlator.translate("Have you met Mrs Kalyani?", "british-to-american"),
        'Have you met <span class="highlight">Mrs.</span> Kalyani?'
      );
    });
    test("Prof Joyner of King's College, London.", () => {
      assert.equal(
        tranlator.translate(
          "Prof Joyner of King's College, London.",
          "british-to-american"
        ),
        `<span class="highlight">Prof.</span> Joyner of King's College, London.`
      );
    });
    test("Tea time is usually around 4 or 4.30.", () => {
      assert.equal(
        tranlator.translate(
          "Tea time is usually around 4 or 4.30.",
          "british-to-american"
        ),
        'Tea time is usually around 4 or <span class="highlight">4:30</span>.'
      );
    });
  });

  suite("Highlight", () => {
    test("Mangoes are my favorite fruit.", () => {
      assert.include(
        tranlator.translate(
          "Mangoes are my favorite fruit.",
          "american-to-british"
        ),
        '<span class="highlight">favourite</span>'
      );
    });
    test("I ate yogurt for breakfast.", () => {
      assert.include(
        tranlator.translate(
          'I ate yogurt for breakfast.',
          'american-to-british'
        ),
        '<span class="highlight">yoghurt</span>'
      );
    });
    test('We watched the footie match for a while.', () => {
      assert.include(
        tranlator.translate(
          'We watched the footie match for a while.',
          'british-to-american'
        ),
        '<span class="highlight">soccer</span>'
      );
    });
    test('Paracetamol takes up to an hour to work.', () => {
      assert.include(
        tranlator.translate(
          'Paracetamol takes up to an hour to work.',
          'british-to-american'
        ),
        '<span class="highlight">Tylenol</span'
      );
    });
  });
});
