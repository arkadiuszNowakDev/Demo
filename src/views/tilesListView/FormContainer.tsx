import styles from './FormContainer.module.scss';
import ConfigNameForm from '../../common/components/formElements/ConfigNameForm';
import { FormData, FormType } from '../../types/FormTypes';

const FORMS_WITH_EDITABLE_NAME: FormType[] = ['nestableForm', 'notNestableForm'];

type FormContainerProps = {
  formData?: FormData;
  onFormDataChange: (fieldName: string, value: string | boolean | string[], key?: keyof FormData) => void;
};

const FormContainer = (props: FormContainerProps): JSX.Element => {
  return (
    <div className={styles.formContainer}>
      {!props.formData && (
        <div className={styles.noDataInfo}>{!props.formData && 'Choose some element from the list'}</div>
      )}
      {props.formData && (
        <ConfigNameForm
          currentFormData={props.formData}
          onNameInputChange={props.onFormDataChange}
          formsWithEditableName={FORMS_WITH_EDITABLE_NAME}
        />
      )}
    </div>
  );
};

export default FormContainer;
