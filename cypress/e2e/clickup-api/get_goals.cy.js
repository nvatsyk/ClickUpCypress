describe("ClickUp Goals API", () => {
  const workspaceId = "90151136171";
  const token = Cypress.env("CLICKUP_API_TOKEN");
  let createdGoalId;

  it("Should get a list of goals and return 200", () => {
    cy.request({
      method: "GET",
      url: `/team/${workspaceId}/goal`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.goals).to.be.an("array");
    });
  });

  it("Create a new Goal (POST)", () => {
    const goalName = `Goal-${Math.random().toString(36).substring(7)}`;

    let apiUrl;
    cy.request({
      method: "POST",
      url: `https://api.clickup.com/api/v2/goal`,

      headers: {
        Authorization: token,
        "Content-Type": "application/json"
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
      cy.wrap(goalId).as("goalId");
    });
  });

  it("Get created Goal by ID (GET)", function () {
    cy.request({
      method: "GET",
      url: `${apiUrl}/goal/${goalId}`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.goal).to.have.property("id", goalId);
    });
  });

  it("Update Goal name (PUT)", function () {
    const updatedName = "Updated Goal Name";

    cy.request({
      method: "PUT",
      url: `${apiUrl}/goal/${goalId}`,
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

  it("Delete Goal (DELETE)", function () {
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/goal/${goalId}`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

