// Book Constructor
function Book(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}

//UI Constructor
function UI(){}

//Validation 
UI.prototype.showAlert=function(message,className){
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

// Adding Books to the list
UI.prototype.addBook=function(book){
 const bookList=document.getElementById('book-list'),
       row=document.createElement('tr');

       row.innerHTML=`<td> ${book.title} </td>
                      <td> ${book.author} </td>
                      <td> ${book.isbn} </td>
                      <td><a href='#' class='delete'>X</a></td>       
       `;

       bookList.appendChild(row);

}

//Deleting Books
UI.prototype.delBook=function(target){
  if(target.className ==='delete'){
      target.parentElement.parentElement.remove();
  }
}

//Clearing Feilds
UI.prototype.clearFields=function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';  
}

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
ui.showAlert('Book Deleted','success');
e.preventDefault();
}
)

