import { JSX } from 'react';
import AuthHeader from '../components/AuthHeader';
import { ButtonRedirect } from '../components/ButtonRedirect';
import FormSigninView from './components/FormSigninView';

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
