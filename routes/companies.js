/**Company routes for Node app */
const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();

/** 
 * GET /companies : Returns list of companies, like {companies: [{code, name}, ...]} 
*/

router.get("/", async function (req, res, next) {
    try {
        const query = await db.query(
            "SELECT code, name FROM companies ORDER BY name"
        );

        return res.json({"companies": query.rows});
    } catch (err) {
        return next(err)
    }
})

/**
 * GET /companies/[code] : Return obj of company: {company: {code, name, description}}
 * If the company given cannot be found, this should return a 404 status response.
*/

/**
 * POST /companies : Adds a company. Needs to be given JSON like: {code, name, description}
 * Returns obj of new company:  {company: {code, name, description}}
*/

/**
 * PUT /companies/[code] : Edit existing company. Should return 404 if company cannot be found.
 * Needs to be given JSON like: {name, description} 
 * Returns update company object: {company: {code, name, description}}
*/

/**
 * DELETE /companies/[code] : Deletes company. Should return 404 if company cannot be found.
 * Returns {status: "deleted"}
*/