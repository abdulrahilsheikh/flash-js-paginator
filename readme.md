# Generic Pagination Library

**A Framework-Agnostic Pagination Solution for JavaScript/TypeScript**

The Generic Pagination Library is a versatile and framework-agnostic tool designed to simplify the implementation of pagination features in your web applications. Whether you're building a React, Vue, Angular, or vanilla JavaScript application, this library provides a consistent and powerful solution for pagination component without doing any calculation.

## Features

- **Framework-Agnostic**: This library is designed to work seamlessly with various JavaScript frameworks or vanilla JavaScript projects. You can integrate it into your React, Vue, Angular, or other applications effortlessly.

- **Customizable Components**: This library gives you all the controlls. The only thing you have to make is UI component. Render your own component in your own layout.

- **Automatic Pagination Information**: The library automatically calculates essential pagination information, such as the active current page, total pages, and page numbers. No need to perform manual calculations. You can also specify the siblings count and boundary elements.

- **TypeScript Support**: The library provides TypeScript interfaces and types to ensure type safety and code integrity during integration.

## Installation

You can install the Generic Pagination Library via npm or yarn:

```bash
npm install generic-pagination-library
# or
yarn add generic-pagination-library

```

## Examples

You can find usage codesandbox for react [Generic-js-paginator](https://codesandbox.io/s/fancy-feather-8dgjl7)

You can find usage codesandbox for vue [Generic-js-paginator](https://codesandbox.io/s/compassionate-leftpad-xpstgx?file=/src/main.js)

# Documentation

## Usage

To use the `Paginator` function, you can import it into your project and call it with the desired configuration options. The function returns an object containing pagination information. The following are the available parameters for configuring the pagination:

- `currentPage`: The current page number, with a default value of 1.
- `totalItems`: The total number of items that need to be paginated.
- `itemsPerPage`: The number of items to display per page.
- `siblingsCount` (optional): The number of sibling pages to show on each side of the current page, with a default value of 1.
- `boundaries` (optional): The number of boundary pages to show on each side, with a default value of 1.

Here is an example of how to use the `Paginator` component:

```javascript
import { Paginator } from "generic-js-paginator";

const paginationInfo = Paginator({
  currentPage: 3,
  totalItems: 50,
  itemsPerPage: 10,
  siblingsCount: 2,
  boundaries: 1,
});
```

## Pagination Information Properties

The `paginationInfo` object returned by the `Paginator` component includes the following properties:

### `leftItems`

- Type: Array of PageInfo Objects

The `leftItems` property is an array of page information objects representing the pages to the left of the current page. Each object in this array has the following structure:

- `pageNo`: The page number.
- `isActive`: A boolean indicating whether the page is the current active page.

### `leftSeparator`

- Type: Boolean

The `leftSeparator` property is a boolean that indicates whether a separator should be displayed to the left of the current page. If `true`, you should include a visual separator between rendering the `leftItems` and `centerItems`.

### `centerItems`

- Type: Array of PageInfo Objects

The `centerItems` property is an array of page information objects representing the sibling pages around the current page. Each object in this array has the same structure as the `leftItems` page information objects.

### `rightSeparator`

- Type: Boolean

The `rightSeparator` property is a boolean that indicates whether a separator should be displayed to the right of the current page. If `true`, you should include a visual separator between the `rightItems` and `center-items`.

### `rightItems`

- Type: Array of PageInfo Objects

The `rightItems` property is an array of page information objects representing the pages to the right of the current page. Each object in this array has the same structure as the `leftItems` page information objects.

### `nextPage`

- Type: Number

The `nextPage` property represents the page number of the next page. If the current page is the last page, it will be set to the total number of pages.

### `prevPage`

- Type: Number

The `prevPage` property represents the page number of the previous page. If the current page is the first page, it will be set to 1.

### `firstPage`

- Type: Number

The `firstPage` property represents the page number of the first page in the pagination.

### `lastPage`

- Type: Number

The `lastPage` property represents the page number of the last page in the pagination.

## Example

Here is an example of how you can access and use the values returned by the `Paginator` component:

```javascript
const paginationInfo = Paginator({
  currentPage: 3,
  totalItems: 50,
  itemsPerPage: 10,
  siblingsCount: 2,
  boundaries: 1,
});

// Access individual properties of paginationInfo
const leftItems = paginationInfo.leftItems;
const centerItems = paginationInfo.centerItems;
const rightItems = paginationInfo.rightItems;
const nextPage = paginationInfo.nextPage;
const prevPage = paginationInfo.prevPage;
const firstPage = paginationInfo.firstPage;
const lastPage = paginationInfo.lastPage;
const leftSeparator = paginationInfo.leftSeparator;
const rightSeparator = paginationInfo.rightSeparator;
```

## Contributing

We welcome contributions! Please check our [GitHub Repository](https://github.com/abdulrahilsheikh/generic-js-paginator/issues)

## Bug Reports and Support

If you encounter any issues or need support, please open an issue on the [GitHub Repository](https://github.com/abdulrahilsheikh/generic-js-paginator/issues).

## License

This library is open-source and available under the [MIT License](LICENSE).

![MIT License](https://img.shields.io/badge/license-MIT-blue)

---
