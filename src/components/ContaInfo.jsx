import { Link } from "react-router-dom";

const ContaInfo = () => {
    return <div className="d-flex flex-column gap-3 justify-content-start align-items-end me-5">
        <h2 className="text-black">Nome: {localStorage.getItem("USERNAME")}</h2>
        <div className="d-flex gap-2">
            <Link to="/novo-post" className="btn btn-success">Novo Post</Link>
            <Link to="/logout" className="btn btn-danger">Logout</Link>
        </div>
    </div>
};

export default ContaInfo;
