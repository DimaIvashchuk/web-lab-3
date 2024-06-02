const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { User, secretKey } = require("../models/user");

router.get("/:contactId", async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.user = user;
  });

  if (!token) return res.status(401).send({ message: "Unauthorized" });

  const { contactId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    const contactIndex = user.contacts.findIndex(
      (item) => contactId === item._id.toString()
    );

    if (contactIndex === -1) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ contact: user.contacts[contactIndex] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/", async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.user = user;
  });

  if (!token) return res.status(401).send({ message: "Unauthorized" });

  const { name, surname, phone } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.contacts.push({
      firstName: name,
      lastName: surname,
      phoneNumber: phone,
    });
    await user.save();

    res.status(200).json({ message: "Contact added", contacts: user.contacts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.patch("/:contactId", async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.user = user;
  });

  if (!token) return res.status(401).send({ message: "Unauthorized" });

  const { contactId } = req.params;
  const { name, surname, phone } = req.body;

  try {
    const user = await User.findById(req.user._id);
    const contactIndex = user.contacts.findIndex(
      (item) => contactId === item._id.toString()
    );

    if (contactIndex === -1) {
      return res.status(404).json({ message: "Contact not found" });
    }

    console.log(user.contacts[contactIndex]);

    user.contacts[contactIndex] = {
      firstName: name,
      lastName: surname,
      phoneNumber: phone,
    };

    await user.save();

    res
      .status(200)
      .json({ message: "Contact updated", contacts: user.contacts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:contactId", async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.user = user;
  });

  if (!token) return res.status(401).send({ message: "Unauthorized" });

  const { contactId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    const contactIndex = user.contacts.findIndex(
      (item) => contactId === item._id.toString()
    );

    if (contactIndex === -1) {
      return res.status(404).json({ message: "Contact not found" });
    }

    user.contacts.splice(contactIndex, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Contact deleted", contacts: user.contacts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
