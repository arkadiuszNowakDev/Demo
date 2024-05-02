import { Form } from 'react-bootstrap';

import styles from './commonFormElementsStyles.module.scss';
import CustomInput from './CustomInput';
import { FormData, FormType } from '../../../../types/FormTypes';

const getFormHeaderTitle = (formType: FormType): string => {
  switch (formType) {
    case 'nestableForm':
      return 'Nestable form';

    case 'anotherNestableForm':
      return 'Another nestable form';

    case 'nestForm':
      return 'Nest form';

    case 'notNestableForm':
      return 'Not nestable form';
  }
};

type ConfigNameFormProps = {
  currentFormData: FormData;
  onNameInputChange: (fieldName: string, value: string | boolean) => void;
};

const ConfigNameForm = (props: ConfigNameFormProps): JSX.Element => {
  return (
    <Form className={styles.configNameForm}>
      <div className='mb-3'>
        <h5 className={styles.formHeader}>{getFormHeaderTitle(props.currentFormData.formType)}</h5>
      </div>

      <CustomInput<FormData>
        id='nameInput'
        value={props.currentFormData.name}
        fieldName='name'
        labelContent='Form name'
        onInputChange={props.onNameInputChange}
      />
    </Form>
  );
};

export default ConfigNameForm;
