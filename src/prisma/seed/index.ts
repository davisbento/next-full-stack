import { coffeeSeed } from "./coffee"
import { userSeed } from "./user"

const runAllSeeds = async () => {
  try {
    await Promise.all([userSeed(), coffeeSeed()])
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runAllSeeds()
