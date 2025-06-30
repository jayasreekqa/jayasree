describe('Simple CRUD Test for Petstore API', () => {
  const baseUrl = 'https://petstore.swagger.io/v2';
  const petId = Date.now(); // Unique pet ID for each run

  it('Create a new pet', () => {
    cy.request('POST', `${baseUrl}/pet`, {
      id: petId,
      name: 'Doggie',
      photoUrls: ['http://example.com/photo.jpg'],
      status: 'available'
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.id).to.eq(petId);
      expect(res.body.name).to.eq('Doggie');
    });
  });

  it('Get the pet by ID', () => {
    cy.request('GET', `${baseUrl}/pet/${petId}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.id).to.eq(petId);
      expect(res.body.name).to.eq('Doggie');
    });
  });

  it('Update the pet', () => {
    cy.request('PUT', `${baseUrl}/pet`, {
      id: petId,
      name: 'DoggieUpdated',
      photoUrls: ['http://example.com/photo.jpg'],
      status: 'sold'
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.name).to.eq('DoggieUpdated');
      expect(res.body.status).to.eq('sold');
    });
  });

  it('Delete the pet', () => {
    cy.request('DELETE', `${baseUrl}/pet/${petId}`).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('Verify pet is deleted', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pet/${petId}`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body.message).to.eq('Pet not found');
    });
  });
});
