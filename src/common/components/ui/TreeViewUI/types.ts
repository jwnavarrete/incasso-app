
type ExtendedTreeItemProps = {
  Icon?: React.ComponentType;
  id: string;
  label: string;
  path?: string;
  disabled?: boolean;
};

type IconRenderProps ={
    Icon: React.ComponentType;
}

interface CustomLabelProps {
  Icon?: React.ComponentType;
  children: React.ReactNode;
  path?: string;
  [key: string]: any;
}