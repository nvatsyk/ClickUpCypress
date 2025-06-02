describe("ClickUp Update Goal Flow", () => {
  const baseUrl = "https://api.clickup.com/api/v2";
  const workspaceId = "90151136171";
  const token = Cypress.env("CLICKUP_API_TOKEN");
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
      expect(response.body.goal).to.have.property("id");
      goalId = response.body.goal.id;
    });
  });

  it("Update Goal (PUT)", () => {
    const updatedName = "Updated Goal via Cypress";

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

  it("Get Updated Goal by ID (GET)", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/goal/${goalId}`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.goal.id).to.eq(goalId);
      expect(response.body.goal.name).to.eq("Updated Goal via Cypress");
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
