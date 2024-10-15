import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const MainLayout = () => {
    return (
        <>
            <h1 className="d-flex justify-content-center">Galeria de fotos</h1>
            <hr/>
            <Outlet />
            <ToastContainer />
        </>
    );
};

export default MainLayout;
