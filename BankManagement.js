// class Bank account
class BankAccount{
    constructor(accountNumber,accountHolder,balance=0){
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }
    // deposit amount
    deposit(amount){
        if(amount>0){
            this.balance += amount;
            console.log(`${amount} deposited in ${this.accountHolder} account. New balance ${this.balance}`);
        }else{
            console.log("Amount must be positive.")
        }
    }
    // withdraw amount
    withdraw(amount){
        if(amount>0 && amount<=this.balance){
            this.balance -= amount;
            console.log(`${amount} withdrawn from ${this.accountHolder} account. Remaining balance ${this.balance}`);
        }else{
            console.log("Insufficient funds or invalid amount.")
        }
    }
    // check balance
    checkBalance(){
        console.log(`Account balance for ${this.accountHolder}: ${this.balance}`);
    }
};

// class saving account extends Bank account
class SavingAccount extends BankAccount{
    constructor(accountNumber,accountHolder,balance,interestRate){
        super(accountNumber,accountHolder,balance);
        this.interestRate = interestRate;
    }
    // add interest
    addInterest(){
        const interest = (this.balance * this.interestRate)/100;
        this.balance += interest;
        console.log(`Interest added: ${interest} in ${this.accountHolder} account, New balance: ${this.balance}`);
    }
};

// current account extends bank account
class CurrentAccount extends BankAccount{
    constructor(accountNumber,accountHolder,balance,overdraftLimit){
        super(accountNumber,accountHolder,balance);
        this.overdraftLimit = overdraftLimit;
    }
    // overfraft withdraw amount
    withdraw(amount){
        if(amount>0&&amount<=this.balance + this.overdraftLimit){
            this.balance -= amount;
            console.log(`${amount} withdrawn from ${this.accountHolder} account. Remainig balance: ${this.balance}`);
        }else{
            console.log("Withdraw exceeds overdraft limits.")
        }
    }
};

// manage multiple accounts
class Bank{
    constructor(){
        this.accounts = [];
    }
    // create account
    createAccount(type,accountNumber,accountHolder,balance,extra){
        let account;
        if(type === "saving"){
            account = new SavingAccount(accountNumber,accountHolder,balance,extra);
        }else if(type === "current"){
            account = new CurrentAccount(accountNumber,accountHolder,balance,extra);
        }
        if(account){
            this.accounts.push(account);
            console.log(`New ${type} account created for ${accountHolder}`);
        }
    }
    // find acount
    findAccount(accountNumber){
        return this.accounts.find(account => account.accountNumber == accountNumber);
    }
    // transfer money between two account
    transferMoney(fromAccountNumber,toAccountNumber,amount){
        const fromAccount = this.findAccount(fromAccountNumber);
        const toAccount = this.findAccount(toAccountNumber);
        if(fromAccount && toAccount){
            if(fromAccount.balance > amount){
                fromAccount.withdraw(amount);
                toAccount.deposit(amount);
                console.log(`Transferred ${amount} from ${fromAccount.accountHolder} to ${toAccount.accountHolder}`)
            }else{
                console.log("Insufficient balance to make transfer");
            }
        }else{
            console.log("One or both account are not found.")
        }
    }
};

const myBank = new Bank();
// create account
console.log("======Create Account======");
myBank.createAccount("saving","123456","Chirag",2000,2.5);
myBank.createAccount("current","789012","Jhon",3000,1000);

// find acount
const chiragAccount = myBank.findAccount("123456");
const jhonAccount = myBank.findAccount("789012");

// deposit money
console.log("======Deposit Money======");
chiragAccount.deposit(2000);
jhonAccount.deposit(3000);

// add interest in saving account
console.log("======Add Interest======");
chiragAccount.addInterest();

// withdraw money
console.log("=======Withdraw Money======");
jhonAccount.withdraw(1000);

// transfer money
console.log("======Transfer Money======");
myBank.transferMoney("789012","123456",1000);

// check Balance
console.log("======Check Balance======");
chiragAccount.checkBalance();
jhonAccount.checkBalance();