# Memento Database Utilities

A collection of lightweight JavaScript utilities specifically designed for **Memento Database**. This library helps you format dates in Greek and English and display currency values correctly within your Memento fields.

## 🚀 Installation

1. Open your **Memento Database** (Desktop or Pro version).
2. Go to **Settings** > **Scripts**.
3. Click on **Add Repository**.
4. Link your local folder (synced with this GitHub repo) or provide the repository URL.


## 📅 Date Formatting: formatDate(date, format, locale)
Formats any Memento date field into a readable string. It handles Greek grammar rules (Nominative vs. Genitive case) automatically.

### Arguments
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| dateInput | Date/Number | Required | The date value from a Memento field. |
| format | String | "DD MMMM YYYY"  | The desired output pattern. |
| locale | String | "el" | Language code: "el" (Greek) or "en" (English). |

### Supported Tokens
| Token | Description | Example |
| :--- | :--- | :--- |
| dddd | Full day name | Wednesday / Τετάρτη |
| ddd | Short day name | Wed / Τετ |
| DD | Day of month with leading zero | 01-31 |
| MMMM | Full month name | April / Απριλίου |
| MM | Month number | 01-12 |
| YYYY | 4-digit year | 2026 |
| YY | 2-digit year | 26 |

#### Usage Examples - JavaScript
var d = field("MyDate");

// Greek Default: "02 Απριλίου 2026"
formatDate(d);

// Greek Custom: "Τετ, 02/04/26"
formatDate(d, "ddd, DD/MM/YY");

// English: "Wednesday, 02 April 2026"
formatDate(d, "dddd, DD MMMM YYYY", "en");


# 💶 Currency Formatting: formatEuro(amount, includeSymbol)
Formats numeric values into the standard European/Greek currency format (1.250,50 €).

# Arguments
Parameter        Type             Default     Description
amount           Number/String    Required    The numeric value to format.
includeSymbol    Boolean          true        Append the ' €' symbol to the end.

# Features
Forces 2 decimal places.
Replaces decimal dot (.) with comma (,).
Adds a dot (.) as a thousands separator.

# Usage Examples - JavaScript
var price = field("Amount");

// Standard: "1.500,00 €"
formatEuro(price);

// Number only: "1.500,00"
formatEuro(price, false);

# 🛠 Maintenance
To add more languages or formatting rules, simply update the languages object in date-utils.js. All changes pushed to GitHub will be available to your Memento libraries upon sync.


### Μικρό tip για το GitHub:
Αν το αρχείο των ημερομηνιών το ονομάσεις `date-utils.js` και των χρημάτων `number-utils.js`, ο κώδικας στο README θα δουλεύει ακριβώς όπως τον έγραψα.

Είσαι έτοιμος να το "ανεβάσεις"! Θέλεις βοήθεια με κάτι άλλο στο Repository;
