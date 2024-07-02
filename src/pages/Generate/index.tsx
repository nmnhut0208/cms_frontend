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
const fallbackImage =
  'data:image/png;base64,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';

function chunkArray(array: any[]) {
  let result = [];
  for (let i = 0; i < array.length; i += 3) {
    result.push(array.slice(i, i + 3));
  }
  return result;
}

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
      properties: properties,
      img: base64Image?.split('data:image/png;base64,')[1] || '',
      upload: upload?.file,
    };
    delete body.upload;
    for (let i = 0; i < (numImages || 1); i++) {
      try {
        const res = await generateImage(body);
        setGeneratedImages((prev) => [
          ...prev,
          `data:image/png;base64,${res.image}`,
        ]);
        message.success(`Image ${i + 1} generated successfully`);
      } catch (error) {
        console.log(error);
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
                customRequest: ({ file, onSuccess }) => {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    form.setFieldValue('base64Image', e.target?.result);
                    if (onSuccess) onSuccess('ok');
                  };
                  reader.readAsDataURL(file as Blob);
                },
              }}
              accept="image/png, image/jpeg"
              action={undefined}
              title="Upload photo"
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
        <ProCard title="Results" wrap>
          {chunkArray(generatedImages).map((chunk, index) => (
            <ProCard.Group key={index} gutter={16} direction="row">
              {chunk.map((image, i) => (
                <ProCard
                  key={i}
                  colSpan="30%"
                  bordered
                  style={{ padding: '5px' }}
                >
                  <Image src={image} fallback={fallbackImage} />
                </ProCard>
              ))}
            </ProCard.Group>
          ))}
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default GeneratePage;
