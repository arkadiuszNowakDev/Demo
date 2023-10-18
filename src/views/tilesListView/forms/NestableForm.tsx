import { Form } from 'react-bootstrap';

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
        <CustomInput<NestableFormData>
          id='someStringValue1Input'
          value={props.nestableFormData.someStringValue1}
          fieldName='someStringValue1'
          formDataKey={FORM_DATA_KEY}
          labelContent='Value 1'
          onInputChange={props.onFormDataChange}
          customGroupClass='gridSmall'
        />
        <CustomInput<NestableFormData>
          id='someStringValue2Input'
          value={props.nestableFormData.someStringValue2}
          fieldName='someStringValue2'
          formDataKey={FORM_DATA_KEY}
          labelContent='Value 2'
          onInputChange={props.onFormDataChange}
          customGroupClass='gridSmall'
        />
        <CustomInput<NestableFormData>
          id='someStringValue3Input'
          value={props.nestableFormData.someStringValue3}
          fieldName='someStringValue3'
          formDataKey={FORM_DATA_KEY}
          labelContent='Value 3'
          onInputChange={props.onFormDataChange}
          customGroupClass='gridSmall'
        />
      </Form.Group>

      <Form.Group className='mb-2'>
        <CustomCheck<NestableFormData>
          fieldName='optionalFlag1'
          isChecked={props.nestableFormData.optionalFlag1}
          formDataKey={FORM_DATA_KEY}
          onChange={props.onFormDataChange}
          labelContent='Show optional value 1'
          type='checkbox'
        />

        {props.nestableFormData.optionalFlag1 && (
          <CustomInput<NestableFormData>
            id='optionalStringValue1Input'
            value={props.nestableFormData.optionalStringValue1}
            fieldName='optionalStringValue1'
            formDataKey={FORM_DATA_KEY}
            labelContent='Optional value 1'
            onInputChange={props.onFormDataChange}
            customGroupClass='gridLarge ms-4'
          />
        )}
      </Form.Group>

      <Form.Group className='mb-2'>
        <CustomCheck<NestableFormData>
          fieldName='optionalFlag2'
          isChecked={props.nestableFormData.optionalFlag2}
          formDataKey={FORM_DATA_KEY}
          onChange={props.onFormDataChange}
          labelContent='Show optional value 2'
          type='checkbox'
        />

        {props.nestableFormData.optionalFlag2 && (
          <CustomInput<NestableFormData>
            id='optionalStringValue2Input'
            value={props.nestableFormData.optionalStringValue2}
            fieldName='optionalStringValue2'
            formDataKey={FORM_DATA_KEY}
            labelContent='Optional value 2'
            onInputChange={props.onFormDataChange}
            customGroupClass='gridLarge ms-4'
          />
        )}
      </Form.Group>

      <Form.Group className='mb-1'>
        <CustomCheck<NestableFormData>
          fieldName='optionalFlag3'
          isChecked={props.nestableFormData.optionalFlag3}
          formDataKey={FORM_DATA_KEY}
          onChange={props.onFormDataChange}
          labelContent='Show optional value 3'
          type='checkbox'
        />

        {props.nestableFormData.optionalFlag3 && (
          <CustomInput<NestableFormData>
            id='optionalStringValue3Input'
            value={props.nestableFormData.optionalStringValue3}
            fieldName='optionalStringValue3'
            formDataKey={FORM_DATA_KEY}
            labelContent='Optional value 3'
            onInputChange={props.onFormDataChange}
            customGroupClass='gridLarge ms-4'
          />
        )}
      </Form.Group>
    </div>
  );
};

export default NestableForm;
