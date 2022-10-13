function findAccountById(accounts, id) {
  return accounts.find((account => account.id === id))
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) =>
  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
 )
 return accounts
}

function getTotalNumberOfBorrows(account, books) {
  // destructuring account to id
  const {id} = account
  let total = books.reduce((total, book) => {
    let borrowed = book.borrows.some((borrowsObj) => {
      return borrowsObj.id === id
    })
    if (borrowed) { // if borrowed return a truthy output
      total++
    }
    return total
  },0)
  return total
}

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  const {id:givenAccountId} = account
  let booksAccountHasOnIt = books.filter((bookObj) => {
    let recentBorrower = bookObj.borrows[0]
    if (recentBorrower.returned === false && recentBorrower.id === givenAccountId) {
      const {authorId} = bookObj
      let foundAuthorObj = authors.find((authorObj) => {
        return authorObj.id === authorId
      })
      bookObj.author = foundAuthorObj
      return bookObj
    }
  })
  return booksAccountHasOnIt
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
