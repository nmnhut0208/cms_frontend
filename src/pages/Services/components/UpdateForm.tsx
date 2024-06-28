import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export interface FormValueType extends API.PartialService {
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

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
  <Modal
    width={640}
    style={{ padding: '32px 40px 48px' }}
    destroyOnClose
    title="Service configuration"
    open={props.updateModalVisible}
    onCancel={() => props.onCancel()}
    onOk={() => props.onSubmit(props.values)}
  >
    <ProForm
      submitter={{
        render: () => <></>,
      }}
      title="Service configuration"
      style={{ padding: '32px 40px 48px' }}
      clearOnDestroy={true}
      onFinish={props.onSubmit}
      initialValues={{
        ...props.values,
      }}
    >
      <ProFormText required name="fullName" label="Name" />
      <ProFormText
        required
        name="subcategories"
        label="Subcategories"
        placeholder="Enter subcategories separated by commas (e.g. 'Realistic,Chibi')"
      />
      <ProFormSelect
        required
        name="ai_type"
        label="Type"
        valueEnum={{
          'sd-txt2img': 'Text to Image',
          'sd-img2img': 'Image to Image',
        }}
      />
      <ProFormTextArea name="description" label="Description" />
    </ProForm>
  </Modal>
);

export default UpdateForm;
