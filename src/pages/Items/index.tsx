import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';

const SubServicePage: React.FC = () => {
  const params = useParams();

  return (
    <PageContainer
      ghost
      header={{
        title: "Service's items",
      }}
    >
      <div>
        <h1>Items example</h1>
        <p>Params: {JSON.stringify(params)}</p>
      </div>
    </PageContainer>
  );
};

export default SubServicePage;
