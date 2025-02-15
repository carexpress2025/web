import { JSX } from 'react';
import AuthHeader from '../components/AuthHeader';
import { ButtonRedirect } from '../components/ButtonRedirect';
import FormSignupView from '../components/FormSignupView';

export default function Page(): JSX.Element {
  return (
    <div className="w-full max-w-md space-y-8">
      <AuthHeader
        keyItem1={'pages.auth.signup.welcome'}
        keyItem2={'pages.auth.signup.join'}
      />
      <ButtonRedirect
        keyItem1={'pages.auth.signup.buttons.loginHere'}
        link={'/signin'}
      />
      <FormSignupView />
    </div>
  );
}
