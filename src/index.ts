interface IPaginationInfo {
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
type PageInfo = {
  pageNo: number;
  isActive: boolean;
};

const paginator = ({
  currentPage = 1,
  totalItems = 1,
  itemsPerPage = 1,
  siblingsCount = 1,
  boundaries = 1,
}) => {
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
  return paginationInfo;
};

const pg = paginator({ totalItems: 7, currentPage: 6 });
console.log(pg);
