import { useState } from "react";
import { useNavigate } from "react-router-dom";


function NewPostPage() {
    const [imageLink, setImageLink] = useState("");
    const [categoria, setCategoria] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const foto = {
            criador: localStorage.getItem("USERNAME"),
            imagem: imageLink,
            categoria: categoria,
            comentarios: [],
        }

        try {
            const resp = await fetch(`/api/fotos/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(foto),
            });
            navigate("/");
            return;
        }
        catch {
            alert("Erro ao fazer post!")
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Novo Post</h1>
            <div className="d-flex flex-column gap-3 mb-3">
                <input
                    className="form-input"
                    type="text"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    placeholder="Link da imagem"
                />
                <input
                    className="form-input"
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder="Categoria"
                />
            </div>
            <button className="form-button btn btn-primary mb-2" type="submit">
                Postar
            </button>
        </form>
    );
};

export default NewPostPage;
