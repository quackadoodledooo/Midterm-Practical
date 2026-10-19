const interestRate = 0.0575;

document.getElementById("Button1").addEventListener("click", function (event) {
    event.preventDefault();

    const loanAmount = Number(document.getElementById("loanAmount").value);
    const loanTerm = Number(document.getElementById("loanTerm").value);

    if (isNaN(loanAmount) || loanAmount <= 0) {
        alert("Please enter a valid loan amount.");
        return;
    }
    if (loanTerm !== 15 && loanTerm !== 30) {
        alert("Loan term must be 15 or 30 years.");
        return;
    }

    const monthlyPayment = Number(
        (((interestRate / 12) * loanAmount) /
        (1 - Math.pow(1 + (interestRate / 12), (loanTerm * -12)))).toFixed(2)
    );
    const totalInterest = (monthlyPayment * loanTerm * 12) - loanAmount;
    const mortgageAmount = loanAmount + totalInterest;

    let output = "Mortgage term (years): " + loanTerm + "<br>" +
                 "Mortgage interest rate: 5.75%<br>" +
                 "Mortgage amount: $" + mortgageAmount.toFixed(2) + "<br>" +
                 "Total interest amount: $" + totalInterest.toFixed(2) + "<br>" +
                 "Total mortgage amount: $" + mortgageAmount.toFixed(2) + "<br><br>";

    let balance = mortgageAmount;
    let month = 1;

    while (balance > 0) {
        balance = Math.round((balance - monthlyPayment) * 100) / 100;
        if (balance < 0) balance = 0;

        output += "Month " + month + ": Payment $" + monthlyPayment.toFixed(2) +
                  " | Balance $" + balance.toFixed(2) + "<br>";

        if (balance === 0) {
            output += "<br>This is the Ending Amortization Calculator...";
        }
        month++;
    }

    document.getElementById("output").innerHTML = output;
});