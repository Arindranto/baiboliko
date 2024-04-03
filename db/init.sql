CREATE TABLE boky (
     id_boky INTEGER PRIMARY KEY,
     anarana TEXT NOT NULL
);

CREATE TABLE fitambarana (
     id_fitambarana INTEGER PRIMARY KEY,
     boky INTEGER NOT NULL,
     soratra TEXT,  -- null == soramandry
     sahala INTEGER,     -- texte paralelle
     CONSTRAINT fk_boky_fitambarana FOREIGN KEY(boky)
          REFERENCES boky(id_boky),
     CONSTRAINT fk_fitambarana_reflexive FOREIGN KEY(sahala)
          REFERENCES fitambarana(id_fitambarana)
);

CREATE TABLE toko_sy_andininy (
     id_toko_sy_andininy INTEGER PRIMARY KEY,
     fitambarana INTEGER NOT NULL,
     toko INTEGER NOT NULL,
     andininy INTEGER NOT NULL,
     soratra TEXT NOT NULL,
     CONSTRAINT fk_fitambarana_toko_sy_andininy FOREIGN KEY(fitambarana)
     REFERENCES fitambarana(id_fitambarana)
);

CREATE TABLE fanampiny (
     id_fanampiny INTEGER NOT NULL,
     toko_sy_andininy INTEGER NOT NULL,
     marika TEXT NOT NULL,
     soratra TEXT NOT NULL,
     CONSTRAINT fk_fanampiny_toko_sy_andininy FOREIGN KEY(toko_sy_andininy)
          REFERENCES toko_sy_andininy(id_toko_sy_andininy)
);