import { queryServiceList } from '@/services/demo/ServiceController';
import { queryServiceItemList } from '@/services/demo/ServiceItemController';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useEffect, useState } from 'react';

const TestPayloadPage: React.FC = () => {
  const [services, setServices] = useState<API.Service[]>([]);
  const [items, setItems] = useState<API.ServiceItem[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedItem, setSelectedItem] = useState<API.PartialServiceItem>({});
  const [payload, setPayload] = useState<Record<string, any>>({});
  const [basePayload, setBasePayload] = useState<Record<string, any>>({});
  useEffect(() => {
    queryServiceList().then((res) => setServices(res));
  }, []);
  useEffect(() => {
    if (!!selectedService) {
      queryServiceItemList(selectedService).then((res) => setItems(res));
    } else {
      setItems([]);
    }
  }, [selectedService]);
  const [form] = Form.useForm<Partial<API.GenerateTask>>();

  const onSubmit = async (values: any) => {
    const { serviceName, itemName, ...properties } = values;
    console.log({ serviceName, itemName, properties });
    if (Object.keys(basePayload).length === 0) {
      const item =
        selectedItem || {
          ...items.find((item) => item.name === itemName),
        } ||
        {};
      if (!item) return message.error('Invalid item');
      setBasePayload(item.payload || {});
      const customPayload = { ...item.payload };
      if (properties && customPayload?.prompt) {
        for (const [key, value] of Object.entries(properties)) {
          customPayload.prompt = customPayload?.prompt.replace(
            `{${key}}`,
            value,
          );
        }
      }
      setPayload(customPayload || {});
    } else {
      const customPayload = { ...basePayload };
      if (properties && customPayload?.prompt) {
        for (const [key, value] of Object.entries(properties)) {
          customPayload.prompt = customPayload?.prompt.replace(
            `{${key}}`,
            value,
          );
        }
      }
      setPayload(customPayload || {});
    }
    return true;
  };

  return (
    <PageContainer>
      <ProCard direction="row" split="vertical" gutter={16}>
        <ProCard title="Input form" colSpan="20%">
          <ProForm form={form} onFinish={onSubmit}>
            <ProFormSelect
              required
              name="serviceName"
              label="Service"
              valueEnum={services.reduce<any>((acc, service) => {
                acc[service.name] = service.fullName;
                return acc;
              }, {})}
              onChange={(value) => {
                setSelectedService(value as string);
                form.setFieldValue('itemName', '');
                return value;
              }}
              onReset={() => setSelectedService('')}
            />
            <ProFormSelect
              required
              name="itemName"
              label="Item"
              valueEnum={items.reduce<any>((acc, item) => {
                acc[item.name] = item.fullName;
                return acc;
              }, {})}
              onChange={(value) => {
                const selectedItem = items.find((item) => item.name === value);
                setSelectedItem(selectedItem || {});
                setBasePayload({});
                return value;
              }}
              onReset={() => setSelectedItem({})}
            />
            <ProFormDependency name={['itemName']}>
              {({ itemName }) => {
                const item =
                  items.find((item) => item.name === itemName) ||
                  selectedItem ||
                  {};
                if (!item) return <></>;
                return (
                  <>
                    {item.properties?.map((property) =>
                      property.type === 'input' ? (
                        <ProFormText
                          required
                          key={property.name}
                          name={property.name}
                          label={property.name}
                        />
                      ) : (
                        <ProFormSelect
                          required
                          key={property.name}
                          name={property.name}
                          label={property.name}
                          valueEnum={property.selectOptions
                            ?.split(/ ?, ?/)
                            .reduce<any>((acc, value) => {
                              acc[value] = value;
                              return acc;
                            }, {})}
                        />
                      ),
                    )}
                  </>
                );
              }}
            </ProFormDependency>
          </ProForm>
        </ProCard>
        <ProCard title="Results" wrap>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(payload, null, 4)}
          </pre>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default TestPayloadPage;
