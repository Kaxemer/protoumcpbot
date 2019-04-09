CREATE TABLE aliases (
    id serial NOT NULL,
    alias character varying(50) NOT NULL,
    game_id integer REFERENCES games(id)
);

CREATE TABLE games (
    id serial NOT NULL,
    discord_id integer NOT NULL,
    name character varying(50) NOT NULL
);
