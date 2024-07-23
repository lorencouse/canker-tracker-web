import { Classic } from '@theme-toggles/react';
import '@theme-toggles/react/css/Classic.css';

import { useTheme } from '@/components/theme-provider';

function ThemeToggle() {
  const { toggleTheme, theme } = useTheme();

  return (
    <Classic
      toggle={toggleTheme}
      toggled={theme === 'light'}
      className="mx-4 text-3xl"
    />
  );
}

export default ThemeToggle;
