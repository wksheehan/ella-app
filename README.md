This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Steps to get yarn start working

```bash
cd api
python3 -m venv venv
source venv/bin/activate
```

==> you should now see (venv) at the begginning of the command line prompt
```bash
(venv) pip install flask python-dotenv
(venv) pip install alembic Flask-Login flask-marshmallow Flask-Migrate Flask-SQLAlchemy marshmallow marshmallow-sqlalchemy psycopg2-binary SQLAlchemy
```
cd ..

yarn start

## Steps to get yarn start-api working

Follow above steps in a new terminal window while yarn start is already running
There should be a way to automate this instead of going through the steps every time

## Using Postman

* Download Postman: https://www.postman.com/downloads/
* Create new request [GET, POST, DELETE, etc.]
* For testing GET/POST requests, navigate to Headers tab and add a key/value header:
  * Key: Content-Type
  * Value: application/json
* Watch this tutorial for complete advice on how to execute HTTP calls: https://www.youtube.com/watch?v=PTZiDnuC86g

## Git Best Practices

### branches

Do all of your work in your own development branch as we have set them up. It is important to pull from master
(`git pull origin master`) frequently/daily to avoid large merge conflicts from other people's features. Likewise, whenever you
complete a new feature, merge to master. Below is a section on merging.

### merging
Merging can be accomplished by setting up a pull request on the GitHub website or merging via the command line.
* GitHub Website Steps
  * Go to your branch and select "pull request"
  * The base branch should be master and the compare branch should be your feature branch
  * Select "create pull request"
  * If there are merge conflicts, resolve them. Consult other team members if you are unsure which code
  segments to choose. *IMPORTANT: the yarn.lock and package-lock.json files are extremely important. Be very
  careful when you are resolving merge conflicts in these files. Even improper line spacing/newlines can cause big problems

* Command line Steps
  * In your feature branch (i.e. daniel) run `git pull origin master`. This will ensure your local branch is up to date with master
  * Run `git add .`, `git commit -m <msg>`, `git push origin <your_branch>` to update the remote branch
  * Run `git checkout master`
  * Run `git merge <your_branch>` and resolve merge conflicts in your text editor (i.e. Atom, Sublime, etc). Atom is great for this

### troubleshooting other's features
Ideally, we will have well-formed, up-to-date package-lock.json and yarn.lock files. This will ensure that whenever you pull new features that
aren't yours, all you will need to do is run `yarn install` and `npm install` to get any packages that others installed on their machines. This is why
maintaining the package-lock.json and yarn.lock files will be uber-important.

## venv troubleshooting

### pip packages and "module not found" errors
If you have a "module not found error", it's likely because you need to install that package on the venv within your ella-app/api folder. To do this,
open a new terminal window, navigate to your api folder, THEN run `source venv/bin/activate`. Then, run `pip install <package_listed_in_error>` to
install that package.

The list of packages that you will need to install using pip in your virtual environment can be found in the flask files (anything ending in .py). If you
see an import statement in one of those files and suspect you haven't installed the package being imported, install it using pip on your start-api venv.


## Use a GUI to view the VCM Postgres server

* pgAdmin4 Steps
  * Click object, create, server 
  * In the popup window: 	
	* name: ella-server 
	* hostname: vcm-17601.vm.duke.edu
	* PORT: 5432 
	* username: ella 
	* password: ella 

* You should now be able to see your server in the Browser tab on the left 
* Click on the server, database, and right click on a table to view table. 
