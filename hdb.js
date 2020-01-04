const fs = require('fs')
const inputFile = process.argv[2];

const data = fs.readFileSync(inputFile, 'utf8').split('\n');
let arr = [];
data.forEach(line => {
	arr.push(line.split(''));
})

function countHdbClusters(arr){
	let counter = 0;
	let marked = arr.map(row=>{
		return row.map(element=>{
			return 0;
		})
	})

	for(let x = 0; x < arr.length; x++){
		for(let y = 0 ; y < arr[0].length; y++){
			if(arr[x][y] == '+' && !marked[x][y]){
				counter++;
				markHdbCluster(x,y,arr,marked);
			}
		}
	}
	return counter;
}


function markHdbCluster(x,y,arr,marked){
	// Base case 1: Out of bounds
	if(x < 0 || y < 0 || x > arr.length-1 || y > arr[0].length-1) return;
	// Base case 2: It is not a HDB
	if(arr[x][y] == '0') return;
	// Base case 3: This area has already been marked
	if(marked[x][y]) return;
	// Otherwise, mark this area
	marked[x][y] = 1;
	// Recurse to all adjacent squares
	markHdbCluster(x+1, y,   arr, marked);
	markHdbCluster(x-1, y,   arr, marked);
	markHdbCluster(x,   y+1, arr, marked);
	markHdbCluster(x,   y-1, arr, marked);
	markHdbCluster(x+1, y+1, arr, marked);
	markHdbCluster(x+1, y-1, arr, marked);
	markHdbCluster(x-1, y+1, arr, marked);
	markHdbCluster(x-1, y-1, arr, marked);
}


console.log(countHdbClusters(arr));
