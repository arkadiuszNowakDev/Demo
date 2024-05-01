import { Fragment, MouseEvent, useCallback } from 'react';

import CustomButton, { CustomButtonType } from '../../../common/components/customButton/CustomButton';
import { AnotherNestableFormData } from '../../../types/FormTypes';

const BUTTONS_OPTIONS_QTY = 3;
const BUTTONS_TYPES_IN_ROW: CustomButtonType[] = ['tertiary', 'secondary', 'primary'];

type AnotherNestableFormProps = {
  anotherNestableFormData: AnotherNestableFormData;
  onFormDataChange: (fieldName: string, value: string | boolean) => void;
};

const AnotherNestableForm = (props: AnotherNestableFormProps): JSX.Element => {
  const onFormButtonClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const formOptionData = e.currentTarget.dataset.formoption;

      if (formOptionData) {
        const [fieldName, optionType] = formOptionData.split('-');
        props.onFormDataChange(fieldName, optionType);
      }
    },
    [props.onFormDataChange]
  );

  return (
    <div className='formContainer'>
      {Array.from({
        length: BUTTONS_OPTIONS_QTY
      }).map((_, index) => {
        const optionNumber = index + 1;
        const optionLabel = props.anotherNestableFormData?.[`option${optionNumber}`] || 'choose one of the options';

        return (
          <Fragment key={`formButtons${index}`}>
            <p className='text-center'>{`Option ${optionNumber}: ${optionLabel}`}</p>
            <div className='d-flex justify-content-around mb-3'>
              {BUTTONS_TYPES_IN_ROW.map((buttonType, buttonIndex) => {
                return (
                  <CustomButton
                    key={`buttonInRow:${buttonType}${index}${buttonIndex}`}
                    content={`Option ${optionNumber}`}
                    type={buttonType}
                    customDataAttributes={{
                      'data-formoption': `option${optionNumber}-${buttonType}`
                    }}
                    onClick={onFormButtonClick}
                  />
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default AnotherNestableForm;
