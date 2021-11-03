import chalk from 'chalk'
import Post from './models/post'
import User from './models/user'

import exec from 'await-exec'

async function seedDatabase() {
  try {

    const users = await User.find({})
    const posts = await Post.find({})
    if (users.length === 0 && posts.length === 0) {
      console.log(
        chalk.yellow(
          'No users or posts in the database, creating sample data...'
        )
      )
      
      await exec("mongoimport --db snippets --collection posts --file ./db/posts.json")
      await exec("mongoimport --db snippets --collection users --file ./db/users.json")

      console.log(
        chalk.green(`Successfuly populated database!!`)
      )
    } else {
      console.log(
        chalk.yellow('Database already initiated, skipping populating script')
      )
    }
  } catch (error) {
    console.log(chalk.red(error))
  }
}

module.exports = seedDatabase;