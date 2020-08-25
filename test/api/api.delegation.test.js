const app = require("../../bin/api");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("route /delegation/staker/:id", () => {
  it("returns delegations by staker", async () => {
    const delegationsRes = await chai.request(app).get(`/api/v1/delegation/staker/1/?verbosity=2`);
    expect(delegationsRes).to.have.status(200);
  });
});

async function testWithRealDelegationObject(){
  let stakers = await chai.request(app).get("/api/v1/staker?verbosity=2");
  if (!stakers.body.data.stakers.length){
    console.log('\x1b[43m%s\x1b[0m', 'WARNING:', `There is no stakers in DB!`);
    return;
  }
  
  let delegation;
  stakers = stakers.body.data.stakers;
  for (const index in stakers){
    const delegations = await chai.request(app).get(`/api/v1/delegation/staker/${stakers[index].id}/?verbosity=2`);
    if (delegations.body.data.delegations.length){
      delegation = delegations.body.data.delegations[0];
      break;
    }
  }

  if (!delegation){
    console.log('\x1b[43m%s\x1b[0m', 'WARNING:', `Delegation not found!`);
    return;
  }

  describe("route /delegation/address/:address", () => {
    it("returns delegation by its address", async () => {
      const delegationRes = await chai.request(app).get(`/api/v1/delegation/address/${delegation.address}`);
      expect(delegationRes).to.have.status(200);
    });
  });
}

testWithRealDelegationObject();