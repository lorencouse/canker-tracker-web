import { useState } from 'react';

import { Separator } from '../ui/separator';

import SettingsAppearancePage from './appearance/page';
import SidebarNav from './components/sidebar-nav';
import SettingsDisplayPage from './display/page';
import SettingsNotificationsPage from './notifications/page';
import ProfileForm from './profile-form';

const sidebarNavItems = [
  {
    title: 'Profile',
    component: <ProfileForm />,
  },
  {
    title: 'Appearance',
    component: <SettingsAppearancePage />,
  },
  {
    title: 'Notifications',
    component: <SettingsNotificationsPage />,
  },
  {
    title: 'Display',
    component: <SettingsDisplayPage />,
  },
];

export default function SettingsPage() {
  const [activeComponent, setActiveComponent] = useState(<ProfileForm />);

  return (
    <div className="border-1 m-6 rounded-lg border border-gray-200">
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav
              items={sidebarNavItems}
              setActiveComponent={setActiveComponent}
            />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{activeComponent}</div>
        </div>
      </div>
    </div>
  );
}
