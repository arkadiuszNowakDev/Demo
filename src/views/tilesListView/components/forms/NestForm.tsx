import styles from './commonFormsStyles.module.scss';
import OverlayContentTooltip from '../../../../common/components/overlayContentTooltip/OverlayContentTooltip';
import { NestFormData } from '../../types/FormTypes';
import CustomTextArea from '../formElements/CustomTextArea';

const MAX_CONTENT_LENGTH = 300;

type NestFormProps = {
  nestFormData: NestFormData;
  onFormDataChange: (fieldName: keyof NestFormData, value: string | boolean) => void;
};

const NestForm = (props: NestFormProps): JSX.Element => {
  return (
    <div className={`${styles.formContainer} ${styles.nestForm}`}>
      <label>
        <OverlayContentTooltip>{props.nestFormData.textAreaContent}</OverlayContentTooltip>
      </label>
      <CustomTextArea<NestFormData>
        value={props.nestFormData.textAreaContent}
        fieldName='textAreaContent'
        onChange={props.onFormDataChange}
        maxLength={MAX_CONTENT_LENGTH}
      />
    </div>
  );
};

export default NestForm;
