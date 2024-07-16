import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer>
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl space-y-8 overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
          <SocialLinks size="6" colored={false} />
          {/* Copyright */}
          <p className="mt-8 text-center text-base leading-6 text-gray-400">
            This site is built on React, TypeScript, Tailwind, and Firebase.
            <br />© 2024 Loren Couse - All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  );
}
