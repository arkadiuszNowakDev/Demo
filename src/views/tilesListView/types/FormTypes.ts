export type FormType = 'nestableForm' | 'anotherNestableForm' | 'nestForm' | 'notNestableForm';

export type NestableFormData = {
  formType: 'nestableForm';
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

export type AnotherNestableFormData = { formType: 'anotherNestableForm' } & Record<string, string>;

export type NestFormData = {
  formType: 'nestForm';
  textAreaContent: string;
};

export type NotNestableFormData = {
  formType: 'notNestableForm';
  someValue: string;
};

export type FormData = {
  id: string;
  name: string;
  formType: FormType;
} & (NestableFormData | AnotherNestableFormData | NestFormData | NotNestableFormData);
