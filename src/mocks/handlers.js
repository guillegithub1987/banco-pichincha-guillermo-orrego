import { rest } from 'msw';

const DUMMY_DATA = [
    {
        id: 351,
        name: 'Alakazam',
        image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/065.png',
        attack: 79,
        defense: 61,
        hp: 55,
        type: 'Eléctrico',
        idAuthor: 1,
    },
    {
        id: 192,
        name: 'raticate2',
        image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/020.png',
        attack: 72,
        defense: 67,
        hp: 0,
        type: 'Default',
        idAuthor: 1,
    },
    {
        id: 195,
        name: 'ekans',
        image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png',
        attack: 3,
        defense: 53,
        hp: 55,
        type: 'Original',
        idAuthor: 1,
    },
];

export const handlers = [
    rest.get(
        'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/',
        async (req, res, ctx) => {
            return res(ctx.json(DUMMY_DATA));
        }
    ),
    rest.delete(
        'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/351',
        async (req, res, ctx) => {
            return res(ctx.json());
        }
    ),
    rest.put(
        'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/351',
        async (req, res, ctx) => {
            return res(ctx.json());
        }
    ),
    rest.post(
        'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/',
        async (req, res, ctx) => {
            return res(ctx.json());
        }
    ),
];
