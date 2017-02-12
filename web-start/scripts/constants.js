BOT_NAME = "Fem Health Bot";
BOT_IMAGE_URL = '/images/women-health-symbol.jpg';

MESSAGES = {
  'noMatch': 'I don\'t understand, please try to answer the following question to your best abilities.',
  'address': 'What is your address?',
  'insuranceAvailable': 'Do you have insurance you can use? (yes/no)',
  'insuranceProvider': 'Who is your insurance provider? We will try to find a provider who is in your network.',
  'docVisit': 'Do you want to see a doctor in person? (yes/no)',
  'travelDistance': 'How far are you willing to travel in miles? (Enter a number)',
  'travelCapability': 'Do you have a way of getting to the doctor? (yes/no)',
  'lastPeriod': 'Was your last period more or less than 8 weeks ago? (more/less)',
  'help': 'Try searching for resource categories such as "abortion", "birth control", "IUD", "sterilization", "sex positive gynecologist", "sex change", "hair loss", "infertility", or "menopause"',
  // WoIns - without insurance
  'docVisitWoIns': 'An average doctor’s visit costs $200 without insurance.',
  'docVisitIns': 'An average doctor’s visit costs $15-50 with insurance.',
  'birthControlWoIns': 'Birth control costs from $5-100 per month without insurance.',
  'iudWoIns': 'An IUD costs $500-1000 without insurance according to Planned Parenthood. They can last between 3 -10 years.',
  'sterilizationWoIns': 'The sterilization procedure costs $1500-$6000 without insurance according to Planned Parenthood.',
  'sterilizationInfo': 'This is considered a permanent procedure and can take a few weeks to get set up and recover from.',
  'freeWithIns': 'This is free with insurance.',
  'abortionLess8Week': 'You can take an abortion pill instead of getting surgery. An abortion pill costs up to $800.',
  'abortionMore8Week': 'The abortion surgery costs up to $1500.',
};
MESSAGE_FLOWS = {
  'abortion': ['address', 'insuranceAvailable', {'yes': 'insuranceProvider'},
    'lastPeriod', {'less': 'abortionLess8Week', 'more': 'abortionMore8Week'}, 'travelDistance', 'travelCapability'],
  'birth control': [],
  'sterilization': [],
  'IUD': [],
  'gynecologist': [],
  'sex change': [],
  'hair loss': [],
  'infertility': [],
  'menopause': [],
  'help': [],
};
