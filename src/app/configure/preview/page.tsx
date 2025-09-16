import { db } from '@/db';
import { notFound } from 'next/navigation';
import DesignPreview from './DesignPreview';

interface PreviewPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams }: PreviewPageProps) => {
  const { id } = await searchParams;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  return <DesignPreview configuration={configuration} />;
};

export default Page;
