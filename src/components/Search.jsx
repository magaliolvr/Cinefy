import { useState } from "react";
import "./Search.scss";

function Search({ value, onChange }) {
    const [showInput, setShowInput] = useState(false);

    // search global controlado por estado compartilhado, termo técnico “lifting state up” (elevar o estado para um componente pai)
    //  O Search envia o valor →
    //  O NavHeader apenas repassa →
    //  O DefaultLayout guarda esse valor no estado →
    //  O valor guardado é acessado pelas páginas (MoviesList, TvShowList, etc.) via Outlet Context →
    //  Cada página usa esse valor para aplicar o filtro nos seus dados.

    return (
        <form
            className={`search-wrap ${showInput ? "show-input" : ""}`}
            role="search"
        >
            <input
                value={value}
                type="search"
                placeholder="Search..."
                className="input-search"
                onChange={(e) => onChange(e.target.value)} />

            <button
                type="button"
                className="icon-search"
                onClick={() => {
                    if (value) {
                        // Se tiver texto, limpa o input
                        onChange("");
                    } else {
                        // Se estiver vazio, fecha o input
                        setShowInput(prev => !prev);
                    }
                }}
            />
        </form>
    );
}

export default Search;
