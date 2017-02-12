'use strict';

function ChatFlow(chatRef) {
  // constants
  this.chatRef = chatRef;
  this.flowFinalized = false;

  this.patterns = new Map([
    ['abortion', ['abortion', 'termination', 'feticide', 'aborticide']],
    ['birth control', ['pill', 'contraception']],
    ['IUD', ['IUD', 'contraception']],
    ['gynecologist', ['gynecologist', 'vagina', 'STD', 'HPV']],
    ['sex change', ['transgender', 'sex', 'change', 'reassignment', 'hormone', 'estrogen', 'testosterone']],
    ['hair loss', ['balding', 'hair', 'alopecia']],
    ['infertility', ['infertility', 'reproduction', 'baby', 'IVF', 'egg', 'freeze']],
    ['menopause', ['menopause', 'hormone', 'estrogen', 'hot', 'flash']],
    ['sterilization', ['sterilization', 'contraception']],
  ]);
}

// @param !String question
ChatFlow.prototype.sendChatbotMsg = function(message) {
  this.chatRef.push({
    name: BOT_NAME,
    text: message,
    photoUrl: BOT_IMAGE_URL,
  });
};

// @param !Object<String> entities The main words found by natural lang algo.
// @return ?String The winning pattern.
ChatFlow.prototype.chooseResourceFlow = function(entities) {
  var scores = {};
  for (let entity of entities) {
    for (let [pattern, synonyms] of this.patterns) {
      if (synonyms.includes(entity)) {
        scores[pattern] ? scores[pattern]++ : scores[pattern] = 1;
      }
    }
  }
  // Could be a tie for top score, give a no match answer then.
  var patternMatch = Object.keys(scores).reduce((a, b) => {
    if (scores[a] > scores[b]) {
      return a;
    } else if (scores[a] === scores[b]) {
      return 'no match';
    } else {
      return b;
    }
  });
  return patternMatch;
};


ChatFlow.prototype.finalizeResourceFlow = function() {
  while ()
};

ChatFlow.prototype.runFlow = function() {
  while ()
};
