import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export interface FormValueType extends Partial<API.ServiceItem> {
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
  values: Partial<API.ServiceItem>;
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
        name: props.values.name,
        code: props.values.code,
        properties: props.values.properties,
        description: props.values.description,
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter a service name!' }]}
      />
      <ProFormTextArea name="description" width="md" label="Description" />
      <ProFormSelect
        width="md"
        name="type"
        label="Type"
        valueEnum={{
          txt2img: 'Text to Image',
          img2img: 'Image to Image',
        }}
      />
    </ProForm>
  </Modal>
);

export default UpdateForm;