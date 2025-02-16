import type { IUserInterface } from './IUserInterface';
import type { ISubscriptionInterface } from './ISubscriptionInterface';
import type { IBaseInterface } from '@interface/base/IBaseInterface';

export interface IUserSubscriptionInterface extends IBaseInterface {
  userId: number;
  user: IUserInterface;
  subscriptionId: number;
  subscription: ISubscriptionInterface;
}
