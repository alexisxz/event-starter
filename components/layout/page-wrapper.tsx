export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="overflow-x-hidden">{children}</div>;
}
