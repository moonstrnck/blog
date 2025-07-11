interface Props {
  params: {
    slug: string;
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  return <div>{slug}</div>;
}
