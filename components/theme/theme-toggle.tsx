'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Button
      variant="link"
      size="icon"
      className="group h-9 w-9 cursor-pointer rounded-md"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        className="relative flex h-full w-full items-center justify-center"
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.36, 0.2, 0.07, 1] }}
      >
        <Sun className="group-hover:text-point transition-smooth h-[1.2rem] w-[1.2rem] scale-100 transition-colors duration-200 dark:scale-0" />
        <Moon className="group-hover:text-point transition-smooth absolute top-1/2 left-1/2 h-[1.2rem] w-[1.2rem] -translate-x-1/2 -translate-y-1/2 scale-0 transition-colors duration-200 dark:scale-100" />
      </motion.div>
    </Button>
  );
}
