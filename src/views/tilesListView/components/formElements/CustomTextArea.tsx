import styles from './commonFormElementsStyles.module.scss';

type CustomTextAreaProps<T extends object> = {
  value: string;
  fieldName: keyof T;
  onChange: (fieldName: keyof T, value: string | boolean) => void;
  maxLength?: number;
};

const CustomTextArea = <T extends object>(props: CustomTextAreaProps<T>): JSX.Element => {
  return (
    <textarea
      className={styles.textArea}
      value={props.value}
      onChange={(e) => props.onChange(props.fieldName, e.target.value)}
      maxLength={props.maxLength}
    />
  );
};

export default CustomTextArea;
