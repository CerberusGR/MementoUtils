# Memento Database Utilities

A collection of lightweight JavaScript utilities specifically designed for **Memento Database**. This library helps you format dates in Greek and English and display currency values correctly within your Memento fields.


&nbsp;
## 🚀 Installation

1. Open your **Memento Database** (Desktop or Pro version).
2. Go to **Settings** > **Scripts**.
3. Click on **Add Repository**.
4. Link your local folder (synced with this GitHub repo) or provide the repository URL.


&nbsp;
## 📅 Date Formatting (date-utils.js)

### 1. `formatDate(dateInput, format, locale)`
Formats any Memento date field into a readable string. It handles Greek grammar rules (Nominative vs. Genitive case) automatically.

#### Arguments
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`dateInput`**  | `Date/Number` | Required | The date value from a Memento field. |
| **`format`**  | `String` | "DD MMMM YYYY"  | The desired output pattern. |
| **`locale`**  | `String` | "el" | Language code: "el" (Greek) or "en" (English). |

#### Supported Tokens
| Token | Description | Example |
| :--- | :--- | :--- |
| **dddd** | Full day name | Wednesday / Τετάρτη |
| **ddd** | Short day name | Wed / Τετ |
| **DD** | Day of month with leading zero | 01-31 |
| **MMMM** | Full month name | April / Απριλίου |
| **MM** | Month number | 01-12 |
| **YYYY** | 4-digit year | 2026 |
| **YY** | 2-digit year | 26 |

#### Usage Examples
```javascript
var d = field("MyDate");

// Greek Default: "02 Απριλίου 2026"
formatDate(d);

// Greek Custom: "Τετ, 02/04/26"
formatDate(d, "ddd, DD/MM/YY");

// English: "Wednesday, 02 April 2026"
formatDate(d, "dddd, DD MMMM YYYY", "en");
```

### 2. `addDays(dateInput, days)`
Adds or subtracts days from a specific date.

#### Arguments
| Parameter | Type | Description |
| :--- | :--- | :--- |
| **`dateInput`** | `Date` | The starting date. |
| **`days`** | `Number` | Number of days to add (use negative for subtraction). |

#### Usage Example
```javascript
// Get the date for 7 days from now
var nextWeek = addDays(new Date(), 7);
```

### 3. `diffInDays(d1, d2)`
Calculates the absolute number of days between two dates.

#### Usage Example:
```javascript
// Result: 5 (if dates are 5 days apart)
diffInDays(field("StartDate"), field("EndDate"));
```

### 4. `getAge(birthDate)`
Calculates current age in years.
```javascript
var userAge = getAge(field("Birthday"));
```

### 5. `getGreekDay(date) & getGreekMonth(date)`
Returns "Τετάρτη" or "Απρίλιος".


&nbsp;
## 💶 Number and Currency Formatting (number-utils.js)

### 1. `formatEuro(amount, includeSymbol)`
Formats numeric values into the standard European/Greek currency format (e.g. 1.250,50 €).

#### Arguments
| Parameter | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| **`amount`** | Number/String | *Required* | The numeric value you want to format. |
| **`includeSymbol`** | Boolean | `true` | If `true`, adds **" €"** at the end. |

#### Examples
| Input | includeSymbol | Result |
| :--- | :---: | :--- |
| `1250.5` | `true` | **1.250,50 €** |
| `1250.5` | `false` | **1.250,50** |

#### Usage Examples
```javaScript
var price = field("Amount");

// Standard: "1.500,00 €"
formatEuro(price);

// Number only: "1.500,00"
formatEuro(price, false);
```

#### Features
1. Forces 2 decimal places.
2. Replaces decimal dot (.) with comma (,).
3. Adds a dot (.) as a thousands separator.

&nbsp;
## 🛠 Maintenance
To add more languages or formatting rules, simply update the languages object in date-utils.js. All changes pushed to GitHub will be available to your Memento libraries upon sync.

