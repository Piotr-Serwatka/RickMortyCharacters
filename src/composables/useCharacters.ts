import axios from 'axios';
import type { Character } from '@/types/Character'

const API_URL = 'https://rickandmortyapi.com/api/character';

export async function fetchCharacters ()  {
  const cache = localStorage.getItem('characters');

  if (cache) {
    try {
      const parsed = JSON.parse(cache);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      console.warn('Cache parse error, ignoring localStorage');
    }
  }

  // Jeśli brak cache, pobieramy 4 strony
  const pagesToFetch = [1, 2, 3, 4];
  const promises = pagesToFetch.map(page =>
    axios.get(`${API_URL}?page=${page}`)
  );

  try {
    const responses = await Promise.all(promises);

    const allCharacters = responses.flatMap(res =>
      res.data.results.map((character: Character) => ({
        ...character,
        isFavorite: false,
      }))
    );

    localStorage.setItem('characters', JSON.stringify(allCharacters));

    return allCharacters;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
}
