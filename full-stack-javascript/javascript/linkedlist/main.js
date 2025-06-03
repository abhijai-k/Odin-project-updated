import { LinkedList } from './LinkedList.js';

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString()); 
list.prepend("lion");
console.log("After prepend:", list.toString());

console.log("Size:", list.size());
console.log("Head:", list.head().value);
console.log("Tail:", list.tail().value);
console.log("At index 3:", list.at(3)?.value);
console.log("Contains 'cat':", list.contains("cat"));
console.log("Find 'hamster':", list.find("hamster"));

list.pop();
console.log("After pop:", list.toString());

list.insertAt("monkey", 2);
console.log("After insertAt index 2:", list.toString());

list.removeAt(3);
console.log("After removeAt index 3:", list.toString());
