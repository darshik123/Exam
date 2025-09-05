



// Q.1 WAP to check array is palindrome or not using JavaScript (only with Numbers)

// function Palindrom(arr) {
//     let left = 0;                      
//     let right = arr.length - 1;        

//     while (left < right) {
//         if (arr[left] !== arr[right]) {
//             return false;             
//         }
//         left++;                        
//         right--;                       
//     }

//     return true;                      
// }

// let arr1 = [1, 2, 3, 2, 1];
// let arr2 = [1, 2, 3, 4, 5];

// console.log("arr1 is palindrome?", Palindrom(arr1)); 
// console.log("arr2 is palindrome?", Palindrom(arr2)); 

// OUTPUT
// true
// false







// 2.WAP to Merge two array in single Array using JavaScript.



// let array1 = [1, 2, 3];
// let array2 = [4, 5, 6];
// let mergedArray = [...array1, ...array2];
// console.log("MARGE ARRAY:",mergedArray)

//OUTPUT
// MARGE ARRAY: [ 1, 2, 3, 4, 5, 6 ]






// Q.3 WAP to implements Quick Sort using JavaScript.

// function quickSort(arr) {
//     if (arr.length <= 1) {
//         return arr;
//     }

//     let pivot = arr[0];
//     let left = [];
//     let right = [];

//     for (let i = 1; i < arr.length; i++) {  
//         if (arr[i] < pivot) {
//             left.push(arr[i]);
//         } else {
//             right.push(arr[i]);
//         }
//     }

//     return [...quickSort(left), pivot, ...quickSort(right)];
// }

// let arr = [20, 15, 9, 30, 12, 8, 4, 25];
// console.log("Sorted Array:", quickSort(arr));


//OUTPUT

// Sorted Array: [4,8,9,12,15,20,25,30]








// Q.4 WAP to implements Create singly Linked list, adding a new Elements, and Delete node from singly linked list (Without any pre-defined function) 

// class node {
//   constructor(data) {
//     this.data = data;
//     this.next = null;
//   }
// }

// class siglyLink {
//   constructor() {
//     this.head = null;
//   }

//   // ADD DATA IN END
//   addataend(val) {
//     let temp = new node(val);

//     if (this.head == null) {
//       this.head = temp;
//       return;
//     } else {
//       let current = this.head;
//       while (current.next != null) {
//         current = current.next;
//       }
//       current.next = temp;
//     }
//   }

//   // DELETE DATA IN END
//   deleteDataEnd() {
//     let current = this.head;
//     let preview;
//     if (current.next == null) {
//       this.head = null;
//     } else {
//       while (current.next) {
//         preview = current;
//         current = current.next;
//       }
//       preview.next = null;
//     }
//   }

//   // ADD DATA IN FIRST

//   addataFirst(val) {
//     let temp = new node(val);
//     if (this.head == null) {
//       this.head = temp;
//     } else {
//       temp.next = this.head;
//       this.head = temp;
//     }
//   }

//   // DELETE DATA IN FIRST

//   deleteDataFirst() {
//     if (this.head != null) {
//       let currrnt = this.head;
//       this.head = currrnt.next;
//     }
//   }

//   // ADD DATA IN MIDDAL

//   addatamid(position, val) {
//     if (this.head == null) {
//       alert("List Is Empty");
//     } else if (this.head.data == position) {
//       this.addataFirst(val);
//     } else {
//       let temp = new node(val);
//       let currnt = this.head;
//       let preview;
//       while (currnt.data !== position && currnt.next !== null) {
//         preview = currnt;
//         currnt = currnt.next;
//       }

//       if (currnt.data == position) {
//         temp.next = currnt;
//         preview.next = temp;
//       } else {
//         console.log(`${position} Not Exist In List`);
//       }
//     }
//   }

//   // DELETE IN MEDDAL

//   deleteDataMid(position) {
//     if (this.head == null) {
//       alert("List Is Empty");
//     } else if (this.head.data == position) {
//       this.deleteDataFirst();
//     } else {
//       let currnt = this.head;
//       let preview;
//       while (currnt.data !== position && currnt.next !== null) {
//         preview = currnt;
//         currnt = currnt.next;
//       }

//       if (currnt.data == position) {
//         preview.next = currnt.next;
//       } else {
//         alert(`${position} Not Exist In List`);
//       }
//     }
//   }

 
 
//   displayData() {
//     if (this.head == null) {
//       console.log("List Is Empty");
//     } else {
//       let current = this.head;
//       while (current) {
//         console.log(current.data);
//         current = current.next;
//       }
//     }
//   }
// }

// let Singly = new siglyLink();

// Singly.addataend(10);
// Singly.addataend(20);
// Singly.deleteDataEnd()

// Singly.addataFirst(9)
// Singly.addataFirst(8)
// Singly.addataFirst(7)
// Singly.addataFirst(6)
// Singly.deleteDataFirst()

// Singly.addatamid(7,6)
// Singly.deleteDataMid(10)




// Singly.displayData()


// OUTPUT
// 6
// 7
// 8
// 9










// Q.5 WAP to implement insert and remove element from Queue using JavaScript.

// class Queue {
//     constructor(){
//         this.q = []
//     }

//     Insert(value){
//    this.q.push(value)
//     } 

//     remove(){
//         if(this.q.length<1){
//             console.log("Queue Is Empty")
//         }else{
//        console.log("Deleted value is",this.q.shift())
//         }
//     }

//     Display (){
//     if(this.q.length>0){

//         console.log(this.q)
//     }else{
//         console.log("No Data Found")
//     }
//     }
// }

// let QueueDdata = new Queue()
// QueueDdata.Insert(10)
// QueueDdata.Insert(20)
// QueueDdata.Insert(30)
// QueueDdata.Insert(40)
// QueueDdata.Insert(50)
// QueueDdata.remove()
// QueueDdata.remove()
// QueueDdata.Display()

// OUTPUT
// Deleted value is 10
// Deleted value is 20
// [ 30, 40, 50 ]