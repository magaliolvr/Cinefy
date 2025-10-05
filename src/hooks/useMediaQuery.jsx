import { useEffect, useState } from "react";

export function useMediaQuery(query) {
    const [isMatch, setIsMatch] = useState(() => window.matchMedia(query).matches);
    // estamos a criar um estado que vai guardar se a media query corresponde ou não. "window" é um objeto global que representa a janela do navegador. matchMedia é um método que permite verificar se um determinado media query corresponde ao estado atual da janela.(query) é a string que representa a media query que queremos verificar..matches é uma propriedade do objeto retornado por matchMedia que indica se a media query corresponde ou não.

    useEffect(() => {
        const media = window.matchMedia(query);
        // Estado inicial baseado na media query

        const listener = () => setIsMatch(media.matches);

        media.addEventListener("change", listener);
        // Listener que atualiza o estado quando a media query muda

        return () => media.removeEventListener("change", listener);

    }, [query]);

    return isMatch;
}

// useMediaQuery é um hook personalizado que permite verificar se uma determinada media query corresponde ao estado atual da janela do navegador. Ele retorna um valor booleano indicando se a media query corresponde ou não. O hook utiliza o useState para armazenar o estado da correspondência e o useEffect para adicionar e remover um listener que atualiza o estado sempre que a media query muda.

