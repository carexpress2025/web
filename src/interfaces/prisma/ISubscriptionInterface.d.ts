import type { IUserSubscriptionInterface } from './IUserSubscriptionInterface';
import type { IBaseInterface } from '../base/IBaseInterface';

export interface ISubscriptionInterface extends IBaseInterface {
  name: string;
  startDate: Date;
  endDate: Date;
  UserSubscription: IUserSubscriptionInterface;
}
