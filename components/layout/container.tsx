const maxWidthMap = {
  small: "container-small",
  medium: "container-medium",
  large: "container-large",
} as const;

type ContainerProps = {
  size?: keyof typeof maxWidthMap;
  children: React.ReactNode;
};

export default function Container({ size = "large", children }: ContainerProps) {
  return <div className={`mx-auto w-full ${maxWidthMap[size]}`}>{children}</div>;
}
