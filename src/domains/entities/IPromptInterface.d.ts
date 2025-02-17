import type { Prompt } from '@prisma/client';
import type { PromptType } from '@/data/types';

export interface IPromptInterface extends Partial<Prompt> {
  settingsReply: PromptType;
  settingsSend: PromptType;
}
