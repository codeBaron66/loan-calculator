const amount         = document.getElementById('amount'),
      interest       = document.getElementById('interest'),
      years          = document.getElementById('years'),
      monthlyPayment = document.getElementById('monthly-payment'),
      totalPayment   = document.getElementById('total-payment'),
      totalInterest  = document.getElementById('total-interest');

document.getElementById('loan-form').addEventListener('submit', function (e) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 1200);
  e.preventDefault();
});

function calculateResults() {
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

function showError(error) {
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'none';

  setTimeout(clearError, 3000);
}

function clearError(){
  document.querySelector('.alert').remove();
}