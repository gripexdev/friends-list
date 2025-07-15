const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{

  // Extract the email parameter from the request URL
  const email = req.params.email;

  // Filter the users array to find users whose email matches the extracted email parameter
  let filtered_users = users.filter((user) => user.email === email);

  // Send the filtered_users array as the response to the client
  res.send(filtered_users);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  // Push a new user object into the users array based on query parameters from the request
  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
  });

  res.send("The User " + req.query.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if (filtered_users.length > 0) {
    // Select the first matching user and update attributes if provided
    let filtered_user = filtered_users[0];

    // Extract and update DOB if provided
    if (req.query.DOB) {
      filtered_user.DOB = req.query.DOB;
    }

    // Extract and update firstName if provided
    if (req.query.firstName) {
      filtered_user.firstName = req.query.firstName;
    }

    // Extract and update lastName if provided
    if (req.query.lastName) {
      filtered_user.lastName = req.query.lastName;
    }

    // Replace old user entry with updated user
    users = users.filter((user) => user.email !== email);
    users.push(filtered_user);

    // Send success message indicating the user has been updated
    res.send(`User with the email ${email} has been updated.`);
  } else {
    // Send error message if no user found
    res.status(404).send("Unable to find user!");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  // Filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email !== email);
  // Send a success message as the reponse, indicating the user has been deleted
  res.send(`User with the email ${email} has been deleted.`);
});

module.exports=router;
