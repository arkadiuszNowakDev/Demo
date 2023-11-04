import { Form } from 'react-bootstrap';

import AnimatedHinge from '../../../common/components/animatedHinge/AnimatedHinge';
import CustomCheck from '../../../common/components/formElements/CustomCheck';
import CustomInput from '../../../common/components/formElements/CustomInput';
import { FormData, NestableFormData } from '../../../types/FormTypes';

const FORM_DATA_KEY = 'nestableFormData';

type NestableFormProps = {
  nestableFormData?: NestableFormData;
  onFormDataChange: (fieldName: string, value: string | boolean | string[], formDataKey?: keyof FormData) => void;
};

const NestableForm = (props: NestableFormProps): JSX.Element => {
  if (!props.nestableFormData) return <></>;

  return (
    <div className='formContainer'>
      <Form.Group className='mb-3'>
        <CustomInput<NestableFormData, FormData>
          id='someStringValue1Input'
          value={props.nestableFormData.someStringValue1}
          fieldName='someStringValue1'
          nestedObjectKey={FORM_DATA_KEY}
          labelContent='Value 1'
          onInputChange={props.onFormDataChange}
          customGroupClass='gridSmall'
        />
        <CustomInput<NestableFormData, FormData>
          id='someStringValue2Input'
          value={props.nestableFormData.someStringValue2}
          fieldName='someStringValue2'
          nestedObjectKey={FORM_DATA_KEY}
          labelContent='Value 2'
          onInputChange={props.onFormDataChange}
          customGroupClass='gridSmall'
        />
        <CustomInput<NestableFormData, FormData>
          id='someStringValue3Input'
          value={props.nestableFormData.someStringValue3}
          fieldName='someStringValue3'
          nestedObjectKey={FORM_DATA_KEY}
          labelContent='Value 3'
          onInputChange={props.onFormDataChange}
          customGroupClass='gridSmall'
        />
      </Form.Group>

      <Form.Group className='mb-2'>
        <CustomCheck<NestableFormData, FormData>
          fieldName='optionalFlag1'
          isChecked={props.nestableFormData.optionalFlag1}
          nestedObjectKey={FORM_DATA_KEY}
          onChange={props.onFormDataChange}
          labelContent='Show optional value 1'
          type='checkbox'
        />

        <AnimatedHinge isOpen={props.nestableFormData.optionalFlag1}>
          <CustomInput<NestableFormData, FormData>
            id='optionalStringValue1Input'
            value={props.nestableFormData.optionalStringValue1}
            fieldName='optionalStringValue1'
            nestedObjectKey={FORM_DATA_KEY}
            labelContent='Optional value 1'
            onInputChange={props.onFormDataChange}
            customGroupClass='gridLarge ms-4'
          />
        </AnimatedHinge>
      </Form.Group>

      <Form.Group className='mb-2'>
        <CustomCheck<NestableFormData, FormData>
          fieldName='optionalFlag2'
          isChecked={props.nestableFormData.optionalFlag2}
          nestedObjectKey={FORM_DATA_KEY}
          onChange={props.onFormDataChange}
          labelContent='Show optional value 2'
          type='checkbox'
        />

        <AnimatedHinge isOpen={props.nestableFormData.optionalFlag2}>
          <CustomInput<NestableFormData, FormData>
            id='optionalStringValue2Input'
            value={props.nestableFormData.optionalStringValue2}
            fieldName='optionalStringValue2'
            nestedObjectKey={FORM_DATA_KEY}
            labelContent='Optional value 2'
            onInputChange={props.onFormDataChange}
            customGroupClass='gridLarge ms-4'
          />
        </AnimatedHinge>
      </Form.Group>

      <Form.Group className='mb-1'>
        <CustomCheck<NestableFormData, FormData>
          fieldName='optionalFlag3'
          isChecked={props.nestableFormData.optionalFlag3}
          nestedObjectKey={FORM_DATA_KEY}
          onChange={props.onFormDataChange}
          labelContent='Show optional value 3'
          type='checkbox'
        />

        <AnimatedHinge isOpen={props.nestableFormData.optionalFlag3}>
          <CustomInput<NestableFormData, FormData>
            id='optionalStringValue3Input'
            value={props.nestableFormData.optionalStringValue3}
            fieldName='optionalStringValue3'
            nestedObjectKey={FORM_DATA_KEY}
            labelContent='Optional value 3'
            onInputChange={props.onFormDataChange}
            customGroupClass='gridLarge ms-4'
          />
        </AnimatedHinge>
      </Form.Group>
    </div>
  );
};

export default NestableForm;
