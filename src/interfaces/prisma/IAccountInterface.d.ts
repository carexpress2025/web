import type { IUserAccountInterface } from './IUserAccountInterface';
import type { IBaseInterface } from '../base/IBaseInterface';

export interface IAccountInterface extends IBaseInterface {
  email: string;
  password: string;
  UserAccounts?: IUserAccountInterface;
}
