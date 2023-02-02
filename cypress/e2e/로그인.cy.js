import { slowCypressDown } from "cypress-slow-down";

slowCypressDown(200);

describe("로그인", () => {
  it("로그인", () => {
    cy.visit("/login");
    cy.get("#userid").type("test2");
    cy.get("#password").type("@asd1234");

    cy.clickRecaptcha();
    cy.wait(500);
    cy.get(".py-1").click();
  });
});
