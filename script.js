let blogs = [];

// Get the modal element
let modal = document.getElementById("modal");

// Get the button that opens the modal
let createBtn = document.querySelector("button");

// Get the <span> element that closes the modal
let closeBtn = document.querySelector(".close");

// Get the blog form
let blogForm = document.getElementById("blog-form");

// Get the blog list
let blogList = document.getElementById("blog-list");

// When the user clicks the button, open the modal
function showModal() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function hideModal() {
    modal.style.display = "none";
    clearBlogForm();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        hideModal();
    }
};


// Clear the blog form
function clearBlogForm() {
    blogForm.reset();
}

// Add a blog post to the top of the blog list
function addBlogPost(blogPost) {
    let blogDiv = document.createElement("div");
    blogDiv.classList.add("blog-post");
    blogDiv.setAttribute("data-id", blogPost.id);

    let titleElem = document.createElement("h2");
    titleElem.innerText = blogPost.title;

    let descriptionElem = document.createElement("p");
    descriptionElem.innerText = blogPost.description;

    let timestampElem = document.createElement("small");
    timestampElem.innerText = blogPost.timestamp.toLocaleString();

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", function () {
        editBlogPost(blogPost.id);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", function () {
        deleteBlogPost(blogPost.id);
    });

    blogDiv.appendChild(titleElem);
    blogDiv.appendChild(descriptionElem);
    blogDiv.appendChild(timestampElem);
    blogDiv.appendChild(editBtn);
    blogDiv.appendChild(deleteBtn);

    let firstBlogPost = blogList.firstChild;
    if (firstBlogPost) {
        blogList.insertBefore(blogDiv, firstBlogPost);
    } else {
        blogList.appendChild(blogDiv);
    }
}

// Update a blog post in the blog list
function updateBlogPost(blogPost) {
    let blogDiv = document.querySelector(`.blog-post[data-id="${blogPost.id}"]`);

    if (blogDiv) {
        let titleElem = blogDiv.querySelector("h2");
        let descriptionElem = blogDiv.querySelector("p");
        let timestampElem = blogDiv.querySelector("small");

        titleElem.innerText = blogPost.title;
        descriptionElem.innerText = blogPost.description;
        timestampElem.innerText = blogPost.timestamp.toLocaleString();
    }
}

// Delete a blog post from the blog list
function deleteBlogPost(blogPostId) {
    blogs = blogs.filter(blogPost => blogPost.id !== blogPostId);

    let blogDiv = document.querySelector(`.blog-post[data-id="${blogPostId}"]`);

    if (blogDiv) {
        blogDiv.remove();
    }
}

// Edit a blog post in the blog form
function editBlogPost(id) {
    let blogPost = blogs.find(function (blogPost) {
        return blogPost.id === id;
    });

    if (blogPost) {
        blogForm.title.value = blogPost.title;
        blogForm.description.value = blogPost.description;
        blogForm.dataset.editId = blogPost.id;
        showModal();
    }
}

// Submit the blog form
blogForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let title = event.target.elements["title"].value.trim();
    let description = event.target.elements["description"].value.trim();

    if (title === "" || description === "") {
        alert("Title and description are required.");
        return;
    }

    let editId = blogForm.dataset.editId;

    if (editId) {
        let blogPost = blogs.find(blogPost => blogPost.id == editId);
        blogPost.title = title;
        blogPost.description = description;
        blogPost.timestamp = new Date();
        updateBlogPost(blogPost);
    } else {
        let blogPost = {
            id: Date.now(),
            title: title,
            description: description,
            timestamp: new Date()
        };
        blogs.push(blogPost);
        addBlogPost(blogPost);
    }

    hideModal();
});


// Initialize the blog list
function initBlogList() {
    blogList.innerHTML = "";

    blogs.forEach(blogPost => {
        addBlogPost(blogPost);
    });
}

// Initialize the app
function init() {
    createBtn.addEventListener("click", showModal);
    closeBtn.addEventListener("click", hideModal);
    initBlogList();
}

init();