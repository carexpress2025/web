import type { IBaseInterface } from '../base/IBaseInterface';
import type { IUserAccountInterface } from './IUserAccountInterface';
import type { IUserSubscriptionInterface } from './IUserSubscriptionInterface';

export interface IUserInterface extends IBaseInterface {
  name: string;
  UserAccounts?: IUserAccountInterface;
  UserSubscription: IUserSubscriptionInterface;
}
