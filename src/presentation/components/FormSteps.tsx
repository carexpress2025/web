'use client';

import { JSX, useState } from 'react';
import FormSignupView from './FormSignupView';
import FormCreateUserView from './FormCreateUserView';

export default function FormSteps(): JSX.Element {
  const [step, setStep] = useState<'signup' | 'createUser'>('signup');
  const [accountId, setAccountId] = useState<string | null>(null);

  return (
    <>
      {step === 'signup' ? (
        <FormSignupView
          onSuccess={(id) => {
            setAccountId(id);
            setStep('createUser');
          }}
        />
      ) : (
        accountId && <FormCreateUserView accountId={accountId} />
      )}
    </>
  );
}
