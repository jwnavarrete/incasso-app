export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}
