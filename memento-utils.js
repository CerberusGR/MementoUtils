/**
 * MEMENTO DATABASE UTILITIES
 * A collection of helper functions for formatting, UI logic, and array manipulation.
 */

var defaultBackColor = "#434343";


/**
 * Formats a date string or timestamp into a readable string.
 * Smart version: Automatically detects if the second argument is a locale.
 * @param {any} dateInput - The date value from Memento.
 * @param {string} format - The desired format (default: "DD MMMM YYYY").
 * @param {string} locale - The language code (default: "el").
 * @returns {string} - The formatted date string.
 */
function formatDate(dateInput, format, locale) {
    var defaultFormat = "DD MMMM YYYY";
    var defaultLocale = "el";

    if (arguments.length === 2 && typeof format === "string" && format.length === 2) {
        locale = format;
        format = defaultFormat;
    } else {
        format = format || defaultFormat;
        locale = locale || defaultLocale;
    }

    if (!dateInput) return "";
    var d = new Date(dateInput);
    if (isNaN(d.getTime())) return "Invalid Date";

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

    var lang = languages[locale] || languages["en"];
    var DD = ("0" + d.getDate()).slice(-2);
    var MM = ("0" + (d.getMonth() + 1)).slice(-2);
    var YYYY = d.getFullYear();
    var YY = String(YYYY).slice(-2);
    
    var dddd = lang.daysFull[d.getDay()];
    var ddd = lang.daysShort[d.getDay()];
    
    var monthName;
    if (locale === "el" && format.indexOf("DD") > -1) {
        monthName = lang.monthsGen[d.getMonth()];
    } else {
        monthName = lang.monthsNom[d.getMonth()];
    }

    return format
        .replace(/dddd/g, dddd)
        .replace(/ddd/g, ddd)
        .replace(/DD/g, DD)
        .replace(/MMMM/g, monthName)
        .replace(/MM/g, MM)
        .replace(/YYYY/g, YYYY)
        .replace(/YY/g, YY);
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
