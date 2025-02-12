import {
  BarChart,
  Home,
  FileText,
  ShieldCheck,
  QrCode,
  MessageSquare,
  Send,
  CalendarCheck,
  Users,
  Car,
  Settings2,
  Bot,
  MessageCircle,
  Star,
  User,
} from 'lucide-react';

export const menuItemsPath = [
  {
    key: 'home',
    icon: Home,
    href: '/home',
  },
  {
    key: 'cars',
    icon: Car,
    href: '/cars',
  },
  {
    key: 'contacts',
    icon: Users,
    href: '/contacts',
  },
  {
    key: 'schedulings',
    icon: CalendarCheck,
    href: '/schedulings',
  },
  {
    key: 'create-schedulings',
    icon: CalendarCheck,
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
    icon: MessageCircle,
    href: '/whatsapp',
  },
  {
    key: 'qrcode',
    icon: QrCode,
    href: '/whatsapp/qrcode',
  },
  {
    key: 'ai',
    icon: Settings2,
    href: '/ai/settings',
  },
  {
    key: 'prompts',
    icon: Send,
    href: '/ai/settings/prompt',
  },
  {
    key: 'testingia',
    icon: Bot,
    href: '/ai/prompt/testing',
  },
  {
    key: 'stars',
    icon: Star,
    href: '/stars',
  },
  {
    key: 'profile',
    icon: User,
    href: '/profile',
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
