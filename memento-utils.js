/**
 * MEMENTO DATABASE UTILITIES
 * A collection of helper functions for formatting, UI logic, and array manipulation.
 */

var defaultBackColor = "#434343";

// ==========================================
// DATE UTILITIES
// ==========================================

/**
 * Chainable Date Formatter (Day.js style)
 */
function formatDate(dateInput) {
    var instance = {
        _date: dateInput ? new Date(dateInput) : new Date(),
        _locale: "el",

        locale: function(lang) {
            this._locale = lang;
            return this;
        },

        format: function(formatString) {
            var fmt = formatString || "DD MMMM YYYY";
            if (isNaN(this._date.getTime())) return "Invalid Date";

            var languages = {
                "el": {
                    daysFull: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"],
                    daysShort: ["Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"],
                    monthsNom: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
                    monthsGen: ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"]
                },
                "en": {
                    daysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    monthsNom: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthsGen: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                }
            };

            var lang = languages[this._locale] || languages["en"];
            var d = this._date;
            var DD = ("0" + d.getDate()).slice(-2);
            var MM = ("0" + (d.getMonth() + 1)).slice(-2);
            var YYYY = d.getFullYear();
            var YY = String(YYYY).slice(-2);
            
            var dddd = lang.daysFull[d.getDay()];
            var ddd = lang.daysShort[d.getDay()];
            
            var monthName;
            if (this._locale === "el" && fmt.indexOf("DD") > -1) {
                monthName = lang.monthsGen[d.getMonth()];
            } else {
                monthName = lang.monthsNom[d.getMonth()];
            }

            return fmt
                .replace(/dddd/g, dddd)
                .replace(/ddd/g, ddd)
                .replace(/DD/g, DD)
                .replace(/MMMM/g, monthName)
                .replace(/MM/g, MM)
                .replace(/YYYY/g, YYYY)
                .replace(/YY/g, YY);
        }
    };
    return instance;
}

function addDays(dateInput, days) {
    var result = new Date(dateInput);
    result.setDate(result.getDate() + days);
    return result;
}

