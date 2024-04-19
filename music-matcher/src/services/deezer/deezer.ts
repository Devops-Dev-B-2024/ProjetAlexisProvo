import axios from 'axios';
import { throwError } from '../../errors/errorCreator';

const getArtistById = async (id: number) => {
  const response = await axios.get(`https://api.deezer.com/artist/${id}`);
  if (response.data.error) {
    throwError(404, "Ressource doesn't exists");
  } else {
    return response.data;
  }
};

const searchArtist = async (query: string) => {
  const response = await axios.get(
    `https://api.deezer.com/search/artist?q=${query}`,
  );
  return response.data;
};

export default {
  getArtistById,
  searchArtist,
};
