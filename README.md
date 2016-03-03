[![Build Status](https://travis-ci.org/pedrobarrostech/digits-to-word.png?branch=master)](https://travis-ci.org/pedrobarrostech/digits-to-word)
[![Coverage Status](https://img.shields.io/coveralls/pedrobarrostech/digits-to-word.svg)](https://coveralls.io/r/pedrobarrostech/digits-to-word?branch=master)


Introduction
===================

digits-to-word is a little npm module written in ES6 to help you spell out numbers in words.


* 97 = ninety-seven
* 95.99 = ninety-five (digits-to-word discards anything after the decimal point)
* 106 = one hundred and six
* 89,828,374,986 = eighty-nine billion, eight hundred and twenty-eight million, three hundred and seventy-four thousand, nine hundred and eighty-six
* 9,999,999,999,999,995 = nine quadrillion, nine hundred and ninety-nine trillion, nine hundred and ninety-nine billion, nine hundred and ninety-nine million, nine hundred and ninety-nine thousand, nine hundred and ninety-five

Assumptions
------------

digits-to-word expects string input but will try to deal with number input as well, up to but not including 9007199254740992, which is the biggest number Javascript will nicely turn into a string. 

digits-to-word currently handles numbers up to 16 digits long.


Installing
-------
```
npm install
```


Testing
-------
Run tests with mocha. Tests are in the /test directory. 
```
npm test
```

Dependencies?
---------------------------
Umpteen has no runtime dependencies. To run the tests, you'll need:

* mocha
* chai
* babel

For checking test coverage and getting that nice little badge at the top, I used:

* istabul
* coveralls