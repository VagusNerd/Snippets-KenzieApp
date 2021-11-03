
# Welcome to Kenzie Snippets!

You will be using this app to explore the architecture of a Full-Stack MERN Application.  

## Getting Started

You will need to install the following tools: 

### Yarn

Yarn is a package manager, just like NPM.  However, yarn is a bit more modern and easy to use.  We will be using yarn to build and run our apps.

[https://classic.yarnpkg.com/en/docs/install/](https://classic.yarnpkg.com/en/docs/install/)

Follow the steps for your operating system to install yarn.  

### MongoDB

Install MongoDB and start your server: [MongoDB instructions](https://docs.mongodb.com/manual/administration/install-community/)

After following the MongoDB instructions, install the [VSCode MongoDB extension](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)

Once you have installed the MongoDB extension, you can add the your databases connection string to the extension. [Follow here](https://docs.mongodb.com/mongodb-vscode/connect/)

Open the command pallet and type 'MongoDB: Connect' and enter `localhost:27017` as the connection string to configure the snippets database to your VSCode

#### Mac OS

Follow the guide here: [Install MongoDB on MacOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)


#### Linux

Follow the guide here: [Install MongoDB on Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

#### Windows

First, download the [MongoDB Community Server](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.6-signed.msi) MSI and install it.  You can use all of the default options. 

When that is finished installing, you can close "MongoDB Compass" if that pops up.  

Then you must start the MongoDB Service:

1. Click the start menu and type "services", Click the Services console.
2. From the Services console, locate the MongoDB service (The list is alphabetical)
3. Right-click on the MongoDB service and click Start.

Then download the [MongoDB Database Tools](https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.3.1.msi)

Those should download to a path like: `C:/Program Files/MongoDB/Tools/100/bin`  Take note of that path when you install them.

Next, open GitBash.  

cd to your home directory, `cd ~`

Then paste in your .bashrc file 

`
if [[ "$PATH" == "" ]]
then
  PATH=$PATH/c/Program\ Files/MongoDB/Tools/100/bin
else
  PATH=$PATH:/c/Program\ Files/MongoDB/Tools/100/bin
fi
`

Where that path should match the path that you installed the MongoDB Database Tools.  This will make all of the tools accessible to you on GitBash.

and run:

`touch .bash_profile`

Now **close the GitBash window and re-open it before continuing**.

If you get stuck, you can reference the guide here: [Install MongoDB on Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)


## Running the application

This app is configured to run both the frontend and the backend from the root directory of this project.

First, install all of the dependencies.  You should only need to do this once.

```
yarn install
```

You can start the entire application by doing: 

```
yarn start
```

_Note that you must be in the root folder of this repository to run both the front and backend!_

### Folder structure

The front and backend are held inside of `packages/client/` and `packages/server/`

If you `cd` into those folders, you can run them individually by using `yarn start`. 


### Adding packages
During development, you can add dependencies to the frontend or backend from the root folder:
```
yarn workspace client add react-router-dom 
yarn workspace server add mongoose
```

This would add a "react-router-dom" dependency to the frontend, and a "mongoose" dependency to the backend. 

