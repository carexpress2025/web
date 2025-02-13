import AuthHeader from '../components/AuthHeader';
import { ButtonRedirect } from '../components/ButtonRedirect';
import FormSignin from '../components/FormSignin';

export default function Page() {
  return (
    <div className="w-full max-w-md space-y-8">
      <AuthHeader
        keyItem1={'pages.signin.welcome'}
        keyItem2={'pages.signin.enter'}
      />
      <ButtonRedirect
        keyItem1={'pages.signin.createAccount'}
        link={'/signup'}
      />
      <FormSignin />
    </div>
  );
}
