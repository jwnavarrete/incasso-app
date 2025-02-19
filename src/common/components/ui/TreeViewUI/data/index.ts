import { FaHome, FaCog, FaUsers, FaSlidersH } from 'react-icons/fa';
import { TreeViewBaseItem } from "@mui/x-tree-view/models";

const TenantAdminItems: TreeViewBaseItem<ExtendedTreeItemProps>[] = [
  { id: "1", label: "Home", Icon: FaHome, path: "/" },
  {
    id: "2",
    label: "Administration",
    Icon: FaCog,
    children: [
      { id: "2.1", label: "Users", Icon: FaUsers, path: "/users" },
      { id: "2.2", label: "Customization", Icon: FaSlidersH },
      // {
      //   id: "1.4",
      //   label: "Blog",
      //   Icon: FaHome,
      //   children: [
      //     { id: "1.1.1", label: "Announcements", Icon: FaHome },
      //     { id: "1.1.2", label: "April lookahead", Icon: FaHome },
      //     { id: "1.1.3", label: "What's new", Icon: FaHome },
      //     { id: "1.1.4", label: "Meet the team", Icon: FaHome },
      //   ],
      // },
    ],
  },  
];

export { TenantAdminItems };
