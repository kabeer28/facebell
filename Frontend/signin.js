document.addEventListener("DOMContentLoaded", function() {
    var loginPopup = document.querySelector(".popup");
    document.querySelector("#show-login").addEventListener("click", function() {
        if (loginPopup.classList.contains("active")) {
            loginPopup.classList.remove("active");
        } else {
            loginPopup.classList.add("active");
        }
    });
    
    document.querySelector(".popup .close-btn").addEventListener("click", function() {
        loginPopup.classList.remove("active");
    });
});
