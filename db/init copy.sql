CREATE TABLE boky (
     id_boky INTEGER NOT NULL PRIMARY KEY,
     anarana TEXT NOT NULL
);
CREATE TABLE toko_sy_andininy (
     id_toko_sy_andininy INTEGER NOT NULL  PRIMARY KEY,
     boky INTEGER NOT NULL,
     toko INTEGER NOT NULL,
     andininy INTEGER NOT NULL,
     soratra TEXT NOT NULL,
     CONSTRAINT fk_boky_toko_sy_andininy FOREIGN KEY(boky)
     REFERENCES boky(id_boky)
);
CREATE TABLE fanampiny (
     id_fanampiny INTEGER NOT NULL PRIMARY KEY,
     toko_sy_andininy INTEGER NOT NULL,
     marika TEXT,   -- null == soramandry
     soratra TEXT NOT NULL,
     CONSTRAINT fk_fanampiny_toko_sy_andininy FOREIGN KEY(toko_sy_andininy)
          REFERENCES toko_sy_andininy(id_toko_sy_andininy)
);
