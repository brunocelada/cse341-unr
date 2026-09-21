async function checkAuthentication() {
    try {
        const response = await fetch("/auth/status");
        const data = await response.json();

        const loginButton = document.querySelector("#login");
        const logoutButton = document.querySelector("#logout");
        const userInfo = document.querySelector("#user-info");

        if (data.authenticated) {
            loginButton.style.display = "none";
            logoutButton.style.display = "inline";
            userInfo.textContent = `Logged in as ${data.user.displayName}`;
        } else {
            loginButton.style.display = "inline";
            logoutButton.style.display = "none";
            userInfo.textContent = "";
        }
    } catch (error) {
        console.error("Authentication error:", error);
    }
}

document.addEventListener("DOMContentLoaded", checkAuthentication);