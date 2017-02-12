'use strict';

function ChatFlow() {
  this.resourceTypes = new Map([
    ['abortion', ['abortion', 'termination', 'feticide', 'aborticide']],
    ['birth control', ['pill', 'contraception', 'IUD']],
    ['sex positive gynocologist', ['gynocologist', 'vagina', 'STD', 'HPV']],
    ['sex change', ['transgender', 'sex', 'change', 'reassignment', 'hormone', 'estrogen', 'testosterone']],
    ['help', ['help']], // print out our resourceTypes in next message
    ['hair loss', ['balding', 'hair', 'alopecia']],
    ['infertility', ['infertility', 'reproduction', 'baby', 'IVF', 'egg', 'freeze']],
    ['menopause', ['menopause', 'hormone', 'estrogen', 'hot', 'flash']],
  ]);
}

// Start chat by sending intro:
// "Hi, I'm here to help connect you with doctors and resources. You can type something like: 'abortion', 'birth control', 'gynocologist', etc."
// "You can also type 'help' for a list of resource types available."

// @param !Object<String> entities The main words found by natural lang algo.
// @return !String The winning resourceType.
ChatFlow.prototype.chooseResponse = function (entities) {
  var scores = {};
  for (let entity of entities) {
    for (let [resourceType, synonyms] of this.resourceTypes) {
      if (synonyms.includes(entity)) {
        scores[resourceType] ? scores[resourceType]++ : scores[resourceType] = 1;
      }
    }
  }
  // Could be a tie for top score, give a not sure answer then.
  scores = Object.keys(scores).reduce((a, b) => {
    if (scores[a] > scores[b]) {
      return a;
    } else if (scores[a] === scores[b]) {
      return 'tie';
    } else {
      return b;
    }
  });
  if (scores === 'tie') {
    return 'not sure';
  }
  return scores;
};

var cf = new ChatFlow();
console.log(cf.chooseResponse(['estrogen', 'menopause']));
