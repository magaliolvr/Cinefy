export function useFilteredData(items, searchValue, key = "title") {
    if (!items) return [];            // Se items ainda não chegou da API
    if (!searchValue) return items;   // Se não digitou nada, retorna todos
    return items.filter(item =>
        item[key]?.toLowerCase().includes(searchValue.toLowerCase())
    );
}


// Items : é o array de dados que você quer filtrar.Ex.: movies, series, homeItems.Por que o hook precisa saber sobre quais dados aplicar o filtro.
// searchValue :é o texto que o usuário digitou no Search. Por que o filtro precisa comparar cada item do array com esse valor. O hook vai verificar se item[key] contém searchValue.
// key = "title" : é o campo do objeto que será filtrado. Por padrão é "title" porque filmes têm movie.title por exemplo . Dá pra mudar se quiser filtrar outro campo, ex.: name, overview.