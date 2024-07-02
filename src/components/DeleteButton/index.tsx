import { Popconfirm } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

interface DeleteButtonProps {
  onConfirm: () => Promise<void>;
  title?: string;
  description?: string;
  buttonText?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showPopconfirm = (e: any) => {
    e?.preventDefault();
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await props.onConfirm();
      setOpen(false);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => setOpen(false);

  return (
    <Popconfirm
      title={props.title || 'Delete this?'}
      description={props.description || 'Are you sure to delete this?'}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <a className={styles.link} onClick={showPopconfirm}>
        {props.buttonText || 'Delete'}
      </a>
    </Popconfirm>
  );
};

export default DeleteButton;
