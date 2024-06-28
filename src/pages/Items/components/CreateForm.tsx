import { Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

interface CreateFormProps {
  title: string;
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { modalVisible, onCancel, title } = props;

  return (
    <Modal
      destroyOnClose
      title={title}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
