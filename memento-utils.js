/**
 * MEMENTO DATABASE UTILITIES
 * A collection of helper functions for formatting, UI logic, and array manipulation.
 */

var defaultBackColor = "#434343";


/**
 * Chainable Date Formatter (Day.js style)
 * * How to call it:
 * formatDate("2026-04-15").locale("el").format("DD MMMM YYYY");
 */
function formatDate(dateInput) {
    // 1. Create an object that will hold our data (the state)
    var instance = {
        // Store the date and the default locale ("el")
        _date: dateInput ? new Date(dateInput) : new Date(),
        _locale: "el",

        // 2. The locale() method changes the language
        locale: function(lang) {
            this._locale = lang;
            return this; // <--- THIS IS THE SECRET FOR CHAINING! 
                         // It returns the object itself so you can call format() next.
        },

        // 3. The format() method calculates and returns THE STRING (end of chain)
        format: function(formatString) {
            // If no format is provided, set a default one
            var fmt = formatString || "DD MMMM YYYY";

            // If the date is invalid, terminate here
            if (isNaN(this._date.getTime())) return "Invalid Date";

            // Our dictionaries for languages
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

            // Choose the correct dictionary based on the _locale stored in the object
            var lang = languages[this._locale] || languages["en"];
            
            var d = this._date;
            var DD = ("0" + d.getDate()).slice(-2);
            var MM = ("0" + (d.getMonth() + 1)).slice(-2);
            var YYYY = d.getFullYear();
            var YY = String(YYYY).slice(-2);
            
            var dddd = lang.daysFull[d.getDay()];
            var ddd = lang.daysShort[d.getDay()];
            
            // Logic for nominative / genitive case (Greek grammar)
            var monthName;
            if (this._locale === "el" && fmt.indexOf("DD") > -1) {
                monthName = lang.monthsGen[d.getMonth()];
            } else {
                monthName = lang.monthsNom[d.getMonth()];
            }

            // Replace tokens in the string
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

    // At the end of "formatDate", we return the whole object we created
    return instance;
}


/**
 * Adds a specific number of days to a date.
 * @param {any} dateInput - The starting date.
 * @param {number} days - Number of days to add (can be negative).
 * @returns {Date} - The new Date object.
 */
function addDays(dateInput, days) {
    var result = new Date(dateInput);
    result.setDate(result.getDate() + days);
    return result;
}


/**
 * Calculates the difference in days between two dates.
 * @param {any} d1 - First date.
 * @param {any} d2 - Second date.
 * @returns {number} - Absolute number of days.
 */
function diffInDays(d1, d2) {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}


/**
 * Gets the full name of the day in Greek.
 * @param {any} dateInput - The date value.
 * @returns {string} - Full Greek day name.
 */
function getGreekDay(dateInput) {
    return formatDate(dateInput, "dddd", "el");
}


/**
 * Gets the full name of the month in Greek.
 * @param {any} dateInput - The date value.
 * @returns {string} - Full Greek month name.
 */
function getGreekMonth(dateInput) {
    return formatDate(dateInput, "MMMM", "el");
}


/**
 * Calculates age in years based on a birth date.
 * @param {any} birthDate - The date of birth.
 * @returns {number} - The age in years.
 */
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


/**
 * Formats a numeric value into a Euro currency string.
 * @param {number|string} amount - The numeric value.
 * @param {boolean} includeSymbol - Append ' €' symbol (default: true).
 * @returns {string} - Formatted currency string.
 */
function formatEuro(amount, includeSymbol) {
    if (includeSymbol === undefined) includeSymbol = true;
    var numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return "0,00" + (includeSymbol ? " €" : "");

    var result = numericAmount.toFixed(2).toString().replace('.', ',');
    result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return includeSymbol ? result + " €" : result;
}


/**
 * Sets the entry background color based on a condition.
 * @param {object} e - The Memento entry object.
 * @param {boolean} status - The condition (true/false).
 * @param {string} colorCode - Optional hex color (default: "#434343").
 */
function setEntryColor(e, status, colorCode) {
    var finalColor = status ? (colorCode || defaultBackColor) : null;
    e.set("Background Color", finalColor);
}


/**
 * Sorts an array of strings alphabetically and joins them.
 * Useful for Multi-choice fields in Memento.
 * @param {array} list - The array from a Multi-choice field.
 * @param {string} separator - The character to join with (default: ", ").
 * @param {boolean} reverse - If true, sorts Z-A (default: false).
 * @returns {string} - The sorted and joined string.
 */
function sortAndJoin(list, separator, reverse) {
    if (!list || !Array.isArray(list)) return "";
    
    separator = separator || ", ";
    
    var sorted = list.sort(function(a, b) {
        return reverse ? b.localeCompare(a, 'el') : a.localeCompare(b, 'el');
    });

    return sorted.join(separator);
}
