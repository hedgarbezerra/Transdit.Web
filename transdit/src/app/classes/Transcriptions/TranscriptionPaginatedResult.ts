import { PaginatedResult } from '../PaginatedResult';
import {TranscriptionItem} from './TranscriptionItem'

export class TranscriptionPaginatedResult  implements PaginatedResult<TranscriptionItem>{
  pageIndex!: number;
  pageSize!: number;
  totalCount!: number;
  totalPages!: number;
  data!: TranscriptionItem[];
  hasPreviousPage!: boolean;
  hasNextPage!: boolean;
}
