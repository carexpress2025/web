import type { IUserInterface } from './IUserInterface';
import type { IAccountInterface } from './IAccountInterface';
import type { IBaseInterface } from '../base/IBaseInterface';

export interface IUserAccountInterface extends IBaseInterface {
  userId?: number;
  user?: IUserInterface;
  accountId?: number;
  account?: IAccountInterface;
}
