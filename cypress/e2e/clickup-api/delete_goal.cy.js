describe("ClickUp Delete Goal Flow", () => {
  const baseUrl = "https://api.clickup.com/api/v2";
  const workspaceId = "90151136171";
  const token = Cypress.env("CLICKUP_API_TOKEN");
  const invalidToken = "invalid_token_example";
  let goalId;

  it("Create Goal (POST)", () => {
    const goalName = `Goal-${Math.random().toString(36).substring(7)}`;

    cy.request({
      method: "POST",
      url: `${baseUrl}/goal`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: {
        name: goalName,
        team_id: workspaceId,
        multiple_owners: true,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      goalId = response.body.goal.id;
    });
  });

  it("Get Goal by ID (GET)", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/goal/${goalId}`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.goal.id).to.eq(goalId);
    });
  });

  it("Try Delete Goal with Invalid Token (should fail)", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/goal/${goalId}`,
      failOnStatusCode: false,
      headers: {
        Authorization: invalidToken,
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 403]);
    });
  });

  it("Delete Goal with Valid Token (DELETE)", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/goal/${goalId}`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
