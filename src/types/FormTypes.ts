export type FormType = 'nestableForm' | 'nestForm' | 'notNestableForm';

export type NestableFormData = {
  someValue: string;
};

export type NestFormData = {
  someValue: string;
};

export type NotNestableFormData = {
  someValue: string;
};

export type FormData = {
  id: string;
  name: string;
  formType: FormType;

  nestableFormData?: NestableFormData;
  nestFormData?: NestFormData;
  notNestableFormData?: NotNestableFormData;
};
