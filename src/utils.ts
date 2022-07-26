export function makeImagePath(id: string, format?: string) {
    return `https://image.tmdb.org/t/p/${format?format:"original"}/${id}`;
};


// https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg