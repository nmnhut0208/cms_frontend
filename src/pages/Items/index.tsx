import services from '@/services/demo';
import { trim } from '@/utils/format';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';

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
const handleAdd = async (serviceName: string, fields: API.ServiceItem) => {
  const hide = message.loading('Adding');
  try {
    await addServiceItem(
      { serviceName },
      {
        ...fields,
        fullName: trim(fields.fullName),
        name: trim(fields.fullName).toLowerCase().replaceAll(' ', '_'),
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
        description: fields.description || '',
        properties: fields.properties || [],
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
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.ServiceItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ServiceItem[]>([]);
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
    },
    {
      title: 'Properties',
      dataIndex: 'properties',
      valueType: 'formList',
      hideInTable: true,
      hideInSearch: true,
      renderFormItem: () => (
        <ProFormList name="properties">
          {(
            // Basic information of the current row {name: number; key: number}
            _meta,
            // current line number
            _index,
            /**
             * action
             * @name some shortcut methods for manipulating rows
             * @example add data to the second line action.add?.({},1);
             * @example delete the second line action.remove?.(1);
             * @example moved from 1 to 2: action.move?.(2,1);
             * @example Get the data of the current row: action.getCurrentRowData() -> {id:"xxx",name:'123',age:18}
             * @example Set current row data: {id:"123",name:'123'} -> action.setCurrentRowData({name:'xxx'}) -> {id:"123",name:'xxx' }
             * @example clear the data of the current row: {id:"123",name:'123'} -> action.setCurrentRowData({name:undefined}) -> {id:"123"}
             */
            action,
            // total number of rows
            // _count,
          ) => {
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
                />
                {action.getCurrentRowData()?.type === 'select' && (
                  <ProFormText
                    required={action.getCurrentRowData()?.type === 'select'}
                    name="selectOptions"
                    placeholder="Select values"
                  />
                )}
              </div>
            );
          }}
        </ProFormList>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
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
              handleRemove(params.serviceName || '', [record]);
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
        title: `${params.serviceName} items`,
      }}
    >
      <ProTable<API.ServiceItem>
        headerTitle={`${params.serviceName} item list`}
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
        request={async () => {
          const data = await queryServiceItemList(params.serviceName || '');
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
              serviceItem&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(params.serviceName || '', selectedRowsState);
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
        <ProTable<API.ServiceItem, API.ServiceItem>
          onSubmit={async (value) => {
            const success = await handleAdd(params.serviceName || '', value);
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
            const success = await handleUpdate(params.serviceName || '', value);
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
