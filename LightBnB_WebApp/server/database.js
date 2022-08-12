const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "labber",
  password: "labber",
  database: "lightbnb_db",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// getUserWithEmail
const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      if (result) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// getUserWithId
const getUserWithId = function (id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      if (result) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

// addUser
const addUser = function (user) {
  return pool
    .query(
      `INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      [user.name, user.email, user.password]
    )
    .then((result) => {
      if (result) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

// getAllReservations
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
      FROM reservations
      JOIN properties ON properties.id = reservations.property_id
      JOIN property_reviews ON properties.id = property_reviews.property_id
      WHERE reservations.guest_id = $1
      GROUP BY properties.id, reservations.id
      ORDER BY reservations.start_date
      LIMIT $2;`,
      [guest_id, limit]
    )
    .then((result) => {
      if (result) {
        console.log(result.rows);
        return result.rows;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

// getAllReservations
const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1=1 `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += ` AND city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += ` AND owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    let min = parseInt(options.minimum_price_per_night) * 100;
    let max = parseInt(options.maximum_price_per_night) * 100;
    queryParams.push(min, max);
    queryString += ` AND cost_per_night >= $${
      queryParams.length - 1
    } AND cost_per_night <= $${queryParams.length} `;
  }

  // 4
  if (options.minimum_rating) {
    const rating = parseInt(options.minimum_rating);
    queryParams.push(rating);
    queryString += ` AND rating >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((error) => {
      console.log(error.message);
    });
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

// addProperty
const addProperty = function (property) {
  const queryString = `INSERT INTO properties (
    owner_id,
    title,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    description,
    country,
    street,
    city,
    province,
    post_code
  ) VALUES ($1, $2, $3, $4, $5, $6 ,$7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`;

  const values = [
    property.owner_id,
    property.title,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.description,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code,
  ];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((error) => {
      console.log(error.message);
    });
};
exports.addProperty = addProperty;
