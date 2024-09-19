const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  // Function to reverse the American-to-British spellings and titles mapping
  getBritishToAmerican(dictionary) {
    return Object.fromEntries(
      Object.entries(dictionary).map(([us, uk]) => [uk, us])
    );
  }
  
  // Choose the correct dictionary based on locale
  translate(text, locale) {
    let translatedText = text;
    let originalText = text; // Save the original text for comparison

    // Helper function to translate based on dictionary and wrap with <span> tags
    const translateByDictionary = (str, dictionary) => {
      for (const [usWord, ukWord] of Object.entries(dictionary)) {
        // const regex = new RegExp(`\\b${usWord}\\b`, "gi")
        // Ensure it handles periods correctly
        const regex = new RegExp(`\\b${usWord.replace('.', '\\.')}(?=\\b|\\s|$)`, 'gi');
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

    // Helper function to handle time translation
    const translateTime = (str, locality) => {
      // Regex to detect time format (e.g., 10:30 or 10.30)
      const americanTimeRegex = /(\b\d{1,2}):(\d{2}\b)/g;
      const britishTimeRegex = /(\b\d{1,2})\.(\d{2}\b)/g;

      if (locality === "american-to-british") {
        return str.replace(americanTimeRegex, (match, hours, minutes) => {
          return `<span class="highlight">${hours}.${minutes}</span>`;
        });
      } else if (locality === "british-to-american") {
        return str.replace(britishTimeRegex, (match, hours, minutes) => {
          return `<span class="highlight">${hours}:${minutes}</span>`;
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
      translatedText = translateTime(translatedText, locale);
    } else if (locale === "british-to-american") {
      translatedText = translateByDictionary(translatedText, britishOnly);
      // Use the reverseDictionary function to reverse spellings and titles
      const britishToAmericanSpelling = this.getBritishToAmerican(
        americanToBritishSpelling
      );
      translatedText = translateByDictionary(
        translatedText,
        britishToAmericanSpelling
      );
      const britishToAmericanTitle = this.getBritishToAmerican(
        americanToBritishTitles
      );
      translatedText = translateByDictionary(
        translatedText,
        britishToAmericanTitle
      );
      translatedText = translateTime(translatedText, locale);
    }
    // If no translation occurred, return the message
    if (translatedText === originalText) {
      return "Everything looks good to me!";
    }

    return translatedText;
  }
}

module.exports = Translator;
