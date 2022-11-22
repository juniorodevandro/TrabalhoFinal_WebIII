-- CreateTable
CREATE TABLE "tbartista" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "tbartista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbalbum" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "ano" INTEGER NOT NULL,
    "artista_id" INTEGER NOT NULL,

    CONSTRAINT "tbalbum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbmusica" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "album_id" INTEGER NOT NULL,

    CONSTRAINT "tbmusica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbvenda" (
    "id" SERIAL NOT NULL,
    "observacao" VARCHAR NOT NULL,
    "album_id" INTEGER NOT NULL,

    CONSTRAINT "tbvenda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbalbum" ADD CONSTRAINT "tbalbum_artista_id_fkey" FOREIGN KEY ("artista_id") REFERENCES "tbartista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbmusica" ADD CONSTRAINT "tbmusica_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "tbalbum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbvenda" ADD CONSTRAINT "tbvenda_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "tbalbum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
