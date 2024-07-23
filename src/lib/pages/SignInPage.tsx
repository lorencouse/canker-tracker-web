import { Image } from 'lucide-react';
import { useState } from 'react';

import SignInForm from '../../components/LogInComponents/SignInForm';
import SignUpForm from '../../components/LogInComponents/SignUpForm';

export default function SignInPage() {
  const [signInForm, setSignInForm] = useState(true);
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          {signInForm ? <SignInForm /> : <SignUpForm />}
        </div>
        <p className="my-4">
          {signInForm ? "Don't have an account?" : 'Already have an account?'}
          <span
            onClick={() => setSignInForm(!signInForm)}
            className="mx-4 cursor-pointer underline"
          >
            {signInForm ? 'Sign up' : 'Sign in'}
          </span>
        </p>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
