import { PaginatedResult } from "../PaginatedResult";
import { OutDictionary } from "./Dictionaries";

export interface DictionaryPaginatedResult extends PaginatedResult<OutDictionary>{
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    data: OutDictionary[];
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }
  