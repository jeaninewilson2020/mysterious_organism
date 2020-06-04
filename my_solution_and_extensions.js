// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand;
  }
  
  const pAequorFactory = (specimenNum, dna = mockUpStrand()) => {
    return {
     specimenNum,
     dna,
     
     // Function that randomly changes one element in the array
     mutate() {
  
      // Select a random base in the dna array
      let selectElement = returnRandBase();
    
    // Get the index of that random base
    let index = array.indexOf(selectElement);
  
    // Change the current base to a different one, checking first that it's different from the current one 
  
    if (selectElement === 'A') {
      this.dna.splice(selectElement, 0, 'T');
    } else if (selectElement === 'T') {
      this.dna.splice(selectElement, 0, 'A');
    } else if (selectElement === 'G') {
      this.dna.splice(selectElement, 0, 'C');
    } else {
      this.dna.splice(selectElement, 0, 'G');
    }
    // Return the object's mutated dna 
  
  return this.dna;
     },  
  
  // Compare the DNA sequences of the current pAequor to a different P.aequor
  // Computes how many bases are identical and in the same location 
  compareDna(pAequor) {
    let DNA1 = this.dna;
    let DNA2 = pAequor.dna;
    let match = [];
    // For every index in the dna array, check if it's position and element matches with the other array and if so add 1 to the match array
    for (let i in this.dna) {
      (DNA1[i] == DNA2[i]) ? match[i] = 1 : match[i] = 0;
    };
  // Calculate the percentage of how much dna matches by using reduce on the match array and converting to a percentage
    let percentage = (match.reduce((a, c) => a + c, 0)) / 15*100;
    return percentage.toFixed(2);
//    console.log(`Specimen #${this.specimenNum} and Specimen #${pAequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common`);
  },
    
      willLikelySurvive() {
        //Check every element of the dna array and add any C 
        //or G elements to a new array
        let cGBases = [];
        for (let i= 0; i < this.dna.length; i++) {
          if (this.dna[i] === 'C' || this.dna[i] === 'G') {
            cGBases.push([i]);
          } 
        }
        if (cGBases.length > 8) {
          return true;
        } else {
          return false;
        }
     /* 60% of 15 is 9
     If the array.length is > 8 return true (since arrays start counting at 0)
     Otherwise return false 
     */
      },
    complementStrand(dna) {
    let strand2 = [];
    for (let i = 0; i < this.dna.length; i++) {
      if (this.dna[i] === 'T') {
        strand2.push('A');
      } else if (this.dna[i] === 'A') {
        strand2.push('T');
      } else if (this.dna[i] === 'C') {
        strand2.push('G');
      } else {
        strand2.push('C');
      }
    } console.log(strand2);
  }
     }
    };
  
  // Use the factory function to create 30 instances of pAequor
  let paequorArray = [];  
  
  // Specimen Number Counter
  let specimenNumCounter = 1;
  // Create 30 instances of pAequor
  while (paequorArray.length < 30) {
  let newPaequor = pAequorFactory(specimenNumCounter);
  // Call the willSurvive method and if it returns true, add it to the array 
  if (newPaequor.willLikelySurvive()) {
     paequorArray.push(newPaequor);
  }
  // Increment the specimen number counter
    specimenNumCounter++;
  };
  //console.log(paequorArray);
  
  // Create two sample objects
  const orgOne = pAequorFactory('one');
 
  const orgTwo = pAequorFactory('two');
 
// Compare the DNA of those two objects
 orgOne.compareDna(orgTwo);
// Create a complementary strand for the two samples
orgOne.complementStrand();
orgTwo.complementStrand();
  
// Find the two most closely related strands in the array
let highestPercent = 0;
// Use reduce on our array of 30 paequors
let closestMatch = paequorArray.reduce((match, currentValue) => {
// For every index in the array 
  for (let i in paequorArray){
// Call compareDna on the current value (an index of paequor) and compare to another index in the array
    let comparingValue = currentValue.compareDna(paequorArray[i]);
// If compareDna yields a higher percent than the current highest percent, set that as the new value to compare to
      if(highestPercent < comparingValue) {
        highestPercent = comparingValue;
// Object with the numbers of the highest related strand and their match in percent
        match = {
          specimen1 : currentValue.specimenNum,
          specimen2 : paequorArray[i].specimenNum,
          matchInPercent : highestPercent
        }
      }
// Return the match object / accumulator
  } return match;
}, [])
console.log(closestMatch);
  
  