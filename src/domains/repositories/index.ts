import {
  SubscriptionRepository,
  UserSubscriptionRepository,
} from './subscriptionRepository';
import {
  FavoriteRepository,
  UserFavoriteRepository,
  CarFavoriteRepository,
} from './favoriteRepository';
import {
  SchedulingRepository,
  UserSchedulingRepository,
  CarUserSchedulingRepository,
} from './schedulingRepository';
import {
  UserSentManualMessageRepository,
  CarSentManualMessageRepository,
} from './sentManualMessageRepository';
import { SentAutomaticMessageRepository } from './sentAutomaticMessageRepository';
import { AiGenericResponseRepository } from './aiGenericResponseRepository';
import { WhatsappUserRepository } from './whatsappRepository';
import { SettingsRepository } from './settingsRepository';
import { PromptRepository } from './promptRepository';
import { CarRepository } from './carRepository';
import { UserRepository } from './userRepository';

const subscriptionRepository = new SubscriptionRepository();
const userSubscriptionRepository = new UserSubscriptionRepository();
const favoriteRepository = new FavoriteRepository();
const userFavoriteRepository = new UserFavoriteRepository();
const carFavoriteRepository = new CarFavoriteRepository();
const schedulingRepository = new SchedulingRepository();
const userSchedulingRepository = new UserSchedulingRepository();
const carUserSchedulingRepository = new CarUserSchedulingRepository();
const userSentManualMessageRepository = new UserSentManualMessageRepository();
const carSentManualMessageRepository = new CarSentManualMessageRepository();
const sentAutomaticMessageRepository = new SentAutomaticMessageRepository();
const aiGenericResponseRepository = new AiGenericResponseRepository();
const userWhatsappRepository = new WhatsappUserRepository();
const settingsRepository = new SettingsRepository();
const userSettingsRepository = new SettingsRepository();
const promptRepository = new PromptRepository();
const carRepository = new CarRepository();
const userRepository = new UserRepository();
export {
  subscriptionRepository,
  userSubscriptionRepository,
  favoriteRepository,
  userFavoriteRepository,
  carFavoriteRepository,
  schedulingRepository,
  userSchedulingRepository,
  carUserSchedulingRepository,
  userSentManualMessageRepository,
  carSentManualMessageRepository,
  sentAutomaticMessageRepository,
  aiGenericResponseRepository,
  userWhatsappRepository,
  settingsRepository,
  userSettingsRepository,
  promptRepository,
  carRepository,
  userRepository,
};
