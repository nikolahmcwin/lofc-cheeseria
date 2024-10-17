/**
 * Small number of simple back-end unit tests for LoFC Cheeseria POC.
 *
 * @author Nikolah McWin
 * October 2024
 *
 * NOTE:
 *  Only tested the /cheese/:id paths due to time
 *  This is not very comprehensive
 *  Needs a million more tests to be useful
 */

const request = require("supertest");
const app = require("./app.js");

const CHEESES = "/cheeses";
const CHEESE_ID = "/cheeses/:id";

// A few simple tests agains /cheeses GET
describe(`GET ${CHEESES}`, () => {
  //
  test("should respond with 200 status code", async () => {
    const response = await request(app).get(CHEESES);
    expect(response.statusCode).toBe(200);
  });

  test("should specify JSON content type", async () => {
    const response = await request(app).get(CHEESES);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("should contain a cheese", async () => {
    const response = await request(app).get(CHEESES);
    const numCheeses = response.body.length;
    expect(numCheeses).toBeGreaterThan(0);
  });

  test("should contain a cheese that has an id", async () => {
    const response = await request(app).get(CHEESES);
    const cheese = response.body[0];
    expect(cheese).toHaveProperty("id");
  });

  test("should contain a cheese that has a numerical id", async () => {
    const response = await request(app).get(CHEESES);
    const cheese = response.body[0];
    expect(cheese.id).toBeGreaterThan(0);
  });
});

// A few simple tests agains /cheeses POST
describe(`POST ${CHEESES}`, () => {
  describe("when cheese data is provided", () => {
    test("should contain a new numerical id", async () => {
      //TODO
    });

    test("should increase number of cheeses", async () => {
      //TODO
    });
  });

  describe("when no data is provided", () => {
    test("should respond with 400 status code", async () => {
      const response = await request(app).post(CHEESES).send("{}");
      expect(response.statusCode).toBe(400);
    });
    test("should not contain cheese name", async () => {
      const response = await request(app).post(CHEESES).send("{}");
      expect(response.body).not.toHaveProperty("name");
    });
    test("should not increase number of cheeses", async () => {
      //TODO
    });
  });
});

// A few simple tests agains /cheeses/:id GET
describe(`GET ${CHEESE_ID}`, () => {
  //
  describe("when an ID is provided", () => {
    //
    // Good cheese ID
    describe("when ID is valid", () => {
      const id = 1;

      test("should respond with 200 status code", async () => {
        const response = await request(app).get(`${CHEESES}/${id}`);
        expect(response.statusCode).toBe(200);
      });

      test("should specify JSON content type", async () => {
        const response = await request(app).get(`${CHEESES}/${id}`);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
      });

      test("should contain a cheese with the same id", async () => {
        const response = await request(app).get(`${CHEESES}/${id}`);
        expect(response.body).toHaveProperty("id", id);
      });

      test("should contain a name", async () => {
        const response = await request(app).get(`${CHEESES}/${id}`);
        expect(response.body).toHaveProperty("name");
      });

      test("should contain a price", async () => {
        const response = await request(app).get(`${CHEESES}/${id}`);
        expect(response.body).toHaveProperty("price");
      });

      test("should contain a colour", async () => {
        const response = await request(app).get(`${CHEESES}/${id}`);
        expect(response.body).toHaveProperty("colour");
      });
    });

    // Not found cheese ID
    describe("when ID is out of range", () => {
      const id = 999;

      test("should respond with 404 status code", async () => {
        const response = await request(app).get(`${CHEESES}/${id}`);
        expect(response.statusCode).toEqual(404);
      });

      test("should not contain cheese name", async () => {
        const response = await request(app).get(`${CHEESES}/${id}`);
        expect(response.body).not.toHaveProperty("name");
      });
    });

    // Invalid cheese ID
    describe("when ID is not numeric", () => {
      const id = "x";

      test("should respond with 400 status code", async () => {
        const response = await request(app).get(`${CHEESES}/${id}`);
        expect(response.statusCode).toEqual(400);
      });

      test("should not contain cheese name", async () => {
        const response = await request(app).get(`${CHEESES}/${id}`);
        expect(response.body).not.toHaveProperty("name");
      });
    });
  });
});
