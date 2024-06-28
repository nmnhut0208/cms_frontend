import { fallbackImage } from '@/models/global';
import {
  ModalForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form, Image } from 'antd';

export interface FormValueType extends Partial<API.PartialServiceItem> {
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
  values: API.PartialServiceItem;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm<API.PartialServiceItem>();
  return (
    <ModalForm<API.PartialServiceItem>
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
      <ProFormText
        readonly
        name="fullName"
        label="Name"
        rules={[{ required: true, message: 'Please enter an item name!' }]}
      />
      <ProFormTextArea
        fieldProps={{ autoSize: { minRows: 6, maxRows: 10 } }}
        name="payload"
        label="Payload"
        required
        rules={[
          {
            validator(_rule, value, callback) {
              try {
                JSON.parse(value);
                callback();
              } catch (e) {
                callback('Invalid JSON');
              }
            },
          },
        ]}
      />
      <div>
        <ProFormText name="imgUrl" label="Image URL" />
        <Image width={100} src={props.values.imgUrl} fallback={fallbackImage} />
      </div>
      <ProFormList name="properties" label="Properties">
        {(_meta, _index, action) => {
          return (
            <div key="row">
              <ProFormText required name="name" placeholder="Property name" />
              <ProFormSelect
                required
                name="type"
                placeholder="Property type"
                valueEnum={{
                  input: 'Input',
                  select: 'Select',
                }}
                onChange={(value) => action.setCurrentRowData({ type: value })}
              />
              {action.getCurrentRowData()?.type === 'select' && (
                <ProFormTextArea
                  width={'xl'}
                  required={action.getCurrentRowData()?.type === 'select'}
                  name="selectOptions"
                  placeholder="Comma-separated select values (e.g. 'value1, value2, value3')"
                />
              )}
            </div>
          );
        }}
      </ProFormList>

      <ProFormTextArea name="description" label="Description" />
    </ModalForm>
  );
};

export default UpdateForm;
