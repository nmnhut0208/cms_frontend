import { queryServiceList } from '@/services/demo/ServiceController';
import { queryServiceItemList } from '@/services/demo/ServiceItemController';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect, useState } from 'react';

const GeneratePage: React.FC = () => {
  const [services, setServices] = useState<API.Service[]>([]);
  const [items, setItems] = useState<API.ServiceItem[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedItem, setSelectedItem] = useState<API.PartialServiceItem>({});
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
  useEffect(() => {
    console.log('selectedItem', selectedItem);
  }, [selectedItem]);
  const [form] = Form.useForm<Partial<API.GenerateTask>>();

  return (
    <PageContainer>
      <ProCard direction="row" split="vertical" gutter={16}>
        <ProCard title="Input form">
          <ProForm form={form}>
            <ProFormUploadButton
              label="Upload photo"
              name="upload"
              max={1}
              fieldProps={{
                name: 'file',
                // listType: 'picture-card',
              }}
            />
            <ProFormSelect
              name="serviceName"
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
              name="itemName"
              valueEnum={items.reduce<any>((acc, item) => {
                acc[item.name] = item.fullName;
                return acc;
              }, {})}
              onChange={(value) => {
                const selectedItem = items.find((item) => item.name === value);
                setSelectedItem(selectedItem || {});
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
                          key={property.name}
                          required
                          name={property.name}
                          label={property.name}
                        />
                      ) : (
                        <ProFormSelect
                          key={property.name}
                          required
                          name={property.name}
                          label={property.name}
                          valueEnum={property.selectOptions
                            ?.split(', ')
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
        <ProCard title="Results" />
      </ProCard>
    </PageContainer>
  );
};

export default GeneratePage;
