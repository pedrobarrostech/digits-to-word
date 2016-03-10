class DigitsToWord {

    constructor(n){ 
        this._digit = n;
    }

    underTwenty(number) {
        this._oneToNineteen = [' ', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        return this._oneToNineteen[number];
    }
    underHundred(number) {
       this._tens = [' ', 'ten', 'twenty-', 'thirty-', 'forty-', 'fifty-', 'sixty-', 'seventy-', 'eighty-', 'ninety-'];
       return this._tens[number];
    }
    singleDigit(number) {
        this._ones = [' ', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        return this._ones[number];
    } 
    
  
    digitsToWord(number) {
        return {
           myNumber : this.number,
            onlyDigits :  function(myNumber){  
                if (typeof myNumber === 'string') {
                    let exp = /[^\d]/ig;
                    myNumber = myNumber.replace(exp,"");
                }
                if (myNumber !== "") {
                    return myNumber;
                } else {
                    return new Error("Sorry, please enter at least one digit.");
                }

            },
            noDecimals : function (myNumber){
                if (Math.floor(myNumber) === 0) { 
                    return new Error("Sorry, number too small.");
                } else {
                    myNumber = Math.floor(myNumber);
                    return myNumber;
                }
            },
            //HEY DELIMITERS HERE
            noDecimalsString : function (myNumber){
                myNumber = myNumber.split(".", 1);
                if (myNumber[0] !== "") {
                    return myNumber[0];
                } else {
                    return new Error("Sorry, number too small.");
                }
                
            }
        }
    }

    // this function does the checking for non-digits and too-big numbers
    // this totally needs some refactoring, probably a case statement or split it out into separate functions
    checkTypeAndLength(input) {
        if ((typeof (input) == 'number') && input >= 9007199254740992) { 
            return new Error("Sorry, number too big. Blame Javascript!");   
        } else if (typeof (input) == 'number'){
            return (this.digitsToWord().noDecimals(input).toString);
        } else if (typeof (input) == 'string') {
            let tempNum = this.digitsToWord().noDecimalsString(input);
            if (tempNum instanceof Error) {
                return (tempNum);
            } else if ((this.digitsToWord().onlyDigits(tempNum).length > 16)) {
                return new Error("Sorry, I can't count that high!")
            } else {
                return(this.digitsToWord().onlyDigits(tempNum));
            } 
            }
        }


        
    //turn number into an array
    arrayify(input) {
        let stringNum;
        if (typeof (input) == 'string'){
            stringNum = input;
        }
        else {
            stringNum = input.toString();
        }
        let arrayOfNums = stringNum.split("");
        let length = arrayOfNums.length;
        for(let i=0; i<length; i++) { arrayOfNums[i] = +arrayOfNums[i]; }
        return arrayOfNums;
    }


    // the main function that creates the array of words from number input
    spellItOut(number) {
        this._powers = ['', 'hundred', ' thousand,', ' million,', ' billion,', ' trillion,', ' quadrillion,', ' quintillion,', ' sextillion,'];
        
        //let's make some letiables
        let spelledNums = [];
       //what we return
        let spelledArray = [];
        //tempNums is a temporary array to count backwards by threes
        let tempNums = [];
        //create an array from the number string
        let arrayOfNums = this.arrayify(number);
        console.log(arrayOfNums);
        //get the length
        let myLength = arrayOfNums.length;
        // make an array of arrays, counting from the end of the number = 123,456 = [[4,5,6], [1,2,3]]
        while (myLength > 0) {
            tempNums.push(arrayOfNums.splice(-3, 3));
            myLength = (myLength - 3);
        }
        let tempNumlength = tempNums.length;  
        //okay let's look at each chunk one by one    
        for(let i=0; i<tempNumlength; i++) {
            //reverse it, because that way you know the relevant teen digit is always array[1]
            let miniArray = tempNums[i].reverse();
            //check if the middle digit is a 1, in which case it's a "teen" number
            if ((miniArray[1] === 1)) {
                    let teenNum = (miniArray[1]).toString() + (miniArray[0]).toString();
                    if (i === 0) {
                        spelledNums.push(this.underTwenty(+teenNum));
                    } else {
                        spelledNums.push(this.underTwenty(+teenNum) + this._powers[i+1]);
                    }    
                    //push an empty element for every place
                     spelledNums.push(' ');
                     //now push the hundreds digit, if it's not undefined or 0
                     if (miniArray[2]) {
                         spelledNums.push(this.singleDigit(miniArray[2]) + ' hundred and');
                     }
                     else {
                     spelledNums.push(' ');
                 }
            }
            // if it's not a 1 then
            else { 
                if (miniArray[0] >= 0){
                    if (i === 0) {
                        spelledNums.push(this.underTwenty(miniArray[0]));
                    } else {
                        spelledNums.push(this.underTwenty(miniArray[0]) + this._powers[i+1]);
                    }
                }
                if ((miniArray[1]) !== undefined){
                    spelledNums.push(this.underHundred(miniArray[1]));
                } 
                else {
                    spelledNums.push(' ');
                } 
                if (miniArray[2]){
                    spelledNums.push(this.singleDigit(miniArray[2]) + ' hundred and');       
                }
                else {
                    spelledNums.push(' ');
                }
            }
        }
        //put things back in the right order
        spelledArray = spelledNums.reverse();
        return(spelledArray);

    }

    //take the spellItOut array, and clean up extraneous elements
    phrasify(myNumber) {    
        function isNotEmpty(element) {
          return element !== " ";
        }
        let arrayNum = [];
        arrayNum = myNumber;
        //make sure it's not empty
        let phrasifiedNums = arrayNum.filter(isNotEmpty);
        // turn it into one string
        let numPhrase = phrasifiedNums.join(" ");
        //take out spaces
        let noSpaces = numPhrase.replace(/  /, " ");
        //clean up hyphens
        let fixHyphens = noSpaces.replace(/- /gi, "-");
        //remove unnecessary terminal hyphens
        let fixTerminalHyphens = fixHyphens.replace(/- /gi, " ");
        //take out unnecessary ands
        let extraneousAnds = fixTerminalHyphens.replace(/and$/, "");
        // returning new letiable just in case I think of anything else to clean
        let finalPhrase = extraneousAnds;
        return finalPhrase;
    }

    // let's treat zero as a special case
    checkZero(number) {
        let newNumber = parseInt(number, 10);
        if (newNumber === 0) {
            //returning array here 
            return ['zero']; 
        }
        else {
            //returning the original number 
            //remember that parseInt won't work nicely on numbers >9007199254740992, so return original number here
            return number;
        }
    }

    // let's check for negative numbers
    checkNegative(number) {
        let negExpr = /^-/;
        if (negExpr.test(number)) {
            //returning array here 
            return('negative '); 
        }
        else {
            return('');
        }
    }

    finalFunction(number) {
        //clean input
        let cleanNumber = this.checkTypeAndLength(number);
        if (cleanNumber instanceof Error) {
            return (cleanNumber);
        }
        //check for negative case
        let negative = this.checkNegative(number);
        //check for zero special case
        if (this.checkZero(cleanNumber) == 'zero') {
            return ('zero');
        } else {
            //get the non-zero output of cleanNumber
            let noZeros = this.checkZero(cleanNumber);
            console.log(noZeros);
            //get the array of number words
            let wordArray = this.spellItOut(noZeros);
            console.log(wordArray);
            //make it into a pretty phrase
            let phrasedResult = this.phrasify(wordArray);
            // add the output of the negative check above
            let finalOutput = negative + phrasedResult;
            //return it
            return (finalOutput);
        }
        
    }

}

export default DigitsToWord;