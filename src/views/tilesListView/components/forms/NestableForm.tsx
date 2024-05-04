import { Form } from 'react-bootstrap';

import styles from './commonFormsStyles.module.scss';
import { NestableFormData } from '../../types/FormTypes';
import AnimatedHinge from '../animatedHinge/AnimatedHinge';
import CustomCheck from '../formElements/CustomCheck';
import CustomInput from '../formElements/CustomInput';

type NestableFormProps = {
  nestableFormData: NestableFormData;
  onFormDataChange: (fieldName: keyof NestableFormData, value: string | boolean) => void;
};

const NestableForm = (props: NestableFormProps): JSX.Element => {
  return (
    <div className={styles.formContainer}>
      <Form.Group className='mb-3'>
        <CustomInput<NestableFormData>
          id='someStringValue1Input'
          value={props.nestableFormData.someStringValue1}
          fieldName='someStringValue1'
          labelContent='Value 1'
          onInputChange={props.onFormDataChange}
          customGroupClass={styles.gridSmall}
        />
        <CustomInput<NestableFormData>
          id='someStringValue2Input'
          value={props.nestableFormData.someStringValue2}
          fieldName='someStringValue2'
          labelContent='Value 2'
          onInputChange={props.onFormDataChange}
          customGroupClass={styles.gridSmall}
        />
        <CustomInput<NestableFormData>
          id='someStringValue3Input'
          value={props.nestableFormData.someStringValue3}
          fieldName='someStringValue3'
          labelContent='Value 3'
          onInputChange={props.onFormDataChange}
          customGroupClass={styles.gridSmall}
        />
      </Form.Group>

      <Form.Group className='mb-2'>
        <CustomCheck<NestableFormData>
          fieldName='optionalFlag1'
          isChecked={props.nestableFormData.optionalFlag1}
          onChange={props.onFormDataChange}
          labelContent='Show optional value 1'
          type='checkbox'
        />

        <AnimatedHinge isOpen={props.nestableFormData.optionalFlag1}>
          <CustomInput<NestableFormData>
            id='optionalStringValue1Input'
            value={props.nestableFormData.optionalStringValue1}
            fieldName='optionalStringValue1'
            labelContent='Optional value 1'
            onInputChange={props.onFormDataChange}
            customGroupClass={`${styles.gridLarge} ms-4`}
          />
        </AnimatedHinge>
      </Form.Group>

      <Form.Group className='mb-2'>
        <CustomCheck<NestableFormData>
          fieldName='optionalFlag2'
          isChecked={props.nestableFormData.optionalFlag2}
          onChange={props.onFormDataChange}
          labelContent='Show optional value 2'
          type='checkbox'
        />

        <AnimatedHinge isOpen={props.nestableFormData.optionalFlag2}>
          <CustomInput<NestableFormData>
            id='optionalStringValue2Input'
            value={props.nestableFormData.optionalStringValue2}
            fieldName='optionalStringValue2'
            labelContent='Optional value 2'
            onInputChange={props.onFormDataChange}
            customGroupClass={`${styles.gridLarge} ms-4`}
          />
        </AnimatedHinge>
      </Form.Group>

      <Form.Group className='mb-1'>
        <CustomCheck<NestableFormData>
          fieldName='optionalFlag3'
          isChecked={props.nestableFormData.optionalFlag3}
          onChange={props.onFormDataChange}
          labelContent='Show optional value 3'
          type='checkbox'
        />

        <AnimatedHinge isOpen={props.nestableFormData.optionalFlag3}>
          <CustomInput<NestableFormData>
            id='optionalStringValue3Input'
            value={props.nestableFormData.optionalStringValue3}
            fieldName='optionalStringValue3'
            labelContent='Optional value 3'
            onInputChange={props.onFormDataChange}
            customGroupClass={`${styles.gridLarge} ms-4`}
          />
        </AnimatedHinge>
      </Form.Group>
    </div>
  );
};

export default NestableForm;
