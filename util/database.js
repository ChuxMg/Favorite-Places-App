// import * as SQLite from "expo-sqlite";

import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

let database;

async function initializeDatabase() {
  if (!database) {
    database = await SQLite.openDatabaseAsync("places.db");
  }
}

export async function init() {
  await initializeDatabase();
  await database.withTransactionAsync(async (tx) => {
    await tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
        )`
    );
  });
}

export async function insertPlace(place) {
  await initializeDatabase();
  const result = await database.withTransactionAsync(async (tx) => {
    return await tx.executeSqlAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
  });

  return result.insertId;
}

export async function fetchPlaces() {
  await initializeDatabase();
  const result = await database.withTransactionAsync(async (tx) => {
    return await tx.executeSqlAsync("SELECT * FROM places");
  });

  const places = [];

  if (result.rows && result.rows.length > 0) {
    // Expo SQLite web and native might differ in how rows are returned.
    // _array is common for native. For web, it might be directly result.rows
    const rows = result.rows._array || result.rows;
    for (const dp of rows) {
      places.push(
        new Place(
          dp.title,
          dp.imageUri,
          {
            address: dp.address || "Address not available",
            lat: dp.lat,
            lng: dp.lng,
          },
          dp.id
        )
      );
    }
  }

  return places;
}

export async function fetchPlaceDetails(id) {
  await initializeDatabase();
  const result = await database.withTransactionAsync(async (tx) => {
    return await tx.executeSqlAsync("SELECT * FROM places WHERE id = ?", [id]);
  });

  if (result.rows && result.rows.length > 0) {
    const rows = result.rows._array || result.rows;
    const dbPlace = rows[0];
    if (dbPlace) {
      return new Place(
        dbPlace.title,
        dbPlace.imageUri,
        {
          lat: dbPlace.lat,
          lng: dbPlace.lng,
          address: dbPlace.address || "Address not available",
        },

        dbPlace.id
      );
    }
  }

  return null;
}

export async function deletePlace(id) {
  await initializeDatabase();
  const result = await database.withTransactionAsync(async (tx) => {
    return await tx.executeSqlAsync("DELETE FROM places WHERE id = ?", [id]);
  });

  return result;
}
