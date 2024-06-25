import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';

const SubServicePage: React.FC = () => {
  const params = useParams();

  return (
    <PageContainer
      ghost
      header={{
        title: 'Sub-service example',
      }}
    >
      <div>
        <h1>Sub-service example</h1>
        <p>Params: {JSON.stringify(params)}</p>
      </div>
    </PageContainer>
  );
};

export default SubServicePage;
