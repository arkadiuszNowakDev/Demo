import { useMemo } from 'react';

import styles from './FormContainer.module.scss';
import ConfigNameForm from '../../../common/components/formElements/ConfigNameForm';
import { FormData } from '../../../types/FormTypes';
import AnotherNestableForm from '../forms/AnotherNestableForm';
import NestableForm from '../forms/NestableForm';
import NestForm from '../forms/NestForm';
import NotNestableForm from '../forms/NotNestableForm';
import { FORMS_WITH_EDITABLE_NAME } from '../TilesListView';

type FormContainerProps = {
  formData?: FormData;
  onFormDataChange: (fieldName: string, value: string | boolean | string[], formDataKey?: keyof FormData) => void;
};

const FormContainer = (props: FormContainerProps): JSX.Element => {
  const formElement = useMemo(() => {
    if (!props.formData) return <></>;

    switch (props.formData.formType) {
      case 'nestableForm':
        return (
          <NestableForm nestableFormData={props.formData.nestableFormData} onFormDataChange={props.onFormDataChange} />
        );
      case 'anotherNestableForm':
        return (
          <AnotherNestableForm
            anotherNestableFormData={props.formData.anotherNestableFormData}
            onFormDataChange={props.onFormDataChange}
          />
        );
      case 'nestForm':
        return <NestForm nestFormData={props.formData.nestFormData} onFormDataChange={props.onFormDataChange} />;
      case 'notNestableForm':
        return (
          <NotNestableForm
            notNestableFormData={props.formData.notNestableFormData}
            onFormDataChange={props.onFormDataChange}
          />
        );
      default:
        return <></>;
    }
  }, [props.formData]);

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

      {props.formData && formElement}
    </div>
  );
};

export default FormContainer;