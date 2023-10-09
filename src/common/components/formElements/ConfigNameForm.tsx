import { useMemo } from 'react';

import { Form } from 'react-bootstrap';

import styles from './ConfigNameForm.module.scss';
import CustomInput from './CustomInput';
import { FormType, FormData } from '../../../types/FormTypes';

type ConfigNameFormProps = {
  currentFormData?: FormData;
  onNameInputChange: (fieldName: string, value: string | boolean | string[], key?: keyof FormData) => void;
  formsWithEditableName: FormType[];
};

const ConfigNameForm = (props: ConfigNameFormProps): JSX.Element => {
  const isConfigNameFormComponentVisible =
    props.currentFormData && props.formsWithEditableName.includes(props.currentFormData?.formType);

  const header = useMemo(() => {
    if (!props.currentFormData) return <></>;
    let headerText = '';
    switch (props.currentFormData.formType) {
      case 'nestableForm':
        headerText = 'Nestable form';
        break;
      case 'nestForm':
        headerText = 'Nest form';
        break;
      case 'notNestableForm':
        headerText = 'Not nestable form';
        break;
      default:
        headerText = 'Form';
    }

    return (
      <div className='mb-3'>
        <h5 className='formHeader'>{headerText}</h5>
      </div>
    );
  }, [props.currentFormData]);

  return (
    <Form className={styles.configNameForm}>
      {header}
      {isConfigNameFormComponentVisible && (
        <CustomInput<FormData>
          value={props.currentFormData?.name || ''}
          fieldName='name'
          labelContent='Form name'
          onInputChange={props.onNameInputChange}
        />
      )}
    </Form>
  );
};

export default ConfigNameForm;
