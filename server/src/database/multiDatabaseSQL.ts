import { DatabaseOption, TableOption } from "../../../shared/types";

/**
 * Generates the SQL for creating any regional table
 * @param tableName
 * @param regionAbbreviation e.g. UK
 * @param fields Everything that comes after "CREATE TABLE x"
 * @returns A complete SQL command for creating a table
 */
function createRegionalTableSQL(
  tableName: string,
  regionAbbreviation: string,
  fields: string
) {
  const name = `${tableName}_${regionAbbreviation}`;
  return `CREATE TABLE ${name}(${fields});`;
}

/**
 * Generates the SQL for creating all regional tables
 * @param regionAbbreviation e.g. UK
 * @returns All SQL commands for creating regional tables for a specific region
 */
function createAllRegionalTablesSQL(regionAbbreviation: string) {
  const createCommands = Object.entries(TableOption).map(
    ([tableKey, tableValue]) => {
      const fields = `postid SERIAL PRIMARY KEY,
	content BYTEA`; // TODO get fields for each table from an enum
      return createRegionalTableSQL(tableValue, regionAbbreviation, fields);
    }
  );
  return createCommands.join("\n");
}

export function createAllRegionsAllTablesSQL() {
  const allRegionsAllRegionalTables = Object.entries(DatabaseOption).map(
    ([dbKey, dbValue]) => {
      return createAllRegionalTablesSQL(dbValue);
    }
  );
  return allRegionsAllRegionalTables.join("\n");
}
