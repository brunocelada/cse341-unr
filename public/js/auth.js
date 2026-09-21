async function checkAuthentication() {
    try {
        const loginButton = document.querySelector("#login");
        const logoutButton = document.querySelector("#logout");
        const userInfo = document.querySelector("#user-info");

        const response = await fetch("/auth/status");
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();

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

        loginButton.style.display = "inline";
        logoutButton.style.display = "none";
        userInfo.textContent = "";
    }
}

document.addEventListener("DOMContentLoaded", checkAuthentication);