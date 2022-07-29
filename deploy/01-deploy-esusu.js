const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { log, deploy } = deployments
  const { deployer, user } = await getNamedAccounts()
  log("Deploying...")
  const esusu = await deploy("Esusu", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
  log("deployed successfully...")
  log("----------------------------------------------")

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log(`Verifying contract ${esusu.address}...`)
    await verify(esusu.address, [])
  }
}

module.exports.tags = ["all", "esusu"]
