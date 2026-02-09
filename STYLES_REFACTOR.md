# Styles Refactor Summary

All inline styles have been extracted from components and consolidated into `src/style.css` with semantic class names.

## Class Names and Usage by Component

### Common Styles

- **`.page-bg`** - Page background color (#101720)
  - Used in: `HomePage.jsx`

- **`.error-container`** - Error message container
  - Used in: `CoinPage.jsx` (error state)

---

### Header Component (`Header.jsx`)

- **`.header-top`** - Main header container
  - Properties: flex layout, dark background (#181818), gold text

- **`.header-title`** - "Crypto Tracker" title
  - Properties: auto margin, pointer cursor

- **`.currency-select`** - Currency dropdown
  - Properties: 20px margin, 8px padding, 5px border-radius

- **`.login-btn`** - Login button
  - Properties: gold background, dark text, 6px border-radius

---

### Modal Styles (`Header.jsx`)

- **`.modal-overlay`** - Semi-transparent overlay
  - Properties: fixed position, covers viewport, 60% dark background, flex centered

- **`.modal-content`** - Modal dialog box
  - Properties: dark background (#37353E), padding, border-radius, white text

- **`.modal-close-btn`** - Close button in modal
  - Properties: gold background, dark text, similar to login-btn

---

### Banner Component (`Banner.jsx`)

- **`.banner-container`** - Main banner wrapper
  - Properties: white text, padding, centered

- **`.banner-coins`** - Horizontal scrollable coins list
  - Properties: flex layout, horizontal overflow, 3rem gap

- **`.banner-coin-link`** - Individual coin link in banner
  - Properties: flex column, centered, no underline, uppercase text

- **`.price-change`** - Price change percentage display
  - Base: margin-left 5px
  - **`.price-change.profit`** - Green text for positive change
  - **`.price-change.loss`** - Red text for negative change

---

### Coins Table Component (`CoinsTable.jsx`)

- **`.coins-table-container`** - Main table container
  - Properties: centered text, white text, dark background (#181818), min-height 100vh

- **`.search-input`** - Search input field
  - Properties: 70% width, dark background (#303030), white text, border-radius

- **`.coin-image`** - Coin image in table
  - Properties: vertical-align middle, 8px right margin

- **Table styles** - Reused from original
  - `table`, `th`, `td`, `tr:hover`

- **`.pagination-container`** - Pagination wrapper
  - Properties: 20px top margin

- **`.pagination-btn`** - Individual pagination button
  - Properties: 5px margin, white background, transitions
  - **`.pagination-btn.active`** - Active page button (gray background)

- **Color classes for table cells**
  - **`td.profit`** - Green text for positive values
  - **`td.loss`** - Red text for negative values

---

### Coin Page Component (`CoinPage.jsx`)

- **`.coin-page-container`** - Main coin detail container
  - Properties: 20px padding, dark background (#101720), white text, centered, min-height 100vh

---

### Coin Info Component (`CoinInfo.jsx`)

- **`.coin-info-container`** - Chart and buttons container
  - Properties: 60px top padding

- **`.error-text`** - Error message in chart
  - Properties: red text

- **`.chart-buttons`** - Button group for chart timeframes
  - Properties: 30px top/bottom margin, centered

- **`.chart-btn`** - Individual timeframe button
  - Properties: 20px right margin, padding, border-radius, dark background, white text
  - **`.chart-btn.active`** - Active timeframe button
    - Properties: gold border (2px), darker background (#222)

---

### Error Boundary Component (`ErrorBoundary.jsx`)

- **`.error-boundary-container`** - Error boundary wrapper
  - Properties: centered text, white text, dark background (#181818), 50px padding, min-height 100vh

- **`.error-message`** - Error stack trace display
  - Properties: light red text (#ffb4b4), dark background, padding, border-radius, horizontal scroll

- **`.error-btn`** - "Go Home" button
  - Properties: gold background, dark text, 6px border-radius, margin-top 20px

---

## Files Modified

1. **src/style.css** - Consolidated stylesheet with all extracted styles
2. **src/Pages/HomePage.jsx** - Replaced inline styles with `.page-bg`
3. **src/Pages/CoinPage.jsx** - Replaced inline styles with `.coin-page-container` and `.error-container`
4. **src/components/Header.jsx** - Replaced all header/modal inline styles with class names
5. **src/components/Banner.jsx** - Replaced banner and link styles with class names
6. **src/components/CoinsTable.jsx** - Replaced table and pagination styles with class names
7. **src/components/CoinInfo.jsx** - Replaced chart container and button styles with class names
8. **src/components/ErrorBoundary.jsx** - Replaced error display styles with class names

## Benefits

✅ Cleaner, more maintainable component code
✅ Centralized styling for consistency
✅ Easier to update styles globally
✅ Better separation of concerns
✅ Reduced component bundle size
✅ Improved readability and organization
