import {
  FormikTextField,
  IOnLoadEventParams,
  IPasswordPolicyConfig,
  PasswordChecklist,
  RetinaFormBuilder,
  StatusEnum,
  getYupSchemaForPasswordPolicyConfig,
  processQueryApi,
  useGetAuthToken,
} from '@retina360-ai/core-ui-library-v2';
import {IResetPasswordFormData} from '@retina360-ai/core-ui-library-v2/lib/base-components/authentication/PasswordResetForm';
import {AxiosRequestConfig} from 'axios';
import {Form, Formik, FormikConfig, useFormikContext} from 'formik';
import {
  Dialog,
  DialogFooter,
  DialogType,
  IMessageBarStyles,
  Link,
  MessageBar,
  MessageBarType,
  PrimaryButton,
} from 'office-ui-fabric-react';
import * as React from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

export const ChangePasswordLink: React.FC = () => {
  const [isDialogOpen, setModalOpen] = React.useState<boolean>(false);

  const handleChangePasswordLinkClick = () => {
    setModalOpen(true);
  };

  const handleModalDismiss = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Link onClick={handleChangePasswordLinkClick} className="mt-2">
        Change Password
      </Link>
      {isDialogOpen && (
        <Dialog
          hidden={false}
          onDismiss={handleModalDismiss}
          modalProps={{isBlocking: true}}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Change Password',
            //styles: {inner: {paddingLeft: 0, paddingRight: 0}},
          }}>
          <ChangePassword />
        </Dialog>
      )}
    </>
  );
};

const onLoadEventParams: IOnLoadEventParams = {
  api: '/UserManagement/GetPasswordPolicy',
  apiMethodType: 'GET',
};

const ChangePassword: React.FC = () => {
  return (
    <RetinaFormBuilder onLoadEventParams={onLoadEventParams}>
      <FormContainer />
    </RetinaFormBuilder>
  );
};

const FormContainer: React.FC = () => {
  const {values} = useFormikContext<any>();

  const passwordConfig = React.useMemo((): IPasswordPolicyConfig => {
    return {
      minLength: values.length,
      maxLength: values.maxLength,
      specialCharCount: values.specialChars,
      upperCaseCount: values.upperCase,
      lowerCaseCount: values.lowerCase,
      digitCount: values.digits,
    };
  }, [values]);

  return <ChangePasswordForm passwordConfig={passwordConfig} />;
};

// const formValidationSchema = Yup.object<IResetPasswordFormData>({
//   password: Yup.string().required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Password confirm is required"),
// });

interface IChangePasswordFormProps {
  passwordConfig: IPasswordPolicyConfig;
}

const ChangePasswordForm: React.FC<IChangePasswordFormProps> = (props) => {
  const [status, setStatus] = React.useState<StatusEnum>(StatusEnum.NONE);
  const [errorMessage, setErrorMessage] = React.useState<string>(null);
  const getAuthToken = useGetAuthToken();

  const handleFormSubmit = async (values: IResetPasswordFormData) => {
    //console.log(values);
    setStatus(StatusEnum.LOADING);
    try {
      const config: AxiosRequestConfig = {
        url: '/UserManagement/ResetPassword',
        method: 'post',
        data: {
          data: {password: values.password},
        },
      };
      await processQueryApi(config, getAuthToken());

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your password is changed successfully',
        confirmButtonText: 'OK',
        confirmButtonColor: 'rgb(16,110,190)',
      });
    } catch (error) {
      //console.error(error);
      setErrorMessage(error.response?.data?.detail);
      setStatus(StatusEnum.ERROR);
    }
  };

  const formValidationSchema = Yup.object<IResetPasswordFormData>({
    password: getYupSchemaForPasswordPolicyConfig(props.passwordConfig),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirm is required'),
  });

  const formConfig: FormikConfig<IResetPasswordFormData> = {
    initialValues: {password: '', confirmPassword: ''},
    onSubmit: handleFormSubmit,
    validationSchema: formValidationSchema,
  };

  let messageContent = <div />;
  const messageBarStyles: IMessageBarStyles = {
    root: {marginTop: 10},
  };

  switch (status) {
    case StatusEnum.LOADING:
      messageContent = (
        <MessageBar messageBarType={MessageBarType.info} styles={messageBarStyles}>
          Sending reset password request
        </MessageBar>
      );
      break;
    case StatusEnum.SUCCESS:
      messageContent = (
        <MessageBar messageBarType={MessageBarType.success} styles={messageBarStyles}>
          Your password is changed successfully
        </MessageBar>
      );
      break;
    case StatusEnum.ERROR:
      messageContent = (
        <MessageBar messageBarType={MessageBarType.error} styles={messageBarStyles}>
          {errorMessage || 'There was an error in processing your request'}
        </MessageBar>
      );
      break;
  }

  return (
    <Formik {...formConfig}>
      {(fProps) => (
        <Form noValidate>
          <FormikTextField
            type="password"
            name="password"
            disabled={status === StatusEnum.LOADING}
            required
            label={'New Password'}
          />
          <PasswordChecklist password={fProps.values.password} passwordPolicyConfig={props.passwordConfig} />
          <FormikTextField
            type="password"
            name="confirmPassword"
            disabled={status === StatusEnum.LOADING}
            label={'Confirm Password'}
            required
          />
          {messageContent}
          <DialogFooter>
            <PrimaryButton
              type={'submit'}
              onClick={() => fProps.handleSubmit()}
              disabled={status === StatusEnum.LOADING}>
              Change Password
            </PrimaryButton>
          </DialogFooter>
        </Form>
      )}
    </Formik>
  );
};
