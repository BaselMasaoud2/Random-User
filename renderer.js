class Renderer {
    render(data) {
        this.displayUser(data.users[0]);
        this.displayFriends(data.users.slice(1));
        this.displayPokemon(data.pokemon);
        this.displayQuote(data.quote);
        this.displayBaconIpsum(data.ipsum); // שיניתי ל-data.ipsum כי אין אובייקט baconIpsum בתשובה
    }

    displayUser(user) {
        $(".user-container").empty();
        const userTemplate = $("#user-template").html();
        const userHandlebarsTemplate = Handlebars.compile(userTemplate);
        const userHTML = userHandlebarsTemplate(user);
        $(".user-container").append(userHTML);
    }

    displayFriends(users) {
        $(".friends-container").empty();
        const friendsTemplate = $("#friends-template").html();
        const friendsHandlebarsTemplate = Handlebars.compile(friendsTemplate);
        const friendsHTML = friendsHandlebarsTemplate({ friends: users });
        $(".friends-container").append(friendsHTML);
    }

    displayPokemon(pokemon) {
        $(".pokemon-container").empty();
        const pokemonTemplate = $("#pokemon-template").html();
        const pokemonHandlebarsTemplate = Handlebars.compile(pokemonTemplate);
        const pokemonHTML = pokemonHandlebarsTemplate(pokemon);
        $(".pokemon-container").append(pokemonHTML);
    }

    displayQuote(quote) {
        $(".quote-container").empty();
        const quoteTemplate = $("#quote-template").html();
        const quoteHandlebarsTemplate = Handlebars.compile(quoteTemplate);
        const quoteHTML = quoteHandlebarsTemplate({ text: quote });
        $(".quote-container").append(quoteHTML);
    }

    displayBaconIpsum(baconIpsum) {
        $(".meat-container").empty();
        const baconIpsumTemplate = $("#baconIpsum-template").html();
        const baconIpsumHandlebarsTemplate = Handlebars.compile(baconIpsumTemplate);
        const baconIpsumHTML = baconIpsumHandlebarsTemplate({ text: baconIpsum });
        $(".meat-container").append(baconIpsumHTML);
    }
}
