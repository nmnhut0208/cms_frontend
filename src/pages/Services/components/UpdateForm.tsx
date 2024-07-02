import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form } from 'antd';

export interface FormValueType extends Partial<API.PartialService> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: API.PartialService;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm<API.PartialService>();
  return (
    <ModalForm<API.PartialService>
      open={props.updateModalVisible}
      style={{ padding: '32px 40px 48px' }}
      title="Service item configuration"
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => props.onCancel(),
      }}
      onFinish={async (values) => {
        await props.onSubmit(values);
        return true;
      }}
      initialValues={{ ...props.values }}
      clearOnDestroy
    >
      <ProFormText hidden name="name" />
      <ProFormText required name="fullName" label="Name" />
      <ProFormSelect
        required
        name="ai_type"
        label="Type"
        valueEnum={{
          'sd-txt2img': 'Text to Image',
          'sd-img2img': 'Image to Image',
        }}
      />
      <ProFormText
        required
        name="subcategories"
        label="Subcategories"
        placeholder="Enter subcategories separated by commas (e.g. 'Realistic,Chibi')"
      />
      <ProFormTextArea name="description" label="Description" />
    </ModalForm>
  );
};

export default UpdateForm;
