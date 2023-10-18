export type FormType = 'nestableForm' | 'anotherNestableForm' | 'nestForm' | 'notNestableForm';

export type NestableFormData = {
  someStringValue1: string;
  someStringValue2: string;
  someStringValue3: string;
  optionalFlag1: boolean;
  optionalFlag2: boolean;
  optionalFlag3: boolean;
  optionalStringValue1: string;
  optionalStringValue2: string;
  optionalStringValue3: string;
};

export type AnotherNestableFormData = {
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
  anotherNestableFormData?: AnotherNestableFormData;
  nestFormData?: NestFormData;
  notNestableFormData?: NotNestableFormData;
};
