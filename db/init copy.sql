CREATE TABLE boky (
     id_boky INTEGER AUTO INCREMENT PRIMARY KEY,
     anarana TEXT NOT NULL
);

-- /*CREATE TABLE fitambarana (
--      id_fitambarana INTEGER AUTO INCREMENT PRIMARY KEY,
--      -- boky INTEGER NOT NULL,
--      lohateny TEXT,
--      -- sahala INTEGER,
--      -- CONSTRAINT fk_boky_fitambarana FOREIGN KEY(boky)
--      --     REFERENCES boky(id_boky),
--      -- CONSTRAINT fk_fitambarana_reflexive FOREIGN KEY(sahala)
--          -- REFERENCES fitambarana(id_fitambarana)
-- )

-- CREATE TABLE fitambarana_toko_sy_andininy (
--      fitambarana INTEGER NOT NULL,
--      toko_sy_andininy INTEGER NOT NULL,
--      CONSTRAINT pk_fitambarana_toko_sy_andininy PRIMARY KEY (fitambarana, toko_sy_andininy)
-- )*/

CREATE TABLE toko_sy_andininy (
     id_toko_sy_andininy INTEGER AUTO INCREMENT  PRIMARY KEY,
     boky INTEGER NOT NULL,
     toko INTEGER NOT NULL,
     andininy INTEGER NOT NULL,
     soratra TEXT NOT NULL,
     CONSTRAINT fk_boky_toko_sy_andininy FOREIGN KEY(boky)
     REFERENCES boky(id_boky)
);

CREATE TABLE fanampiny (
     id_fanampiny INTEGER AUTO INCREMENT  PRIMARY KEY,
     toko_sy_andininy INTEGER NOT NULL,
     marika TEXT,   -- null == soramandry
     soratra TEXT NOT NULL,
     CONSTRAINT fk_fanampiny_toko_sy_andininy FOREIGN KEY(toko_sy_andininy)
          REFERENCES toko_sy_andininy(id_toko_sy_andininy)
);