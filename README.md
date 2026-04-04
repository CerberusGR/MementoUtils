# Memento Database Utilities

A collection of lightweight JavaScript utilities specifically designed for **Memento Database**. This library features a modern, Day.js-style chainable API for dates, in Greek and English, perform date calculations, display currency values, and manage UI elements directly within your library scripts.

&nbsp;
## 🚀 Installation

1. Open your **Memento Database** (Desktop or Pro version).
2. Go to **Settings** > **Scripts**.
3. Click on **Add Repository**.
4. Link your local folder (synced with this GitHub repo) or provide the repository URL.


&nbsp;
## 📅 Date Utilities
These functions handle date formatting and calculations with built-in support for Greek grammar (Nominative/Genitive case handling).

### 1. `formatDate(dateInput)` (Chainable API)
Formats any Memento date field using a modern, chainable approach. It includes built-in support for Greek grammar (automatically switching between Nominative and Genitive cases).

#### Arguments
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`dateInput`**  | `Date/Number` | *Required* | The date value from a Memento field. |

#### Chainable Methods
**`.locale(lang)`**: Sets the language ("el" for Greek, "en" for English). Defaults to "el".
**`.format(pattern)`**: Calculates and returns the formatted string. Default pattern is "DD MMMM YYYY".

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

// 1. Default Greek (Outputs: "04 Απριλίου 2026")
formatDate(field("MyDate")).format(); 

// 2. English with default format (Outputs: "04 April 2026")
formatDate(field("MyDate")).locale("en").format(); 

// 3. Custom Format in English (Outputs: "Wednesday, 04 April")
formatDate(field("MyDate")).locale("en").format("dddd, DD MMMM");

// 4. Standalone Month in Greek (Outputs: "Απρίλιος" - Nominative case)
formatDate(field("MyDate")).locale("el").format("MMMM");
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
## 💶 Currency Utilities

### 1. `formatEuro(amount, includeSymbol)`
Formats numeric values into the standard European/Greek currency format (e.g. 1.250,50 €).

#### Arguments
| Parameter | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| **`amount`** | `Number/String` | *Required* | The numeric value you want to format. |
| **`includeSymbol`** | `Boolean` | `true` | If `true`, adds **" €"** at the end. |

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
## 🎨 UI Utilities
### 1. `setEntryColor(entry, status, colorCode)`
Changes the background color of an entry based on a condition.

#### Arguments
| Parameter | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| **`entry`** | `Object` | *Required* | The Memento entry object. |
| **`status`** | `Boolean` | *Required* | The condition to check (`true`/`false`). |
| **`colorCode`** |`String` | "#434343" | Optional hex color code. |

#### Usage Examples
```javascript
// Set to default dark gray if favorite
setEntryColor(entry, field("IsFavorite"));

// Set to custom red if status is Urgent
setEntryColor(entry, field("Status") == "Urgent", "#FF0000");
```

&nbsp;
## 🔗 Array Utilities
### 1. `sortAndJoin(list, separator, reverse)`
Sorts an array (useful for Multi-choice fields) alphabetically with Greek support and joins it into a single string.

#### Arguments
| Parameter | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| **`list`** | `Array` | *Required* | The array to sort. |
| **`separator`** | `String` | ", " | The string used to join the elements. |
| **`reverse`** | `Boolean` | `false` | If `true`, sorts in descending order (Z-A). |

#### Usage Examples
```javascript
// Default A-Z: "Apples, Bananas, Cherries"
sortAndJoin(field("Fruits"));

// Reverse Z-A: "Cherries, Bananas, Apples"
sortAndJoin(field("Fruits"), ", ", true);
```

&nbsp;
## 🛠 Usage Note
Since these functions are defined globally in your Memento environment, you do not need to use require() or exports. Simply copy the code from `memento-utils.js` into your library's scripts and call the functions directly in any JavaScript field. All changes pushed to GitHub will be available to your Memento libraries upon sync.

