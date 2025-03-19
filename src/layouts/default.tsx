import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <>
      <header>navigation</header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
};

export default DefaultLayout;
