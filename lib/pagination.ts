const MAX_PAGES_TO_SHOW = 3;

export const getPageNumbers = (totalPages: number, currentPage: number) => {
  if (totalPages <= MAX_PAGES_TO_SHOW) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const halfRange = Math.floor(MAX_PAGES_TO_SHOW / 2);
  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, currentPage + halfRange);

  if (currentPage <= halfRange) {
    endPage = MAX_PAGES_TO_SHOW;
  } else if (currentPage >= totalPages - halfRange) {
    startPage = totalPages - MAX_PAGES_TO_SHOW + 1;
  }

  const pages: (number | 'start-ellipsis' | 'end-ellipsis')[] = [];

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push('start-ellipsis');
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push('end-ellipsis');
    }
    pages.push(totalPages);
  }

  return pages;
};
