import { useEffect, useState } from "react";
import LightBox from "./LightBox";

const PostsContainer = () => {

    const [fotos, setFotos] = useState([]);
    const [todasFotos, setTodasFotos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [novosComentarios, setNovosComentarios] = useState({});
    const [lightBoxImageLink, setLightBoxImageLink] = useState("");
    const [isLightBoxActive, setIsLightBoxActive] = useState(false);

    const fetchFotos = async () => {
        try {
            const res = await fetch(`/api/fotos/`);
            const data = await res.json();
            setFotos(data);
            const catego = [...new Set(data.map((foto) => foto.categoria))];
            setCategorias(catego);
            setTodasFotos(data);
        } catch (error) {
            alert("Error ao puxar imagens do banco de dados!")
        }
    }

    useEffect(() => {
        fetchFotos();
    }, [])

    const filtro = (categoria) => {
        const fotosFiltradas = todasFotos.filter((foto) => foto.categoria == categoria);
        setFotos(fotosFiltradas);
    };

    const lightBox = (imageLink) => {
        setLightBoxImageLink(imageLink);
        setIsLightBoxActive(true);
    };

    const handleComentarioChange = (e, fotoId) => {
        setNovosComentarios((prev) => ({
            ...prev,
            [fotoId]: e.target.value,
        }));
    };

    const handleComentario = async (e, foto) => {
        e.preventDefault();

        const newCommentId = Number(foto.comentarios.at(-1)?.id ?? "1") + 1;
        foto.comentarios.push({ id: String(newCommentId), criador: localStorage.getItem("USERNAME"), comentario: novosComentarios[foto.id] })
        try {
            const resp = await fetch(`/api/fotos/${foto.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(foto),
            });
            fetchFotos();
            setNovosComentarios((prev) => ({
                ...prev,
                [foto.id]: "",
            }))
        }
        catch {
            alert("Erro ao publicar comentario!")
        }
    };

    return (
        <>
            <div className="d-flex align-items-center m-3">
                <strong>Filtro por categoria:</strong>
                <div>
                    <button className="btn btn-dark m-2" onClick={() => setFotos(todasFotos)}>Todas</button>
                    {categorias.map((categoria) => (
                        <button className="btn btn-dark m-2" key={categoria} onClick={() => filtro(categoria)}>{categoria}</button>
                    ))}
                </div>
            </div>

            <div className="d-flex flex-wrap gap-2 m-3">
                {fotos.map((foto) => (
                    <div className="d-flex border border-5 rounded-5 border-success-subtle text-black p-2 bg-secondary-subtle" key={foto.id} style={{ width: "49%" }}>
                        <div className="d-flex flex-column align-items-center w-75">
                            <strong className="m-1 text-center">{foto.criador}</strong>
                            <img className="w-100 rounded-4" src={foto.imagem} onClick={() => lightBox(foto.imagem)} />
                            <div className="d-flex gap-2 mt-3">
                                <p>Compartilhe {"->"}</p>
                                <a href={`http://www.reddit.com/submit?url=&title=Olha%20essa%20imagem%20que%20%40${foto.criador}%20postou!%20${foto.imagem}`} className="link-primary">Reddit</a>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=Olha%20essa%20imagem%20que%20%40${foto.criador}%20postou!%20${foto.imagem}`}>Facebook</a>
                                <a href={`https://twitter.com/intent/tweet?url=&text=Olha%20essa%20imagem%20que%20%40${foto.criador}%20postou!%20${foto.imagem}`}>X</a>
                                <a href={`http://www.linkedin.com/shareArticle?mini=true&url=&title=Olha%20essa%20imagem%20que%20%40${foto.criador}%20postou!%20${foto.imagem}`}>Linkedin</a>
                            </div>
                        </div>
                        <div className="d-flex flex-column justify-content-between m-3">
                            <div>
                                {foto.comentarios.map((comentario) => (
                                    <div className="d-flex" key={comentario.id}>
                                        <p className="m-0">
                                            <strong>{comentario.criador}</strong>: {comentario.comentario}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <form className="d-flex flex-column gap-2" onSubmit={(e) => handleComentario(e, foto)}>
                                    <input
                                        type='text'
                                        id='comentario'
                                        name='comentario'
                                        className='border rounded'
                                        placeholder='Deixe um comentario'
                                        required
                                        value={novosComentarios[foto.id] ?? ""}
                                        onChange={(e) => handleComentarioChange(e, foto.id)}
                                    />
                                    <button className="btn btn btn-secondary" >Comentar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div onClick={() => setIsLightBoxActive(false)}>
                <LightBox imageLink={lightBoxImageLink} isActive={isLightBoxActive} />
            </div>
        </>
    )
}

export default PostsContainer;
