import { DatabaseOption } from "@types";

export function timestampToReadableDate(timestamp: Date | string): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

export function getDatabaseName(database: DatabaseOption) {
  return Object.keys(DatabaseOption)[
    Object.values(DatabaseOption).indexOf(database)
  ];
}
