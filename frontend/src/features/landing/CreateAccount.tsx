import { useTranslation } from 'react-i18next'
import { CreateAccountButton } from './CreateAccountButton'
import {
  CreateAccountDescription,
  CreateAccountEyebrow,
  CreateAccountHeading,
  CreateAccountPanel,
  CreateAccountSection,
  LogInPrompt,
  SignInButton,
} from './CreateAccount.styles'

interface CreateAccountProps {
  onCreateAccount: () => void
  onLogin: () => void
}

export function CreateAccount({
  onCreateAccount,
  onLogin,
}: CreateAccountProps) {
  const { t } = useTranslation()

  return (
    <CreateAccountSection aria-labelledby="create-account-heading">
      <CreateAccountPanel direction="column" justify="center" gap={0}>
        <CreateAccountEyebrow>
          {t('createAccountSection.eyebrow')}
        </CreateAccountEyebrow>
        <CreateAccountHeading id="create-account-heading">
          {t('createAccountSection.heading')}
        </CreateAccountHeading>
        <CreateAccountDescription>
          {t('createAccountSection.description')}
        </CreateAccountDescription>
        <CreateAccountButton
          onClick={onCreateAccount}
          sx={{
            width: { xs: 'auto', sm: 270 },
            minHeight: 48,
            mt: 2.5,
            px: 2,
            fontSize: 14,
          }}
        />
        <LogInPrompt>
          {t('createAccountSection.logInPrompt')}{' '}
          <SignInButton type="button" onClick={onLogin}>
            {t('createAccountSection.logIn')}
          </SignInButton>
        </LogInPrompt>
      </CreateAccountPanel>
    </CreateAccountSection>
  )
}
