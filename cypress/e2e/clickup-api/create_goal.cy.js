describe("ClickUp Goals API", () => {
  const workspaceId = "90151136171";
  const baseUrl = "https://api.clickup.com/api/v2";
  const token = Cypress.env("CLICKUP_API_TOKEN");
  let goalId;

  it("Create Goal (POST)", () => {
    const goalName = `Goal-${Math.random().toString(36).substring(2, 8)}`;

    cy.request({
      method: "POST",
      url: `${baseUrl}/goal`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: {
        name: goalName,
        multiple_owners: true,
        team_id: workspaceId,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.goal).to.have.property("id");
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
      expect(response.body.goal).to.have.property("id", goalId);
    });
  });

  it("Get Goal with Invalid Token (GET)", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/goal/${goalId}`,
      failOnStatusCode: false,
      headers: {
        Authorization: "invalid_token",
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("Update Goal (PUT)", () => {
    const updatedName = "Updated Cypress Goal";

    cy.request({
      method: "PUT",
      url: `${baseUrl}/goal/${goalId}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: {
        name: updatedName,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.goal.name).to.eq(updatedName);
    });
  });

  it("Delete Goal (DELETE)", () => {
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
