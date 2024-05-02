import { useMemo } from 'react';

import styles from './FormContainer.module.scss';
import { FormData } from '../../../../types/FormTypes';
import ConfigNameForm from '../formElements/ConfigNameForm';
import AnotherNestableForm from '../forms/AnotherNestableForm';
import NestableForm from '../forms/NestableForm';
import NestForm from '../forms/NestForm';
import NotNestableForm from '../forms/NotNestableForm';

type FormContainerProps = {
  formData?: FormData;
  onFormDataChange: (fieldName: string, value: string | boolean) => void;
};

const FormContainer = (props: FormContainerProps): JSX.Element => {
  const formElement = useMemo(() => {
    if (!props.formData) return <div className={styles.noDataInfo}>Choose some element from the list</div>;

    switch (props.formData.formType) {
      case 'nestableForm':
        return <NestableForm nestableFormData={props.formData} onFormDataChange={props.onFormDataChange} />;
      case 'anotherNestableForm':
        return (
          <AnotherNestableForm anotherNestableFormData={props.formData} onFormDataChange={props.onFormDataChange} />
        );
      case 'nestForm':
        return <NestForm nestFormData={props.formData} onFormDataChange={props.onFormDataChange} />;
      case 'notNestableForm':
        return <NotNestableForm notNestableFormData={props.formData} onFormDataChange={props.onFormDataChange} />;
      default:
        return <></>;
    }
  }, [props.formData, props.onFormDataChange]);

  return (
    <div className={styles.form}>
      {props.formData && <ConfigNameForm currentFormData={props.formData} onNameInputChange={props.onFormDataChange} />}
      {formElement}
    </div>
  );
};

export default FormContainer;
