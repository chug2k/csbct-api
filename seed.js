// Find all ppl asking for money, and have a pic

const people = require("./data-1628614679353.json");
console.log(`Loaded ${people.length} people.`);
const peopleWantingMoney = [];

for (let person of people) {
  const items = person.items;
  // Ignore done people
  if (person.type !== "receive" || person.isFinished !== false) {
    continue;
  }
  // only take people with images
  if (!person.imageUrls || person.imageUrls.length < 1) {
    continue;
  }
  // Find people who requested item "money"
  const moneyRequested = items.find((item) => item.item === null);
  if (moneyRequested) {
    const amount = Number(moneyRequested.amount);
    // Fix up the people who used decimals, assume they're wanting millions
    if (amount % 1 != 0) {
      moneyRequested.amount = moneyRequested.amount * 1000000;
    } else {
      // People who asked for whole numbers less than 1000, probably were asking in "thousands" (e.g. 200 => 200,000)
      if (amount < 1000) {
        moneyRequested.amount = moneyRequested.amount * 1000;
      }
    }

    peopleWantingMoney.push(person);
  }
}

// Total Amount
console.log(
  peopleWantingMoney.reduce(
    (acc, p) => acc + p.items.find((i) => i.item === null).amount,
    0
  )
);

// Now let's get these people into our db.

// Step 1: Create Receiver
// Step 2: Create DonationRequest

const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/test";

const Receiver = require("./models/Receiver");
const DonationRequest = require("./models/request");

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => doStuff());

async function doStuff() {
  console.log(
    `Erasing all receivers and donationrequests and adding ${peopleWantingMoney.length}`
  );
  await Receiver.deleteMany({});
  await DonationRequest.deleteMany({});

  for (let person of peopleWantingMoney) {
    const receiver = new Receiver({
      phoneNumber: person.phoneNumber,
      name: person.name,
      location: person.address,
      media: person.imageUrls[0],
    });
    const r = await receiver.save();
    const amount = person.items.find((i) => i.item === null).amount;
    const donationRequest = new DonationRequest({
      receiver: r,
      need: amount,
      amount_remaining: amount,
      details: person.note,
      media:
        person.imageUrls.length > 1 ? person.imageUrls[1] : person.imageUrls[0],
    });
    await donationRequest.save();
  }
  process.exit();
}
