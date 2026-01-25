export function getPagination(
  current: number,
  total: number,
  maxVisiblePages = 5,
): (string | number)[] {
  const pagination: (string | number)[] = [];
  if (total <= maxVisiblePages) {
    for (let i = 1; i <= total; i++) {
      pagination.push(i);
    }
  } else {
    pagination.push(1);
    const startPage = Math.max(current - 1, 2);
    const endPage = Math.min(current + 1, total - 1);
    if (startPage > 2) {
      pagination.push("...");
    }
    for (let i = startPage; i <= endPage; i++) {
      pagination.push(i);
    }
    if (endPage < total - 1) {
      pagination.push("...");
    }
    pagination.push(total);
  }
  return pagination;
}
