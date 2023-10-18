import { FormData, NotNestableFormData } from '../../../types/FormTypes';

type NotNestableFormProps = {
  notNestableFormData?: NotNestableFormData;
  onFormDataChange: (fieldName: string, value: string | boolean | string[], formDataKey?: keyof FormData) => void;
};

const NotNestableForm = (props: NotNestableFormProps): JSX.Element => {
  return <div className='formContainer'>NotNestableForm</div>;
};

export default NotNestableForm;
