-- DropForeignKey
ALTER TABLE "tbalbum" DROP CONSTRAINT "tbalbum_artista_id_fkey";

-- DropForeignKey
ALTER TABLE "tbmusica" DROP CONSTRAINT "tbmusica_album_id_fkey";

-- DropForeignKey
ALTER TABLE "tbvenda" DROP CONSTRAINT "tbvenda_album_id_fkey";

-- AlterTable
ALTER TABLE "tbalbum" ALTER COLUMN "artista_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tbmusica" ALTER COLUMN "album_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tbvenda" ALTER COLUMN "album_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tbalbum" ADD CONSTRAINT "tbalbum_artista_id_fkey" FOREIGN KEY ("artista_id") REFERENCES "tbartista"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbmusica" ADD CONSTRAINT "tbmusica_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "tbalbum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbvenda" ADD CONSTRAINT "tbvenda_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "tbalbum"("id") ON DELETE SET NULL ON UPDATE CASCADE;
