import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { MenuIcon } from '@/components/Svg';
import ThemeToggle from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { auth } from '@/firebaseConfig';

export default function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const defaultProfilePic = '/assets/images/logo-100.png';
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      setProfilePic(user?.photoURL || defaultProfilePic);
    });
  }, []);

  return (
    <header className="flex h-20 w-full items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <Link to="/" className="flex h-14 w-14" prefetch="false">
          <img src="/assets/images/logo.png" alt="Canker Tracker" />
          <span className="sr-only">Canker Tracker</span>
        </Link>

        <NavigationMenu className="ml-6 hidden lg:flex">
          <NavigationMenuList className="ml-4 flex gap-8">
            <NavigationMenuLink asChild>
              <Link to="/get-started" className="nav-link" prefetch="false">
                Home
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="/daily-log" className="nav-link" prefetch="false">
                Log
              </Link>
            </NavigationMenuLink>

            {isSignedIn && (
              <NavigationMenuLink asChild>
                <Link to="/settings" className="nav-link" prefetch="false">
                  Settings
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="hidden items-center lg:flex">
        <ThemeToggle className="mr-4" />
        {isSignedIn ? (
          <Link to="/settings" prefetch="false">
            <Avatar>
              <AvatarImage src={profilePic} />
              <AvatarFallback>CT</AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Button variant="outline">
            <Link to="/sign-in" prefetch="false">
              Login
            </Link>
          </Button>
        )}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex h-full flex-col justify-between">
            <div className="p-4">
              <Link to="/" prefetch="false">
                <img
                  src="/assets/images/logo-100.png"
                  alt="Canker Tracker"
                  className="h-14 w-14"
                />
                <span className="sr-only">Canker Tracker</span>
              </Link>
              <div className="grid gap-2 py-6">
                <Link
                  to="/"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch="false"
                >
                  Home
                </Link>
                {isSignedIn && (
                  <Link
                    to="/settings"
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    prefetch="false"
                  >
                    Settings
                  </Link>
                )}
              </div>
            </div>
            <div className="flex justify-between p-4">
              <ThemeToggle />
              {isSignedIn ? (
                <Link to="/profile" prefetch="false">
                  <Avatar>
                    <AvatarImage src={profilePic} />
                    <AvatarFallback>CT</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Button variant="outline">
                  <Link to="/sign-in" prefetch="false">
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
