type UserDetailPageProps = {
  params: {
    userDetail: string;
  };
};

export default function UserDetailPage({ params }: UserDetailPageProps) {

    const id = params.userDetail;
  return <div></div>;
}
