const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  // Choose the correct dictionary based on locale
  translate(text, locale) {
    let translatedText = text;
    let originalText = text;  // Save the original text for comparison

    // Helper function to translate based on dictionary and wrap with <span> tags
    const translateByDictionary = (str, dictionary) => {
      for (const [usWord, ukWord] of Object.entries(dictionary)) {
        const regex = new RegExp(`\\b${usWord}\\b`, "gi");
        str = str.replace(regex, (match) => {
          // Preserve original casing (title case, all caps, etc.)
          const translatedWord =
            match.charAt(0).toUpperCase() === match.charAt(0)
              ? ukWord.charAt(0).toUpperCase() + ukWord.slice(1)
              : ukWord;

          // Wrap the translated word with <span> tags
          return `<span class="highlight">${translatedWord}</span>`;
        });
      }
      return str;
    };

    if (locale === "american-to-british") {
      translatedText = translateByDictionary(translatedText, americanOnly);
      translatedText = translateByDictionary(
        translatedText,
        americanToBritishSpelling
      );
      translatedText = translateByDictionary(
        translatedText,
        americanToBritishTitles
      );
    } else if (locale === "british-to-american") {
      translatedText = translateByDictionary(translatedText, britishOnly);
      // Use the reverseDictionary function to reverse spellings and titles
      const britishToAmericanSpelling = this.reverseDictionary(
        americanToBritishSpelling
      );
      translatedText = translateByDictionary(
        translatedText,
        britishToAmericanSpelling
      );
      const britishToAmericanTitles = this.reverseDictionary(
        americanToBritishTitles
      );
      translatedText = translateByDictionary(
        translatedText,
        britishToAmericanTitles
      );
    }
    // If no translation occurred, return the message
    if (translatedText === originalText) {
      return 'Everything looks good to me!';
    }

    return translatedText;
  }

  // Reverses the key-value pairs of an object
  reverseDictionary(dictionary) {
    return Object.fromEntries(
      Object.entries(dictionary).map(([key, value]) => [value, key])
    );
  }
}

module.exports = Translator;
