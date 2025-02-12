import AuthHeader from '../components/AuthHeader';
import { ButtonRedirect } from '../components/ButtonRedirect';
import FormSignup from '../components/FormSignup';

export default function Page() {
  return (
    <div className="w-full max-w-md space-y-8">
      <AuthHeader
        keyItem1={'pages.signup.welcome'}
        keyItem2={'pages.signup.enter'}
      />
      <ButtonRedirect keyItem1={'pages.signup.loginHere'} link={'/signup'} />
      <FormSignup />
    </div>
  );
}
