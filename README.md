# COSC 4353, Team 12, Assignment 4

## Installation & Setup

### Step 1: Install necessary pre-requisites
This project requires NodeJS to run the backend. You can find it here:

https://nodejs.org/en/download/

This project requires version control via Git. You can find it here:

https://git-scm.com/downloads

### Step 2: Clone the repository
Open a terminal or command prompt and navigate to your desired directory (for example, your Desktop). You can use the `cd` command to accomplish this.

```
cd path/to/file
```

When you run the command below, you will create a folder (named "assignment-4") containing the project in your desired directory.

```
git clone https://github.com/4353-slot-12/assignment-4.git
```

Next, let's navigate into the root directory of the project.

```
cd assignment-4
```

<!-- ### Step 3: Ensure that the `.env` file is present.
<b>SKIP THIS STEP FOR NOW!</b>

This project will not run unless the necessary environment variables are set. The necessary environment variables must be set via a `.env` file in the root directory (the same directory as this README file).

You can obtain it by contacting the authors of this project. -->

### Step 3: Install dependencies
Node dependencies need to be installed before we can run the backend for the website. We can install those by navigating to the root directory of the project and running the following command:

```
npm install
```

### Step 4: Run the backend server
At this point, we can check if we did everything correctly by starting the server. Start the server by navigating to the root directory of the project (the same directory as this README file) and running the following command:

```
npm run start
```

Finally, open your Google Chrome or Firefox and visit `http://localhost:8000`. You should see that the website loaded cleanly. Make sure to check the developer console to see if you're getting any errors.
