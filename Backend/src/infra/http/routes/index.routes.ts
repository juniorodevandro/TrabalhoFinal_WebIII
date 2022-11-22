import { Router } from "express";

import ArtistaController from "../../../controller/ArtistaController";
import AlbumController from "../../../controller/AlbumController";
import MusicaController from "../../../controller/MusicaController";
import VendaController from "../../../controller/VendaController";

const Routes = Router();

Routes.get("/artista", ArtistaController.List);
Routes.post("/artista", ArtistaController.Create);
Routes.put("/artista", ArtistaController.Update);
Routes.delete("/artista", ArtistaController.Delete);

Routes.get("/album", AlbumController.List);
Routes.post("/album", AlbumController.Create);
Routes.put("/album", AlbumController.Update);
Routes.delete("/album", AlbumController.Delete);

Routes.get("/musica", MusicaController.List);
Routes.post("/musica", MusicaController.Create);
Routes.put("/musica", MusicaController.Update);
Routes.delete("/musica", MusicaController.Delete);

Routes.get("/venda", VendaController.List);
Routes.post("/venda", VendaController.Create);
Routes.put("/venda", VendaController.Update);
Routes.delete("/venda", VendaController.Delete);

export default Routes;