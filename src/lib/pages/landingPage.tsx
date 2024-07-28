import { Link } from 'react-router-dom';

import Testimonial from '@/components/landingPage/testimonial';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="flex-1">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Canker Core
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Track and record canker sores in one place.
                </p>
              </div>
              <div className="flex flex-row gap-x-4">
                <Link to="/sign-in">
                  <Button>Sign Up</Button>
                </Link>
                <Link to="/">
                  <Button variant="outline">Demo</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-24 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Welcome to Canker Core
              </h1>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Manage and track canker sores in one place.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                {/* <RocketIcon className="h-12 w-12" /> */}
                <h2 className="text-2xl font-bold">Fast Delivery</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  We ensure quick delivery of our products.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                {/* <ShieldIcon className="h-12 w-12" /> */}
                <h2 className="text-2xl font-bold">Secure Payment</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  We provide secure payment options for our customers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                {/* <PowerIcon className="h-12 w-12" /> */}
                <h2 className="text-2xl font-bold">24/7 Support</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  We provide 24/7 support to all our customers.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Testimonials
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Testimonial
                name="John Doe"
                initials="JD"
                profilePic="/placeholder-user.jpg"
                testimonial="Acme Inc provides the best service in the market. I'm very satisfied with their service."
              />
              <Testimonial
                name="Jane Doe"
                initials="JD"
                profilePic="/placeholder-user.jpg"
                testimonial="I love the products from Acme Inc. They are of high quality and affordable."
              />
              <Testimonial
                name="Jim Doe"
                initials="JD"
                profilePic="/placeholder-user.jpg"
                testimonial="The customer service from Acme Inc is top-notch. They are always available to help."
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to get started?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join us today and experience the best service.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button className="w-full">Sign Up</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
