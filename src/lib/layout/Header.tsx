import { Link } from 'react-router-dom';

import { MenuIcon } from '@/components/Svg';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

export default function Header() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-row justify-between p-4">
            <Link to="/" prefetch={false}>
              <img
                src="/assets/images/logo-100.png"
                alt="Canker Tracker"
                className="h-14 w-14"
              />

              <span className="sr-only">Canker Tracker</span>
            </Link>

            <ThemeToggle />
          </div>

          <div className="grid gap-2 py-6">
            <Link
              to="/"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              to="#"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link to="#" className="mr-6 hidden h-14 w-14 lg:flex" prefetch={false}>
        <img src="/assets/images/logo-100.png" alt="Canker Tracker" />
        <span className="sr-only">Canker Tracker</span>
      </Link>
      <NavigationMenu className="hidden w-full justify-between lg:flex lg:flex-row">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Link
              to="#"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              prefetch={false}
            >
              Home
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              to="/"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              prefetch={false}
            >
              Profile
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
        <ThemeToggle />
        <Button variant="outline" className="m-4">
          <Link to="/signin" prefetch={false}>
            Login
          </Link>
        </Button>
      </NavigationMenu>
    </header>
  );
}
