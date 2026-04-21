export default function MainWrapper({ children }: { children: React.ReactNode }) {
  return <main className="flex flex-col">{children}</main>;
}
