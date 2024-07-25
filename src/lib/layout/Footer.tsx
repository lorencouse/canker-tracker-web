import { Link } from 'react-router-dom';

import { YoutubeIcon, GithubIcon, TwitterIcon } from '@/components/Svg';

export default function Footer() {
  return (
    <div className="dark bg-gray-900 py-8 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row md:px-6">
        <div className="flex items-center space-x-4">
          <Link
            to="#"
            className="text-white hover:text-gray-300"
            prefetch="false"
          >
            <YoutubeIcon className="h-6 w-6" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link
            to="#"
            className="text-white hover:text-gray-300"
            prefetch="false"
          >
            <GithubIcon className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            to="#"
            className="text-white hover:text-gray-300"
            prefetch="false"
          >
            <TwitterIcon className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-300 md:mt-0">
          &copy; 2024 Canker Tracker Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
