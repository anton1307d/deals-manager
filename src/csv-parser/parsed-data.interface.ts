export interface ParsedData<T> {
  list: T[];
  total: number;
  count: number | null;
  offset: number | null;
}
