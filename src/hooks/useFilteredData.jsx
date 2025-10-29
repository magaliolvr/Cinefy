import { useMemo } from "react";

export function useFilteredData(dataSets, searchValue, key = "title") {
    return useMemo(() => {
        if (!dataSets) return [];

        // Garante que sempre teremos um único array para filtrar
        const allItems = Array.isArray(dataSets[0])
            ? dataSets.flat() // se for um array de arrays
            : dataSets; // se for apenas um array

        if (!Array.isArray(allItems)) return [];

        // Se não digitou nada, retorna todos os itens
        if (!searchValue) return allItems;

        const lowerSearch = searchValue.toLowerCase();

        //  Filtra por 'key', ou tenta 'title' / 'name' como fallback(fallback é uma alternativa caso a primeira opção não exista)
        return allItems.filter((item) => {
            const field =
                item[key] ||
                item.title ||
                item.name ||
                item.original_title ||
                item.original_name;
            return field?.toLowerCase().includes(lowerSearch);
        });
    }, [dataSets, searchValue, key]);
}

// dataSearch : é um array ou um array de arrays com os dados que você quer filtrar.Ex.: [movies, series] ou [homeItems]. Por que o hook precisa saber sobre quais dados aplicar o filtro.
// SearchValue :é o texto que o usuário digitou no Search. Por que o filtro precisa comparar cada item do array com esse valor. O hook vai verificar se item[key] contém searchValue.
// key = "title" : é o campo do objeto que será filtrado. Por padrão é "title" porque filmes têm movie.title por exemplo . Dá pra mudar se quiser filtrar outro campo, ex.: name, overview.
