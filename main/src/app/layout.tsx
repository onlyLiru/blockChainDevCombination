import "./globals.css";
import RecoilRootWrapper from "@/components/wrappers/RecoilRootWrapper";
import styles from "@/app/index.module.css";

import { Providers } from "./providers";

export const metadata = {
  title: "Tornado",
  description: "web3 tornado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div className={styles.container}>
          <RecoilRootWrapper>
            <Providers>{children}</Providers>
          </RecoilRootWrapper>
        </div>
      </body>
    </html>
  );
}
