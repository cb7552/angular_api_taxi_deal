import { initializeObject } from '../common/initializer';

export class ListDataItem<T> {
  data: T[];
  count: number;
}

export class DropdownModel {
  text: string;
  value: any;
  additionalProperty?: any;
  constructor(initializer?: DropdownModel) {
    initializeObject(this, initializer);
  }
}

export class CheckboxModel extends DropdownModel {
  isSelected: boolean;
  constructor(initializer?: CheckboxModel) {
    super(initializer);
    initializeObject(this, initializer);
  }
}

export class TreeViewModel {
  id: string;
  name: string;
  children: TreeViewModel[];
}

export interface DynamicObject {
  [key: string]: any;
}
export class Alert {
  type: AlertType;
  message: string;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

export class PaginationInfo {
  sortBy = '';
  sortColumn = '';
  pageSize = 10;
  pageNumber = 1;
  total = -1;
  loading = true;
  where?: any;
}

export class PaginationRequest {
  count? = -1;
  limit?: number;
  nolimit?: boolean;
  page?: number;
  order?: string;
  where?: any;
  include?: any;
  method?: string;
  constructor(initializer?: PaginationRequest) {
    initializeObject(this, initializer);
  }
}
