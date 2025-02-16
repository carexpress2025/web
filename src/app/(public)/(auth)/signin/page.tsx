import { JSX } from 'react';
import AuthHeader from '@/presentation/components/AuthHeader';
import { ButtonRedirect } from '@/presentation/components/ButtonRedirect';
import FormSigninView from '@/presentation/components/FormSigninView';

export default function Page(): JSX.Element {
  return (
    <div className="w-full max-w-md space-y-8">
      <AuthHeader
        keyItem1={'pages.auth.signin.welcome'}
        keyItem2={'pages.auth.signin.enter'}
      />
      <ButtonRedirect
        keyItem1={'pages.auth.signin.buttons.registernHere'}
        link={'/signup'}
      />
      <FormSigninView />
    </div>
  );
}
