const { developmentChains } = require("../../helper-hardhat-config")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Esusu", () => {
      let esusu, deployer
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        esusu = await ethers.getContract("Esusu", deployer)
      })
      //CREATEUSER PROFILE FUNCTION TEST
      describe("createUserProfile", async () => {
        it("adds a user to userlist", async () => {
          //connect user to esusu contract
          user = (await ethers.getSigners())[1]
          const userEsusu = await esusu.connect(user)
          transactionResponse = await userEsusu.createUserProfile()
          //check if userlist is updated with user
          const firstUser = (await esusu.userList(0))[0]
          console.log(firstUser)
          assert.equal(user.address, firstUser)
        })
        it("won't let a user join twice", async () => {
          user = (await ethers.getSigners())[1]
          const userEsusu = await esusu.connect(user)
          await userEsusu.createUserProfile()
          await expect(userEsusu.createUserProfile()).to.be.reverted
        })
        it("updates userProfile mapping", async () => {
          user = (await ethers.getSigners())[1]
          const userEsusu = await esusu.connect(user)
          await userEsusu.createUserProfile()
          const firstUser = (await esusu.userProfile(user.address))[0]
          assert.equal(firstUser, user.address)
        })
      })


      describe("createGroup", async()=>{

      })
    })
