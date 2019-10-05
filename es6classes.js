// Book class
class Book{
    constructor(title,author,isbn){
        this.title=title,
        this.author=author,
        this.isbn=isbn
    }
}

//class for UI
class UI{
    addBook(book){
        const bookList=document.getElementById('book-list'),
        row=document.createElement('tr');
 
        row.innerHTML=`<td> ${book.title} </td>
                       <td> ${book.author} </td>
                       <td> ${book.isbn} </td>
                       <td><a href='#' class='delete'>X</a></td>       
        `;
 
        bookList.appendChild(row);
    }
    delBook(target){
        if(target.className ==='delete'){
            target.parentElement.parentElement.remove();
            
        }
    }
    showAlert(message,className){
        const container=document.querySelector('.container'),
        form=document.getElementById('book-form'),
        div=document.createElement('div');
        div.className=`alert ${className}`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div,form);
     setTimeout(function(){
      document.querySelector('.alert').remove();    
      },3000)
    }
    clearFields(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value=''; 
    }
}
//class for Ls
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBookToLS(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static displayBooks(){
       const books=Store.getBooks();
       books.forEach(function(book){
           const ui=new UI();
           ui.addBook(book);
       })
    }

    static removeBooks(isbn){
  
       const books= Store.getBooks();
       books.forEach(function(book,index){
          console.log(book.isbn,isbn);
          if(book.isbn === isbn){
            console.log(isbn);
              books.splice(index,1);
              
          }
        
       });
       localStorage.setItem('books',JSON.stringify(books));
    }
}
//Event Listener for Displaying Books
document.addEventListener('DOMContentLoaded',Store.displayBooks);
//Event listener for adding book
document.getElementById('book-form').addEventListener('submit',
function(e){
    //Get values from form
const title=document.getElementById('title').value,
      author=document.getElementById('author').value,
      isbn=document.getElementById('isbn').value;

//Instantiating book
const book=new Book(title,author,isbn);

//Instantiating UI

const ui= new UI();

//Validation
if(title===''|| author==='' || isbn===''){
  ui.showAlert('Please fill the fields','error');
  }
else{

//Adding Books
    ui.addBook(book);
  //Adding books to Local Storage
    Store.addBookToLS(book);
    ui.showAlert('Book Added','success');

//Clear Field
    ui.clearFields();

 }
    e.preventDefault();
 
}
)
//Event Listener for deleting book
document.getElementById('book-list').addEventListener('click',function(e){
 const ui= new UI();
 ui.delBook(e.target);
 
 // Remove book from LS
 Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
 ui.showAlert('Book Deleted','success');
 e.preventDefault();
}
)
