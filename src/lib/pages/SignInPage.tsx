import { Image } from 'lucide-react';
import { useState } from 'react';

import SignInBox from '../../components/LogInComponents/SignInBox';
import SignUpBox from '../../components/LogInComponents/SignUpBox';
import PasswordResetBox from '@/components/LogInComponents/PasswordResetBox';

export default function SignInPage() {
  const [mode, setMode] = useState<'signin' | 'signup' | 'resetPassword'>(
    'signin'
  );
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          {mode === 'signin' && <SignInBox setMode={setMode} />}
          {mode === 'signup' && <SignUpBox setMode={setMode} />}
          {mode === 'resetPassword' && <PasswordResetBox setMode={setMode} />}
        </div>

        {/* <p className="my-4">
          {signInForm ? "Don't have an account?" : 'Already have an account?'}
          <span
            onClick={() => setSignInForm(!signInForm)}
            className="mx-4 cursor-pointer underline"
          >
            {signInForm ? 'Sign up' : 'Sign in'}
          </span>
        </p> */}
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
