import services from '@/services/demo';
import { trim } from '@/utils/format';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';

const { addService, queryServiceList, modifyService, deleteService } =
  services.ServiceController;

/**
 * Adding Nodes
 * @param fields
 */
const handleAdd = async (fields: API.Service) => {
  const hide = message.loading('Adding');
  try {
    await addService({
      ...fields,
      fullName: trim(fields.fullName),
      name: trim(fields.fullName).toLowerCase().replaceAll(' ', '_'),
    });
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
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await modifyService(
      {
        serviceName: fields.name,
      },
      {
        name: trim(fields.fullName || '')
          .toLowerCase()
          .replaceAll(' ', '_'),
        fullName: fields.fullName || '',
        description: fields.description || '',
        type: fields.type || 'txt2img',
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
const handleRemove = async (selectedRows: API.Service[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  try {
    await deleteService({
      serviceName: selectedRows.find((row) => row.name)?.name,
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
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.Service>();
  const [selectedRowsState, setSelectedRows] = useState<API.Service[]>([]);
  const columns: ProDescriptionsItemProps<API.Service>[] = [
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
      render: (dom, entity) => {
        return <Link to={`/services/${entity.name}`}>{dom}</Link>;
      },
    },
    {
      title: 'Code',
      dataIndex: 'name',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      valueEnum: {
        txt2img: 'Text to Image',
        img2img: 'Image to Image',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Type is required',
          },
        ],
      },
    },
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues(record);
            }}
          >
            Configure
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleRemove([record]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            Delete
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Services',
      }}
    >
      <ProTable<API.Service>
        headerTitle="Service List"
        actionRef={actionRef}
        rowKey="name"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            New
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const data = await queryServiceList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
          return {
            data: data || [],
          };
        }}
        // @ts-ignore
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Chosen{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              service&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            Batch deletion
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.Service, API.Service>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          // @ts-ignore
          columns={columns}
        />
      </CreateForm>
      {formValues && Object.keys(formValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
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
          <ProDescriptions<API.Service>
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
