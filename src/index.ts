export interface IPaginationInfo {
  leftItems: PageInfo[];
  leftSeparator: boolean;
  centerItems: PageInfo[];
  rightSeparator: boolean;
  rightItems: PageInfo[];
  nextPage: number;
  prevPage: number;
  lastPage: number;
  firstPage: number;
}
export type PageInfo = {
  pageNo: number;
  isActive: boolean;
};

/**
 * @typedef {Object} PageInfo
 * @property {number} pageNo - The page number.
 * @property {boolean} isActive - Indicates whether the page is the current active page.
 */

/**
 * @typedef {Object} IPaginationInfo
 * @property {PageInfo[]} leftItems - An array of page information objects representing pages to the left of the current page.
 * @property {boolean} leftSeparator - Indicates whether a separator should be displayed to the left of the current page.
 * @property {PageInfo[]} centerItems - An array of page information objects representing sibling pages around the current page.
 * @property {boolean} rightSeparator - Indicates whether a separator should be displayed to the right of the current page.
 * @property {PageInfo[]} rightItems - An array of page information objects representing pages to the right of the current page.
 * @property {number} nextPage - The page number of the next page, or the total number of pages if there is no next page.
 * @property {number} prevPage - The page number of the previous page, or 1 if there is no previous page.
 * @property {number} firstPage - The page number of the first page.
 * @property {number} lastPage - The page number of the last page.
 */

/**
 * Generates pagination information for a list of items.
 * @param {Object} options - Configuration options for pagination.
 * @param {number} [options.currentPage=1] - The current page number.
 * @param {number} options.totalItems - The total number of items that need to be paginated.
 * @param {number} options.itemsPerPage - The number of items to display per page.
 * @param {number} [options.siblingsCount=1] - The number of sibling pages to show on each side of the current page.
 * @param {number} [options.boundaries=1] - The number of boundary pages to show on each side.
 * @returns {IPaginationInfo} - An object containing pagination information.
 */
export const Paginator = ({
  currentPage,
  totalItems = 1,
  itemsPerPage = 1,
  siblingsCount = 1,
  boundaries = 1,
}: {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  siblingsCount?: number;
  boundaries?: number;
}): IPaginationInfo => {
  const totalPage = Math.ceil(totalItems / itemsPerPage);
  const paginationInfo: IPaginationInfo = {
    leftItems: [],
    leftSeparator: true,
    centerItems: [],
    rightSeparator: true,
    rightItems: [],
    nextPage: currentPage + 1 >= totalPage ? totalPage : currentPage + 1,
    prevPage: currentPage - 1 <= 1 ? 1 : currentPage - 1,
    firstPage: 1,
    lastPage: totalPage,
  };

  if (totalPage <= siblingsCount * 2 + boundaries * 2 + 2) {
    paginationInfo.leftSeparator = false;
    paginationInfo.rightSeparator = false;
    paginationInfo.leftItems = Array.from({ length: totalPage }, (_, index) => {
      const pageNo = index + 1;
      return { pageNo, isActive: currentPage == pageNo };
    });
    return paginationInfo;
  }
  //   check if intersecting left
  if (currentPage - siblingsCount - 1 <= boundaries) {
    paginationInfo.leftSeparator = false;
    paginationInfo.leftItems = Array.from(
      { length: boundaries + siblingsCount * 2 + 2 },
      (_, index) => {
        const pageNo = index + 1;
        return { pageNo, isActive: currentPage == pageNo };
      }
    );
  }
  //   check if intersecting right
  if (currentPage > totalPage - siblingsCount * 2 - boundaries - 1) {
    paginationInfo.rightSeparator = false;
    const startCount = totalPage - siblingsCount * 2 - boundaries - 2;
    paginationInfo.rightItems = Array.from(
      { length: boundaries + siblingsCount * 2 + 2 },
      (_, index) => {
        const pageNo = index + startCount + 1;
        return { pageNo, isActive: currentPage == pageNo };
      }
    );
  }
  // if the current page is in center
  if (paginationInfo.rightSeparator && paginationInfo.leftSeparator) {
    paginationInfo.centerItems = Array.from(
      { length: siblingsCount * 2 + 1 },
      (_, index) => {
        const pageNo = currentPage - siblingsCount + index;
        return { pageNo, isActive: currentPage == pageNo };
      }
    );
  }
  // if not intersecting left add required pages to left
  if (paginationInfo.leftSeparator) {
    paginationInfo.leftItems = Array.from(
      { length: boundaries },
      (_, index) => {
        const pageNo = index + 1;
        return { pageNo, isActive: currentPage == pageNo };
      }
    );
  }

  // if not intersecting right add required pages to right
  if (paginationInfo.rightSeparator) {
    paginationInfo.rightItems = Array.from(
      { length: boundaries },
      (_, index) => {
        const pageNo = totalPage - boundaries + index + 1;
        return { pageNo, isActive: currentPage == pageNo };
      }
    );
  }
  /**
   * @type {IPaginationInfo}
   */
  return paginationInfo;
};
