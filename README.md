
### TypeScript Beginner's Challenge:
# OpenLibrary

---

In this challenge you will work on building a Book Request Interface with Typescript.
The final result allows users to find and request books from a library of titles.

You will practice:
- Implementing Types for error checking
- Working with an external API to fetch data
- DOM Manipulation to add and remove items from the screen

# Get Started

## Clone the Remote Repo to your local system

Create a `challenges` folder on your local system to use as your dev environment

```bash
mkdir challenges
```

Navigate inside the folder and clone the remote repo to get the boilerplate for this challenge

``` bash
git clone -b challenge-1 --single-branch https://github.com/ayushsaranGithuB/typescript-challenges.git ./challenge-1
```

This will create a new directory called `challenge-1` with the code for this exercise

## 2. Install necessary dependencies using npm

Navigate inside the new `challenge-1` folder

```bash
cd ./challenge-1
```

Install the necessary dependencies using `npm`

```bash
npm install
```

## 3. Launch the exercise

Run the 'dev' command to launch the exercise

```bash
npm run dev
```


## 4. Check out the Demo and Read the Requirements

Open the `requirements.html` in your browser to see a demo of the interface and see the exercise requirements.

---

### Exercise Requirements:

### 1.  Search
Users should be able to search for a book by its title, ISBN or author.

> **Fetch results from the OpenLibrary API available here: **
> 
> To Search Books: 
> https://openlibrary.org/dev/docs/api/search
> To Get Cover Images: 
> https://openlibrary.org/dev/docs/api/covers
> 

### 2. Loading State
When performing a search the input field and button should enter a disabled loading state. Use the boolean 'aria-busy' attribute to show the loading state.

### 3. Results
Results should be shown in a list of books.

### 4. Book Details:
Books should show the cover, title, isbn, author, publisher, date of publication and no of pages.

### 5. Missing Info:
Some results from the API may have certain fields missing, remember to watch out for those and set smart default states for optional fields.

### 6. Add to Cart:
Books can be added to a cart. When a book is added the 'Add to Cart' button is disabled. When a book is removed from the cart it is enabled again.

### 7. Cart States
The Cart Starts Empty. With **'_Request Books_'** and **'_Clear Cart_'** actions _disabled_.

### 8. Cart Shows Added Books
When a book is added, it should show in the cart.
Cart Actions are then enabled.

### 9. Cart Icon
The count should always show the correct number of items in the cart.

### 10. Request Books
Users should be able to request books from the library. This shows a modal confirming the books they have requested, it also empties the cart. 

> This final step only has to show the modal and the list of books, you don't need to connect it to a back-end or send the request out.

## **That's All!** 

- Remember **Not** to edit the `requirements.html` file with the tour.
- Instead **Start from the clean `index.html`** included in the repo. 
- You can refresh the `requirements.html` page to restart the tour and look at all the features again.