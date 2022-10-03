console.log("hello world")

const baseUrl = "http://127.0.0.1:5000"

        fetch(`${baseUrl}/assets)`)
        .then(res => res.json())
        .then(res => console.log(res))
        .then(res => {
            let booksHolder = document.getElementById("book-holder")
            const books = res

            books.forEach(book => {
            var row = `<tr>
            <th scope="row">${book.id}</th>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <a target="_blank" class="btn btn-primary btn-sm px-4" href=${baseUrl + book.link} onclick="GetBook1()">View</a>
            </td>
            </tr>`

            booksHolder.innerHTML += row
            });

        })