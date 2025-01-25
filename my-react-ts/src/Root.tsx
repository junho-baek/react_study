import { Outlet } from "react-router-dom";
function Root() {
  return (
    <div>
      <Outlet context={{ darkMode: true }} />
    </div>
  );
}
export default Root;
