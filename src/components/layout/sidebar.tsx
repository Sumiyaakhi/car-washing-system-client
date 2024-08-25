import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/admin.route";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = () => {
  const role = "admin";
  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemGenerator(adminPaths, userRole.ADMIN);
      break;
    // case userRole.USER:
    //   sidebarItems = sidebarItemGenerator(adminPaths, userRole.USER);
    //   break;

    default:
      break;
  }
  return (
    // <Sider breakpoint="lg" collapsedWidth="0">
    //   <div
    //     style={{
    //       color: "white",
    //       height: "4rem",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <h1>Sparkle Wash Pro</h1>
    //   </div>
    //   <Menu
    //     theme="dark"
    //     mode="inline"
    //     defaultSelectedKeys={["4"]}
    //     items={sidebarItems}
    //   />
    // </Sider>
    <></>
  );
};

export default Sidebar;
