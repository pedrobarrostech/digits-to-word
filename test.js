import 'babel-polyfill';
import DigitsToWord from './src/digits-to-word';
import chai from 'chai';
import assert from 'assert';

const umpteen = new DigitsToWord;
chai.should();

describe('checking length', () => {
  	const number9007199254740993 = 9007199254740993;
  	it ('should reject numbers bigger than JS likes ', () => {
	  	umpteen.checkTypeAndLength(number9007199254740993).should.be.an.instanceof(Error);
  	})
  	const number9007199254740993_string = "9007199254740993";
  	it ('should accept strings that look like numbers bigger than JS likes ', () => {
	  	assert.equal("9007199254740993",umpteen.checkTypeAndLength(number9007199254740993_string));
  	})
  	const number9007199254740993_string_digits = "90*((*&(*$%07199254740993.99";
  	it ('should accept strings that look like numbers bigger than JS likes & that have weird chars', () => {
	  	assert.equal("9007199254740993",umpteen.checkTypeAndLength(number9007199254740993_string_digits));
  	})
  	const number9007199254740992 = 9007199254740992;
  	it ('should reject numbers bigger than JS likes, take 2 ', () => {
	  	umpteen.checkTypeAndLength(number9007199254740992).should.be.an.instanceof(Error);
  	})
  	const numberShort = 1;
  	it ('should NOT reject numbers that are not bigger than JS likes ', () => {
	  	umpteen.checkTypeAndLength(numberShort).should.not.be.an.instanceof(Error);
  	})
  	it ('should reject strings that are longer than JS likes numbers to be ', () => {
		umpteen.checkTypeAndLength("12345678901234567").should.be.an.instanceof(Error);
  	})	  	
})
describe('checking for negativity', () => {
  it('should return the word "negative" if the number begins with -', () => {
      assert.equal("negative ", umpteen.checkNegative("-99"));
	})
  it('should not return the word "negative" if the number does not begin with -', () => {
      assert.equal("", umpteen.checkNegative("99"));
	})
  it('should not return the word "negative" if the number includes a -', () => {
      assert.equal("", umpteen.checkNegative("9-9"));
	})		
})
describe('remove decimals', () => {
  it('should return a simple number for a decimal', () => {
      assert.equal(3, umpteen.digitsToWord().noDecimals(3.14));
	})
  it('should return a simple number for a string decimal', () => {
      assert.equal(3, umpteen.digitsToWord().noDecimalsString("3.14"));
	})
  it('should return a simple number for a string double decimal', () => {
      assert.equal(3, umpteen.digitsToWord().noDecimalsString("3.14.16"));
	})
  it('should return an error if only decimals, number version', () => {
	    umpteen.digitsToWord().noDecimals(.14).should.be.an.instanceof(Error);
	})
	it('should return an error if only decimals, string version', () => {
	    umpteen.digitsToWord().noDecimals(".14").should.be.an.instanceof(Error);
	})
})
describe('remove spaces', () => {
  const numberSpaces = '3 3';
  it('should return a number without internal spaces', () => {
      assert.equal(33, umpteen.digitsToWord().onlyDigits(numberSpaces));
	})
	const leadingNumberSpaces = ' 33';
  it('should return a number without leading spaces', () => {
      assert.equal(33, umpteen.digitsToWord().onlyDigits(leadingNumberSpaces));
	})
	const trailingNumberSpaces = '33 ';
  it('should return a number without trailing spaces', () => {
      assert.equal(33, umpteen.digitsToWord().onlyDigits(trailingNumberSpaces));
	})
})
describe('removing commas and other characters', () => {    
	const numberCommas = '3,003';
    it('should return a number without commas', () => {
      assert.equal(3003, umpteen.digitsToWord().onlyDigits(numberCommas));
	})
	const numberWithJunk = '9a*&^(*(&^8$$$';
	it('should return just a number with no letters or symbols', () => {
		assert.equal(98, umpteen.digitsToWord().onlyDigits(numberWithJunk));
	})
	const justWord = 'hamburger';
	it('should return an error if no digits at all', () => {
		umpteen.digitsToWord().onlyDigits(justWord).should.be.an.instanceof(Error);
	})
})
describe('does it array?', () => {  	
	const numberForArray = 30003;
    it('should return an array', () => {
      assert.deepEqual([3,0,0,0,3], umpteen.arrayify(numberForArray));
	})
})
describe('hey, check for zeros!', () => {
	const testNumber0 = 0;
	it ('should return an array of ["zero"] for number 0', () => {
  		assert.deepEqual(["zero"], umpteen.checkZero(testNumber0))
  	})
	const testNumberNot0 = 3;
	it ('should return the number for non-0 numbers', () => {
  		assert.deepEqual(3, umpteen.checkZero(testNumberNot0))
  	})
  const testNumberLeading0 = "0003";
	it ('should remove any leading 0s for non-0 numbers', () => {
  		assert.deepEqual(3, umpteen.checkZero(testNumberLeading0))
  	})	
  const testNumberLeadingAndTrailing0 = "00010";
	it ('should remove any leading 0s for non-0 numbers', () => {
  		assert.deepEqual(10, umpteen.checkZero(testNumberLeadingAndTrailing0))
  	})
	const testString0 = "00";
	it ('should return an array of just the word zero for string 0', () => {
  		assert.deepEqual(["zero"], umpteen.checkZero(testString0))
  })

})
describe('number test cases', () => {
	const testNumber0 = 0;
	it ('should return an array for single-digit numbers', () => {
  		assert.deepEqual(["zero"], umpteen.checkZero(testNumber0))
  	})
	const testNumber3 = 3;
  	it ('should return an array for single-digit numbers', () => {
  		assert.deepEqual([" ", " ", "three"], umpteen.spellItOut(testNumber3))
  	})
  	const testNumber12 = 12;
  	it ('should return an array for teen numbers', () => {
  		assert.deepEqual([" ", " ", "twelve"], umpteen.spellItOut(testNumber12))
  	})
  	const number123 = 123;
  	it ('should return an array for a three-digit number', () => {
  		assert.deepEqual(["one hundred and", "twenty-", "three"], umpteen.spellItOut(number123))
  	})	
  	it ('should return an array for a three-digit teen number', () => {
  	assert.deepEqual(["five hundred and", " ", "twelve"], umpteen.spellItOut(512))
  	})  
  	const number204 = 204;
  	it ('should return an array for three-digit number with a middle zero', () => {
  		assert.deepEqual(["two hundred and", " ", "four"], umpteen.spellItOut(number204))
  	})
  	const number240 = 240;
  	it ('should return an array for three-digit number with a final zero', () => {
  		assert.deepEqual(["two hundred and", "forty-", " "], umpteen.spellItOut(number240))
  	})	
  	const number1234 = 1234;
  	it ('should return an array for a four-digit number', () => {
  		assert.deepEqual([" ", " ", "one thousand,", "two hundred and", "thirty-", "four"], umpteen.spellItOut(number1234))
  	})  		
  	const number1024 = 1024;
  	it ('should return an array for a four-digit number with a zero in the hundreds place', () => {
  		assert.deepEqual([" ", " ", "one thousand,", " ", "twenty-", "four"], umpteen.spellItOut(number1024))
  	})	
  	const number1204 = 1204;
  	it ('should return an array for a four-digit number with a zero in the tens place', () => {
  		assert.deepEqual([" ", " ", "one thousand,", "two hundred and", " ", "four"], umpteen.spellItOut(number1204))
  	})	
  	const number12345 = 12345;
  	it ('should spell out a five-digit number', () => {
  		assert.deepEqual([" ", " ", "twelve thousand,", "three hundred and", "forty-", "five"], umpteen.spellItOut(number12345))
  	})	
  	const number120456 = 120456;
  	it ('should return an array for a five-digit number with a zero in the thousands place', () => {
  		assert.deepEqual([ "one hundred and", "twenty-", "  thousand,", "four hundred and", "fifty-", "six"], umpteen.spellItOut(number120456))
  	})	
  	const number123456 = 123456;
  	it ('should spell out a six digit number', () => {
  		assert.deepEqual(["one hundred and", "twenty-", "three thousand,", "four hundred and", "fifty-", "six"], umpteen.spellItOut(number123456))
  	})	  	
  	const number3456789 = 3456789;
  	it ('should spell out a seven-digit number ', () => {
  		assert.deepEqual([" ", " ", "three million,", "four hundred and", "fifty-", "six thousand,", "seven hundred and", "eighty-", "nine"], umpteen.spellItOut(number3456789))
  	})	 
  	const number12345678 = 12345678;
  	it ('should spell out a eight-digit number ', () => {
  		assert.deepEqual([" ", " ", "twelve million,", "three hundred and", "forty-", "five thousand,", "six hundred and", "seventy-", "eight"], umpteen.spellItOut(number12345678))
  	})	
  	const number123456789 = 123456789;
  	it ('should spell out a nine-digit number ', () => {
  		assert.deepEqual(["one hundred and", "twenty-", "three million,", "four hundred and", "fifty-", "six thousand,", "seven hundred and", "eighty-", "nine"], umpteen.spellItOut(number123456789))
  	})		
  	const number1234567890 = 1234567890;
  	it ('should spell out a ten-digit number ', () => {
  		assert.deepEqual([" ", " ", "one billion,", "two hundred and", "thirty-", "four million,", "five hundred and", "sixty-", "seven thousand,", "eight hundred and", "ninety-", " "], umpteen.spellItOut(number1234567890))
  	})	  
  	const number12345678901 = 12345678901;
  	it ('should spell out a eleven-digit number ', () => {
  		assert.deepEqual([" ", " ", "twelve billion,", "three hundred and", "forty-", "five million,", "six hundred and", "seventy-", "eight thousand,", "nine hundred and", " ", "one"], umpteen.spellItOut(number12345678901))
  	})	
  	const number123456789012 = 123456789012;
  	it ('should spell out a twelve-digit number ', () => {
  		assert.deepEqual(["one hundred and", "twenty-", "three billion,", "four hundred and", "fifty-", "six million,", "seven hundred and", "eighty-", "nine thousand,", " ", " ", "twelve"], umpteen.spellItOut(number123456789012))
  	})	
  	const number1234567890123 = 1234567890123;
  	it ('should spell out a thirteen-digit number ', () => {
  		assert.deepEqual([" ", " ", "one trillion,", "two hundred and", "thirty-", "four billion,", "five hundred and", "sixty-", "seven million,", "eight hundred and", "ninety-", "  thousand,", "one hundred and", "twenty-", "three"], umpteen.spellItOut(number1234567890123))
  	})		  	  		  		
  	const number12345678901234 = 12345678901234;
  	it ('should spell out a fourteen-digit number ', () => {
  		assert.deepEqual([" ", " ", "twelve trillion,", "three hundred and", "forty-", "five billion,", "six hundred and", "seventy-", "eight million,", "nine hundred and", " ", "one thousand,", "two hundred and", "thirty-", "four"], umpteen.spellItOut(number12345678901234))
  	})	
  	const number123456789012345 = 123456789012345;
  	it ('should spell out a fifteen-digit number ', () => {
  		assert.deepEqual(["one hundred and", "twenty-", "three trillion,", "four hundred and", "fifty-", "six billion,", "seven hundred and", "eighty-", "nine million,", " ", " ", "twelve thousand,", "three hundred and", "forty-", "five"], umpteen.spellItOut(number123456789012345))
  	})	
  	const number1234567890123456 = 1234567890123456;
  	it ('should spell out a sixteen-digit number ', () => {
  		assert.deepEqual([" ", " ", "one quadrillion,", "two hundred and", "thirty-", "four trillion,", "five hundred and", "sixty-", "seven billion,", "eight hundred and", "ninety-", "  million,", "one hundred and", "twenty-", "three thousand,", "four hundred and", "fifty-", "six"], umpteen.spellItOut(number1234567890123456))
  	})	
  	const number12345678901234567 = "12345678901234567";
  	it ('should spell out a seventeen-digit number ', () => {
  		assert.deepEqual([" ", " ", "twelve quadrillion,", "three hundred and", "forty-", "five trillion,", "six hundred and", "seventy-", "eight billion,", "nine hundred and", " ", "one million,", "two hundred and", "thirty-", "four thousand,", "five hundred and", "sixty-", "seven"], umpteen.spellItOut(number12345678901234567))
  	})
})
describe('making the number arrays into pretty strings', () => {
  	const NumArray123 = ["one hundred and", "twenty-", "three"];
  	it('should turn the array into a single pretty string', () => {	  
	  	assert.equal("one hundred and twenty-three", umpteen.phrasify(NumArray123));
  	})
  	const NumArray1234567890123456 = [" ", " ", "one quadrillion,", "two hundred and", "thirty-", "four trillion,", "five hundred and", "sixty-", "seven billion,", "eight hundred and", "ninety-", "  million,", "one hundred and", "twenty-", "three thousand,", "four hundred and", "fifty-", "six"];
  	it('should turn the array into a single pretty string', () => {	  
	  	assert.equal("one quadrillion, two hundred and thirty-four trillion, five hundred and sixty-seven billion, eight hundred and ninety million, one hundred and twenty-three thousand, four hundred and fifty-six", umpteen.phrasify(NumArray1234567890123456));
  	})
})
describe('testing final function', () => {
	const testString0 = "00";
	it ('should return an array of just the word zero for string 0', () => {
  		assert.deepEqual("zero", umpteen.finalFunction(testString0));
  })
  const test42 = "42d.6.6";
	it ('should return a clean number from a dirty string', () => {
	  		assert.deepEqual("forty-two", umpteen.finalFunction(test42));
	})
  it ('should handle the biggest possible number nicely', () => {
  		assert.deepEqual("nine quadrillion, nine hundred and ninety-nine trillion, nine hundred and ninety-nine billion, nine hundred and ninety-nine million, nine hundred and ninety-nine thousand, nine hundred and ninety-nine", umpteen.finalFunction("9999999999999999"));
  })
  it ('should pass through an error from the cleannumber test', () => {
  	umpteen.finalFunction(".014").should.be.an.instanceof(Error);
  })
  it ('should return negative for a negative number', () => {
  	umpteen.finalFunction("-99").should.equal("negative ninety-nine");
  })

})
