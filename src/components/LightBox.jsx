const LightBox = ({ imageLink, isActive }) => {

    return (
        <>
            <div id="lightbox" className={isActive ? "active" : ""} >
                <img src={imageLink} />
            </div>
        </>
    );
};

export default LightBox;
