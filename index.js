const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//
//Original Authorizations => /auths
//AATBA => /tbas
//Amendsments => /amends
//Auth_Costs => /costs

//--------------------------------
//Original Authorizations (/auths)
//--------------------------------
//create auth
//TODO

//get all auths
app.get("/auths", async (req, res) => {
  try {
    const allAuths = await pool.query(
      'SELECT * FROM "S0CWB111"."PL_ORIGINAL_AUTHORIZATIONS"'
    );
    res.json(allAuths.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get an auth
app.get("/auths/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await pool.query(
      'SELECT * FROM "S0CWB111"."PL_ORIGINAL_AUTHORIZATIONS" WHERE "PL_KEY" = $1',
      [id]
    );

    res.json(auth.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update an auth
// app.put("/auths/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updateAuth = await pool.query(
//       'UPDATE "S0CWB111"."PL_ORIGINAL_AUTHORIZATIONS" SET description = $1 WHERE "PL_KEY" = $2',
//       [description, id]
//     );

//     res.json("Auth was updated");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//delete an auth?
//TODO

//--------------------
//AATBA (/tbas)
//--------------------
//create tba
//TODO

//get all tbas
app.get("/tbas", async (req, res) => {
  try {
    const allAuths = await pool.query('SELECT * FROM "S0CWB111"."PL_AATBA"');
    res.json(allAuths.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a tba?
app.get("/tbas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await pool.query(
      'SELECT * FROM "S0CWB111"."PL_AATBA" WHERE "PL_KEY" = $1',
      [id]
    );

    res.json(auth.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a tba?

//delete a tba?

//--------------------
//Amendments (/amends)
//--------------------
//create amendment
app.post("/amends", async (req, res) => {
  try {
    const { description } = req.body;
    const newAuth = await pool.query(
      'INSERT INTO "S0CWB111"."PL_AMENDMENTS" (description) VALUES($1) RETURNING *',
      [description]
    );

    res.json(newAuth.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all amendments
app.get("/amends", async (req, res) => {
  try {
    const allAuths = await pool.query(
      'SELECT * FROM "S0CWB111"."PL_AMENDMENTS"'
    );
    res.json(allAuths.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get an amendment
app.get("/amends/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await pool.query(
      'SELECT * FROM "S0CWB111"."PL_AMENDMENTS" WHERE "PL_KEY" = $1',
      [id]
    );

    res.json(auth.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update an amendment?

//delete an amendment?

//--------------------
//Auth_cost (/costs)
//--------------------

//create costs
app.post("/costs", async (req, res) => {
  try {
    const { description } = req.body;
    const newAuth = await pool.query(
      'INSERT INTO "S0CWB111"."PL_AUTH_COST" (description) VALUES($1) RETURNING *',
      [description]
    );

    res.json(newAuth.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all costs
app.get("/costs", async (req, res) => {
  try {
    const allAuths = await pool.query(
      'SELECT * FROM "S0CWB111"."PL_AUTH_COST"'
    );
    res.json(allAuths.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a cost
app.get("/costs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await pool.query(
      'SELECT * FROM "S0CWB111"."PL_AUTH_COST" WHERE "PL_KEY" = $1',
      [id]
    );

    res.json(auth.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//remove a cost
//TODO

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
