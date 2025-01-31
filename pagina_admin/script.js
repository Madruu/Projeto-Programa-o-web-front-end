document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const searchInput = document.getElementById("search");
    const clearAllBtn = document.getElementById("clearAll");
    const clearFormBtn = document.getElementById("clearForm");
    
    function loadUsers() {
        userList.innerHTML = "";
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.forEach((user, index) => {
            const li = document.createElement("li");
            li.textContent = `${user.date} - ${user.name} (${user.email})`;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Excluir";
            deleteBtn.onclick = () => {
                users.splice(index, 1);
                localStorage.setItem("users", JSON.stringify(users));
                loadUsers();
            };
            li.appendChild(deleteBtn);
            userList.appendChild(li);
        });
    }
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ name, email, date: new Date().toLocaleString() });
        localStorage.setItem("users", JSON.stringify(users));
        form.reset();
        loadUsers();
    });
    
    clearFormBtn.addEventListener("click", () => form.reset());
    
    clearAllBtn.addEventListener("click", () => {
        localStorage.removeItem("users");
        loadUsers();
    });
    
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        Array.from(userList.children).forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(searchTerm) ? "" : "none";
        });
    });
    
    loadUsers();
});