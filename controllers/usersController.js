const Transaction = require("../models/Transaction");
const ImportedUsers = require("../models/importedUsers");

async function getUsers(req, res) {
  const { page = 1, limit = 10 } = req.query;

  try {
    const sortedTransactions = await Transaction.find({
      $or: [{ destination: "lead_buy" }, { destination: "order_refund" }],
    }).sort("destination");

    const userIds = Array.from(
      new Set(
        sortedTransactions.map((transaction) => transaction.user.toString())
      )
    );

    const users = await ImportedUsers.paginate(
      { _id: { $in: userIds } },
      { page, limit }
    );

    const enhancedUsers = await Promise.all(
      users.docs.map(async (user) => {
        const totalSpend = sortedTransactions
          .filter(
            (transaction) =>
              transaction.user.toString() === user._id.toString() &&
              transaction.destination === "lead_buy"
          )
          .reduce((total, transaction) => total + transaction.amount, 0);
        const totalRefund = sortedTransactions
          .filter(
            (transaction) =>
              transaction.user.toString() === user._id.toString() &&
              transaction.destination === "order_refund"
          )
          .reduce((total, transaction) => total + transaction.amount, 0);

        return {
          email: user.email,
          totalSpend,
          totalRefund,
        };
      })
    );

    const response = {
      docs: enhancedUsers,
      totalDocs: users.totalDocs,
      limit: users.limit,
      totalPages: users.totalPages,
      page: users.page,
      pagingCounter: users.pagingCounter,
      hasPrevPage: users.hasPrevPage,
      hasNextPage: users.hasNextPage,
      prevPage: users.prevPage,
      nextPage: users.nextPage,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getUsers
};
