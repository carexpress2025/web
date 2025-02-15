import {
  BarChart,
  Home,
  FileText,
  ShieldCheck,
  QrCode,
  MessageSquare,
  Send,
  Calendar,
  Users,
  Car,
  Settings,
  Bot,
  Star,
  User,
  DollarSign,
} from 'lucide-react';

export const menuItemsPath = [
  {
    key: 'home',
    icon: Home,
    href: '/dashboard',
  },
  {
    key: 'cars',
    icon: Car,
    href: '/cars',
  },
  {
    key: 'contacts',
    icon: Users,
    href: '/whatsapp/contacts',
  },
  {
    key: 'schedulings',
    icon: Calendar,
    href: '/schedulings',
  },
  {
    key: 'schedulings.form.create',
    icon: Calendar,
    href: '/schedulings/form/create',
  },
  {
    key: 'analytics',
    icon: BarChart,
    href: '/analytics',
  },
  {
    key: 'chats',
    icon: MessageSquare,
    href: '/whatsapp/chats',
  },
  {
    key: 'whatsapp',
    icon: QrCode,
    href: '/whatsapp',
  },
  {
    key: 'qrcode',
    icon: QrCode,
    href: '/whatsapp/qrcode',
  },
  {
    key: 'ai',
    icon: Settings,
    href: '/settings/ai',
  },
  {
    key: 'ai.reply.generic',
    icon: Settings,
    href: '/settings/ai/reply/generic',
  },
  {
    key: 'prompt.reply',
    icon: Send,
    href: '/prompts/reply',
  },
  {
    key: 'prompt.send',
    icon: Send,
    href: '/prompts/send',
  },
  {
    key: 'testing.ia.reply',
    icon: Bot,
    href: '/prompts/reply/testing',
  },
  {
    key: 'testing.ia.send',
    icon: Bot,
    href: '/prompt/send/testing',
  },
  {
    key: 'favorites',
    icon: Star,
    href: '/cars/favorites',
  },
  {
    key: 'profile',
    icon: User,
    href: '/profile',
  },
  {
    key: 'prices',
    icon: DollarSign,
    href: '/prices',
  },
  {
    key: 'signature',
    icon: DollarSign,
    href: '/signature',
  },
];

export const legalItemsPath = [
  {
    key: 'terms',
    icon: FileText,
    href: '/terms',
  },
  {
    key: 'privacy',
    icon: ShieldCheck,
    href: '/privacy',
  },
];
