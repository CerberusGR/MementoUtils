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

### formatDate(date, format, locale)
Formats any Memento date field into a readable string. It handles Greek grammar rules (Nominative vs. Genitive case) automatically.

#### Arguments
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`date`**  | Date/Number | Required | The date value from a Memento field. |
| **`format`**  | String | "DD MMMM YYYY"  | The desired output pattern. |
| **`locale`**  | String | "el" | Language code: "el" (Greek) or "en" (English). |

#### Supported Tokens
| Token | Description | Example |
| :--- | :--- | :--- |
| dddd | Full day name | Wednesday / Τετάρτη |
| ddd | Short day name | Wed / Τετ |
| DD | Day of month with leading zero | 01-31 |
| MMMM | Full month name | April / Απριλίου |
| MM | Month number | 01-12 |
| YYYY | 4-digit year | 2026 |
| YY | 2-digit year | 26 |

#### Usage Examples
```Javascript
var d = field("MyDate");

// Greek Default: "02 Απριλίου 2026"
formatDate(d);

// Greek Custom: "Τετ, 02/04/26"
formatDate(d, "ddd, DD/MM/YY");

// English: "Wednesday, 02 April 2026"
formatDate(d, "dddd, DD MMMM YYYY", "en");
```

&nbsp;
## 💶 Number and Currency Formatting (number-utils.js)

### formatEuro(amount, includeSymbol)
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
```JavaScript
var price = field("Amount");

// Standard: "1.500,00 €"
formatEuro(price);

// Number only: "1.500,00"
formatEuro(price, false);
```

#### Features
Forces 2 decimal places.<br>
Replaces decimal dot (.) with comma (,).<br>
Adds a dot (.) as a thousands separator.<br>

&nbsp;
## 🛠 Maintenance
To add more languages or formatting rules, simply update the languages object in date-utils.js. All changes pushed to GitHub will be available to your Memento libraries upon sync.

