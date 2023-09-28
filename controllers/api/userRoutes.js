const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const userData = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    })

    const data = userData.get({ plain: true });

    req.session.save(() => {
      req.session.user_id = data.uid;
      req.session.logged_in = true;

      // Respond with a success message using SweetAlert
      res.status(200).json({ success: 'Signup successful' });
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      // Error message using SweetAlert
      res.status(400).json({ error: 'Email address is already in use.' });
    } else {
      // Error message using SweetAlert
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // User with the provided email does not exist
      return res.status(400).json({ error: 'Incorrect email or password' });
    }

    //Check if the password is correct using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Password is incorrect
      return res.status(400).json({ error: 'Incorrect email or password' });
    }

    // Set the user as logged in in the session
    req.session.user_id = user.uid;
    req.session.logged_in = true;

    // Success message using SweetAlert
    res.status(200).json({ success: 'Login successful' });
  } catch (err) {
    console.error(err);
    // Error message using SweetAlert
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      // Session is destroyed, now redirect to the root path
      res.redirect('/');
    });
  } else {
    // If the user is not logged in, simply redirect to the root path
    res.redirect('/');
  }
});

module.exports = router;
