'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../LanguageSwitcher';
import { menuItemsPath, legalItemsPath } from '../../constants/sidebarItems';
import { useTranslation } from 'react-i18next';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
  const { t } = useTranslation();

  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ redirect: false });

    window.location.href = '/signin';
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed left-4 top-4 z-40 h-[calc(100vh-32px)] w-72 rounded-xl shadow-xl backdrop-blur-sm bg-neutral-50 border border-gray-200 flex flex-col"
    >
      <div className="flex h-20 items-center justify-center border-b border-gray-300">
        <Link href="/">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent"
          >
            {t('short_name')}
          </motion.span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-4 mt-5 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
          }}
        >
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
            <LanguageSwitcher />
          </div>
          {menuItemsPath.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white hover:shadow-md',
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {t(`layout.sidebar.menuItems.${item.key}`)}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </nav>

      <div className="space-y-2 border-t border-gray-300 px-4 py-4">
        {legalItemsPath.map((item) => (
          <motion.div
            key={item.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={item.href}
              className={cn(
                'flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all',
                pathname === item.href
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white hover:shadow-md',
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {t(`layout.sidebar.legalItems.${item.key}`)}
            </Link>
          </motion.div>
        ))}

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start text-sm text-red-600 transition-all hover:bg-gray-200 hover:shadow-md"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            {t('layout.sidebar.button.logout')}
          </Button>
        </motion.div>
      </div>
    </motion.aside>
  );
}
