const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const crypto = require("crypto");
// const https = require("https")
// var options = {
//   key: "",
//   cert: ""
// }
const app = express();
// var httpsServer = https.createServer(options, app)
const fakeLocal = require("./fakeLocal.json");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const localStrategy = require("passport-local").Strategy;
// const users = require("./users.json")
const bcrypt = require("bcrypt");
const axios = require("axios");
const multer = require("multer");
const upload = multer({ limits: { fileSize: 3000000 } });

config();
app.use(express.json());
app.use(cors());

// var nodemailer = require("nodemailer");

// const contact = function (req, res) {
//   var name = req.body.name;
//   var from = req.body.from;
//   var message = req.body.message;
//   var to = "bandzeladze.daviti.dato@gmail.com";
//   var smtpTransport = nodemailer.createTransport("SMTP", {
//     service: "Gmail",
//     auth: {
//       user: "XxD4V1T1xX@gmail.com",
//       pass: "ruddy9-hiZkeq-temhyr",
//     },
//   });
//   var mailOptions = {
//     from: from,
//     to: to,
//     subject: name + " new message",
//     text: message,
//   };
//   smtpTransport.sendMail(mailOptions, function (error, response) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("sent");
//       res.send("done");
//     }
//   });
// };

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "XxD4V1T1xX@gmail.com",
//     pass: "ruddy9-hiZkeq-temhyr",
//   },
// });

// var mailOptions = {
//   from: "XxD4V1T1xX@gmail.com",
//   to: "bandzeladze.daviti.dato@gmail.com",
//   subject: "Sending Email using Node.js",
//   text: "That was easy!",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

const mongo = process.env.MONGO_URI;
const BOG_AUTH_STRING = process.env.BOG_AUTH_STRING;
mongoose.connect(mongo);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  id: String,
  firstname: String,
  lastname: String,
  plan: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },
  phoneNumber: { type: String, default: "" },
  jobFunction: { type: String, default: "" },
  companyRole: { type: String, default: "" },
});
const tagSchema = new mongoose.Schema({
  email: String,
  name: String,
  color: String,
});
// const itemSchema = new mongoose.Schema(
//   {
//     name: String,
//     quantity: Number,
//     measurement: String,
//     minQuantity: Number,
//     price: Number,
//     variants: Boolean,
//     image: {
//       type: Buffer,
//     },
//     userEmail: String,
//     totalPrice: Number,
//   },
//   { timestamps: true }
// );
const itemSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
    measurement: String,
    minQuantity: Number,
    price: Number,
    variants: Boolean,
    image: {
      type: Buffer,
    },
    userEmail: String,
    totalPrice: Number,
    folder: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    customText: {
      type: String,
      default: "",
    },
    lowFlag: Boolean,
  },
  { timestamps: true }
);

const companySchema = new mongoose.Schema({
  name: String,
  industry: String,
  color: String,
  initials: String,
  logo: {
    type: Buffer,
  },
  country: String,
  TimeZone: String,
  TimeFormat: String,
  currency: String,
  email: String,
});

const historyItemSchema = new mongoose.Schema(
  {
    operation: String,
    name: String,
    quantity: Number,
    measurement: String,
    minQuantity: Number,
    price: Number,
    variants: Boolean,
    userID: String,
    image: {
      type: Buffer,
    },
    userEmail: String,
    totalPrice: Number,
  },
  { timestamps: true }
);

const folderSchema = new mongoose.Schema({
  name: String,
  userEmail: String,
  items: {
    type: Array,
    default: [],
  },
});

historyItemSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });
//add , { "createdAt": 1 }, { expireAfterSeconds: 10 }

const item = mongoose.model("item", itemSchema);
const users = mongoose.model("user", userSchema);
const history = mongoose.model("history", historyItemSchema);
const folders = mongoose.model("folders", folderSchema);
const tags = mongoose.model("tags", tagSchema);
const companies = mongoose.model("companies", companySchema);

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

//stripeTest start
// This is your test secret API key.
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51PnDq7P8ycV2OkggkfC3RHiadzbtjAepR41rb0CyO6QKiIH7g6J7sjJw5NjKtYr97lfd14MJlcflX2H1izWSFCHa00eBKVuMgo"
);
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:3001";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1PoO8oP8ycV2Okgg2LezQbsh",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  console.log(session);
  res.redirect(303, session.url);
});
//stripeTestEnd

// async function ValidationMiddleware(req, res, next){
//   const recievedToken = JSON.parse(req.headers.authorization)
//   if (recievedToken !== fakeLocal.Authorization){
//     return res.status(401).send("Unauthorized!")
//   }else {
//     const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET")
//     email = decoded.user.email
//     id = decoded.user._id
//     const user = await users.find((user)=> user.email === email)
//     if (user === undefined){
//       return res.status(404).send("User not found")
//     } else {
//       next()
//     }
//   }
// }
// const checkPlanMiddleware = (requiredPlan) => (req, res, next)=>{
//   if (req.user.plan === requiredPlan){
//     next()
//   } else {
//     res.status(403).json({message: 'Access denied'})
//   }
// }
async function getUserId(req) {
  const recievedToken = JSON.parse(req.headers.authorization);
  const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
  email = decoded.user.email;
  const user = await users.findOne({ email: email });
  const name = `${user.firstname} ${user.lastname}`;
  if (name) {
    return name;
  }
  return (id = user._id);
}

