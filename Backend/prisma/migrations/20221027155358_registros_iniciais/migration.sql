INSERT INTO tbartista (nome)
VALUES
    ('Yung Buda'),
    ('Nirvana'),
    ('Bring Me The Horizon'),
    ('Charlie Brown Jr'),
    ('Rammstein'),
    ('Muse'),
    ('Audioslave'),
    ('Alice in Chains'),
    ('Racionais MCs'),
    ('Pearl Jam');

INSERT INTO tbalbum (artista_id,nome,ano)
VALUES  
    (1, 'Zero', 2022),
    (2, 'Nevermind', 1991),
    (3, 'Sempiternal', 2013),
    (4, 'Ritmo, Ritual e Responsa', 2007),
    (5, 'Mutter', 2001),
    (6, 'The 2nd Law', 2012),
    (7, 'Audioslave', 2002),
    (8, 'Dirt', 1992),
    (9, 'Sobrevivendo no Inferno', 1997),
    (10, 'Ten', 1991);

INSERT INTO tbmusica (album_id,nome)
VALUES  
    (1, 'Subaru Azul'),
    (2, 'Smells Like Teen Spirit'),
    (3, 'Shadow Moses'),
    (4, 'Pontes Indestrutíveis'),
    (5, 'Mein Herz brennt'),
    (6, 'Supremacy'),
    (7, 'Like a Stone'),
    (8, 'Down in a Hole'),
    (9, 'Diário de um Detento'),
    (10, 'Even Flow');

INSERT INTO tbvenda (album_id,observacao)
VALUES  
    (1, 'Compra digital'),
    (2, 'Compra física'),
    (3, 'Compra digital'),
    (4, 'Compra física'),
    (5, 'Compra física'),
    (6, 'Compra digital'),
    (7, 'Compra física'),
    (8, 'Compra física'),
    (9, 'Compra física'),
    (10, 'Compra física');