function diffInDays(d1, d2) {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getGreekDay(dateInput) {
    return formatDate(dateInput).locale("el").format("dddd");
}

function getGreekMonth(dateInput) {
    return formatDate(dateInput).locale("el").format("MMMM");
}

function getAge(birthDate) {
    if (!birthDate) return 0;
    var today = new Date();
    var birth = new Date(birthDate);
    var age = today.getFullYear() - birth.getFullYear();
    var monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// ==========================================
// CURRENCY UTILITIES
// ==========================================

function formatEuro(amount, includeSymbol) {
    if (includeSymbol === undefined) includeSymbol = true;
    var numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return "0,00" + (includeSymbol ? " €" : "");

    var result = numericAmount.toFixed(2).toString().replace('.', ',');
    result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return includeSymbol ? result + " €" : result;
}

// ==========================================
// UI UTILITIES
// ==========================================

function setEntryColor(e, status, colorCode) {
    var finalColor = status ? (colorCode || defaultBackColor) : null;
    e.set("Background Color", finalColor);
}

// ==========================================
// ARRAY UTILITIES
// ==========================================

function sortAndJoin(list, separator, reverse) {
    if (!list || !Array.isArray(list)) return "";
    separator = separator || ", ";
    var sorted = list.sort(function(a, b) {
        return reverse ? b.localeCompare(a, 'el') : a.localeCompare(b, 'el');
    });
    return sorted.join(separator);
}

// ==========================================
// SEARCH & STRING UTILITIES
// ==========================================

/**
 * Removes Greek accents from a string.
 */
function removeAccents2(str) {
    if (!str) return "";
    var s = String(str);
    var accents = {
        'ά':'α', 'έ':'ε', 'ή':'η', 'ί':'ι', 'ό':'ο', 'ύ':'υ', 'ώ':'ω',
        'Ά':'Α', 'Έ':'Ε', 'Ή':'Η', 'Ί':'Ι', 'Ό':'Ο', 'Ύ':'Υ', 'Ώ':'Ω',
        'ϊ':'ι', 'ϋ':'υ', 'ΐ':'ι', 'ΰ':'υ'
    };
    return s.replace(/[άέήίόύώΆΈΉΊΌΎΏϊϋΐΰ]/g, function(match) {
        return accents[match];
    });
}

/**
 * Builds a search index string from multiple fields.
 * Aggressively parses Memento Java Lists and Entry Objects.
 * Joins them with a newline and removes accents.
 * @returns {string} - The formatted search index.
 */
function buildSearchIndex2() {
    var values = [];

    function extractText(item) {
        if (item === null || item === undefined || item === "") return "";
        
        // 1. Ημερομηνίες
        if (item instanceof Date || (item && item.getTime)) {
            return ("0" + item.getDate()).slice(-2) + "/" + ("0" + (item.getMonth() + 1)).slice(-2) + "/" + item.getFullYear();
        }

        // 2. Λίστες (Multi-choice / Links)
        var temp = [];
        if (Array.isArray(item)) {
            for (var i = 0; i < item.length; i++) temp.push(extractText(item[i]));
            return temp.filter(Boolean).join(", ");
        } 
        
        if (item && item.size && item.get) {
            var len = (typeof item.size === 'function') ? item.size() : item.size;
            for (var j = 0; j < len; j++) temp.push(extractText(item.get(j)));
            return temp.filter(Boolean).join(", ");
        }

        // 3. Embedded Objects & Entry Links (Το κρίσιμο σημείο)
        if (typeof item === 'object') {
            // Δοκιμάζουμε όλες τις πιθανές ιδιότητες που χρησιμοποιεί το Memento για κείμενο
            if (item.description) return extractText(item.description);
            if (item.title) return extractText(item.title);
            if (item.name) return extractText(item.name);
            
            // Αν είναι embedded, μερικές φορές το String(item) επιστρέφει το κείμενο που βλέπεις στην οθόνη
            var sObj = String(item);
            if (sObj !== "[object Object]" && sObj.indexOf("com.luckydroid") === -1 && sObj !== "object Entry") {
                return sObj;
            }
        }

        // 4. Απλό κείμενο
        var s = String(item);
        if (s.charAt(0) === '[' && s.charAt(s.length - 1) === ']') s = s.substring(1, s.length - 1);
        if (s.indexOf("com.luckydroid") > -1 || s === "[object Object]" || s === "object Entry") return "";
        
        return s.trim();
    }

    for (var arg = 0; arg < arguments.length; arg++) {
        var val = extractText(arguments[arg]);
        if (val) values.push(removeAccents(val));
    }
    return values.join("\n");
}




//=============================================================

/**
 * Extracts a readable string from any Memento value type.
 * Handles Java Lists, Entry objects, arrays, numbers and plain text.
 * @param {*} val - The value to extract a string from.
 * @returns {string[]} - Array of extracted strings.
 */
function extractValues(val) {
  var result = [];

  if (val === null || val === undefined || val === '') return result;

  // Handle JavaScript arrays and Memento Java Lists
  if (Array.isArray(val) || (typeof val === 'object' && typeof val.size === 'function')) {
    var size = Array.isArray(val) ? val.length : val.size();
    for (var j = 0; j < size; j++) {
      var item = Array.isArray(val) ? val[j] : val.get(j);
      var sub = extractValues(item); // Recursive για nested objects
      for (var k = 0; k < sub.length; k++) result.push(sub[k]);
    }
  }
  // Handle Entry objects (linked library entries) - [object Entry]
  else if (typeof val === 'object' && typeof val.title === 'function') {
    var t = val.title();
    if (t) result.push(t.toString().trim());
  }
  // Handle Entry objects with name() instead of title()
  else if (typeof val === 'object' && typeof val.name === 'function') {
    var n = val.name();
    if (n) result.push(n.toString().trim());
  }
  // Handle generic objects - try to find any useful string method
  else if (typeof val === 'object') {
    var s = val.toString();
    // Skip useless toString results
    if (s && s.indexOf('[object') === -1) {
      result.push(s.trim());
    }
  }
  // Handle numbers and currency
  else if (typeof val === 'number') {
    result.push(val.toString());
  }
  // Handle plain text
  else {
    result.push(val.toString().trim());
  }

  return result;
}

var UTILS_VERSION = '1.0.3';

/**
 * Returns the current version of the utils library.
 * @returns {string} - The version string.
 */
function getVersion() {
  return 'utils v' + UTILS_VERSION;
}

/**
 * Removes Greek accent characters from a string.
 * Converts accented Greek vowels to their unaccented equivalents.
 * @param {string} str - The input string.
 * @returns {string} - The string without accents.
 */
function removeAccents(str) {
  if (!str) return '';
  var accents = {
    'ά':'α','έ':'ε','ή':'η','ί':'ι','ό':'ο','ύ':'υ','ώ':'ω',
    'Ά':'Α','Έ':'Ε','Ή':'Η','Ί':'Ι','Ό':'Ο','Ύ':'Υ','Ώ':'Ω',
    'ϊ':'ι','ϋ':'υ','ΐ':'ι','ΰ':'υ'
  };
  return str.toString().replace(/[άέήίόύώΆΈΉΊΌΎΏϊϋΐΰ]/g, function(c) {
    return accents[c] || c;
  });
}

/**
 * Builds a search index string from multiple fields.
 * Aggressively parses Memento Java Lists and Entry Objects.
 * Joins all values with newlines and removes accents.
 * Supports text, number, currency, array and list field types.
 * Accepts any number of field name arguments.
 * @param {...string} arguments - Any number of field names.
 * @returns {string} - The formatted search index string, prepended with version.
 */
function buildSearchIndex() {
  var lines = [];

  // Accept any number of arguments as field names
  var fieldNames = Array.prototype.slice.call(arguments);

  for (var i = 0; i < fieldNames.length; i++) {
    var val = field(fieldNames[i]);
    var extracted = extractValues(val);

    for (var j = 0; j < extracted.length; j++) {
      var cleaned = removeAccents(extracted[j]);
      if (cleaned) lines.push(cleaned);
    }
  }

  // Prepend version header to output
  lines.unshift(getVersion());

  return lines.join('\n');
}


function debugField(fieldName) {
  var val = field(fieldName);
  var info = [];
  
  info.push('field: ' + fieldName);
  info.push('typeof: ' + typeof val);
  info.push('toString: ' + val);
  info.push('isArray: ' + Array.isArray(val));
  
  if (typeof val === 'object' && val !== null) {
    info.push('has size(): ' + (typeof val.size === 'function'));
    info.push('has get(): ' + (typeof val.get === 'function'));
    info.push('has length: ' + (val.length !== undefined));
    info.push('has title(): ' + (typeof val.title === 'function'));
    info.push('has forEach(): ' + (typeof val.forEach === 'function'));
    info.push('has iterator(): ' + (typeof val.iterator === 'function'));
    
    // Αν έχει size, δες το πρώτο στοιχείο
    if (typeof val.size === 'function' && val.size() > 0) {
      var first = val.get(0);
      info.push('first item typeof: ' + typeof first);
      info.push('first item toString: ' + first);
      info.push('first has title(): ' + (typeof first.title === 'function'));
    }
  }
  
  return info.join('\n');
}