async function checkPremiumPlanMiddleware(req, res, next) {
  const recievedToken = JSON.parse(req.headers.authorization);
  const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
  email = decoded.user.email;
  const user = await users.findOne({ email: email });
  const plan = user.plan;
  if (plan === "premium") {
    next();
  } else {
    return res.status(403).send("Access denied!");
  }
}
async function getUserPlanMiddleware(req, res, next) {
  const email = req.email;
  const user = await users.findOne({ email: email });
  const plan = user.plan;
  if (plan === "premium") {
    res.send("premium");
    next();
  } else {
    res.send("free");
    next();
  }
}

app.get("/bogAuthorize", async (req, res) => {
  try {
    console.log(BOG_AUTH_STRING);
    const response = await axios.post(
      "https://oauth2.bog.ge/auth/realms/bog/protocol/openid-connect/token",
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          Authorization: BOG_AUTH_STRING,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.send(response.data);
  } catch (err) {
    console.log(err);
  }
});
app.post("/callback", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
  console.log("---------------");
  console.log(req.body);
  console.log("---------------");
  await fs.writeFile(
    "transaction.json",
    JSON.stringify({
      Header: req.headers,
      Body: req.body,
    }),
    (err) => {
      if (err) throw err;
    }
  );
  if (
    req.body.body.order_status.key === "completed" &&
    req.body.body.order_status.value === "წარმატებული"
  ) {
    try {
      const decoded = await jwt.verify(
        fakeLocal.Authorization.substring(7),
        "TOP_SECRET"
      );
      email = decoded.user.email;
      console.log("email getting the premium treatment: ", email);
      const updateduser = await users.findOneAndUpdate(
        { email: email },
        { $set: { plan: "premium" } },
        { new: true }
      );
      console.log(updateduser);
    } catch (err) {
      console.log(err);
    }
  }
  res.status(200).send("done");
});
const varification = () => {
  const readfilebuffer = "";
  var datastr = JSON.stringify({
    event: "order_payment",
    request_time: "2024-08-21T10:48:50.745951",
    zoned_request_time: "2024-08-21T06:48:50.745951Z",
    body: {
      order_id: "02cdbffd-521b-41f0-bf2b-c14716259348",
      external_order_id: null,
      client: {
        id: "39155",
        brand_ka: "ბიზნეს მენეჯერი",
        brand_en: "Business Manager",
        url: "https://www.manager.bog.ge",
      },
      create_date: "2024-08-21T10:48:01.671332",
      zoned_create_date: "2024-08-21T06:48:01.671332Z",
      expire_date: "2024-08-21T11:03:01.671332",
      zoned_expire_date: "2024-08-21T07:03:01.671332Z",
      order_status: { key: "completed", value: "წარმატებული" },
      buyer: null,
      redirect_links: {
        success:
          "https://payment.bog.ge/receipt?order_id=02cdbffd-521b-41f0-bf2b-c14716259348",
        fail: "https://payment.bog.ge/receipt?order_id=02cdbffd-521b-41f0-bf2b-c14716259348",
      },
      payment_detail: {
        transfer_method: { key: "card", value: "ბარათით გადახდა" },
        transaction_id: "423410473118",
        payer_identifier: "537493***6701",
        payment_option: "direct_debit",
        card_type: "mc",
        card_expiry_date: "09/26",
        request_account_tag: null,
        transfer_account_tag: null,
        saved_card_type: null,
        parent_order_id: null,
      },
      actions: null,
      disputes: null,
      split: null,
      discount: null,
      lang: "ka",
      reject_reason: null,
      industry: "ecommerce",
      capture: "automatic",
      purchase_units: {
        request_amount: "0.01",
        transfer_amount: "0.01",
        refund_amount: null,
        currency_code: "GEL",
        items: [
          {
            external_item_id: "product123",
            unit_price: "0.01",
            description: null,
            quantity: "1",
            unit_discount_price: "0.0",
            package_code: null,
            total_price: null,
            vat: null,
            vat_percent: null,
            tin: null,
            pinfl: null,
            product_discount_id: null,
          },
        ],
      },
    },
  });
  // console.log(datastr);
  let data = Buffer.from(datastr);
  const key =
    "-----BEGIN PUBLIC KEY-----\n" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu4RUyAw3+CdkS3ZNILQh\n" +
    "zHI9Hemo+vKB9U2BSabppkKjzjjkf+0Sm76hSMiu/HFtYhqWOESryoCDJoqffY0Q\n" +
    "1VNt25aTxbj068QNUtnxQ7KQVLA+pG0smf+EBWlS1vBEAFbIas9d8c9b9sSEkTrr\n" +
    "TYQ90WIM8bGB6S/KLVoT1a7SnzabjoLc5Qf/SLDG5fu8dH8zckyeYKdRKSBJKvhx\n" +
    "tcBuHV4f7qsynQT+f2UYbESX/TLHwT5qFWZDHZ0YUOUIvb8n7JujVSGZO9/+ll/g\n" +
    "4ZIWhC1MlJgPObDwRkRd8NFOopgxMcMsDIZIoLbWKhHVq67hdbwpAq9K9WMmEhPn\n" +
    "PwIDAQAB\n" +
    "-----END PUBLIC KEY-----\n";
  const signiture = Buffer.from(
    "bgpKk8RKVMuBZ5B++pt+EWhhKQ76pxAn2dbAWIZTReXK6NZ97nPGmic+sXXpI3o6R6RRnUp1RoDILoCe/PqKfL5IhtJz1g2Xuz43XrENvBaRLXScmhxXMEnxX0/rkw89EeqN8Om7drzAxbTSRwtkpWlO7NQhHom0S51Nmhm3/rrhOUWTpUUVU5kyAvcg/hapsz/mJFwCVq1g2GEax6akWRaXIW/WD8wInJdSDvBimMpFUrgGUG0D7HutjeX0dhDGazGlpKJLSmurZI4D2dtR0ZR6wpcqrSavCAMQWeE9LZq2GuIYwgX1n5yC0xql5NvFZemZmDUXzvJMZSTr/pg5ug=="
  );
  const validator = Buffer.from(
    "SgE4eGXtdeNHgR3Gmy3CHqnuebr3CQC/viXtkIA8h9bmVVyBsVhq98PvAmlaQWZlzRQ4n3twvAmzlntpIAHLodZwlEwEgg95bpEDpzdBMGZdr+6m0J0c3sqP3EK1H7+reT9qjktmwerj9nwSdZ/f4T7efnqiWjyJU6E/1gLImNtwmd41l/If4SnCndLdDG7eCPyJrbqnRklpbfbsnAMyJj2jXX+BIgjH0rsr1o+BJZZ0RiFTlVXISk2+MlA4qo6KlboLrcQ5O5ccKgbWI5PhcPLDoorLCQwocVClFpYHx84Oh1iS544KaIiFxIOHcQX0CKISzG91aRhf2anJ2ecK0A=="
  );
  const dataBuffer = fs.readFileSync("body.json");
  var isVarified = crypto.verify(
    "sha256withRSAEncryption",
    dataBuffer,
    key,
    signiture
  );
  console.log(isVarified);
};
app.get("/callback", async (req, res) => {
  console.log("called");
  varification();
  res.send("called");
});
app.post("/goToPayment", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.bog.ge/payments/v1/ecommerce/orders",
      {
        callback_url: "https://0384-185-70-52-34.ngrok-free.app/callback",
        purchase_units: {
          currency: "GEL",
          total_amount: 0.01,
          basket: [
            {
              quantity: 1,
              unit_price: 0.01,
              product_id: "product123",
            },
          ],
        },
        redirect_urls: {
          fail: "http://localhost:3000/fail",
          success: "http://locahost:3000/success",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${req.body.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    // res.redirect(response.data._links.redirect.href)
    res.send(response.data);
  } catch (err) {
    console.log(err.response);
  }
});
app.get("/BuyPremiumService", async (req, res) => {
  try {
    const recievedToken = JSON.parse(req.headers.authorization);
    const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
    email = decoded.user.email;
    const updateduser = await users.findOneAndUpdate(
      { email: email },
      { $set: { plan: "premium" } },
      { new: true }
    );
    console.log(updateduser);
    res.send("Congrats now you are a premium user!");
  } catch (err) {
    console.log(err);
  }
});
//needs stripe to function
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
async function uniqueFolderNameMiddleware(req, res, next) {
  const recievedToken = JSON.parse(req.headers.authorization);
  const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
  const email = decoded.user.email;
  const recievedName = req.body.name;
  console.log("recieved name: ", recievedName);
  const foundFolder = await folders.findOne({
    name: recievedName,
    userEmail: email,
  });
  console.log("found folder: ", foundFolder);
  if (foundFolder) {
    return res.status(400).send("This folder already exists");
  } else {
    next();
  }
}

async function signupValidationMiddleware(req, res, next) {
  const email = await users.find({ email: req.body.email });
  if (email) {
    res.status(406).send("Not Acceptable, Email isn't unique");
  }
  const pass = req.body.password;
  const pass2 = req.body.repeatPassword;
  if (pass !== pass2) {
    res.status(406).send("Not Acceptable, Passwords dont match");
    return;
  } else {
    next();
  }
}

async function tokenValidationMiddleware(req, res, next) {
  const recievedToken = JSON.parse(req.headers.authorization);
  if (recievedToken !== fakeLocal.Authorization) {
    // console.log(recievedToken)
    // console.log(fakeLocal.Authorization)
    return res.status(401).send("Unauthorized!");
  } else {
    next();
  }
}

async function userValidationMiddleware(req, res, next) {
  const recievedToken = JSON.parse(req.headers.authorization);
  const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
  const email = decoded.user.email;
  const user = await users.findOne({ email: email });

  if (user === undefined) {
    return res.status(404).send("User not found");
  } else {
    req.user = { role: user.plan };
    next();
  }
}

passport.use(
  "login",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        if (email === "apperror") {
          throw new Error("app error");
        }
        const user = await users.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "user not found" });
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
          return done(null, false, { message: " Invalid cedentials" });
        }
        return done(null, user, { message: "congrats! logged in" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        console.log(req.body);
        if (passport.length <= 4 || !email) {
          done(null, false, {
            message: " you credentials must match our criteria",
          });
        } else {
          const hashedPass = await bcrypt.hash(password, 10);
          const newUser = new users({
            email: email,
            password: hashedPass,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            id: uuidv4(),
          });
          await newUser.save();
          return done(null, newUser, { message: "signed up succesfully!" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

app.use("/secretroute", tokenValidationMiddleware);
app.use("/secretroute", userValidationMiddleware);
app.get("/secretroute", async (req, res) => {
  res.send("this is a secret route");
});

app.get("/logout", async (req, res) => {
  await fs.writeFile(
    "fakeLocal.json",
    JSON.stringify({ Authorization: `` }),
    (err) => {
      if (err) throw err;
    }
  );
  res.send("deleted");
});

app.get("/getToken", async (req, res) => {
  try {
    res.send(fakeLocal);
  } catch (err) {
    console.log(err);
  }
});

app.get("/failed", (req, res, next) => {
  res.send("failed.");
});

app.get("/success", (req, res, next) => {
  res.send("success.");
});

app.post(
  "/login",
  async (req, res, next) => {
    console.log(req.body);
    passport.authenticate("login", async (error, user, info) => {
      console.log("err: ", error);
      console.log("user: ", user);
      console.log("info: ", info);
      if (error) {
        return next(error.message);
      }
      if (!user) {
        return res.redirect("/failed");
      }
      const body = { _id: user.id, email: user.email, role: user.plan };

      const token = jwt.sign({ user: body }, "TOP_SECRET");
      console.log(token);
      // secreti gavitanot
      const expirationTime = Math.floor(Date.now() / 1000) + 10 * 60;

      await fs.writeFile(
        "fakeLocal.json",
        JSON.stringify({
          Authorization: `Bearer ${token}`,
          expires: expirationTime,
        }),
        (err) => {
          if (err) throw err;
        }
      );
      res.send(
        JSON.stringify({
          Authorization: `Bearer ${token}`,
          expires: expirationTime,
          email: user.email,
        })
      );
    })(req, res, next);
  },
  (req, res, next) => {
    res.send("hello");
  }
);

app.use("/signup", signupValidationMiddleware);
app.post("/signup", async (req, res, next) => {
  passport.authenticate("signup", async function (error, user, info) {
    if (error) {
      return next(error);
    }
    if (!user) {
      res.redirect("/failed");
    }

    const body = { _id: user.id, email: user.email, role: "free" };

    console.log("body: ", body);

    const token = jwt.sign({ user: body }, "TOP_SECRET");

    const expirationTime = Math.floor(Date.now() / 1000) + 15 * 60;

    await fs.writeFile(
      "fakeLocal.json",
      JSON.stringify({
        Authorization: `Bearer ${token}`,
        expires: expirationTime,
      }),
      (err) => {
        if (err) throw err;
      }
    );

    //add , email: user.email
    res.send(
      JSON.stringify({
        Authorization: `Bearer ${token}`,
        expires: expirationTime,
        email: user.email,
      })
    );
  })(req, res, next);
});

app.use("/getFilteredItems", tokenValidationMiddleware);
app.use("/getFilteredItems", userValidationMiddleware);
app.use("/getFilteredItemsTest", tokenValidationMiddleware);
app.use("/getFilteredItemsTest", userValidationMiddleware);
app.use("/addItem", tokenValidationMiddleware);
app.use("/addItem", userValidationMiddleware);
app.use("/addItemTest", tokenValidationMiddleware);
app.use("/addItemTest", userValidationMiddleware);
app.use("/addFolder", tokenValidationMiddleware);
app.use("/addFolder", userValidationMiddleware);
app.use("/addFolder", uniqueFolderNameMiddleware);
app
  .get("/getItems", async (req, res) => {
    try {
      const items = await item.find();
      res.send(items);
    } catch (err) {
      console.log(err);
    }
  })
  .get("/history", async (req, res) => {
    try {
      const recievedToken = JSON.parse(req.headers.authorization);
      const decoded = await jwt.verify(
        recievedToken.substring(7),
        "TOP_SECRET"
      );
      const email = decoded.user.email;
      const items = await history
        .find({ userEmail: email })
        .sort({ createdAt: -1 })
        .limit(6);
      console.log(item);
      res.send(items);
    } catch (err) {
      console.log(err);
    }
  })
  // .post("/addItem", async (req, res) => {
  //   console.log("user role: ", req.user.role)
  //   console.log(req.body)
  //   if (req.user.role !== "premium"){
  //     const items = await item.find();
  //     console.log(items.length)
  //     if (items.length >= 6){
  //       res.send("can't add any more items")
  //       console.log("Buy premium plan")
  //       return
  //     }
  //   }
  //   try {
  //     const newItem = new item({
  //       name: req.body.name,
  //       quantity: req.body.quantity,
  //       measurement: req.body.measurement,
  //       minQuantity: req.body.minQuantity,
  //       price: req.body.price,
  //       variants: req.body.variants,
  //     });

  //     const id = await getUserId(req)

  //     const HistoryItem = new history({
  //       operation: "added",
  //       name: req.body.name,
  //       quantity: req.body.quantity,
  //       measurement: req.body.measurement,
  //       minQuantity: req.body.minQuantity,
  //       price: req.body.price,
  //       variants: req.body.variants,
  //       userID: id,
  //       "createdAt": new Date(),
  //     });

  //     await newItem.save();

  //     await HistoryItem.save()

  //     res.send("added");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // })
  .post("/addItem", upload.single("image"), async (req, res) => {
    const recievedToken = JSON.parse(req.headers.authorization);
    const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
    const email = decoded.user.email;
    console.log("user role: ", req.user.role);
    console.log(req.body);
    if (req.user.role !== "premium") {
      const items = await item.find({ userEmail: email });
      console.log(items.length);
      if (items.length >= 6) {
        res.send("can't add any more items");
        console.log("Buy premium plan");
        return;
      }
    }
    try {
      const totalPrice = req.body.price * req.body.quantity;
      const lowFlag = req.body.quantity <= req.body.minQuantity;
      const newItem = new item({
        name: req.body.name,
        quantity: req.body.quantity,
        measurement: req.body.measurement,
        minQuantity: req.body.minQuantity,
        price: req.body.price,
        variants: req.body.variants,
        userEmail: email,
        totalPrice: totalPrice,
        tags: req.body.tags,
        lowFlag: lowFlag,
        customText: req.body.customText,
      });

      const id = await getUserId(req);

      const HistoryItem = new history({
        operation: "added",
        name: req.body.name,
        quantity: req.body.quantity,
        measurement: req.body.measurement,
        minQuantity: req.body.minQuantity,
        price: req.body.price,
        variants: req.body.variants,
        userID: id,
        createdAt: new Date(),
        userEmail: email,
        totalPrice: totalPrice,
      });
      if (req.file) {
        newItem.image = req.file.buffer;
        HistoryItem.image = req.file.buffer;
      }

      await newItem.save();

      await HistoryItem.save();

      res.send("added");
    } catch (err) {
      console.log(err);
    }
  })

  .put("/update/:id", async (req, res) => {
    try {
      const recievedToken = JSON.parse(req.headers.authorization);
      const decoded = await jwt.verify(
        recievedToken.substring(7),
        "TOP_SECRET"
      );
      const email = decoded.user.email;
      const totalPrice = req.body.price * req.body.quantity;
      const result = await item.findByIdAndUpdate(
        { _id: req.params.id },
        {
          name: req.body.name,
          quantity: req.body.quantity,
          measurement: req.body.measurement,
          minQuantity: req.body.minQuantity,
          price: req.body.price,
          variants: req.body.variants,
          totalPrice: totalPrice,
        }
      );

      const id = await getUserId(req);

      const HistoryItemOld = new history({
        operation: ` updated ${req.params.id} from`,
        name: result.name,
        quantity: result.quantity,
        measurement: result.measurement,
        minQuantity: result.minQuantity,
        price: result.price,
        variants: result.variants,
        userID: id,
        userEmail: email,
        totalPrice: result.totalPrice,
      });
      const HistoryItemNew = new history({
        operation: ` updated ${req.params.id} to`,
        name: req.body.name,
        quantity: req.body.quantity,
        measurement: req.body.measurement,
        minQuantity: req.body.minQuantity,
        price: req.body.price,
        variants: req.body.variants,
        totalPrice: totalPrice,
        userID: id,
        userEmail: email,
      });
      await HistoryItemOld.save();
      await HistoryItemNew.save();
    } catch (err) {
      console.log(err);
    }
  })
  .post("/addFolder", async (req, res) => {
    const recievedToken = JSON.parse(req.headers.authorization);
    const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
    const email = decoded.user.email;
    if (req.user.role !== "premium") {
      const allFolders = await folders.find({ userEmail: email });
      console.log(allFolders.length);
      if (allFolders.length >= 1) {
        res.send("can't add any more items");
        console.log("Buy premium plan");
        return;
      }
    }
    const newFolder = await new folders({
      name: req.body.name,
      userEmail: email,
    });
    await newFolder.save();
  })
  .get("/getFolders", async (req, res) => {
    const recievedToken = JSON.parse(req.headers.authorization);
    const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
    const email = decoded.user.email;
    const result = await folders.find({ userEmail: email });
    res.send(result);
  })
  .get("/getFolderNames", async (req, res) => {
    const recievedToken = JSON.parse(req.headers.authorization);
    const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
    const email = decoded.user.email;
    const result = await folders.find({ userEmail: email });
    const response = [];
    result.forEach((folder) => {
      response.push(folder.name);
    });
    res.send(response);
  })

  //needs changing returns cannot put /addToFolder/newfolder while newfolder already exists
  .put("/addToFolder/:name", async (req, res) => {
    try {
      const result = await folders.findOne({ name: req.params.name });
      console.log(req.body.id);
      var updatedFolderItems = [...result.items];
      updatedFolderItems.push({ id: req.body.id, name: req.body.name });
      console.log(result.items);
      const newres = await folders.findOneAndUpdate(
        { name: req.params.name },
        {
          items: updatedFolderItems,
        }
      );
      const itemToUpdate = await item.findOne({ _id: req.body.id });
      var array = itemToUpdate.folder;
      console.log("this is the array", array);
      if (!array.includes(result.name)) {
        array.push(result.name);
        const responseItemChange = await item.findOneAndUpdate(
          {
            _id: req.body.id,
          },
          { folder: array }
        );
      }

      console.log(newres);
      // const result = await item.findByIdAndUpdate({_id: req.params.id}, {
      //   folder:
      // })
    } catch (err) {
      console.log(err);
    }
  })
  .put("/updateTest/:id", upload.single("image"), async (req, res) => {
    try {
      var result;
      const lowflag = req.body.quantity <= req.body.minQuantity;
      if (req.file) {
        const totalPrice = req.body.price * req.body.quantity;
        result = await item.findByIdAndUpdate(
          { _id: req.params.id },
          {
            name: req.body.name,
            quantity: req.body.quantity,
            measurement: req.body.measurement,
            minQuantity: req.body.minQuantity,
            price: req.body.price,
            variants: req.body.variants,
            image: req.file.buffer,
            totalPrice: totalPrice,
            tags: req.body.tags,
            customText: req.body.customText,
            lowFlag: lowflag,
          }
        );
      } else {
        const totalPrice = req.body.price * req.body.quantity;
        result = await item.findByIdAndUpdate(
          { _id: req.params.id },
          {
            name: req.body.name,
            quantity: req.body.quantity,
            measurement: req.body.measurement,
            minQuantity: req.body.minQuantity,
            price: req.body.price,
            variants: req.body.variants,
            totalPrice: totalPrice,
            tags: req.body.tags,
            customText: req.body.customText,
            lowFlag: lowflag,
          }
        );
      }

      const id = await getUserId(req);
      const recievedToken = JSON.parse(req.headers.authorization);
      const decoded = await jwt.verify(
        recievedToken.substring(7),
        "TOP_SECRET"
      );
      const email = decoded.user.email;

      // const HistoryItemOld = new history({
      //   operation: ` updated ${req.params.id} from`,
      //   name: result.name,
      //   quantity: result.quantity,
      //   measurement: result.measurement,
      //   minQuantity: result.minQuantity,
      //   price: result.price,
      //   variants: result.variants,
      //   userID: id,
      //   totalPrice: result.totalPrice,
      //   userEmail: email,
      // });
      // const totalPrice = req.body.price * req.body.quantity;
      // const HistoryItemNew = new history({
      //   operation: ` updated ${req.params.id} to`,
      //   name: req.body.name,
      //   quantity: req.body.quantity,
      //   measurement: req.body.measurement,
      //   minQuantity: req.body.minQuantity,
      //   price: req.body.price,
      //   variants: req.body.variants,
      //   userID: id,
      //   totalPrice: totalPrice,
      //   userEmail: email,
      // });
      // if (req.file) {
      //   HistoryItemOld.image = req.file.buffer;
      //   HistoryItemNew.image = req.file.buffer;
      // }
      // await HistoryItemOld.save();
      // await HistoryItemNew.save();
      const HistoryItemNew = new history({
        operation: `updated`,
        name: req.body.name,
        quantity: req.body.quantity,
        measurement: req.body.measurement,
        minQuantity: req.body.minQuantity,
        price: req.body.price,
        variants: req.body.variants,
        userID: id,
        totalPrice: req.body.totalPrice,
        userEmail: email,
      });
      if (req.file) {
        HistoryItemNew.image = req.file.buffer;
      }
      await HistoryItemNew.save();
      res.send("updated");
    } catch (err) {
      console.log(err);
    }
  })
  .delete("/delete/:id", async (req, res) => {
    try {
      const result = await item.findByIdAndDelete(req.params.id);
      console.log(result);
      const id = await getUserId(req);
      const recievedToken = JSON.parse(req.headers.authorization);
      const decoded = await jwt.verify(
        recievedToken.substring(7),
        "TOP_SECRET"
      );
      const email = decoded.user.email;
      const HistoryItem = new history({
        operation: `deleted`,
        name: result.name,
        quantity: result.quantity,
        measurement: result.measurement,
        minQuantity: result.minQuantity,
        price: result.price,
        variants: result.variants,
        userID: id,
        image: result.image,
        totalPrice: result.totalPrice,
        userEmail: email,
      });
      await HistoryItem.save();
      res.send("deleted");
    } catch (err) {
      console.log(err);
    }
  })
  .delete("/deleteAll", async (req, res) => {
    try {
      await item.deleteMany();
      res.send(200, "deletedAll");
    } catch (err) {
      console.log(err);
    }
  })
  .post("/getFilteredItems", async (req, res) => {
    // check for quantity /
    const recievedToken = JSON.parse(req.headers.authorization);
    const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
    const email = decoded.user.email;
    const filtercriteria = { userEmail: email };
    var returnNothing = false;
    const {
      name,
      minPrice,
      maxPrice,
      minQuantity,
      maxQuantity,
      withNoVariants,
      withVariants,
      sortingOption,
    } = req.body;
    if (name !== "") {
      filtercriteria.name = { $regex: name, $options: "i" };
    }
    if (minPrice !== "") {
      filtercriteria.price = { ...filtercriteria.price, $gte: minPrice };
    }
    if (maxPrice !== "") {
      filtercriteria.price = { ...filtercriteria.price, $lte: maxPrice };
    }
    if (minQuantity !== "") {
      filtercriteria.quantity = {
        ...filtercriteria.quantity,
        $gte: minQuantity,
      };
    }
    if (maxQuantity !== "") {
      filtercriteria.quantity = {
        ...filtercriteria.quantity,
        $lte: maxQuantity,
      };
    }
    if (withNoVariants && withVariants) {
    } else if (withNoVariants) {
      filtercriteria.variants = false;
    } else if (withVariants) {
      filtercriteria.variants = true;
    } else {
      returnNothing = true;
    }
    try {
      if (returnNothing) {
        res.send([]);
      } else {
        const filteredItems = await item
          .find(filtercriteria)
          .sort(sortingOption);

        res.send(filteredItems);
      }
    } catch (err) {
      console.log(err);
    }
  })
  .get("/historyStats", async (req, res) => {
    const stats = {
      itemQuantity: 0,
      folderQuantity: 0,
      totalQuantity: 0,
      totalAmount: 0,
    };
    const recievedToken = JSON.parse(req.headers.authorization);
    const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
    const email = decoded.user.email;
    const items = await item.find({ userEmail: email });
    const folderdata = await folders.find({ userEmail: email });
    items.forEach((someItem) => {
      stats.itemQuantity += 1;
      stats.totalQuantity += someItem.quantity;
      stats.totalAmount += someItem.totalPrice;
    });
    folderdata.forEach((folder) => {
      stats.folderQuantity += 1;
    });
    res.send(stats);
  })
  .post("/getFilteredItemsTest", async (req, res) => {
    const recievedToken = JSON.parse(req.headers.authorization);
    const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
    const email = decoded.user.email;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    // check for quantity /
    const filtercriteria = { userEmail: email };
    var returnNothing = false;
    const {
      name,
      minPrice,
      maxPrice,
      minTotalPrice,
      maxTotalPrice,
      minQuantity,
      maxQuantity,
      withNoVariants,
      withVariants,
      sortingOption,
      folderFilter,
      tagFilter,
      lowFlag,
    } = req.body;
    if (lowFlag) {
      filtercriteria.lowFlag = true;
    }
    if (name !== "") {
      filtercriteria.name = { $regex: name, $options: "i" };
    }
    if (folderFilter && folderFilter !== "") {
      filtercriteria.folder = { $regex: folderFilter, $options: "i" };
    }
    if (tagFilter && tagFilter.length > 0) {
      console.log("tagFilter: ", tagFilter);
      const tagIds = tagFilter.map((tag) => tag._id);
      filtercriteria["tags._id"] = { $in: tagIds };
    }
    if (minPrice !== "") {
      filtercriteria.price = { ...filtercriteria.price, $gte: minPrice };
    }
    if (maxPrice !== "") {
      filtercriteria.price = { ...filtercriteria.price, $lte: maxPrice };
    }
    if (minTotalPrice !== "") {
      filtercriteria.totalPrice = {
        ...filtercriteria.totalPrice,
        $gte: minTotalPrice,
      };
    }
    if (maxTotalPrice !== "") {
      filtercriteria.totalPrice = {
        ...filtercriteria.totalPrice,
        $lte: maxTotalPrice,
      };
    }
    if (minQuantity !== "") {
      filtercriteria.quantity = {
        ...filtercriteria.quantity,
        $gte: minQuantity,
      };
    }
    if (maxQuantity !== "") {
      filtercriteria.quantity = {
        ...filtercriteria.quantity,
        $lte: maxQuantity,
      };
    }
    if (withNoVariants && withVariants) {
    } else if (withNoVariants) {
      filtercriteria.variants = false;
    } else if (withVariants) {
      filtercriteria.variants = true;
    } else {
      returnNothing = true;
    }
    try {
      if (returnNothing) {
        console.log("nothing was sent");
        res.json({
          filteredItems: [],
          totalItems: 0,
          totalPages: 0,
          currentPage: 1,
        });
      } else {
        console.log(sortingOption);
        const filteredItems = await item
          .find(filtercriteria)
          .sort(sortingOption)
          .limit(limit)
          .skip(skip);
        console.log(filtercriteria);
        const totalItems = await item.find(filtercriteria).countDocuments();
        res.json({
          filteredItems,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
        });
        // res.send(filteredItems)
      }
    } catch (err) {
      console.log(err);
    }
  })
  .get("/item/:id", async (req, res) => {
    const response = await item.findById(req.params.id);
    console.log(response);
    res.send(response);
  });
//for testing purpose
const testCryptoVerify = () => {
  const { privateKey, publicKey } = crypto.generateKeyPair(
    "rsa",
    {
      modulusLength: 530, // options
      publicExponent: 0x10101,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "der",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "der",
        cipher: "aes-192-cbc",
        passphrase: "GeeksforGeeks is a CS-Portal!",
      },
    },
    (err, publicKey, privateKey) => {
      // Callback function
      if (!err) {
        // Prints new asymmetric key pair
        console.log("Public Key is : ", publicKey);
        console.log();
        console.log("Private Key is: ", privateKey);
      } else {
        // Prints error
        console.log("Errr is: ", err);
      }
    }
  );
  console.log("Private Key: ", privateKey);
  console.log("Public Key: ", publicKey);
  const algorithm = "sha256withRSAEncryption";
  console.log("algorithm : ", algorithm);
  let data = Buffer.from({ body: "haha" });
  console.log("data : ", data);
  let signature = crypto.sign(algorithm, data, privateKey);
  console.log("signature : ", signature);

  let verified = crypto.verify(algorithm, data, publicKey, signature);
  console.log("verified : ", verified);
};
app.get("/crypto", (req, res) => {
  testCryptoVerify();
  res.status(200).send("done");
});
app
  .get("/-folders", async (req, res) => {
    const data = await folders.find();
    res.send(data);
  })
  .get("/-item", async (req, res) => {
    const data = await item.find();
    console.log("👻");
    data.forEach((item) => {
      console.log(item.name, ":", item.userEmail, ":", item.tags);
    });
    res.send(data);
  })
  .get("/-history", async (req, res) => {
    const data = await history.find();
    res.send(data);
  })
  .get("/-users", async (req, res) => {
    const data = await users.find();
    res.send(data);
  })
  .get("/-tags", async (req, res) => {
    const data = await tags.find();
    res.send(data);
  })
  .delete("/-deleteFolders", async (req, res) => {
    try {
      await folders.deleteMany();
      res.send(200, "deletedAll");
    } catch (err) {
      console.log(err);
    }
  })
  .post("/email", async (req, res) => {
    contact(req, res);
  })
  .get("/folderItems/:name", async (req, res) => {
    const folderfound = await folders.findOne({ name: req.params.name });
    var itemArray = [];
    if (folderfound) {
      for (const foundItem of folderfound.items) {
        const response = await item.findOne({ name: foundItem.name });
        console.log(response.name);
        // itemArray.push(foundItem.name);
        itemArray.push(response);
      }
      res.send(itemArray);
    } else {
      res.send("not found");
    }
  })
  .post("/addTag", async (req, res) => {
    try {
      const recievedToken = JSON.parse(req.headers.authorization);
      const decoded = await jwt.verify(
        recievedToken.substring(7),
        "TOP_SECRET"
      );
      const email = decoded.user.email;
      const newTag = new tags({
        email: email,
        name: req.body.name,
        color: req.body.color,
      });
      await newTag.save();
      res.status(200).send("saved");
    } catch (err) {
      console.log(err);
    }
  })
  .put("/updateItemTags/:id", async (req, res) => {
    try {
      console.log("called");
      console.log(req.params.id);
      console.log("reques body is here : ", req.body);
      // const itemToUpdate = await item.find({_id: req.params.id})
      // const updatedTags = itemToUpdate.tags
      const response = await item.findOneAndUpdate(
        { _id: req.params.id },
        { tags: req.body.selectedTags }
      );
    } catch (err) {
      console.log(err);
    }
  })
  .get("/getTags", async (req, res) => {
    try {
      const recievedToken = JSON.parse(req.headers.authorization);
      const decoded = await jwt.verify(
        recievedToken.substring(7),
        "TOP_SECRET"
      );
      const email = decoded.user.email;
      const foundTags = await tags.find({ email: email });
      res.send(foundTags);
    } catch (err) {
      console.log(err);
    }
  })
  .get("/getItemById/:id", async (req, res) => {
    try {
      const result = await item.findOne({ _id: req.params.id });
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  })
  .get("/getUserInfo", async (req, res) => {
    try {
      const recievedToken = JSON.parse(req.headers.authorization);
      const decoded = await jwt.verify(
        recievedToken.substring(7),
        "TOP_SECRET"
      );
      const email = decoded.user.email;
      const userInfo = await users.findOne({ email: email });
      res.send(userInfo);
    } catch (err) {
      console.log(err);
    }
  })
  .put("/changePassword", async (req, res) => {
    try {
      const oldpass = req.body.currentPassword;
      const newpass = req.body.newPassword;
      console.log("oldpass: ", oldpass, " newpass: ", newpass);
      const recievedToken = JSON.parse(req.headers.authorization);
      const decoded = await jwt.verify(
        recievedToken.substring(7),
        "TOP_SECRET"
      );
      const email = decoded.user.email;
      const userInfo = await users.findOne({ email: email });
      const passwordMatches = await bcrypt.compare(oldpass, userInfo.password);
      if (!passwordMatches) {
        res.status(400).send("password is incorrect");
        return;
      }

      console.log("changing password");
      // await users.findOneAndUpdate({ email: email }, { password: newpass });
      res.send("changed");
    } catch (err) {
      console.log(err);
    }
  })
  .put("/changePersonalInfo", async (req, res) => {
    try {
      const recievedToken = JSON.parse(req.headers.authorization);
      const decoded = await jwt.verify(
        recievedToken.substring(7),
        "TOP_SECRET"
      );
      const email = decoded.user.email;
      // await users.findOneAndUpdate(
      //   { email: email },
      //   {
      //     firstname: req.body.firstname,
      //     lastname: req.body.lastname,
      //     email: req.body.email,
      //   }
      // );
      res.send("updated");
    } catch (err) {
      console.log(err);
    }
  })
  .post("/addCompanyLogo", upload.single("image"), async (req, res) => {
    const recievedToken = JSON.parse(req.headers.authorization);
    const decoded = await jwt.verify(recievedToken.substring(7), "TOP_SECRET");
    const email = decoded.user.email;
    try {
      const response = await companies.findOneAndUpdate(
        { email: email },
        { logo: req.file.buffer }
      );
    } catch (err) {
      console.log(err);
    }
  })
  .post("/addCompany", async (req, res) => {});

app.listen(3001, () => {
  console.log("listening", 3001);
});
