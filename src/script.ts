const form = document.getElementById("search-form") as HTMLFormElement;
const cart = document.querySelector("#cart .cart-items") as HTMLUListElement;

window.onload = () => {
    form.onsubmit = handleForm;
};

interface Book {
    key: string;
    title: string;
    publisher?: string[];
    author_name?: string;
    first_publish_year?: number;
    isbn?: string[];
    cover_i?: string;
    number_of_pages_median?: number;
}

async function handleForm(e: Event): Promise<void> {
    e.preventDefault();

    const searchField = form.querySelector("input[name='search']") as HTMLInputElement;
    const searchTerm = searchField.value.trim();

    if (searchTerm.length > 0) {
        toggleLoadingState(true);

        try {
            const books = await fetchBooks(searchTerm);
            displayBooks(books);
        } catch (error) {
            showError("Failed to fetch books. Please try again.");
        } finally {
            toggleLoadingState(false);
        }
    }
}

async function fetchBooks(searchTerm: string): Promise<Book[]> {
    const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.docs as Book[];
}

function toggleLoadingState(isLoading: boolean) {
    const submitButton = form.querySelector("button[type='submit']") as HTMLButtonElement;
    const results = document.getElementById("results") as HTMLElement;
    const searchField = form.querySelector("input[name='search']") as HTMLInputElement;

    searchField.disabled = isLoading;
    submitButton.disabled = isLoading;
    submitButton.setAttribute("aria-busy", isLoading.toString());
    submitButton.innerHTML = isLoading ? "Loading..." : "Search";
    results.setAttribute("aria-busy", isLoading.toString());
}

function displayBooks(books: Book[]) {
    const results = document.getElementById("results") as HTMLElement;
    results.innerHTML = "";
    if (books.length === 0) {
        results.innerHTML = "No results found.";
        return;
    }

    books.forEach((book) => {
        const bookElement = createBookElement(book, 'results');
        results.appendChild(bookElement);
    });
}

function createBookElement(book: Book, location: 'results' | 'cart'): HTMLElement {

    const bookElement = location === 'cart' ? document.createElement("li") : document.createElement("article");
    bookElement.className = location === 'cart' ? "item" : "book";



    const coverBox = document.createElement("div");
    coverBox.className = "cover";

    const image = document.createElement("img");
    image.src = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "/public/no-image.svg";
    image.alt = book.title;
    coverBox.appendChild(image);
    bookElement.appendChild(coverBox);

    const info = document.createElement("div");
    info.className = "info";

    const title = location === 'cart' ? document.createElement("p") : document.createElement("h3");
    title.className = "title";
    title.innerHTML = `<a href="https://openlibrary.org${book.key}">${book.title}</a>`;
    info.appendChild(title);

    const author = document.createElement("p");
    author.className = "author";
    author.innerHTML = book.author_name ? `- ${book.author_name}` : "- Unknown Author";
    info.appendChild(author);

    if (location === 'results') {
        const isbn = document.createElement("p");
        isbn.className = "isbn";
        isbn.innerHTML = `ISBN: ${book.isbn?.[0] || "N/A"}`;
        info.appendChild(isbn);

        const meta = document.createElement("p");
        meta.className = "meta";
        meta.innerText = `${book.publisher?.[0] || ""}, ${book.first_publish_year || ""}, ${book.number_of_pages_median ? book.number_of_pages_median + " pages" : ""}`;
        info.appendChild(meta);

        const button = document.createElement("button");
        button.innerHTML = "Add to Cart";
        button.setAttribute("data-book-id", book.key);
        button.addEventListener("click", () => addToCart(book, button));
        info.appendChild(button);
    } else {
        // cart
        const remove = document.createElement("button");
        remove.className = "remove";
        remove.innerHTML = "Remove";
        remove.addEventListener("click", () => {
            bookElement.remove();
            const addToCartButton = document.querySelector(`#results button[data-book-id="${book.key}"]`) as HTMLButtonElement;
            if (addToCartButton) {
                addToCartButton.disabled = false;
                addToCartButton.innerHTML = "Add to Cart";
            }
            countCartItems();
        });
        info.appendChild(remove);
    }

    bookElement.appendChild(info);

    return bookElement;
}


function addToCart(book: Book, button: HTMLButtonElement) {
    const cart = document.querySelector("#cart .cart-items") as HTMLUListElement;

    const item = createBookElement(book, 'cart'); // Create a cart item without ISBN and meta

    cart?.appendChild(item);

    button.disabled = true;
    button.innerHTML = "Added...";

    const empty = document.querySelector(".empty") as HTMLLIElement;
    if (empty) empty.remove();

    const buttons = document.querySelectorAll("#cart button") as NodeListOf<HTMLButtonElement>;
    buttons.forEach((btn) => (btn.disabled = false));

    countCartItems();
}


function countCartItems() {
    const cartCount = document.querySelector("label#cart-icon");
    if (cartCount) {
        const items = document.querySelectorAll("#cart li.item");
        cartCount.setAttribute("data-count", items.length.toString());
    }
}

function clearCart() {
    const cart = document.querySelector("#cart .cart-items") as HTMLUListElement;
    if (cart) {
        cart.innerHTML = "<li class='empty'>Your Cart is Empty!</li>";

        const buttons = document.querySelectorAll("#cart button") as NodeListOf<HTMLButtonElement>;
        buttons.forEach((button) => (button.disabled = true));

        const addToCartButtons = document.querySelectorAll("#results button") as NodeListOf<HTMLButtonElement>;
        addToCartButtons.forEach((button) => {
            button.disabled = false;
            button.innerHTML = "Add to Cart";
        });

        countCartItems();
    } else {
        showError("Cart not found.");
    }
}

function showError(message: string) {
    const results = document.getElementById("results") as HTMLElement;
    results.innerHTML = `<p class="error">${message}</p>`;
    console.error(message);
}

// REQUEST MODAL
const dialog = document.querySelector("dialog#request-modal") as HTMLDialogElement;
const showButton = document.querySelector("button#request-books") as HTMLButtonElement;
const closeButton = document.querySelector("button#close-request") as HTMLButtonElement;

showButton.addEventListener("click", () => {
    dialog.showModal();
    const cart = document.querySelector("#cart .cart-items") as HTMLUListElement;
    const requestModal = document.querySelector("#request-modal ul") as HTMLUListElement;
    requestModal.innerHTML = cart.innerHTML;
    clearCart();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});
