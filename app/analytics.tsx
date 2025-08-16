import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <>
      <VercelAnalytics />
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}
