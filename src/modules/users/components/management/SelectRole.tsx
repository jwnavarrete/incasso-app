import { Box } from "@mui/system";
import SelectOptionUI from "@/common/components/ui/SelectOptionUI";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useUserContext } from "@/modules/users/context/userContext";
import { notifyInfo } from "@/common/lib/notifications";
import { ErrorHandler } from "@/common/lib/errors";

interface SelectRoleProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  roles: { value: string; description: string }[];
}

export const SelectRole: React.FC<SelectRoleProps> = ({ params, roles }) => {
  const { updateUser } = useUserContext();

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <SelectOptionUI
        value={params.value?.id}
        options={roles}
        onChange={(value) => {
          try {
            updateUser(params.row.id, { roleId: value });
            notifyInfo("Role updated successfully");
          } catch (error) {
            ErrorHandler.showError(error, true);
          }
        }}
        label=""
      />
    </Box>
  );
};
