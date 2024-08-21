"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var form = document.getElementById("search-form");
var cart = document.querySelector("#cart .cart-items");
window.onload = function () {
    form.onsubmit = handleForm;
};
function handleForm(e) {
    return __awaiter(this, void 0, void 0, function () {
        var searchField, searchTerm, books, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    searchField = form.querySelector("input[name='search']");
                    searchTerm = searchField.value.trim();
                    if (!(searchTerm.length > 0)) return [3 /*break*/, 5];
                    toggleLoadingState(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetchBooks(searchTerm)];
                case 2:
                    books = _a.sent();
                    displayBooks(books);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    showError("Failed to fetch books. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    toggleLoadingState(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function fetchBooks(searchTerm) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://openlibrary.org/search.json?q=".concat(searchTerm))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.docs];
            }
        });
    });
}
function toggleLoadingState(isLoading) {
    var submitButton = form.querySelector("button[type='submit']");
    var results = document.getElementById("results");
    var searchField = form.querySelector("input[name='search']");
    searchField.disabled = isLoading;
    submitButton.disabled = isLoading;
    submitButton.setAttribute("aria-busy", isLoading.toString());
    submitButton.innerHTML = isLoading ? "Loading..." : "Search";
    results.setAttribute("aria-busy", isLoading.toString());
}
function displayBooks(books) {
    var results = document.getElementById("results");
    results.innerHTML = "";
    if (books.length === 0) {
        results.innerHTML = "No results found.";
        return;
    }
    books.forEach(function (book) {
        var bookElement = createBookElement(book, 'results');
        results.appendChild(bookElement);
    });
}
function createBookElement(book, location) {
    var _a, _b;
    var bookElement = location === 'cart' ? document.createElement("li") : document.createElement("article");
    bookElement.className = location === 'cart' ? "item" : "book";
    var coverBox = document.createElement("div");
    coverBox.className = "cover";
    var image = document.createElement("img");
    image.src = book.cover_i ? "https://covers.openlibrary.org/b/id/".concat(book.cover_i, "-M.jpg") : "/public/no-image.svg";
    image.alt = book.title;
    coverBox.appendChild(image);
    bookElement.appendChild(coverBox);
    var info = document.createElement("div");
    info.className = "info";
    var title = location === 'cart' ? document.createElement("p") : document.createElement("h3");
    title.className = "title";
    title.innerHTML = "<a href=\"https://openlibrary.org".concat(book.key, "\">").concat(book.title, "</a>");
    info.appendChild(title);
    var author = document.createElement("p");
    author.className = "author";
    author.innerHTML = book.author_name ? "- ".concat(book.author_name) : "- Unknown Author";
    info.appendChild(author);
    if (location === 'results') {
        var isbn = document.createElement("p");
        isbn.className = "isbn";
        isbn.innerHTML = "ISBN: ".concat(((_a = book.isbn) === null || _a === void 0 ? void 0 : _a[0]) || "N/A");
        info.appendChild(isbn);
        var meta = document.createElement("p");
        meta.className = "meta";
        meta.innerText = "".concat(((_b = book.publisher) === null || _b === void 0 ? void 0 : _b[0]) || "", ", ").concat(book.first_publish_year || "", ", ").concat(book.number_of_pages_median ? book.number_of_pages_median + " pages" : "");
        info.appendChild(meta);
        var button_1 = document.createElement("button");
        button_1.innerHTML = "Add to Cart";
        button_1.setAttribute("data-book-id", book.key);
        button_1.addEventListener("click", function () { return addToCart(book, button_1); });
        info.appendChild(button_1);
    }
    else {
        // cart
        var remove = document.createElement("button");
        remove.className = "remove";
        remove.innerHTML = "Remove";
        remove.addEventListener("click", function () {
            bookElement.remove();
            var addToCartButton = document.querySelector("#results button[data-book-id=\"".concat(book.key, "\"]"));
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
function addToCart(book, button) {
    var cart = document.querySelector("#cart .cart-items");
    var item = createBookElement(book, 'cart'); // Create a cart item without ISBN and meta
    cart === null || cart === void 0 ? void 0 : cart.appendChild(item);
    button.disabled = true;
    button.innerHTML = "Added...";
    var empty = document.querySelector(".empty");
    if (empty)
        empty.remove();
    var buttons = document.querySelectorAll("#cart button");
    buttons.forEach(function (btn) { return (btn.disabled = false); });
    countCartItems();
}
function countCartItems() {
    var cartCount = document.querySelector("label#cart-icon");
    if (cartCount) {
        var items = document.querySelectorAll("#cart li.item");
        cartCount.setAttribute("data-count", items.length.toString());
    }
}
function clearCart() {
    var cart = document.querySelector("#cart .cart-items");
    if (cart) {
        cart.innerHTML = "<li class='empty'>Your Cart is Empty!</li>";
        var buttons = document.querySelectorAll("#cart button");
        buttons.forEach(function (button) { return (button.disabled = true); });
        var addToCartButtons = document.querySelectorAll("#results button");
        addToCartButtons.forEach(function (button) {
            button.disabled = false;
            button.innerHTML = "Add to Cart";
        });
        countCartItems();
    }
    else {
        showError("Cart not found.");
    }
}
function showError(message) {
    var results = document.getElementById("results");
    results.innerHTML = "<p class=\"error\">".concat(message, "</p>");
    console.error(message);
}
// REQUEST MODAL
var dialog = document.querySelector("dialog#request-modal");
var showButton = document.querySelector("button#request-books");
var closeButton = document.querySelector("button#close-request");
showButton.addEventListener("click", function () {
    dialog.showModal();
    var cart = document.querySelector("#cart .cart-items");
    var requestModal = document.querySelector("#request-modal ul");
    requestModal.innerHTML = cart.innerHTML;
    clearCart();
});
closeButton.addEventListener("click", function () {
    dialog.close();
});
