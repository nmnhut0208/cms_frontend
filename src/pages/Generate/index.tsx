import { fallbackImage } from '@/models/global';
import { generateImage } from '@/services/demo/GenerateController';
import { queryServiceList } from '@/services/demo/ServiceController';
import { queryServiceItemList } from '@/services/demo/ServiceItemController';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Form, Image, message } from 'antd';
import { useEffect, useState } from 'react';

const GeneratePage: React.FC = () => {
  const [services, setServices] = useState<API.Service[]>([]);
  const [items, setItems] = useState<API.ServiceItem[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedItem, setSelectedItem] = useState<API.PartialServiceItem>({});
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
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

  const onSubmit = async (values: Partial<API.GenerateTask>) => {
    setGeneratedImages([]);
    console.log('values', values);
    const {
      upload,
      serviceName,
      itemName,
      base64Image,
      numImages,
      ...properties
    } = values;
    const body: API.GenerateTaskBody = {
      category: serviceName as string,
      item_name: itemName as string,
      // img: base64Image as string,
      properties,
      img: base64Image?.split('data:image/png;base64,')[1] || '',
      upload: upload?.file,
    };
    delete body.upload;
    for (let i = 0; i < (numImages || 1); i++) {
      try {
        const res = await generateImage(body);
        setGeneratedImages((prev) => [...prev, res]);
        message.success(`Image ${i + 1} generated successfully`);
      } catch (error) {
        message.error(`Failed to generate image ${i + 1}`);
      }
    }
  };

  return (
    <PageContainer>
      <ProCard direction="row" split="vertical" gutter={16}>
        <ProCard title="Input form">
          <ProForm form={form} onFinish={onSubmit}>
            <ProFormText hidden name="base64Image" />
            <ProFormUploadButton
              required
              label="Upload photo"
              name="upload"
              max={1}
              fieldProps={{
                name: 'file',
                // listType: 'picture-card',
              }}
              title="Upload photo"
              onChange={(value) => {
                if (value.file.percent === 100) {
                  let reader = new FileReader();
                  reader.onload = (e) => {
                    form.setFieldValue('base64Image', e.target?.result);
                  };
                  if (!!value.file.originFileObj)
                    reader.readAsDataURL(value.file.originFileObj);
                }
              }}
            />
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
            <ProFormDigit
              required
              label="Number of images to generate"
              name="numImages"
              min={1}
              max={10}
              fieldProps={{
                precision: 0,
                changeOnWheel: true,
                defaultValue: 1,
              }}
            />
          </ProForm>
        </ProCard>
        <ProCard title="Results">
          {generatedImages.map((image, index) => (
            <ProCard
              key={index}
              colSpan="24%"
              bordered
              style={{ padding: '5px' }}
            >
              <Image src={image} fallback={fallbackImage} />
            </ProCard>
          ))}
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default GeneratePage;
