import type { Pool } from "mysql2/promise";
import { updateIdSql } from "../sql/update.js";
import { Changes } from "@/routes/front-utils/fitness/catalog/changer/patch.js";

export function updateId(
  id: number,
  table: "catalogo" | "vitrine",
  changes: Changes,
) {
  const update = Object.keys(changes);
  const updateItens = [table, update, id];
}
