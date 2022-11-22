/*
  Warnings:

  - Made the column `artista_id` on table `tbalbum` required. This step will fail if there are existing NULL values in that column.
  - Made the column `album_id` on table `tbmusica` required. This step will fail if there are existing NULL values in that column.
  - Made the column `album_id` on table `tbvenda` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tbalbum" DROP CONSTRAINT "tbalbum_artista_id_fkey";

-- DropForeignKey
ALTER TABLE "tbmusica" DROP CONSTRAINT "tbmusica_album_id_fkey";

-- DropForeignKey
ALTER TABLE "tbvenda" DROP CONSTRAINT "tbvenda_album_id_fkey";

-- AlterTable
ALTER TABLE "tbalbum" ALTER COLUMN "artista_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "tbmusica" ALTER COLUMN "album_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "tbvenda" ALTER COLUMN "album_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "tbalbum" ADD CONSTRAINT "tbalbum_artista_id_fkey" FOREIGN KEY ("artista_id") REFERENCES "tbartista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbmusica" ADD CONSTRAINT "tbmusica_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "tbalbum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbvenda" ADD CONSTRAINT "tbvenda_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "tbalbum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
