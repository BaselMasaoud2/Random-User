// class ApiManager {
//     constructor() {
//         this.pokemonApi = new PokemonApi();
//         this.quoteApi = new QuoteApi();
//         this.userApi = new UserApi();
//         this.baconIpsumApi = new BaconIpsumApi();
//     }

//     // TODO add Docs/comment
//     // TODO get 7 users
//     async getRandomData() {
//         const EXTRA_USERS_COUNT = 3;
//         const usersPromises = []
//         for(let i = 0; i <= EXTRA_USERS_COUNT; ++i) {
//             usersPromises.push(this.getRandomUser());
//         }
        
//         return Promise.all([this.getRandomPokemon(), this.getRandomQuote(), this.getRandomBaconIpsum(), ...usersPromises])
//         .then((data) => {
//             return {
//                 pokemon: data[0],
//                 quote: data[1],
//                 baconIpsum: data[2],
//                 users: data.splice(3)
//             };
//         })
//     }

//     getRandomPokemon() {
//         return this.pokemonApi.getRandomPokemon();
//     }

//     getRandomUser() {
//         return this.userApi.getRandomUser();
//     }

//     getRandomQuote() {
//         return this.quoteApi.getRandomQuote();
//     }

//     getRandomBaconIpsum() {
//         return this.baconIpsumApi.getRandomBaconIpsum();
//     }
// }






class IpsumGenerator {
    async getRandomIpsum(apiEndpoint) {
        const ipsum = await $.get(apiEndpoint);
        return ipsum[0];
    }
}

class CustomPokemon {
    constructor(pokemon) {
        this.name = pokemon.name;
        this.imgUrl = pokemon.sprites.front_default;
    }
}

class PokemonApi {
    constructor() {
        this._pokemonCount = DEFAULT_POKEMON_COUNT;
        this._getPokemonCount();
    }

    async getRandomPokemon() {
        const pokemonURL = await this._getPokemonURL(this._getRandomPokemonId());
        const pokemon = await $.get(pokemonURL);
        return new CustomPokemon(pokemon);
    }

    async _getPokemonURL(pokemonId) {
        const response = await $.get(`${POKEMON_API}?limit=1&offset=${pokemonId}/`);
        return response.results[0].url;
    }

    _getRandomPokemonId() {
        return Math.floor(Math.random() * this._pokemonCount);
    }

    _getPokemonCount() {
        return $.get(POKEMON_API)
            .then(data => {
                this._pokemonCount = data.count;
            });
    }
}

class QuoteApi {
    async getRandomQuote() {
        const quote = await $.get(QUOTE_API);
        return quote.quote;
    }
}

class CustomUser {
    constructor(user) {
        this.firstName = user.name.first;
        this.lastName = user.name.last;
        this.city = user.location.city;
        this.state = user.location.state;
        this.picture = user.picture.medium;
    }
}

class UserApi {
    async getRandomUser() {
        const user = await $.get(USER_API);
        return new CustomUser(user.results[0]); 
    }
}

class ApiManager {
    constructor() {
        this.pokemonApi = new PokemonApi();
        this.quoteApi = new QuoteApi();
        this.userApi = new UserApi();
        this.ipsumGenerator = new IpsumGenerator();
    }

    async getRandomData() {
        const EXTRA_USERS_COUNT = 3;
        const usersPromises = [];
        
        for(let i = 0; i <= EXTRA_USERS_COUNT; ++i) {
            usersPromises.push(this.getRandomUser());
        }
        
        return Promise.all([
            this.getRandomPokemon(),
            this.getRandomQuote(),
            this.getRandomIpsum(BACON_IPSUM_API),
            ...usersPromises
        ]).then((data) => {
            return {
                pokemon: data[0],
                quote: data[1],
                ipsum: data[2],
                users: data.splice(3)
            };
        });
    }

    getRandomPokemon() {
        return this.pokemonApi.getRandomPokemon();
    }

    getRandomUser() {
        return this.userApi.getRandomUser();
    }

    getRandomQuote() {
        return this.quoteApi.getRandomQuote();
    }

    getRandomIpsum(apiEndpoint) {
        return this.ipsumGenerator.getRandomIpsum(apiEndpoint);
    }
}

const USER_API = "https://randomuser.me/api/?format=json";
const QUOTE_API = "https://api.kanye.rest/pokemon/";
const POKEMON_API = "https://pokeapi.co/api/v2/pokemon";
const BACON_IPSUM_API = "https://baconipsum.com/api/?type=meat-and-filler&paras=1";

const DEFAULT_POKEMON_COUNT = 1292;

