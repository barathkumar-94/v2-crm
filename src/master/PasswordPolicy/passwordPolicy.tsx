import * as React from 'react';

import {
  ControlType,
  IControlDefinition,
  IRFEventParams,
  RetinaFormBuilder,
  RFScreenToolbar,
  RFSection,
  ScrollabeContainer,
} from '@retina360-ai/core-ui-library-v2';
import {RFFooter} from '../../common/components/footer';
import {IPageBaseProps} from '../../common/objects';

const PolicySetting: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'forceExpiredPasswordChange',
    label: 'Expire Password',
    inputType: 'integer',
    description: 'The number of days the password is valid before a new password is required.',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'passwordHistory',
    label: 'Not Recently Used',
    inputType: 'integer',
    description: 'Prevents a recently used password from being reused.',
  },
  /*{
        type: ControlType.TEXTBOX,
        name: 'strUserInactive',
        label: 'Inactivate user who have not login for No. of days',
        required: true,
        inputType: 'integer',
        integerLength: 2,
      },*/
];

const LoginAttempt: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'strAccLock',
    label: 'Account lockout threshold',
    required: true,
    inputType: 'number',
    precision: 2,
  },
];

const PasswordLength: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'length',
    label: 'Minimum Length',
    inputType: 'integer',
    description: 'The minimum number of characters required for the password.',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'maxLength',
    label: 'Maximum Length',
    inputType: 'integer',
    description: 'The maximum number of characters allowed in the password.',
  },
];

const Passwordage: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'strMinPassAge',
    label: 'Minimum Password age',
    required: true,
    inputType: 'integer',
    integerLength: 2,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'strMaxPassAge',
    label: 'Maximum password age',
    required: true,
    inputType: 'integer',
    integerLength: 2,
  },
];

const PasswordComplexity: IControlDefinition[] = [
  /*{
      type: ControlType.COMBOBOX,
      name: 'strPassCaseSen',
      label: 'Password must be case sensitive',
      required: true,
   
    },*/
  {
    type: ControlType.TEXTBOX,
    name: 'specialChars',
    label: 'Special Characters',
    inputType: 'integer',
    description: 'The number of special characters required in the password string.',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'lowerCase',
    label: 'Lowercase Characters',
    inputType: 'integer',
    description: 'The number of lowercase letters required in the password string.',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'upperCase',
    label: 'Uppercase Characters',
    inputType: 'integer',
    description: 'The number of uppercase letters required in the password string.',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'digits',
    label: 'Numbers',
    inputType: 'integer',
    description: 'The number of numerical digits required in the password string.',
  },
  /*{
      type: ControlType.COMBOBOX,
      name: 'strForceUsr',
      label: 'Force user to login on first time',
      required: true,
   
    },
    {
      type: ControlType.TEXTBOX,
      name: 'strChangePass',
      label: 'Change Password frequency',
      required: true,
      inputType: 'integer',
      integerLength: 2,
   
    },*/
];

const actionBarButtons: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'save',
    label: 'Save',
    event: {
      api: '/UserManagement/UpdatePasswordPolicy',
      input: [
        'maxLength',
        'length',
        'specialChars',
        'upperCase',
        'lowerCase',
        'digits',
        'passwordHistory',
        'forceExpiredPasswordChange',
      ], //"notUsername", "notEmail", "hashIterations", "notContainsUsername", "maxAuthAge", "hashAlgorithm"
    },
  },
];

const onLoadEventParams: IRFEventParams = {
  api: '/UserManagement/GetPasswordPolicy',
  apiMethodType: 'GET',
};

export const PasswordPolicy: React.FC<IPageBaseProps> = (props) => {
  
  return (
    <RetinaFormBuilder
      scrollKey={props.scrollKey}
      onLoadEventParams={onLoadEventParams}
      className={'page-with-footer-btn'}
      prompt>
      <RFScreenToolbar title={'Password Policy'} hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={PolicySetting} columns={3} title={'Policy Setting'} />
        {/* <RFSection controls={LoginAttempt}  columns={3} title={'Invalid Login Attempt(lock)'} /> */}
        <RFSection controls={PasswordLength} columns={3} title={'Password Length'} />
        {/* <RFSection controls={Passwordage}  columns={3} title={'Password Age (Expiry)'} /> */}
        <RFSection controls={PasswordComplexity} columns={3} title={'Policy Complexity'} />
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} />
    </RetinaFormBuilder>
  );
};
