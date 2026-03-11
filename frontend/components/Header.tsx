'use client';

import { useState, useEffect } from 'react';
import { Bell, Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Header() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);

    // Get stored user from localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!mounted) return null;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold">
          Welcome back, {user?.name ?? 'User'}
        </h2>
      </div>

      <div className="flex items-center space-x-4">

        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent"
        >
          {theme === 'dark'
            ? <Sun className="h-5 w-5" />
            : <Moon className="h-5 w-5" />}
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-muted-foreground">
              {user?.email || 'user@email.com'}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}