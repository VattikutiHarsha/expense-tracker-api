const request = require("supertest");
const app = require("../src/app");

const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(
    __dirname,
    "..",
    "src",
    "data",
    "expenses.json"
);

beforeEach(async () => {
    await fs.writeFile(
        filePath,
        JSON.stringify([], null, 2)
    );
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

describe("Expense API", () => {
    test("should return empty array initially", async () => {
        const response = await request(app).get("/expenses");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });

    test("should create new expense", async () => {
        const response = await request(app)
              .post("/expenses")
              .send({
                title: "Pizza",
                amount: 300,
                category: "Food",
                date: "2026-08-03"
            });

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty("id");
            expect(response.body.title)
            .toBe("Pizza")
    });

    test("should get all expenses", async () => {
        await request(app)
              .post("/expenses")
              .send({
                title: "Pizza",
                amount: 300,
                category: "Food",
                date: "2026-08-03"
              });

        const response = await request(app)
              .get("/expenses");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    });

    test("should delete an expense", async () => {
        const createResponse = await request(app)
              .post("/expenses")
              .send({
                title: "Pizza",
                amount: 300,
                category: "Food",
                date: "2026-08-03"
        });

        const expenseId = createResponse.body.id;

        const deleteResponse = await request(app)
              .delete(`/expenses/${expenseId}`);

        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body.message).toBe("Expense deleted successfully");
    });

    test("should filter expenses by category", async () => {
        await request(app)
            .post("/expenses")
            .send({
                title: "Pizza",
                amount: 300,
                category: "Food",
                date: "2026-08-03"
            });

        await request(app)
            .post("/expenses")
            .send({
                title: "Uber",
                amount: 150,
                category: "Travel",
                date: "2026-08-03"
            });

        const response = await request(app)
              .get("/expenses")
              .query({
                category: "Food"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].category).toBe("Food");
    });

    test("should calculate total expenses", async () => {
        await request(app)
            .post("/expenses")
            .send({
                title: "Pizza",
                amount: 300,
                category: "Food",
                date: "2026-08-03"
            });

        await request(app)
            .post("/expenses")
            .send({
                title: "Movie",
                amount: 500,
                category: "Entertainment",
                date: "2026-08-03"
            });

        const response = await request(app).get("/expenses/total");

        expect(response.statusCode).toBe(200);
        expect(response.body.total).toBe(800);
    });

    test("should return 400 when title is missing", async () => {
        const response = await request(app)
             .post("/expenses")
             .send({
                amount: 300,
                category: "Food",
                date: "2026-08-03"
             });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Title is required");
    });

    test("should return 400 for invalid amount", async () => {
        const response = await request(app)
             .post("/expenses")
             .send({
                title: "Pizza",
                amount: -50,
                category: "Food",
                date: "2026-08-03"
             });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Amount must be greater than 0");
    });
});