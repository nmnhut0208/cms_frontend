import DeleteButton from '@/components/DeleteButton';
import services from '@/services/demo';
import { queryServiceList } from '@/services/demo/ServiceController';
import { trim } from '@/utils/format';
import {
  ActionType,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Button, Divider, Drawer, Flex, Image, Tag, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';

const fallbackImage =
  'data:image/png;base64,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';

const {
  addServiceItem,
  queryServiceItemList,
  modifyServiceItem,
  deleteServiceItem,
} = services.ServiceItemController;

/**
 * Adding Nodes
 * @param fields
 */
const handleAdd = async (
  serviceName: string,
  fields: API.PartialServiceItemForm,
) => {
  const hide = message.loading('Adding');
  try {
    await addServiceItem(
      { serviceName },
      {
        ...fields,
        subcategory: fields.subcategory || '',
        fullName: trim(fields.fullName || ''),
        name: trim(fields.fullName || '')
          .toLowerCase()
          .replaceAll(' ', '_'),
        payload: JSON.parse(fields.payload || '{}'),
        properties: fields.properties || [],
      },
    );
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Add failed, please try again!');
    return false;
  }
};

/**
 * Update Node
 * @param fields
 */
const handleUpdate = async (serviceName: string, fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await modifyServiceItem(
      {
        serviceName,
        serviceItemName: fields.name || '',
      },
      {
        name: trim(fields.fullName || '')
          .toLowerCase()
          .replaceAll(' ', '_'),
        fullName: trim(fields.fullName || ''),
        imgUrl: fields.imgUrl || '',
        description: fields.description || '',
        properties: fields.properties || [],
        payload: JSON.parse(fields.payload || '{}'),
      },
    );
    hide();

    message.success('Configuration successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Deleting a Node
 * @param selectedRows
 */
const handleRemove = async (
  serviceName: string,
  selectedRows: API.ServiceItem[],
) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  try {
    await deleteServiceItem({
      serviceName,
      serviceItemName: selectedRows.find((row) => row.name)?.name || '',
    });
    hide();
    message.success('Deleted successfully, will be refreshed soon');
    return true;
  } catch (error) {
    hide();
    message.error('Deletion failed, please try again');
    return false;
  }
};

const TableList: React.FC<unknown> = () => {
  const params = useParams<{ serviceName: string }>();
  const [service, setService] = useState<API.PartialService>({});
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.ServiceItem>();
  useEffect(() => {
    queryServiceList().then((services) => {
      setService(
        services.find((service) => service.name === params.serviceName) || {},
      );
    });
  }, []);

  const columns: ProDescriptionsItemProps<API.ServiceItem>[] = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      // @ts-ignore
      tip: 'Name is an unique key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Name is required',
          },
        ],
      },
    },
    {
      title: 'Code',
      dataIndex: 'name',
      valueType: 'text',
      hideInForm: true,
      // hideInTable: true,
      hideInDescriptions: true,
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
      valueType: 'text',
      valueEnum: service.subcategories
        ?.split(/ ?, ?/)
        .reduce((acc: any, cur) => {
          acc[cur] = cur.replaceAll('_', ' ');
          return acc;
        }, {}),
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Name is required',
          },
        ],
      },
    },
    {
      title: 'Image',
      formItemProps: { label: 'Image URL' },
      dataIndex: 'imgUrl',
      valueType: 'text',
      span: 2,
      renderFormItem: (_schema, config) => (
        <>
          <ProFormText name="imgUrl" />
          <Image
            style={{ marginBottom: '1rem' }}
            width={100}
            src={config.value}
            fallback={fallbackImage}
          />
        </>
      ),
      render: (_dom, entity) => (
        <Image
          height={100}
          style={{ maxWidth: '100px' }}
          src={`${entity.imgUrl}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_100,w_100`}
          preview={{ src: entity.imgUrl }}
          fallback={fallbackImage}
        />
      ),
    },
    {
      title: 'Payload',
      dataIndex: 'payload',
      valueType: 'jsonCode',
      hideInTable: true,
      span: 2,
      // ellipsis: true,
      render: (_dom, entity) => (
        <pre
          style={{ whiteSpace: 'pre-wrap', padding: '5px', border: 'grey 2px' }}
        >
          {JSON.stringify(entity.payload, null, 2)}
        </pre>
      ),
      renderFormItem: () => (
        <ProFormTextArea
          fieldProps={{
            autoSize: { minRows: 6, maxRows: 10 },
          }}
          name="payload"
          required
          rules={[
            {
              validator(_rule, value, callback) {
                try {
                  JSON.parse(value);
                  callback(undefined);
                } catch (e) {
                  callback('Invalid JSON');
                }
              },
            },
          ]}
        />
      ),
    },

    {
      title: 'Properties',
      dataIndex: 'properties',
      valueType: 'formList',
      hideInTable: true,
      hideInForm: true,
      span: 2,
      render: (_dom, entity) => {
        return (
          <Flex gap="4px 0" wrap>
            {entity.properties?.map((property) => (
              <div key={property.name} style={{ marginTop: '5px' }}>
                {property.name}
                <Divider dashed type="vertical" />
                {property.type.toUpperCase()}
                <Divider dashed type="vertical" />
                {!!property.selectOptions && (
                  <Flex gap="4px 0" wrap style={{ marginTop: '5px' }}>
                    {property.selectOptions
                      ?.split(/ ?, ?/)
                      .slice(0, 3)
                      .map((option, index) => (
                        <Tag key={index}>{option}</Tag>
                      ))}
                    <Tag>...</Tag>
                  </Flex>
                )}
              </div>
            ))}
          </Flex>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInTable: true,
      span: 2,
    },
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setRow(record);
            }}
          >
            See details
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setFormValues(record);
              handleUpdateModalVisible(true);
            }}
          >
            Configure
          </a>
          <Divider type="vertical" />
          <DeleteButton
            title={`Delete ${record.fullName} item`}
            description={`Are you sure to delete ${record.fullName} item of ${service.fullName}?`}
            onConfirm={async () => {
              await handleRemove(service.name || '', [record]);
              actionRef.current?.reloadAndRest?.();
            }}
          />
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: `${service.fullName} items`,
      }}
    >
      <ProTable<API.ServiceItem>
        headerTitle={`${service.fullName} item list`}
        actionRef={actionRef}
        rowKey="name"
        search={false}
        pagination={false}
        rowSelection={false}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            New
          </Button>,
        ]}
        request={async () => {
          const data = await queryServiceItemList(params.serviceName || '');
          return {
            data: data || [],
          };
        }}
        // @ts-ignore
        columns={columns}
      />
      <CreateForm
        title={`New ${service.fullName} service item`}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.ServiceItem, API.PartialServiceItemForm>
          onSubmit={async (value) => {
            const success = await handleAdd(service.name || '', value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="name"
          type="form"
          // @ts-ignore
          columns={columns}
        />
      </CreateForm>
      {formValues && Object.keys(formValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(service.name || '', value);
            if (success) {
              handleUpdateModalVisible(false);
              setFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={formValues}
        />
      ) : null}

      <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API.ServiceItem>
            layout="vertical"
            colon={false}
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
