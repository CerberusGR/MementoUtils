/**
 * MEMENTO DATABASE UTILITIES
 * A collection of helper functions for formatting, UI logic, and array manipulation.
 */



// Function to check if the current value of a specific field already exists
function checkDuplicate(thisEntry, fieldName) {
    // Get the value the user just typed
    var currentValue = thisEntry.field(fieldName);
    message(currentValue)
    // If the field is empty, there's nothing to check
    if (!currentValue) {
message('empty ')
        return false; 
    }

    var currentLib = lib();
    var allEntries = currentLib.entries();
    
    // Get current entry ID to avoid comparing the entry to itself during an Edit
    var currentEntry = entry();
    var currentId = currentEntry ? currentEntry.id : null; 

    // Loop through all saved entries
    for (var i = 0; i < allEntries.length; i++) {
        var savedEntry = allEntries[i];
        
        // Skip the exact same entry
        if (currentId && savedEntry.id === currentId) {
            continue;
        }
        
        // Get the value of the saved entry for the given field
        var savedValue = savedEntry.field(fieldName);
        
        // Compare values (case-insensitive)
        if (savedValue && savedValue.toLowerCase() === currentValue.toLowerCase()) {
            return true; // Duplicate found!
        }
    }
    
    return false; // No duplicates found
}



// Function to clear or empty multiple fields
function clearFields(fieldNames) {
    // Ensure the input is a valid array
    if (!fieldNames || fieldNames.length === undefined) {
        return; // Exit if no valid array is provided
    }

    // Loop through each field name in the array
    for (var i = 0; i < fieldNames.length; i++) {
        var currentField = fieldNames[i];
        
        // Set the field's value to null (which empties it completely)
        entry().set(currentField, null);
        
        // NOTE: If you literally want the number 0 instead of an empty field, 
        // change the line above to: entry().set(currentField, 0);
    }
}

// ---------------------------------------------------------
// HOW TO USE IT (ΠΑΡΑΔΕΙΓΜΑ):
// ---------------------------------------------------------

// 1. Create an array with the exact names of the fields you want to clear
//var fieldsToReset = ["Ποσό Εξόδου", "Προτεινόμενη Κατηγορία", "Σχόλιο"];

// 2. Call the function
//clearFields(fieldsToReset);




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
    // Handle empty or null inputs
    if (!list) return "";
    
    // Set default separator if not provided
    separator = separator || ", ";
    
    var jsArray = [];

    // Check if Memento returned a single comma-separated string
    if (typeof list === 'string') {
        jsArray = list.split(',');
    } else if (list.length !== undefined) {
        // Handle Memento array-like objects by pushing elements to a native JS array
        for (var i = 0; i < list.length; i++) {
            jsArray.push(list[i]);
        }
    } else {
        // If it's neither a string nor an array-like object, return the fallback
        return "";
    }

    // Clean up whitespace and sort the native JS array
    var sorted = jsArray.map(function(item) {
        return String(item).trim();
    }).sort(function(a, b) {
        return reverse ? b.localeCompare(a, 'el') : a.localeCompare(b, 'el');
    });

    // Return the joined string
    return sorted.join(separator);
}


// Universal function to safely read data from ANY linked field
function getLinkedField(linkName, index, targetName) {
    // Get the array of linked entries, fallback to an empty array
    var linkedEntries = field(linkName) || [];
    
    // Check if the requested index exists and grab the entry
    var targetEntry = linkedEntries.length > index ? linkedEntries[index] : null;
    
    // Return the specific field value, or null if the entry is missing
    return targetEntry ? targetEntry.field(targetName) : null;
}

// ---------------------------------------------------------
// HOW TO USE IT (ΠΑΡΑΔΕΙΓΜΑΤΑ):
// ---------------------------------------------------------

// 1. Get the company name from the 1st job (Index 0)
//var companyName = getLinkedField("Θέση Εργασίας", 0, "Επωνυμία / Επώνυμο");

// 2. Get the city from the 2nd address (Index 1) - if it exists!
//var secondCity = getLinkedField("Διευθύνσεις", 1, "Πόλη");

// 3. Get the phone number from the 1st linked contact
//var firstPhone = getLinkedField("Επαφές", 0, "Τηλέφωνο");

// Return whatever you need for this specific script
//companyName;




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
var UTILS_VERSION = '1.0.4';

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
 * Extracts a readable string from a single Memento list/array item.
 * Handles: plain values, multiselect objects (via key), linked Entry objects (via fieldName).
 * @param {*} item - The list item to extract.
 * @param {string|null} key - Property key for multiselect objects (e.g. 'Κατάσταση').
 * @param {string|null} entryField - Field name for linked Entry objects (e.g. 'Name').
 * @returns {string} - Extracted string or empty string if not resolvable.
 */
function extractItem(item, key, entryField) {
  if (item === null || item === undefined) return '';

  // Plain string or number
  if (typeof item !== 'object') return item.toString().trim();

  // Multiselect object: access via key (e.g. item['Κατάσταση'])
  if (key && item[key] !== undefined && item[key] !== null) {
    return item[key].toString().trim();
  }

  // Linked Entry object: access via field()
  if (entryField && typeof item.field === 'function') {
    var val = item.field(entryField);
    if (val !== null && val !== undefined) return val.toString().trim();
  }

  return '';
}

/**
 * Builds a search index string from multiple fields.
 * Aggressively parses Memento Java Lists, multiselect objects and Entry objects.
 * Joins all values with newlines and removes accents.
 * Supports text, number, currency, array, list, multiselect and linked entry field types.
 *
 * Each argument can be:
 *   - A string: field name (plain text, number, currency)
 *   - An object: { field, key } for multiselect lists
 *   - An object: { field, entryField } for linked entry lists
 *
 * @param {...string|Object} arguments - Field descriptors.
 * @returns {string} - The formatted search index string, prepended with version.
 *
 * @example
 * buildSearchIndex(
 *   'Name',
 *   'Amount',
 *   { field: 'Κατάσταση', key: 'Κατάσταση' },
 *   { field: 'Εργασίες', entryField: 'Title' }
 * )
 */
function buildSearchIndex() {
  var lines = [];
  var args = Array.prototype.slice.call(arguments);

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    var fieldName, key, entryField;

    // Resolve argument type
    if (typeof arg === 'string') {
      fieldName   = arg;
      key         = null;
      entryField  = null;
    } else if (typeof arg === 'object' && arg.field) {
      fieldName   = arg.field;
      key         = arg.key        || null;
      entryField  = arg.entryField || null;
    } else {
      continue;
    }

    var val = field(fieldName);
    if (val === null || val === undefined || val === '') continue;

    // Handle Memento Java Lists (has size() and get())
    if (typeof val === 'object' && typeof val.size === 'function') {
      var size = val.size();
      for (var j = 0; j < size; j++) {
        var item    = val.get(j);
        var cleaned = removeAccents(extractItem(item, key, entryField));
        if (cleaned) lines.push(cleaned);
      }
    }
    // Handle plain JavaScript arrays
    else if (Array.isArray(val)) {
      for (var j = 0; j < val.length; j++) {
        var cleaned = removeAccents(extractItem(val[j], key, entryField));
        if (cleaned) lines.push(cleaned);
      }
    }
    // Handle numbers and currency (skip accent removal)
    else if (typeof val === 'number') {
      lines.push(val.toString());
    }
    // Handle plain text
    else {
      lines.push(removeAccents(val.toString().trim()));
    }
  }

  // Prepend version header to output
  lines.unshift(getVersion());

  return lines.join('\n');
}
