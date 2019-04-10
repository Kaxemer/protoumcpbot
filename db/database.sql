CREATE TABLE aliases (
    id serial NOT NULL,
    alias varchar(50) NOT NULL,
    game_id integer REFERENCES games(id)
);

CREATE TABLE games (
    id serial NOT NULL,
    discord_id integer NOT NULL,
    name varchar(50) NOT NULL
);
