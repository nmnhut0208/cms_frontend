import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer
      ghost
      header={{
        title: 'Access example',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>Only admin can see this button</Button>
      </Access>
    </PageContainer>
  );
};

export default AccessPage;
