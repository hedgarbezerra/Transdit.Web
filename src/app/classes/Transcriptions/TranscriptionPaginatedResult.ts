import { PaginatedResult } from '../PaginatedResult';
import {TranscriptionItem} from './TranscriptionItem'

export interface TranscriptionPaginatedResult extends PaginatedResult<TranscriptionItem>{
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  data: TranscriptionItem[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
