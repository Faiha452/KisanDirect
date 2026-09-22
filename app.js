// /* =====================================
//    KISANDIRECT
//    JAVASCRIPT
// ===================================== */




let editingProductId= null;

/* =====================================
   AUTHENTICATION
===================================== */

/* =====================================
   KISANDIRECT AUTHENTICATION
===================================== */


let selectedLoginRole = "farmer";


/* =====================================
   MODAL
===================================== */

function openLogin() {

    document
        .getElementById("authOverlay")
        .classList.add("show");

    showLogin();

}


function openRegister() {

    document
        .getElementById("authOverlay")
        .classList.add("show");

    showAccountType();

}


function closeAuth() {

    document
        .getElementById("authOverlay")
        .classList.remove("show");

}


function hideAuthScreens() {

    document
        .querySelectorAll(".auth-screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

}


/* =====================================
   AUTH SCREENS
===================================== */

function showLogin() {

    hideAuthScreens();

    document
        .getElementById("loginScreen")
        .classList.add("active");

}


function showAccountType() {

    hideAuthScreens();

    document
        .getElementById("accountTypeScreen")
        .classList.add("active");

}


function showFarmerRegister() {

    hideAuthScreens();

    document
        .getElementById("farmerRegisterScreen")
        .classList.add("active");

}


function showBuyerRegister() {

    hideAuthScreens();

    document
        .getElementById("buyerRegisterScreen")
        .classList.add("active");

}


function showSuccess() {

    hideAuthScreens();

    document
        .getElementById("successScreen")
        .classList.add("active");

}


function showFarmerRegistration() {

    document
        .getElementById("authOverlay")
        .classList.add("show");

    showFarmerRegister();

}


/* =====================================
   SELECT LOGIN ROLE
===================================== */

function selectLoginRole(role, button) {

    selectedLoginRole = role;

    document
        .querySelectorAll(".role-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });

    button.classList.add("active");

}


/* =====================================
   FARMER REGISTRATION
===================================== */

function registerFarmer(event) {

    event.preventDefault();


    const farmer = {

        role: "farmer",

        name:
            document
                .getElementById("farmerName")
                .value.trim(),

        mobile:
            document
                .getElementById("farmerMobile")
                .value.trim(),

        village:
            document
                .getElementById("farmerVillage")
                .value.trim(),

        district:
            document
                .getElementById("farmerDistrict")
                .value.trim(),

        state:
            document
                .getElementById("farmerState")
                .value,

        crop:
            document
                .getElementById("farmerCrop")
                .value,

        password:
            document
                .getElementById("farmerPassword")
                .value

    };


    if (!validMobile(farmer.mobile)) {

        notify(
            "Please enter a valid 10-digit mobile number."
        );

        return;

    }


    if (accountExists(farmer.mobile)) {

        notify(
            "An account with this mobile number already exists."
        );

        return;

    }


    saveAccount(farmer);

    showSuccess();

}


/* =====================================
   BUYER REGISTRATION
===================================== */

function registerBuyer(event) {

    event.preventDefault();


    const buyer = {

        role: "buyer",

        name:
            document
                .getElementById("buyerName")
                .value.trim(),

        mobile:
            document
                .getElementById("buyerMobile")
                .value.trim(),

        buyerType:
            document
                .getElementById("buyerType")
                .value,

        location:
            document
                .getElementById("buyerLocation")
                .value.trim(),

        password:
            document
                .getElementById("buyerPassword")
                .value

    };


    if (!validMobile(buyer.mobile)) {

        notify(
            "Please enter a valid 10-digit mobile number."
        );

        return;

    }


    if (accountExists(buyer.mobile)) {

        notify(
            "An account with this mobile number already exists."
        );

        return;

    }


    saveAccount(buyer);

    showSuccess();

}


/* =====================================
   SAVE ACCOUNT
===================================== */

function saveAccount(account) {

    const accounts =
        JSON.parse(
            localStorage.getItem(
                "kisanDirectAccounts"
            )
        ) || [];


    accounts.push(account);


    localStorage.setItem(

        "kisanDirectAccounts",

        JSON.stringify(accounts)

    );

}


/* =====================================
   CHECK EXISTING ACCOUNT
===================================== */

function accountExists(mobile) {

    const accounts =
        JSON.parse(
            localStorage.getItem(
                "kisanDirectAccounts"
            )
        ) || [];


    return accounts.some(
        account =>
            account.mobile === mobile
    );

}


/* =====================================
   LOGIN
===================================== */

function loginUser(event) {

    event.preventDefault();

    const mobile =
        document.getElementById("loginMobile")
            .value.trim();

    const password =
        document.getElementById("loginPassword")
            .value;

    const accounts =
        JSON.parse(
            localStorage.getItem(
                "kisanDirectAccounts"
            )
        ) || [];

    const user = accounts.find(account =>
    String(account.mobile).trim() === mobile &&
    String(account.password) === password &&
    String(account.role).trim().toLowerCase() ===
        String(selectedLoginRole).trim().toLowerCase()
);


    /* ---------------------------------
       LOGIN FAILED
    --------------------------------- */

    if (!user) {

        notify(
            "Incorrect mobile number, password or account type."
        );

        return;

    }


    /* ---------------------------------
       SAVE CURRENT USER
    --------------------------------- */

    sessionStorage.setItem(

        "kisanDirectCurrentUser",

        JSON.stringify(user)

    );


    /* ---------------------------------
       CLOSE LOGIN
    --------------------------------- */

    closeAuth();


    /* ---------------------------------
       UPDATE NAVBAR
    --------------------------------- */

    updateNavbar(user);


    /* ---------------------------------
       OPEN CORRECT DASHBOARD
    --------------------------------- */

    openUserDashboard(user);


    notify(
        "Welcome, " +
        user.name +
        "! 🌾"
    );

}

/* =====================================
   OPEN USER DASHBOARD
===================================== */

// function openUserDashboard(user) {

//     /* Hide public navBar */
//     const publicNavbar =
//     document.getElementById("publicNavbar");

// if (publicNavbar) {
//     publicNavbar.style.display = "none";
// }

//     /* Hide public website */

//     const publicSections = [
//         "home",
//         "how-it-works",
//         "ai"
//     ];

//     publicSections.forEach(id => {

//         const element =
//             document.getElementById(id);

//         if (element) {
//             element.style.display = "none";
//         }

//     });


//     const footer =
//         document.querySelector("footer");

//     if (footer) {
//         footer.style.display = "none";
//     }


//     /* Hide both dashboards first */

//     const farmerDashboard =
//         document.getElementById(
//             "farmerDashboard"
//         );

//     const buyerDashboard =
//         document.getElementById(
//             "buyerDashboard"
//         );


//     if (farmerDashboard) {

//         farmerDashboard.style.display =
//             "none";

//     }


//     if (buyerDashboard) {

//         buyerDashboard.style.display =
//             "none";

//     }


//     /* Open correct dashboard */

//     if (user.role === "farmer") {

//         showFarmerDashboard(user);

//     }

//     else if (user.role === "buyer") {

//         showBuyerDashboard(user);

//     }

// }

/* =====================================
   OPEN USER DASHBOARD
===================================== */

// function openUserDashboard(user) {

//     if (!user || !user.role) {
//         console.error("Invalid user:", user);
//         return;
//     }


//     /* ================================
//        HIDE PUBLIC WEBSITE
//     ================================= */

//     const publicNavbar =
//         document.getElementById("publicNavbar");

//     if (publicNavbar) {
//         publicNavbar.style.display = "none";
//     }


//     const publicSections = [
//         "home",
//         "how-it-works",
//         "ai"
//     ];

//     publicSections.forEach(id => {

//         const element =
//             document.getElementById(id);

//         if (element) {
//             element.style.display = "none";
//         }

//     });


//     const footer =
//         document.querySelector("footer");

//     if (footer) {
//         footer.style.display = "none";
//     }


//     /* ================================
//        GET DASHBOARDS
//     ================================= */

//     const farmerDashboard =
//         document.getElementById("farmerDashboard");

//     const buyerDashboard =
//         document.getElementById("buyerDashboard");


//     /* ================================
//        HIDE BOTH
//     ================================= */

//     if (farmerDashboard) {

//         farmerDashboard.classList.remove(
//             "dashboard-visible"
//         );

//     }


//     if (buyerDashboard) {

//         buyerDashboard.classList.remove(
//             "dashboard-visible"
//         );

//     }


//     /* ================================
//        SHOW CORRECT DASHBOARD
//     ================================= */

//     if (user.role === "farmer") {

//         showFarmerDashboard(user);

//     }

//     else if (user.role === "buyer") {

//         showBuyerDashboard(user);

//     }

//     else {

//         console.error(
//             "Unknown user role:",
//             user.role
//         );

//     }

// }

/* =====================================
   OPEN USER DASHBOARD
   FINAL ROLE-SAFE VERSION
===================================== */

function openUserDashboard(user) {

    if (!user || !user.role) {
        console.error("Invalid user:", user);
        return;
    }


    /* ================================
       HIDE PUBLIC WEBSITE
    ================================= */

    const publicNavbar =
        document.getElementById("publicNavbar");

    if (publicNavbar) {
        publicNavbar.style.display = "none";
    }


    const publicSections = [
        "home",
        "how-it-works",
        "ai"
    ];

    publicSections.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.style.display = "none";
        }

    });


    const footer =
        document.querySelector("footer");

    if (footer) {
        footer.style.display = "none";
    }


    /* ================================
       GET BOTH DASHBOARDS
    ================================= */

    const farmerDashboard =
        document.getElementById("farmerDashboard");

    const buyerDashboard =
        document.getElementById("buyerDashboard");


    /* ================================
       FORCE HIDE BOTH
    ================================= */

    if (farmerDashboard) {

        farmerDashboard.classList.remove(
            "dashboard-visible"
        );

        farmerDashboard.style.setProperty(
            "display",
            "none",
            "important"
        );
    }


    if (buyerDashboard) {

        buyerDashboard.classList.remove(
            "dashboard-visible"
        );

        buyerDashboard.style.setProperty(
            "display",
            "none",
            "important"
        );
    }


    /* ================================
       SHOW ONLY CORRECT DASHBOARD
    ================================= */

    if (user.role === "farmer") {

        if (farmerDashboard) {

            farmerDashboard.classList.add(
                "dashboard-visible"
            );

            farmerDashboard.style.setProperty(
                "display",
                "flex",
                "important"
            );
        }

        showFarmerDashboard(user);
    }


    else if (user.role === "buyer") {

        if (buyerDashboard) {

            buyerDashboard.classList.add(
                "dashboard-visible"
            );

            buyerDashboard.style.setProperty(
                "display",
                "flex",
                "important"
            );
        }

        showBuyerDashboard(user);
    }


    else {

        console.error(
            "Unknown user role:",
            user.role
        );

    }


    /* ================================
       ALWAYS START FROM TOP
    ================================= */

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}

/* =====================================
   FARMER DASHBOARD
===================================== */

function showFarmerDashboard(user) {

    const dashboard =
        document.getElementById(
            "farmerDashboard"
        );


    if (!dashboard) {

        notify(
            "Farmer dashboard could not be found."
        );

        return;

    }


    /* Show dashboard */

    dashboard.classList.add("dashboard-visible");


    /* Update name */

    const name =
        document.getElementById(
            "dashboardUserName"
        );

    if (name) {

        name.textContent =
            user.name;

    }


    const greeting =
        document.getElementById(
            "dashboardGreetingName"
        );

    if (greeting) {

        greeting.textContent =
            user.name;

    }


    /* Create initials */

    const avatar =
        document.querySelector(
            ".dashboard-avatar"
        );

    if (avatar) {

        const initials =
            user.name
                .split(" ")
                .map(word =>
                    word.charAt(0)
                )
                .slice(0, 2)
                .join("")
                .toUpperCase();

        avatar.textContent =
            initials;

    }


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/* =====================================================
   FARMER SIDEBAR TOGGLE
===================================================== */

/* =====================================================
   FARMER SIDEBAR TOGGLE
===================================================== */

function toggleFarmerSidebar() {

    const farmerDashboard =
        document.getElementById("farmerDashboard");

    const toggleButton =
        farmerDashboard?.querySelector(
            ".sidebar-toggle"
        );

    if (!farmerDashboard) {
        return;
    }

    const collapsed =
        farmerDashboard.classList.toggle(
            "sidebar-collapsed"
        );

    if (toggleButton) {

        toggleButton.textContent =
            collapsed ? "☰" : "×";

    }

}


/* =====================================
   NAVBAR AFTER LOGIN
===================================== */

function updateNavbar(user) {

    const buttons =
        document.querySelector(
            ".nav-buttons"
        );


    if (!buttons) return;


    buttons.innerHTML = `

        <span class="logged-user">

            ${user.role === "farmer"
                ? "👨‍🌾"
                : "🛒"}

            ${user.name}

        </span>


        <button
            class="btn login-btn"
            onclick="logoutUser()">

            Logout

        </button>

    `;

}


/* =====================================
   LOGOUT
===================================== */

/* =====================================
   LOGOUT
===================================== */

function logoutUser() {

    // Remove saved login
    sessionStorage.removeItem("kisanDirectCurrentUser");

    // Hide farmer dashboard
    const farmerDashboard =
        document.getElementById("farmerDashboard");

    if (farmerDashboard) {
        farmerDashboard.style.display = "none";
        farmerDashboard.classList.remove("sidebar-collapsed");
    }

    // Hide buyer dashboard
    const buyerDashboard =
        document.getElementById("buyerDashboard");

    if (buyerDashboard) {
        buyerDashboard.style.display = "none";
    }

    // Show public navbar
    const publicNavbar =
        document.getElementById("publicNavbar");

    if (publicNavbar) {
        publicNavbar.style.display = "";
    }

    // Show public sections
    ["home", "how-it-works", "ai"].forEach(id => {

        const section =
            document.getElementById(id);

        if (section) {
            section.style.display = "";
        }

    });

    // Show footer
    const footer =
        document.querySelector("footer");

    if (footer) {
        footer.style.display = "";
    }

    // Reload cleanly
    location.reload();
}


/* =====================================
   RESTORE LOGIN
===================================== */

// function restoreLogin() {

//     const savedUser =
//     localStorage.getItem("kisanDirectCurrentUser");


//     if (!savedUser) {

//         return;

//     }

//     try{

//     const user= JSON.parse(savedUser);

//     if (!user || !user.role){
//         localStorage.removeItem("kisanDirectCurrentUser");
//         return;
//     }

//     /* Restore navbar */

//     updateNavbar(user);


//     /* Restore dashboard */

//     openUserDashboard(user);
//     }catch (error){
//         console.error(
//             "Failed to restore login.",
//             error
//         );
//         localStorage.removeItem("kisanDirectCurrentUser");
//     }
// }
// restoreLogin();
// updateOrderBadges();
// sessionStorage.removeItem("kisanDirectCurrentUser");


/* =====================================
   RESTORE LOGIN
   HOMEPAGE ON WEBSITE OPEN
===================================== */

// function restoreLogin() {



//     /*
//        Do NOT automatically open
//        Farmer or Buyer dashboard
//        when the website loads.

//        The website should always
//        start from the homepage.
//     */

//     const savedUser =
//         sessionStorage.getItem("kisanDirectCurrentUser");
//     if (!savedUser) {
//         return;
//     }

//     try {

//         const user = JSON.parse(savedUser);

//         if (!user || !user.role) {

//             sessionStorage.removeItem(
//                 "kisanDirectCurrentUser"
//             );

//             return;
//         }

//         /*
//            Keep the saved login information,
//            but DO NOT open the dashboard here.

//            Dashboard will open only after
//            the user actually logs in.
//         */

//         console.log(
//             "Saved user found. Starting from homepage."
//         );

//     } catch (error) {

//         console.error(
//             "Failed to restore login.",
//             error
//         );

//         localStorage.removeItem(
//             "kisanDirectCurrentUser"
//         );
//     }
// }

// restoreLogin();
// updateOrderBadges();


/* =====================================
   RESTORE LOGIN
   RESTORE DASHBOARD ON PAGE RELOAD
===================================== */

function restoreLogin() {

    const savedUser =
        sessionStorage.getItem(
            "kisanDirectCurrentUser"
        );

    /*
       No active session:
       stay on homepage.
    */

    if (!savedUser) {
        return;
    }

    try {

        const user =
            JSON.parse(savedUser);

        if (!user || !user.role) {

            localStorage.removeItem(
                "kisanDirectCurrentUser"
            );

            return;
        }

        /*
           Restore logged-in navbar
        */

        updateNavbar(user);

        /*
           Restore the correct dashboard
           after page reload.
        */

        openUserDashboard(user);

    } catch (error) {

        console.error(
            "Failed to restore login.",
            error
        );

        sessionStorage.removeItem(
            "kisanDirectCurrentUser"
        );
    }
}

restoreLogin();
updateOrderBadges();
/* =====================================
   VALIDATION
===================================== */

function validMobile(mobile) {

    return /^[6-9][0-9]{9}$/.test(mobile);

}


/* =====================================
   NOTIFICATION
===================================== */

function notify(message) {

    const box = document.getElementById("notification");

    if (!box) {
        console.warn("Notification element not found.");
        return;
    }

    /* Do not show empty notifications */
    if (!message || String(message).trim() === "") {
        box.classList.remove("show");
        box.textContent = "";
        return;
    }

    /* Set message */
    box.textContent = message;

    /* Show notification */
    box.classList.add("show");

    /* Clear previous timer */
    if (window.notificationTimer) {
        clearTimeout(window.notificationTimer);
    }

    /* Hide after 3 seconds */
    window.notificationTimer = setTimeout(() => {

        box.classList.remove("show");

    }, 3000);

}


/* =====================================
   EXISTING LANDING PAGE FUNCTIONS
===================================== */

function openMarketplace() {
    const marketplace = document.getElementById("marketplace");

    if (!marketplace) {
        console.error("Marketplace section not found.");
        return;
    }

    // Make Marketplace visible
    marketplace.style.display = "block";

    // Load marketplace products
    if (typeof displayMarketplace === "function") {
        displayMarketplace();
    }

    // Scroll to Marketplace
    setTimeout(() => {
        marketplace.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 50);
}


function showAIMessage() {

    notify(
        "AI predicts tomato demand may increase by 18.4% over the next 14 days 🤖"
    );

}


function demoMessage() {

    notify(
        "Password recovery will be connected to the backend later."
    );

}


/* Close modal when clicking background */

document
    .getElementById("authOverlay")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeAuth();

            }

        }
    );

/* =====================================
   BUYER DASHBOARD
===================================== */

function showBuyerDashboard(user) {

    const dashboard =
        document.getElementById(
            "buyerDashboard"
        );


    if (!dashboard) {

        notify(
            "Buyer dashboard could not be found."
        );

        return;

    }


    /* Show buyer dashboard */

    dashboard.classList.add("dashboard-visible");

    /* Update name */

    const name =
        document.getElementById(
            "buyerDashboardName"
        );

    if (name) {

        name.textContent =
            user.name;

    }


    const greeting =
        document.getElementById(
            "buyerGreetingName"
        );

    if (greeting) {

        greeting.textContent =
            user.name;

    }


    /* Create initials */

    const avatar =
        document.querySelector(
            ".buyer-avatar"
        );


    if (avatar) {

        const initials =
            user.name
                .split(" ")
                .map(word =>
                    word.charAt(0)
                )
                .slice(0, 2)
                .join("")
                .toUpperCase();

        avatar.textContent =
            initials;

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



function buyerFarmers() {

    console.log("Farmers section opened");

    const buyerDashboard =
        document.getElementById("buyerDashboard");

    const dashboardContent =
        buyerDashboard
            ? buyerDashboard.querySelector(".dashboard-content")
            : null;

    const marketplace =
        document.getElementById("marketplace");

    const ordersSection =
        document.getElementById("buyerOrders");

    const farmersPage =
        document.getElementById("buyerFarmersPage");


    /* =====================================
       CHECK FARMERS PAGE
    ===================================== */

    if (!farmersPage) {
        console.error("buyerFarmersPage not found.");
        return;
    }


    /* =====================================
       HIDE DASHBOARD HOME
    ===================================== */

    if (dashboardContent) {
        dashboardContent.style.setProperty(
            "display",
            "none",
            "important"
        );
    }


    /* =====================================
       HIDE MARKETPLACE
    ===================================== */

    if (marketplace) {
        marketplace.style.setProperty(
            "display",
            "none",
            "important"
        );
    }


    /* =====================================
       HIDE MY ORDERS
    ===================================== */

    if (ordersSection) {
        ordersSection.style.setProperty(
            "display",
            "none",
            "important"
        );
    }


    /* =====================================
       HIDE OTHER BUYER SUBPAGES
    ===================================== */

    document
        .querySelectorAll(".dashboard-subpage")
        .forEach(function(page) {

            if (page !== farmersPage) {
                page.style.setProperty(
                    "display",
                    "none",
                    "important"
                );
            }

        });


    /* =====================================
       SHOW FARMERS
    ===================================== */

    farmersPage.style.setProperty(
        "display",
        "block",
        "important"
    );


    /* =====================================
       ACTIVE SIDEBAR
    ===================================== */

    if (buyerDashboard) {

        const menuItems =
            buyerDashboard.querySelectorAll(
                ".dashboard-menu-item"
            );

        menuItems.forEach(function(item) {
            item.classList.remove("active");
        });


        menuItems.forEach(function(item) {

            if (
                item.textContent
                    .trim()
                    .includes("Farmers")
            ) {

                item.classList.add("active");

            }

        });

    }


    /* =====================================
       SCROLL TOP
    ===================================== */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/* =====================================
   BUYER PAGE NAVIGATION
===================================== */

// function hideAllBuyerPages() {

//     // Hide the main dashboard CONTENT
//     const dashboard = document.getElementById("buyerDashboard");

//     if (dashboard) {
//         const dashboardContent =
//             dashboard.querySelector(".dashboard-content");

//         if (dashboardContent) {
//             dashboardContent.style.setProperty(
//                 "display",
//                 "none",
//                 "important"
//             );
//         }
//     }

//     // Hide all separate buyer pages
//     document
//         .querySelectorAll(".dashboard-subpage")
//         .forEach(page => {
//             page.style.setProperty(
//                 "display",
//                 "none",
//                 "important"
//             );
//         });
// }

// function hideAllBuyerPages() {

//     const buyerDashboard =
//         document.getElementById("buyerDashboard");

//     if (!buyerDashboard) return;

//     /* =====================================
//        HIDE MAIN BUYER DASHBOARD
//     ===================================== */

//     const dashboardContent =
//         buyerDashboard.querySelector(".dashboard-content");

//     if (dashboardContent) {
//         dashboardContent.style.setProperty(
//             "display",
//             "none",
//             "important"
//         );
//     }

//     /* =====================================
//        HIDE ALL STATIC BUYER PAGES
//     ===================================== */

//     buyerDashboard
//         .querySelectorAll(".dashboard-subpage")
//         .forEach(function(page) {

//             page.style.setProperty(
//                 "display",
//                 "none",
//                 "important"
//             );

//         });

//     /* =====================================
//        HIDE DYNAMIC BUYER PAGES
//     ===================================== */

//     buyerDashboard
//         .querySelectorAll(".buyer-page")
//         .forEach(function(page) {

//             page.style.setProperty(
//                 "display",
//                 "none",
//                 "important"
//             );

//         });
// }


function hideAllBuyerPages() {

    const buyerDashboard =
        document.getElementById("buyerDashboard");

    /* =====================================
       HIDE BUYER DASHBOARD HOME
    ===================================== */

    if (buyerDashboard) {

        const dashboardContent =
            buyerDashboard.querySelector(".dashboard-content");

        if (dashboardContent) {
            dashboardContent.style.setProperty(
                "display",
                "none",
                "important"
            );
        }

        /* Hide pages inside dashboard */
        buyerDashboard
            .querySelectorAll(".dashboard-subpage")
            .forEach(function(page) {

                page.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

            });

        /* Hide dynamic buyer pages */
        buyerDashboard
            .querySelectorAll(".buyer-page")
            .forEach(function(page) {

                page.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

            });
    }


    /* =====================================
       HIDE MARKETPLACE
       IMPORTANT: Marketplace is OUTSIDE
       buyerDashboard in your HTML.
    ===================================== */

    // const marketplace =
    //     document.getElementById("marketplace");

    // if (marketplace) {

    //     marketplace.style.setProperty(
    //         "display",
    //         "none",
    //         "important"
    //     );

    // }


    /* =====================================
       HIDE BUYER ORDERS
    ===================================== */

    const orders =
        document.getElementById("buyerOrders");

    if (orders) {

        orders.style.setProperty(
            "display",
            "none",
            "important"
        );

    }


    /* =====================================
       HIDE FARMERS
    ===================================== */

    const farmers =
        document.getElementById("buyerFarmersPage");

    if (farmers) {

        farmers.style.setProperty(
            "display",
            "none",
            "important"
        );

    }


    /* =====================================
       HIDE DELIVERIES
    ===================================== */

    const deliveries =
        document.getElementById("buyerDeliveries");

    if (deliveries) {

        deliveries.style.setProperty(
            "display",
            "none",
            "important"
        );

    }
}
/* =====================================
   BUYER SIDEBAR ACTIVE BUTTON
===================================== */

function setBuyerActiveButton(button) {

    // Find the buyer sidebar
    const sidebar = document.querySelector("#buyerDashboard");

    if (!sidebar) {
        console.error("Buyer dashboard not found.");
        return;
    }

    // Remove active from all sidebar buttons
    const buttons = sidebar.querySelectorAll(".dashboard-menu-item");

    buttons.forEach(function (item) {
        item.classList.remove("active");
    });

    // Add active to clicked button
    if (button) {
        button.classList.add("active");
    }
}


/* =====================================
   BUYER DASHBOARD
===================================== */

// function buyerDashboard(button) {

//     const buyerDashboard =
//         document.getElementById("buyerDashboard");

//     if (!buyerDashboard) return;

//     hideAllBuyerPages();

//     const dashboardContent =
//         buyerDashboard.querySelector(".dashboard-content");

//     if (dashboardContent) {
//         dashboardContent.style.setProperty (
//             "display",
//             "block",
//             "important"
//     );
// }
    

//     setBuyerActiveButton(button);

//     window.scrollTo({
//         top: 0,
//         behavior: "instant"
//     });

// }

function buyerDashboard(button) {

    const dashboard =
        document.getElementById("buyerDashboard");

    if (!dashboard) return;

    /* Hide everything else */
    hideAllBuyerPages();

    /* Show dashboard */
    const content =
        dashboard.querySelector(".dashboard-content");

    if (content) {

        content.style.setProperty(
            "display",
            "block",
            "important"
        );

    }

    /* Active sidebar */
    setBuyerActiveButton(button);

    /* Top */
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}

/* =====================================
   BUYER MARKETPLACE
===================================== */

// function buyerMarketplace(button) {

//     const buyerDashboard =
//         document.getElementById("buyerDashboard");

//     const marketplacePage =
//         document.getElementById("marketplace");

//     if (!buyerDashboard || !marketplacePage) {
//         console.error("Marketplace page not found.");
//         return;
//     }

//     hideAllBuyerPages();

//     marketplacePage.style.setProperty(
//         "display",
//         "block",
//         "important"
//     );
//     displayMarketplace();

//     setBuyerActiveButton(button);

//     window.scrollTo({
//         top: 0,
//         behavior: "instant"
//     });
// }

// function buyerMarketplace(button) {

//     const marketplace =
//         document.getElementById("marketplace");

//     if (!marketplace) {
//         console.error("Marketplace page not found.");
//         return;
//     }

//     /* Hide every other buyer page */
//     hideAllBuyerPages();

//     /* Show marketplace */
//     marketplace.style.setProperty(
//         "display",
//         "block",
//         "important"
//     );

//     /* Load products */
//     displayMarketplace();

//     /* Active sidebar */
//     setBuyerActiveButton(button);

//     /* Top */
//     window.scrollTo({
//         top: 0,
//         behavior: "instant"
//     });
// }

function buyerMarketplace(button) {

    const buyerDashboard =
        document.getElementById("buyerDashboard");

    const marketplace =
        document.getElementById("marketplace");

    if (!buyerDashboard) {
        console.error("Buyer dashboard not found.");
        return;
    }

    if (!marketplace) {
        console.error("Marketplace page not found.");
        return;
    }


    /* =====================================
       MOVE MARKETPLACE INTO BUYER DASHBOARD
       This fixes the mobile page order.
    ===================================== */

    if (marketplace.parentElement !== buyerDashboard) {

        buyerDashboard.appendChild(marketplace);

    }


    /* =====================================
       HIDE OTHER BUYER PAGES
    ===================================== */

    hideAllBuyerPages();


    /* =====================================
       SHOW MARKETPLACE
    ===================================== */

    marketplace.style.setProperty(
        "display",
        "block",
        "important"
    );


    /* =====================================
       LOAD PRODUCTS
    ===================================== */

    displayMarketplace();


    /* =====================================
       ACTIVE SIDEBAR BUTTON
    ===================================== */

    setBuyerActiveButton(button);


    /* =====================================
       SCROLL TO TOP
    ===================================== */

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}

/* =====================================
   BUYER - MARKETPLACE
===================================== */

// function buyerMarketplace() {

//     const buyerDashboard =
//         document.getElementById("buyerDashboard");

//     const marketplace =
//         document.getElementById("marketplace");

//     if (!buyerDashboard) {
//         console.error("Buyer dashboard not found.");
//         return;
//     }

//     if (!marketplace) {
//         console.error("Marketplace not found.");
//         return;
//     }

//     /* Hide buyer dashboard home */
//     const dashboardContent =
//         buyerDashboard.querySelector(".dashboard-content");

//     if (dashboardContent) {
//         dashboardContent.style.setProperty(
//             "display",
//             "none",
//             "important"
//         );
//     }

//     /* Hide other buyer pages */
//     document
//         .querySelectorAll(".dashboard-subpage")
//         .forEach(page => {
//             page.style.setProperty(
//                 "display",
//                 "none",
//                 "important"
//             );
//         });

//     /* Show marketplace */
//     marketplace.style.setProperty(
//         "display",
//         "block",
//         "important"
//     );

//     /* Load products */
//     displayMarketplace();

//     /* Active sidebar */
//     buyerDashboard
//         .querySelectorAll(".dashboard-menu-item")
//         .forEach(item => {
//             item.classList.remove("active");
//         });

//     const marketplaceButton =
//         buyerDashboard.querySelector(
//             '[onclick="buyerMarketplace()"]'
//         );

//     if (marketplaceButton) {
//         marketplaceButton.classList.add("active");
//     }

//     window.scrollTo({
//         top: 0,
//         behavior: "instant"
//     });
// }

/* =====================================
   BUYER MY ORDERS
===================================== */

// function buyerOrders(button) {

//     const buyerDashboard =
//         document.getElementById("buyerDashboard");

//     if (!buyerDashboard) return;

//     hideAllBuyerPages();

//     const ordersPage =
//         document.getElementById("buyerOrders");

//     if (ordersPage) {

//         ordersPage.style.display = "block";

//     } else {

//         console.error(
//             "buyerOrders section not found."
//         );

//         return;
//     }

//     setBuyerActiveButton(button);

//     displayBuyerOrders();

//     window.scrollTo({
//         top: 0,
//         behavior: "instant"
//     });

// }

function buyerOrders(button) {

    const ordersPage =
        document.getElementById("buyerOrders");

    if (!ordersPage) {
        console.error("Buyer Orders page not found.");
        return;
    }

    /* Hide everything */
    hideAllBuyerPages();

    /* Show Orders */
    ordersPage.style.setProperty(
        "display",
        "block",
        "important"
    );

    /* Load orders */
    displayBuyerOrders();

    /* Active sidebar */
    setBuyerActiveButton(button);

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =====================================
   BUYER FARMERS
===================================== */

// function buyerFarmers(button) {

//     const buyerDashboard =
//         document.getElementById("buyerDashboard");

//     if (!buyerDashboard) return;

//     hideAllBuyerPages();

//     const farmersPage =
//         document.getElementById("buyerFarmersPage");

//     if (farmersPage) {

//         farmersPage.style.display = "block";

//     } else {

//         console.error(
//             "buyerFarmersPage not found."
//         );

//         return;
//     }

//     setBuyerActiveButton(button);

//     window.scrollTo({
//         top: 0,
//         behavior: "instant"
//     });

// }

function buyerFarmers(button) {

    const farmersPage =
        document.getElementById("buyerFarmersPage");

    if (!farmersPage) {
        console.error(
            "Buyer Farmers page not found."
        );
        return;
    }

    /* Hide everything */
    hideAllBuyerPages();

    /* Show Farmers */
    farmersPage.style.setProperty(
        "display",
        "block",
        "important"
    );

    /* Active sidebar */
    setBuyerActiveButton(button);

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =========================================
   BUYER DELIVERIES
   ========================================= */

function buyerDeliveries(button) {

    const buyerDashboard =
        document.getElementById("buyerDashboard");

    if (!buyerDashboard) {
        console.error("Buyer dashboard not found.");
        return;
    }

    // Hide other buyer pages
    if (typeof hideAllBuyerPages === "function") {
        hideAllBuyerPages();
    }

    // Find existing deliveries page
    let deliveriesPage =
        document.getElementById("buyerDeliveries");

    // Create deliveries page if it doesn't exist
    if (!deliveriesPage) {

        deliveriesPage = document.createElement("div");

        deliveriesPage.id = "buyerDeliveries";

        deliveriesPage.className = "buyer-page";

        deliveriesPage.innerHTML = `

            <div class="page-header">

                <div>
                    <div class="eyebrow">
                        DELIVERY NETWORK
                    </div>

                    <h1>
                        Deliveries 🚚
                    </h1>

                    <p>
                        Track your orders and manage your deliveries.
                    </p>
                </div>

                <div class="verified-badge">
                    ✓ Delivery System Active
                </div>

            </div>


            <div class="dashboard-stats">

                <div class="dashboard-stat-card">

                    <div class="stat-card-icon">
                        📦
                    </div>

                    <small>
                        Active Deliveries
                    </small>

                    <strong>
                        2
                    </strong>

                    <p>
                        Currently in transit
                    </p>

                </div>


                <div class="dashboard-stat-card">

                    <div class="stat-card-icon">
                        🚚
                    </div>

                    <small>
                        Out for Delivery
                    </small>

                    <strong>
                        1
                    </strong>

                    <p>
                        Arriving soon
                    </p>

                </div>


                <div class="dashboard-stat-card">

                    <div class="stat-card-icon">
                        ✓
                    </div>

                    <small>
                        Delivered
                    </small>

                    <strong>
                        24
                    </strong>

                    <p>
                        Successfully delivered
                    </p>

                </div>

            </div>


            <div class="dashboard-section">

                <div class="section-header">

                    <div>
                        <div class="eyebrow">
                            LIVE TRACKING
                        </div>

                        <h2>
                            Your Deliveries
                        </h2>

                        <p>
                            Track your recent orders from farmer to doorstep.
                        </p>
                    </div>

                </div>


                <div class="delivery-list">

                    <div class="delivery-card">

                        <div class="delivery-icon">
                            🍅
                        </div>

                        <div class="delivery-info">

                            <strong>
                                Fresh Tomatoes
                            </strong>

                            <span>
                                From Ramesh Kumar • Ranchi
                            </span>

                            <small>
                                Order #KD1024
                            </small>

                        </div>

                        <div class="delivery-status">
                            🚚 Out for Delivery
                        </div>

                        <button
                            class="secondary"
                            onclick="trackDelivery('KD1024')">

                            Track

                        </button>

                    </div>


                    <div class="delivery-card">

                        <div class="delivery-icon">
                            🥔
                        </div>

                        <div class="delivery-info">

                            <strong>
                                Potato & Onion
                            </strong>

                            <span>
                                From Anita Devi • Ramgarh
                            </span>

                            <small>
                                Order #KD1021
                            </small>

                        </div>

                        <div class="delivery-status">
                            📦 In Transit
                        </div>

                        <button
                            class="secondary"
                            onclick="trackDelivery('KD1021')">

                            Track

                        </button>

                    </div>


                    <div class="delivery-card">

                        <div class="delivery-icon">
                            🌾
                        </div>

                        <div class="delivery-info">

                            <strong>
                                Rice & Wheat
                            </strong>

                            <span>
                                From Suresh Mahto • Khunti
                            </span>

                            <small>
                                Order #KD1018
                            </small>

                        </div>

                        <div class="delivery-status delivered">
                            ✓ Delivered
                        </div>

                        <button
                            class="secondary"
                            onclick="trackDelivery('KD1018')">

                            View

                        </button>

                    </div>

                </div>

            </div>

        `;

        buyerDashboard.appendChild(deliveriesPage);
    }

    // Show deliveries
    // deliveriesPage.style.display = "block";

    deliveriesPage.style.setProperty(
        "display",
        "block",
        "important"
    );

    // Active sidebar button
    if (typeof setBuyerActiveButton === "function") {
        setBuyerActiveButton(button);
    }

    // Go to top
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =========================================
   TRACK DELIVERY
   ========================================= */

function trackDelivery(orderId) {

    alert(
        "📦 Delivery Tracking\n\n" +
        "Order: " + orderId + "\n\n" +
        "🚜 Farmer → Pickup → Transit → Your Location\n\n" +
        "Current status: In Transit\n\n" +
        "Estimated arrival: Today"
    );
}
// function showFarmerMessage(name) {

//     alert(
//         "Farmer Profile\n\n" +
//         name +
//         "\n\nVerified KisanDirect farmer."
//     );

// }



/* =====================================
   DISPLAY BUYER ORDERS
===================================== */


function displayBuyerOrders() {

    const list =
        document.getElementById("buyerOrdersList");

    if (!list) {
        console.error("buyerOrdersList not found.");
        return;
    }


    const currentUser =
        JSON.parse(
            sessionStorage.getItem(
                "kisanDirectCurrentUser"
            )
        );


    /* -----------------------------------------
       LOGIN CHECK
    ----------------------------------------- */

    if (!currentUser) {

        list.innerHTML = `

            <div class="buyer-market-empty">

                <div class="buyer-empty-icon">
                    🔐
                </div>

                <h3>Please login first</h3>

                <p>
                    Login as a buyer to view your orders.
                </p>

            </div>

        `;

        return;
    }


    /* -----------------------------------------
       GET ORDERS
    ----------------------------------------- */

    const allOrders =
        JSON.parse(
            localStorage.getItem(
                "kisanDirectOrders"
            )
        ) || [];


    const myOrders =
        allOrders.filter(order =>
            String(order.buyerId) ===
                String(currentUser.mobile)
            ||
            order.buyerName ===
                currentUser.name
        );


    /* -----------------------------------------
       EMPTY ORDERS
    ----------------------------------------- */

    if (myOrders.length === 0) {

        list.innerHTML = `

            <div class="buyer-market-empty">

                <div class="buyer-empty-icon">
                    📦
                </div>

                <h3>No orders yet</h3>

                <p>
                    Your purchases from farmers
                    will appear here.
                </p>

                <button
                    class="market-order-btn"
                    onclick="buyerMarketplace()"
                    style="max-width:220px;"
                >
                    🛒 Explore Marketplace
                </button>

            </div>

        `;

        return;
    }


    /* -----------------------------------------
       ORDER SUMMARY
    ----------------------------------------- */

    const totalOrders =
        myOrders.length;

    const pendingOrders =
        myOrders.filter(order =>
            String(order.status).toLowerCase() ===
            "pending"
        ).length;

    const completedOrders =
        myOrders.filter(order =>
            String(order.status).toLowerCase() ===
            "completed"
        ).length;


    const totalSpent =
        myOrders
            .filter(order =>
                String(order.status).toLowerCase() !==
                "rejected"
            )
            .reduce(
                (sum, order) =>
                    sum +
                    Number(
                        order.total ||
                        order.amount ||
                        0
                    ),
                0
            );


    /* -----------------------------------------
       HEADER + SUMMARY
    ----------------------------------------- */

    list.innerHTML = `

        <div class="buyer-orders-summary">

            <div class="buyer-summary-card">

                <div class="buyer-summary-icon">
                    📦
                </div>

                <div>
                    <span>Total Orders</span>
                    <strong>${totalOrders}</strong>
                </div>

            </div>


            <div class="buyer-summary-card">

                <div class="buyer-summary-icon">
                    ⏳
                </div>

                <div>
                    <span>Pending</span>
                    <strong>${pendingOrders}</strong>
                </div>

            </div>


            <div class="buyer-summary-card">

                <div class="buyer-summary-icon">
                    ✅
                </div>

                <div>
                    <span>Completed</span>
                    <strong>${completedOrders}</strong>
                </div>

            </div>


            <div class="buyer-summary-card">

                <div class="buyer-summary-icon">
                    💰
                </div>

                <div>
                    <span>Total Spent</span>
                    <strong>
                        ₹${totalSpent.toFixed(0)}
                    </strong>
                </div>

            </div>

        </div>


        <div class="buyer-purchases-heading">

            <div>
                <span>ORDER HISTORY</span>
                <h2>Your Purchases</h2>
            </div>

            <button
                onclick="buyerMarketplace()"
                class="buyer-outline-btn"
            >
                + Buy Produce
            </button>

        </div>


        <div class="buyer-orders-list">
        </div>

    `;


    const ordersContainer =
        list.querySelector(
            ".buyer-orders-list"
        );


    /* -----------------------------------------
       ORDER CARDS
    ----------------------------------------- */

    myOrders
        .slice()
        .reverse()
        .forEach(order => {

            const card =
                document.createElement("div");

            card.className =
                "buyer-order-card";


            const productName =
                order.productName ||
                order.name ||
                "Fresh Produce";


            const quantity =
                Number(order.quantity) || 0;


            const total =
                Number(
                    order.total ||
                    order.amount ||
                    0
                );


            const status =
                order.status ||
                "Pending";


            const statusLower =
                String(status).toLowerCase();


            let statusClass =
                "pending";

            let statusIcon =
                "⏳";


            if (statusLower === "completed") {

                statusClass =
                    "completed";

                statusIcon =
                    "✓";

            }
            else if (
                statusLower === "rejected"
            ) {

                statusClass =
                    "rejected";

                statusIcon =
                    "✕";

            }
            else if (
                statusLower === "in transit" ||
                statusLower === "transit"
            ) {

                statusClass =
                    "transit";

                statusIcon =
                    "🚚";

            }


            /* Crop icon */

            const cropName =
                String(productName).toLowerCase();

            let cropIcon = "🌾";

            if (cropName.includes("apple"))
                cropIcon = "🍎";

            else if (cropName.includes("mango"))
                cropIcon = "🥭";

            else if (cropName.includes("pineapple"))
                cropIcon = "🍍";

            else if (cropName.includes("tomato"))
                cropIcon = "🍅";

            else if (cropName.includes("potato"))
                cropIcon = "🥔";


            card.innerHTML = `

                <div class="buyer-order-icon">
                    ${cropIcon}
                </div>


                <div class="buyer-order-info">

                    <div class="buyer-order-id">
                        ${escapeHTML(
                            order.id ||
                            "KD-ORDER"
                        )}
                    </div>

                    <h3>
                        ${escapeHTML(productName)}
                    </h3>

                    <div class="buyer-order-meta">

                        <span>
                            👨‍🌾
                            ${escapeHTML(
                                order.farmerName ||
                                "Farmer"
                            )}
                        </span>

                        <span>
                            📦 ${quantity} kg
                        </span>

                        <span>
                            📅
                            ${escapeHTML(
                                order.date ||
                                "Recently"
                            )}
                        </span>

                    </div>

                </div>


                <div class="buyer-order-amount">

                    <span>Total Amount</span>

                    <strong>
                        ₹${total.toFixed(2)}
                    </strong>

                    <small>
                        ₹${Number(
                            order.price || 0
                        ).toFixed(2)} / kg
                    </small>

                </div>


                <div
                    class="buyer-order-status ${statusClass}"
                >

                    <span>
                        ${statusIcon}
                    </span>

                    ${escapeHTML(status)}

                </div>

            `;


            ordersContainer.appendChild(card);

        });

}

function displayMarketplace() {

    const marketplaceList =
        document.getElementById("marketplaceList");

    if (!marketplaceList) {
        console.error("marketplaceList not found.");
        return;
    }

    const allProduce =
        JSON.parse(
            localStorage.getItem("kisanDirectProduce")
        ) || [];

    marketplaceList.innerHTML = "";

    const activeProducts =
        allProduce.filter(product =>{
            const status = String(product.status||"")
            .trim()
            .toLocaleLowerCase();
        
            return status === "active";
});

    /* -----------------------------------------
       EMPTY MARKETPLACE
    ----------------------------------------- */

    if (activeProducts.length === 0) {

        marketplaceList.innerHTML = `
            <div class="buyer-market-empty">

                <div class="buyer-empty-icon">
                    🌾
                </div>

                <h3>No fresh produce available</h3>

                <p>
                    Farmers haven't listed any active
                    produce yet. Check back soon.
                </p>

            </div>
        `;

        return;
    }


    /* -----------------------------------------
       PRODUCT CARDS
    ----------------------------------------- */

    activeProducts.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "buyer-market-card";


        /* Crop emoji */

        const cropName =
            String(product.name || "").toLowerCase();

        let cropIcon = "🌾";

        if (cropName.includes("apple")) {
            cropIcon = "🍎";
        }
        else if (cropName.includes("mango")) {
            cropIcon = "🥭";
        }
        else if (cropName.includes("pineapple")) {
            cropIcon = "🍍";
        }
        else if (cropName.includes("tomato")) {
            cropIcon = "🍅";
        }
        else if (cropName.includes("potato")) {
            cropIcon = "🥔";
        }
        else if (
            cropName.includes("rice") ||
            cropName.includes("paddy")
        ) {
            cropIcon = "🌾";
        }


        /* Stock status */

        const quantity =
            Number(product.quantity) || 0;

        let stockText = "In Stock";
        let stockClass = "good";

        if (quantity <= 0) {
            stockText = "Out of Stock";
            stockClass = "danger";
        }
        else if (quantity <= 50) {
            stockText = "Low Stock";
            stockClass = "warning";
        }


        /* Farmer */

        const farmerName =
            product.farmerName || "Local Farmer";


        /* Location */

        const location =
            product.location || "Local Area";


        /* Price */

        const price =
            Number(product.price) || 0;


        card.innerHTML = `

            <div class="market-card-top">

                <div class="market-crop-icon">
                    ${cropIcon}
                </div>

                <span class="market-stock-badge ${stockClass}">
                    ${stockText}
                </span>

            </div>


            <div class="market-card-body">

                <h3>
                    ${escapeHTML(
                        product.name || "Fresh Produce"
                    )}
                </h3>

                <div class="market-card-farmer">
                    👨‍🌾 ${escapeHTML(farmerName)}
                </div>

                <div class="market-card-location">
                    📍 ${escapeHTML(location)}
                </div>


                <div class="market-card-details">

                    <div class="market-detail">

                        <span>Category</span>

                        <strong>
                            ${escapeHTML(
                                product.category || "Produce"
                            )}
                        </strong>

                    </div>


                    <div class="market-detail">

                        <span>Grade</span>

                        <strong>
                            ${escapeHTML(
                                product.grade || "Standard"
                            )}
                        </strong>

                    </div>


                    <div class="market-detail">

                        <span>Available</span>

                        <strong>
                            ${quantity}
                            ${escapeHTML(
                                product.unit || "kg"
                            )}
                        </strong>

                    </div>


                    <div class="market-detail">

                        <span>Source</span>

                        <strong>
                            Direct from Farm
                        </strong>

                    </div>

                </div>


                <div class="market-card-price">

                    <div>

                        <span class="market-price-main">
                            ₹${price.toFixed(2)}
                        </span>

                        <span class="market-price-unit">
                            / kg
                        </span>

                    </div>

                </div>


                <button
                    class="market-order-btn"
                    onclick="placeOrder(${allProduce.indexOf(product)})"
                    ${quantity <= 0 ? "disabled" : ""}
                >

                    🛒 Place Order

                </button>

            </div>
        `;


        marketplaceList.appendChild(card);

    });

}




function buyProduct(product) {

    notify(
        product +
        " selected! Order checkout will be added in Step 3.3 🛒"
    );

}


function trackDelivery() {

    notify(
        "🚚 Delivery is currently 28 km away. ETA: 1h 25m."
    );

}

/* =====================================
   FARMER SIDEBAR NAVIGATION
===================================== */

function showFarmerSection(section, clickedButton) {

    // Hide Logistics whenever another section is opened
    const logisticsPage =
        document.getElementById("farmerLogisticsPage");

    if (section !== "logistics" && logisticsPage) {
        logisticsPage.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    const earningsPage =
    document.getElementById("farmerEarningsPage");

if (section !== "earnings" && earningsPage) {
    earningsPage.style.setProperty(
        "display",
        "none",
        "important"
    );
}

    /* ---------------------------------
       UPDATE ACTIVE SIDEBAR BUTTON
    --------------------------------- */

    const buttons =
        document.querySelectorAll(
            "#farmerDashboard .dashboard-menu-item"
        );


    buttons.forEach(button => {

        button.classList.remove("active");

    });


    if (clickedButton) {

        clickedButton.classList.add("active");

    }


    /* ---------------------------------
       DASHBOARD SECTION
    --------------------------------- */

    if (section === "dashboard") {

        showFarmerDashboardPage();

        // window.location.reload();
        return;

    }

    function showFarmerDashboardPage() {

    const dashboardContent =
        document.getElementById(
            "farmerDashboardContent"
        );

    const producePage =
        document.getElementById(
            "farmerProducePage"
        );
    const ordersPage =
        document.getElementById(
            "farmerOrdersPage"
        );
    const aiPage =
        document.getElementById(
            "farmerAIPage"
        );


    /* Show the original dashboard */

    if (dashboardContent) {

        dashboardContent.style.setProperty (
            "display",
            "block",
            "important",
        );
    

    }


    /* Hide My Produce */

    if (producePage) {

        producePage.style.setProperty(
            "display",
            "none",
            "important"
        );

    }

    /* Hide orders */

    if (ordersPage) {

        ordersPage.style.setProperty(
            "display",
            "none",
            "important"
        );

    }

    if (aiPage) {

        aiPage.style.setProperty(
            "display",
            "none",
            "important"
        );

    }


    /* Make sure dashboard itself is visible */

    const farmerDashboard =
        document.getElementById(
            "farmerDashboard"
        );

    if (farmerDashboard) {

        farmerDashboard.style.display =
            "block";

    }


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


    /* ---------------------------------
       PRODUCE
    --------------------------------- */

    if (section === "produce") {

        showFarmerProducePage();

        return;

    }


    /* ---------------------------------
       ORDERS
    --------------------------------- */

    if (section === "orders") {

        showFarmerOrdersPage();

        return;

    }

    /* AI */
    if (section === "ai") {

    
    showFarmerAIPage();
    return;
}

/* LOGISTICS */
    if (section === "logistics") {
    showFarmerLogisticsPage();
    return;
}

/* EARNINGS */
    if (section === "earnings") {
        showFarmerEarningsPage();
    return;
}

    function showFarmerProducePage() {

    const dashboardContent =
        document.getElementById("farmerDashboardContent");

    const producePage =
        document.getElementById("farmerProducePage");

    const ordersPage =
        document.getElementById("farmerOrdersPage");

    const aiPage =
    document.getElementById("farmerAIPage");


    // Hide the original dashboard completely
    if (dashboardContent) {

        dashboardContent.style.setProperty(
            "display",
            "none",
            "important"
        );

    }

    // hide orders
    if (ordersPage) {

        ordersPage.style.setProperty(
            "display",
            "none",
            "important"
        );

    }

    if (aiPage) {

        aiPage.style.setProperty(
            "display",
            "none",
            "important"
        );

    }
    // Show My Produce page
    if (producePage) {

        producePage.style.setProperty(
            "display",
            "block",
            "important"
        );

    }

    displayProducts();
    updateProduceStats();


    // Start My Produce from the top
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}



    function showFarmerOrdersPage() {

    const dashboardContent =
        document.getElementById("farmerDashboardContent");

    const producePage =
        document.getElementById("farmerProducePage");

    const ordersPage =
        document.getElementById("farmerOrdersPage");

    const aiPage =
    document.getElementById("farmerAIPage");

    // Hide dashboard
    if (dashboardContent) {
        dashboardContent.style.setProperty(
            "display",
            "none",
            "important");
            
    }


    // Hide My Produce
    if (producePage) {
        producePage.style.setProperty(
            "display",
            "none",
            "important");
        
    }


    // Show Orders
    if (ordersPage) {
        ordersPage.style.setProperty(
            "display",
            "block",
            "important");

    }

    if (aiPage) {

        aiPage.style.setProperty(
            "display",
            "none",
            "important"
        );

    }
    // else{
    //     console.error("farmerOrdersPage not found");
    //     return;
    // }


    // Load farmer orders
    // displayFarmerOrders();


    // Go to top
    // window.scrollTo({
    //     top: 0,
    //     behavior: "instant"
    // });

    // ordersPage.style.display= "block";

    // if (typeof updateFarmerOrders === "function"){
        displayFarmerOrders();

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }

    function showFarmerEarningsPage() {

    const dashboardContent =
        document.getElementById("farmerDashboardContent");

    const producePage =
        document.getElementById("farmerProducePage");

    const ordersPage =
        document.getElementById("farmerOrdersPage");

    const aiPage =
        document.getElementById("farmerAIPage");

    const logisticsPage =
        document.getElementById("farmerLogisticsPage");

    const earningsPage =
        document.getElementById("farmerEarningsPage");


    // Hide original dashboard
    if (dashboardContent) {
        dashboardContent.style.setProperty(
            "display",
            "none",
            "important"
        );
    }


    // Hide My Produce
    if (producePage) {
        producePage.style.setProperty(
            "display",
            "none",
            "important"
        );
    }


    // Hide Orders
    if (ordersPage) {
        ordersPage.style.setProperty(
            "display",
            "none",
            "important"
        );
    }


    // Hide AI Insights
    if (aiPage) {
        aiPage.style.setProperty(
            "display",
            "none",
            "important"
        );
    }


    // Hide Logistics
    if (logisticsPage) {
        logisticsPage.style.setProperty(
            "display",
            "none",
            "important"
        );
    }


    // Show Earnings
    if (earningsPage) {
        earningsPage.style.setProperty(
            "display",
            "block",
            "important"
        );
    }


    // Start Earnings page from top
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}

}





// function showFarmerLogistics() {

//     const dashboardContent =
//         document.getElementById("farmerDashboardContent");

//     const producePage =
//         document.getElementById("farmerProducePage");

//     const ordersPage =
//         document.getElementById("farmerOrdersPage");

//     const aiPage =
//         document.getElementById("farmerAIPage");

//     /* Hide existing pages */

//     if (dashboardContent) {
//         dashboardContent.style.setProperty(
//             "display",
//             "none",
//             "important"
//         );
//     }

//     if (producePage) {
//         producePage.style.setProperty(
//             "display",
//             "none",
//             "important"
//         );
//     }

//     if (ordersPage) {
//         ordersPage.style.setProperty(
//             "display",
//             "none",
//             "important"
//         );
//     }

//     if (aiPage) {
//         aiPage.style.setProperty(
//             "display",
//             "none",
//             "important"
//         );
//     }


//     /* Create Logistics page */

//     let logisticsPage =
//         document.getElementById("farmerLogisticsPage");


//     if (!logisticsPage) {

//         logisticsPage =
//             document.createElement("section");

//         logisticsPage.id =
//             "farmerLogisticsPage";

//         logisticsPage.className =
//             "dashboard-page";


//         logisticsPage.innerHTML = `

//             <div class="logistics-header">

//                 <div>

//                     <span class="page-label">
//                         DELIVERY MANAGEMENT
//                     </span>

//                     <h1>
//                         Logistics & Delivery 🚚
//                     </h1>

//                     <p>
//                         Track your produce from farm
//                         pickup to buyer delivery.
//                     </p>

//                 </div>


//                 <div class="logistics-status">
//                     <span></span>
//                     SYSTEM ACTIVE
//                 </div>

//             </div>


//             <div class="logistics-stats">

//                 <div class="logistics-stat-card">

//                     <div class="logistics-icon">
//                         🚚
//                     </div>

//                     <div>
//                         <span>
//                             Active Deliveries
//                         </span>

//                         <strong>
//                             2
//                         </strong>
//                     </div>

//                 </div>


//                 <div class="logistics-stat-card">

//                     <div class="logistics-icon">
//                         📦
//                     </div>

//                     <div>
//                         <span>
//                             Pending Pickup
//                         </span>

//                         <strong>
//                             1
//                         </strong>
//                     </div>

//                 </div>


//                 <div class="logistics-stat-card">

//                     <div class="logistics-icon">
//                         ✅
//                     </div>

//                     <div>
//                         <span>
//                             Delivered
//                         </span>

//                         <strong>
//                             12
//                         </strong>
//                     </div>

//                 </div>


//                 <div class="logistics-stat-card">

//                     <div class="logistics-icon">
//                         ⏱️
//                     </div>

//                     <div>
//                         <span>
//                             Avg. Delivery
//                         </span>

//                         <strong>
//                             1.8 Days
//                         </strong>
//                     </div>

//                 </div>

//             </div>


//             <div class="logistics-section-title">

//                 <span>
//                     ACTIVE SHIPMENT
//                 </span>

//                 <h2>
//                     Current Delivery
//                 </h2>

//             </div>


//             <div class="shipment-card">

//                 <div class="shipment-top">

//                     <div>

//                         <small>
//                             SHIPMENT #KD-1024
//                         </small>

//                         <h3>
//                             🌾 Rice — 100 kg
//                         </h3>

//                         <p>
//                             Farmer: <b>Raj</b>
//                             &nbsp; • &nbsp;
//                             Buyer: <b>Full</b>
//                         </p>

//                     </div>


//                     <span class="shipment-badge">
//                         IN TRANSIT
//                     </span>

//                 </div>


//                 <div class="delivery-progress">

//                     <div class="progress-step completed">

//                         <div>✓</div>

//                         <b>Pickup</b>

//                         <small>
//                             Completed
//                         </small>

//                     </div>


//                     <div class="progress-line active"></div>


//                     <div class="progress-step active">

//                         <div>🚚</div>

//                         <b>In Transit</b>

//                         <small>
//                             Current
//                         </small>

//                     </div>


//                     <div class="progress-line"></div>


//                     <div class="progress-step">

//                         <div>3</div>

//                         <b>Out for Delivery</b>

//                         <small>
//                             Pending
//                         </small>

//                     </div>


//                     <div class="progress-line"></div>


//                     <div class="progress-step">

//                         <div>4</div>

//                         <b>Delivered</b>

//                         <small>
//                             Pending
//                         </small>

//                     </div>

//                 </div>


//                 <div class="shipment-info">

//                     <div>

//                         <span>
//                             ESTIMATED ARRIVAL
//                         </span>

//                         <b>
//                             Today, 6:30 PM
//                         </b>

//                     </div>


//                     <div>

//                         <span>
//                             DESTINATION
//                         </span>

//                         <b>
//                             Ranchi, Jharkhand
//                         </b>

//                     </div>


//                     <div>

//                         <span>
//                             TRANSPORT
//                         </span>

//                         <b>
//                             Local Vehicle
//                         </b>

//                     </div>

//                 </div>


//                 <div class="shipment-buttons">

//                     <button
//                         onclick="trackShipment()">

//                         View Tracking →

//                     </button>


//                     <button
//                         class="secondary"
//                         onclick="contactBuyer()">

//                         Contact Buyer

//                     </button>

//                 </div>

//             </div>


//             <div class="logistics-section-title">

//                 <span>
//                     DELIVERY HISTORY
//                 </span>

//                 <h2>
//                     Recent Deliveries
//                 </h2>

//             </div>


//             <div class="delivery-history">

//                 <div class="delivery-row">

//                     <div class="delivery-product">
//                         🍎
//                     </div>

//                     <div class="delivery-details">

//                         <b>
//                             Apple — 100 kg
//                         </b>

//                         <small>
//                             Buyer: Full • Ranchi
//                         </small>

//                     </div>

//                     <span>
//                         Aug 30
//                     </span>

//                     <label>
//                         Delivered
//                     </label>

//                 </div>


//                 <div class="delivery-row">

//                     <div class="delivery-product">
//                         🥭
//                     </div>

//                     <div class="delivery-details">

//                         <b>
//                             Mango — 50 kg
//                         </b>

//                         <small>
//                             Buyer: Full • Ranchi
//                         </small>

//                     </div>

//                     <span>
//                         Aug 29
//                     </span>

//                     <label>
//                         Delivered
//                     </label>

//                 </div>

//             </div>

//         `;


//         const farmerDashboard =
//             document.getElementById(
//                 "farmerDashboard"
//             );


//         if (farmerDashboard) {

//             farmerDashboard.appendChild(
//                 logisticsPage
//             );

//         }

//     }


//     /* Show Logistics */

//     logisticsPage.style.setProperty(
//         "display",
//         "block",
//         "important"
//     );


//     window.scrollTo({
//         top: 0,
//         behavior: "instant"
//     });

// }


    function displayFarmerOrders() {
        updateOrderBadges();

    const ordersList =
        document.getElementById("farmerOrdersList");

    if (!ordersList) {
        console.error("farmerOrdersList not found.");
        return;
    }


    const currentUser =
        JSON.parse(
            sessionStorage.getItem(
                "kisanDirectCurrentUser"
            )
        );


    if (!currentUser || currentUser.role !== "farmer") {

        ordersList.innerHTML = `
            <div class="empty-state">
                <h3>Farmer account not found</h3>
            </div>
        `;

        return;
    }


    const allOrders =
        JSON.parse(
            localStorage.getItem(
                "kisanDirectOrders"
            )
        ) || [];


    const farmerOrders =
        allOrders.filter(
            order =>
            String(order.farmerId) === String(currentUser.mobile)
        );


    // Statistics

    const totalOrders =
        document.getElementById("farmerTotalOrders");

    const pendingOrders =
        document.getElementById("farmerPendingOrders");

    const completedOrders =
        document.getElementById("farmerCompletedOrders");

    const totalSales =
        document.getElementById("farmerTotalSales");


    if (totalOrders) {
        totalOrders.textContent =
            farmerOrders.length;
    }


    const pending =
        farmerOrders.filter(
            order =>
                String(order.status).toLowerCase() ===
                "pending"
        ).length;


    const completed =
        farmerOrders.filter(
            order =>
                String(order.status).toLowerCase() ===
                "completed"
        ).length;


    const sales =
    farmerOrders
        .filter(order =>
            String(order.status).toLowerCase() === "completed"
        )
        .reduce(
            (sum, order) =>
                sum + Number(order.total || 0),
            0
        );
        

    if (pendingOrders) {
        pendingOrders.textContent = pending;
    }


    if (completedOrders) {
        completedOrders.textContent = completed;
    }


    if (totalSales) {
        totalSales.textContent =
            "₹" + sales.toFixed(2);
    }


    // No orders yet

    if (farmerOrders.length === 0) {

        ordersList.innerHTML = `
            <div class="empty-state">

                <div style="font-size:40px;">
                    📦
                </div>

                <h3>No orders yet</h3>

                <p>
                    Orders placed by buyers will appear here.
                </p>

            </div>
        `;

        return;
    }


    // Display orders

    ordersList.innerHTML = "";


    farmerOrders.forEach(order => {

        const card =
            document.createElement("div");

        card.className =
            "farmer-order-card";


        card.innerHTML = `

            <div>

                <h3>
                    ${escapeHTML(
                        order.productName ||
                        "Produce"
                    )}
                </h3>

                <p>
                    Buyer:
                    ${escapeHTML(
                        order.buyerName ||
                        "Buyer"
                    )}
                </p>

                <p>
                    Quantity:
                    ${Number(order.quantity || 0)} kg
                </p>

            </div>


            <div>

            <strong>
                ₹${Number(
                order.total || 0
                ).toFixed(2)}
            </strong>

    <p>
        Status:
        ${escapeHTML(
            order.status ||
            "Pending"
        )}
    </p>

    ${
        String(order.status).toLowerCase() === "pending"
        ? `
            <div style="margin-top:12px; display:flex; gap:8px;">

                <button
                    class="btn btn-primary"
                    onclick="updateOrderStatus('${order.id}', 'Completed')"
                >
                    ✓ Accept
                </button>

                <button
                    class="btn"
                    onclick="updateOrderStatus('${order.id}', 'Rejected')"
                >
                    ✕ Reject
                </button>

            </div>
        `
        : `
            <strong>
                ${escapeHTML(order.status)}
            </strong>
        `
    }

</div>

        `;


        ordersList.appendChild(card);

    });

}


/* =====================================
   FARMER AI INSIGHTS
===================================== */


function showFarmerAIPage() {

    const dashboardContent =
        document.getElementById("farmerDashboardContent");

    const producePage =
        document.getElementById("farmerProducePage");

    const ordersPage =
        document.getElementById("farmerOrdersPage");

    const aiPage =
        document.getElementById("farmerAIPage");

    const logisticsPage =
        document.getElementById("farmerLogisticsPage");


    /* Hide all farmer pages */

    if (dashboardContent) {

        dashboardContent.style.setProperty(
            "display",
            "none",
            "important"
        );

    }

    if (producePage) {

        producePage.style.setProperty(
            "display",
            "none",
            "important"
        );

    }

    if (ordersPage) {

        ordersPage.style.setProperty(
            "display",
            "none",
            "important"
        );

    }

    if (logisticsPage) {
    logisticsPage.style.setProperty(
        "display",
        "none",
        "important"
    );
}


    /* Show AI page */

    if (!aiPage) {

        console.error(
            "❌ farmerAIPage not found"
        );

        return;

    }

    aiPage.style.setProperty(
        "display",
        "block",
        "important"
    );


    /* ---------------------------------
       UPDATE SIDEBAR ACTIVE ITEM
    --------------------------------- */

    const menuItems =
        document.querySelectorAll(
            "#farmerDashboard .dashboard-menu-item"
        );

    menuItems.forEach(item => {

        item.classList.remove("active");

    });


    const aiMenuItem =
        document.querySelector(
            '#farmerDashboard .dashboard-menu-item[onclick*="showFarmerAIPage"]'
        );

    if (aiMenuItem) {

        aiMenuItem.classList.add("active");

    }


    /* ---------------------------------
       INITIALIZE AI
    --------------------------------- */

    const selector =
        document.getElementById("aiCropSelector");

    if (selector) {

        updateAIInsights(selector.value);

    }


    /* Scroll top */

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}



function trackShipment() {

    alert(
        "🚚 Shipment Tracking\n\n" +
        "Shipment: #KD-1024\n" +
        "Crop: Rice — 100 kg\n\n" +
        "✓ Pickup completed\n" +
        "🚚 Currently in transit\n" +
        "○ Out for delivery\n" +
        "○ Delivered\n\n" +
        "📍 Current location: Ranchi\n" +
        "⏱ Estimated arrival: Today, 6:30 PM"
    );

}


function contactBuyer() {

    alert(
        "📞 Buyer Contact\n\n" +
        "Buyer: Full\n" +
        "Location: Ranchi, Jharkhand\n\n" +
        "Demo contact feature"
    );

}



/* =====================================================
   AI ACTION BUTTONS
===================================================== */

function showAIAction(action) {

    const selector =
        document.getElementById("aiCropSelector");

    // const crop =
    //     cropSelect ? cropSelect.value:"Tomato";

    if (!selector) {
        console.error("AI crop selector not found.");
        return;
    }

    const cropKey = selector.value;

    const data = aiCropData[cropKey];

    if (!data) {
        console.error("Crop data not found.");
        return;
    }


    if (action === "supply") {

        alert(
            "🌱 Supply Recommendation\n\n" +
            "Increase " + data.name +
            " supply according to the AI forecast.\n\n" +
            "Suggested increase: " +
            data.supply
        );
        return;

    }


    else if (action === "price") {

        alert(
            "💰 Market Price Insight\n\n" +
            data.name +
            " is showing a " +
            data.priceTrend +
            " price trend.\n\n" +
            "Keep monitoring the market before selling."
        );

    }


    else if (action === "inventory") {

        alert(
            "📦 Inventory Plan\n\n" +
            "Maintain sufficient " +
            data.name +
            " stock to handle expected buyer demand."
        );

    }

}

/* =====================================================
   KISANDIRECT AI CROP INTELLIGENCE
   SIMULATED DATA FOR SIH PROTOTYPE
===================================================== */

const aiCropData = {

    tomato: {

        name: "Tomato",
        emoji: "🍅",

        demand: "+18.4%",
        confidence: 87,
        priceTrend: "↗ Rising",
        supply: "+15%",

        demandLevel: "HIGH DEMAND",

        insight:
            "Tomato demand is expected to rise over the next 14 days.",

        insightAction:
            "Consider increasing supply while monitoring market prices.",

        recommendation:
            "Increase Tomato Supply",

        recommendationText:
            "Tomato demand is predicted to increase over the next 14 days.",

        recommendationValue: "+15%",

        priceText:
            "Market prices are showing an upward trend for tomatoes.",

        inventoryText:
            "Maintain sufficient tomato stock to handle upcoming buyer demand.",

        reasons: [

            {
                title: "Buyer activity increased",
                text: "Simulated buyer activity shows a positive demand pattern."
            },

            {
                title: "Historical demand is rising",
                text: "Previous market patterns indicate increasing demand for tomatoes."
            },

            {
                title: "Market prices are favorable",
                text: "Current simulated prices indicate a positive selling opportunity."
            },

            {
                title: "Seasonal pattern detected",
                text: "Similar seasonal demand patterns were observed in historical data."
            }

        ],

        bars: [35, 45, 52, 62, 70, 82, 95]

    },


    potato: {

        name: "Potato",
        emoji: "🥔",

        demand: "+12.7%",
        confidence: 82,
        priceTrend: "↗ Stable",
        supply: "+10%",

        demandLevel: "MODERATE DEMAND",

        insight:
            "Potato demand is expected to increase steadily over the next 14 days.",

        insightAction:
            "Maintain regular supply and watch regional price movement.",

        recommendation:
            "Maintain Potato Supply",

        recommendationText:
            "Potato demand is showing a steady upward pattern.",

        recommendationValue: "+10%",

        priceText:
            "Potato prices are showing a stable upward movement.",

        inventoryText:
            "Maintain regular inventory to meet expected demand.",

        reasons: [

            {
                title: "Buyer activity is stable",
                text: "Recent simulated buyer activity indicates consistent demand."
            },

            {
                title: "Historical demand is positive",
                text: "Previous market patterns show gradual growth in potato demand."
            },

            {
                title: "Prices remain stable",
                text: "Current simulated prices indicate a relatively stable market."
            },

            {
                title: "Seasonal demand detected",
                text: "Seasonal patterns indicate continued consumer demand."
            }

        ],

        bars: [40, 46, 51, 57, 63, 69, 76]

    },


    onion: {

        name: "Onion",
        emoji: "🧅",

        demand: "+21.3%",
        confidence: 91,
        priceTrend: "↗ Strong Rise",
        supply: "+18%",

        demandLevel: "VERY HIGH DEMAND",

        insight:
            "Onion demand is showing a strong increase over the next 14 days.",

        insightAction:
            "Increase supply gradually and monitor prices closely.",

        recommendation:
            "Increase Onion Supply",

        recommendationText:
            "Onion demand is predicted to rise significantly over the next 14 days.",

        recommendationValue: "+18%",

        priceText:
            "Onion prices are showing a strong upward trend.",

        inventoryText:
            "Prepare additional stock to handle increased buyer demand.",

        reasons: [

            {
                title: "Buyer activity increased sharply",
                text: "Simulated buyer activity indicates strong purchasing interest."
            },

            {
                title: "Historical demand is rising",
                text: "Historical patterns indicate increasing onion consumption."
            },

            {
                title: "Prices are highly favorable",
                text: "Current simulated prices indicate a strong selling opportunity."
            },

            {
                title: "Seasonal demand detected",
                text: "Seasonal patterns indicate higher demand during this period."
            }

        ],

        bars: [42, 52, 61, 70, 79, 89, 100]

    },


    rice: {

        name: "Rice",
        emoji: "🌾",

        demand: "+9.8%",
        confidence: 79,
        priceTrend: "→ Stable",
        supply: "+7%",

        demandLevel: "STEADY DEMAND",

        insight:
            "Rice demand is expected to remain steady with moderate growth.",

        insightAction:
            "Maintain current supply levels and monitor market conditions.",

        recommendation:
            "Maintain Rice Supply",

        recommendationText:
            "Rice demand is expected to remain stable with moderate growth.",

        recommendationValue: "+7%",

        priceText:
            "Rice prices are currently showing a stable market trend.",

        inventoryText:
            "Maintain balanced inventory according to expected demand.",

        reasons: [

            {
                title: "Buyer activity is consistent",
                text: "Simulated buyer activity indicates stable purchasing patterns."
            },

            {
                title: "Historical demand is stable",
                text: "Previous market data indicates consistent rice demand."
            },

            {
                title: "Market prices are stable",
                text: "Current simulated prices show limited price volatility."
            },

            {
                title: "Seasonal pattern detected",
                text: "Seasonal demand patterns indicate continued consumption."
            }

        ],

        bars: [38, 43, 48, 54, 59, 65, 70]

    }

};


/* =====================================================
   UPDATE AI PAGE
===================================================== */

function updateAIInsights(cropKey) {

    const data = aiCropData[cropKey];

    if (!data) return;


    /* ---------------------------------------------
       SUMMARY CARDS
    --------------------------------------------- */

    const summaryCards =
        document.querySelectorAll(
            "#farmerAIPage .ai-summary-card"
        );


    if (summaryCards.length >= 4) {

        /* Expected Demand */

        summaryCards[0]
            .querySelector("strong")
            .textContent = data.demand;


        /* Price Trend */

        summaryCards[1]
            .querySelector("strong")
            .textContent = data.priceTrend;


        /* Best Opportunity */

        summaryCards[2]
            .querySelector("strong")
            .textContent = data.name;


        /* Recommended Supply */

        summaryCards[3]
            .querySelector("strong")
            .textContent = data.supply;

    }


    /* ---------------------------------------------
       FORECAST
    --------------------------------------------- */

    const forecastValue =
        document.querySelector(
            "#farmerAIPage .forecast-info h2"
        );

    if (forecastValue) {

        forecastValue.textContent =
            data.demand;

    }


    /* Demand level */

    const demandElement =
        document.querySelector(
            "#farmerAIPage .high-demand"
        );

    if (demandElement) {

        demandElement.textContent =
            "🔥 " + data.demandLevel;

    }


    /* Confidence */

    const confidenceElements =
        document.querySelectorAll(
            "#farmerAIPage .forecast-details strong"
        );

    if (confidenceElements.length >= 2) {

        confidenceElements[1]
            .textContent =
            data.confidence + "%";

    }


    /* ---------------------------------------------
       CONFIDENCE CARD
    --------------------------------------------- */

    const confidenceValue =
        document.querySelector(
            "#farmerAIPage .confidence-value"
        );

    if (confidenceValue) {

        confidenceValue.textContent =
            data.confidence + "%";

    }


    const confidenceBar =
        document.querySelector(
            "#farmerAIPage .confidence-bar div"
        );

    if (confidenceBar) {

        confidenceBar.style.width =
            data.confidence + "%";

    }


    /* ---------------------------------------------
       QUICK INSIGHT
    --------------------------------------------- */

    const quickInsight =
        document.querySelector(
            "#farmerAIPage .ai-quick-insight"
        );


    if (quickInsight) {

        const strong =
            quickInsight.querySelector("strong");

        const paragraph =
            quickInsight.querySelector("p");


        if (strong) {

            strong.textContent =
                data.insight;

        }


        if (paragraph) {

            paragraph.textContent =
                data.insightAction;

        }


        const quickConfidence =
            quickInsight.querySelector(
                ".insight-confidence strong"
            );


        if (quickConfidence) {

            quickConfidence.textContent =
                data.confidence + "%";

        }

    }


    /* ---------------------------------------------
       FORECAST CHART
    --------------------------------------------- */

    const bars =
        document.querySelectorAll(
            "#farmerAIPage .chart-bars span"
        );


    bars.forEach((bar, index) => {

        if (data.bars[index] !== undefined) {

            bar.style.height =
                data.bars[index] + "%";

        }

    });


    /* ---------------------------------------------
       RECOMMENDATIONS
    --------------------------------------------- */

    const recommendationCards =
        document.querySelectorAll(
            "#farmerAIPage .recommendation-card"
        );


    if (recommendationCards.length >= 3) {

        /* Card 1 */

        const firstTitle =
            recommendationCards[0]
                .querySelector("h3");

        const firstText =
            recommendationCards[0]
                .querySelector("p");

        const firstValue =
            recommendationCards[0]
                .querySelector(
                    ".recommendation-footer strong"
                );


        if (firstTitle)
            firstTitle.textContent =
                data.recommendation;

        if (firstText)
            firstText.textContent =
                data.recommendationText;

        if (firstValue)
            firstValue.textContent =
                data.recommendationValue;


        /* Card 2 */

        const secondText =
            recommendationCards[1]
                .querySelector("p");

        if (secondText)
            secondText.textContent =
                data.priceText;


        /* Card 3 */

        const thirdText =
            recommendationCards[2]
                .querySelector("p");

        if (thirdText)
            thirdText.textContent =
                data.inventoryText;

    }


    /* ---------------------------------------------
       EXPLAINABLE AI
    --------------------------------------------- */

    const reasonItems =
        document.querySelectorAll(
            "#farmerAIPage .reason-item"
        );


    reasonItems.forEach((item, index) => {

        const reason =
            data.reasons[index];

        if (!reason) return;


        const title =
            item.querySelector("strong");

        const text =
            item.querySelector("p");


        if (title)
            title.textContent =
                reason.title;

        if (text)
            text.textContent =
                reason.text;

    });


    /* ---------------------------------------------
       CHANGE SECTION TEXT
    --------------------------------------------- */

    const forecastDescription =
        document.querySelector(
            "#farmerAIPage .ai-section-title p"
        );

    if (forecastDescription) {

        forecastDescription.textContent =
            "AI prediction for " +
            data.name +
            " based on simulated historical market trends, buyer activity and seasonal patterns.";

    }


    /* ---------------------------------------------
       UPDATE PAGE TITLE
    --------------------------------------------- */

    const forecastHeading =
        document.querySelector(
            "#farmerAIPage .ai-section-title h2"
        );

    if (forecastHeading) {

        forecastHeading.innerHTML =
            data.name +
            " Demand Forecast 📊";

    }

    /* ---------------------------------------------
   UPDATE CROP ICONS
--------------------------------------------- */

const cropEmoji = data.emoji;

document.querySelectorAll(
    "#farmerAIPage .recommendation-icon"
).forEach(icon => {

    icon.textContent = cropEmoji;

});

/* UPDATE BEST OPPORTUNITY ICON */

const bestOpportunityIcon =
    document.querySelector(
        "#farmerAIPage .best-opportunity-icon"
    );

if (bestOpportunityIcon) {

    bestOpportunityIcon.textContent =
        data.emoji;

}

}


// function askKisanAI() {

//     const selector =
//         document.getElementById("aiCropSelector");

//     const cropKey =
//         selector ? selector.value : "tomato";

//     const data =
//         aiCropData[cropKey];

//     if (!data) return;


//     alert(
//         "🤖 KisanAI Assistant\n\n" +

//         "Crop: " + data.name + "\n\n" +

//         "📈 Demand: " + data.demand + "\n" +

//         "💰 Price Trend: " + data.priceTrend + "\n" +

//         "📦 Recommended Supply: " + data.supply + "\n\n" +

//         "💡 Advice:\n" +
//         data.insightAction
//     );

// }

function askKisanAI() {

    const selector =
        document.getElementById("aiCropSelector");

    const cropKey =
        selector ? selector.value : "tomato";

    const data =
        aiCropData[cropKey];

    if (!data) return;


    /* Update modal information */

    const cropEmoji =
        document.getElementById("kisanAICropEmoji");

    const cropName =
        document.getElementById("kisanAICropName");

    const demand =
        document.getElementById("kisanAIDemand");

    const price =
        document.getElementById("kisanAIPrice");

    const supply =
        document.getElementById("kisanAISupply");

    const advice =
        document.getElementById("kisanAIAdvice");


    if (cropEmoji)
        cropEmoji.textContent =
            data.emoji;

    if (cropName)
        cropName.textContent =
            data.name;

    if (demand)
        demand.textContent =
            data.demand;

    if (price)
        price.textContent =
            data.priceTrend;

    if (supply)
        supply.textContent =
            data.supply;

    if (advice)
        advice.textContent =
            data.insightAction;


    /* Show modal */

    const modal =
        document.getElementById("kisanAIModal");

    if (modal) {

        modal.classList.add("show");

    }

}


/* =========================================
   CLOSE KISAN AI
========================================= */

function closeKisanAI() {

    const modal =
        document.getElementById("kisanAIModal");

    if (modal) {

        modal.classList.remove("show");

    }

}

/* =====================================================
   INITIALIZE AI CROP SELECTOR
===================================================== */


function initializeAICropSelector() {

    const selector =
        document.getElementById("aiCropSelector");

    if (!selector) return;

    selector.addEventListener("change", function () {

        updateAIInsights(this.value);

    });



    /* Initial data */

    updateAIInsights(
        selector.value
    );
}



/* =====================================================
   START AI SYSTEM
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAICropSelector();

    }
);


/* =====================================
   UPDATE ORDER STATUS
===================================== */

function updateOrderStatus(orderId, newStatus) {

    const allOrders =
        JSON.parse(
            localStorage.getItem(
                "kisanDirectOrders"
            )
        ) || [];

    const orderIndex =
        allOrders.findIndex(
            order =>
                String(order.id) ===
                String(orderId)
        );

    if (orderIndex === -1) {

        notify("Order not found.");

        return;
    }

    allOrders[orderIndex].status =
        newStatus;

    localStorage.setItem(
        "kisanDirectOrders",
        JSON.stringify(allOrders)
    );
    updateOrderBadges();

    if (newStatus === "Completed") {

        notify(
            "Order accepted successfully! ✓"
        );

    } else if (newStatus === "Rejected") {

        notify(
            "Order rejected."
        );

    }

    displayFarmerOrders();
}






/* =====================================
   EDIT PRODUCE
===================================== */

function editProduce(productId) {

    const currentUser =
        JSON.parse(
            sessionStorage.getItem(
                "kisanDirectCurrentUser"
            )
        );

    if (
        !currentUser ||
        currentUser.role !== "farmer"
    ) {
        notify(
            "Please login as a farmer first."
        );

        return;
    }


    const allProduce =
        JSON.parse(
            localStorage.getItem(
                "kisanDirectProduce"
            )
        ) || [];


    const product =
        allProduce.find(
            item =>
                String(item.id) ===
                String(productId) &&
                String(item.farmerId) ===
                String(currentUser.mobile)
        );


    if (!product) {

        notify(
            "Produce listing not found."
        );

        return;
    }


    /* Remember product being edited */

    editingProductId =
        product.id;


    /* Fill existing values */

    document.getElementById(
        "produceName"
    ).value =
        product.name || "";


    document.getElementById(
        "produceCategory"
    ).value =
        product.category || "";


    document.getElementById(
        "produceGrade"
    ).value =
        product.grade || "";


    document.getElementById(
        "produceQuantity"
    ).value =
        product.quantity || "";


    document.getElementById(
        "produceUnit"
    ).value =
        product.unit || "";


    document.getElementById(
        "producePrice"
    ).value =
        product.price || "";


    document.getElementById(
        "produceLocation"
    ).value =
        product.location || "";


    document.getElementById(
        "produceAvailableDate"
    ).value =
        product.availableDate || "";


    /* Open existing modal */

    const modal =
        document.getElementById(
            "addProduceModal"
        );


    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }


    notify(
        "✏️ Editing " +
        product.name
    );
}

function openAddProduce() {

    const currentUser =
        JSON.parse(
            sessionStorage.getItem(
                "kisanDirectCurrentUser"
            )
        );

    if (
        !currentUser ||
        currentUser.role !== "farmer"
    ) {
        notify(
            "Please login as a farmer first."
        );
        return;
    }


    /* Make sure Add Produce starts fresh */

    editingProductId = null;


    const form =
        document.getElementById(
            "addProduceForm"
        );

    if (form) {
        form.reset();
    }


    const modal =
        document.getElementById(
            "addProduceModal"
        );

    if (!modal) {
        console.error(
            "addProduceModal not found."
        );
        return;
    }


    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";
}


/* =====================================
   KISANDIRECT
   STEP 3.3.3 - ADD PRODUCE
===================================== */

/* =====================================
   ADD PRODUCE MODAL
===================================== */



/* =====================================
   CLOSE ADD PRODUCE
===================================== */

function closeAddProduce() {

    const modal =
        document.getElementById("addProduceModal");

    if (modal) {
        modal.classList.remove("show");
    }

    document.body.style.overflow = "";

    const form =
        document.getElementById("addProduceForm");

    if (form) {
        form.reset();
    }

    editingProductId= null;
}


/* =====================================
   SAVE PRODUCE
===================================== */

function saveProduce(event) {

    event.preventDefault();

    /* ================================
       GET CURRENT FARMER
    ================================= */

    const currentUser =
        JSON.parse(
            sessionStorage.getItem(
                "kisanDirectCurrentUser"
            )
        );

    if (
        !currentUser ||
        currentUser.role !== "farmer"
    ) {
        notify("Please login as a farmer first.");
        return;
    }


    /* ================================
       GET FORM VALUES
    ================================= */

    const name =
        document.getElementById("produceName").value.trim();

    const category =
        document.getElementById("produceCategory").value;

    const grade =
        document.getElementById("produceGrade").value;

    const quantity =
        Number(
            document.getElementById("produceQuantity").value
        );

    const unit =
        document.getElementById("produceUnit").value;

    const price =
        Number(
            document.getElementById("producePrice").value
        );

    const location =
        document.getElementById("produceLocation").value.trim();

    const availableDate =
        document.getElementById("produceAvailableDate").value;


    /* ================================
       VALIDATION
    ================================= */

    if (!name) {
        notify("Please enter the produce name.");
        return;
    }

    if (!category) {
        notify("Please select a category.");
        return;
    }

    if (!grade) {
        notify("Please select the produce grade.");
        return;
    }

    if (!quantity || quantity <= 0) {
        notify("Please enter a valid quantity.");
        return;
    }

    if (!unit) {
        notify("Please select the unit.");
        return;
    }

    if (!price || price <= 0) {
        notify("Please enter a valid price.");
        return;
    }

    if (!location) {
        notify("Please enter the location.");
        return;
    }

    if (!availableDate) {
        notify("Please select the available date.");
        return;
    }


    /* ================================
       GET EXISTING PRODUCE
    ================================= */

    let allProduce =
        JSON.parse(
            localStorage.getItem(
                "kisanDirectProduce"
            )
        ) || [];


    /* ================================
       EDIT EXISTING PRODUCT
    ================================= */

    if (editingProductId) {

        const index =
            allProduce.findIndex(
                item =>
                    String(item.id) ===
                    String(editingProductId) &&
                    String(item.farmerId) ===
                    String(currentUser.mobile)
            );


        if (index === -1) {

            notify(
                "Produce listing not found."
            );

            return;
        }


        /* Keep original ID and farmer information */

        allProduce[index] = {

            ...allProduce[index],

            name: name,

            category: category,

            grade: grade,

            quantity: quantity,

            unit: unit,

            price: price,

            location: location,

            availableDate: availableDate,

            updatedAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "kisanDirectProduce",
            JSON.stringify(allProduce)
        );


        /* Reset editing mode */

        editingProductId = null;


        /* Refresh page data */

        displayProducts();

        updateProduceStats();


        /* Close modal */

        closeAddProduce();


        notify(
            "✏️ " +
            name +
            " updated successfully!"
        );


        return;
    }


    /* ================================
       ADD NEW PRODUCT
    ================================= */

    const produce = {

        id:
            "PRD-" +
            Date.now(),

        farmerId:
            currentUser.mobile,

        farmerName:
            currentUser.name,

        name:
            name,

        category:
            category,

        grade:
            grade,

        quantity:
            quantity,

        unit:
            unit,

        price:
            price,

        location:
            location,

        availableDate:
            availableDate,

        status:
            "Active",

        createdAt:
            new Date().toISOString()

    };


    /* Add new listing */

    allProduce.push(produce);


    /* Save */

    localStorage.setItem(
        "kisanDirectProduce",
        JSON.stringify(allProduce)
    );


    /* Refresh */

    displayProducts();

    updateProduceStats();


    /* Close modal */

    closeAddProduce();


    /* Success */

    notify(
        "🌾 " +
        name +
        " listed successfully!"
    );


    console.log(
        "New produce:",
        produce
    );
}


/* =====================================
   GET CURRENT FARMER'S PRODUCE
===================================== */

function getCurrentFarmerProduce() {

    const currentUser =
        JSON.parse(
            sessionStorage.getItem(
                "kisanDirectCurrentUser"
            )
        );


    if (
        !currentUser ||
        currentUser.role !== "farmer"
    ) {
        return [];
    }


    const allProduce =
        JSON.parse(
            localStorage.getItem(
                "kisanDirectProduce"
            )
        ) || [];


    return allProduce.filter(
        product =>
        String (product.farmerId) ===
        String (currentUser.mobile)
    );
}


/* =====================================
   PRODUCE ICON
===================================== */

function getProduceIcon(category, name) {

    const text =
        (
            category +
            " " +
            name
        ).toLowerCase();


    if (
        text.includes("tomato")
    ) {
        return "🍅";
    }

    if (
        text.includes("potato")
    ) {
        return "🥔";
    }

    if (
        text.includes("rice")
    ) {
        return "🌾";
    }

    if (
        text.includes("wheat")
    ) {
        return "🌾";
    }

    if (
        text.includes("mango")
    ) {
        return "🥭";
    }

    if (
        text.includes("apple")
    ) {
        return "🍎";
    }

    if (
        text.includes("banana")
    ) {
        return "🍌";
    }

    if (
        text.includes("vegetable")
    ) {
        return "🥬";
    }

    if (
        text.includes("fruit")
    ) {
        return "🍎";
    }

    if (
        text.includes("grain")
    ) {
        return "🌾";
    }

    return "🌱";
}


/* =====================================
   DISPLAY PRODUCTS
===================================== */

function displayProducts() {

    const produceTable =
        document.querySelector(
            "#farmerProducePage .produce-table"
        );


    if (!produceTable) {
        console.log(
            "Produce table not found."
        );

        return;
    }


    const products =
        getCurrentFarmerProduce();


    /* ---------------------------------
       KEEP TABLE HEADER
    --------------------------------- */

    const header =
        produceTable.querySelector(
            ".produce-header"
        );


    produceTable.innerHTML = "";


    if (header) {
        produceTable.appendChild(header);
    }


    /* ---------------------------------
       EMPTY STATE
    --------------------------------- */

    if (products.length === 0) {

        const emptyRow =
            document.createElement("div");

        emptyRow.className =
            "produce-row";


        emptyRow.innerHTML = `

            <div
                style="
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 40px 20px;
                    color: #89968f;
                "
            >

                <div
                    style="
                        font-size: 34px;
                        margin-bottom: 10px;
                    "
                >
                    🌱
                </div>

                <strong
                    style="
                        display: block;
                        color: #44524b;
                        margin-bottom: 5px;
                    "
                >
                    No produce listed yet
                </strong>

                <small>
                    Click "Add Produce" to create your
                    first listing.
                </small>

            </div>
        `;


        produceTable.appendChild(
            emptyRow
        );

        return;
    }


    /* ---------------------------------
       CREATE PRODUCT ROWS
    --------------------------------- */

    products.forEach(
        product => {

            const row =
                document.createElement("div");

            row.className =
                "produce-row";


            const icon =
                getProduceIcon(
                    product.category,
                    product.name
                );


            row.innerHTML = `

                <div class="produce-name">

                    <span class="produce-icon">
                        ${icon}
                    </span>

                    <div>

                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                        <small>
                            ${escapeHTML(product.grade)}
                            •
                            ${escapeHTML(product.location)}
                        </small>

                    </div>

                </div>
                
                
                <span>
                    ${Number(product.quantity).toLocaleString("en-IN")}
                    ${escapeHTML(product.unit)}
                </span>


                <strong>
                    ₹${Number(product.price).toFixed(2)}
                    /${product.unit === "kg" ? "kg" : product.unit}
                </strong>


                <span class="produce-status active">
                    ${escapeHTML(product.status || "Active")}
                </span>


                <div class="produce-actions">

                    <button
                        class="produce-action edit"
                        onclick="editProduce('${product.id}')"
                    >
                        Edit
                    </button>

                    <button
                        class="produce-action delete"
                        onclick="deleteProduce('${product.id}')"
                    >
                        Delete
                    </button>

                </div>
            `;


            produceTable.appendChild(
                row
            );
        }
    );
}


/* =====================================
   DELETE PRODUCE
===================================== */

function deleteProduce(productId) {

    const currentUser =
        JSON.parse(
            sessionStorage.getItem(
                "kisanDirectCurrentUser"
            )
        );


    if (
        !currentUser ||
        currentUser.role !== "farmer"
    ) {
        notify(
            "Please login as a farmer."
        );

        return;
    }


    let allProduce =
        JSON.parse(
            localStorage.getItem(
                "kisanDirectProduce"
            )
        ) || [];


    const product =
        allProduce.find(
            item =>
            String (item.id) === String(productId) &&
            String (item.farmerId) ===
            String(currentUser.mobile)
        );


    if (!product) {

        notify(
            "Produce listing not found.");
        console.log("Delete failed:",{
            productId: productId,
            currentUser: currentUser,
            allProduce: allProduce
        });

        return;
    }


    const confirmed =
        confirm(
            "Delete " +
            product.name +
            " from your produce listings?"
        );


    if (!confirmed) {
        return;
    }


    allProduce =
        allProduce.filter(
            item =>
                !(
                String (item.id) === String(productId) &&
                String  (item.farmerId) ===
                String (currentUser.mobile)
                )
        );


    localStorage.setItem(
        "kisanDirectProduce",
        JSON.stringify(allProduce)
    );


    displayProducts();
    updateProduceStats();

    notify(
        "🗑️ " +
        product.name +
        " removed successfully."
    );

    console.log("Deleted produce:", product);
}


/* =====================================
   SIMPLE HTML ESCAPE
===================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================
   LOAD PRODUCTS WHEN PAGE IS READY
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayProducts();

        updateProduceStats();
        });
        
        
    function updateProduceStats() {
        const products = getCurrentFarmerProduce();

    // Total Listings
    const totalListings =
        document.getElementById("totalListings");

    if (totalListings) {
        totalListings.textContent = products.length;
    }


    // Total Stock
    let totalKg = 0;

    products.forEach(product => {

        const quantity = Number(product.quantity) || 0;
        const unit = String(product.unit || "").toLowerCase();

        if (unit === "kg") {
            totalKg += quantity;
        }

        if (unit === "ton" || unit === "tons") {
            totalKg += quantity * 1000;
        }
    });


    const totalStock =
        document.getElementById("totalStock");

    if (totalStock) {

        totalStock.textContent =
        totalKg.toLocaleString("en-IN")+ "kg";
    }


    // Average Price
    let averagePrice = 0;

    if (products.length > 0) {

        let totalPrice = 0;

        products.forEach(product => {
            totalPrice += Number(product.price) || 0;
        });

        averagePrice =
            totalPrice / products.length;
    }


    const averagePriceElement =
        document.getElementById("averagePrice");

    if (averagePriceElement) {
        averagePriceElement.textContent =
            "₹" + averagePrice.toFixed(2);
    }


    // Sales will be connected with Orders later
    const todaySales =
        document.getElementById("todaySales");

    if (todaySales) {
        todaySales.textContent = "₹0";
    }
}


/* =====================================
   PLACE ORDER
===================================== */

function placeOrder(productIndex) {

    const allProduce =
        JSON.parse(
            localStorage.getItem("kisanDirectProduce")
        ) || [];

    const product = allProduce[productIndex];

    if (!product) {
        notify("Product not found.");
        return;
    }

    const currentUser =
        JSON.parse(
            sessionStorage.getItem("kisanDirectCurrentUser")
        );

    if (!currentUser || currentUser.role !== "buyer") {
        notify("Please login as a buyer first.");
        return;
    }

    const quantity = prompt(
        `How many kg of ${product.name} would you like to order?\n\nAvailable: ${product.quantity} kg`
    );

    if (quantity === null) {
        return;
    }

    const qty = Number(quantity);

    if (!qty || qty <= 0) {
        notify("Please enter a valid quantity.");
        return;
    }

    if (qty > Number(product.quantity)) {
        notify("Not enough stock available.");
        return;
    }

    const total =
        qty * Number(product.price);

    const order = {

        id:
            "KD-" +
            Date.now(),

        productName:
            product.name,

        farmerId:
            product.farmerId,

        farmerName:
            product.farmerName || "Farmer",

        buyerId:
            currentUser.mobile,

        buyerName:
            currentUser.name,

        quantity:
            qty,

        price:
            Number(product.price),

        total:
            total,

        status:
            "Pending",

        date:
            new Date().toLocaleString()

    };

    /* Get existing orders */

    const allOrders =
        JSON.parse(
            localStorage.getItem(
                "kisanDirectOrders"
            )
        ) || [];

    /* Add new order */

    allOrders.push(order);

    /* Save orders */

    localStorage.setItem(
        "kisanDirectOrders",
        JSON.stringify(allOrders)
    );

    /* Reduce available stock */

    product.quantity =
        Number(product.quantity) - qty;

    localStorage.setItem(
        "kisanDirectProduce",
        JSON.stringify(allProduce)
    );

    notify(
        `Order placed successfully! 🎉\nTotal: ₹${total.toFixed(2)}`
    );

    /* Refresh marketplace */

    displayMarketplace();

}

/* =====================================
   UPDATE ORDER BADGES
===================================== */

function updateOrderBadges() {

    const allOrders =
        JSON.parse(
            localStorage.getItem("kisanDirectOrders")
        ) || [];


    const currentUser =
        JSON.parse(
            sessionStorage.getItem(
                "kisanDirectCurrentUser"
            )
        );


    if (!currentUser) {
        return;
    }


    /* ---------------------------------
       BUYER BADGE
    --------------------------------- */

    if (currentUser.role === "buyer") {

        const buyerOrders =
            allOrders.filter(order =>
                String(order.buyerId) ===
                String(currentUser.mobile)
            );


        const pendingBuyerOrders =
            buyerOrders.filter(order =>
                String(order.status)
                    .toLowerCase() === "pending"
            );


        const buyerBadge =
            document.getElementById(
                "buyerOrdersCount"
            );


        if (buyerBadge) {

            buyerBadge.textContent =
                pendingBuyerOrders.length;

        }

    }


    /* ---------------------------------
       FARMER BADGE
    --------------------------------- */

    if (currentUser.role === "farmer") {

        const farmerOrders =
            allOrders.filter(order =>
                String(order.farmerId) ===
                String(currentUser.mobile)
            );


        const pendingFarmerOrders =
            farmerOrders.filter(order =>
                String(order.status)
                    .toLowerCase() === "pending"
            );


        const farmerBadge =
            document.getElementById(
                "farmerOrdersCount"
            );


        if (farmerBadge) {

            farmerBadge.textContent =
                pendingFarmerOrders.length;

        }

    }

}

/* =====================================================
   AI INSIGHTS - EXPLAINABLE AI
   ===================================================== */

function toggleAIExplanation() {

    const explanation =
        document.getElementById("aiExplanation");

    const button =
        document.querySelector(".explain-button");

    if (!explanation || !button) {
        return;
    }

    if (
        explanation.style.display === "none" ||
        explanation.style.display === ""
    ) {

        explanation.style.display = "grid";

        button.textContent = "Hide Reasoning";

    } else {

        explanation.style.display = "none";

        button.textContent = "View Reasoning";

    }

}

function showDeliveryDetails() {

    notify(
        "📦 Shipment Details\n\n" +
        "Shipment: KD-1024\n" +
        "Product: Onion\n" +
        "Quantity: 100 kg\n" +
        "Buyer: Ratu Fresh Mart\n" +
        "Destination: Ratu, Ranchi\n" +
        "Status: In Transit"
    );

}

function showFarmerLogisticsPage() {

    const farmerDashboard =
        document.getElementById("farmerDashboard");

    const dashboardContent =
        document.getElementById("farmerDashboardContent");

    const producePage =
        document.getElementById("farmerProducePage");

    const ordersPage =
        document.getElementById("farmerOrdersPage");

    const aiPage =
        document.getElementById("farmerAIPage");


    /* ================================
       HIDE OTHER FARMER PAGES
    ================================= */

    if (dashboardContent) {
        dashboardContent.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (producePage) {
        producePage.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (ordersPage) {
        ordersPage.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (aiPage) {
        aiPage.style.setProperty(
            "display",
            "none",
            "important"
        );
    }


    /* ================================
       CHECK DASHBOARD
    ================================= */

    if (!farmerDashboard) {
        console.error("farmerDashboard not found");
        return;
    }


    /* ================================
       GET / CREATE LOGISTICS PAGE
    ================================= */

    let logisticsPage =
        document.getElementById("farmerLogisticsPage");


    if (!logisticsPage) {

        logisticsPage =
            document.createElement("section");

        logisticsPage.id =
            "farmerLogisticsPage";

        logisticsPage.className =
            "dashboard-content";


        logisticsPage.innerHTML = `

            <div class="logistics-header">

                <div>

                    <span class="page-label">
                        FARMER LOGISTICS
                    </span>

                    <h1>
                        Delivery Management 🚚
                    </h1>

                    <p>
                        Track your produce from farm pickup
                        to buyer delivery.
                    </p>

                </div>


                <div class="logistics-status">

                    <span></span>

                    Logistics Active

                </div>

            </div>


            <div class="logistics-stats">

                <div class="logistics-stat-card">

                    <div class="logistics-icon">
                        📦
                    </div>

                    <div>

                        <span>
                            Pending Pickup
                        </span>

                        <strong>
                            1
                        </strong>

                    </div>

                </div>


                <div class="logistics-stat-card">

                    <div class="logistics-icon">
                        🚚
                    </div>

                    <div>

                        <span>
                            In Transit
                        </span>

                        <strong>
                            1
                        </strong>

                    </div>

                </div>


                <div class="logistics-stat-card">

                    <div class="logistics-icon">
                        ✅
                    </div>

                    <div>

                        <span>
                            Delivered
                        </span>

                        <strong>
                            12
                        </strong>

                    </div>

                </div>


                <div class="logistics-stat-card">

                    <div class="logistics-icon">
                        ⏱️
                    </div>

                    <div>

                        <span>
                            Avg. Delivery
                        </span>

                        <strong>
                            1.8d
                        </strong>

                    </div>

                </div>

            </div>


            <div class="logistics-section-title">

                <span>
                    ACTIVE SHIPMENT
                </span>

                <h2>
                    Current Delivery
                </h2>

            </div>


            <div class="shipment-card">

                <div class="shipment-top">

                    <div>

                        <small>
                            SHIPMENT #KD-1024
                        </small>

                        <h3>
                            🧅 Onion — 100 kg
                        </h3>

                        <p>
                            Order from Ratu Fresh Mart
                        </p>

                    </div>


                    <div class="shipment-badge">
                        IN TRANSIT
                    </div>

                </div>


                <div class="delivery-progress">

                    <div class="progress-step completed">

                        <div>
                            🌾
                        </div>

                        <b>
                            Picked Up
                        </b>

                        <small>
                            9:15 AM
                        </small>

                    </div>


                    <div class="progress-line active"></div>


                    <div class="progress-step active">

                        <div>
                            🚚
                        </div>

                        <b>
                            In Transit
                        </b>

                        <small>
                            Now
                        </small>

                    </div>


                    <div class="progress-line"></div>


                    <div class="progress-step">

                        <div>
                            📍
                        </div>

                        <b>
                            Out for Delivery
                        </b>

                        <small>
                            Pending
                        </small>

                    </div>


                    <div class="progress-line"></div>


                    <div class="progress-step">

                        <div>
                            ✅
                        </div>

                        <b>
                            Delivered
                        </b>

                        <small>
                            Pending
                        </small>

                    </div>

                </div>


                <div class="shipment-info">

                    <div>

                        <span>
                            BUYER
                        </span>

                        <b>
                            Ratu Fresh Mart
                        </b>

                    </div>


                    <div>

                        <span>
                            DESTINATION
                        </span>

                        <b>
                            Ratu, Ranchi
                        </b>

                    </div>


                    <div>

                        <span>
                            EST. ARRIVAL
                        </span>

                        <b>
                            Today • 10:40 AM
                        </b>

                    </div>

                </div>


                <div class="shipment-buttons">

                    <button
                        onclick="trackDelivery()">

                        🚚 Track Delivery

                    </button>


                    <button
                        class="secondary"
                        onclick="showDeliveryDetails()">

                        View Details

                    </button>

                </div>

            </div>


            <div class="logistics-section-title">

                <span>
                    RECENT ACTIVITY
                </span>

                <h2>
                    Delivery History
                </h2>

            </div>


            <div class="delivery-history">

                <div class="delivery-row">

                    <div class="delivery-product">
                        🥔
                    </div>

                    <div class="delivery-details">

                        <b>
                            Potato — 150 kg
                        </b>

                        <small>
                            Delivered to Ranchi Market
                        </small>

                    </div>

                    <span>
                        28 Aug
                    </span>

                    <label>
                        DELIVERED
                    </label>

                </div>


                <div class="delivery-row">

                    <div class="delivery-product">
                        🍅
                    </div>

                    <div class="delivery-details">

                        <b>
                            Tomato — 80 kg
                        </b>

                        <small>
                            Delivered to Ratu Fresh Mart
                        </small>

                    </div>

                    <span>
                        25 Aug
                    </span>

                    <label>
                        DELIVERED
                    </label>

                </div>


                <div class="delivery-row">

                    <div class="delivery-product">
                        🧅
                    </div>

                    <div class="delivery-details">

                        <b>
                            Onion — 120 kg
                        </b>

                        <small>
                            Delivered to City Wholesale
                        </small>

                    </div>

                    <span>
                        22 Aug
                    </span>

                    <label>
                        DELIVERED
                    </label>

                </div>

            </div>

        `;


        /*
           IMPORTANT:
           Put logistics inside the same
           main area as the other farmer pages.
        */

        farmerDashboard.appendChild(
            logisticsPage
        );

    }


    /* ================================
       SHOW LOGISTICS
    ================================= */

    logisticsPage.style.setProperty(
        "display",
        "block",
        "important"
    );


    /* ================================
       SCROLL TOP
    ================================= */

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}

function showFarmerEarningsPage() {

    const dashboardContent =
        document.getElementById("farmerDashboardContent");

    const producePage =
        document.getElementById("farmerProducePage");

    const ordersPage =
        document.getElementById("farmerOrdersPage");

    const aiPage =
        document.getElementById("farmerAIPage");

    const logisticsPage =
        document.getElementById("farmerLogisticsPage");

    const earningsPage =
        document.getElementById("farmerEarningsPage");


    // Hide all other pages

    [
        dashboardContent,
        producePage,
        ordersPage,
        aiPage,
        logisticsPage
    ].forEach(page => {

        if (page) {

            page.style.setProperty(
                "display",
                "none",
                "important"
            );

        }

    });


    // Show Earnings

    if (!earningsPage) {

        console.error("❌ farmerEarningsPage not found");

        return;

    }


    earningsPage.style.setProperty(
        "display",
        "block",
        "important"
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}

/* =========================================
   BUYER - FARMERS PAGE
   ========================================= */

// function buyerFarmers() {

//     const dashboard = document.getElementById("buyerDashboard");
//     const farmersPage = document.getElementById("buyerFarmersPage");

//     if (!dashboard) {
//         console.error("Buyer dashboard not found");
//         return;
//     }

//     if (!farmersPage) {
//         console.error("Buyer Farmers page not found");
//         return;
//     }

//     /* Hide all buyer subpages */
//     const pages = dashboard.querySelectorAll(".dashboard-subpage");

//     pages.forEach(page => {
//         page.style.display = "none";
//     });

//     /* Hide dashboard main content */
//     const dashboardContent =
//         dashboard.querySelector(".dashboard-content");

//     if (dashboardContent) {
//         dashboardContent.style.display = "none";
//     }

//     /* Show Farmers page */
//     farmersPage.style.display = "block";

//     /* Make Farmers button active */
//     const buttons =
//         dashboard.querySelectorAll(".dashboard-menu-item");

//     buttons.forEach(button => {
//         button.classList.remove("active");
//     });

//     const farmerButton =
//         Array.from(buttons).find(button =>
//             button.textContent.trim().includes("Farmers")
//         );

//     if (farmerButton) {
//         farmerButton.classList.add("active");
//     }

//     console.log("Buyer Farmers page opened");
// }

/* =========================================
   BUYER - FARMERS PAGE
   FINAL VERSION
   ========================================= */

function buyerFarmers(button) {

    const dashboard =
        document.getElementById("buyerDashboard");

    const farmersPage =
        document.getElementById("buyerFarmersPage");

    if (!dashboard) {
        console.error("Buyer dashboard not found.");
        return;
    }

    if (!farmersPage) {
        console.error("Buyer Farmers page not found.");
        return;
    }

    /* =====================================
       HIDE EVERYTHING FIRST
    ===================================== */

    hideAllBuyerPages();


    /* =====================================
       SHOW FARMERS ONLY
    ===================================== */

    farmersPage.style.setProperty(
        "display",
        "block",
        "important"
    );


    /* =====================================
       ACTIVE SIDEBAR BUTTON
    ===================================== */

    setBuyerActiveButton(button);


    /* =====================================
       SCROLL TO TOP
    ===================================== */

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    console.log("Buyer Farmers page opened.");
}


/* =========================================
   BUYER - SHOW FARMER PROFILE
   ========================================= */

function openFarmerProfile(name) {

    const farmers = {
        "Ramesh Kumar": {
            location: "Ranchi",
            crops: "Tomato & Vegetables",
            rating: "4.8",
            orders: "42"
        },

        "Suresh Mahto": {
            location: "Khunti",
            crops: "Rice & Wheat",
            rating: "4.7",
            orders: "36"
        },

        "Anita Devi": {
            location: "Ramgarh",
            crops: "Potato & Onion",
            rating: "4.9",
            orders: "51"
        }
    };

    const farmer = farmers[name];

    if (!farmer) {
        alert("Farmer information not available.");
        return;
    }

    const modal = document.createElement("div");

    modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.55);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        padding: 20px;
    `;

    modal.innerHTML = `
        <div style="
            background:white;
            width:450px;
            max-width:95%;
            border-radius:22px;
            padding:30px;
            position:relative;
            box-shadow:0 25px 70px rgba(0,0,0,.3);
            font-family:Arial,sans-serif;
        ">

            <button
                onclick="this.closest('.farmer-profile-popup').remove()"
                style="
                    position:absolute;
                    right:15px;
                    top:15px;
                    width:35px;
                    height:35px;
                    border:none;
                    border-radius:50%;
                    background:#eef5f1;
                    font-size:24px;
                    cursor:pointer;
                ">
                ×
            </button>

            <div style="
                width:70px;
                height:70px;
                background:#e8f7ee;
                border-radius:20px;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:38px;
                margin-bottom:15px;
            ">
                👨‍🌾
            </div>

            <h2 style="
                margin:0;
                color:#123d30;
            ">
                ${name}
            </h2>

            <div style="
                display:inline-block;
                margin-top:8px;
                padding:6px 12px;
                border-radius:20px;
                background:#e8f7ee;
                color:#168052;
                font-size:12px;
                font-weight:bold;
            ">
                ✓ Verified Farmer
            </div>

            <p style="color:#71827b;">
                Trusted KisanDirect farmer
            </p>

            <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:12px;
                margin-top:22px;
            ">

                <div style="
                    background:#f7faf8;
                    padding:15px;
                    border-radius:14px;
                ">
                    📍<br>
                    <small>Location</small><br>
                    <strong>${farmer.location}</strong>
                </div>

                <div style="
                    background:#f7faf8;
                    padding:15px;
                    border-radius:14px;
                ">
                    🌾<br>
                    <small>Main Crops</small><br>
                    <strong>${farmer.crops}</strong>
                </div>

                <div style="
                    background:#f7faf8;
                    padding:15px;
                    border-radius:14px;
                ">
                    ⭐<br>
                    <small>Rating</small><br>
                    <strong>${farmer.rating} / 5</strong>
                </div>

                <div style="
                    background:#f7faf8;
                    padding:15px;
                    border-radius:14px;
                ">
                    📦<br>
                    <small>Orders</small><br>
                    <strong>${farmer.orders}</strong>
                </div>

            </div>

            <button
            onclick="contactFarmer('${farmer.name}')"
                style="
                    width:100%;
                    margin-top:22px;
                    padding:14px;
                    border:none;
                    border-radius:12px;
                    background:#168052;
                    color:white;
                    font-weight:bold;
                    cursor:pointer;
                ">
                📞 Contact Farmer
            </>

        </div>
    `;

    modal.className = "farmer-profile-popup";

    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
}


function closeFarmerProfile(event) {

    // If clicked inside something other than overlay
    if (event && event.target !== event.currentTarget) {
        return;
    }

    const modal =
        document.getElementById("farmerProfileModal");

    if (modal) {
        modal.classList.remove("show");

        setTimeout(() => {
            modal.remove();
        }, 200);
    }
}


function contactFarmer(name) {

    // If name was not passed, get it from the currently open farmer profile
    if (!name || name === "undefined") {

        // Try to find the farmer name from the open profile popup
        const popup = document.querySelector(
            ".farmer-profile-popup, .farmer-profile-modal, .farmer-profile"
        );

        if (popup) {
            const heading = popup.querySelector("h2, h3");

            if (heading) {
                name = heading.textContent.trim();
            }
        }
    }

    // Final safety check
    if (!name || name === "undefined") {
        alert("Unable to identify this farmer.");
        return;
    }

    // Clean the name
    name = String(name).trim();

    const farmerKey = name.toLowerCase();

    const contacts = {

        "ramesh kumar": {
            phone: "+91 90000 00001",
            whatsapp: "919000000001"
        },

        "suresh mahto": {
            phone: "+91 90000 00002",
            whatsapp: "919000000002"
        },

        "anita devi": {
            phone: "+91 90000 00003",
            whatsapp: "919000000003"
        }

    };

    const farmer = contacts[farmerKey];

    if (!farmer) {
        alert(
            "Contact details are not available for:\n\n" +
            name
        );
        return;
    }

    const openWhatsApp = confirm(
        "Contact " + name + "\n\n" +
        "Phone: " + farmer.phone + "\n\n" +
        "OK → Open WhatsApp\n" +
        "Cancel → Call Farmer"
    );

    if (openWhatsApp) {

        const message =
            "Hello " + name +
            ", I found you on KisanDirect. " +
            "I would like to know more about your farm products.";

        window.open(
            "https://wa.me/" +
            farmer.whatsapp +
            "?text=" +
            encodeURIComponent(message),
            "_blank"
        );

    } else {

        window.location.href = "tel:" + farmer.phone;

    }
}




const translations = {

    en: {
        home: "Home",
        marketplace: "Marketplace",
        howItWorks: "How It Works",
        aiSolutions: "AI Solutions",
        login: "Login",
        joinNow: "Join Now",

        badge: "AI-Powered Agricultural Marketplace",
        heroTitle1: "From Farm",
        heroTitle2: "Directly to",
        heroTitle3: "Market.",
        heroText:
            "KisanDirect connects farmers and FPOs directly with consumers and bulk buyers, helping farmers earn better prices while reducing supply-chain inefficiencies.",

        explore: "Explore Marketplace",
        joinFarmer: "Join as Farmer",

        smartAgriculture: "Smart Agriculture",
        smartText:
            "Connecting farmers, buyers and logistics through one platform.",

        aiMarket: "AI Market Intelligence",
        demand: "Expected demand growth over the next 14 days",
        recommendation: "AI Recommendation",

        farmers: "Farmers",
        buyers: "Buyers",
        states: "States",
        farmerSales: "Farmer Sales",

        farmer: "Farmer",
        buyer: "Buyer",

        freshFromFarm: "FRESH FROM FARM",
        farmerMarketplace: "Farmer Marketplace",
        marketText: "Buy fresh produce directly from farmers at transparent prices.",

        whyKisanDirect: "WHY KISANDIRECT",
        smarterSupplyChain: "A smarter agricultural supply chain.",

        directMarketplace: "Direct Marketplace",
        directMarketplaceText: "Connect farmers directly with consumers and bulk buyers.",

        aiDemandForecasting: "AI Demand Forecasting",
        aiDemandForecastingText: "Predict upcoming demand and help farmers make smarter selling decisions.",

        smartLogistics: "Smart Logistics",
        smartLogisticsText: "Optimize routes and reduce transportation costs.",

        betterPrices: "Better Prices",
        betterPricesText: "Reduce unnecessary intermediaries and improve farmer earnings.",

        artificialIntelligence: "ARTIFICIAL INTELLIGENCE",

        predictOptimize: "Predict demand. Optimize supply.",

        aiEngineText: "Our AI engine analyzes market trends, historical demand and buyer activity to help farmers decide what to sell, when to sell and where to send it.",

        exploreAIInsights: "Explore AI Insights →",

        demandForecast: "Demand Forecast",
        liveDemo: "● LIVE DEMO",
        expectedDemandGrowth: "Expected demand growth",

        farmerAccount: "Farmer Account",

        dashboard: "Dashboard",
        myProduce: "My Produce",
        orders: "Orders",
        aiInsights: "AI Insights",
        logistics: "Logistics",
        earnings: "Earnings",
        settings: "Settings",
        logout: "Logout",

        farmerPortal: "FARMER PORTAL",
        goodMorning: "Good morning,",
        farmTodayMessage: "Here's what's happening with your farm today.",

        totalSales: "Total Sales",
        comparedLastMonth: "Compared to last month",

        activeOrders: "Active Orders",
        readyForDispatch: "4 ready for dispatch",

        produceListed: "Produce Listed",
        availableForBuyers: "Available for buyers",

        avgPrice: "Avg. Price",
        betterThanMandi: "Better than mandi",

        aiMarketIntelligence: "AI MARKET INTELLIGENCE",
        demandForecast: "Demand Forecast",
        liveDemo: "• LIVE DEMO",
        expectedDemandGrowth: "Expected demand growth",
        highDemand: "HIGH DEMAND ↑",

        aiRecommendation: "AI Recommendation",
        tomatoRecommendation: "Tomato demand may increase over the next 14 days. Consider increasing supply by 15%.",

        quickActions: "QUICK ACTIONS",
        manageFarm: "Manage Farm",

        listProduce: "List Produce",
        sellYourCrops: "Sell your crops",

        viewOrders: "View Orders",
        manageOrders: "Manage orders",

        trackDelivery: "Track Delivery",
        viewShipments: "View shipments",

        aiInsights: "AI Insights",
        marketPredictions: "Market predictions",

        recentActivity: "RECENT ACTIVITY",
        recentOrders: "Recent Orders",
        viewAll: "View all →",

        inTransit: "In Transit",
        delivered: "Delivered",
        processing: "Processing",

        farmerAccount: "Farmer Account",
      
        market: "MARKET",
        todaysPrices: "Today's Prices",

        salesManagement: "SALES MANAGEMENT",
        ordersReceived: "Orders Received 📦",
        manageBuyerOrders: "View and manage orders placed by buyers.",

        totalOrders: "Total Orders",
        pending: "Pending",
        completed: "Completed",
        totalSales: "Total Sales",

        recentOrders: "RECENT ORDERS",
        buyerOrders: "Buyer Orders",
        noOrdersYet: "No orders yet",
        buyerOrdersAppearHere: "Orders placed by buyers will appear here.",

        // AI INSIGHTS PAGE
        artificialIntelligence: "ARTIFICIAL INTELLIGENCE",
        aiFarmingIntelligence: "AI Farming Intelligence",
        aiDescription:
            "Smart market predictions to help you decide what to grow, when to sell and how much to stock.",

        aiActive: "AI ACTIVE",

        analyseYourCrop: "ANALYSE YOUR CROP",
        selectCropForInsights: "Select a crop to view AI insights",

        crop: "Crop",
        tomato: "Tomato",
        potato: "Potato",
        onion: "Onion",
        rice: "Rice",

        gradeA: "Grade A",
        fresh: "Fresh",
        premium: "Premium",

        expectedDemand: "Expected Demand",
        next14Days: "Next 14 days",

        priceTrend: "Price Trend",
        rising: "Rising",
        highConfidence: "High confidence",

        bestOpportunity: "Best Opportunity",
        highDemandCrop: "High demand crop",

        supply: "Supply",
        marketOutlook: "Market Outlook",

        // ================================
        // AI INSIGHTS - REMAINING
        // ================================

        forecastPeriod: "Forecast Period",
        days14: "14 Days",
        confidence: "Confidence",

        aiMarketIntelligenceTitle: "AI MARKET INTELLIGENCE",
        demandForecastTitle: "Demand Forecast",

        aiPredictionDescription:
            "AI prediction based on simulated historical market trends, buyer activity and seasonal patterns.",

        expectedDemandGrowth: "EXPECTED DEMAND GROWTH",
        highDemand: "HIGH DEMAND",

        now: "Now",
        days7: "7 Days",

        aiQuickInsight: "AI QUICK INSIGHT",

        tomatoDemandInsight:
            "Tomato demand is expected to rise over the next 14 days.",

        considerIncreasingSupply:
            "Consider increasing supply while monitoring market prices.",

        aiConfidence: "AI CONFIDENCE",
        predictionConfidence: "Prediction confidence",

        basedOnMarketData:
            "Based on simulated historical market trends, buyer activity and seasonal demand patterns.",

        priceTrend: "Price Trend",
        rising: "↑ Rising",
        highConfidence: "High confidence",

        bestOpportunity: "Best Opportunity",
        highDemandCrop: "High demand crop",
        recommendedSupply: "Recommended Supply",
        suggestedIncrease: "Suggested increase",

        // ================================
        // AI INSIGHTS - REMAINING
        // ================================

        forecastPeriod: "Forecast Period",
        days14: "14 Days",
        confidence: "Confidence",

        aiMarketIntelligenceTitle: "AI MARKET INTELLIGENCE",
        demandForecastTitle: "Demand Forecast",

        aiPredictionDescription:
            "AI prediction based on simulated historical market trends, buyer activity and seasonal patterns.",

        expectedDemandGrowth: "EXPECTED DEMAND GROWTH",
        highDemand: "HIGH DEMAND",

        now: "Now",
        days7: "7 Days",

        aiQuickInsight: "AI QUICK INSIGHT",

        tomatoDemandInsight:
            "Tomato demand is expected to rise over the next 14 days.",

        considerIncreasingSupply:
            "Consider increasing supply while monitoring market prices.",

        aiConfidence: "AI CONFIDENCE",
        predictionConfidence: "Prediction confidence",

        basedOnMarketData:
            "Based on simulated historical market trends, buyer activity and seasonal demand patterns.",

        aiRecommendations: "AI RECOMMENDATIONS",
        whatShouldYouDo: "What should you do? 💡",
        actionableSuggestions: "Actionable suggestions generated from current market conditions.",

        high: "HIGH",
        medium: "MEDIUM",

        increaseTomatoSupply: "Increase Tomato Supply",
        tomatoDemandIncrease: "Tomato demand is predicted to increase over the next 14 days.",
        recommended: "Recommended",

        monitorPrices: "Monitor Prices",
        marketPricesUpward: "Market prices are showing an upward trend for high-demand crops.",
        opportunity: "Opportunity",

        trackMarketPrices: "Track Market Prices →",

        planInventory: "Plan Inventory",
        maintainSufficientStock: "Maintain sufficient stock to handle upcoming buyer demand.",
        priority: "Priority",

        planInventoryButton: "Plan Inventory →",
        viewSupplyPlan: "View Supply Plan →",

        kisanAiAssistant: "KISAN AI ASSISTANT",
        needHelpDeciding: "Need help deciding what to do?",
        askKisanAiDescription: "Ask KisanAI about crops, prices, demand or your next farming decision.",
        askKisanAI: "Ask KisanAI",

        explainableAI: "EXPLAINABLE AI",
        whyThisPrediction: "Why this prediction? 🧠",
        understandSignals: "Understand the signals behind the AI recommendation.",
        viewReasoning: "View Reasoning",

        buyerActivityIncreased: "Buyer activity increased",
        buyerActivityDescription: "Simulated buyer activity shows a positive demand pattern.",

        historicalDemandRising: "Historical demand is rising",
        historicalDemandDescription: "Previous market patterns indicate increasing demand for tomatoes.",

        marketPricesFavorable: "Market prices are favorable",
        marketPricesDescription: "Current simulated prices indicate a positive selling opportunity.",

        seasonalPatternDetected: "Seasonal pattern detected",
        seasonalPatternDescription: "Similar seasonal demand patterns were observed in historical data.",

        aiPrototypeMode: "AI Prototype Mode",
        simulatedDataNotice: "These predictions currently use simulated data for the KisanDirect SIH prototype.",
        analysisReady: "● Analysis Ready",

        farmManagement: "FARM MANAGEMENT",
        myProduce: "My Produce 🌾",
        manageCrops: "Manage your crops, prices and available inventory.",
        addProduce: "+ Add Produce",
        totalListings: "Total Listings",
        activeProduceListings: "Active produce listings",
        totalStock: "Total Stock",
        availableForBuyers: "Available for buyers",
        todaysSales: "Today's Sales",
        fromDirectBuyers: "From direct buyers",
        averagePrice: "Avg. Price",
        perKilogram: "Per kilogram",
        inventory: "INVENTORY",
        yourProduce: "Your Produce",
        produce: "Produce",
        quantity: "Quantity",
        price: "Price",
        status: "Status",
        action: "Action",
        freshTomato: "Fresh Tomato",
        gradeARanchi: "Grade A • Ranchi",
        active: "Active",
        edit: "Edit",
        premiumRice: "Premium Rice",
        premiumPotato: "Premium Potato",

        // Earnings & Payments
        financialManagement: "FINANCIAL MANAGEMENT",
        earningsPayments: "Earnings & Payments 💰",
        trackFarmIncome: "Track your farm income, payments and financial performance.",

        totalEarnings: "Total Earnings",
        lifetimeFarmEarnings: "Lifetime farm earnings",

        thisMonth: "This Month",
        earningsInAugust: "Earnings in August",

        twoPayments: "2 payments",
        pendingPayments: "Pending Payments",
        awaitingBuyerPayment: "Awaiting buyer payment",

        available: "Available",
        availableBalance: "Available Balance",
        readyForWithdrawal: "Ready for withdrawal",

        earningsOverview: "EARNINGS OVERVIEW",
        monthlyEarnings: "Monthly Earnings",

        cropPerformance: "CROP PERFORMANCE",
        earningsByCrop: "Earnings by Crop",

        tomatoEarningsPercent: "38% of earnings",
        riceEarningsPercent: "34% of earnings",
        potatoEarningsPercent: "28% of earnings",

        paymentActivity: "PAYMENT ACTIVITY",
        recentTransactions: "Recent Transactions",

        paid: "Paid",

        paymentAccount: "PAYMENT ACCOUNT",
        settlementInformation: "Settlement Information",

        nextSettlement: "Next Settlement",
        pendingAmount: "Pending Amount",
        paymentMethod: "Payment Method",
        bankTransfer: "Bank Transfer",

        viewPaymentDetails: "💰 View Payment Details",

        buyerAccount: "Buyer Account",

        myOrders: "My Orders",
        deliveries: "Deliveries",
        payments: "Payments",

        buyerPortal: "BUYER PORTAL",
        welcomeBack: "Welcome back,",
        buyerDashboardDescription:
            "Discover fresh produce directly from farmers and FPOs.",

        totalPurchases: "Total Purchases",
        thisMonth: "This month",

        threeActive: "3 active",
        activeOrders: "Active Orders",
        ordersInProgress: "Orders in progress",

        fourNew: "+4 new",
        savedFarmers: "Saved Farmers",
        trustedSuppliers: "Trusted suppliers",

        onTime: "On time",
        deliveries: "Deliveries",
        deliverySuccessRate: "Delivery success rate",

        recommendedProduce: "Recommended Produce",
        viewMarketplace: "View marketplace →",
        buy: "Buy",

        kgAvailable800: "800 kg available",
        kgAvailable1200: "1,200 kg available",
        kgAvailable650: "650 kg available",

        smartBuying: "Smart Buying",
        tomatoDemandExpected:
            "Tomato demand is expected to increase over the next 14 days.",

        purchaseTomatoEarly:
            "Consider purchasing tomato inventory early to avoid potential price increases.",

        viewAIInsights: "View AI Insights →",

        yourActivity: "YOUR ACTIVITY",

        inTransit: "In Transit",
        delivered: "Delivered",
        processing: "Processing",

        activeDelivery: "Active Delivery",
        you: "You",
        estimatedArrival: "Estimated arrival",
        distance: "Distance",
        trackDelivery: "🚚 Track Delivery",

        farmerNetwork: "FARMER NETWORK",
        farmersTitle: "Farmers 👨‍🌾",
        farmerNetworkDescription:
            "Discover and connect with trusted local farmers.",

        availableFarmers: "Available Farmers",
        verifiedFarmers: "Verified farmers",
        yourTrustedSuppliers: "Your trusted suppliers",
        nearbyFarmers: "Nearby Farmers",
        withinYourRegion: "Within your region",

        fpos: "FPOs",
        farmerOrganizations: "Farmer organizations",

        localFarmers: "LOCAL FARMERS",
        trustedFarmers: "Trusted Farmers 👨‍🌾",
        verifiedFarmersDirectPurchase:
            "Verified farmers available for direct purchase",

        verifiedNetwork: "✓ Verified Network",

        view: "View",

        purchaseManagement: "PURCHASE MANAGEMENT",
        trackManagePurchases:
            "Track and manage every purchase directly from local farmers.",

        farmerDirect: "🌱 Farmer Direct",
        secureOrders: "🔒 Secure Orders",
        trackable: "🚚 Trackable",

        orderHub: "Order Hub",
        allPurchasesOnePlace: "All purchases in one place",

        orderHistory: "ORDER HISTORY",
        yourOrders: "Your Orders",
        noOrdersYet: "No orders yet",
        placedOrdersAppearHere:
            "Your placed orders will appear here.",

        footerDescription:
            "Building a smarter and fairer agricultural marketplace.",
        footerCopyright:
            "© 2026 KisanDirect • SIH Prototype",

        loginToContinue: "Login to continue to KisanDirect",
        mobileNumber: "Mobile Number",
        password: "Password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        loginButton: "Login →",

        newToKisanDirect: "New to KisanDirect?",
        createAccount: "Create an account",

        prototypeDemo: "Prototype Demo",
        localAccountLogin:
            "You can create an account and login locally.",

        back: "← Back",
        joinKisanDirect: "Join KisanDirect",
        howUsePlatform:
            "How would you like to use the platform?",

        farmerFpoAccount: "I'm a Farmer / FPO",
        farmerAccountDescription:
            "Sell produce directly, receive orders and access AI market insights.",

        buyerAccountOption: "I'm a Buyer",
        buyerAccountDescription:
            "Purchase fresh produce directly from verified farmers and FPOs.",
        
        createFarmerAccount: "Create Farmer Account",
        startSellingDirectly: "Start selling directly through KisanDirect",

        fullName: "Full Name",
        villageCity: "Village / City",
        district: "District",
        state: "State",
        primaryCrop: "Primary Crop",
        createPassword: "Create Password",
        createFarmerAccountButton: "Create Farmer Account →",

        createBuyerAccount: "Create Buyer Account",
        sourceDirectlyFromFarmers: "Source produce directly from farmers",
        nameBusinessName: "Name / Business Name",
        buyerType: "Buyer Type",
        location: "Location",
        createBuyerAccountButton: "Create Buyer Account →",

        accountCreated: "Account Created!",
        accountCreatedSuccessfully:
            "Your KisanDirect account has been successfully created.",
        continueToLogin: "Continue to Login →",

        farmManagement: "FARM MANAGEMENT",
        addNewProduce: "Add New Produce 🌾",
        listFreshProduce:
            "List your fresh produce directly for consumers and bulk buyers.",

        produceName: "Produce Name",
        category: "Category",
        qualityGrade: "Quality Grade",
        quantityAvailable: "Quantity Available",
        unit: "Unit",
        pricePerKg: "Price per kg",
        farmPickupLocation: "Farm / Pickup Location",
        availableFrom: "Available From",
        cancel: "Cancel",
        listProduce: "🌾 List Produce",

        kisanDirectAIAssistant: "KISANDIRECT AI ASSISTANT",
        kisanAIAnalysis: "KisanAI Analysis",
        smartGuidance:
            "Smart guidance based on current crop insights.",
        selectedCrop: "SELECTED CROP",
        supply: "📦 Supply",
        maintainSupplyMonitorMarket:
            "Maintain current supply levels and monitor market conditions.",
        gotIt: "Got it ✓",
    },

    hi: {
        home: "होम",
        marketplace: "बाज़ार",
        howItWorks: "यह कैसे काम करता है",
        aiSolutions: "AI समाधान",
        login: "लॉगिन",
        joinNow: "अभी जुड़ें",

        badge: "AI-संचालित कृषि बाज़ार",
        heroTitle1: "खेत से",
        heroTitle2: "सीधे",
        heroTitle3: "बाज़ार तक।",
        heroText:
            "KisanDirect किसानों और FPOs को सीधे उपभोक्ताओं और थोक खरीदारों से जोड़ता है, जिससे किसानों को बेहतर कीमत मिलती है और सप्लाई-चेन की समस्याएं कम होती हैं।",

        explore: "बाज़ार देखें",
        joinFarmer: "किसान के रूप में जुड़ें",

        smartAgriculture: "स्मार्ट कृषि",
        smartText:
            "किसानों, खरीदारों और लॉजिस्टिक्स को एक ही प्लेटफॉर्म से जोड़ना।",

        aiMarket: "AI मार्केट इंटेलिजेंस",
        demand: "अगले 14 दिनों में अनुमानित मांग वृद्धि",
        recommendation: "AI सुझाव",

        farmers: "किसान",
        buyers: "खरीदार",
        states: "राज्य",
        farmerSales: "किसान बिक्री",


        farmer: "किसान",
        buyer: "खरीदार",

        freshFromFarm: "खेत से ताज़ा",
        farmerMarketplace: "किसान बाज़ार",
        marketText: "किसानों से सीधे ताज़ी उपज पारदर्शी कीमतों पर खरीदें।",

        whyKisanDirect: "किसानडायरेक्ट क्यों",
        smarterSupplyChain: "एक बेहतर कृषि आपूर्ति श्रृंखला।",

        directMarketplace: "सीधा बाज़ार",
        directMarketplaceText: "किसानों को सीधे उपभोक्ताओं और थोक खरीदारों से जोड़ें।",

        aiDemandForecasting: "AI मांग पूर्वानुमान",
        aiDemandForecastingText: "आने वाली मांग का अनुमान लगाएं और किसानों को बेहतर बिक्री निर्णय लेने में मदद करें।",

        smartLogistics: "स्मार्ट लॉजिस्टिक्स",
        smartLogisticsText: "मार्गों को बेहतर बनाएं और परिवहन लागत कम करें।",

        betterPrices: "बेहतर कीमतें",
        betterPricesText: "अनावश्यक बिचौलियों को कम करें और किसानों की आय बढ़ाएं।",

        artificialIntelligence: "कृत्रिम बुद्धिमत्ता",

        predictOptimize: "मांग का अनुमान लगाएं। आपूर्ति को बेहतर बनाएं।",

        aiEngineText: "हमारा AI इंजन बाजार के रुझानों, ऐतिहासिक मांग और खरीदारों की गतिविधियों का विश्लेषण करके किसानों को यह तय करने में मदद करता है कि क्या बेचना है, कब बेचना है और कहाँ भेजना है।",

        exploreAIInsights: "AI जानकारी देखें →",

        demandForecast: "मांग का पूर्वानुमान",
        liveDemo: "● लाइव डेमो",
        expectedDemandGrowth: "अनुमानित मांग वृद्धि",

        farmerAccount: "किसान खाता",

        dashboard: "डैशबोर्ड",
        myProduce: "मेरी उपज",
        orders: "ऑर्डर",
        aiInsights: "AI जानकारी",
        logistics: "लॉजिस्टिक्स",
        earnings: "कमाई",
        settings: "सेटिंग्स",
        logout: "लॉगआउट",

        farmerPortal: "किसान पोर्टल",
        goodMorning: "सुप्रभात,",
        farmTodayMessage: "आज आपके खेत में क्या हो रहा है, यहाँ देखें।",

        totalSales: "कुल बिक्री",
        comparedLastMonth: "पिछले महीने की तुलना में",

        activeOrders: "सक्रिय ऑर्डर",
        readyForDispatch: "डिस्पैच के लिए 4 तैयार",

        produceListed: "सूचीबद्ध उपज",
        availableForBuyers: "खरीदारों के लिए उपलब्ध",

        avgPrice: "औसत कीमत",
        betterThanMandi: "मंडी से बेहतर",

        aiMarketIntelligence: "एआई बाजार जानकारी",
        demandForecast: "मांग का पूर्वानुमान",
        liveDemo: "• लाइव डेमो",
        expectedDemandGrowth: "अपेक्षित मांग वृद्धि",
        highDemand: "उच्च मांग ↑",

        aiRecommendation: "एआई सुझाव",
        tomatoRecommendation: "अगले 14 दिनों में टमाटर की मांग बढ़ सकती है। आपूर्ति में 15% की वृद्धि करने पर विचार करें।",

        quickActions: "त्वरित कार्य",
        manageFarm: "खेत प्रबंधन",

        listProduce: "उपज सूचीबद्ध करें",
        sellYourCrops: "अपनी फसल बेचें",

        viewOrders: "ऑर्डर देखें",
        manageOrders: "ऑर्डर प्रबंधित करें",

        trackDelivery: "डिलीवरी ट्रैक करें",
        viewShipments: "शिपमेंट देखें",

        aiInsights: "एआई जानकारी",
        marketPredictions: "बाजार पूर्वानुमान",

        recentActivity: "हाल की गतिविधि",
        recentOrders: "हाल के ऑर्डर",
        viewAll: "सभी देखें →",

        inTransit: "रास्ते में",
        delivered: "डिलीवर किया गया",
        processing: "प्रक्रिया में",

        farmerAccount: "किसान खाता",

        market: "बाज़ार",
        todaysPrices: "आज की कीमतें",

        salesManagement: "बिक्री प्रबंधन",
        ordersReceived: "प्राप्त ऑर्डर 📦",
        manageBuyerOrders: "खरीदारों द्वारा दिए गए ऑर्डर देखें और प्रबंधित करें।",

        totalOrders: "कुल ऑर्डर",
        pending: "लंबित",
        completed: "पूर्ण",
        totalSales: "कुल बिक्री",

        recentOrders: "हाल के ऑर्डर",
        buyerOrders: "खरीदारों के ऑर्डर",
        noOrdersYet: "अभी तक कोई ऑर्डर नहीं",
        buyerOrdersAppearHere: "खरीदारों द्वारा दिए गए ऑर्डर यहां दिखाई देंगे।",

        // AI INSIGHTS PAGE
        artificialIntelligence: "कृत्रिम बुद्धिमत्ता",
        aiFarmingIntelligence: "AI कृषि बुद्धिमत्ता",
        aiDescription:
            "स्मार्ट बाजार पूर्वानुमान से तय करें कि क्या उगाना है, कब बेचना है और कितना स्टॉक रखना है।",

        aiActive: "AI सक्रिय",

        analyseYourCrop: "अपनी फसल का विश्लेषण करें",
        selectCropForInsights: "AI जानकारी देखने के लिए फसल चुनें",

        crop: "फसल",
        tomato: "टमाटर",
        potato: "आलू",
        onion: "प्याज़",
        rice: "चावल",

        gradeA: "ग्रेड A",
        fresh: "ताज़ा",
        premium: "प्रीमियम",

        expectedDemand: "अपेक्षित मांग",
        next14Days: "अगले 14 दिन",

        priceTrend: "कीमत का रुझान",
        rising: "बढ़ रही है",
        highConfidence: "उच्च विश्वसनीयता",

        bestOpportunity: "सबसे अच्छा अवसर",
        highDemandCrop: "उच्च मांग वाली फसल",

        supply: "आपूर्ति",
        marketOutlook: "बाज़ार का अनुमान",

        // ================================
        // AI INSIGHTS - REMAINING
        // ================================

        forecastPeriod: "पूर्वानुमान अवधि",
        days14: "14 दिन",
        confidence: "विश्वसनीयता",

        aiMarketIntelligenceTitle: "AI बाजार जानकारी",
        demandForecastTitle: "मांग का पूर्वानुमान",

        aiPredictionDescription:
            "ऐतिहासिक बाजार रुझानों, खरीदारों की गतिविधि और मौसमी पैटर्न के सिमुलेशन के आधार पर AI पूर्वानुमान।",

        expectedDemandGrowth: "अनुमानित मांग वृद्धि",
        highDemand: "उच्च मांग",

        now: "अभी",
        days7: "7 दिन",

        aiQuickInsight: "AI त्वरित जानकारी",

        tomatoDemandInsight:
            "अगले 14 दिनों में टमाटर की मांग बढ़ने की उम्मीद है।",

        considerIncreasingSupply:
            "बाजार की कीमतों पर नजर रखते हुए आपूर्ति बढ़ाने पर विचार करें।",

        aiConfidence: "AI विश्वसनीयता",
        predictionConfidence: "पूर्वानुमान की विश्वसनीयता",

        basedOnMarketData:
            "ऐतिहासिक बाजार रुझानों, खरीदारों की गतिविधि और मौसमी मांग पैटर्न के सिमुलेशन पर आधारित।",

        priceTrend: "कीमत का रुझान",
        rising: "↑ बढ़ रही है",
        highConfidence: "उच्च विश्वसनीयता",

        bestOpportunity: "सबसे अच्छा अवसर",
        highDemandCrop: "उच्च मांग वाली फसल",
        recommendedSupply: "अनुशंसित आपूर्ति",
        suggestedIncrease: "सुझाई गई वृद्धि",

        // ================================
        // AI INSIGHTS - REMAINING
        // ================================

        forecastPeriod: "पूर्वानुमान अवधि",
        days14: "14 दिन",
        confidence: "विश्वसनीयता",

        aiMarketIntelligenceTitle: "AI बाजार जानकारी",
        demandForecastTitle: "मांग का पूर्वानुमान",

        aiPredictionDescription:
            "ऐतिहासिक बाजार रुझानों, खरीदारों की गतिविधि और मौसमी पैटर्न के सिमुलेशन के आधार पर AI पूर्वानुमान।",

        expectedDemandGrowth: "अनुमानित मांग वृद्धि",
        highDemand: "उच्च मांग",

        now: "अभी",
        days7: "7 दिन",

        aiQuickInsight: "AI त्वरित जानकारी",

        tomatoDemandInsight:
            "अगले 14 दिनों में टमाटर की मांग बढ़ने की उम्मीद है।",

        considerIncreasingSupply:
            "बाजार की कीमतों पर नजर रखते हुए आपूर्ति बढ़ाने पर विचार करें।",

        aiConfidence: "AI विश्वसनीयता",
        predictionConfidence: "पूर्वानुमान की विश्वसनीयता",

        basedOnMarketData:
            "ऐतिहासिक बाजार रुझानों, खरीदारों की गतिविधि और मौसमी मांग पैटर्न के सिमुलेशन पर आधारित।",

        aiRecommendations: "एआई सुझाव",
        whatShouldYouDo: "आपको क्या करना चाहिए? 💡",
        actionableSuggestions: "वर्तमान बाजार स्थितियों के आधार पर सुझाव।",

        high: "उच्च",
        medium: "मध्यम",

        increaseTomatoSupply: "टमाटर की आपूर्ति बढ़ाएं",
        tomatoDemandIncrease: "अगले 14 दिनों में टमाटर की मांग बढ़ने का अनुमान है।",
        recommended: "अनुशंसित",

        monitorPrices: "कीमतों पर नज़र रखें",
        marketPricesUpward: "उच्च मांग वाली फसलों की बाजार कीमतों में बढ़ोतरी का रुझान दिख रहा है।",
        opportunity: "अवसर",

        trackMarketPrices: "बाजार की कीमतें ट्रैक करें →",

        planInventory: "इन्वेंटरी की योजना बनाएं",
        maintainSufficientStock: "आने वाली खरीदारों की मांग को पूरा करने के लिए पर्याप्त स्टॉक रखें।",
        priority: "प्राथमिकता",

        planInventoryButton: "इन्वेंटरी की योजना बनाएं →",
        viewSupplyPlan: "आपूर्ति योजना देखें →",

        kisanAiAssistant: "किसान एआई सहायक",
        needHelpDeciding: "क्या तय करने में मदद चाहिए?",
        askKisanAiDescription: "फसलों, कीमतों, मांग या अपने अगले कृषि निर्णय के बारे में KisanAI से पूछें।",
        askKisanAI: "KisanAI से पूछें",

        explainableAI: "व्याख्यात्मक एआई",
        whyThisPrediction: "यह पूर्वानुमान क्यों? 🧠",
        understandSignals: "AI सुझाव के पीछे के संकेतों को समझें।",
        viewReasoning: "कारण देखें",

        buyerActivityIncreased: "खरीदारों की गतिविधि बढ़ी",
        buyerActivityDescription: "सिम्युलेटेड खरीदार गतिविधि सकारात्मक मांग का संकेत दिखाती है।",

        historicalDemandRising: "ऐतिहासिक मांग बढ़ रही है",
        historicalDemandDescription: "पिछले बाजार के पैटर्न टमाटर की बढ़ती मांग का संकेत देते हैं।",

        marketPricesFavorable: "बाजार की कीमतें अनुकूल हैं",
        marketPricesDescription: "वर्तमान सिम्युलेटेड कीमतें बिक्री के लिए सकारात्मक अवसर दिखाती हैं।",

        seasonalPatternDetected: "मौसमी पैटर्न का पता चला",
        seasonalPatternDescription: "ऐतिहासिक डेटा में इसी तरह के मौसमी मांग पैटर्न देखे गए हैं।",

        aiPrototypeMode: "एआई प्रोटोटाइप मोड",
        simulatedDataNotice: "ये पूर्वानुमान वर्तमान में KisanDirect SIH प्रोटोटाइप के लिए सिम्युलेटेड डेटा का उपयोग करते हैं।",
        analysisReady: "● विश्लेषण तैयार",

        farmManagement: "कृषि प्रबंधन",
        myProduce: "मेरी उपज 🌾",
        manageCrops: "अपनी फसलों, कीमतों और उपलब्ध स्टॉक का प्रबंधन करें।",
        addProduce: "+ उपज जोड़ें",
        totalListings: "कुल लिस्टिंग",
        activeProduceListings: "सक्रिय उपज लिस्टिंग",
        totalStock: "कुल स्टॉक",
        availableForBuyers: "खरीदारों के लिए उपलब्ध",
        todaysSales: "आज की बिक्री",
        fromDirectBuyers: "सीधे खरीदारों से",
        averagePrice: "औसत कीमत",
        perKilogram: "प्रति किलोग्राम",
        inventory: "इन्वेंटरी",
        yourProduce: "आपकी उपज",
        produce: "उपज",
        quantity: "मात्रा",
        price: "कीमत",
        status: "स्थिति",
        action: "कार्रवाई",
        freshTomato: "ताज़ा टमाटर",
        gradeARanchi: "ग्रेड A • रांची",
        active: "सक्रिय",
        edit: "संपादित करें",
        premiumRice: "प्रीमियम चावल",
        premiumPotato: "प्रीमियम आलू",

        // Earnings & Payments
        financialManagement: "वित्तीय प्रबंधन",
        earningsPayments: "कमाई और भुगतान 💰",
        trackFarmIncome: "अपनी कृषि आय, भुगतान और वित्तीय प्रदर्शन को ट्रैक करें।",

        totalEarnings: "कुल कमाई",
        lifetimeFarmEarnings: "अब तक की कुल कृषि कमाई",

        thisMonth: "इस महीने",
        earningsInAugust: "अगस्त की कमाई",

        twoPayments: "2 भुगतान",
        pendingPayments: "लंबित भुगतान",
        awaitingBuyerPayment: "खरीदार के भुगतान की प्रतीक्षा",

        available: "उपलब्ध",
        availableBalance: "उपलब्ध शेष राशि",
        readyForWithdrawal: "निकासी के लिए तैयार",

        earningsOverview: "कमाई का अवलोकन",
        monthlyEarnings: "मासिक कमाई",

        cropPerformance: "फसल प्रदर्शन",
        earningsByCrop: "फसल के अनुसार कमाई",

        tomatoEarningsPercent: "कमाई का 38%",
        riceEarningsPercent: "कमाई का 34%",
        potatoEarningsPercent: "कमाई का 28%",

        paymentActivity: "भुगतान गतिविधि",
        recentTransactions: "हाल के लेन-देन",

        paid: "भुगतान किया गया",

        paymentAccount: "भुगतान खाता",
        settlementInformation: "भुगतान निपटान जानकारी",

        nextSettlement: "अगला निपटान",
        pendingAmount: "लंबित राशि",
        paymentMethod: "भुगतान का तरीका",
        bankTransfer: "बैंक ट्रांसफर",

        viewPaymentDetails: "💰 भुगतान विवरण देखें",

        buyerAccount: "खरीदार खाता",

        myOrders: "मेरे ऑर्डर",
        deliveries: "डिलीवरी",
        payments: "भुगतान",

        buyerPortal: "खरीदार पोर्टल",
        welcomeBack: "वापसी पर स्वागत है,",
        buyerDashboardDescription:
            "किसानों और FPOs से सीधे ताज़ी उपज प्राप्त करें।",

        totalPurchases: "कुल खरीदारी",
        thisMonth: "इस महीने",

        threeActive: "3 सक्रिय",
        activeOrders: "सक्रिय ऑर्डर",
        ordersInProgress: "ऑर्डर प्रगति पर हैं",

        fourNew: "+4 नए",
        savedFarmers: "सहेजे गए किसान",
        trustedSuppliers: "विश्वसनीय आपूर्तिकर्ता",

        onTime: "समय पर",
        deliveries: "डिलीवरी",
        deliverySuccessRate: "डिलीवरी सफलता दर",

        recommendedProduce: "अनुशंसित उपज",
        viewMarketplace: "मार्केटप्लेस देखें →",
        buy: "खरीदें",

        kgAvailable800: "800 किग्रा उपलब्ध",
        kgAvailable1200: "1,200 किग्रा उपलब्ध",
        kgAvailable650: "650 किग्रा उपलब्ध",

        smartBuying: "स्मार्ट खरीदारी",
        tomatoDemandExpected:
            "अगले 14 दिनों में टमाटर की मांग बढ़ने की उम्मीद है।",

        purchaseTomatoEarly:
            "संभावित मूल्य वृद्धि से बचने के लिए टमाटर का स्टॉक पहले खरीदने पर विचार करें।",

        viewAIInsights: "AI जानकारी देखें →",

        yourActivity: "आपकी गतिविधि",

        inTransit: "रास्ते में",
        delivered: "डिलीवर किया गया",
        processing: "प्रक्रिया में",

        activeDelivery: "सक्रिय डिलीवरी",
        you: "आप",
        estimatedArrival: "अनुमानित आगमन",
        distance: "दूरी",
        trackDelivery: "🚚 डिलीवरी ट्रैक करें",

        farmerNetwork: "किसान नेटवर्क",
        farmersTitle: "किसान 👨‍🌾",
        farmerNetworkDescription:
            "विश्वसनीय स्थानीय किसानों को खोजें और उनसे जुड़ें।",

        availableFarmers: "उपलब्ध किसान",
        verifiedFarmers: "सत्यापित किसान",
        yourTrustedSuppliers: "आपके विश्वसनीय आपूर्तिकर्ता",
        nearbyFarmers: "नजदीकी किसान",
        withinYourRegion: "आपके क्षेत्र में",

        fpos: "FPOs",
        farmerOrganizations: "किसान संगठन",

        localFarmers: "स्थानीय किसान",
        trustedFarmers: "विश्वसनीय किसान 👨‍🌾",
        verifiedFarmersDirectPurchase:
            "सीधी खरीद के लिए सत्यापित किसान उपलब्ध हैं",

        verifiedNetwork: "✓ सत्यापित नेटवर्क",

        view: "देखें",

        purchaseManagement: "खरीद प्रबंधन",
        trackManagePurchases:
            "स्थानीय किसानों से की गई सभी खरीदारी को ट्रैक और प्रबंधित करें।",

        farmerDirect: "🌱 किसान से सीधी खरीद",
        secureOrders: "🔒 सुरक्षित ऑर्डर",
        trackable: "🚚 ट्रैक करने योग्य",

        orderHub: "ऑर्डर हब",
        allPurchasesOnePlace: "सभी खरीदारी एक ही स्थान पर",

        orderHistory: "ऑर्डर इतिहास",
        yourOrders: "आपके ऑर्डर",
        noOrdersYet: "अभी तक कोई ऑर्डर नहीं",
        placedOrdersAppearHere:
            "आपके द्वारा किए गए ऑर्डर यहां दिखाई देंगे।",

        footerDescription:
            "एक स्मार्ट और निष्पक्ष कृषि मार्केटप्लेस का निर्माण।",
        footerCopyright:
            "© 2026 KisanDirect • SIH प्रोटोटाइप",

        loginToContinue: "KisanDirect पर जारी रखने के लिए लॉगिन करें",
        mobileNumber: "मोबाइल नंबर",
        password: "पासवर्ड",
        rememberMe: "मुझे याद रखें",
        forgotPassword: "पासवर्ड भूल गए?",
        loginButton: "लॉगिन →",

        newToKisanDirect: "KisanDirect पर नए हैं?",
        createAccount: "खाता बनाएं",

        prototypeDemo: "प्रोटोटाइप डेमो",
        localAccountLogin:
            "आप स्थानीय रूप से खाता बना सकते हैं और लॉगिन कर सकते हैं।",

        back: "← वापस",
        joinKisanDirect: "KisanDirect से जुड़ें",
        howUsePlatform:
            "आप प्लेटफॉर्म का उपयोग कैसे करना चाहेंगे?",

        farmerFpoAccount: "मैं किसान / FPO हूँ",
        farmerAccountDescription:
            "सीधे उपज बेचें, ऑर्डर प्राप्त करें और AI मार्केट जानकारी का उपयोग करें।",

        buyerAccountOption: "मैं खरीदार हूँ",
        buyerAccountDescription:
            "सत्यापित किसानों और FPOs से सीधे ताज़ी उपज खरीदें।",

        createFarmerAccount: "किसान खाता बनाएं",
        startSellingDirectly: "KisanDirect के माध्यम से सीधे बेचना शुरू करें",

        fullName: "पूरा नाम",
        villageCity: "गांव / शहर",
        district: "जिला",
        state: "राज्य",
        primaryCrop: "मुख्य फसल",
        createPassword: "पासवर्ड बनाएं",
        createFarmerAccountButton: "किसान खाता बनाएं →",

        createBuyerAccount: "खरीदार खाता बनाएं",
        sourceDirectlyFromFarmers: "किसानों से सीधे उपज प्राप्त करें",
        nameBusinessName: "नाम / व्यवसाय का नाम",
        buyerType: "खरीदार का प्रकार",
        location: "स्थान",
        createBuyerAccountButton: "खरीदार खाता बनाएं →",

        accountCreated: "खाता बन गया!",
        accountCreatedSuccessfully:
            "आपका KisanDirect खाता सफलतापूर्वक बना दिया गया है।",
        continueToLogin: "लॉगिन करने के लिए आगे बढ़ें →",

        farmManagement: "कृषि प्रबंधन",
        addNewProduce: "नई उपज जोड़ें 🌾",
        listFreshProduce:
            "उपभोक्ताओं और थोक खरीदारों के लिए अपनी ताज़ी उपज सीधे सूचीबद्ध करें।",

        produceName: "उपज का नाम",
        category: "श्रेणी",
        qualityGrade: "गुणवत्ता ग्रेड",
        quantityAvailable: "उपलब्ध मात्रा",
        unit: "इकाई",
        pricePerKg: "प्रति किग्रा कीमत",
        farmPickupLocation: "खेत / पिकअप स्थान",
        availableFrom: "उपलब्धता शुरू",
        cancel: "रद्द करें",
        listProduce: "🌾 उपज सूचीबद्ध करें",

        kisanDirectAIAssistant: "KISANDIRECT AI सहायक",
        kisanAIAnalysis: "KisanAI विश्लेषण",
        smartGuidance:
            "वर्तमान फसल जानकारी के आधार पर स्मार्ट मार्गदर्शन।",
        selectedCrop: "चयनित फसल",
        supply: "📦 आपूर्ति",
        maintainSupplyMonitorMarket:
            "वर्तमान आपूर्ति स्तर बनाए रखें और बाजार की स्थिति पर नज़र रखें।",
        gotIt: "समझ गया ✓",
    },

    bn: {
    home: "হোম",
    marketplace: "মার্কেটপ্লেস",
    howItWorks: "এটি কীভাবে কাজ করে",
    aiSolutions: "AI সমাধান",
    login: "লগইন",
    joinNow: "এখনই যোগ দিন",

    badge: "AI-চালিত কৃষি মার্কেটপ্লেস",
    heroTitle1: "খামার থেকে",
    heroTitle2: "সরাসরি",
    heroTitle3: "বাজারে।",
    heroText:
        "KisanDirect কৃষক এবং FPO-দের সরাসরি ভোক্তা ও পাইকারি ক্রেতাদের সঙ্গে সংযুক্ত করে, যার ফলে কৃষকরা ভালো দাম পান এবং সরবরাহ শৃঙ্খলের অদক্ষতা কমে।",

    explore: "মার্কেটপ্লেস দেখুন",
    joinFarmer: "কৃষক হিসেবে যোগ দিন",

    smartAgriculture: "স্মার্ট কৃষি",
    smartText:
        "একটি প্ল্যাটফর্মের মাধ্যমে কৃষক, ক্রেতা এবং লজিস্টিকসকে সংযুক্ত করা।",

    aiMarket: "AI মার্কেট ইন্টেলিজেন্স",
    demand: "আগামী ১৪ দিনে প্রত্যাশিত চাহিদা বৃদ্ধি",
    recommendation: "AI সুপারিশ",

    farmers: "কৃষক",
    buyers: "ক্রেতা",
    states: "রাজ্য",
    farmerSales: "কৃষক বিক্রয়",

    farmer: "কৃষক",
    buyer: "ক্রেতা",

    freshFromFarm: "খামার থেকে তাজা",
    farmerMarketplace: "কৃষক মার্কেটপ্লেস",
    marketText:
        "কৃষকদের কাছ থেকে সরাসরি স্বচ্ছ দামে তাজা কৃষিপণ্য কিনুন।",

    whyKisanDirect: "কেন KisanDirect",
    smarterSupplyChain: "আরও স্মার্ট কৃষি সরবরাহ শৃঙ্খল।",

    directMarketplace: "সরাসরি মার্কেটপ্লেস",
    directMarketplaceText:
        "কৃষকদের সরাসরি ভোক্তা এবং পাইকারি ক্রেতাদের সঙ্গে সংযুক্ত করুন।",

    aiDemandForecasting: "AI চাহিদা পূর্বাভাস",
    aiDemandForecastingText:
        "ভবিষ্যৎ চাহিদার পূর্বাভাস দিন এবং কৃষকদের আরও ভালো বিক্রয় সিদ্ধান্ত নিতে সাহায্য করুন।",

    smartLogistics: "স্মার্ট লজিস্টিকস",
    smartLogisticsText:
        "রুট উন্নত করুন এবং পরিবহন খরচ কমান।",

    betterPrices: "আরও ভালো দাম",
    betterPricesText:
        "অপ্রয়োজনীয় মধ্যস্বত্বভোগীদের কমিয়ে কৃষকদের আয় বৃদ্ধি করুন।",

    artificialIntelligence: "কৃত্রিম বুদ্ধিমত্তা",

    predictOptimize: "চাহিদার পূর্বাভাস দিন। সরবরাহকে আরও ভালো করুন।",

    aiEngineText:
        "আমাদের AI ইঞ্জিন বাজারের প্রবণতা, ঐতিহাসিক চাহিদা এবং ক্রেতাদের কার্যকলাপ বিশ্লেষণ করে কৃষকদের কী বিক্রি করবেন, কখন বিক্রি করবেন এবং কোথায় পাঠাবেন তা সিদ্ধান্ত নিতে সাহায্য করে।",

    exploreAIInsights: "AI তথ্য দেখুন →",

    demandForecast: "চাহিদার পূর্বাভাস",
    liveDemo: "● লাইভ ডেমো",
    expectedDemandGrowth: "প্রত্যাশিত চাহিদা বৃদ্ধি",

    farmerAccount: "কৃষক অ্যাকাউন্ট",

    dashboard: "ড্যাশবোর্ড",
    myProduce: "আমার কৃষিপণ্য",
    orders: "অর্ডার",
    aiInsights: "AI অন্তর্দৃষ্টি",
    logistics: "লজিস্টিকস",
    earnings: "আয়",
    settings: "সেটিংস",
    logout: "লগআউট",

    farmerPortal: "কৃষক পোর্টাল",
    goodMorning: "সুপ্রভাত,",
    farmTodayMessage:
        "আজ আপনার খামারে কী ঘটছে তা এখানে দেখুন।",

    totalSales: "মোট বিক্রয়",
    comparedLastMonth: "গত মাসের তুলনায়",

    activeOrders: "সক্রিয় অর্ডার",
    readyForDispatch: "ডিসপ্যাচের জন্য ৪টি প্রস্তুত",

    produceListed: "তালিকাভুক্ত কৃষিপণ্য",
    availableForBuyers: "ক্রেতাদের জন্য উপলব্ধ",

    avgPrice: "গড় দাম",
    betterThanMandi: "মান্ডির চেয়ে ভালো",

    aiMarketIntelligence: "AI বাজারের তথ্য",
    demandForecast: "চাহিদার পূর্বাভাস",
    liveDemo: "• লাইভ ডেমো",
    expectedDemandGrowth: "প্রত্যাশিত চাহিদা বৃদ্ধি",
    highDemand: "উচ্চ চাহিদা ↑",

    aiRecommendation: "AI সুপারিশ",
    tomatoRecommendation:
        "আগামী ১৪ দিনে টমেটোর চাহিদা বাড়তে পারে। সরবরাহ ১৫% বাড়ানোর কথা বিবেচনা করুন।",

    quickActions: "দ্রুত কাজ",
    manageFarm: "খামার ব্যবস্থাপনা",

    listProduce: "কৃষিপণ্য তালিকাভুক্ত করুন",
    sellYourCrops: "আপনার ফসল বিক্রি করুন",

    viewOrders: "অর্ডার দেখুন",
    manageOrders: "অর্ডার পরিচালনা করুন",

    trackDelivery: "ডেলিভারি ট্র্যাক করুন",
    viewShipments: "শিপমেন্ট দেখুন",

    aiInsights: "AI অন্তর্দৃষ্টি",
    marketPredictions: "বাজারের পূর্বাভাস",

    recentActivity: "সাম্প্রতিক কার্যকলাপ",
    recentOrders: "সাম্প্রতিক অর্ডার",
    viewAll: "সব দেখুন →",

    inTransit: "পথে রয়েছে",
    delivered: "ডেলিভারি সম্পন্ন",
    processing: "প্রক্রিয়াধীন",

    farmerAccount: "কৃষক অ্যাকাউন্ট",

    market: "বাজার",
    todaysPrices: "আজকের দাম",

    salesManagement: "বিক্রয় ব্যবস্থাপনা",
    ordersReceived: "প্রাপ্ত অর্ডার 📦",
    manageBuyerOrders:
        "ক্রেতাদের দেওয়া অর্ডার দেখুন এবং পরিচালনা করুন।",

    totalOrders: "মোট অর্ডার",
    pending: "অপেক্ষমাণ",
    completed: "সম্পন্ন",
    totalSales: "মোট বিক্রয়",

    recentOrders: "সাম্প্রতিক অর্ডার",
    buyerOrders: "ক্রেতাদের অর্ডার",
    noOrdersYet: "এখনও কোনো অর্ডার নেই",
    buyerOrdersAppearHere:
        "ক্রেতাদের দেওয়া অর্ডার এখানে দেখা যাবে।",

    // AI INSIGHTS PAGE
    artificialIntelligence: "কৃত্রিম বুদ্ধিমত্তা",
    aiFarmingIntelligence: "AI কৃষি বুদ্ধিমত্তা",
    aiDescription:
        "স্মার্ট বাজারের পূর্বাভাস ব্যবহার করে কী চাষ করবেন, কখন বিক্রি করবেন এবং কতটা স্টক রাখবেন তা নির্ধারণ করুন।",

    aiActive: "AI সক্রিয়",

    analyseYourCrop: "আপনার ফসল বিশ্লেষণ করুন",
    selectCropForInsights:
        "AI অন্তর্দৃষ্টি দেখতে ফসল নির্বাচন করুন",

    crop: "ফসল",
    tomato: "টমেটো",
    potato: "আলু",
    onion: "পেঁয়াজ",
    rice: "চাল",

    gradeA: "গ্রেড A",
    fresh: "তাজা",
    premium: "প্রিমিয়াম",

    expectedDemand: "প্রত্যাশিত চাহিদা",
    next14Days: "আগামী ১৪ দিন",

    priceTrend: "দামের প্রবণতা",
    rising: "বাড়ছে",
    highConfidence: "উচ্চ নির্ভরযোগ্যতা",

    bestOpportunity: "সেরা সুযোগ",
    highDemandCrop: "উচ্চ চাহিদার ফসল",

    supply: "সরবরাহ",
    marketOutlook: "বাজারের পূর্বাভাস",

    // ================================
    // AI INSIGHTS - REMAINING
    // ================================

    forecastPeriod: "পূর্বাভাসের সময়কাল",
    days14: "১৪ দিন",
    confidence: "নির্ভরযোগ্যতা",

    aiMarketIntelligenceTitle: "AI বাজারের তথ্য",
    demandForecastTitle: "চাহিদার পূর্বাভাস",

    aiPredictionDescription:
        "ঐতিহাসিক বাজারের প্রবণতা, ক্রেতাদের কার্যকলাপ এবং মৌসুমি ধরণের সিমুলেটেড তথ্যের ভিত্তিতে AI পূর্বাভাস।",

    expectedDemandGrowth: "প্রত্যাশিত চাহিদা বৃদ্ধি",
    highDemand: "উচ্চ চাহিদা",

    now: "এখন",
    days7: "৭ দিন",

    aiQuickInsight: "AI দ্রুত অন্তর্দৃষ্টি",

    tomatoDemandInsight:
        "আগামী ১৪ দিনে টমেটোর চাহিদা বাড়বে বলে আশা করা হচ্ছে।",

    considerIncreasingSupply:
        "বাজারের দাম পর্যবেক্ষণ করার সময় সরবরাহ বাড়ানোর কথা বিবেচনা করুন।",

    aiConfidence: "AI নির্ভরযোগ্যতা",
    predictionConfidence: "পূর্বাভাসের নির্ভরযোগ্যতা",

    basedOnMarketData:
        "ঐতিহাসিক বাজারের প্রবণতা, ক্রেতাদের কার্যকলাপ এবং মৌসুমি চাহিদার ধরণের সিমুলেশনের উপর ভিত্তি করে।",

    priceTrend: "দামের প্রবণতা",
    rising: "↑ বাড়ছে",
    highConfidence: "উচ্চ নির্ভরযোগ্যতা",

    bestOpportunity: "সেরা সুযোগ",
    highDemandCrop: "উচ্চ চাহিদার ফসল",
    recommendedSupply: "প্রস্তাবিত সরবরাহ",
    suggestedIncrease: "প্রস্তাবিত বৃদ্ধি",

    // ================================
    // AI INSIGHTS - REMAINING
    // ================================

    forecastPeriod: "পূর্বাভাসের সময়কাল",
    days14: "১৪ দিন",
    confidence: "নির্ভরযোগ্যতা",

    aiMarketIntelligenceTitle: "AI বাজারের তথ্য",
    demandForecastTitle: "চাহিদার পূর্বাভাস",

    aiPredictionDescription:
        "ঐতিহাসিক বাজারের প্রবণতা, ক্রেতাদের কার্যকলাপ এবং মৌসুমি ধরণের সিমুলেটেড তথ্যের ভিত্তিতে AI পূর্বাভাস।",

    expectedDemandGrowth: "প্রত্যাশিত চাহিদা বৃদ্ধি",
    highDemand: "উচ্চ চাহিদা",

    now: "এখন",
    days7: "৭ দিন",

    aiQuickInsight: "AI দ্রুত অন্তর্দৃষ্টি",

    tomatoDemandInsight:
        "আগামী ১৪ দিনে টমেটোর চাহিদা বাড়বে বলে আশা করা হচ্ছে।",

    considerIncreasingSupply:
        "বাজারের দাম পর্যবেক্ষণ করার সময় সরবরাহ বাড়ানোর কথা বিবেচনা করুন।",

    aiConfidence: "AI নির্ভরযোগ্যতা",
    predictionConfidence: "পূর্বাভাসের নির্ভরযোগ্যতা",

    basedOnMarketData:
        "ঐতিহাসিক বাজারের প্রবণতা, ক্রেতাদের কার্যকলাপ এবং মৌসুমি চাহিদার ধরণের সিমুলেশনের উপর ভিত্তি করে।",

    aiRecommendations: "AI সুপারিশ",
    whatShouldYouDo: "আপনার কী করা উচিত? 💡",
    actionableSuggestions:
        "বর্তমান বাজার পরিস্থিতির উপর ভিত্তি করে পরামর্শ।",

    high: "উচ্চ",
    medium: "মাঝারি",

    increaseTomatoSupply: "টমেটোর সরবরাহ বাড়ান",
    tomatoDemandIncrease:
        "আগামী ১৪ দিনে টমেটোর চাহিদা বাড়বে বলে পূর্বাভাস দেওয়া হয়েছে।",
    recommended: "প্রস্তাবিত",

    monitorPrices: "দামের উপর নজর রাখুন",
    marketPricesUpward:
        "উচ্চ চাহিদার ফসলের বাজারদরে বৃদ্ধির প্রবণতা দেখা যাচ্ছে।",
    opportunity: "সুযোগ",

    trackMarketPrices: "বাজারের দাম ট্র্যাক করুন →",

    planInventory: "ইনভেন্টরি পরিকল্পনা করুন",
    maintainSufficientStock:
        "আসন্ন ক্রেতাদের চাহিদা পূরণের জন্য পর্যাপ্ত স্টক রাখুন।",
    priority: "অগ্রাধিকার",

    planInventoryButton: "ইনভেন্টরি পরিকল্পনা করুন →",
    viewSupplyPlan: "সরবরাহ পরিকল্পনা দেখুন →",

    kisanAiAssistant: "কিষাণ AI সহকারী",
    needHelpDeciding: "সিদ্ধান্ত নিতে সাহায্য দরকার?",
    askKisanAiDescription:
        "ফসল, দাম, চাহিদা বা আপনার পরবর্তী কৃষি সিদ্ধান্ত সম্পর্কে KisanAI-কে জিজ্ঞাসা করুন।",
    askKisanAI: "KisanAI-কে জিজ্ঞাসা করুন",

    explainableAI: "ব্যাখ্যাযোগ্য AI",
    whyThisPrediction: "এই পূর্বাভাস কেন? 🧠",
    understandSignals:
        "AI সুপারিশের পেছনের সংকেতগুলি বুঝুন।",
    viewReasoning: "কারণ দেখুন",

    buyerActivityIncreased: "ক্রেতাদের কার্যকলাপ বেড়েছে",
    buyerActivityDescription:
        "সিমুলেটেড ক্রেতা কার্যকলাপ ইতিবাচক চাহিদার সংকেত দেখাচ্ছে।",

    historicalDemandRising: "ঐতিহাসিক চাহিদা বাড়ছে",
    historicalDemandDescription:
        "আগের বাজারের ধরণ টমেটোর ক্রমবর্ধমান চাহিদার ইঙ্গিত দেয়।",

    marketPricesFavorable: "বাজারের দাম অনুকূল",
    marketPricesDescription:
        "বর্তমান সিমুলেটেড দাম বিক্রয়ের জন্য ইতিবাচক সুযোগ দেখাচ্ছে।",

    seasonalPatternDetected: "মৌসুমি ধরণ শনাক্ত হয়েছে",
    seasonalPatternDescription:
        "ঐতিহাসিক তথ্যের মধ্যে একই ধরনের মৌসুমি চাহিদার ধরণ দেখা গেছে।",

    aiPrototypeMode: "AI প্রোটোটাইপ মোড",
    simulatedDataNotice:
        "এই পূর্বাভাসগুলি বর্তমানে KisanDirect SIH প্রোটোটাইপের জন্য সিমুলেটেড ডেটা ব্যবহার করে।",
    analysisReady: "● বিশ্লেষণ প্রস্তুত",

    farmManagement: "কৃষি ব্যবস্থাপনা",
    myProduce: "আমার কৃষিপণ্য 🌾",
    manageCrops:
        "আপনার ফসল, দাম এবং উপলব্ধ স্টক পরিচালনা করুন।",
    addProduce: "+ কৃষিপণ্য যোগ করুন",
    totalListings: "মোট তালিকা",
    activeProduceListings: "সক্রিয় কৃষিপণ্য তালিকা",
    totalStock: "মোট স্টক",
    availableForBuyers: "ক্রেতাদের জন্য উপলব্ধ",
    todaysSales: "আজকের বিক্রয়",
    fromDirectBuyers: "সরাসরি ক্রেতাদের কাছ থেকে",
    averagePrice: "গড় দাম",
    perKilogram: "প্রতি কিলোগ্রাম",
    inventory: "ইনভেন্টরি",
    yourProduce: "আপনার কৃষিপণ্য",
    produce: "কৃষিপণ্য",
    quantity: "পরিমাণ",
    price: "দাম",
    status: "অবস্থা",
    action: "কার্যক্রম",
    freshTomato: "তাজা টমেটো",
    gradeARanchi: "গ্রেড A • রাঁচি",
    active: "সক্রিয়",
    edit: "সম্পাদনা করুন",
    premiumRice: "প্রিমিয়াম চাল",
    premiumPotato: "প্রিমিয়াম আলু",

    // Earnings & Payments
    financialManagement: "আর্থিক ব্যবস্থাপনা",
    earningsPayments: "আয় এবং পেমেন্ট 💰",
    trackFarmIncome:
        "আপনার কৃষি আয়, পেমেন্ট এবং আর্থিক কর্মক্ষমতা ট্র্যাক করুন।",

    totalEarnings: "মোট আয়",
    lifetimeFarmEarnings: "এখন পর্যন্ত মোট কৃষি আয়",

    thisMonth: "এই মাসে",
    earningsInAugust: "আগস্ট মাসের আয়",

    twoPayments: "২টি পেমেন্ট",
    pendingPayments: "অপেক্ষমাণ পেমেন্ট",
    awaitingBuyerPayment:
        "ক্রেতার পেমেন্টের অপেক্ষায়",

    available: "উপলব্ধ",
    availableBalance: "উপলব্ধ ব্যালেন্স",
    readyForWithdrawal: "উত্তোলনের জন্য প্রস্তুত",

    earningsOverview: "আয়ের সংক্ষিপ্ত বিবরণ",
    monthlyEarnings: "মাসিক আয়",

    cropPerformance: "ফসলের কর্মক্ষমতা",
    earningsByCrop: "ফসল অনুযায়ী আয়",

    tomatoEarningsPercent: "আয়ের ৩৮%",
    riceEarningsPercent: "আয়ের ৩৪%",
    potatoEarningsPercent: "আয়ের ২৮%",

    paymentActivity: "পেমেন্ট কার্যকলাপ",
    recentTransactions: "সাম্প্রতিক লেনদেন",

    paid: "পেমেন্ট করা হয়েছে",

    paymentAccount: "পেমেন্ট অ্যাকাউন্ট",
    settlementInformation: "পেমেন্ট নিষ্পত্তির তথ্য",

    nextSettlement: "পরবর্তী নিষ্পত্তি",
    pendingAmount: "অপেক্ষমাণ পরিমাণ",
    paymentMethod: "পেমেন্টের পদ্ধতি",
    bankTransfer: "ব্যাংক ট্রান্সফার",

    viewPaymentDetails: "💰 পেমেন্টের বিবরণ দেখুন",

    buyerAccount: "ক্রেতা অ্যাকাউন্ট",

    myOrders: "আমার অর্ডার",
    deliveries: "ডেলিভারি",
    payments: "পেমেন্ট",

    buyerPortal: "ক্রেতা পোর্টাল",
    welcomeBack: "আবার স্বাগতম,",
    buyerDashboardDescription:
        "কৃষক এবং FPO-দের কাছ থেকে সরাসরি তাজা কৃষিপণ্য সংগ্রহ করুন।",

    totalPurchases: "মোট ক্রয়",
    thisMonth: "এই মাসে",

    threeActive: "৩টি সক্রিয়",
    activeOrders: "সক্রিয় অর্ডার",
    ordersInProgress: "অর্ডার প্রক্রিয়াধীন",

    fourNew: "+৪টি নতুন",
    savedFarmers: "সংরক্ষিত কৃষক",
    trustedSuppliers: "বিশ্বস্ত সরবরাহকারী",

    onTime: "সময়মতো",
    deliveries: "ডেলিভারি",
    deliverySuccessRate: "ডেলিভারি সফলতার হার",

    recommendedProduce: "প্রস্তাবিত কৃষিপণ্য",
    viewMarketplace: "মার্কেটপ্লেস দেখুন →",
    buy: "কিনুন",

    kgAvailable800: "৮০০ কেজি উপলব্ধ",
    kgAvailable1200: "১,২০০ কেজি উপলব্ধ",
    kgAvailable650: "৬৫০ কেজি উপলব্ধ",

    smartBuying: "স্মার্ট ক্রয়",
    tomatoDemandExpected:
        "আগামী ১৪ দিনে টমেটোর চাহিদা বাড়বে বলে আশা করা হচ্ছে।",

    purchaseTomatoEarly:
        "সম্ভাব্য মূল্যবৃদ্ধি এড়াতে আগে থেকেই টমেটোর স্টক কেনার কথা বিবেচনা করুন।",

    viewAIInsights: "AI অন্তর্দৃষ্টি দেখুন →",

    yourActivity: "আপনার কার্যকলাপ",

    inTransit: "পথে রয়েছে",
    delivered: "ডেলিভারি সম্পন্ন",
    processing: "প্রক্রিয়াধীন",

    activeDelivery: "সক্রিয় ডেলিভারি",
    you: "আপনি",
    estimatedArrival: "আনুমানিক আগমন",
    distance: "দূরত্ব",
    trackDelivery: "🚚 ডেলিভারি ট্র্যাক করুন",

    farmerNetwork: "কৃষক নেটওয়ার্ক",
    farmersTitle: "কৃষক 👨‍🌾",
    farmerNetworkDescription:
        "বিশ্বস্ত স্থানীয় কৃষকদের খুঁজুন এবং তাদের সঙ্গে যোগাযোগ করুন।",

    availableFarmers: "উপলব্ধ কৃষক",
    verifiedFarmers: "যাচাইকৃত কৃষক",
    yourTrustedSuppliers: "আপনার বিশ্বস্ত সরবরাহকারী",
    nearbyFarmers: "কাছাকাছি কৃষক",
    withinYourRegion: "আপনার অঞ্চলে",

    fpos: "FPOs",
    farmerOrganizations: "কৃষক সংগঠন",

    localFarmers: "স্থানীয় কৃষক",
    trustedFarmers: "বিশ্বস্ত কৃষক 👨‍🌾",
    verifiedFarmersDirectPurchase:
        "সরাসরি ক্রয়ের জন্য যাচাইকৃত কৃষক উপলব্ধ",

    verifiedNetwork: "✓ যাচাইকৃত নেটওয়ার্ক",

    view: "দেখুন",

    purchaseManagement: "ক্রয় ব্যবস্থাপনা",
    trackManagePurchases:
        "স্থানীয় কৃষকদের কাছ থেকে করা সমস্ত ক্রয় ট্র্যাক এবং পরিচালনা করুন।",

    farmerDirect: "🌱 কৃষকের কাছ থেকে সরাসরি ক্রয়",
    secureOrders: "🔒 নিরাপদ অর্ডার",
    trackable: "🚚 ট্র্যাকযোগ্য",

    orderHub: "অর্ডার হাব",
    allPurchasesOnePlace:
        "সমস্ত ক্রয় এক জায়গায়",

    orderHistory: "অর্ডারের ইতিহাস",
    yourOrders: "আপনার অর্ডার",
    noOrdersYet: "এখনও কোনো অর্ডার নেই",
    placedOrdersAppearHere:
        "আপনার করা অর্ডার এখানে দেখা যাবে।",

    footerDescription:
        "একটি স্মার্ট এবং ন্যায্য কৃষি মার্কেটপ্লেস তৈরি করা।",
    footerCopyright:
        "© 2026 KisanDirect • SIH প্রোটোটাইপ",

    loginToContinue:
        "KisanDirect-এ চালিয়ে যেতে লগইন করুন",
    mobileNumber: "মোবাইল নম্বর",
    password: "পাসওয়ার্ড",
    rememberMe: "আমাকে মনে রাখুন",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    loginButton: "লগইন →",

    newToKisanDirect: "KisanDirect-এ নতুন?",
    createAccount: "অ্যাকাউন্ট তৈরি করুন",

    prototypeDemo: "প্রোটোটাইপ ডেমো",
    localAccountLogin:
        "আপনি স্থানীয়ভাবে অ্যাকাউন্ট তৈরি করে লগইন করতে পারেন।",

    back: "← ফিরে যান",
    joinKisanDirect: "KisanDirect-এ যোগ দিন",
    howUsePlatform:
        "আপনি কীভাবে প্ল্যাটফর্মটি ব্যবহার করতে চান?",

    farmerFpoAccount: "আমি কৃষক / FPO",
    farmerAccountDescription:
        "সরাসরি কৃষিপণ্য বিক্রি করুন, অর্ডার গ্রহণ করুন এবং AI বাজারের তথ্য ব্যবহার করুন।",

    buyerAccountOption: "আমি একজন ক্রেতা",
    buyerAccountDescription:
        "যাচাইকৃত কৃষক এবং FPO-দের কাছ থেকে সরাসরি তাজা কৃষিপণ্য কিনুন।",

    createFarmerAccount: "কৃষক অ্যাকাউন্ট তৈরি করুন",
    startSellingDirectly:
        "KisanDirect-এর মাধ্যমে সরাসরি বিক্রি শুরু করুন",

    fullName: "পুরো নাম",
    villageCity: "গ্রাম / শহর",
    district: "জেলা",
    state: "রাজ্য",
    primaryCrop: "প্রধান ফসল",
    createPassword: "পাসওয়ার্ড তৈরি করুন",
    createFarmerAccountButton:
        "কৃষক অ্যাকাউন্ট তৈরি করুন →",

    createBuyerAccount: "ক্রেতা অ্যাকাউন্ট তৈরি করুন",
    sourceDirectlyFromFarmers:
        "কৃষকদের কাছ থেকে সরাসরি কৃষিপণ্য সংগ্রহ করুন",
    nameBusinessName: "নাম / ব্যবসার নাম",
    buyerType: "ক্রেতার ধরন",
    location: "অবস্থান",
    createBuyerAccountButton:
        "ক্রেতা অ্যাকাউন্ট তৈরি করুন →",

    accountCreated: "অ্যাকাউন্ট তৈরি হয়েছে!",
    accountCreatedSuccessfully:
        "আপনার KisanDirect অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।",
    continueToLogin: "লগইন করতে এগিয়ে যান →",

    farmManagement: "কৃষি ব্যবস্থাপনা",
    addNewProduce: "নতুন কৃষিপণ্য যোগ করুন 🌾",
    listFreshProduce:
        "ভোক্তা এবং পাইকারি ক্রেতাদের জন্য আপনার তাজা কৃষিপণ্য সরাসরি তালিকাভুক্ত করুন।",

    produceName: "কৃষিপণ্যের নাম",
    category: "বিভাগ",
    qualityGrade: "গুণমানের গ্রেড",
    quantityAvailable: "উপলব্ধ পরিমাণ",
    unit: "একক",
    pricePerKg: "প্রতি কেজি দাম",
    farmPickupLocation: "খামার / পিকআপের স্থান",
    availableFrom: "উপলব্ধতার শুরু",
    cancel: "বাতিল করুন",
    listProduce: "🌾 কৃষিপণ্য তালিকাভুক্ত করুন",

    kisanDirectAIAssistant: "KISANDIRECT AI সহকারী",
    kisanAIAnalysis: "KisanAI বিশ্লেষণ",
    smartGuidance:
        "বর্তমান ফসলের তথ্যের ভিত্তিতে স্মার্ট নির্দেশনা।",
    selectedCrop: "নির্বাচিত ফসল",
    supply: "📦 সরবরাহ",
    maintainSupplyMonitorMarket:
        "বর্তমান সরবরাহের মাত্রা বজায় রাখুন এবং বাজারের পরিস্থিতি পর্যবেক্ষণ করুন।",
    gotIt: "বুঝেছি ✓"
},

mr: {
    home: "मुख्यपृष्ठ",
    marketplace: "मार्केटप्लेस",
    howItWorks: "हे कसे कार्य करते",
    aiSolutions: "AI उपाय",
    login: "लॉगिन",
    joinNow: "आत्ताच सामील व्हा",

    badge: "AI-सक्षम कृषी मार्केटप्लेस",
    heroTitle1: "शेतातून",
    heroTitle2: "थेट",
    heroTitle3: "बाजारपेठेत.",
    heroText:
        "KisanDirect शेतकरी आणि FPO यांना थेट ग्राहक आणि घाऊक खरेदीदारांशी जोडते. यामुळे शेतकऱ्यांना चांगला भाव मिळतो आणि पुरवठा साखळीतील अकार्यक्षमता कमी होते.",

    explore: "मार्केटप्लेस पहा",
    joinFarmer: "शेतकरी म्हणून सामील व्हा",

    smartAgriculture: "स्मार्ट शेती",
    smartText:
        "एका प्लॅटफॉर्मद्वारे शेतकरी, खरेदीदार आणि लॉजिस्टिक्स यांना जोडणे.",

    aiMarket: "AI बाजार बुद्धिमत्ता",
    demand: "पुढील १४ दिवसांत अपेक्षित मागणी वाढ",
    recommendation: "AI शिफारस",

    farmers: "शेतकरी",
    buyers: "खरेदीदार",
    states: "राज्ये",
    farmerSales: "शेतकरी विक्री",

    farmer: "शेतकरी",
    buyer: "खरेदीदार",

    freshFromFarm: "शेतातून ताजे",
    farmerMarketplace: "शेतकरी मार्केटप्लेस",
    marketText:
        "शेतकऱ्यांकडून थेट पारदर्शक दरात ताजी शेती उत्पादने खरेदी करा.",

    whyKisanDirect: "KisanDirect का?",
    smarterSupplyChain: "अधिक स्मार्ट कृषी पुरवठा साखळी.",

    directMarketplace: "थेट मार्केटप्लेस",
    directMarketplaceText:
        "शेतकऱ्यांना थेट ग्राहक आणि घाऊक खरेदीदारांशी जोडा.",

    aiDemandForecasting: "AI मागणी अंदाज",
    aiDemandForecastingText:
        "भविष्यातील मागणीचा अंदाज लावा आणि शेतकऱ्यांना चांगले विक्री निर्णय घेण्यास मदत करा.",

    smartLogistics: "स्मार्ट लॉजिस्टिक्स",
    smartLogisticsText:
        "मार्ग अधिक कार्यक्षम करा आणि वाहतूक खर्च कमी करा.",

    betterPrices: "चांगले दर",
    betterPricesText:
        "अनावश्यक मध्यस्थ कमी करा आणि शेतकऱ्यांचे उत्पन्न वाढवा.",

    artificialIntelligence: "कृत्रिम बुद्धिमत्ता",

    predictOptimize: "मागणीचा अंदाज लावा. पुरवठा अधिक चांगला करा.",

    aiEngineText:
        "आमचे AI इंजिन बाजारातील कल, ऐतिहासिक मागणी आणि खरेदीदारांच्या हालचालींचे विश्लेषण करून शेतकऱ्यांना काय विकायचे, कधी विकायचे आणि कुठे पाठवायचे हे ठरवण्यास मदत करते.",

    exploreAIInsights: "AI माहिती पहा →",

    demandForecast: "मागणीचा अंदाज",
    liveDemo: "● थेट डेमो",
    expectedDemandGrowth: "अपेक्षित मागणी वाढ",

    farmerAccount: "शेतकरी खाते",

    dashboard: "डॅशबोर्ड",
    myProduce: "माझी उत्पादने",
    orders: "ऑर्डर्स",
    aiInsights: "AI माहिती",
    logistics: "लॉजिस्टिक्स",
    earnings: "कमाई",
    settings: "सेटिंग्ज",
    logout: "लॉगआउट",

    farmerPortal: "शेतकरी पोर्टल",
    goodMorning: "सुप्रभात,",
    farmTodayMessage:
        "आज तुमच्या शेतावर काय घडत आहे ते येथे पहा.",

    totalSales: "एकूण विक्री",
    comparedLastMonth: "मागील महिन्याच्या तुलनेत",

    activeOrders: "सक्रिय ऑर्डर्स",
    readyForDispatch: "डिस्पॅचसाठी ४ तयार",

    produceListed: "सूचीबद्ध उत्पादने",
    availableForBuyers: "खरेदीदारांसाठी उपलब्ध",

    avgPrice: "सरासरी किंमत",
    betterThanMandi: "मंडीपेक्षा चांगली",

    aiMarketIntelligence: "AI बाजार माहिती",
    demandForecast: "मागणीचा अंदाज",
    liveDemo: "• थेट डेमो",
    expectedDemandGrowth: "अपेक्षित मागणी वाढ",
    highDemand: "जास्त मागणी ↑",

    aiRecommendation: "AI शिफारस",
    tomatoRecommendation:
        "पुढील १४ दिवसांत टोमॅटोची मागणी वाढू शकते. पुरवठा १५% वाढवण्याचा विचार करा.",

    quickActions: "जलद कृती",
    manageFarm: "शेती व्यवस्थापन",

    listProduce: "उत्पादन सूचीबद्ध करा",
    sellYourCrops: "तुमची पिके विका",

    viewOrders: "ऑर्डर्स पहा",
    manageOrders: "ऑर्डर्स व्यवस्थापित करा",

    trackDelivery: "डिलिव्हरी ट्रॅक करा",
    viewShipments: "शिपमेंट्स पहा",

    aiInsights: "AI माहिती",
    marketPredictions: "बाजार अंदाज",

    recentActivity: "अलीकडील क्रियाकलाप",
    recentOrders: "अलीकडील ऑर्डर्स",
    viewAll: "सर्व पहा →",

    inTransit: "मार्गावर",
    delivered: "डिलिव्हरी पूर्ण",
    processing: "प्रक्रियेत",

    market: "बाजार",
    todaysPrices: "आजचे दर",

    salesManagement: "विक्री व्यवस्थापन",
    ordersReceived: "प्राप्त ऑर्डर्स 📦",
    manageBuyerOrders:
        "खरेदीदारांनी दिलेल्या ऑर्डर्स पहा आणि व्यवस्थापित करा.",

    totalOrders: "एकूण ऑर्डर्स",
    pending: "प्रलंबित",
    completed: "पूर्ण",
    totalSales: "एकूण विक्री",

    buyerOrders: "खरेदीदारांच्या ऑर्डर्स",
    noOrdersYet: "अजून कोणतीही ऑर्डर नाही",
    buyerOrdersAppearHere:
        "खरेदीदारांनी दिलेल्या ऑर्डर्स येथे दिसतील.",

    // AI INSIGHTS PAGE

    aiFarmingIntelligence: "AI कृषी बुद्धिमत्ता",
    aiDescription:
        "स्मार्ट बाजार अंदाजाद्वारे काय पिकवायचे, कधी विकायचे आणि किती साठा ठेवायचा हे ठरवा.",

    aiActive: "AI सक्रिय",

    analyseYourCrop: "तुमच्या पिकाचे विश्लेषण करा",
    selectCropForInsights:
        "AI माहिती पाहण्यासाठी पीक निवडा",

    crop: "पीक",
    tomato: "टोमॅटो",
    potato: "बटाटा",
    onion: "कांदा",
    rice: "तांदूळ",

    gradeA: "ग्रेड A",
    fresh: "ताजे",
    premium: "प्रीमियम",

    expectedDemand: "अपेक्षित मागणी",
    next14Days: "पुढील १४ दिवस",

    priceTrend: "किंमतीचा कल",
    rising: "वाढत आहे",
    highConfidence: "उच्च विश्वासार्हता",

    bestOpportunity: "सर्वोत्तम संधी",
    highDemandCrop: "जास्त मागणी असलेले पीक",

    supply: "पुरवठा",
    marketOutlook: "बाजाराचा अंदाज",

    forecastPeriod: "अंदाज कालावधी",
    days14: "१४ दिवस",
    confidence: "विश्वासार्हता",

    aiMarketIntelligenceTitle: "AI बाजार बुद्धिमत्ता",
    demandForecastTitle: "मागणीचा अंदाज",

    aiPredictionDescription:
        "ऐतिहासिक बाजारातील कल, खरेदीदारांच्या हालचाली आणि हंगामी पद्धतींच्या सिम्युलेटेड डेटावर आधारित AI अंदाज.",

    now: "आत्ता",
    days7: "७ दिवस",

    aiQuickInsight: "AI जलद माहिती",

    tomatoDemandInsight:
        "पुढील १४ दिवसांत टोमॅटोची मागणी वाढण्याची अपेक्षा आहे.",

    considerIncreasingSupply:
        "बाजारातील किंमतींवर लक्ष ठेवून पुरवठा वाढवण्याचा विचार करा.",

    aiConfidence: "AI विश्वासार्हता",
    predictionConfidence: "अंदाजाची विश्वासार्हता",

    basedOnMarketData:
        "ऐतिहासिक बाजारातील कल, खरेदीदारांच्या हालचाली आणि हंगामी मागणीच्या सिम्युलेटेड पॅटर्नवर आधारित.",

    recommendedSupply: "शिफारस केलेला पुरवठा",
    suggestedIncrease: "सुचवलेली वाढ",

    aiRecommendations: "AI शिफारसी",
    whatShouldYouDo: "तुम्ही काय करावे? 💡",
    actionableSuggestions:
        "सध्याच्या बाजार परिस्थितीवर आधारित सूचना.",

    high: "उच्च",
    medium: "मध्यम",

    increaseTomatoSupply: "टोमॅटोचा पुरवठा वाढवा",
    tomatoDemandIncrease:
        "पुढील १४ दिवसांत टोमॅटोची मागणी वाढण्याचा अंदाज आहे.",
    recommended: "शिफारस केलेले",

    monitorPrices: "किंमतींवर लक्ष ठेवा",
    marketPricesUpward:
        "जास्त मागणी असलेल्या पिकांच्या बाजारभावात वाढीचा कल दिसत आहे.",
    opportunity: "संधी",

    trackMarketPrices: "बाजारभाव ट्रॅक करा →",

    planInventory: "इन्व्हेंटरीचे नियोजन करा",
    maintainSufficientStock:
        "आगामी खरेदीदारांची मागणी पूर्ण करण्यासाठी पुरेसा साठा ठेवा.",
    priority: "प्राधान्य",

    planInventoryButton: "इन्व्हेंटरीचे नियोजन करा →",
    viewSupplyPlan: "पुरवठा योजना पहा →",

    kisanAiAssistant: "किसान AI सहाय्यक",
    needHelpDeciding: "निर्णय घेण्यासाठी मदत हवी आहे?",
    askKisanAiDescription:
        "पिके, किंमती, मागणी किंवा तुमच्या पुढील शेती निर्णयाबद्दल KisanAI ला विचारा.",
    askKisanAI: "KisanAI ला विचारा",

    explainableAI: "स्पष्टीकरणात्मक AI",
    whyThisPrediction: "हा अंदाज का? 🧠",
    understandSignals:
        "AI शिफारसीमागील संकेत समजून घ्या.",
    viewReasoning: "कारण पहा",

    buyerActivityIncreased: "खरेदीदारांची हालचाल वाढली",
    buyerActivityDescription:
        "सिम्युलेटेड खरेदीदारांची हालचाल सकारात्मक मागणीचे संकेत दर्शवते.",

    historicalDemandRising: "ऐतिहासिक मागणी वाढत आहे",
    historicalDemandDescription:
        "मागील बाजारातील पद्धती टोमॅटोच्या वाढत्या मागणीचे संकेत देतात.",

    marketPricesFavorable: "बाजारातील किंमती अनुकूल आहेत",
    marketPricesDescription:
        "सध्याच्या सिम्युलेटेड किंमती विक्रीसाठी सकारात्मक संधी दर्शवतात.",

    seasonalPatternDetected: "हंगामी पॅटर्न आढळला",
    seasonalPatternDescription:
        "ऐतिहासिक डेटामध्ये अशाच प्रकारचे हंगामी मागणी पॅटर्न आढळले आहेत.",

    aiPrototypeMode: "AI प्रोटोटाइप मोड",
    simulatedDataNotice:
        "हे अंदाज सध्या KisanDirect SIH प्रोटोटाइपसाठी सिम्युलेटेड डेटाचा वापर करतात.",
    analysisReady: "● विश्लेषण तयार",

    farmManagement: "शेती व्यवस्थापन",
    myProduce: "माझी उत्पादने 🌾",
    manageCrops:
        "तुमची पिके, किंमती आणि उपलब्ध साठा व्यवस्थापित करा.",
    addProduce: "+ उत्पादन जोडा",
    totalListings: "एकूण सूची",
    activeProduceListings: "सक्रिय उत्पादन सूची",
    totalStock: "एकूण साठा",
    availableForBuyers: "खरेदीदारांसाठी उपलब्ध",
    todaysSales: "आजची विक्री",
    fromDirectBuyers: "थेट खरेदीदारांकडून",
    averagePrice: "सरासरी किंमत",
    perKilogram: "प्रति किलोग्रॅम",
    inventory: "इन्व्हेंटरी",
    yourProduce: "तुमची उत्पादने",
    produce: "उत्पादन",
    quantity: "प्रमाण",
    price: "किंमत",
    status: "स्थिती",
    action: "कृती",
    freshTomato: "ताजे टोमॅटो",
    gradeARanchi: "ग्रेड A • रांची",
    active: "सक्रिय",
    edit: "संपादित करा",
    premiumRice: "प्रीमियम तांदूळ",
    premiumPotato: "प्रीमियम बटाटा",

    // Earnings & Payments

    financialManagement: "आर्थिक व्यवस्थापन",
    earningsPayments: "कमाई आणि पेमेंट 💰",
    trackFarmIncome:
        "तुमचे शेती उत्पन्न, पेमेंट आणि आर्थिक कामगिरी ट्रॅक करा.",

    totalEarnings: "एकूण कमाई",
    lifetimeFarmEarnings: "आतापर्यंतची एकूण शेती कमाई",

    thisMonth: "या महिन्यात",
    earningsInAugust: "ऑगस्टमधील कमाई",

    twoPayments: "२ पेमेंट",
    pendingPayments: "प्रलंबित पेमेंट",
    awaitingBuyerPayment:
        "खरेदीदाराच्या पेमेंटची प्रतीक्षा",

    available: "उपलब्ध",
    availableBalance: "उपलब्ध शिल्लक",
    readyForWithdrawal: "पैसे काढण्यासाठी तयार",

    earningsOverview: "कमाईचा आढावा",
    monthlyEarnings: "मासिक कमाई",

    cropPerformance: "पिकांची कामगिरी",
    earningsByCrop: "पिकानुसार कमाई",

    tomatoEarningsPercent: "कमाईपैकी ३८%",
    riceEarningsPercent: "कमाईपैकी ३४%",
    potatoEarningsPercent: "कमाईपैकी २८%",

    paymentActivity: "पेमेंट क्रियाकलाप",
    recentTransactions: "अलीकडील व्यवहार",

    paid: "पेमेंट केले",

    paymentAccount: "पेमेंट खाते",
    settlementInformation: "पेमेंट सेटलमेंट माहिती",

    nextSettlement: "पुढील सेटलमेंट",
    pendingAmount: "प्रलंबित रक्कम",
    paymentMethod: "पेमेंट पद्धत",
    bankTransfer: "बँक ट्रान्सफर",

    viewPaymentDetails: "💰 पेमेंट तपशील पहा",

    buyerAccount: "खरेदीदार खाते",

    myOrders: "माझ्या ऑर्डर्स",
    deliveries: "डिलिव्हरी",
    payments: "पेमेंट",

    buyerPortal: "खरेदीदार पोर्टल",
    welcomeBack: "पुन्हा स्वागत आहे,",
    buyerDashboardDescription:
        "शेतकरी आणि FPO कडून थेट ताजी शेती उत्पादने मिळवा.",

    totalPurchases: "एकूण खरेदी",
    threeActive: "३ सक्रिय",
    activeOrders: "सक्रिय ऑर्डर्स",
    ordersInProgress: "ऑर्डर्स प्रक्रियेत आहेत",

    fourNew: "+४ नवीन",
    savedFarmers: "जतन केलेले शेतकरी",
    trustedSuppliers: "विश्वसनीय पुरवठादार",

    onTime: "वेळेवर",
    deliverySuccessRate: "डिलिव्हरी यश दर",

    recommendedProduce: "शिफारस केलेली उत्पादने",
    viewMarketplace: "मार्केटप्लेस पहा →",
    buy: "खरेदी करा",

    kgAvailable800: "८०० किग्रॅ उपलब्ध",
    kgAvailable1200: "१,२०० किग्रॅ उपलब्ध",
    kgAvailable650: "६५० किग्रॅ उपलब्ध",

    smartBuying: "स्मार्ट खरेदी",
    tomatoDemandExpected:
        "पुढील १४ दिवसांत टोमॅटोची मागणी वाढण्याची अपेक्षा आहे.",

    purchaseTomatoEarly:
        "संभाव्य किंमत वाढ टाळण्यासाठी टोमॅटोचा साठा आधीच खरेदी करण्याचा विचार करा.",

    viewAIInsights: "AI माहिती पहा →",

    yourActivity: "तुमची क्रियाकलाप",

    activeDelivery: "सक्रिय डिलिव्हरी",
    you: "तुम्ही",
    estimatedArrival: "अंदाजे आगमन",
    distance: "अंतर",
    trackDelivery: "🚚 डिलिव्हरी ट्रॅक करा",

    farmerNetwork: "शेतकरी नेटवर्क",
    farmersTitle: "शेतकरी 👨‍🌾",
    farmerNetworkDescription:
        "विश्वसनीय स्थानिक शेतकरी शोधा आणि त्यांच्याशी संपर्क साधा.",

    availableFarmers: "उपलब्ध शेतकरी",
    verifiedFarmers: "सत्यापित शेतकरी",
    yourTrustedSuppliers: "तुमचे विश्वसनीय पुरवठादार",
    nearbyFarmers: "जवळचे शेतकरी",
    withinYourRegion: "तुमच्या प्रदेशात",

    fpos: "FPOs",
    farmerOrganizations: "शेतकरी संस्था",

    localFarmers: "स्थानिक शेतकरी",
    trustedFarmers: "विश्वसनीय शेतकरी 👨‍🌾",
    verifiedFarmersDirectPurchase:
        "थेट खरेदीसाठी सत्यापित शेतकरी उपलब्ध",

    verifiedNetwork: "✓ सत्यापित नेटवर्क",

    view: "पहा",

    purchaseManagement: "खरेदी व्यवस्थापन",
    trackManagePurchases:
        "स्थानिक शेतकऱ्यांकडून केलेल्या सर्व खरेदींचा मागोवा घ्या आणि व्यवस्थापित करा.",

    farmerDirect: "🌱 शेतकऱ्याकडून थेट खरेदी",
    secureOrders: "🔒 सुरक्षित ऑर्डर्स",
    trackable: "🚚 ट्रॅक करण्यायोग्य",

    orderHub: "ऑर्डर हब",
    allPurchasesOnePlace:
        "सर्व खरेदी एकाच ठिकाणी",

    orderHistory: "ऑर्डर इतिहास",
    yourOrders: "तुमच्या ऑर्डर्स",
    noOrdersYet: "अजून कोणतीही ऑर्डर नाही",
    placedOrdersAppearHere:
        "तुम्ही दिलेल्या ऑर्डर्स येथे दिसतील.",

    footerDescription:
        "एक स्मार्ट आणि न्याय्य कृषी मार्केटप्लेस तयार करणे.",
    footerCopyright:
        "© 2026 KisanDirect • SIH प्रोटोटाइप",

    loginToContinue:
        "KisanDirect वर पुढे जाण्यासाठी लॉगिन करा",
    mobileNumber: "मोबाइल नंबर",
    password: "पासवर्ड",
    rememberMe: "मला लक्षात ठेवा",
    forgotPassword: "पासवर्ड विसरलात?",
    loginButton: "लॉगिन →",

    newToKisanDirect: "KisanDirect वर नवीन आहात?",
    createAccount: "खाते तयार करा",

    prototypeDemo: "प्रोटोटाइप डेमो",
    localAccountLogin:
        "तुम्ही स्थानिक पातळीवर खाते तयार करून लॉगिन करू शकता.",

    back: "← मागे",
    joinKisanDirect: "KisanDirect मध्ये सामील व्हा",
    howUsePlatform:
        "तुम्हाला प्लॅटफॉर्मचा वापर कसा करायचा आहे?",

    farmerFpoAccount: "मी शेतकरी / FPO आहे",
    farmerAccountDescription:
        "थेट उत्पादने विका, ऑर्डर्स मिळवा आणि AI बाजार माहितीचा वापर करा.",

    buyerAccountOption: "मी खरेदीदार आहे",
    buyerAccountDescription:
        "सत्यापित शेतकरी आणि FPO कडून थेट ताजी शेती उत्पादने खरेदी करा.",

    createFarmerAccount: "शेतकरी खाते तयार करा",
    startSellingDirectly:
        "KisanDirect द्वारे थेट विक्री सुरू करा",

    fullName: "पूर्ण नाव",
    villageCity: "गाव / शहर",
    district: "जिल्हा",
    state: "राज्य",
    primaryCrop: "मुख्य पीक",
    createPassword: "पासवर्ड तयार करा",
    createFarmerAccountButton:
        "शेतकरी खाते तयार करा →",

    createBuyerAccount: "खरेदीदार खाते तयार करा",
    sourceDirectlyFromFarmers:
        "शेतकऱ्यांकडून थेट उत्पादने मिळवा",
    nameBusinessName: "नाव / व्यवसायाचे नाव",
    buyerType: "खरेदीदाराचा प्रकार",
    location: "स्थान",
    createBuyerAccountButton:
        "खरेदीदार खाते तयार करा →",

    accountCreated: "खाते तयार झाले!",
    accountCreatedSuccessfully:
        "तुमचे KisanDirect खाते यशस्वीपणे तयार झाले आहे.",
    continueToLogin: "लॉगिन करण्यासाठी पुढे जा →",

    addNewProduce: "नवीन उत्पादन जोडा 🌾",
    listFreshProduce:
        "ग्राहक आणि घाऊक खरेदीदारांसाठी तुमची ताजी उत्पादने थेट सूचीबद्ध करा.",

    produceName: "उत्पादनाचे नाव",
    category: "श्रेणी",
    qualityGrade: "गुणवत्ता ग्रेड",
    quantityAvailable: "उपलब्ध प्रमाण",
    unit: "एकक",
    pricePerKg: "प्रति किग्रॅ किंमत",
    farmPickupLocation: "शेत / पिकअप स्थान",
    availableFrom: "उपलब्धतेची सुरुवात",
    cancel: "रद्द करा",
    listProduce: "🌾 उत्पादन सूचीबद्ध करा",

    kisanDirectAIAssistant: "KISANDIRECT AI सहाय्यक",
    kisanAIAnalysis: "KisanAI विश्लेषण",
    smartGuidance:
        "सध्याच्या पिकांच्या माहितीवर आधारित स्मार्ट मार्गदर्शन.",
    selectedCrop: "निवडलेले पीक",
    supply: "📦 पुरवठा",
    maintainSupplyMonitorMarket:
        "सध्याची पुरवठा पातळी कायम ठेवा आणि बाजारातील परिस्थितीवर लक्ष ठेवा.",
    gotIt: "समजले ✓"
},

te: {
    home: "హోమ్",
    marketplace: "మార్కెట్‌ప్లేస్",
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    aiSolutions: "AI పరిష్కారాలు",
    login: "లాగిన్",
    joinNow: "ఇప్పుడే చేరండి",

    badge: "AI ఆధారిత వ్యవసాయ మార్కెట్‌ప్లేస్",
    heroTitle1: "పొలం నుండి",
    heroTitle2: "నేరుగా",
    heroTitle3: "మార్కెట్‌కు.",
    heroText:
        "KisanDirect రైతులు మరియు FPOలను నేరుగా వినియోగదారులు మరియు భారీ కొనుగోలుదారులతో అనుసంధానిస్తుంది. రైతులు మెరుగైన ధరలు పొందడానికి మరియు సరఫరా గొలుసులోని అసమర్థతలను తగ్గించడానికి ఇది సహాయపడుతుంది.",

    explore: "మార్కెట్‌ప్లేస్‌ను చూడండి",
    joinFarmer: "రైతుగా చేరండి",

    smartAgriculture: "స్మార్ట్ వ్యవసాయం",
    smartText:
        "ఒకే ప్లాట్‌ఫారమ్ ద్వారా రైతులు, కొనుగోలుదారులు మరియు లాజిస్టిక్స్‌ను అనుసంధానించడం.",

    aiMarket: "AI మార్కెట్ ఇంటెలిజెన్స్",
    demand: "రాబోయే 14 రోజుల్లో అంచనా వేసిన డిమాండ్ పెరుగుదల",
    recommendation: "AI సిఫార్సు",

    farmers: "రైతులు",
    buyers: "కొనుగోలుదారులు",
    states: "రాష్ట్రాలు",
    farmerSales: "రైతుల విక్రయాలు",

    farmer: "రైతు",
    buyer: "కొనుగోలుదారు",

    freshFromFarm: "పొలం నుండి తాజా",
    farmerMarketplace: "రైతుల మార్కెట్‌ప్లేస్",
    marketText:
        "రైతుల నుండి నేరుగా పారదర్శక ధరలకు తాజా వ్యవసాయ ఉత్పత్తులను కొనుగోలు చేయండి.",

    whyKisanDirect: "KisanDirect ఎందుకు?",
    smarterSupplyChain: "మరింత స్మార్ట్ వ్యవసాయ సరఫరా గొలుసు.",

    directMarketplace: "నేరుగా మార్కెట్‌ప్లేస్",
    directMarketplaceText:
        "రైతులను నేరుగా వినియోగదారులు మరియు భారీ కొనుగోలుదారులతో అనుసంధానించండి.",

    aiDemandForecasting: "AI డిమాండ్ అంచనా",
    aiDemandForecastingText:
        "రాబోయే డిమాండ్‌ను అంచనా వేసి రైతులు మెరుగైన విక్రయ నిర్ణయాలు తీసుకునేలా సహాయపడండి.",

    smartLogistics: "స్మార్ట్ లాజిస్టిక్స్",
    smartLogisticsText:
        "మార్గాలను మెరుగుపరచి రవాణా ఖర్చులను తగ్గించండి.",

    betterPrices: "మెరుగైన ధరలు",
    betterPricesText:
        "అనవసర మధ్యవర్తులను తగ్గించి రైతుల ఆదాయాన్ని పెంచండి.",

    artificialIntelligence: "కృత్రిమ మేధస్సు",

    predictOptimize:
        "డిమాండ్‌ను అంచనా వేయండి. సరఫరాను మెరుగుపరచండి.",

    aiEngineText:
        "మా AI ఇంజిన్ మార్కెట్ ధోరణులు, చారిత్రక డిమాండ్ మరియు కొనుగోలుదారుల కార్యకలాపాలను విశ్లేషించి రైతులు ఏమి అమ్మాలి, ఎప్పుడు అమ్మాలి మరియు ఎక్కడికి పంపాలి అనే నిర్ణయాలు తీసుకోవడంలో సహాయపడుతుంది.",

    exploreAIInsights: "AI సమాచారాన్ని చూడండి →",

    demandForecast: "డిమాండ్ అంచనా",
    liveDemo: "● లైవ్ డెమో",
    expectedDemandGrowth: "అంచనా వేసిన డిమాండ్ పెరుగుదల",

    farmerAccount: "రైతు ఖాతా",

    dashboard: "డ్యాష్‌బోర్డ్",
    myProduce: "నా ఉత్పత్తులు",
    orders: "ఆర్డర్లు",
    aiInsights: "AI సమాచారం",
    logistics: "లాజిస్టిక్స్",
    earnings: "ఆదాయం",
    settings: "సెట్టింగ్‌లు",
    logout: "లాగ్‌అవుట్",

    farmerPortal: "రైతు పోర్టల్",
    goodMorning: "శుభోదయం,",
    farmTodayMessage:
        "ఈ రోజు మీ పొలంలో ఏమి జరుగుతుందో ఇక్కడ చూడండి.",

    totalSales: "మొత్తం అమ్మకాలు",
    comparedLastMonth: "గత నెలతో పోలిస్తే",

    activeOrders: "క్రియాశీల ఆర్డర్లు",
    readyForDispatch: "డిస్పాచ్ కోసం 4 సిద్ధంగా ఉన్నాయి",

    produceListed: "జాబితా చేసిన ఉత్పత్తులు",
    availableForBuyers: "కొనుగోలుదారులకు అందుబాటులో ఉంది",

    avgPrice: "సగటు ధర",
    betterThanMandi: "మండి కంటే మెరుగైనది",

    aiMarketIntelligence: "AI మార్కెట్ సమాచారం",
    highDemand: "అధిక డిమాండ్ ↑",

    aiRecommendation: "AI సిఫార్సు",
    tomatoRecommendation:
        "రాబోయే 14 రోజుల్లో టమోటాల డిమాండ్ పెరగవచ్చు. సరఫరాను 15% పెంచడాన్ని పరిగణించండి.",

    quickActions: "త్వరిత చర్యలు",
    manageFarm: "వ్యవసాయ నిర్వహణ",

    listProduce: "ఉత్పత్తిని జాబితా చేయండి",
    sellYourCrops: "మీ పంటలను అమ్మండి",

    viewOrders: "ఆర్డర్లను చూడండి",
    manageOrders: "ఆర్డర్లను నిర్వహించండి",

    trackDelivery: "డెలివరీని ట్రాక్ చేయండి",
    viewShipments: "షిప్‌మెంట్‌లను చూడండి",

    marketPredictions: "మార్కెట్ అంచనాలు",

    recentActivity: "ఇటీవలి కార్యకలాపాలు",
    recentOrders: "ఇటీవలి ఆర్డర్లు",
    viewAll: "అన్నీ చూడండి →",

    inTransit: "మార్గంలో ఉంది",
    delivered: "డెలివరీ పూర్తయింది",
    processing: "ప్రాసెస్‌లో ఉంది",

    market: "మార్కెట్",
    todaysPrices: "ఈరోజు ధరలు",

    salesManagement: "విక్రయాల నిర్వహణ",
    ordersReceived: "అందుకున్న ఆర్డర్లు 📦",
    manageBuyerOrders:
        "కొనుగోలుదారులు చేసిన ఆర్డర్లను చూడండి మరియు నిర్వహించండి.",

    totalOrders: "మొత్తం ఆర్డర్లు",
    pending: "పెండింగ్‌లో ఉంది",
    completed: "పూర్తయింది",

    buyerOrders: "కొనుగోలుదారుల ఆర్డర్లు",
    noOrdersYet: "ఇంకా ఆర్డర్లు లేవు",
    buyerOrdersAppearHere:
        "కొనుగోలుదారులు చేసిన ఆర్డర్లు ఇక్కడ కనిపిస్తాయి.",

    // AI INSIGHTS PAGE

    aiFarmingIntelligence: "AI వ్యవసాయ మేధస్సు",
    aiDescription:
        "స్మార్ట్ మార్కెట్ అంచనాలతో ఏమి పండించాలి, ఎప్పుడు అమ్మాలి మరియు ఎంత స్టాక్ ఉంచాలి అనేది నిర్ణయించండి.",

    aiActive: "AI సక్రియంగా ఉంది",

    analyseYourCrop: "మీ పంటను విశ్లేషించండి",
    selectCropForInsights:
        "AI సమాచారాన్ని చూడటానికి పంటను ఎంచుకోండి",

    crop: "పంట",
    tomato: "టమోటా",
    potato: "బంగాళాదుంప",
    onion: "ఉల్లిపాయ",
    rice: "బియ్యం",

    gradeA: "గ్రేడ్ A",
    fresh: "తాజా",
    premium: "ప్రీమియం",

    expectedDemand: "అంచనా వేసిన డిమాండ్",
    next14Days: "తదుపరి 14 రోజులు",

    priceTrend: "ధరల ధోరణి",
    rising: "పెరుగుతోంది",
    highConfidence: "అధిక విశ్వసనీయత",

    bestOpportunity: "ఉత్తమ అవకాశం",
    highDemandCrop: "అధిక డిమాండ్ ఉన్న పంట",

    supply: "సరఫరా",
    marketOutlook: "మార్కెట్ అంచనా",

    forecastPeriod: "అంచనా కాలం",
    days14: "14 రోజులు",
    confidence: "విశ్వసనీయత",

    aiMarketIntelligenceTitle: "AI మార్కెట్ ఇంటెలిజెన్స్",
    demandForecastTitle: "డిమాండ్ అంచనా",

    aiPredictionDescription:
        "చారిత్రక మార్కెట్ ధోరణులు, కొనుగోలుదారుల కార్యకలాపాలు మరియు కాలానుగుణ నమూనాల సిమ్యులేటెడ్ డేటా ఆధారంగా AI అంచనా.",

    now: "ఇప్పుడు",
    days7: "7 రోజులు",

    aiQuickInsight: "AI త్వరిత సమాచారం",

    tomatoDemandInsight:
        "రాబోయే 14 రోజుల్లో టమోటాల డిమాండ్ పెరుగుతుందని అంచనా.",

    considerIncreasingSupply:
        "మార్కెట్ ధరలను గమనిస్తూ సరఫరాను పెంచడాన్ని పరిగణించండి.",

    aiConfidence: "AI విశ్వసనీయత",
    predictionConfidence: "అంచనా విశ్వసనీయత",

    basedOnMarketData:
        "చారిత్రక మార్కెట్ ధోరణులు, కొనుగోలుదారుల కార్యకలాపాలు మరియు కాలానుగుణ డిమాండ్ నమూనాల సిమ్యులేషన్ ఆధారంగా.",

    recommendedSupply: "సిఫార్సు చేసిన సరఫరా",
    suggestedIncrease: "సూచించిన పెరుగుదల",

    aiRecommendations: "AI సిఫార్సులు",
    whatShouldYouDo: "మీరు ఏమి చేయాలి? 💡",
    actionableSuggestions:
        "ప్రస్తుత మార్కెట్ పరిస్థితుల ఆధారంగా సూచనలు.",

    high: "అధిక",
    medium: "మధ్యస్థ",

    increaseTomatoSupply: "టమోటాల సరఫరాను పెంచండి",
    tomatoDemandIncrease:
        "రాబోయే 14 రోజుల్లో టమోటాల డిమాండ్ పెరుగుతుందని అంచనా.",
    recommended: "సిఫార్సు చేయబడింది",

    monitorPrices: "ధరలను గమనించండి",
    marketPricesUpward:
        "అధిక డిమాండ్ ఉన్న పంటల మార్కెట్ ధరల్లో పెరుగుదల ధోరణి కనిపిస్తోంది.",
    opportunity: "అవకాశం",

    trackMarketPrices: "మార్కెట్ ధరలను ట్రాక్ చేయండి →",

    planInventory: "ఇన్వెంటరీని ప్లాన్ చేయండి",
    maintainSufficientStock:
        "రాబోయే కొనుగోలుదారుల డిమాండ్‌ను తీర్చడానికి తగినంత స్టాక్ ఉంచండి.",
    priority: "ప్రాధాన్యత",

    planInventoryButton: "ఇన్వెంటరీని ప్లాన్ చేయండి →",
    viewSupplyPlan: "సరఫరా ప్రణాళికను చూడండి →",

    kisanAiAssistant: "కిసాన్ AI సహాయకుడు",
    needHelpDeciding: "నిర్ణయం తీసుకోవడంలో సహాయం కావాలా?",
    askKisanAiDescription:
        "పంటలు, ధరలు, డిమాండ్ లేదా మీ తదుపరి వ్యవసాయ నిర్ణయం గురించి KisanAIని అడగండి.",
    askKisanAI: "KisanAIని అడగండి",

    explainableAI: "వివరణాత్మక AI",
    whyThisPrediction: "ఈ అంచనా ఎందుకు? 🧠",
    understandSignals:
        "AI సిఫార్సు వెనుక ఉన్న సంకేతాలను అర్థం చేసుకోండి.",
    viewReasoning: "కారణాన్ని చూడండి",

    buyerActivityIncreased: "కొనుగోలుదారుల కార్యకలాపాలు పెరిగాయి",
    buyerActivityDescription:
        "సిమ్యులేటెడ్ కొనుగోలుదారుల కార్యకలాపాలు సానుకూల డిమాండ్ సంకేతాలను చూపుతున్నాయి.",

    historicalDemandRising: "చారిత్రక డిమాండ్ పెరుగుతోంది",
    historicalDemandDescription:
        "గత మార్కెట్ నమూనాలు టమోటాల పెరుగుతున్న డిమాండ్‌ను సూచిస్తున్నాయి.",

    marketPricesFavorable: "మార్కెట్ ధరలు అనుకూలంగా ఉన్నాయి",
    marketPricesDescription:
        "ప్రస్తుత సిమ్యులేటెడ్ ధరలు అమ్మకాల కోసం సానుకూల అవకాశాలను చూపిస్తున్నాయి.",

    seasonalPatternDetected: "కాలానుగుణ నమూనా గుర్తించబడింది",
    seasonalPatternDescription:
        "చారిత్రక డేటాలో ఇలాంటి కాలానుగుణ డిమాండ్ నమూనాలు కనిపించాయి.",

    aiPrototypeMode: "AI ప్రోటోటైప్ మోడ్",
    simulatedDataNotice:
        "ఈ అంచనాలు ప్రస్తుతం KisanDirect SIH ప్రోటోటైప్ కోసం సిమ్యులేటెడ్ డేటాను ఉపయోగిస్తున్నాయి.",
    analysisReady: "● విశ్లేషణ సిద్ధంగా ఉంది",

    farmManagement: "వ్యవసాయ నిర్వహణ",
    myProduce: "నా ఉత్పత్తులు 🌾",
    manageCrops:
        "మీ పంటలు, ధరలు మరియు అందుబాటులో ఉన్న స్టాక్‌ను నిర్వహించండి.",
    addProduce: "+ ఉత్పత్తిని జోడించండి",
    totalListings: "మొత్తం జాబితాలు",
    activeProduceListings: "క్రియాశీల ఉత్పత్తి జాబితాలు",
    totalStock: "మొత్తం స్టాక్",
    availableForBuyers: "కొనుగోలుదారులకు అందుబాటులో ఉంది",
    todaysSales: "ఈరోజు అమ్మకాలు",
    fromDirectBuyers: "నేరుగా కొనుగోలుదారుల నుండి",
    averagePrice: "సగటు ధర",
    perKilogram: "కిలోగ్రాముకు",
    inventory: "ఇన్వెంటరీ",
    yourProduce: "మీ ఉత్పత్తులు",
    produce: "ఉత్పత్తి",
    quantity: "పరిమాణం",
    price: "ధర",
    status: "స్థితి",
    action: "చర్య",
    freshTomato: "తాజా టమోటా",
    gradeARanchi: "గ్రేడ్ A • రాంచీ",
    active: "సక్రియం",
    edit: "సవరించండి",
    premiumRice: "ప్రీమియం బియ్యం",
    premiumPotato: "ప్రీమియం బంగాళాదుంప",

    // Earnings & Payments

    financialManagement: "ఆర్థిక నిర్వహణ",
    earningsPayments: "ఆదాయం మరియు చెల్లింపులు 💰",
    trackFarmIncome:
        "మీ వ్యవసాయ ఆదాయం, చెల్లింపులు మరియు ఆర్థిక పనితీరును ట్రాక్ చేయండి.",

    totalEarnings: "మొత్తం ఆదాయం",
    lifetimeFarmEarnings: "ఇప్పటివరకు మొత్తం వ్యవసాయ ఆదాయం",

    thisMonth: "ఈ నెల",
    earningsInAugust: "ఆగస్టు ఆదాయం",

    twoPayments: "2 చెల్లింపులు",
    pendingPayments: "పెండింగ్ చెల్లింపులు",
    awaitingBuyerPayment:
        "కొనుగోలుదారుడి చెల్లింపు కోసం వేచి ఉంది",

    available: "అందుబాటులో ఉంది",
    availableBalance: "అందుబాటులో ఉన్న బ్యాలెన్స్",
    readyForWithdrawal: "ఉపసంహరణకు సిద్ధంగా ఉంది",

    earningsOverview: "ఆదాయ అవలోకనం",
    monthlyEarnings: "నెలవారీ ఆదాయం",

    cropPerformance: "పంట పనితీరు",
    earningsByCrop: "పంట ఆధారంగా ఆదాయం",

    tomatoEarningsPercent: "ఆదాయంలో 38%",
    riceEarningsPercent: "ఆదాయంలో 34%",
    potatoEarningsPercent: "ఆదాయంలో 28%",

    paymentActivity: "చెల్లింపు కార్యకలాపాలు",
    recentTransactions: "ఇటీవలి లావాదేవీలు",

    paid: "చెల్లించబడింది",

    paymentAccount: "చెల్లింపు ఖాతా",
    settlementInformation: "చెల్లింపు సెటిల్‌మెంట్ సమాచారం",

    nextSettlement: "తదుపరి సెటిల్‌మెంట్",
    pendingAmount: "పెండింగ్ మొత్తం",
    paymentMethod: "చెల్లింపు విధానం",
    bankTransfer: "బ్యాంక్ ట్రాన్స్‌ఫర్",

    viewPaymentDetails: "💰 చెల్లింపు వివరాలను చూడండి",

    buyerAccount: "కొనుగోలుదారు ఖాతా",

    myOrders: "నా ఆర్డర్లు",
    deliveries: "డెలివరీలు",
    payments: "చెల్లింపులు",

    buyerPortal: "కొనుగోలుదారు పోర్టల్",
    welcomeBack: "తిరిగి స్వాగతం,",
    buyerDashboardDescription:
        "రైతులు మరియు FPOల నుండి నేరుగా తాజా వ్యవసాయ ఉత్పత్తులను పొందండి.",

    totalPurchases: "మొత్తం కొనుగోళ్లు",

    threeActive: "3 క్రియాశీలం",
    activeOrders: "క్రియాశీల ఆర్డర్లు",
    ordersInProgress: "ఆర్డర్లు ప్రాసెస్‌లో ఉన్నాయి",

    fourNew: "+4 కొత్తవి",
    savedFarmers: "సేవ్ చేసిన రైతులు",
    trustedSuppliers: "విశ్వసనీయ సరఫరాదారులు",

    onTime: "సమయానికి",
    deliverySuccessRate: "డెలివరీ విజయ శాతం",

    recommendedProduce: "సిఫార్సు చేసిన ఉత్పత్తులు",
    viewMarketplace: "మార్కెట్‌ప్లేస్ చూడండి →",
    buy: "కొనండి",

    kgAvailable800: "800 కిలోలు అందుబాటులో ఉన్నాయి",
    kgAvailable1200: "1,200 కిలోలు అందుబాటులో ఉన్నాయి",
    kgAvailable650: "650 కిలోలు అందుబాటులో ఉన్నాయి",

    smartBuying: "స్మార్ట్ కొనుగోలు",
    tomatoDemandExpected:
        "రాబోయే 14 రోజుల్లో టమోటాల డిమాండ్ పెరుగుతుందని అంచనా.",

    purchaseTomatoEarly:
        "సంభావ్య ధరల పెరుగుదలను నివారించడానికి టమోటా స్టాక్‌ను ముందుగానే కొనుగోలు చేయడాన్ని పరిగణించండి.",

    viewAIInsights: "AI సమాచారాన్ని చూడండి →",

    yourActivity: "మీ కార్యకలాపాలు",

    activeDelivery: "క్రియాశీల డెలివరీ",
    you: "మీరు",
    estimatedArrival: "అంచనా రాక",
    distance: "దూరం",
    trackDelivery: "🚚 డెలివరీని ట్రాక్ చేయండి",

    farmerNetwork: "రైతుల నెట్‌వర్క్",
    farmersTitle: "రైతులు 👨‍🌾",
    farmerNetworkDescription:
        "విశ్వసనీయ స్థానిక రైతులను కనుగొని వారితో కనెక్ట్ అవ్వండి.",

    availableFarmers: "అందుబాటులో ఉన్న రైతులు",
    verifiedFarmers: "ధృవీకరించబడిన రైతులు",
    yourTrustedSuppliers: "మీ విశ్వసనీయ సరఫరాదారులు",
    nearbyFarmers: "సమీపంలోని రైతులు",
    withinYourRegion: "మీ ప్రాంతంలో",

    fpos: "FPOలు",
    farmerOrganizations: "రైతు సంస్థలు",

    localFarmers: "స్థానిక రైతులు",
    trustedFarmers: "విశ్వసనీయ రైతులు 👨‍🌾",
    verifiedFarmersDirectPurchase:
        "నేరుగా కొనుగోలు కోసం ధృవీకరించబడిన రైతులు అందుబాటులో ఉన్నారు",

    verifiedNetwork: "✓ ధృవీకరించబడిన నెట్‌వర్క్",

    view: "చూడండి",

    purchaseManagement: "కొనుగోలు నిర్వహణ",
    trackManagePurchases:
        "స్థానిక రైతుల నుండి చేసిన అన్ని కొనుగోళ్లను ట్రాక్ చేసి నిర్వహించండి.",

    farmerDirect: "🌱 రైతు నుండి నేరుగా కొనుగోలు",
    secureOrders: "🔒 సురక్షిత ఆర్డర్లు",
    trackable: "🚚 ట్రాక్ చేయగలిగేది",

    orderHub: "ఆర్డర్ హబ్",
    allPurchasesOnePlace:
        "అన్ని కొనుగోళ్లు ఒకే చోట",

    orderHistory: "ఆర్డర్ చరిత్ర",
    yourOrders: "మీ ఆర్డర్లు",
    noOrdersYet: "ఇంకా ఆర్డర్లు లేవు",
    placedOrdersAppearHere:
        "మీరు చేసిన ఆర్డర్లు ఇక్కడ కనిపిస్తాయి.",

    footerDescription:
        "స్మార్ట్ మరియు న్యాయమైన వ్యవసాయ మార్కెట్‌ప్లేస్‌ను నిర్మించడం.",
    footerCopyright:
        "© 2026 KisanDirect • SIH ప్రోటోటైప్",

    loginToContinue:
        "KisanDirectలో కొనసాగడానికి లాగిన్ చేయండి",
    mobileNumber: "మొబైల్ నంబర్",
    password: "పాస్‌వర్డ్",
    rememberMe: "నన్ను గుర్తుంచుకోండి",
    forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
    loginButton: "లాగిన్ →",

    newToKisanDirect: "KisanDirectకు కొత్తగా వచ్చారా?",
    createAccount: "ఖాతాను సృష్టించండి",

    prototypeDemo: "ప్రోటోటైప్ డెమో",
    localAccountLogin:
        "మీరు స్థానికంగా ఖాతాను సృష్టించి లాగిన్ చేయవచ్చు.",

    back: "← వెనక్కి",
    joinKisanDirect: "KisanDirectలో చేరండి",
    howUsePlatform:
        "మీరు ప్లాట్‌ఫారమ్‌ను ఎలా ఉపయోగించాలనుకుంటున్నారు?",

    farmerFpoAccount: "నేను రైతు / FPO",
    farmerAccountDescription:
        "ఉత్పత్తులను నేరుగా అమ్మండి, ఆర్డర్లు పొందండి మరియు AI మార్కెట్ సమాచారాన్ని ఉపయోగించండి.",

    buyerAccountOption: "నేను కొనుగోలుదారుని",
    buyerAccountDescription:
        "ధృవీకరించబడిన రైతులు మరియు FPOల నుండి నేరుగా తాజా వ్యవసాయ ఉత్పత్తులను కొనుగోలు చేయండి.",

    createFarmerAccount: "రైతు ఖాతాను సృష్టించండి",
    startSellingDirectly:
        "KisanDirect ద్వారా నేరుగా అమ్మడం ప్రారంభించండి",

    fullName: "పూర్తి పేరు",
    villageCity: "గ్రామం / నగరం",
    district: "జిల్లా",
    state: "రాష్ట్రం",
    primaryCrop: "ప్రధాన పంట",
    createPassword: "పాస్‌వర్డ్ సృష్టించండి",
    createFarmerAccountButton:
        "రైతు ఖాతాను సృష్టించండి →",

    createBuyerAccount: "కొనుగోలుదారు ఖాతాను సృష్టించండి",
    sourceDirectlyFromFarmers:
        "రైతుల నుండి నేరుగా ఉత్పత్తులను పొందండి",
    nameBusinessName: "పేరు / వ్యాపార పేరు",
    buyerType: "కొనుగోలుదారు రకం",
    location: "స్థానం",
    createBuyerAccountButton:
        "కొనుగోలుదారు ఖాతాను సృష్టించండి →",

    accountCreated: "ఖాతా సృష్టించబడింది!",
    accountCreatedSuccessfully:
        "మీ KisanDirect ఖాతా విజయవంతంగా సృష్టించబడింది.",
    continueToLogin: "లాగిన్ చేయడానికి కొనసాగండి →",

    addNewProduce: "కొత్త ఉత్పత్తిని జోడించండి 🌾",
    listFreshProduce:
        "వినియోగదారులు మరియు భారీ కొనుగోలుదారుల కోసం మీ తాజా ఉత్పత్తులను నేరుగా జాబితా చేయండి.",

    produceName: "ఉత్పత్తి పేరు",
    category: "వర్గం",
    qualityGrade: "నాణ్యత గ్రేడ్",
    quantityAvailable: "అందుబాటులో ఉన్న పరిమాణం",
    unit: "యూనిట్",
    pricePerKg: "కిలోకు ధర",
    farmPickupLocation: "పొలం / పికప్ స్థానం",
    availableFrom: "అందుబాటులో ఉండే తేదీ",
    cancel: "రద్దు చేయండి",
    listProduce: "🌾 ఉత్పత్తిని జాబితా చేయండి",

    kisanDirectAIAssistant: "KISANDIRECT AI సహాయకుడు",
    kisanAIAnalysis: "KisanAI విశ్లేషణ",
    smartGuidance:
        "ప్రస్తుత పంట సమాచారం ఆధారంగా స్మార్ట్ మార్గదర్శకత్వం.",
    selectedCrop: "ఎంచుకున్న పంట",
    maintainSupplyMonitorMarket:
        "ప్రస్తుత సరఫరా స్థాయిని కొనసాగిస్తూ మార్కెట్ పరిస్థితిని గమనించండి.",
    gotIt: "అర్థమైంది ✓"
},

ta: {
    home: "முகப்பு",
    marketplace: "சந்தை",
    howItWorks: "இது எப்படி செயல்படுகிறது",
    aiSolutions: "AI தீர்வுகள்",
    login: "உள்நுழைக",
    joinNow: "இப்போதே சேருங்கள்",

    badge: "AI சார்ந்த விவசாய சந்தை",
    heroTitle1: "வயலில் இருந்து",
    heroTitle2: "நேரடியாக",
    heroTitle3: "சந்தைக்கு.",
    heroText:
        "KisanDirect விவசாயிகள் மற்றும் FPO-களை நுகர்வோர் மற்றும் மொத்த கொள்முதல் செய்பவர்களுடன் நேரடியாக இணைக்கிறது. இதன் மூலம் விவசாயிகள் சிறந்த விலையைப் பெறவும், விநியோகச் சங்கிலியின் சிக்கல்களைக் குறைக்கவும் உதவுகிறது.",

    explore: "சந்தையைப் பார்க்கவும்",
    joinFarmer: "விவசாயியாக சேருங்கள்",

    smartAgriculture: "ஸ்மார்ட் விவசாயம்",
    smartText:
        "ஒரே தளத்தின் மூலம் விவசாயிகள், வாங்குபவர்கள் மற்றும் தளவாடங்களை இணைத்தல்.",

    aiMarket: "AI சந்தை நுண்ணறிவு",
    demand: "அடுத்த 14 நாட்களில் எதிர்பார்க்கப்படும் தேவை அதிகரிப்பு",
    recommendation: "AI பரிந்துரை",

    farmers: "விவசாயிகள்",
    buyers: "வாங்குபவர்கள்",
    states: "மாநிலங்கள்",
    farmerSales: "விவசாயி விற்பனை",

    farmer: "விவசாயி",
    buyer: "வாங்குபவர்",

    freshFromFarm: "வயலில் இருந்து புதியது",
    farmerMarketplace: "விவசாயி சந்தை",
    marketText:
        "விவசாயிகளிடமிருந்து நேரடியாக வெளிப்படையான விலையில் புதிய விவசாயப் பொருட்களை வாங்குங்கள்.",

    whyKisanDirect: "ஏன் KisanDirect?",
    smarterSupplyChain: "சிறந்த ஸ்மார்ட் விவசாய விநியோகச் சங்கிலி.",

    directMarketplace: "நேரடி சந்தை",
    directMarketplaceText:
        "விவசாயிகளை நுகர்வோர் மற்றும் மொத்த கொள்முதல் செய்பவர்களுடன் நேரடியாக இணைக்கவும்.",

    aiDemandForecasting: "AI தேவை முன்னறிவிப்பு",
    aiDemandForecastingText:
        "வரவிருக்கும் தேவையை கணித்து, விவசாயிகள் சிறந்த விற்பனை முடிவுகளை எடுக்க உதவுங்கள்.",

    smartLogistics: "ஸ்மார்ட் தளவாடங்கள்",
    smartLogisticsText:
        "வழிகளை மேம்படுத்தி போக்குவரத்து செலவைக் குறைக்கவும்.",

    betterPrices: "சிறந்த விலைகள்",
    betterPricesText:
        "தேவையற்ற இடைத்தரகர்களைக் குறைத்து விவசாயிகளின் வருமானத்தை அதிகரிக்கவும்.",

    artificialIntelligence: "செயற்கை நுண்ணறிவு",

    predictOptimize:
        "தேவையை கணிக்கவும். விநியோகத்தை மேம்படுத்தவும்.",

    aiEngineText:
        "எங்கள் AI இயந்திரம் சந்தைப் போக்குகள், வரலாற்றுத் தேவை மற்றும் வாங்குபவர்களின் செயல்பாடுகளை பகுப்பாய்வு செய்து, என்ன விற்க வேண்டும், எப்போது விற்க வேண்டும், எங்கு அனுப்ப வேண்டும் என்பதை விவசாயிகள் தீர்மானிக்க உதவுகிறது.",

    exploreAIInsights: "AI தகவல்களைப் பார்க்கவும் →",

    demandForecast: "தேவை முன்னறிவிப்பு",
    liveDemo: "● நேரடி டெமோ",
    expectedDemandGrowth: "எதிர்பார்க்கப்படும் தேவை அதிகரிப்பு",

    farmerAccount: "விவசாயி கணக்கு",

    dashboard: "டாஷ்போர்டு",
    myProduce: "எனது விளைபொருட்கள்",
    orders: "ஆர்டர்கள்",
    aiInsights: "AI தகவல்கள்",
    logistics: "தளவாடங்கள்",
    earnings: "வருமானம்",
    settings: "அமைப்புகள்",
    logout: "வெளியேறு",

    farmerPortal: "விவசாயி போர்டல்",
    goodMorning: "காலை வணக்கம்,",
    farmTodayMessage:
        "இன்று உங்கள் பண்ணையில் என்ன நடக்கிறது என்பதை இங்கே பார்க்கவும்.",

    totalSales: "மொத்த விற்பனை",
    comparedLastMonth: "கடந்த மாதத்துடன் ஒப்பிடும்போது",

    activeOrders: "செயலில் உள்ள ஆர்டர்கள்",
    readyForDispatch: "அனுப்புவதற்கு 4 தயாராக உள்ளன",

    produceListed: "பட்டியலிடப்பட்ட விளைபொருட்கள்",
    availableForBuyers: "வாங்குபவர்களுக்கு கிடைக்கிறது",

    avgPrice: "சராசரி விலை",
    betterThanMandi: "மண்டியை விட சிறந்தது",

    aiMarketIntelligence: "AI சந்தை தகவல்",
    highDemand: "அதிக தேவை ↑",

    aiRecommendation: "AI பரிந்துரை",
    tomatoRecommendation:
        "அடுத்த 14 நாட்களில் தக்காளிக்கான தேவை அதிகரிக்கலாம். விநியோகத்தை 15% அதிகரிப்பதைக் கருத்தில் கொள்ளுங்கள்.",

    quickActions: "விரைவான செயல்கள்",
    manageFarm: "பண்ணை மேலாண்மை",

    listProduce: "விளைபொருளைப் பட்டியலிடுங்கள்",
    sellYourCrops: "உங்கள் பயிர்களை விற்கவும்",

    viewOrders: "ஆர்டர்களைப் பார்க்கவும்",
    manageOrders: "ஆர்டர்களை நிர்வகிக்கவும்",

    trackDelivery: "டெலிவரியை கண்காணிக்கவும்",
    viewShipments: "ஷிப்மென்ட்களைப் பார்க்கவும்",

    marketPredictions: "சந்தை முன்னறிவிப்புகள்",

    recentActivity: "சமீபத்திய செயல்பாடுகள்",
    recentOrders: "சமீபத்திய ஆர்டர்கள்",
    viewAll: "அனைத்தையும் பார்க்கவும் →",

    inTransit: "வழியில் உள்ளது",
    delivered: "டெலிவரி முடிந்தது",
    processing: "செயலாக்கத்தில் உள்ளது",

    market: "சந்தை",
    todaysPrices: "இன்றைய விலைகள்",

    salesManagement: "விற்பனை மேலாண்மை",
    ordersReceived: "பெறப்பட்ட ஆர்டர்கள் 📦",
    manageBuyerOrders:
        "வாங்குபவர்கள் வழங்கிய ஆர்டர்களைப் பார்த்து நிர்வகிக்கவும்.",

    totalOrders: "மொத்த ஆர்டர்கள்",
    pending: "நிலுவையில்",
    completed: "முடிந்தது",

    buyerOrders: "வாங்குபவர்களின் ஆர்டர்கள்",
    noOrdersYet: "இன்னும் ஆர்டர்கள் இல்லை",
    buyerOrdersAppearHere:
        "வாங்குபவர்கள் வழங்கிய ஆர்டர்கள் இங்கே தோன்றும்.",

    // AI INSIGHTS PAGE

    aiFarmingIntelligence: "AI விவசாய நுண்ணறிவு",
    aiDescription:
        "ஸ்மார்ட் சந்தை முன்னறிவிப்பைப் பயன்படுத்தி என்ன பயிரிட வேண்டும், எப்போது விற்க வேண்டும், எவ்வளவு இருப்பு வைத்திருக்க வேண்டும் என்பதைத் தீர்மானிக்கவும்.",

    aiActive: "AI செயலில் உள்ளது",

    analyseYourCrop: "உங்கள் பயிரை பகுப்பாய்வு செய்யுங்கள்",
    selectCropForInsights:
        "AI தகவல்களைப் பார்க்க பயிரைத் தேர்ந்தெடுக்கவும்",

    crop: "பயிர்",
    tomato: "தக்காளி",
    potato: "உருளைக்கிழங்கு",
    onion: "வெங்காயம்",
    rice: "அரிசி",

    gradeA: "தரம் A",
    fresh: "புதியது",
    premium: "பிரீமியம்",

    expectedDemand: "எதிர்பார்க்கப்படும் தேவை",
    next14Days: "அடுத்த 14 நாட்கள்",

    priceTrend: "விலைப் போக்கு",
    rising: "அதிகரித்து வருகிறது",
    highConfidence: "அதிக நம்பகத்தன்மை",

    bestOpportunity: "சிறந்த வாய்ப்பு",
    highDemandCrop: "அதிக தேவை உள்ள பயிர்",

    supply: "விநியோகம்",
    marketOutlook: "சந்தை நிலவரம்",

    forecastPeriod: "முன்னறிவிப்பு காலம்",
    days14: "14 நாட்கள்",
    confidence: "நம்பகத்தன்மை",

    aiMarketIntelligenceTitle: "AI சந்தை நுண்ணறிவு",
    demandForecastTitle: "தேவை முன்னறிவிப்பு",

    aiPredictionDescription:
        "வரலாற்றுச் சந்தைப் போக்குகள், வாங்குபவர்களின் செயல்பாடுகள் மற்றும் பருவகால முறைகளின் உருவகப்படுத்தப்பட்ட தரவின் அடிப்படையிலான AI முன்னறிவிப்பு.",

    now: "இப்போது",
    days7: "7 நாட்கள்",

    aiQuickInsight: "AI விரைவான தகவல்",

    tomatoDemandInsight:
        "அடுத்த 14 நாட்களில் தக்காளிக்கான தேவை அதிகரிக்கும் என எதிர்பார்க்கப்படுகிறது.",

    considerIncreasingSupply:
        "சந்தை விலைகளை கண்காணித்துக்கொண்டே விநியோகத்தை அதிகரிப்பதைக் கருத்தில் கொள்ளுங்கள்.",

    aiConfidence: "AI நம்பகத்தன்மை",
    predictionConfidence: "முன்னறிவிப்பு நம்பகத்தன்மை",

    basedOnMarketData:
        "வரலாற்றுச் சந்தைப் போக்குகள், வாங்குபவர்களின் செயல்பாடுகள் மற்றும் பருவகால தேவை முறைகளின் உருவகப்படுத்துதலின் அடிப்படையில்.",

    recommendedSupply: "பரிந்துரைக்கப்பட்ட விநியோகம்",
    suggestedIncrease: "பரிந்துரைக்கப்பட்ட அதிகரிப்பு",

    aiRecommendations: "AI பரிந்துரைகள்",
    whatShouldYouDo: "நீங்கள் என்ன செய்ய வேண்டும்? 💡",
    actionableSuggestions:
        "தற்போதைய சந்தை நிலைமைகளின் அடிப்படையிலான பரிந்துரைகள்.",

    high: "அதிகம்",
    medium: "நடுத்தரம்",

    increaseTomatoSupply: "தக்காளி விநியோகத்தை அதிகரிக்கவும்",
    tomatoDemandIncrease:
        "அடுத்த 14 நாட்களில் தக்காளிக்கான தேவை அதிகரிக்கும் என கணிக்கப்பட்டுள்ளது.",
    recommended: "பரிந்துரைக்கப்பட்டது",

    monitorPrices: "விலைகளை கண்காணிக்கவும்",
    marketPricesUpward:
        "அதிக தேவை உள்ள பயிர்களின் சந்தை விலைகளில் அதிகரிக்கும் போக்கு காணப்படுகிறது.",
    opportunity: "வாய்ப்பு",

    trackMarketPrices: "சந்தை விலைகளை கண்காணிக்கவும் →",

    planInventory: "சரக்கு இருப்பை திட்டமிடுங்கள்",
    maintainSufficientStock:
        "வரவிருக்கும் வாங்குபவர்களின் தேவையை பூர்த்தி செய்ய போதுமான இருப்பை வைத்திருங்கள்.",
    priority: "முன்னுரிமை",

    planInventoryButton: "சரக்கு இருப்பை திட்டமிடுங்கள் →",
    viewSupplyPlan: "விநியோகத் திட்டத்தைப் பார்க்கவும் →",

    kisanAiAssistant: "கிசான் AI உதவியாளர்",
    needHelpDeciding: "முடிவு எடுக்க உதவி தேவையா?",
    askKisanAiDescription:
        "பயிர்கள், விலைகள், தேவை அல்லது உங்கள் அடுத்த விவசாய முடிவு குறித்து KisanAI-யிடம் கேளுங்கள்.",
    askKisanAI: "KisanAI-யிடம் கேளுங்கள்",

    explainableAI: "விளக்கக்கூடிய AI",
    whyThisPrediction: "இந்த முன்னறிவிப்பு ஏன்? 🧠",
    understandSignals:
        "AI பரிந்துரைக்குப் பின்னால் உள்ள காரணிகளைப் புரிந்துகொள்ளுங்கள்.",
    viewReasoning: "காரணத்தைப் பார்க்கவும்",

    buyerActivityIncreased: "வாங்குபவர்களின் செயல்பாடு அதிகரித்துள்ளது",
    buyerActivityDescription:
        "உருவகப்படுத்தப்பட்ட வாங்குபவர்களின் செயல்பாடு நேர்மறையான தேவை அறிகுறிகளைக் காட்டுகிறது.",

    historicalDemandRising: "வரலாற்றுத் தேவை அதிகரித்து வருகிறது",
    historicalDemandDescription:
        "கடந்த சந்தை முறைகள் தக்காளிக்கான தேவை அதிகரித்து வருவதைக் காட்டுகின்றன.",

    marketPricesFavorable: "சந்தை விலைகள் சாதகமாக உள்ளன",
    marketPricesDescription:
        "தற்போதைய உருவகப்படுத்தப்பட்ட விலைகள் விற்பனைக்கான சாதகமான வாய்ப்புகளைக் காட்டுகின்றன.",

    seasonalPatternDetected: "பருவகால முறை கண்டறியப்பட்டது",
    seasonalPatternDescription:
        "வரலாற்றுத் தரவுகளில் இதே போன்ற பருவகால தேவை முறைகள் காணப்பட்டுள்ளன.",

    aiPrototypeMode: "AI முன்மாதிரி பயன்முறை",
    simulatedDataNotice:
        "இந்த முன்னறிவிப்புகள் தற்போது KisanDirect SIH முன்மாதிரிக்காக உருவகப்படுத்தப்பட்ட தரவைப் பயன்படுத்துகின்றன.",
    analysisReady: "● பகுப்பாய்வு தயாராக உள்ளது",

    farmManagement: "பண்ணை மேலாண்மை",
    myProduce: "எனது விளைபொருட்கள் 🌾",
    manageCrops:
        "உங்கள் பயிர்கள், விலைகள் மற்றும் கிடைக்கும் இருப்பை நிர்வகிக்கவும்.",
    addProduce: "+ விளைபொருளைச் சேர்க்கவும்",
    totalListings: "மொத்த பட்டியல்கள்",
    activeProduceListings: "செயலில் உள்ள விளைபொருள் பட்டியல்கள்",
    totalStock: "மொத்த இருப்பு",
    availableForBuyers: "வாங்குபவர்களுக்கு கிடைக்கிறது",
    todaysSales: "இன்றைய விற்பனை",
    fromDirectBuyers: "நேரடி வாங்குபவர்களிடமிருந்து",
    averagePrice: "சராசரி விலை",
    perKilogram: "ஒரு கிலோகிராமுக்கு",
    inventory: "சரக்கு இருப்பு",
    yourProduce: "உங்கள் விளைபொருட்கள்",
    produce: "விளைபொருள்",
    quantity: "அளவு",
    price: "விலை",
    status: "நிலை",
    action: "செயல்",
    freshTomato: "புதிய தக்காளி",
    gradeARanchi: "தரம் A • ராஞ்சி",
    active: "செயலில்",
    edit: "திருத்து",
    premiumRice: "பிரீமியம் அரிசி",
    premiumPotato: "பிரீமியம் உருளைக்கிழங்கு",

    // Earnings & Payments

    financialManagement: "நிதி மேலாண்மை",
    earningsPayments: "வருமானம் மற்றும் பணப்பரிவர்த்தனைகள் 💰",
    trackFarmIncome:
        "உங்கள் விவசாய வருமானம், பணப்பரிவர்த்தனைகள் மற்றும் நிதி செயல்திறனை கண்காணிக்கவும்.",

    totalEarnings: "மொத்த வருமானம்",
    lifetimeFarmEarnings: "இதுவரை கிடைத்த மொத்த விவசாய வருமானம்",

    thisMonth: "இந்த மாதம்",
    earningsInAugust: "ஆகஸ்ட் மாத வருமானம்",

    twoPayments: "2 பணப்பரிவர்த்தனைகள்",
    pendingPayments: "நிலுவையில் உள்ள பணப்பரிவர்த்தனைகள்",
    awaitingBuyerPayment:
        "வாங்குபவரின் பணப்பரிவர்த்தனைக்காக காத்திருக்கிறது",

    available: "கிடைக்கிறது",
    availableBalance: "கிடைக்கும் இருப்பு",
    readyForWithdrawal: "திரும்பப் பெற தயாராக உள்ளது",

    earningsOverview: "வருமான மேலோட்டம்",
    monthlyEarnings: "மாதாந்திர வருமானம்",

    cropPerformance: "பயிர் செயல்திறன்",
    earningsByCrop: "பயிர் வாரியான வருமானம்",

    tomatoEarningsPercent: "வருமானத்தில் 38%",
    riceEarningsPercent: "வருமானத்தில் 34%",
    potatoEarningsPercent: "வருமானத்தில் 28%",

    paymentActivity: "பணப்பரிவர்த்தனை செயல்பாடு",
    recentTransactions: "சமீபத்திய பரிவர்த்தனைகள்",

    paid: "பணம் செலுத்தப்பட்டது",

    paymentAccount: "பணப்பரிவர்த்தனை கணக்கு",
    settlementInformation: "பணப்பரிவர்த்தனை தீர்வு தகவல்",

    nextSettlement: "அடுத்த தீர்வு",
    pendingAmount: "நிலுவைத் தொகை",
    paymentMethod: "பணப்பரிவர்த்தனை முறை",
    bankTransfer: "வங்கி பரிமாற்றம்",

    viewPaymentDetails: "💰 பணப்பரிவர்த்தனை விவரங்களைப் பார்க்கவும்",

    buyerAccount: "வாங்குபவர் கணக்கு",

    myOrders: "எனது ஆர்டர்கள்",
    deliveries: "டெலிவரிகள்",
    payments: "பணப்பரிவர்த்தனைகள்",

    buyerPortal: "வாங்குபவர் போர்டல்",
    welcomeBack: "மீண்டும் வரவேற்கிறோம்,",
    buyerDashboardDescription:
        "விவசாயிகள் மற்றும் FPO-களிடமிருந்து நேரடியாக புதிய விவசாயப் பொருட்களைப் பெறுங்கள்.",

    totalPurchases: "மொத்த கொள்முதல்",

    threeActive: "3 செயலில்",
    activeOrders: "செயலில் உள்ள ஆர்டர்கள்",
    ordersInProgress: "ஆர்டர்கள் செயல்பாட்டில் உள்ளன",

    fourNew: "+4 புதியவை",
    savedFarmers: "சேமிக்கப்பட்ட விவசாயிகள்",
    trustedSuppliers: "நம்பகமான சப்ளையர்கள்",

    onTime: "சரியான நேரத்தில்",
    deliverySuccessRate: "டெலிவரி வெற்றி விகிதம்",

    recommendedProduce: "பரிந்துரைக்கப்பட்ட விளைபொருட்கள்",
    viewMarketplace: "சந்தையைப் பார்க்கவும் →",
    buy: "வாங்கவும்",

    kgAvailable800: "800 கிலோ கிடைக்கிறது",
    kgAvailable1200: "1,200 கிலோ கிடைக்கிறது",
    kgAvailable650: "650 கிலோ கிடைக்கிறது",

    smartBuying: "ஸ்மார்ட் கொள்முதல்",
    tomatoDemandExpected:
        "அடுத்த 14 நாட்களில் தக்காளிக்கான தேவை அதிகரிக்கும் என எதிர்பார்க்கப்படுகிறது.",

    purchaseTomatoEarly:
        "சாத்தியமான விலை உயர்வைத் தவிர்க்க தக்காளியை முன்கூட்டியே வாங்குவதைக் கருத்தில் கொள்ளுங்கள்.",

    viewAIInsights: "AI தகவல்களைப் பார்க்கவும் →",

    yourActivity: "உங்கள் செயல்பாடுகள்",

    activeDelivery: "செயலில் உள்ள டெலிவரி",
    you: "நீங்கள்",
    estimatedArrival: "மதிப்பிடப்பட்ட வருகை",
    distance: "தூரம்",
    trackDelivery: "🚚 டெலிவரியை கண்காணிக்கவும்",

    farmerNetwork: "விவசாயி நெட்வொர்க்",
    farmersTitle: "விவசாயிகள் 👨‍🌾",
    farmerNetworkDescription:
        "நம்பகமான உள்ளூர் விவசாயிகளைக் கண்டறிந்து அவர்களுடன் இணையுங்கள்.",

    availableFarmers: "கிடைக்கும் விவசாயிகள்",
    verifiedFarmers: "சரிபார்க்கப்பட்ட விவசாயிகள்",
    yourTrustedSuppliers: "உங்கள் நம்பகமான சப்ளையர்கள்",
    nearbyFarmers: "அருகிலுள்ள விவசாயிகள்",
    withinYourRegion: "உங்கள் பகுதியில்",

    fpos: "FPOகள்",
    farmerOrganizations: "விவசாயி அமைப்புகள்",

    localFarmers: "உள்ளூர் விவசாயிகள்",
    trustedFarmers: "நம்பகமான விவசாயிகள் 👨‍🌾",
    verifiedFarmersDirectPurchase:
        "நேரடி கொள்முதலுக்கான சரிபார்க்கப்பட்ட விவசாயிகள்",

    verifiedNetwork: "✓ சரிபார்க்கப்பட்ட நெட்வொர்க்",

    view: "பார்க்கவும்",

    purchaseManagement: "கொள்முதல் மேலாண்மை",
    trackManagePurchases:
        "உள்ளூர் விவசாயிகளிடமிருந்து செய்யப்பட்ட அனைத்து கொள்முதல்களையும் கண்காணித்து நிர்வகிக்கவும்.",

    farmerDirect: "🌱 விவசாயியிடமிருந்து நேரடி கொள்முதல்",
    secureOrders: "🔒 பாதுகாப்பான ஆர்டர்கள்",
    trackable: "🚚 கண்காணிக்கக்கூடியது",

    orderHub: "ஆர்டர் ஹப்",
    allPurchasesOnePlace:
        "அனைத்து கொள்முதல்களும் ஒரே இடத்தில்",

    orderHistory: "ஆர்டர் வரலாறு",
    yourOrders: "உங்கள் ஆர்டர்கள்",
    noOrdersYet: "இன்னும் ஆர்டர்கள் இல்லை",
    placedOrdersAppearHere:
        "நீங்கள் செய்த ஆர்டர்கள் இங்கே தோன்றும்.",

    footerDescription:
        "ஸ்மார்ட் மற்றும் நியாயமான விவசாய சந்தையை உருவாக்குதல்.",
    footerCopyright:
        "© 2026 KisanDirect • SIH முன்மாதிரி",

    loginToContinue:
        "KisanDirect-ல் தொடர உள்நுழையவும்",
    mobileNumber: "மொபைல் எண்",
    password: "கடவுச்சொல்",
    rememberMe: "என்னை நினைவில் வைத்துக்கொள்ளுங்கள்",
    forgotPassword: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
    loginButton: "உள்நுழைக →",

    newToKisanDirect: "KisanDirect-க்கு புதியவரா?",
    createAccount: "கணக்கை உருவாக்குங்கள்",

    prototypeDemo: "முன்மாதிரி டெமோ",
    localAccountLogin:
        "நீங்கள் உள்ளூரிலேயே கணக்கை உருவாக்கி உள்நுழையலாம்.",

    back: "← பின்செல்",
    joinKisanDirect: "KisanDirect-ல் சேருங்கள்",
    howUsePlatform:
        "தளத்தை எவ்வாறு பயன்படுத்த விரும்புகிறீர்கள்?",

    farmerFpoAccount: "நான் விவசாயி / FPO",
    farmerAccountDescription:
        "விளைபொருட்களை நேரடியாக விற்கவும், ஆர்டர்களைப் பெறவும், AI சந்தை தகவல்களைப் பயன்படுத்தவும்.",

    buyerAccountOption: "நான் வாங்குபவர்",
    buyerAccountDescription:
        "சரிபார்க்கப்பட்ட விவசாயிகள் மற்றும் FPO-களிடமிருந்து நேரடியாக புதிய விவசாயப் பொருட்களை வாங்குங்கள்.",

    createFarmerAccount: "விவசாயி கணக்கை உருவாக்குங்கள்",
    startSellingDirectly:
        "KisanDirect மூலம் நேரடியாக விற்பனை செய்யத் தொடங்குங்கள்",

    fullName: "முழு பெயர்",
    villageCity: "கிராமம் / நகரம்",
    district: "மாவட்டம்",
    state: "மாநிலம்",
    primaryCrop: "முக்கிய பயிர்",
    createPassword: "கடவுச்சொல்லை உருவாக்குங்கள்",
    createFarmerAccountButton:
        "விவசாயி கணக்கை உருவாக்குங்கள் →",

    createBuyerAccount: "வாங்குபவர் கணக்கை உருவாக்குங்கள்",
    sourceDirectlyFromFarmers:
        "விவசாயிகளிடமிருந்து நேரடியாக விளைபொருட்களைப் பெறுங்கள்",
    nameBusinessName: "பெயர் / வணிகப் பெயர்",
    buyerType: "வாங்குபவர் வகை",
    location: "இடம்",
    createBuyerAccountButton:
        "வாங்குபவர் கணக்கை உருவாக்குங்கள் →",

    accountCreated: "கணக்கு உருவாக்கப்பட்டது!",
    accountCreatedSuccessfully:
        "உங்கள் KisanDirect கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது.",
    continueToLogin: "உள்நுழைய தொடரவும் →",

    addNewProduce: "புதிய விளைபொருளைச் சேர்க்கவும் 🌾",
    listFreshProduce:
        "நுகர்வோர் மற்றும் மொத்த கொள்முதல் செய்பவர்களுக்காக உங்கள் புதிய விளைபொருட்களை நேரடியாக பட்டியலிடுங்கள்.",

    produceName: "விளைபொருளின் பெயர்",
    category: "வகை",
    qualityGrade: "தர நிலை",
    quantityAvailable: "கிடைக்கும் அளவு",
    unit: "அலகு",
    pricePerKg: "ஒரு கிலோவிற்கான விலை",
    farmPickupLocation: "பண்ணை / பிக்கப் இடம்",
    availableFrom: "கிடைக்கும் தேதி",
    cancel: "ரத்து செய்",
    listProduce: "🌾 விளைபொருளைப் பட்டியலிடுங்கள்",

    kisanDirectAIAssistant: "KISANDIRECT AI உதவியாளர்",
    kisanAIAnalysis: "KisanAI பகுப்பாய்வு",
    smartGuidance:
        "தற்போதைய பயிர் தகவலின் அடிப்படையிலான ஸ்மார்ட் வழிகாட்டுதல்.",
    selectedCrop: "தேர்ந்தெடுக்கப்பட்ட பயிர்",
    maintainSupplyMonitorMarket:
        "தற்போதைய விநியோக அளவை பராமரித்து சந்தை நிலவரத்தை கண்காணிக்கவும்.",
    gotIt: "புரிந்தது ✓"
},

gu: {
    home: "હોમ",
    marketplace: "માર્કેટપ્લેસ",
    howItWorks: "આ કેવી રીતે કાર્ય કરે છે",
    aiSolutions: "AI ઉકેલો",
    login: "લૉગિન",
    joinNow: "હમણાં જોડાઓ",

    badge: "AI સંચાલિત કૃષિ માર્કેટપ્લેસ",
    heroTitle1: "ખેતરથી",
    heroTitle2: "સીધું",
    heroTitle3: "બજાર સુધી.",
    heroText:
        "KisanDirect ખેડૂતો અને FPO ને સીધા ગ્રાહકો અને જથ્થાબંધ ખરીદદારો સાથે જોડે છે, જેથી ખેડૂતોને વધુ સારા ભાવ મળે અને સપ્લાય ચેઇનની અક્ષમતા ઘટે.",

    explore: "માર્કેટપ્લેસ જુઓ",
    joinFarmer: "ખેડૂત તરીકે જોડાઓ",

    smartAgriculture: "સ્માર્ટ કૃષિ",
    smartText:
        "એક જ પ્લેટફોર્મ દ્વારા ખેડૂતો, ખરીદદારો અને લોજિસ્ટિક્સને જોડવું.",

    aiMarket: "AI માર્કેટ ઇન્ટેલિજન્સ",
    demand: "આગામી 14 દિવસમાં અપેક્ષિત માંગમાં વધારો",
    recommendation: "AI ભલામણ",

    farmers: "ખેડૂતો",
    buyers: "ખરીદદારો",
    states: "રાજ્યો",
    farmerSales: "ખેડૂત વેચાણ",

    farmer: "ખેડૂત",
    buyer: "ખરીદદાર",

    freshFromFarm: "ખેતરમાંથી તાજું",
    farmerMarketplace: "ખેડૂત માર્કેટપ્લેસ",
    marketText:
        "ખેડૂતો પાસેથી સીધા પારદર્શક ભાવે તાજી કૃષિ પેદાશો ખરીદો.",

    whyKisanDirect: "KisanDirect શા માટે?",
    smarterSupplyChain: "વધુ સારી અને સ્માર્ટ કૃષિ સપ્લાય ચેઇન.",

    directMarketplace: "સીધું માર્કેટપ્લેસ",
    directMarketplaceText:
        "ખેડૂતોને સીધા ગ્રાહકો અને જથ્થાબંધ ખરીદદારો સાથે જોડો.",

    aiDemandForecasting: "AI માંગ આગાહી",
    aiDemandForecastingText:
        "આવનારી માંગની આગાહી કરો અને ખેડૂતોને વધુ સારા વેચાણ નિર્ણયો લેવામાં મદદ કરો.",

    smartLogistics: "સ્માર્ટ લોજિસ્ટિક્સ",
    smartLogisticsText:
        "માર્ગોને વધુ સારા બનાવો અને પરિવહન ખર્ચ ઘટાડો.",

    betterPrices: "વધુ સારા ભાવ",
    betterPricesText:
        "બિનજરૂરી વચેટિયાઓ ઘટાડો અને ખેડૂતોની આવક વધારો.",

    artificialIntelligence: "કૃત્રિમ બુદ્ધિમત્તા",

    predictOptimize:
        "માંગની આગાહી કરો. સપ્લાયને વધુ સારો બનાવો.",

    aiEngineText:
        "અમારું AI એન્જિન બજારના વલણો, ઐતિહાસિક માંગ અને ખરીદદારોની પ્રવૃત્તિઓનું વિશ્લેષણ કરીને ખેડૂતોને શું વેચવું, ક્યારે વેચવું અને ક્યાં મોકલવું તે નક્કી કરવામાં મદદ કરે છે.",

    exploreAIInsights: "AI માહિતી જુઓ →",

    demandForecast: "માંગની આગાહી",
    liveDemo: "● લાઇવ ડેમો",
    expectedDemandGrowth: "અપેક્ષિત માંગમાં વધારો",

    farmerAccount: "ખેડૂત ખાતું",

    dashboard: "ડેશબોર્ડ",
    myProduce: "મારી પેદાશો",
    orders: "ઓર્ડર",
    aiInsights: "AI માહિતી",
    logistics: "લોજિસ્ટિક્સ",
    earnings: "કમાણી",
    settings: "સેટિંગ્સ",
    logout: "લૉગઆઉટ",

    farmerPortal: "ખેડૂત પોર્ટલ",
    goodMorning: "સુપ્રભાત,",
    farmTodayMessage:
        "આજે તમારા ખેતરમાં શું થઈ રહ્યું છે તે અહીં જુઓ.",

    totalSales: "કુલ વેચાણ",
    comparedLastMonth: "ગયા મહિનાની સરખામણીમાં",

    activeOrders: "સક્રિય ઓર્ડર",
    readyForDispatch: "ડિસ્પેચ માટે 4 તૈયાર",

    produceListed: "સૂચિબદ્ધ પેદાશો",
    availableForBuyers: "ખરીદદારો માટે ઉપલબ્ધ",

    avgPrice: "સરેરાશ કિંમત",
    betterThanMandi: "મંડી કરતાં વધુ સારી",

    aiMarketIntelligence: "AI બજાર માહિતી",
    highDemand: "ઉચ્ચ માંગ ↑",

    aiRecommendation: "AI ભલામણ",
    tomatoRecommendation:
        "આગામી 14 દિવસમાં ટામેટાંની માંગ વધી શકે છે. સપ્લાયમાં 15% વધારો કરવાનું વિચારો.",

    quickActions: "ઝડપી ક્રિયાઓ",
    manageFarm: "ખેતર વ્યવસ્થાપન",

    listProduce: "પેદાશની યાદી બનાવો",
    sellYourCrops: "તમારા પાક વેચો",

    viewOrders: "ઓર્ડર જુઓ",
    manageOrders: "ઓર્ડર મેનેજ કરો",

    trackDelivery: "ડિલિવરી ટ્રેક કરો",
    viewShipments: "શિપમેન્ટ જુઓ",

    marketPredictions: "બજારની આગાહીઓ",

    recentActivity: "તાજેતરની પ્રવૃત્તિ",
    recentOrders: "તાજેતરના ઓર્ડર",
    viewAll: "બધું જુઓ →",

    inTransit: "માર્ગમાં",
    delivered: "ડિલિવરી પૂર્ણ",
    processing: "પ્રક્રિયામાં",

    market: "બજાર",
    todaysPrices: "આજના ભાવ",

    salesManagement: "વેચાણ વ્યવસ્થાપન",
    ordersReceived: "મળેલા ઓર્ડર 📦",
    manageBuyerOrders:
        "ખરીદદારો દ્વારા આપવામાં આવેલા ઓર્ડર જુઓ અને મેનેજ કરો.",

    totalOrders: "કુલ ઓર્ડર",
    pending: "બાકી",
    completed: "પૂર્ણ",

    buyerOrders: "ખરીદદારોના ઓર્ડર",
    noOrdersYet: "હજુ સુધી કોઈ ઓર્ડર નથી",
    buyerOrdersAppearHere:
        "ખરીદદારો દ્વારા આપવામાં આવેલા ઓર્ડર અહીં દેખાશે.",

    // AI INSIGHTS PAGE

    aiFarmingIntelligence: "AI કૃષિ બુદ્ધિમત્તા",
    aiDescription:
        "સ્માર્ટ બજારની આગાહી દ્વારા શું ઉગાડવું, ક્યારે વેચવું અને કેટલો સ્ટોક રાખવો તે નક્કી કરો.",

    aiActive: "AI સક્રિય છે",

    analyseYourCrop: "તમારા પાકનું વિશ્લેષણ કરો",
    selectCropForInsights:
        "AI માહિતી જોવા માટે પાક પસંદ કરો",

    crop: "પાક",
    tomato: "ટામેટું",
    potato: "બટાકા",
    onion: "ડુંગળી",
    rice: "ચોખા",

    gradeA: "ગ્રેડ A",
    fresh: "તાજું",
    premium: "પ્રીમિયમ",

    expectedDemand: "અપેક્ષિત માંગ",
    next14Days: "આગામી 14 દિવસ",

    priceTrend: "કિંમતનો ટ્રેન્ડ",
    rising: "વધી રહ્યો છે",
    highConfidence: "ઉચ્ચ વિશ્વસનીયતા",

    bestOpportunity: "શ્રેષ્ઠ તક",
    highDemandCrop: "ઉચ્ચ માંગ ધરાવતો પાક",

    supply: "સપ્લાય",
    marketOutlook: "બજારનો અંદાજ",

    forecastPeriod: "આગાહીનો સમયગાળો",
    days14: "14 દિવસ",
    confidence: "વિશ્વસનીયતા",

    aiMarketIntelligenceTitle: "AI બજાર બુદ્ધિમત્તા",
    demandForecastTitle: "માંગની આગાહી",

    aiPredictionDescription:
        "ઐતિહાસિક બજારના વલણો, ખરીદદારોની પ્રવૃત્તિ અને મોસમી પેટર્નના સિમ્યુલેટેડ ડેટા પર આધારિત AI આગાહી.",

    now: "હમણાં",
    days7: "7 દિવસ",

    aiQuickInsight: "AI ઝડપી માહિતી",

    tomatoDemandInsight:
        "આગામી 14 દિવસમાં ટામેટાંની માંગ વધવાની અપેક્ષા છે.",

    considerIncreasingSupply:
        "બજારના ભાવ પર નજર રાખીને સપ્લાય વધારવાનું વિચારો.",

    aiConfidence: "AI વિશ્વસનીયતા",
    predictionConfidence: "આગાહીની વિશ્વસનીયતા",

    basedOnMarketData:
        "ઐતિહાસિક બજારના વલણો, ખરીદદારોની પ્રવૃત્તિ અને મોસમી માંગના સિમ્યુલેટેડ પેટર્ન પર આધારિત.",

    recommendedSupply: "ભલામણ કરેલ સપ્લાય",
    suggestedIncrease: "સૂચવેલ વધારો",

    aiRecommendations: "AI ભલામણો",
    whatShouldYouDo: "તમારે શું કરવું જોઈએ? 💡",
    actionableSuggestions:
        "વર્તમાન બજારની પરિસ્થિતિઓના આધારે સૂચનો.",

    high: "ઉચ્ચ",
    medium: "મધ્યમ",

    increaseTomatoSupply: "ટામેટાંનો સપ્લાય વધારો",
    tomatoDemandIncrease:
        "આગામી 14 દિવસમાં ટામેટાંની માંગ વધવાની આગાહી છે.",
    recommended: "ભલામણ કરેલ",

    monitorPrices: "ભાવ પર નજર રાખો",
    marketPricesUpward:
        "ઉચ્ચ માંગ ધરાવતા પાકોના બજાર ભાવમાં વધારાનો ટ્રેન્ડ જોવા મળી રહ્યો છે.",
    opportunity: "તક",

    trackMarketPrices: "બજારના ભાવ ટ્રેક કરો →",

    planInventory: "ઇન્વેન્ટરીનું આયોજન કરો",
    maintainSufficientStock:
        "આવનારી ખરીદદારોની માંગ પૂરી કરવા માટે પૂરતો સ્ટોક રાખો.",
    priority: "પ્રાથમિકતા",

    planInventoryButton: "ઇન્વેન્ટરીનું આયોજન કરો →",
    viewSupplyPlan: "સપ્લાય યોજના જુઓ →",

    kisanAiAssistant: "કિસાન AI સહાયક",
    needHelpDeciding: "નિર્ણય લેવામાં મદદ જોઈએ?",
    askKisanAiDescription:
        "પાક, ભાવ, માંગ અથવા તમારા આગામી કૃષિ નિર્ણય વિશે KisanAIને પૂછો.",
    askKisanAI: "KisanAIને પૂછો",

    explainableAI: "સમજાવી શકાય તેવું AI",
    whyThisPrediction: "આ આગાહી શા માટે? 🧠",
    understandSignals:
        "AI ભલામણ પાછળના સંકેતોને સમજો.",
    viewReasoning: "કારણ જુઓ",

    buyerActivityIncreased: "ખરીદદારોની પ્રવૃત્તિ વધી છે",
    buyerActivityDescription:
        "સિમ્યુલેટેડ ખરીદદારોની પ્રવૃત્તિ સકારાત્મક માંગના સંકેતો દર્શાવે છે.",

    historicalDemandRising: "ઐતિહાસિક માંગ વધી રહી છે",
    historicalDemandDescription:
        "અગાઉના બજારના પેટર્ન ટામેટાંની વધતી માંગ સૂચવે છે.",

    marketPricesFavorable: "બજારના ભાવ અનુકૂળ છે",
    marketPricesDescription:
        "વર્તમાન સિમ્યુલેટેડ ભાવ વેચાણ માટે સકારાત્મક તક દર્શાવે છે.",

    seasonalPatternDetected: "મોસમી પેટર્ન મળી આવ્યો",
    seasonalPatternDescription:
        "ઐતિહાસિક ડેટામાં સમાન મોસમી માંગના પેટર્ન જોવા મળ્યા છે.",

    aiPrototypeMode: "AI પ્રોટોટાઇપ મોડ",
    simulatedDataNotice:
        "આ આગાહીઓ હાલમાં KisanDirect SIH પ્રોટોટાઇપ માટે સિમ્યુલેટેડ ડેટાનો ઉપયોગ કરે છે.",
    analysisReady: "● વિશ્લેષણ તૈયાર",

    farmManagement: "ખેતી વ્યવસ્થાપન",
    myProduce: "મારી પેદાશો 🌾",
    manageCrops:
        "તમારા પાક, ભાવ અને ઉપલબ્ધ સ્ટોકનું સંચાલન કરો.",
    addProduce: "+ પેદાશ ઉમેરો",
    totalListings: "કુલ લિસ્ટિંગ",
    activeProduceListings: "સક્રિય પેદાશ લિસ્ટિંગ",
    totalStock: "કુલ સ્ટોક",
    availableForBuyers: "ખરીદદારો માટે ઉપલબ્ધ",
    todaysSales: "આજનું વેચાણ",
    fromDirectBuyers: "સીધા ખરીદદારો પાસેથી",
    averagePrice: "સરેરાશ કિંમત",
    perKilogram: "પ્રતિ કિલોગ્રામ",
    inventory: "ઇન્વેન્ટરી",
    yourProduce: "તમારી પેદાશો",
    produce: "પેદાશ",
    quantity: "જથ્થો",
    price: "કિંમત",
    status: "સ્થિતિ",
    action: "ક્રિયા",
    freshTomato: "તાજા ટામેટાં",
    gradeARanchi: "ગ્રેડ A • રાંચી",
    active: "સક્રિય",
    edit: "ફેરફાર કરો",
    premiumRice: "પ્રીમિયમ ચોખા",
    premiumPotato: "પ્રીમિયમ બટાકા",

    // Earnings & Payments

    financialManagement: "નાણાકીય વ્યવસ્થાપન",
    earningsPayments: "કમાણી અને ચુકવણી 💰",
    trackFarmIncome:
        "તમારી ખેતીની આવક, ચુકવણી અને નાણાકીય કામગીરીને ટ્રેક કરો.",

    totalEarnings: "કુલ કમાણી",
    lifetimeFarmEarnings: "અત્યાર સુધીની કુલ ખેતીની કમાણી",

    thisMonth: "આ મહિને",
    earningsInAugust: "ઓગસ્ટની કમાણી",

    twoPayments: "2 ચુકવણીઓ",
    pendingPayments: "બાકી ચુકવણીઓ",
    awaitingBuyerPayment:
        "ખરીદદારની ચુકવણીની રાહ જોઈ રહ્યા છીએ",

    available: "ઉપલબ્ધ",
    availableBalance: "ઉપલબ્ધ બેલેન્સ",
    readyForWithdrawal: "ઉપાડ માટે તૈયાર",

    earningsOverview: "કમાણીનો સારાંશ",
    monthlyEarnings: "માસિક કમાણી",

    cropPerformance: "પાકનું પ્રદર્શન",
    earningsByCrop: "પાક પ્રમાણે કમાણી",

    tomatoEarningsPercent: "કમાણીના 38%",
    riceEarningsPercent: "કમાણીના 34%",
    potatoEarningsPercent: "કમાણીના 28%",

    paymentActivity: "ચુકવણી પ્રવૃત્તિ",
    recentTransactions: "તાજેતરના વ્યવહારો",

    paid: "ચુકવણી થઈ",

    paymentAccount: "ચુકવણી ખાતું",
    settlementInformation: "ચુકવણી સેટલમેન્ટ માહિતી",

    nextSettlement: "આગામી સેટલમેન્ટ",
    pendingAmount: "બાકી રકમ",
    paymentMethod: "ચુકવણી પદ્ધતિ",
    bankTransfer: "બેંક ટ્રાન્સફર",

    viewPaymentDetails: "💰 ચુકવણીની વિગતો જુઓ",

    buyerAccount: "ખરીદદાર ખાતું",

    myOrders: "મારા ઓર્ડર",
    deliveries: "ડિલિવરી",
    payments: "ચુકવણીઓ",

    buyerPortal: "ખરીદદાર પોર્ટલ",
    welcomeBack: "ફરી સ્વાગત છે,",
    buyerDashboardDescription:
        "ખેડૂતો અને FPO પાસેથી સીધી તાજી કૃષિ પેદાશો મેળવો.",

    totalPurchases: "કુલ ખરીદી",

    threeActive: "3 સક્રિય",
    activeOrders: "સક્રિય ઓર્ડર",
    ordersInProgress: "ઓર્ડર પ્રક્રિયામાં છે",

    fourNew: "+4 નવા",
    savedFarmers: "સાચવેલા ખેડૂતો",
    trustedSuppliers: "વિશ્વસનીય સપ્લાયર્સ",

    onTime: "સમયસર",
    deliverySuccessRate: "ડિલિવરી સફળતા દર",

    recommendedProduce: "ભલામણ કરેલી પેદાશો",
    viewMarketplace: "માર્કેટપ્લેસ જુઓ →",
    buy: "ખરીદો",

    kgAvailable800: "800 કિગ્રા ઉપલબ્ધ",
    kgAvailable1200: "1,200 કિગ્રા ઉપલબ્ધ",
    kgAvailable650: "650 કિગ્રા ઉપલબ્ધ",

    smartBuying: "સ્માર્ટ ખરીદી",
    tomatoDemandExpected:
        "આગામી 14 દિવસમાં ટામેટાંની માંગ વધવાની અપેક્ષા છે.",

    purchaseTomatoEarly:
        "સંભવિત ભાવ વધારાથી બચવા માટે ટામેટાંનો સ્ટોક અગાઉથી ખરીદવાનું વિચારો.",

    viewAIInsights: "AI માહિતી જુઓ →",

    yourActivity: "તમારી પ્રવૃત્તિ",

    activeDelivery: "સક્રિય ડિલિવરી",
    you: "તમે",
    estimatedArrival: "અંદાજિત આગમન",
    distance: "અંતર",
    trackDelivery: "🚚 ડિલિવરી ટ્રેક કરો",

    farmerNetwork: "ખેડૂત નેટવર્ક",
    farmersTitle: "ખેડૂતો 👨‍🌾",
    farmerNetworkDescription:
        "વિશ્વસનીય સ્થાનિક ખેડૂતો શોધો અને તેમની સાથે જોડાઓ.",

    availableFarmers: "ઉપલબ્ધ ખેડૂતો",
    verifiedFarmers: "ચકાસાયેલા ખેડૂતો",
    yourTrustedSuppliers: "તમારા વિશ્વસનીય સપ્લાયર્સ",
    nearbyFarmers: "નજીકના ખેડૂતો",
    withinYourRegion: "તમારા વિસ્તારમાં",

    fpos: "FPOs",
    farmerOrganizations: "ખેડૂત સંગઠનો",

    localFarmers: "સ્થાનિક ખેડૂતો",
    trustedFarmers: "વિશ્વસનીય ખેડૂતો 👨‍🌾",
    verifiedFarmersDirectPurchase:
        "સીધી ખરીદી માટે ચકાસાયેલા ખેડૂતો ઉપલબ્ધ છે",

    verifiedNetwork: "✓ ચકાસાયેલ નેટવર્ક",

    view: "જુઓ",

    purchaseManagement: "ખરીદી વ્યવસ્થાપન",
    trackManagePurchases:
        "સ્થાનિક ખેડૂતો પાસેથી કરવામાં આવેલી તમામ ખરીદીઓને ટ્રેક અને મેનેજ કરો.",

    farmerDirect: "🌱 ખેડૂત પાસેથી સીધી ખરીદી",
    secureOrders: "🔒 સુરક્ષિત ઓર્ડર",
    trackable: "🚚 ટ્રેક કરી શકાય તેવું",

    orderHub: "ઓર્ડર હબ",
    allPurchasesOnePlace:
        "બધી ખરીદીઓ એક જ જગ્યાએ",

    orderHistory: "ઓર્ડર ઇતિહાસ",
    yourOrders: "તમારા ઓર્ડર",
    noOrdersYet: "હજુ સુધી કોઈ ઓર્ડર નથી",
    placedOrdersAppearHere:
        "તમે કરેલા ઓર્ડર અહીં દેખાશે.",

    footerDescription:
        "એક સ્માર્ટ અને ન્યાયી કૃષિ માર્કેટપ્લેસનું નિર્માણ.",
    footerCopyright:
        "© 2026 KisanDirect • SIH પ્રોટોટાઇપ",

    loginToContinue:
        "KisanDirect પર ચાલુ રાખવા માટે લૉગિન કરો",
    mobileNumber: "મોબાઇલ નંબર",
    password: "પાસવર્ડ",
    rememberMe: "મને યાદ રાખો",
    forgotPassword: "પાસવર્ડ ભૂલી ગયા?",
    loginButton: "લૉગિન →",

    newToKisanDirect: "KisanDirect પર નવા છો?",
    createAccount: "ખાતું બનાવો",

    prototypeDemo: "પ્રોટોટાઇપ ડેમો",
    localAccountLogin:
        "તમે સ્થાનિક રીતે ખાતું બનાવીને લૉગિન કરી શકો છો.",

    back: "← પાછા",
    joinKisanDirect: "KisanDirectમાં જોડાઓ",
    howUsePlatform:
        "તમે પ્લેટફોર્મનો ઉપયોગ કેવી રીતે કરવા માંગો છો?",

    farmerFpoAccount: "હું ખેડૂત / FPO છું",
    farmerAccountDescription:
        "પેદાશો સીધી વેચો, ઓર્ડર મેળવો અને AI બજારની માહિતીનો ઉપયોગ કરો.",

    buyerAccountOption: "હું ખરીદદાર છું",
    buyerAccountDescription:
        "ચકાસાયેલા ખેડૂતો અને FPO પાસેથી સીધી તાજી કૃષિ પેદાશો ખરીદો.",

    createFarmerAccount: "ખેડૂત ખાતું બનાવો",
    startSellingDirectly:
        "KisanDirect દ્વારા સીધું વેચાણ શરૂ કરો",

    fullName: "પૂરું નામ",
    villageCity: "ગામ / શહેર",
    district: "જિલ્લો",
    state: "રાજ્ય",
    primaryCrop: "મુખ્ય પાક",
    createPassword: "પાસવર્ડ બનાવો",
    createFarmerAccountButton:
        "ખેડૂત ખાતું બનાવો →",

    createBuyerAccount: "ખરીદદાર ખાતું બનાવો",
    sourceDirectlyFromFarmers:
        "ખેડૂતો પાસેથી સીધી પેદાશ મેળવો",
    nameBusinessName: "નામ / વ્યવસાયનું નામ",
    buyerType: "ખરીદદારનો પ્રકાર",
    location: "સ્થાન",
    createBuyerAccountButton:
        "ખરીદદાર ખાતું બનાવો →",

    accountCreated: "ખાતું બનાવવામાં આવ્યું!",
    accountCreatedSuccessfully:
        "તમારું KisanDirect ખાતું સફળતાપૂર્વક બનાવવામાં આવ્યું છે.",
    continueToLogin: "લૉગિન કરવા માટે આગળ વધો →",

    addNewProduce: "નવી પેદાશ ઉમેરો 🌾",
    listFreshProduce:
        "ગ્રાહકો અને જથ્થાબંધ ખરીદદારો માટે તમારી તાજી પેદાશ સીધી સૂચિબદ્ધ કરો.",

    produceName: "પેદાશનું નામ",
    category: "શ્રેણી",
    qualityGrade: "ગુણવત્તા ગ્રેડ",
    quantityAvailable: "ઉપલબ્ધ જથ્થો",
    unit: "એકમ",
    pricePerKg: "પ્રતિ કિલો કિંમત",
    farmPickupLocation: "ખેતર / પિકઅપ સ્થળ",
    availableFrom: "ઉપલબ્ધતાની શરૂઆત",
    cancel: "રદ કરો",
    listProduce: "🌾 પેદાશ સૂચિબદ્ધ કરો",

    kisanDirectAIAssistant: "KISANDIRECT AI સહાયક",
    kisanAIAnalysis: "KisanAI વિશ્લેષણ",
    smartGuidance:
        "વર્તમાન પાકની માહિતીના આધારે સ્માર્ટ માર્ગદર્શન.",
    selectedCrop: "પસંદ કરેલો પાક",
    maintainSupplyMonitorMarket:
        "વર્તમાન સપ્લાય સ્તર જાળવો અને બજારની સ્થિતિ પર નજર રાખો.",
    gotIt: "સમજાયું ✓"
},

kn: {
    home: "ಮುಖಪುಟ",
    marketplace: "ಮಾರುಕಟ್ಟೆ",
    howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    aiSolutions: "AI ಪರಿಹಾರಗಳು",
    login: "ಲಾಗಿನ್",
    joinNow: "ಈಗಲೇ ಸೇರಿ",

    badge: "AI ಚಾಲಿತ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ",
    heroTitle1: "ಹೊಲದಿಂದ",
    heroTitle2: "ನೇರವಾಗಿ",
    heroTitle3: "ಮಾರುಕಟ್ಟೆಗೆ.",
    heroText:
        "KisanDirect ರೈತರು ಮತ್ತು FPOಗಳನ್ನು ನೇರವಾಗಿ ಗ್ರಾಹಕರು ಮತ್ತು ಸಗಟು ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ. ಇದರಿಂದ ರೈತರಿಗೆ ಉತ್ತಮ ಬೆಲೆ ಸಿಗುತ್ತದೆ ಮತ್ತು ಪೂರೈಕೆ ಸರಪಳಿಯಲ್ಲಿನ ಸಮಸ್ಯೆಗಳು ಕಡಿಮೆಯಾಗುತ್ತವೆ.",

    explore: "ಮಾರುಕಟ್ಟೆ ನೋಡಿ",
    joinFarmer: "ರೈತರಾಗಿ ಸೇರಿ",

    smartAgriculture: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
    smartText:
        "ಒಂದೇ ವೇದಿಕೆಯ ಮೂಲಕ ರೈತರು, ಖರೀದಿದಾರರು ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್‌ಗಳನ್ನು ಸಂಪರ್ಕಿಸುವುದು.",

    aiMarket: "AI ಮಾರುಕಟ್ಟೆ ಬುದ್ಧಿಮತ್ತೆ",
    demand: "ಮುಂದಿನ 14 ದಿನಗಳಲ್ಲಿ ನಿರೀಕ್ಷಿತ ಬೇಡಿಕೆ ಹೆಚ್ಚಳ",
    recommendation: "AI ಶಿಫಾರಸು",

    farmers: "ರೈತರು",
    buyers: "ಖರೀದಿದಾರರು",
    states: "ರಾಜ್ಯಗಳು",
    farmerSales: "ರೈತರ ಮಾರಾಟ",

    farmer: "ರೈತ",
    buyer: "ಖರೀದಿದಾರ",

    freshFromFarm: "ಹೊಲದಿಂದ ತಾಜಾ",
    farmerMarketplace: "ರೈತರ ಮಾರುಕಟ್ಟೆ",
    marketText:
        "ರೈತರಿಂದ ನೇರವಾಗಿ ಪಾರದರ್ಶಕ ಬೆಲೆಯಲ್ಲಿ ತಾಜಾ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿಸಿ.",

    whyKisanDirect: "KisanDirect ಏಕೆ?",
    smarterSupplyChain: "ಉತ್ತಮ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪೂರೈಕೆ ಸರಪಳಿ.",

    directMarketplace: "ನೇರ ಮಾರುಕಟ್ಟೆ",
    directMarketplaceText:
        "ರೈತರನ್ನು ನೇರವಾಗಿ ಗ್ರಾಹಕರು ಮತ್ತು ಸಗಟು ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ.",

    aiDemandForecasting: "AI ಬೇಡಿಕೆ ಮುನ್ಸೂಚನೆ",
    aiDemandForecastingText:
        "ಮುಂಬರುವ ಬೇಡಿಕೆಯನ್ನು ಊಹಿಸಿ ಮತ್ತು ರೈತರಿಗೆ ಉತ್ತಮ ಮಾರಾಟ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡಿ.",

    smartLogistics: "ಸ್ಮಾರ್ಟ್ ಲಾಜಿಸ್ಟಿಕ್ಸ್",
    smartLogisticsText:
        "ಮಾರ್ಗಗಳನ್ನು ಉತ್ತಮಗೊಳಿಸಿ ಮತ್ತು ಸಾರಿಗೆ ವೆಚ್ಚವನ್ನು ಕಡಿಮೆ ಮಾಡಿ.",

    betterPrices: "ಉತ್ತಮ ಬೆಲೆಗಳು",
    betterPricesText:
        "ಅನಗತ್ಯ ಮಧ್ಯವರ್ತಿಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಿ ಮತ್ತು ರೈತರ ಆದಾಯವನ್ನು ಹೆಚ್ಚಿಸಿ.",

    artificialIntelligence: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ",

    predictOptimize:
        "ಬೇಡಿಕೆಯನ್ನು ಊಹಿಸಿ. ಪೂರೈಕೆಯನ್ನು ಉತ್ತಮಗೊಳಿಸಿ.",

    aiEngineText:
        "ನಮ್ಮ AI ಎಂಜಿನ್ ಮಾರುಕಟ್ಟೆಯ ಪ್ರವೃತ್ತಿಗಳು, ಐತಿಹಾಸಿಕ ಬೇಡಿಕೆ ಮತ್ತು ಖರೀದಿದಾರರ ಚಟುವಟಿಕೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ ರೈತರಿಗೆ ಏನು ಮಾರಬೇಕು, ಯಾವಾಗ ಮಾರಬೇಕು ಮತ್ತು ಎಲ್ಲಿಗೆ ಕಳುಹಿಸಬೇಕು ಎಂಬುದನ್ನು ನಿರ್ಧರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",

    exploreAIInsights: "AI ಮಾಹಿತಿಯನ್ನು ನೋಡಿ →",

    demandForecast: "ಬೇಡಿಕೆ ಮುನ್ಸೂಚನೆ",
    liveDemo: "● ಲೈವ್ ಡೆಮೊ",
    expectedDemandGrowth: "ನಿರೀಕ್ಷಿತ ಬೇಡಿಕೆ ಹೆಚ್ಚಳ",

    farmerAccount: "ರೈತ ಖಾತೆ",

    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    myProduce: "ನನ್ನ ಉತ್ಪನ್ನಗಳು",
    orders: "ಆರ್ಡರ್‌ಗಳು",
    aiInsights: "AI ಮಾಹಿತಿ",
    logistics: "ಲಾಜಿಸ್ಟಿಕ್ಸ್",
    earnings: "ಗಳಿಕೆ",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    logout: "ಲಾಗ್‌ಔಟ್",

    farmerPortal: "ರೈತ ಪೋರ್ಟಲ್",
    goodMorning: "ಶುಭೋದಯ,",
    farmTodayMessage:
        "ಇಂದು ನಿಮ್ಮ ಹೊಲದಲ್ಲಿ ಏನಾಗುತ್ತಿದೆ ಎಂಬುದನ್ನು ಇಲ್ಲಿ ನೋಡಿ.",

    totalSales: "ಒಟ್ಟು ಮಾರಾಟ",
    comparedLastMonth: "ಕಳೆದ ತಿಂಗಳಿಗೆ ಹೋಲಿಸಿದರೆ",

    activeOrders: "ಸಕ್ರಿಯ ಆರ್ಡರ್‌ಗಳು",
    readyForDispatch: "ರವಾನೆಗೆ 4 ಸಿದ್ಧವಾಗಿವೆ",

    produceListed: "ಪಟ್ಟಿ ಮಾಡಲಾದ ಉತ್ಪನ್ನಗಳು",
    availableForBuyers: "ಖರೀದಿದಾರರಿಗೆ ಲಭ್ಯವಿದೆ",

    avgPrice: "ಸರಾಸರಿ ಬೆಲೆ",
    betterThanMandi: "ಮಂಡಿಗಿಂತ ಉತ್ತಮ",

    aiMarketIntelligence: "AI ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
    highDemand: "ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ ↑",

    aiRecommendation: "AI ಶಿಫಾರಸು",
    tomatoRecommendation:
        "ಮುಂದಿನ 14 ದಿನಗಳಲ್ಲಿ ಟೊಮೆಟೊಗೆ ಬೇಡಿಕೆ ಹೆಚ್ಚಾಗಬಹುದು. ಪೂರೈಕೆಯನ್ನು 15% ಹೆಚ್ಚಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.",

    quickActions: "ತ್ವರಿತ ಕ್ರಮಗಳು",
    manageFarm: "ಕೃಷಿ ನಿರ್ವಹಣೆ",

    listProduce: "ಉತ್ಪನ್ನವನ್ನು ಪಟ್ಟಿ ಮಾಡಿ",
    sellYourCrops: "ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ಮಾರಾಟ ಮಾಡಿ",

    viewOrders: "ಆರ್ಡರ್‌ಗಳನ್ನು ನೋಡಿ",
    manageOrders: "ಆರ್ಡರ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ",

    trackDelivery: "ಡೆಲಿವರಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    viewShipments: "ರವಾನೆಗಳನ್ನು ನೋಡಿ",

    marketPredictions: "ಮಾರುಕಟ್ಟೆ ಮುನ್ಸೂಚನೆಗಳು",

    recentActivity: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ",
    recentOrders: "ಇತ್ತೀಚಿನ ಆರ್ಡರ್‌ಗಳು",
    viewAll: "ಎಲ್ಲವನ್ನೂ ನೋಡಿ →",

    inTransit: "ಮಾರ್ಗದಲ್ಲಿದೆ",
    delivered: "ಡೆಲಿವರಿ ಪೂರ್ಣಗೊಂಡಿದೆ",
    processing: "ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ",

    market: "ಮಾರುಕಟ್ಟೆ",
    todaysPrices: "ಇಂದಿನ ಬೆಲೆಗಳು",

    salesManagement: "ಮಾರಾಟ ನಿರ್ವಹಣೆ",
    ordersReceived: "ಸ್ವೀಕರಿಸಿದ ಆರ್ಡರ್‌ಗಳು 📦",
    manageBuyerOrders:
        "ಖರೀದಿದಾರರು ನೀಡಿದ ಆರ್ಡರ್‌ಗಳನ್ನು ನೋಡಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ.",

    totalOrders: "ಒಟ್ಟು ಆರ್ಡರ್‌ಗಳು",
    pending: "ಬಾಕಿ",
    completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",

    buyerOrders: "ಖರೀದಿದಾರರ ಆರ್ಡರ್‌ಗಳು",
    noOrdersYet: "ಇನ್ನೂ ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ",
    buyerOrdersAppearHere:
        "ಖರೀದಿದಾರರು ನೀಡಿದ ಆರ್ಡರ್‌ಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",

    // AI INSIGHTS PAGE

    aiFarmingIntelligence: "AI ಕೃಷಿ ಬುದ್ಧಿಮತ್ತೆ",
    aiDescription:
        "ಸ್ಮಾರ್ಟ್ ಮಾರುಕಟ್ಟೆ ಮುನ್ಸೂಚನೆಯ ಮೂಲಕ ಏನು ಬೆಳೆಯಬೇಕು, ಯಾವಾಗ ಮಾರಬೇಕು ಮತ್ತು ಎಷ್ಟು ಸಂಗ್ರಹಿಸಬೇಕು ಎಂಬುದನ್ನು ನಿರ್ಧರಿಸಿ.",

    aiActive: "AI ಸಕ್ರಿಯವಾಗಿದೆ",

    analyseYourCrop: "ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    selectCropForInsights:
        "AI ಮಾಹಿತಿಯನ್ನು ನೋಡಲು ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",

    crop: "ಬೆಳೆ",
    tomato: "ಟೊಮೆಟೊ",
    potato: "ಆಲೂಗಡ್ಡೆ",
    onion: "ಈರುಳ್ಳಿ",
    rice: "ಅಕ್ಕಿ",

    gradeA: "ಗ್ರೇಡ್ A",
    fresh: "ತಾಜಾ",
    premium: "ಪ್ರೀಮಿಯಂ",

    expectedDemand: "ನಿರೀಕ್ಷಿತ ಬೇಡಿಕೆ",
    next14Days: "ಮುಂದಿನ 14 ದಿನಗಳು",

    priceTrend: "ಬೆಲೆ ಪ್ರವೃತ್ತಿ",
    rising: "ಹೆಚ್ಚುತ್ತಿದೆ",
    highConfidence: "ಹೆಚ್ಚಿನ ವಿಶ್ವಾಸಾರ್ಹತೆ",

    bestOpportunity: "ಅತ್ಯುತ್ತಮ ಅವಕಾಶ",
    highDemandCrop: "ಹೆಚ್ಚಿನ ಬೇಡಿಕೆಯ ಬೆಳೆ",

    supply: "ಪೂರೈಕೆ",
    marketOutlook: "ಮಾರುಕಟ್ಟೆ ಅಂದಾಜು",

    forecastPeriod: "ಮುನ್ಸೂಚನೆ ಅವಧಿ",
    days14: "14 ದಿನಗಳು",
    confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆ",

    aiMarketIntelligenceTitle: "AI ಮಾರುಕಟ್ಟೆ ಬುದ್ಧಿಮತ್ತೆ",
    demandForecastTitle: "ಬೇಡಿಕೆ ಮುನ್ಸೂಚನೆ",

    aiPredictionDescription:
        "ಐತಿಹಾಸಿಕ ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು, ಖರೀದಿದಾರರ ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಋತುಮಾನ ಮಾದರಿಗಳ ಸಿಮ್ಯುಲೇಟೆಡ್ ಡೇಟಾವನ್ನು ಆಧರಿಸಿದ AI ಮುನ್ಸೂಚನೆ.",

    now: "ಈಗ",
    days7: "7 ದಿನಗಳು",

    aiQuickInsight: "AI ತ್ವರಿತ ಮಾಹಿತಿ",

    tomatoDemandInsight:
        "ಮುಂದಿನ 14 ದಿನಗಳಲ್ಲಿ ಟೊಮೆಟೊಗೆ ಬೇಡಿಕೆ ಹೆಚ್ಚಾಗುವ ನಿರೀಕ್ಷೆಯಿದೆ.",

    considerIncreasingSupply:
        "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಗಮನಿಸುತ್ತಾ ಪೂರೈಕೆಯನ್ನು ಹೆಚ್ಚಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.",

    aiConfidence: "AI ವಿಶ್ವಾಸಾರ್ಹತೆ",
    predictionConfidence: "ಮುನ್ಸೂಚನೆಯ ವಿಶ್ವಾಸಾರ್ಹತೆ",

    basedOnMarketData:
        "ಐತಿಹಾಸಿಕ ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು, ಖರೀದಿದಾರರ ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಋತುಮಾನ ಬೇಡಿಕೆ ಮಾದರಿಗಳ ಸಿಮ್ಯುಲೇಶನ್ ಆಧರಿಸಿದೆ.",

    recommendedSupply: "ಶಿಫಾರಸು ಮಾಡಿದ ಪೂರೈಕೆ",
    suggestedIncrease: "ಸೂಚಿಸಿದ ಹೆಚ್ಚಳ",

    aiRecommendations: "AI ಶಿಫಾರಸುಗಳು",
    whatShouldYouDo: "ನೀವು ಏನು ಮಾಡಬೇಕು? 💡",
    actionableSuggestions:
        "ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ ಸಲಹೆಗಳು.",

    high: "ಹೆಚ್ಚು",
    medium: "ಮಧ್ಯಮ",

    increaseTomatoSupply: "ಟೊಮೆಟೊ ಪೂರೈಕೆಯನ್ನು ಹೆಚ್ಚಿಸಿ",
    tomatoDemandIncrease:
        "ಮುಂದಿನ 14 ದಿನಗಳಲ್ಲಿ ಟೊಮೆಟೊಗೆ ಬೇಡಿಕೆ ಹೆಚ್ಚಾಗುವ ನಿರೀಕ್ಷೆಯಿದೆ.",
    recommended: "ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ",

    monitorPrices: "ಬೆಲೆಗಳನ್ನು ಗಮನಿಸಿ",
    marketPricesUpward:
        "ಹೆಚ್ಚಿನ ಬೇಡಿಕೆಯ ಬೆಳೆಗಳ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳಲ್ಲಿ ಏರಿಕೆಯ ಪ್ರವೃತ್ತಿ ಕಂಡುಬರುತ್ತಿದೆ.",
    opportunity: "ಅವಕಾಶ",

    trackMarketPrices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ →",

    planInventory: "ದಾಸ್ತಾನು ಯೋಜಿಸಿ",
    maintainSufficientStock:
        "ಮುಂಬರುವ ಖರೀದಿದಾರರ ಬೇಡಿಕೆಯನ್ನು ಪೂರೈಸಲು ಸಾಕಷ್ಟು ದಾಸ್ತಾನು ಇರಿಸಿ.",
    priority: "ಆದ್ಯತೆ",

    planInventoryButton: "ದಾಸ್ತಾನು ಯೋಜಿಸಿ →",
    viewSupplyPlan: "ಪೂರೈಕೆ ಯೋಜನೆಯನ್ನು ನೋಡಿ →",

    kisanAiAssistant: "ಕಿಸಾನ್ AI ಸಹಾಯಕ",
    needHelpDeciding: "ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಲು ಸಹಾಯ ಬೇಕೇ?",
    askKisanAiDescription:
        "ಬೆಳೆಗಳು, ಬೆಲೆಗಳು, ಬೇಡಿಕೆ ಅಥವಾ ನಿಮ್ಮ ಮುಂದಿನ ಕೃಷಿ ನಿರ್ಧಾರದ ಕುರಿತು KisanAIಗೆ ಕೇಳಿ.",
    askKisanAI: "KisanAIಗೆ ಕೇಳಿ",

    explainableAI: "ವಿವರಣಾತ್ಮಕ AI",
    whyThisPrediction: "ಈ ಮುನ್ಸೂಚನೆ ಏಕೆ? 🧠",
    understandSignals:
        "AI ಶಿಫಾರಸಿನ ಹಿಂದಿರುವ ಸಂಕೇತಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    viewReasoning: "ಕಾರಣವನ್ನು ನೋಡಿ",

    buyerActivityIncreased: "ಖರೀದಿದಾರರ ಚಟುವಟಿಕೆ ಹೆಚ್ಚಾಗಿದೆ",
    buyerActivityDescription:
        "ಸಿಮ್ಯುಲೇಟೆಡ್ ಖರೀದಿದಾರರ ಚಟುವಟಿಕೆಯು ಸಕಾರಾತ್ಮಕ ಬೇಡಿಕೆಯ ಸಂಕೇತಗಳನ್ನು ತೋರಿಸುತ್ತದೆ.",

    historicalDemandRising: "ಐತಿಹಾಸಿಕ ಬೇಡಿಕೆ ಹೆಚ್ಚುತ್ತಿದೆ",
    historicalDemandDescription:
        "ಹಿಂದಿನ ಮಾರುಕಟ್ಟೆ ಮಾದರಿಗಳು ಟೊಮೆಟೊಗೆ ಹೆಚ್ಚುತ್ತಿರುವ ಬೇಡಿಕೆಯನ್ನು ಸೂಚಿಸುತ್ತವೆ.",

    marketPricesFavorable: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಅನುಕೂಲಕರವಾಗಿವೆ",
    marketPricesDescription:
        "ಪ್ರಸ್ತುತ ಸಿಮ್ಯುಲೇಟೆಡ್ ಬೆಲೆಗಳು ಮಾರಾಟಕ್ಕೆ ಸಕಾರಾತ್ಮಕ ಅವಕಾಶಗಳನ್ನು ತೋರಿಸುತ್ತವೆ.",

    seasonalPatternDetected: "ಋತುಮಾನ ಮಾದರಿ ಪತ್ತೆಯಾಗಿದೆ",
    seasonalPatternDescription:
        "ಐತಿಹಾಸಿಕ ಡೇಟಾದಲ್ಲಿ ಇದೇ ರೀತಿಯ ಋತುಮಾನ ಬೇಡಿಕೆ ಮಾದರಿಗಳು ಕಂಡುಬಂದಿವೆ.",

    aiPrototypeMode: "AI ಪ್ರೋಟೋಟೈಪ್ ಮೋಡ್",
    simulatedDataNotice:
        "ಈ ಮುನ್ಸೂಚನೆಗಳು ಪ್ರಸ್ತುತ KisanDirect SIH ಪ್ರೋಟೋಟೈಪ್‌ಗಾಗಿ ಸಿಮ್ಯುಲೇಟೆಡ್ ಡೇಟಾವನ್ನು ಬಳಸುತ್ತವೆ.",
    analysisReady: "● ವಿಶ್ಲೇಷಣೆ ಸಿದ್ಧವಾಗಿದೆ",

    farmManagement: "ಕೃಷಿ ನಿರ್ವಹಣೆ",
    myProduce: "ನನ್ನ ಉತ್ಪನ್ನಗಳು 🌾",
    manageCrops:
        "ನಿಮ್ಮ ಬೆಳೆಗಳು, ಬೆಲೆಗಳು ಮತ್ತು ಲಭ್ಯವಿರುವ ದಾಸ್ತಾನು ನಿರ್ವಹಿಸಿ.",
    addProduce: "+ ಉತ್ಪನ್ನ ಸೇರಿಸಿ",
    totalListings: "ಒಟ್ಟು ಪಟ್ಟಿಗಳು",
    activeProduceListings: "ಸಕ್ರಿಯ ಉತ್ಪನ್ನ ಪಟ್ಟಿಗಳು",
    totalStock: "ಒಟ್ಟು ದಾಸ್ತಾನು",
    availableForBuyers: "ಖರೀದಿದಾರರಿಗೆ ಲಭ್ಯವಿದೆ",
    todaysSales: "ಇಂದಿನ ಮಾರಾಟ",
    fromDirectBuyers: "ನೇರ ಖರೀದಿದಾರರಿಂದ",
    averagePrice: "ಸರಾಸರಿ ಬೆಲೆ",
    perKilogram: "ಪ್ರತಿ ಕಿಲೋಗ್ರಾಂ",
    inventory: "ದಾಸ್ತಾನು",
    yourProduce: "ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳು",
    produce: "ಉತ್ಪನ್ನ",
    quantity: "ಪ್ರಮಾಣ",
    price: "ಬೆಲೆ",
    status: "ಸ್ಥಿತಿ",
    action: "ಕ್ರಿಯೆ",
    freshTomato: "ತಾಜಾ ಟೊಮೆಟೊ",
    gradeARanchi: "ಗ್ರೇಡ್ A • ರಾಂಚಿ",
    active: "ಸಕ್ರಿಯ",
    edit: "ಸಂಪಾದಿಸಿ",
    premiumRice: "ಪ್ರೀಮಿಯಂ ಅಕ್ಕಿ",
    premiumPotato: "ಪ್ರೀಮಿಯಂ ಆಲೂಗಡ್ಡೆ",

    // Earnings & Payments

    financialManagement: "ಹಣಕಾಸು ನಿರ್ವಹಣೆ",
    earningsPayments: "ಗಳಿಕೆ ಮತ್ತು ಪಾವತಿಗಳು 💰",
    trackFarmIncome:
        "ನಿಮ್ಮ ಕೃಷಿ ಆದಾಯ, ಪಾವತಿಗಳು ಮತ್ತು ಹಣಕಾಸು ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",

    totalEarnings: "ಒಟ್ಟು ಗಳಿಕೆ",
    lifetimeFarmEarnings: "ಇಲ್ಲಿಯವರೆಗೆ ಒಟ್ಟು ಕೃಷಿ ಗಳಿಕೆ",

    thisMonth: "ಈ ತಿಂಗಳು",
    earningsInAugust: "ಆಗಸ್ಟ್ ಗಳಿಕೆ",

    twoPayments: "2 ಪಾವತಿಗಳು",
    pendingPayments: "ಬಾಕಿ ಪಾವತಿಗಳು",
    awaitingBuyerPayment:
        "ಖರೀದಿದಾರರ ಪಾವತಿಗಾಗಿ ಕಾಯುತ್ತಿದೆ",

    available: "ಲಭ್ಯವಿದೆ",
    availableBalance: "ಲಭ್ಯವಿರುವ ಬ್ಯಾಲೆನ್ಸ್",
    readyForWithdrawal: "ಹಿಂಪಡೆಯಲು ಸಿದ್ಧವಾಗಿದೆ",

    earningsOverview: "ಗಳಿಕೆಯ ಅವಲೋಕನ",
    monthlyEarnings: "ಮಾಸಿಕ ಗಳಿಕೆ",

    cropPerformance: "ಬೆಳೆ ಕಾರ್ಯಕ್ಷಮತೆ",
    earningsByCrop: "ಬೆಳೆಯ ಪ್ರಕಾರ ಗಳಿಕೆ",

    tomatoEarningsPercent: "ಗಳಿಕೆಯ 38%",
    riceEarningsPercent: "ಗಳಿಕೆಯ 34%",
    potatoEarningsPercent: "ಗಳಿಕೆಯ 28%",

    paymentActivity: "ಪಾವತಿ ಚಟುವಟಿಕೆ",
    recentTransactions: "ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು",

    paid: "ಪಾವತಿಸಲಾಗಿದೆ",

    paymentAccount: "ಪಾವತಿ ಖಾತೆ",
    settlementInformation: "ಪಾವತಿ ಸೆಟ್ಲ್‌ಮೆಂಟ್ ಮಾಹಿತಿ",

    nextSettlement: "ಮುಂದಿನ ಸೆಟ್ಲ್‌ಮೆಂಟ್",
    pendingAmount: "ಬಾಕಿ ಮೊತ್ತ",
    paymentMethod: "ಪಾವತಿ ವಿಧಾನ",
    bankTransfer: "ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ",

    viewPaymentDetails: "💰 ಪಾವತಿ ವಿವರಗಳನ್ನು ನೋಡಿ",

    buyerAccount: "ಖರೀದಿದಾರರ ಖಾತೆ",

    myOrders: "ನನ್ನ ಆರ್ಡರ್‌ಗಳು",
    deliveries: "ಡೆಲಿವರಿಗಳು",
    payments: "ಪಾವತಿಗಳು",

    buyerPortal: "ಖರೀದಿದಾರರ ಪೋರ್ಟಲ್",
    welcomeBack: "ಮತ್ತೆ ಸ್ವಾಗತ,",
    buyerDashboardDescription:
        "ರೈತರು ಮತ್ತು FPOಗಳಿಂದ ನೇರವಾಗಿ ತಾಜಾ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಪಡೆಯಿರಿ.",

    totalPurchases: "ಒಟ್ಟು ಖರೀದಿಗಳು",

    threeActive: "3 ಸಕ್ರಿಯ",
    activeOrders: "ಸಕ್ರಿಯ ಆರ್ಡರ್‌ಗಳು",
    ordersInProgress: "ಆರ್ಡರ್‌ಗಳು ಪ್ರಗತಿಯಲ್ಲಿವೆ",

    fourNew: "+4 ಹೊಸವು",
    savedFarmers: "ಉಳಿಸಿದ ರೈತರು",
    trustedSuppliers: "ವಿಶ್ವಾಸಾರ್ಹ ಪೂರೈಕೆದಾರರು",

    onTime: "ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ",
    deliverySuccessRate: "ಡೆಲಿವರಿ ಯಶಸ್ಸಿನ ಪ್ರಮಾಣ",

    recommendedProduce: "ಶಿಫಾರಸು ಮಾಡಿದ ಉತ್ಪನ್ನಗಳು",
    viewMarketplace: "ಮಾರುಕಟ್ಟೆ ನೋಡಿ →",
    buy: "ಖರೀದಿಸಿ",

    kgAvailable800: "800 ಕೆಜಿ ಲಭ್ಯವಿದೆ",
    kgAvailable1200: "1,200 ಕೆಜಿ ಲಭ್ಯವಿದೆ",
    kgAvailable650: "650 ಕೆಜಿ ಲಭ್ಯವಿದೆ",

    smartBuying: "ಸ್ಮಾರ್ಟ್ ಖರೀದಿ",
    tomatoDemandExpected:
        "ಮುಂದಿನ 14 ದಿನಗಳಲ್ಲಿ ಟೊಮೆಟೊಗೆ ಬೇಡಿಕೆ ಹೆಚ್ಚಾಗುವ ನಿರೀಕ್ಷೆಯಿದೆ.",

    purchaseTomatoEarly:
        "ಸಂಭಾವ್ಯ ಬೆಲೆ ಏರಿಕೆಯನ್ನು ತಪ್ಪಿಸಲು ಟೊಮೆಟೊವನ್ನು ಮುಂಚಿತವಾಗಿ ಖರೀದಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.",

    viewAIInsights: "AI ಮಾಹಿತಿಯನ್ನು ನೋಡಿ →",

    yourActivity: "ನಿಮ್ಮ ಚಟುವಟಿಕೆ",

    activeDelivery: "ಸಕ್ರಿಯ ಡೆಲಿವರಿ",
    you: "ನೀವು",
    estimatedArrival: "ಅಂದಾಜು ಆಗಮನ",
    distance: "ದೂರ",
    trackDelivery: "🚚 ಡೆಲಿವರಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",

    farmerNetwork: "ರೈತ ನೆಟ್‌ವರ್ಕ್",
    farmersTitle: "ರೈತರು 👨‍🌾",
    farmerNetworkDescription:
        "ವಿಶ್ವಾಸಾರ್ಹ ಸ್ಥಳೀಯ ರೈತರನ್ನು ಹುಡುಕಿ ಮತ್ತು ಅವರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.",

    availableFarmers: "ಲಭ್ಯವಿರುವ ರೈತರು",
    verifiedFarmers: "ಪರಿಶೀಲಿಸಿದ ರೈತರು",
    yourTrustedSuppliers: "ನಿಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ಪೂರೈಕೆದಾರರು",
    nearbyFarmers: "ಹತ್ತಿರದ ರೈತರು",
    withinYourRegion: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ",

    fpos: "FPOಗಳು",
    farmerOrganizations: "ರೈತ ಸಂಘಟನೆಗಳು",

    localFarmers: "ಸ್ಥಳೀಯ ರೈತರು",
    trustedFarmers: "ವಿಶ್ವಾಸಾರ್ಹ ರೈತರು 👨‍🌾",
    verifiedFarmersDirectPurchase:
        "ನೇರ ಖರೀದಿಗಾಗಿ ಪರಿಶೀಲಿಸಿದ ರೈತರು ಲಭ್ಯವಿದ್ದಾರೆ",

    verifiedNetwork: "✓ ಪರಿಶೀಲಿಸಿದ ನೆಟ್‌ವರ್ಕ್",

    view: "ನೋಡಿ",

    purchaseManagement: "ಖರೀದಿ ನಿರ್ವಹಣೆ",
    trackManagePurchases:
        "ಸ್ಥಳೀಯ ರೈತರಿಂದ ಮಾಡಿದ ಎಲ್ಲಾ ಖರೀದಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ.",

    farmerDirect: "🌱 ರೈತರಿಂದ ನೇರ ಖರೀದಿ",
    secureOrders: "🔒 ಸುರಕ್ಷಿತ ಆರ್ಡರ್‌ಗಳು",
    trackable: "🚚 ಟ್ರ್ಯಾಕ್ ಮಾಡಬಹುದಾದ",

    orderHub: "ಆರ್ಡರ್ ಹಬ್",
    allPurchasesOnePlace:
        "ಎಲ್ಲಾ ಖರೀದಿಗಳು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ",

    orderHistory: "ಆರ್ಡರ್ ಇತಿಹಾಸ",
    yourOrders: "ನಿಮ್ಮ ಆರ್ಡರ್‌ಗಳು",
    noOrdersYet: "ಇನ್ನೂ ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ",
    placedOrdersAppearHere:
        "ನೀವು ಮಾಡಿದ ಆರ್ಡರ್‌ಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",

    footerDescription:
        "ಸ್ಮಾರ್ಟ್ ಮತ್ತು ನ್ಯಾಯಯುತ ಕೃಷಿ ಮಾರುಕಟ್ಟೆಯನ್ನು ನಿರ್ಮಿಸುವುದು.",
    footerCopyright:
        "© 2026 KisanDirect • SIH ಪ್ರೋಟೋಟೈಪ್",

    loginToContinue:
        "KisanDirectನಲ್ಲಿ ಮುಂದುವರಿಯಲು ಲಾಗಿನ್ ಮಾಡಿ",
    mobileNumber: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    rememberMe: "ನನ್ನನ್ನು ನೆನಪಿನಲ್ಲಿಡಿ",
    forgotPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?",
    loginButton: "ಲಾಗಿನ್ →",

    newToKisanDirect: "KisanDirectಗೆ ಹೊಸಬರೇ?",
    createAccount: "ಖಾತೆ ರಚಿಸಿ",

    prototypeDemo: "ಪ್ರೋಟೋಟೈಪ್ ಡೆಮೋ",
    localAccountLogin:
        "ನೀವು ಸ್ಥಳೀಯವಾಗಿ ಖಾತೆ ರಚಿಸಿ ಲಾಗಿನ್ ಮಾಡಬಹುದು.",

    back: "← ಹಿಂದೆ",
    joinKisanDirect: "KisanDirectಗೆ ಸೇರಿ",
    howUsePlatform:
        "ನೀವು ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅನ್ನು ಹೇಗೆ ಬಳಸಲು ಬಯಸುತ್ತೀರಿ?",

    farmerFpoAccount: "ನಾನು ರೈತ / FPO",
    farmerAccountDescription:
        "ಉತ್ಪನ್ನಗಳನ್ನು ನೇರವಾಗಿ ಮಾರಾಟ ಮಾಡಿ, ಆರ್ಡರ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು AI ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯನ್ನು ಬಳಸಿ.",

    buyerAccountOption: "ನಾನು ಖರೀದಿದಾರ",
    buyerAccountDescription:
        "ಪರಿಶೀಲಿಸಿದ ರೈತರು ಮತ್ತು FPOಗಳಿಂದ ನೇರವಾಗಿ ತಾಜಾ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿಸಿ.",

    createFarmerAccount: "ರೈತ ಖಾತೆ ರಚಿಸಿ",
    startSellingDirectly:
        "KisanDirect ಮೂಲಕ ನೇರವಾಗಿ ಮಾರಾಟ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿ",

    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    villageCity: "ಗ್ರಾಮ / ನಗರ",
    district: "ಜಿಲ್ಲೆ",
    state: "ರಾಜ್ಯ",
    primaryCrop: "ಮುಖ್ಯ ಬೆಳೆ",
    createPassword: "ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ",
    createFarmerAccountButton:
        "ರೈತ ಖಾತೆ ರಚಿಸಿ →",

    createBuyerAccount: "ಖರೀದಿದಾರರ ಖಾತೆ ರಚಿಸಿ",
    sourceDirectlyFromFarmers:
        "ರೈತರಿಂದ ನೇರವಾಗಿ ಉತ್ಪನ್ನಗಳನ್ನು ಪಡೆಯಿರಿ",
    nameBusinessName: "ಹೆಸರು / ವ್ಯಾಪಾರದ ಹೆಸರು",
    buyerType: "ಖರೀದಿದಾರರ ಪ್ರಕಾರ",
    location: "ಸ್ಥಳ",
    createBuyerAccountButton:
        "ಖರೀದಿದಾರರ ಖಾತೆ ರಚಿಸಿ →",

    accountCreated: "ಖಾತೆ ರಚಿಸಲಾಗಿದೆ!",
    accountCreatedSuccessfully:
        "ನಿಮ್ಮ KisanDirect ಖಾತೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ.",
    continueToLogin: "ಲಾಗಿನ್ ಮಾಡಲು ಮುಂದುವರಿಯಿರಿ →",

    addNewProduce: "ಹೊಸ ಉತ್ಪನ್ನ ಸೇರಿಸಿ 🌾",
    listFreshProduce:
        "ಗ್ರಾಹಕರು ಮತ್ತು ಸಗಟು ಖರೀದಿದಾರರಿಗಾಗಿ ನಿಮ್ಮ ತಾಜಾ ಉತ್ಪನ್ನಗಳನ್ನು ನೇರವಾಗಿ ಪಟ್ಟಿ ಮಾಡಿ.",

    produceName: "ಉತ್ಪನ್ನದ ಹೆಸರು",
    category: "ವರ್ಗ",
    qualityGrade: "ಗುಣಮಟ್ಟದ ಗ್ರೇಡ್",
    quantityAvailable: "ಲಭ್ಯವಿರುವ ಪ್ರಮಾಣ",
    unit: "ಘಟಕ",
    pricePerKg: "ಪ್ರತಿ ಕೆಜಿಗೆ ಬೆಲೆ",
    farmPickupLocation: "ಹೊಲ / ಪಿಕಪ್ ಸ್ಥಳ",
    availableFrom: "ಲಭ್ಯತೆಯ ಆರಂಭ",
    cancel: "ರದ್ದುಮಾಡಿ",
    listProduce: "🌾 ಉತ್ಪನ್ನವನ್ನು ಪಟ್ಟಿ ಮಾಡಿ",

    kisanDirectAIAssistant: "KISANDIRECT AI ಸಹಾಯಕ",
    kisanAIAnalysis: "KisanAI ವಿಶ್ಲೇಷಣೆ",
    smartGuidance:
        "ಪ್ರಸ್ತುತ ಬೆಳೆ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಸ್ಮಾರ್ಟ್ ಮಾರ್ಗದರ್ಶನ.",
    selectedCrop: "ಆಯ್ಕೆ ಮಾಡಿದ ಬೆಳೆ",
    maintainSupplyMonitorMarket:
        "ಪ್ರಸ್ತುತ ಪೂರೈಕೆ ಮಟ್ಟವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಮಾರುಕಟ್ಟೆಯ ಸ್ಥಿತಿಯನ್ನು ಗಮನಿಸಿ.",
    gotIt: "ಅರ್ಥವಾಯಿತು ✓"
},

ml: {
    home: "ഹോം",
    marketplace: "മാർക്കറ്റ്‌പ്ലേസ്",
    howItWorks: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    aiSolutions: "AI പരിഹാരങ്ങൾ",
    login: "ലോഗിൻ",
    joinNow: "ഇപ്പോൾ ചേരുക",

    badge: "AI അധിഷ്ഠിത കാർഷിക വിപണി",
    heroTitle1: "കൃഷിയിടത്തിൽ നിന്ന്",
    heroTitle2: "നേരിട്ട്",
    heroTitle3: "വിപണിയിലേക്ക്.",
    heroText:
        "KisanDirect കർഷകരെയും FPOകളെയും ഉപഭോക്താക്കളുമായും മൊത്തവ്യാപാരികളുമായും നേരിട്ട് ബന്ധിപ്പിക്കുന്നു. ഇതിലൂടെ കർഷകർക്ക് മികച്ച വില ലഭിക്കുകയും വിതരണ ശൃംഖലയിലെ പ്രശ്നങ്ങൾ കുറയുകയും ചെയ്യുന്നു.",

    explore: "വിപണി കാണുക",
    joinFarmer: "കർഷകനായി ചേരുക",

    smartAgriculture: "സ്മാർട്ട് കൃഷി",
    smartText:
        "കർഷകരെയും വാങ്ങുന്നവരെയും ലോജിസ്റ്റിക്സിനെയും ഒരൊറ്റ പ്ലാറ്റ്ഫോമിൽ ബന്ധിപ്പിക്കുന്നു.",

    aiMarket: "AI വിപണി ബുദ്ധി",
    demand: "അടുത്ത 14 ദിവസങ്ങളിലെ പ്രതീക്ഷിക്കുന്ന ആവശ്യകത വർധന",
    recommendation: "AI നിർദ്ദേശം",

    farmers: "കർഷകർ",
    buyers: "വാങ്ങുന്നവർ",
    states: "സംസ്ഥാനങ്ങൾ",
    farmerSales: "കർഷക വിൽപ്പന",

    farmer: "കർഷകൻ",
    buyer: "വാങ്ങുന്നയാൾ",

    freshFromFarm: "കൃഷിയിടത്തിൽ നിന്ന് പുതിയത്",
    farmerMarketplace: "കർഷക വിപണി",
    marketText:
        "കർഷകരിൽ നിന്ന് നേരിട്ട് പുതുമയുള്ള കാർഷിക ഉൽപ്പന്നങ്ങൾ സുതാര്യമായ വിലയിൽ വാങ്ങുക.",

    whyKisanDirect: "എന്തുകൊണ്ട് KisanDirect",
    smarterSupplyChain: "മികച്ച കാർഷിക വിതരണ ശൃംഖല.",

    directMarketplace: "നേരിട്ടുള്ള വിപണി",
    directMarketplaceText:
        "കർഷകരെ ഉപഭോക്താക്കളുമായും മൊത്തവ്യാപാരികളുമായും നേരിട്ട് ബന്ധിപ്പിക്കുക.",

    aiDemandForecasting: "AI ആവശ്യകത പ്രവചനം",
    aiDemandForecastingText:
        "ഭാവിയിലെ ആവശ്യകത പ്രവചിക്കുകയും മികച്ച വിൽപ്പന തീരുമാനങ്ങൾ എടുക്കാൻ കർഷകരെ സഹായിക്കുകയും ചെയ്യുക.",

    smartLogistics: "സ്മാർട്ട് ലോജിസ്റ്റിക്സ്",
    smartLogisticsText:
        "റൂട്ടുകൾ മെച്ചപ്പെടുത്തി ഗതാഗത ചെലവ് കുറയ്ക്കുക.",

    betterPrices: "മികച്ച വിലകൾ",
    betterPricesText:
        "അനാവശ്യ ഇടനിലക്കാരെ കുറച്ച് കർഷകരുടെ വരുമാനം വർധിപ്പിക്കുക.",

    artificialIntelligence: "കൃത്രിമ ബുദ്ധി",

    predictOptimize: "ആവശ്യകത പ്രവചിക്കുക. വിതരണം മെച്ചപ്പെടുത്തുക.",

    aiEngineText:
        "ഞങ്ങളുടെ AI എഞ്ചിൻ വിപണി പ്രവണതകൾ, ചരിത്രപരമായ ആവശ്യകത, വാങ്ങുന്നവരുടെ പ്രവർത്തനങ്ങൾ എന്നിവ വിശകലനം ചെയ്ത് എന്ത് വിൽക്കണം, എപ്പോൾ വിൽക്കണം, എവിടേക്ക് അയയ്ക്കണം എന്നിവ തീരുമാനിക്കാൻ കർഷകരെ സഹായിക്കുന്നു.",

    exploreAIInsights: "AI വിവരങ്ങൾ കാണുക →",

    demandForecast: "ആവശ്യകത പ്രവചനം",
    liveDemo: "● ലൈവ് ഡെമോ",
    expectedDemandGrowth: "പ്രതീക്ഷിക്കുന്ന ആവശ്യകത വർധന",

    farmerAccount: "കർഷക അക്കൗണ്ട്",

    dashboard: "ഡാഷ്ബോർഡ്",
    myProduce: "എന്റെ ഉൽപ്പന്നങ്ങൾ",
    orders: "ഓർഡറുകൾ",
    aiInsights: "AI വിവരങ്ങൾ",
    logistics: "ലോജിസ്റ്റിക്സ്",
    earnings: "വരുമാനം",
    settings: "ക്രമീകരണങ്ങൾ",
    logout: "ലോഗൗട്ട്",

    farmerPortal: "കർഷക പോർട്ടൽ",
    goodMorning: "സുപ്രഭാതം,",
    farmTodayMessage: "ഇന്ന് നിങ്ങളുടെ കൃഷിയിടത്തിൽ എന്താണ് നടക്കുന്നതെന്ന് ഇവിടെ കാണുക.",

    totalSales: "ആകെ വിൽപ്പന",
    comparedLastMonth: "കഴിഞ്ഞ മാസവുമായി താരതമ്യം ചെയ്യുമ്പോൾ",

    activeOrders: "സജീവ ഓർഡറുകൾ",
    readyForDispatch: "ഡിസ്പാച്ചിനായി 4 തയ്യാറാണ്",

    produceListed: "ലിസ്റ്റ് ചെയ്ത ഉൽപ്പന്നങ്ങൾ",
    availableForBuyers: "വാങ്ങുന്നവർക്ക് ലഭ്യമാണ്",

    avgPrice: "ശരാശരി വില",
    betterThanMandi: "മണ്ഡിയേക്കാൾ മികച്ചത്",

    aiMarketIntelligence: "AI വിപണി വിവരങ്ങൾ",
    demandForecast: "ആവശ്യകത പ്രവചനം",
    liveDemo: "• ലൈവ് ഡെമോ",
    expectedDemandGrowth: "പ്രതീക്ഷിക്കുന്ന ആവശ്യകത വർധന",
    highDemand: "ഉയർന്ന ആവശ്യകത ↑",

    aiRecommendation: "AI നിർദ്ദേശം",
    tomatoRecommendation:
        "അടുത്ത 14 ദിവസങ്ങളിൽ തക്കാളിയുടെ ആവശ്യകത വർധിക്കാൻ സാധ്യതയുണ്ട്. വിതരണം 15% വർധിപ്പിക്കുന്നത് പരിഗണിക്കുക.",

    quickActions: "ദ്രുത പ്രവർത്തനങ്ങൾ",
    manageFarm: "കൃഷിയിടം നിയന്ത്രിക്കുക",

    listProduce: "ഉൽപ്പന്നം ലിസ്റ്റ് ചെയ്യുക",
    sellYourCrops: "നിങ്ങളുടെ വിളകൾ വിൽക്കുക",

    viewOrders: "ഓർഡറുകൾ കാണുക",
    manageOrders: "ഓർഡറുകൾ നിയന്ത്രിക്കുക",

    trackDelivery: "ഡെലിവറി ട്രാക്ക് ചെയ്യുക",
    viewShipments: "ഷിപ്പ്മെന്റുകൾ കാണുക",

    aiInsights: "AI വിവരങ്ങൾ",
    marketPredictions: "വിപണി പ്രവചനങ്ങൾ",

    recentActivity: "സമീപകാല പ്രവർത്തനം",
    recentOrders: "സമീപകാല ഓർഡറുകൾ",
    viewAll: "എല്ലാം കാണുക →",

    inTransit: "യാത്രയിലാണ്",
    delivered: "ഡെലിവർ ചെയ്തു",
    processing: "പ്രോസസ്സിംഗ്",

    farmerAccount: "കർഷക അക്കൗണ്ട്",

    market: "വിപണി",
    todaysPrices: "ഇന്നത്തെ വിലകൾ",

    salesManagement: "വിൽപ്പന മാനേജ്മെന്റ്",
    ordersReceived: "ലഭിച്ച ഓർഡറുകൾ 📦",
    manageBuyerOrders:
        "വാങ്ങുന്നവർ നൽകിയ ഓർഡറുകൾ കാണുകയും നിയന്ത്രിക്കുകയും ചെയ്യുക.",

    totalOrders: "ആകെ ഓർഡറുകൾ",
    pending: "തീർപ്പുകൽപ്പിക്കാത്തത്",
    completed: "പൂർത്തിയായി",
    totalSales: "ആകെ വിൽപ്പന",

    recentOrders: "സമീപകാല ഓർഡറുകൾ",
    buyerOrders: "വാങ്ങുന്നവരുടെ ഓർഡറുകൾ",
    noOrdersYet: "ഇതുവരെ ഓർഡറുകളൊന്നുമില്ല",
    buyerOrdersAppearHere:
        "വാങ്ങുന്നവർ നൽകിയ ഓർഡറുകൾ ഇവിടെ കാണിക്കും.",

    // AI INSIGHTS PAGE
    artificialIntelligence: "കൃത്രിമ ബുദ്ധി",
    aiFarmingIntelligence: "AI കാർഷിക ബുദ്ധി",
    aiDescription:
        "സ്മാർട്ട് വിപണി പ്രവചനങ്ങളിലൂടെ എന്ത് കൃഷി ചെയ്യണം, എപ്പോൾ വിൽക്കണം, എത്ര സ്റ്റോക്ക് സൂക്ഷിക്കണം എന്നിവ തീരുമാനിക്കുക.",

    aiActive: "AI സജീവമാണ്",

    analyseYourCrop: "നിങ്ങളുടെ വിള വിശകലനം ചെയ്യുക",
    selectCropForInsights:
        "AI വിവരങ്ങൾ കാണാൻ ഒരു വിള തിരഞ്ഞെടുക്കുക",

    crop: "വിള",
    tomato: "തക്കാളി",
    potato: "ഉരുളക്കിഴങ്ങ്",
    onion: "സവാള",
    rice: "അരി",

    gradeA: "ഗ്രേഡ് A",
    fresh: "പുതിയത്",
    premium: "പ്രീമിയം",

    expectedDemand: "പ്രതീക്ഷിക്കുന്ന ആവശ്യകത",
    next14Days: "അടുത്ത 14 ദിവസം",

    priceTrend: "വില പ്രവണത",
    rising: "ഉയരുന്നു",
    highConfidence: "ഉയർന്ന വിശ്വാസ്യത",

    bestOpportunity: "മികച്ച അവസരം",
    highDemandCrop: "ഉയർന്ന ആവശ്യകതയുള്ള വിള",

    supply: "വിതരണം",
    marketOutlook: "വിപണി പ്രവചനം",

    // AI INSIGHTS - REMAINING

    forecastPeriod: "പ്രവചന കാലയളവ്",
    days14: "14 ദിവസം",
    confidence: "വിശ്വാസ്യത",

    aiMarketIntelligenceTitle: "AI വിപണി ബുദ്ധി",
    demandForecastTitle: "ആവശ്യകത പ്രവചനം",

    aiPredictionDescription:
        "ചരിത്രപരമായ വിപണി പ്രവണതകൾ, വാങ്ങുന്നവരുടെ പ്രവർത്തനങ്ങൾ, കാലാനുസൃത മാതൃകകൾ എന്നിവയുടെ സിമുലേഷനെ അടിസ്ഥാനമാക്കിയുള്ള AI പ്രവചനം.",

    expectedDemandGrowth: "പ്രതീക്ഷിക്കുന്ന ആവശ്യകത വർധന",
    highDemand: "ഉയർന്ന ആവശ്യകത",

    now: "ഇപ്പോൾ",
    days7: "7 ദിവസം",

    aiQuickInsight: "AI ദ്രുത വിവരം",

    tomatoDemandInsight:
        "അടുത്ത 14 ദിവസങ്ങളിൽ തക്കാളിയുടെ ആവശ്യകത വർധിക്കുമെന്ന് പ്രതീക്ഷിക്കുന്നു.",

    considerIncreasingSupply:
        "വിപണി വില നിരീക്ഷിച്ചുകൊണ്ട് വിതരണം വർധിപ്പിക്കുന്നത് പരിഗണിക്കുക.",

    aiConfidence: "AI വിശ്വാസ്യത",
    predictionConfidence: "പ്രവചന വിശ്വാസ്യത",

    basedOnMarketData:
        "ചരിത്രപരമായ വിപണി പ്രവണതകൾ, വാങ്ങുന്നവരുടെ പ്രവർത്തനങ്ങൾ, കാലാനുസൃത ആവശ്യകതാ മാതൃകകൾ എന്നിവയുടെ സിമുലേഷനെ അടിസ്ഥാനമാക്കി.",

    priceTrend: "വില പ്രവണത",
    rising: "↑ ഉയരുന്നു",
    highConfidence: "ഉയർന്ന വിശ്വാസ്യത",

    bestOpportunity: "മികച്ച അവസരം",
    highDemandCrop: "ഉയർന്ന ആവശ്യകതയുള്ള വിള",
    recommendedSupply: "ശുപാർശ ചെയ്യുന്ന വിതരണം",
    suggestedIncrease: "നിർദ്ദേശിച്ച വർധന",

    // AI INSIGHTS - REMAINING

    forecastPeriod: "പ്രവചന കാലയളവ്",
    days14: "14 ദിവസം",
    confidence: "വിശ്വാസ്യത",

    aiMarketIntelligenceTitle: "AI വിപണി ബുദ്ധി",
    demandForecastTitle: "ആവശ്യകത പ്രവചനം",

    aiPredictionDescription:
        "ചരിത്രപരമായ വിപണി പ്രവണതകൾ, വാങ്ങുന്നവരുടെ പ്രവർത്തനങ്ങൾ, കാലാനുസൃത മാതൃകകൾ എന്നിവയുടെ സിമുലേഷനെ അടിസ്ഥാനമാക്കിയുള്ള AI പ്രവചനം.",

    expectedDemandGrowth: "പ്രതീക്ഷിക്കുന്ന ആവശ്യകത വർധന",
    highDemand: "ഉയർന്ന ആവശ്യകത",

    now: "ഇപ്പോൾ",
    days7: "7 ദിവസം",

    aiQuickInsight: "AI ദ്രുത വിവരം",

    tomatoDemandInsight:
        "അടുത്ത 14 ദിവസങ്ങളിൽ തക്കാളിയുടെ ആവശ്യകത വർധിക്കുമെന്ന് പ്രതീക്ഷിക്കുന്നു.",

    considerIncreasingSupply:
        "വിപണി വില നിരീക്ഷിച്ചുകൊണ്ട് വിതരണം വർധിപ്പിക്കുന്നത് പരിഗണിക്കുക.",

    aiConfidence: "AI വിശ്വാസ്യത",
    predictionConfidence: "പ്രവചന വിശ്വാസ്യത",

    basedOnMarketData:
        "ചരിത്രപരമായ വിപണി പ്രവണതകൾ, വാങ്ങുന്നവരുടെ പ്രവർത്തനങ്ങൾ, കാലാനുസൃത ആവശ്യകതാ മാതൃകകൾ എന്നിവയുടെ സിമുലേഷനെ അടിസ്ഥാനമാക്കി.",

    aiRecommendations: "AI നിർദ്ദേശങ്ങൾ",
    whatShouldYouDo: "നിങ്ങൾ എന്ത് ചെയ്യണം? 💡",
    actionableSuggestions:
        "നിലവിലെ വിപണി സാഹചര്യങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ള നിർദ്ദേശങ്ങൾ.",

    high: "ഉയർന്ന",
    medium: "ഇടത്തരം",

    increaseTomatoSupply: "തക്കാളി വിതരണം വർധിപ്പിക്കുക",
    tomatoDemandIncrease:
        "അടുത്ത 14 ദിവസങ്ങളിൽ തക്കാളിയുടെ ആവശ്യകത വർധിക്കുമെന്ന് പ്രതീക്ഷിക്കുന്നു.",
    recommended: "ശുപാർശ ചെയ്യുന്നത്",

    monitorPrices: "വിലകൾ നിരീക്ഷിക്കുക",
    marketPricesUpward:
        "ഉയർന്ന ആവശ്യകതയുള്ള വിളകളുടെ വിപണി വില ഉയരുന്ന പ്രവണത കാണിക്കുന്നു.",
    opportunity: "അവസരം",

    trackMarketPrices: "വിപണി വിലകൾ ട്രാക്ക് ചെയ്യുക →",

    planInventory: "ഇൻവെന്ററി ആസൂത്രണം ചെയ്യുക",
    maintainSufficientStock:
        "വരാനിരിക്കുന്ന വാങ്ങുന്നവരുടെ ആവശ്യകത നിറവേറ്റാൻ മതിയായ സ്റ്റോക്ക് സൂക്ഷിക്കുക.",
    priority: "മുൻഗണന",

    planInventoryButton: "ഇൻവെന്ററി ആസൂത്രണം ചെയ്യുക →",
    viewSupplyPlan: "വിതരണ പദ്ധതി കാണുക →",

    kisanAiAssistant: "കിസാൻ AI സഹായി",
    needHelpDeciding: "തീരുമാനമെടുക്കാൻ സഹായം ആവശ്യമുണ്ടോ?",
    askKisanAiDescription:
        "വിളകൾ, വിലകൾ, ആവശ്യകത അല്ലെങ്കിൽ നിങ്ങളുടെ അടുത്ത കാർഷിക തീരുമാനത്തെക്കുറിച്ച് KisanAIയോട് ചോദിക്കുക.",
    askKisanAI: "KisanAIയോട് ചോദിക്കുക",

    explainableAI: "വിശദീകരിക്കാവുന്ന AI",
    whyThisPrediction: "ഈ പ്രവചനം എന്തുകൊണ്ട്? 🧠",
    understandSignals:
        "AI നിർദ്ദേശത്തിന് പിന്നിലെ സൂചനകൾ മനസ്സിലാക്കുക.",
    viewReasoning: "കാരണം കാണുക",

    buyerActivityIncreased: "വാങ്ങുന്നവരുടെ പ്രവർത്തനം വർധിച്ചു",
    buyerActivityDescription:
        "സിമുലേറ്റ് ചെയ്ത വാങ്ങുന്നവരുടെ പ്രവർത്തനം അനുകൂലമായ ആവശ്യകതയുടെ സൂചന കാണിക്കുന്നു.",

    historicalDemandRising: "ചരിത്രപരമായ ആവശ്യകത ഉയരുന്നു",
    historicalDemandDescription:
        "കഴിഞ്ഞ വിപണി മാതൃകകൾ തക്കാളിയുടെ വർധിച്ചുവരുന്ന ആവശ്യകത സൂചിപ്പിക്കുന്നു.",

    marketPricesFavorable: "വിപണി വിലകൾ അനുകൂലമാണ്",
    marketPricesDescription:
        "നിലവിലെ സിമുലേറ്റ് ചെയ്ത വിലകൾ വിൽപ്പനയ്ക്ക് അനുകൂലമായ അവസരങ്ങൾ കാണിക്കുന്നു.",

    seasonalPatternDetected: "കാലാനുസൃത മാതൃക കണ്ടെത്തി",
    seasonalPatternDescription:
        "ചരിത്രപരമായ ഡാറ്റയിൽ സമാനമായ കാലാനുസൃത ആവശ്യകതാ മാതൃകകൾ കണ്ടെത്തിയിട്ടുണ്ട്.",

    aiPrototypeMode: "AI പ്രോട്ടോടൈപ്പ് മോഡ്",
    simulatedDataNotice:
        "ഈ പ്രവചനങ്ങൾ നിലവിൽ KisanDirect SIH പ്രോട്ടോടൈപ്പിനായി സിമുലേറ്റ് ചെയ്ത ഡാറ്റയാണ് ഉപയോഗിക്കുന്നത്.",
    analysisReady: "● വിശകലനം തയ്യാറാണ്",

    farmManagement: "കാർഷിക മാനേജ്മെന്റ്",
    myProduce: "എന്റെ ഉൽപ്പന്നങ്ങൾ 🌾",
    manageCrops:
        "നിങ്ങളുടെ വിളകൾ, വിലകൾ, ലഭ്യമായ സ്റ്റോക്ക് എന്നിവ നിയന്ത്രിക്കുക.",
    addProduce: "+ ഉൽപ്പന്നം ചേർക്കുക",
    totalListings: "ആകെ ലിസ്റ്റിംഗുകൾ",
    activeProduceListings: "സജീവ ഉൽപ്പന്ന ലിസ്റ്റിംഗുകൾ",
    totalStock: "ആകെ സ്റ്റോക്ക്",
    availableForBuyers: "വാങ്ങുന്നവർക്ക് ലഭ്യമാണ്",
    todaysSales: "ഇന്നത്തെ വിൽപ്പന",
    fromDirectBuyers: "നേരിട്ടുള്ള വാങ്ങുന്നവരിൽ നിന്ന്",
    averagePrice: "ശരാശരി വില",
    perKilogram: "ഒരു കിലോഗ്രാമിന്",
    inventory: "ഇൻവെന്ററി",
    yourProduce: "നിങ്ങളുടെ ഉൽപ്പന്നങ്ങൾ",
    produce: "ഉൽപ്പന്നം",
    quantity: "അളവ്",
    price: "വില",
    status: "നില",
    action: "പ്രവർത്തനം",
    freshTomato: "പുതിയ തക്കാളി",
    gradeARanchi: "ഗ്രേഡ് A • റാഞ്ചി",
    active: "സജീവം",
    edit: "തിരുത്തുക",
    premiumRice: "പ്രീമിയം അരി",
    premiumPotato: "പ്രീമിയം ഉരുളക്കിഴങ്ങ്",

    // Earnings & Payments

    financialManagement: "സാമ്പത്തിക മാനേജ്മെന്റ്",
    earningsPayments: "വരുമാനവും പേയ്‌മെന്റുകളും 💰",
    trackFarmIncome:
        "നിങ്ങളുടെ കാർഷിക വരുമാനം, പേയ്‌മെന്റുകൾ, സാമ്പത്തിക പ്രകടനം എന്നിവ ട്രാക്ക് ചെയ്യുക.",

    totalEarnings: "ആകെ വരുമാനം",
    lifetimeFarmEarnings: "ഇതുവരെയുള്ള ആകെ കാർഷിക വരുമാനം",

    thisMonth: "ഈ മാസം",
    earningsInAugust: "ഓഗസ്റ്റിലെ വരുമാനം",

    twoPayments: "2 പേയ്‌മെന്റുകൾ",
    pendingPayments: "തീർപ്പുകൽപ്പിക്കാത്ത പേയ്‌മെന്റുകൾ",
    awaitingBuyerPayment: "വാങ്ങുന്നയാളുടെ പേയ്‌മെന്റിനായി കാത്തിരിക്കുന്നു",

    available: "ലഭ്യമാണ്",
    availableBalance: "ലഭ്യമായ ബാലൻസ്",
    readyForWithdrawal: "പിൻവലിക്കലിന് തയ്യാറാണ്",

    earningsOverview: "വരുമാന അവലോകനം",
    monthlyEarnings: "മാസ വരുമാനം",

    cropPerformance: "വിള പ്രകടനം",
    earningsByCrop: "വിള അനുസരിച്ചുള്ള വരുമാനം",

    tomatoEarningsPercent: "വരുമാനത്തിന്റെ 38%",
    riceEarningsPercent: "വരുമാനത്തിന്റെ 34%",
    potatoEarningsPercent: "വരുമാനത്തിന്റെ 28%",

    paymentActivity: "പേയ്‌മെന്റ് പ്രവർത്തനം",
    recentTransactions: "സമീപകാല ഇടപാടുകൾ",

    paid: "പേയ്‌മെന്റ് ചെയ്തു",

    paymentAccount: "പേയ്‌മെന്റ് അക്കൗണ്ട്",
    settlementInformation: "പേയ്‌മെന്റ് സെറ്റിൽമെന്റ് വിവരങ്ങൾ",

    nextSettlement: "അടുത്ത സെറ്റിൽമെന്റ്",
    pendingAmount: "തീർപ്പുകൽപ്പിക്കാത്ത തുക",
    paymentMethod: "പേയ്‌മെന്റ് രീതി",
    bankTransfer: "ബാങ്ക് ട്രാൻസ്ഫർ",

    viewPaymentDetails: "💰 പേയ്‌മെന്റ് വിശദാംശങ്ങൾ കാണുക",

    // BUYER DASHBOARD

    buyerAccount: "വാങ്ങുന്നയാളുടെ അക്കൗണ്ട്",

    myOrders: "എന്റെ ഓർഡറുകൾ",
    deliveries: "ഡെലിവറികൾ",
    payments: "പേയ്‌മെന്റുകൾ",

    buyerPortal: "വാങ്ങുന്നവരുടെ പോർട്ടൽ",
    welcomeBack: "തിരികെ സ്വാഗതം,",
    buyerDashboardDescription:
        "കർഷകരിൽ നിന്നും FPOകളിൽ നിന്നും നേരിട്ട് പുതിയ കാർഷിക ഉൽപ്പന്നങ്ങൾ കണ്ടെത്തുക.",

    totalPurchases: "ആകെ വാങ്ങലുകൾ",
    thisMonth: "ഈ മാസം",

    threeActive: "3 സജീവം",
    activeOrders: "സജീവ ഓർഡറുകൾ",
    ordersInProgress: "ഓർഡറുകൾ പുരോഗതിയിലാണ്",

    fourNew: "+4 പുതിയത്",
    savedFarmers: "സേവ് ചെയ്ത കർഷകർ",
    trustedSuppliers: "വിശ്വസനീയ വിതരണക്കാർ",

    onTime: "സമയത്ത്",
    deliveries: "ഡെലിവറികൾ",
    deliverySuccessRate: "ഡെലിവറി വിജയ നിരക്ക്",

    recommendedProduce: "ശുപാർശ ചെയ്യുന്ന ഉൽപ്പന്നങ്ങൾ",
    viewMarketplace: "മാർക്കറ്റ്‌പ്ലേസ് കാണുക →",
    buy: "വാങ്ങുക",

    kgAvailable800: "800 കിലോ ലഭ്യമാണ്",
    kgAvailable1200: "1,200 കിലോ ലഭ്യമാണ്",
    kgAvailable650: "650 കിലോ ലഭ്യമാണ്",

    smartBuying: "സ്മാർട്ട് വാങ്ങൽ",
    tomatoDemandExpected:
        "അടുത്ത 14 ദിവസങ്ങളിൽ തക്കാളിയുടെ ആവശ്യകത വർധിക്കുമെന്ന് പ്രതീക്ഷിക്കുന്നു.",

    purchaseTomatoEarly:
        "സാധ്യതയുള്ള വില വർധന ഒഴിവാക്കാൻ തക്കാളി നേരത്തെ സ്റ്റോക്ക് ചെയ്യുന്നത് പരിഗണിക്കുക.",

    viewAIInsights: "AI വിവരങ്ങൾ കാണുക →",

    yourActivity: "നിങ്ങളുടെ പ്രവർത്തനം",

    inTransit: "യാത്രയിലാണ്",
    delivered: "ഡെലിവർ ചെയ്തു",
    processing: "പ്രോസസ്സിംഗ്",

    activeDelivery: "സജീവ ഡെലിവറി",
    you: "നിങ്ങൾ",
    estimatedArrival: "പ്രതീക്ഷിക്കുന്ന എത്തിച്ചേരൽ",
    distance: "ദൂരം",
    trackDelivery: "🚚 ഡെലിവറി ട്രാക്ക് ചെയ്യുക",

    farmerNetwork: "കർഷക ശൃംഖല",
    farmersTitle: "കർഷകർ 👨‍🌾",
    farmerNetworkDescription:
        "വിശ്വസനീയമായ പ്രാദേശിക കർഷകരെ കണ്ടെത്തി അവരുമായി ബന്ധപ്പെടുക.",

    availableFarmers: "ലഭ്യമായ കർഷകർ",
    verifiedFarmers: "പരിശോധിച്ച കർഷകർ",
    yourTrustedSuppliers: "നിങ്ങളുടെ വിശ്വസനീയ വിതരണക്കാർ",
    nearbyFarmers: "സമീപത്തുള്ള കർഷകർ",
    withinYourRegion: "നിങ്ങളുടെ പ്രദേശത്ത്",

    fpos: "FPOകൾ",
    farmerOrganizations: "കർഷക സംഘടനകൾ",

    localFarmers: "പ്രാദേശിക കർഷകർ",
    trustedFarmers: "വിശ്വസനീയ കർഷകർ 👨‍🌾",
    verifiedFarmersDirectPurchase:
        "നേരിട്ടുള്ള വാങ്ങലിനായി പരിശോധിച്ച കർഷകർ ലഭ്യമാണ്",

    verifiedNetwork: "✓ പരിശോധിച്ച ശൃംഖല",

    view: "കാണുക",

    purchaseManagement: "വാങ്ങൽ മാനേജ്മെന്റ്",
    trackManagePurchases:
        "പ്രാദേശിക കർഷകരിൽ നിന്ന് നടത്തിയ എല്ലാ വാങ്ങലുകളും ട്രാക്ക് ചെയ്യുകയും നിയന്ത്രിക്കുകയും ചെയ്യുക.",

    farmerDirect: "🌱 കർഷകനിൽ നിന്ന് നേരിട്ടുള്ള വാങ്ങൽ",
    secureOrders: "🔒 സുരക്ഷിത ഓർഡറുകൾ",
    trackable: "🚚 ട്രാക്ക് ചെയ്യാവുന്നത്",

    orderHub: "ഓർഡർ ഹബ്",
    allPurchasesOnePlace: "എല്ലാ വാങ്ങലുകളും ഒരൊറ്റ സ്ഥലത്ത്",

    orderHistory: "ഓർഡർ ചരിത്രം",
    yourOrders: "നിങ്ങളുടെ ഓർഡറുകൾ",
    noOrdersYet: "ഇതുവരെ ഓർഡറുകളൊന്നുമില്ല",
    placedOrdersAppearHere:
        "നിങ്ങൾ നൽകിയ ഓർഡറുകൾ ഇവിടെ കാണിക്കും.",

    footerDescription:
        "സ്മാർട്ടും നീതിയുക്തവുമായ ഒരു കാർഷിക മാർക്കറ്റ്‌പ്ലേസ് നിർമ്മിക്കുന്നു.",
    footerCopyright:
        "© 2026 KisanDirect • SIH പ്രോട്ടോടൈപ്പ്",

    // LOGIN

    loginToContinue:
        "KisanDirect-ൽ തുടരാൻ ലോഗിൻ ചെയ്യുക",
    mobileNumber: "മൊബൈൽ നമ്പർ",
    password: "പാസ്‌വേഡ്",
    rememberMe: "എന്നെ ഓർമ്മിക്കുക",
    forgotPassword: "പാസ്‌വേഡ് മറന്നോ?",
    loginButton: "ലോഗിൻ →",

    newToKisanDirect: "KisanDirect-ൽ പുതിയ ആളാണോ?",
    createAccount: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",

    prototypeDemo: "പ്രോട്ടോടൈപ്പ് ഡെമോ",
    localAccountLogin:
        "നിങ്ങൾക്ക് പ്രാദേശികമായി അക്കൗണ്ട് സൃഷ്ടിച്ച് ലോഗിൻ ചെയ്യാം.",

    back: "← തിരികെ",
    joinKisanDirect: "KisanDirect-ൽ ചേരുക",
    howUsePlatform:
        "നിങ്ങൾ പ്ലാറ്റ്ഫോം എങ്ങനെ ഉപയോഗിക്കാൻ ആഗ്രഹിക്കുന്നു?",

    farmerFpoAccount: "ഞാൻ കർഷകൻ / FPO ആണ്",
    farmerAccountDescription:
        "ഉൽപ്പന്നങ്ങൾ നേരിട്ട് വിൽക്കുക, ഓർഡറുകൾ സ്വീകരിക്കുക, AI വിപണി വിവരങ്ങൾ ഉപയോഗിക്കുക.",

    buyerAccountOption: "ഞാൻ വാങ്ങുന്നയാളാണ്",
    buyerAccountDescription:
        "പരിശോധിച്ച കർഷകരിൽ നിന്നും FPOകളിൽ നിന്നും നേരിട്ട് പുതിയ ഉൽപ്പന്നങ്ങൾ വാങ്ങുക.",

    createFarmerAccount: "കർഷക അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    startSellingDirectly:
        "KisanDirect വഴി നേരിട്ട് വിൽക്കാൻ ആരംഭിക്കുക",

    fullName: "പൂർണ്ണ പേര്",
    villageCity: "ഗ്രാമം / നഗരം",
    district: "ജില്ല",
    state: "സംസ്ഥാനം",
    primaryCrop: "പ്രധാന വിള",
    createPassword: "പാസ്‌വേഡ് സൃഷ്ടിക്കുക",
    createFarmerAccountButton:
        "കർഷക അക്കൗണ്ട് സൃഷ്ടിക്കുക →",

    createBuyerAccount: "വാങ്ങുന്നയാളുടെ അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    sourceDirectlyFromFarmers:
        "കർഷകരിൽ നിന്ന് നേരിട്ട് ഉൽപ്പന്നങ്ങൾ നേടുക",
    nameBusinessName: "പേര് / ബിസിനസ് പേര്",
    buyerType: "വാങ്ങുന്നയാളുടെ തരം",
    location: "സ്ഥലം",
    createBuyerAccountButton:
        "വാങ്ങുന്നയാളുടെ അക്കൗണ്ട് സൃഷ്ടിക്കുക →",

    accountCreated: "അക്കൗണ്ട് സൃഷ്ടിച്ചു!",
    accountCreatedSuccessfully:
        "നിങ്ങളുടെ KisanDirect അക്കൗണ്ട് വിജയകരമായി സൃഷ്ടിച്ചു.",
    continueToLogin: "ലോഗിൻ ചെയ്യാൻ തുടരുക →",

    // ADD PRODUCE

    farmManagement: "കാർഷിക മാനേജ്മെന്റ്",
    addNewProduce: "പുതിയ ഉൽപ്പന്നം ചേർക്കുക 🌾",
    listFreshProduce:
        "ഉപഭോക്താക്കൾക്കും മൊത്തവ്യാപാരികൾക്കും നിങ്ങളുടെ പുതിയ ഉൽപ്പന്നങ്ങൾ നേരിട്ട് ലിസ്റ്റ് ചെയ്യുക.",

    produceName: "ഉൽപ്പന്നത്തിന്റെ പേര്",
    category: "വിഭാഗം",
    qualityGrade: "ഗുണനിലവാര ഗ്രേഡ്",
    quantityAvailable: "ലഭ്യമായ അളവ്",
    unit: "യൂണിറ്റ്",
    pricePerKg: "ഒരു കിലോഗ്രാമിന്റെ വില",
    farmPickupLocation: "കൃഷിയിടം / പിക്കപ്പ് സ്ഥലം",
    availableFrom: "ലഭ്യത ആരംഭിക്കുന്നത്",
    cancel: "റദ്ദാക്കുക",
    listProduce: "🌾 ഉൽപ്പന്നം ലിസ്റ്റ് ചെയ്യുക",

    // KISAN AI

    kisanDirectAIAssistant: "KISANDIRECT AI സഹായി",
    kisanAIAnalysis: "KisanAI വിശകലനം",
    smartGuidance:
        "നിലവിലെ വിള വിവരങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ള സ്മാർട്ട് മാർഗനിർദ്ദേശം.",
    selectedCrop: "തിരഞ്ഞെടുത്ത വിള",
    supply: "📦 വിതരണം",
    maintainSupplyMonitorMarket:
        "നിലവിലെ വിതരണ നില നിലനിർത്തുകയും വിപണി സാഹചര്യം നിരീക്ഷിക്കുകയും ചെയ്യുക.",
    gotIt: "മനസ്സിലായി ✓"
},

pa: {
    home: "ਹੋਮ",
    marketplace: "ਮਾਰਕੀਟਪਲੇਸ",
    howItWorks: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    aiSolutions: "AI ਹੱਲ",
    login: "ਲੌਗਇਨ",
    joinNow: "ਹੁਣੇ ਜੁੜੋ",

    badge: "AI-ਸੰਚਾਲਿਤ ਖੇਤੀਬਾੜੀ ਮਾਰਕੀਟ",
    heroTitle1: "ਖੇਤ ਤੋਂ",
    heroTitle2: "ਸਿੱਧਾ",
    heroTitle3: "ਬਾਜ਼ਾਰ ਤੱਕ।",
    heroText:
        "KisanDirect ਕਿਸਾਨਾਂ ਅਤੇ FPOs ਨੂੰ ਸਿੱਧੇ ਖਪਤਕਾਰਾਂ ਅਤੇ ਥੋਕ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਜੋੜਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਕਿਸਾਨਾਂ ਨੂੰ ਵਧੀਆ ਕੀਮਤ ਮਿਲਦੀ ਹੈ ਅਤੇ ਸਪਲਾਈ-ਚੇਨ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਘੱਟ ਹੁੰਦੀਆਂ ਹਨ।",

    explore: "ਬਾਜ਼ਾਰ ਵੇਖੋ",
    joinFarmer: "ਕਿਸਾਨ ਵਜੋਂ ਜੁੜੋ",

    smartAgriculture: "ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ",
    smartText:
        "ਕਿਸਾਨਾਂ, ਖਰੀਦਦਾਰਾਂ ਅਤੇ ਲੌਜਿਸਟਿਕਸ ਨੂੰ ਇੱਕੋ ਪਲੇਟਫਾਰਮ ਨਾਲ ਜੋੜਨਾ।",

    aiMarket: "AI ਮਾਰਕੀਟ ਇੰਟੈਲੀਜੈਂਸ",
    demand: "ਅਗਲੇ 14 ਦਿਨਾਂ ਵਿੱਚ ਅਨੁਮਾਨਿਤ ਮੰਗ ਵਿੱਚ ਵਾਧਾ",
    recommendation: "AI ਸੁਝਾਅ",

    farmers: "ਕਿਸਾਨ",
    buyers: "ਖਰੀਦਦਾਰ",
    states: "ਰਾਜ",
    farmerSales: "ਕਿਸਾਨ ਵਿਕਰੀ",

    farmer: "ਕਿਸਾਨ",
    buyer: "ਖਰੀਦਦਾਰ",

    freshFromFarm: "ਖੇਤ ਤੋਂ ਤਾਜ਼ਾ",
    farmerMarketplace: "ਕਿਸਾਨ ਬਾਜ਼ਾਰ",
    marketText:
        "ਕਿਸਾਨਾਂ ਤੋਂ ਸਿੱਧੀ ਤਾਜ਼ੀ ਉਪਜ ਪਾਰਦਰਸ਼ੀ ਕੀਮਤਾਂ 'ਤੇ ਖਰੀਦੋ।",

    whyKisanDirect: "KisanDirect ਕਿਉਂ",
    smarterSupplyChain: "ਇੱਕ ਬਿਹਤਰ ਖੇਤੀਬਾੜੀ ਸਪਲਾਈ ਚੇਨ।",

    directMarketplace: "ਸਿੱਧਾ ਬਾਜ਼ਾਰ",
    directMarketplaceText:
        "ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੱਧੇ ਖਪਤਕਾਰਾਂ ਅਤੇ ਥੋਕ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਜੋੜੋ।",

    aiDemandForecasting: "AI ਮੰਗ ਪੂਰਵ ਅਨੁਮਾਨ",
    aiDemandForecastingText:
        "ਆਉਣ ਵਾਲੀ ਮੰਗ ਦਾ ਅਨੁਮਾਨ ਲਗਾਓ ਅਤੇ ਕਿਸਾਨਾਂ ਨੂੰ ਬਿਹਤਰ ਵਿਕਰੀ ਫੈਸਲੇ ਲੈਣ ਵਿੱਚ ਮਦਦ ਕਰੋ।",

    smartLogistics: "ਸਮਾਰਟ ਲੌਜਿਸਟਿਕਸ",
    smartLogisticsText:
        "ਰੂਟਾਂ ਨੂੰ ਬਿਹਤਰ ਬਣਾਓ ਅਤੇ ਆਵਾਜਾਈ ਦੀ ਲਾਗਤ ਘਟਾਓ।",

    betterPrices: "ਬਿਹਤਰ ਕੀਮਤਾਂ",
    betterPricesText:
        "ਬੇਲੋੜੀਂਦੇ ਵਿਚੋਲਿਆਂ ਨੂੰ ਘਟਾਓ ਅਤੇ ਕਿਸਾਨਾਂ ਦੀ ਆਮਦਨ ਵਧਾਓ।",

    artificialIntelligence: "ਕ੍ਰਿਤ੍ਰਿਮ ਬੁੱਧੀ",

    predictOptimize: "ਮੰਗ ਦਾ ਅਨੁਮਾਨ ਲਗਾਓ। ਸਪਲਾਈ ਨੂੰ ਬਿਹਤਰ ਬਣਾਓ।",

    aiEngineText:
        "ਸਾਡਾ AI ਇੰਜਣ ਬਾਜ਼ਾਰ ਦੇ ਰੁਝਾਨਾਂ, ਇਤਿਹਾਸਕ ਮੰਗ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ ਕਿਸਾਨਾਂ ਨੂੰ ਇਹ ਫੈਸਲਾ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ ਕਿ ਕੀ ਵੇਚਣਾ ਹੈ, ਕਦੋਂ ਵੇਚਣਾ ਹੈ ਅਤੇ ਕਿੱਥੇ ਭੇਜਣਾ ਹੈ।",

    exploreAIInsights: "AI ਜਾਣਕਾਰੀ ਵੇਖੋ →",

    demandForecast: "ਮੰਗ ਪੂਰਵ ਅਨੁਮਾਨ",
    liveDemo: "● ਲਾਈਵ ਡੈਮੋ",
    expectedDemandGrowth: "ਅਨੁਮਾਨਿਤ ਮੰਗ ਵਾਧਾ",

    farmerAccount: "ਕਿਸਾਨ ਖਾਤਾ",

    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    myProduce: "ਮੇਰੀ ਉਪਜ",
    orders: "ਆਰਡਰ",
    aiInsights: "AI ਜਾਣਕਾਰੀ",
    logistics: "ਲੌਜਿਸਟਿਕਸ",
    earnings: "ਕਮਾਈ",
    settings: "ਸੈਟਿੰਗਾਂ",
    logout: "ਲੌਗਆਉਟ",

    farmerPortal: "ਕਿਸਾਨ ਪੋਰਟਲ",
    goodMorning: "ਸ਼ੁਭ ਸਵੇਰ,",
    farmTodayMessage:
        "ਅੱਜ ਤੁਹਾਡੇ ਖੇਤ ਵਿੱਚ ਕੀ ਹੋ ਰਿਹਾ ਹੈ, ਇੱਥੇ ਵੇਖੋ।",

    totalSales: "ਕੁੱਲ ਵਿਕਰੀ",
    comparedLastMonth: "ਪਿਛਲੇ ਮਹੀਨੇ ਦੇ ਮੁਕਾਬਲੇ",

    activeOrders: "ਸਰਗਰਮ ਆਰਡਰ",
    readyForDispatch: "ਡਿਸਪੈਚ ਲਈ 4 ਤਿਆਰ",

    produceListed: "ਸੂਚੀਬੱਧ ਉਪਜ",
    availableForBuyers: "ਖਰੀਦਦਾਰਾਂ ਲਈ ਉਪਲਬਧ",

    avgPrice: "ਔਸਤ ਕੀਮਤ",
    betterThanMandi: "ਮੰਡੀ ਨਾਲੋਂ ਬਿਹਤਰ",

    aiMarketIntelligence: "AI ਮਾਰਕੀਟ ਜਾਣਕਾਰੀ",
    demandForecast: "ਮੰਗ ਪੂਰਵ ਅਨੁਮਾਨ",
    liveDemo: "• ਲਾਈਵ ਡੈਮੋ",
    expectedDemandGrowth: "ਅਨੁਮਾਨਿਤ ਮੰਗ ਵਾਧਾ",
    highDemand: "ਉੱਚ ਮੰਗ ↑",

    aiRecommendation: "AI ਸੁਝਾਅ",
    tomatoRecommendation:
        "ਅਗਲੇ 14 ਦਿਨਾਂ ਵਿੱਚ ਟਮਾਟਰ ਦੀ ਮੰਗ ਵਧ ਸਕਦੀ ਹੈ। ਸਪਲਾਈ ਵਿੱਚ 15% ਵਾਧਾ ਕਰਨ ਬਾਰੇ ਸੋਚੋ।",

    quickActions: "ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ",
    manageFarm: "ਖੇਤ ਪ੍ਰਬੰਧਨ",

    listProduce: "ਉਪਜ ਸੂਚੀਬੱਧ ਕਰੋ",
    sellYourCrops: "ਆਪਣੀਆਂ ਫਸਲਾਂ ਵੇਚੋ",

    viewOrders: "ਆਰਡਰ ਵੇਖੋ",
    manageOrders: "ਆਰਡਰ ਪ੍ਰਬੰਧਿਤ ਕਰੋ",

    trackDelivery: "ਡਿਲਿਵਰੀ ਟ੍ਰੈਕ ਕਰੋ",
    viewShipments: "ਸ਼ਿਪਮੈਂਟ ਵੇਖੋ",

    aiInsights: "AI ਜਾਣਕਾਰੀ",
    marketPredictions: "ਬਾਜ਼ਾਰ ਪੂਰਵ ਅਨੁਮਾਨ",

    recentActivity: "ਹਾਲੀਆ ਗਤੀਵਿਧੀ",
    recentOrders: "ਹਾਲੀਆ ਆਰਡਰ",
    viewAll: "ਸਭ ਵੇਖੋ →",

    inTransit: "ਰਸਤੇ ਵਿੱਚ",
    delivered: "ਡਿਲਿਵਰ ਕੀਤਾ ਗਿਆ",
    processing: "ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ",

    farmerAccount: "ਕਿਸਾਨ ਖਾਤਾ",

    market: "ਬਾਜ਼ਾਰ",
    todaysPrices: "ਅੱਜ ਦੀਆਂ ਕੀਮਤਾਂ",

    salesManagement: "ਵਿਕਰੀ ਪ੍ਰਬੰਧਨ",
    ordersReceived: "ਪ੍ਰਾਪਤ ਆਰਡਰ 📦",
    manageBuyerOrders:
        "ਖਰੀਦਦਾਰਾਂ ਵੱਲੋਂ ਦਿੱਤੇ ਆਰਡਰ ਵੇਖੋ ਅਤੇ ਪ੍ਰਬੰਧਿਤ ਕਰੋ।",

    totalOrders: "ਕੁੱਲ ਆਰਡਰ",
    pending: "ਲੰਬਿਤ",
    completed: "ਪੂਰਾ ਹੋਇਆ",
    totalSales: "ਕੁੱਲ ਵਿਕਰੀ",

    recentOrders: "ਹਾਲੀਆ ਆਰਡਰ",
    buyerOrders: "ਖਰੀਦਦਾਰਾਂ ਦੇ ਆਰਡਰ",
    noOrdersYet: "ਹਾਲੇ ਕੋਈ ਆਰਡਰ ਨਹੀਂ",
    buyerOrdersAppearHere:
        "ਖਰੀਦਦਾਰਾਂ ਵੱਲੋਂ ਦਿੱਤੇ ਆਰਡਰ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ।",

    // AI INSIGHTS PAGE

    artificialIntelligence: "ਕ੍ਰਿਤ੍ਰਿਮ ਬੁੱਧੀ",
    aiFarmingIntelligence: "AI ਖੇਤੀਬਾੜੀ ਬੁੱਧੀ",
    aiDescription:
        "ਸਮਾਰਟ ਬਾਜ਼ਾਰ ਪੂਰਵ ਅਨੁਮਾਨਾਂ ਰਾਹੀਂ ਫੈਸਲਾ ਕਰੋ ਕਿ ਕੀ ਉਗਾਉਣਾ ਹੈ, ਕਦੋਂ ਵੇਚਣਾ ਹੈ ਅਤੇ ਕਿੰਨਾ ਸਟਾਕ ਰੱਖਣਾ ਹੈ।",

    aiActive: "AI ਸਰਗਰਮ",

    analyseYourCrop: "ਆਪਣੀ ਫਸਲ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    selectCropForInsights:
        "AI ਜਾਣਕਾਰੀ ਦੇਖਣ ਲਈ ਫਸਲ ਚੁਣੋ",

    crop: "ਫਸਲ",
    tomato: "ਟਮਾਟਰ",
    potato: "ਆਲੂ",
    onion: "ਪਿਆਜ਼",
    rice: "ਚੌਲ",

    gradeA: "ਗ੍ਰੇਡ A",
    fresh: "ਤਾਜ਼ਾ",
    premium: "ਪ੍ਰੀਮੀਅਮ",

    expectedDemand: "ਅਨੁਮਾਨਿਤ ਮੰਗ",
    next14Days: "ਅਗਲੇ 14 ਦਿਨ",

    priceTrend: "ਕੀਮਤ ਦਾ ਰੁਝਾਨ",
    rising: "ਵੱਧ ਰਹੀ ਹੈ",
    highConfidence: "ਉੱਚ ਭਰੋਸੇਯੋਗਤਾ",

    bestOpportunity: "ਸਭ ਤੋਂ ਵਧੀਆ ਮੌਕਾ",
    highDemandCrop: "ਉੱਚ ਮੰਗ ਵਾਲੀ ਫਸਲ",

    supply: "ਸਪਲਾਈ",
    marketOutlook: "ਬਾਜ਼ਾਰ ਦਾ ਅਨੁਮਾਨ",

    // AI INSIGHTS - REMAINING

    forecastPeriod: "ਪੂਰਵ ਅਨੁਮਾਨ ਮਿਆਦ",
    days14: "14 ਦਿਨ",
    confidence: "ਭਰੋਸੇਯੋਗਤਾ",

    aiMarketIntelligenceTitle: "AI ਮਾਰਕੀਟ ਇੰਟੈਲੀਜੈਂਸ",
    demandForecastTitle: "ਮੰਗ ਪੂਰਵ ਅਨੁਮਾਨ",

    aiPredictionDescription:
        "ਇਤਿਹਾਸਕ ਬਾਜ਼ਾਰ ਰੁਝਾਨਾਂ, ਖਰੀਦਦਾਰਾਂ ਦੀ ਗਤੀਵਿਧੀ ਅਤੇ ਮੌਸਮੀ ਪੈਟਰਨਾਂ ਦੇ ਸਿਮੂਲੇਸ਼ਨ ਦੇ ਆਧਾਰ 'ਤੇ AI ਪੂਰਵ ਅਨੁਮਾਨ।",

    expectedDemandGrowth: "ਅਨੁਮਾਨਿਤ ਮੰਗ ਵਾਧਾ",
    highDemand: "ਉੱਚ ਮੰਗ",

    now: "ਹੁਣ",
    days7: "7 ਦਿਨ",

    aiQuickInsight: "AI ਤੁਰੰਤ ਜਾਣਕਾਰੀ",

    tomatoDemandInsight:
        "ਅਗਲੇ 14 ਦਿਨਾਂ ਵਿੱਚ ਟਮਾਟਰ ਦੀ ਮੰਗ ਵਧਣ ਦੀ ਉਮੀਦ ਹੈ।",

    considerIncreasingSupply:
        "ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ 'ਤੇ ਨਜ਼ਰ ਰੱਖਦੇ ਹੋਏ ਸਪਲਾਈ ਵਧਾਉਣ ਬਾਰੇ ਸੋਚੋ।",

    aiConfidence: "AI ਭਰੋਸੇਯੋਗਤਾ",
    predictionConfidence: "ਪੂਰਵ ਅਨੁਮਾਨ ਦੀ ਭਰੋਸੇਯੋਗਤਾ",

    basedOnMarketData:
        "ਇਤਿਹਾਸਕ ਬਾਜ਼ਾਰ ਰੁਝਾਨਾਂ, ਖਰੀਦਦਾਰਾਂ ਦੀ ਗਤੀਵਿਧੀ ਅਤੇ ਮੌਸਮੀ ਮੰਗ ਦੇ ਪੈਟਰਨਾਂ ਦੇ ਸਿਮੂਲੇਸ਼ਨ 'ਤੇ ਆਧਾਰਿਤ।",

    priceTrend: "ਕੀਮਤ ਦਾ ਰੁਝਾਨ",
    rising: "↑ ਵੱਧ ਰਹੀ ਹੈ",
    highConfidence: "ਉੱਚ ਭਰੋਸੇਯੋਗਤਾ",

    bestOpportunity: "ਸਭ ਤੋਂ ਵਧੀਆ ਮੌਕਾ",
    highDemandCrop: "ਉੱਚ ਮੰਗ ਵਾਲੀ ਫਸਲ",
    recommendedSupply: "ਸਿਫਾਰਸ਼ ਕੀਤੀ ਸਪਲਾਈ",
    suggestedIncrease: "ਸੁਝਾਇਆ ਗਿਆ ਵਾਧਾ",

    // AI INSIGHTS - REMAINING

    forecastPeriod: "ਪੂਰਵ ਅਨੁਮਾਨ ਮਿਆਦ",
    days14: "14 ਦਿਨ",
    confidence: "ਭਰੋਸੇਯੋਗਤਾ",

    aiMarketIntelligenceTitle: "AI ਮਾਰਕੀਟ ਇੰਟੈਲੀਜੈਂਸ",
    demandForecastTitle: "ਮੰਗ ਪੂਰਵ ਅਨੁਮਾਨ",

    aiPredictionDescription:
        "ਇਤਿਹਾਸਕ ਬਾਜ਼ਾਰ ਰੁਝਾਨਾਂ, ਖਰੀਦਦਾਰਾਂ ਦੀ ਗਤੀਵਿਧੀ ਅਤੇ ਮੌਸਮੀ ਪੈਟਰਨਾਂ ਦੇ ਸਿਮੂਲੇਸ਼ਨ ਦੇ ਆਧਾਰ 'ਤੇ AI ਪੂਰਵ ਅਨੁਮਾਨ।",

    expectedDemandGrowth: "ਅਨੁਮਾਨਿਤ ਮੰਗ ਵਾਧਾ",
    highDemand: "ਉੱਚ ਮੰਗ",

    now: "ਹੁਣ",
    days7: "7 ਦਿਨ",

    aiQuickInsight: "AI ਤੁਰੰਤ ਜਾਣਕਾਰੀ",

    tomatoDemandInsight:
        "ਅਗਲੇ 14 ਦਿਨਾਂ ਵਿੱਚ ਟਮਾਟਰ ਦੀ ਮੰਗ ਵਧਣ ਦੀ ਉਮੀਦ ਹੈ।",

    considerIncreasingSupply:
        "ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ 'ਤੇ ਨਜ਼ਰ ਰੱਖਦੇ ਹੋਏ ਸਪਲਾਈ ਵਧਾਉਣ ਬਾਰੇ ਸੋਚੋ।",

    aiConfidence: "AI ਭਰੋਸੇਯੋਗਤਾ",
    predictionConfidence: "ਪੂਰਵ ਅਨੁਮਾਨ ਦੀ ਭਰੋਸੇਯੋਗਤਾ",

    basedOnMarketData:
        "ਇਤਿਹਾਸਕ ਬਾਜ਼ਾਰ ਰੁਝਾਨਾਂ, ਖਰੀਦਦਾਰਾਂ ਦੀ ਗਤੀਵਿਧੀ ਅਤੇ ਮੌਸਮੀ ਮੰਗ ਦੇ ਪੈਟਰਨਾਂ ਦੇ ਸਿਮੂਲੇਸ਼ਨ 'ਤੇ ਆਧਾਰਿਤ।",

    aiRecommendations: "AI ਸੁਝਾਅ",
    whatShouldYouDo: "ਤੁਹਾਨੂੰ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ? 💡",
    actionableSuggestions:
        "ਮੌਜੂਦਾ ਬਾਜ਼ਾਰ ਸਥਿਤੀਆਂ ਦੇ ਆਧਾਰ 'ਤੇ ਸੁਝਾਅ।",

    high: "ਉੱਚ",
    medium: "ਦਰਮਿਆਨਾ",

    increaseTomatoSupply: "ਟਮਾਟਰ ਦੀ ਸਪਲਾਈ ਵਧਾਓ",
    tomatoDemandIncrease:
        "ਅਗਲੇ 14 ਦਿਨਾਂ ਵਿੱਚ ਟਮਾਟਰ ਦੀ ਮੰਗ ਵਧਣ ਦਾ ਅਨੁਮਾਨ ਹੈ।",
    recommended: "ਸਿਫਾਰਸ਼ੀ",

    monitorPrices: "ਕੀਮਤਾਂ 'ਤੇ ਨਜ਼ਰ ਰੱਖੋ",
    marketPricesUpward:
        "ਉੱਚ ਮੰਗ ਵਾਲੀਆਂ ਫਸਲਾਂ ਦੀਆਂ ਬਾਜ਼ਾਰ ਕੀਮਤਾਂ ਵਿੱਚ ਵਾਧੇ ਦਾ ਰੁਝਾਨ ਦਿਖਾਈ ਦੇ ਰਿਹਾ ਹੈ।",
    opportunity: "ਮੌਕਾ",

    trackMarketPrices: "ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ ਟ੍ਰੈਕ ਕਰੋ →",

    planInventory: "ਇਨਵੈਂਟਰੀ ਦੀ ਯੋਜਨਾ ਬਣਾਓ",
    maintainSufficientStock:
        "ਆਉਣ ਵਾਲੀ ਖਰੀਦਦਾਰਾਂ ਦੀ ਮੰਗ ਪੂਰੀ ਕਰਨ ਲਈ ਕਾਫ਼ੀ ਸਟਾਕ ਰੱਖੋ।",
    priority: "ਤਰਜੀਹ",

    planInventoryButton: "ਇਨਵੈਂਟਰੀ ਦੀ ਯੋਜਨਾ ਬਣਾਓ →",
    viewSupplyPlan: "ਸਪਲਾਈ ਯੋਜਨਾ ਵੇਖੋ →",

    kisanAiAssistant: "ਕਿਸਾਨ AI ਸਹਾਇਕ",
    needHelpDeciding: "ਫੈਸਲਾ ਕਰਨ ਵਿੱਚ ਮਦਦ ਚਾਹੀਦੀ ਹੈ?",
    askKisanAiDescription:
        "ਫਸਲਾਂ, ਕੀਮਤਾਂ, ਮੰਗ ਜਾਂ ਆਪਣੇ ਅਗਲੇ ਖੇਤੀਬਾੜੀ ਫੈਸਲੇ ਬਾਰੇ KisanAI ਤੋਂ ਪੁੱਛੋ।",
    askKisanAI: "KisanAI ਤੋਂ ਪੁੱਛੋ",

    explainableAI: "ਵਿਆਖਿਆਯੋਗ AI",
    whyThisPrediction: "ਇਹ ਪੂਰਵ ਅਨੁਮਾਨ ਕਿਉਂ? 🧠",
    understandSignals:
        "AI ਸੁਝਾਅ ਦੇ ਪਿੱਛੇ ਦੇ ਸੰਕੇਤਾਂ ਨੂੰ ਸਮਝੋ।",
    viewReasoning: "ਕਾਰਨ ਵੇਖੋ",

    buyerActivityIncreased: "ਖਰੀਦਦਾਰਾਂ ਦੀ ਗਤੀਵਿਧੀ ਵਧੀ",
    buyerActivityDescription:
        "ਸਿਮੂਲੇਟ ਕੀਤੀ ਖਰੀਦਦਾਰ ਗਤੀਵਿਧੀ ਸਕਾਰਾਤਮਕ ਮੰਗ ਦਾ ਸੰਕੇਤ ਦਿਖਾਉਂਦੀ ਹੈ।",

    historicalDemandRising: "ਇਤਿਹਾਸਕ ਮੰਗ ਵੱਧ ਰਹੀ ਹੈ",
    historicalDemandDescription:
        "ਪਿਛਲੇ ਬਾਜ਼ਾਰ ਪੈਟਰਨ ਟਮਾਟਰ ਦੀ ਵਧਦੀ ਮੰਗ ਦਾ ਸੰਕੇਤ ਦਿੰਦੇ ਹਨ।",

    marketPricesFavorable: "ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ ਅਨੁਕੂਲ ਹਨ",
    marketPricesDescription:
        "ਮੌਜੂਦਾ ਸਿਮੂਲੇਟ ਕੀਤੀਆਂ ਕੀਮਤਾਂ ਵਿਕਰੀ ਲਈ ਸਕਾਰਾਤਮਕ ਮੌਕੇ ਦਿਖਾਉਂਦੀਆਂ ਹਨ।",

    seasonalPatternDetected: "ਮੌਸਮੀ ਪੈਟਰਨ ਦਾ ਪਤਾ ਲੱਗਾ",
    seasonalPatternDescription:
        "ਇਤਿਹਾਸਕ ਡਾਟਾ ਵਿੱਚ ਇਸੇ ਤਰ੍ਹਾਂ ਦੇ ਮੌਸਮੀ ਮੰਗ ਪੈਟਰਨ ਦੇਖੇ ਗਏ ਹਨ।",

    aiPrototypeMode: "AI ਪ੍ਰੋਟੋਟਾਈਪ ਮੋਡ",
    simulatedDataNotice:
        "ਇਹ ਪੂਰਵ ਅਨੁਮਾਨ ਇਸ ਸਮੇਂ KisanDirect SIH ਪ੍ਰੋਟੋਟਾਈਪ ਲਈ ਸਿਮੂਲੇਟ ਕੀਤੇ ਡਾਟਾ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ।",
    analysisReady: "● ਵਿਸ਼ਲੇਸ਼ਣ ਤਿਆਰ",

    farmManagement: "ਖੇਤੀਬਾੜੀ ਪ੍ਰਬੰਧਨ",
    myProduce: "ਮੇਰੀ ਉਪਜ 🌾",
    manageCrops:
        "ਆਪਣੀਆਂ ਫਸਲਾਂ, ਕੀਮਤਾਂ ਅਤੇ ਉਪਲਬਧ ਸਟਾਕ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ।",
    addProduce: "+ ਉਪਜ ਸ਼ਾਮਲ ਕਰੋ",
    totalListings: "ਕੁੱਲ ਲਿਸਟਿੰਗ",
    activeProduceListings: "ਸਰਗਰਮ ਉਪਜ ਲਿਸਟਿੰਗ",
    totalStock: "ਕੁੱਲ ਸਟਾਕ",
    availableForBuyers: "ਖਰੀਦਦਾਰਾਂ ਲਈ ਉਪਲਬਧ",
    todaysSales: "ਅੱਜ ਦੀ ਵਿਕਰੀ",
    fromDirectBuyers: "ਸਿੱਧੇ ਖਰੀਦਦਾਰਾਂ ਤੋਂ",
    averagePrice: "ਔਸਤ ਕੀਮਤ",
    perKilogram: "ਪ੍ਰਤੀ ਕਿਲੋਗ੍ਰਾਮ",
    inventory: "ਇਨਵੈਂਟਰੀ",
    yourProduce: "ਤੁਹਾਡੀ ਉਪਜ",
    produce: "ਉਪਜ",
    quantity: "ਮਾਤਰਾ",
    price: "ਕੀਮਤ",
    status: "ਸਥਿਤੀ",
    action: "ਕਾਰਵਾਈ",
    freshTomato: "ਤਾਜ਼ੇ ਟਮਾਟਰ",
    gradeARanchi: "ਗ੍ਰੇਡ A • ਰਾਂਚੀ",
    active: "ਸਰਗਰਮ",
    edit: "ਸੰਪਾਦਿਤ ਕਰੋ",
    premiumRice: "ਪ੍ਰੀਮੀਅਮ ਚੌਲ",
    premiumPotato: "ਪ੍ਰੀਮੀਅਮ ਆਲੂ",

    // Earnings & Payments

    financialManagement: "ਵਿੱਤੀ ਪ੍ਰਬੰਧਨ",
    earningsPayments: "ਕਮਾਈ ਅਤੇ ਭੁਗਤਾਨ 💰",
    trackFarmIncome:
        "ਆਪਣੀ ਖੇਤੀਬਾੜੀ ਆਮਦਨ, ਭੁਗਤਾਨ ਅਤੇ ਵਿੱਤੀ ਪ੍ਰਦਰਸ਼ਨ ਨੂੰ ਟ੍ਰੈਕ ਕਰੋ।",

    totalEarnings: "ਕੁੱਲ ਕਮਾਈ",
    lifetimeFarmEarnings: "ਹੁਣ ਤੱਕ ਦੀ ਕੁੱਲ ਖੇਤੀਬਾੜੀ ਕਮਾਈ",

    thisMonth: "ਇਸ ਮਹੀਨੇ",
    earningsInAugust: "ਅਗਸਤ ਦੀ ਕਮਾਈ",

    twoPayments: "2 ਭੁਗਤਾਨ",
    pendingPayments: "ਲੰਬਿਤ ਭੁਗਤਾਨ",
    awaitingBuyerPayment: "ਖਰੀਦਦਾਰ ਦੇ ਭੁਗਤਾਨ ਦੀ ਉਡੀਕ",

    available: "ਉਪਲਬਧ",
    availableBalance: "ਉਪਲਬਧ ਬਕਾਇਆ",
    readyForWithdrawal: "ਕਢਵਾਉਣ ਲਈ ਤਿਆਰ",

    earningsOverview: "ਕਮਾਈ ਦਾ ਵੇਰਵਾ",
    monthlyEarnings: "ਮਹੀਨਾਵਾਰ ਕਮਾਈ",

    cropPerformance: "ਫਸਲ ਪ੍ਰਦਰਸ਼ਨ",
    earningsByCrop: "ਫਸਲ ਅਨੁਸਾਰ ਕਮਾਈ",

    tomatoEarningsPercent: "ਕਮਾਈ ਦਾ 38%",
    riceEarningsPercent: "ਕਮਾਈ ਦਾ 34%",
    potatoEarningsPercent: "ਕਮਾਈ ਦਾ 28%",

    paymentActivity: "ਭੁਗਤਾਨ ਗਤੀਵਿਧੀ",
    recentTransactions: "ਹਾਲੀਆ ਲੈਣ-ਦੇਣ",

    paid: "ਭੁਗਤਾਨ ਕੀਤਾ ਗਿਆ",

    paymentAccount: "ਭੁਗਤਾਨ ਖਾਤਾ",
    settlementInformation: "ਭੁਗਤਾਨ ਨਿਪਟਾਰਾ ਜਾਣਕਾਰੀ",

    nextSettlement: "ਅਗਲਾ ਨਿਪਟਾਰਾ",
    pendingAmount: "ਲੰਬਿਤ ਰਕਮ",
    paymentMethod: "ਭੁਗਤਾਨ ਦਾ ਤਰੀਕਾ",
    bankTransfer: "ਬੈਂਕ ਟ੍ਰਾਂਸਫਰ",

    viewPaymentDetails: "💰 ਭੁਗਤਾਨ ਵੇਰਵੇ ਵੇਖੋ",

    // BUYER DASHBOARD

    buyerAccount: "ਖਰੀਦਦਾਰ ਖਾਤਾ",

    myOrders: "ਮੇਰੇ ਆਰਡਰ",
    deliveries: "ਡਿਲਿਵਰੀ",
    payments: "ਭੁਗਤਾਨ",

    buyerPortal: "ਖਰੀਦਦਾਰ ਪੋਰਟਲ",
    welcomeBack: "ਵਾਪਸ ਜੀ ਆਇਆਂ ਨੂੰ,",
    buyerDashboardDescription:
        "ਕਿਸਾਨਾਂ ਅਤੇ FPOs ਤੋਂ ਸਿੱਧੇ ਤਾਜ਼ੀ ਉਪਜ ਪ੍ਰਾਪਤ ਕਰੋ।",

    totalPurchases: "ਕੁੱਲ ਖਰੀਦਦਾਰੀ",
    thisMonth: "ਇਸ ਮਹੀਨੇ",

    threeActive: "3 ਸਰਗਰਮ",
    activeOrders: "ਸਰਗਰਮ ਆਰਡਰ",
    ordersInProgress: "ਆਰਡਰ ਪ੍ਰਗਤੀ ਵਿੱਚ ਹਨ",

    fourNew: "+4 ਨਵੇਂ",
    savedFarmers: "ਸੇਵ ਕੀਤੇ ਕਿਸਾਨ",
    trustedSuppliers: "ਭਰੋਸੇਯੋਗ ਸਪਲਾਇਰ",

    onTime: "ਸਮੇਂ 'ਤੇ",
    deliveries: "ਡਿਲਿਵਰੀ",
    deliverySuccessRate: "ਡਿਲਿਵਰੀ ਸਫਲਤਾ ਦਰ",

    recommendedProduce: "ਸਿਫਾਰਸ਼ ਕੀਤੀ ਉਪਜ",
    viewMarketplace: "ਮਾਰਕੀਟਪਲੇਸ ਵੇਖੋ →",
    buy: "ਖਰੀਦੋ",

    kgAvailable800: "800 ਕਿਲੋ ਉਪਲਬਧ",
    kgAvailable1200: "1,200 ਕਿਲੋ ਉਪਲਬਧ",
    kgAvailable650: "650 ਕਿਲੋ ਉਪਲਬਧ",

    smartBuying: "ਸਮਾਰਟ ਖਰੀਦਦਾਰੀ",
    tomatoDemandExpected:
        "ਅਗਲੇ 14 ਦਿਨਾਂ ਵਿੱਚ ਟਮਾਟਰ ਦੀ ਮੰਗ ਵਧਣ ਦੀ ਉਮੀਦ ਹੈ।",

    purchaseTomatoEarly:
        "ਸੰਭਾਵਿਤ ਕੀਮਤ ਵਾਧੇ ਤੋਂ ਬਚਣ ਲਈ ਟਮਾਟਰ ਦਾ ਸਟਾਕ ਪਹਿਲਾਂ ਖਰੀਦਣ ਬਾਰੇ ਸੋਚੋ।",

    viewAIInsights: "AI ਜਾਣਕਾਰੀ ਵੇਖੋ →",

    yourActivity: "ਤੁਹਾਡੀ ਗਤੀਵਿਧੀ",

    inTransit: "ਰਸਤੇ ਵਿੱਚ",
    delivered: "ਡਿਲਿਵਰ ਕੀਤਾ ਗਿਆ",
    processing: "ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ",

    activeDelivery: "ਸਰਗਰਮ ਡਿਲਿਵਰੀ",
    you: "ਤੁਸੀਂ",
    estimatedArrival: "ਅਨੁਮਾਨਿਤ ਪਹੁੰਚ",
    distance: "ਦੂਰੀ",
    trackDelivery: "🚚 ਡਿਲਿਵਰੀ ਟ੍ਰੈਕ ਕਰੋ",

    farmerNetwork: "ਕਿਸਾਨ ਨੈੱਟਵਰਕ",
    farmersTitle: "ਕਿਸਾਨ 👨‍🌾",
    farmerNetworkDescription:
        "ਭਰੋਸੇਯੋਗ ਸਥਾਨਕ ਕਿਸਾਨਾਂ ਨੂੰ ਲੱਭੋ ਅਤੇ ਉਨ੍ਹਾਂ ਨਾਲ ਜੁੜੋ।",

    availableFarmers: "ਉਪਲਬਧ ਕਿਸਾਨ",
    verifiedFarmers: "ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨ",
    yourTrustedSuppliers: "ਤੁਹਾਡੇ ਭਰੋਸੇਯੋਗ ਸਪਲਾਇਰ",
    nearbyFarmers: "ਨੇੜਲੇ ਕਿਸਾਨ",
    withinYourRegion: "ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ",

    fpos: "FPOs",
    farmerOrganizations: "ਕਿਸਾਨ ਸੰਗਠਨ",

    localFarmers: "ਸਥਾਨਕ ਕਿਸਾਨ",
    trustedFarmers: "ਭਰੋਸੇਯੋਗ ਕਿਸਾਨ 👨‍🌾",
    verifiedFarmersDirectPurchase:
        "ਸਿੱਧੀ ਖਰੀਦ ਲਈ ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨ ਉਪਲਬਧ ਹਨ",

    verifiedNetwork: "✓ ਪ੍ਰਮਾਣਿਤ ਨੈੱਟਵਰਕ",

    view: "ਵੇਖੋ",

    purchaseManagement: "ਖਰੀਦ ਪ੍ਰਬੰਧਨ",
    trackManagePurchases:
        "ਸਥਾਨਕ ਕਿਸਾਨਾਂ ਤੋਂ ਕੀਤੀਆਂ ਸਾਰੀਆਂ ਖਰੀਦਦਾਰੀਆਂ ਨੂੰ ਟ੍ਰੈਕ ਅਤੇ ਪ੍ਰਬੰਧਿਤ ਕਰੋ।",

    farmerDirect: "🌱 ਕਿਸਾਨ ਤੋਂ ਸਿੱਧੀ ਖਰੀਦ",
    secureOrders: "🔒 ਸੁਰੱਖਿਅਤ ਆਰਡਰ",
    trackable: "🚚 ਟ੍ਰੈਕ ਕਰਨ ਯੋਗ",

    orderHub: "ਆਰਡਰ ਹੱਬ",
    allPurchasesOnePlace: "ਸਾਰੀਆਂ ਖਰੀਦਦਾਰੀਆਂ ਇੱਕੋ ਥਾਂ 'ਤੇ",

    orderHistory: "ਆਰਡਰ ਇਤਿਹਾਸ",
    yourOrders: "ਤੁਹਾਡੇ ਆਰਡਰ",
    noOrdersYet: "ਹਾਲੇ ਕੋਈ ਆਰਡਰ ਨਹੀਂ",
    placedOrdersAppearHere:
        "ਤੁਹਾਡੇ ਵੱਲੋਂ ਦਿੱਤੇ ਆਰਡਰ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ।",

    footerDescription:
        "ਇੱਕ ਸਮਾਰਟ ਅਤੇ ਨਿਆਂਪੂਰਨ ਖੇਤੀਬਾੜੀ ਮਾਰਕੀਟਪਲੇਸ ਬਣਾਉਣਾ।",
    footerCopyright:
        "© 2026 KisanDirect • SIH ਪ੍ਰੋਟੋਟਾਈਪ",

    // LOGIN

    loginToContinue:
        "KisanDirect 'ਤੇ ਜਾਰੀ ਰੱਖਣ ਲਈ ਲੌਗਇਨ ਕਰੋ",
    mobileNumber: "ਮੋਬਾਈਲ ਨੰਬਰ",
    password: "ਪਾਸਵਰਡ",
    rememberMe: "ਮੈਨੂੰ ਯਾਦ ਰੱਖੋ",
    forgotPassword: "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
    loginButton: "ਲੌਗਇਨ →",

    newToKisanDirect: "KisanDirect 'ਤੇ ਨਵੇਂ ਹੋ?",
    createAccount: "ਖਾਤਾ ਬਣਾਓ",

    prototypeDemo: "ਪ੍ਰੋਟੋਟਾਈਪ ਡੈਮੋ",
    localAccountLogin:
        "ਤੁਸੀਂ ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਖਾਤਾ ਬਣਾ ਸਕਦੇ ਹੋ ਅਤੇ ਲੌਗਇਨ ਕਰ ਸਕਦੇ ਹੋ।",

    back: "← ਵਾਪਸ",
    joinKisanDirect: "KisanDirect ਨਾਲ ਜੁੜੋ",
    howUsePlatform:
        "ਤੁਸੀਂ ਪਲੇਟਫਾਰਮ ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",

    farmerFpoAccount: "ਮੈਂ ਕਿਸਾਨ / FPO ਹਾਂ",
    farmerAccountDescription:
        "ਸਿੱਧੀ ਉਪਜ ਵੇਚੋ, ਆਰਡਰ ਪ੍ਰਾਪਤ ਕਰੋ ਅਤੇ AI ਮਾਰਕੀਟ ਜਾਣਕਾਰੀ ਦੀ ਵਰਤੋਂ ਕਰੋ।",

    buyerAccountOption: "ਮੈਂ ਖਰੀਦਦਾਰ ਹਾਂ",
    buyerAccountDescription:
        "ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨਾਂ ਅਤੇ FPOs ਤੋਂ ਸਿੱਧੀ ਤਾਜ਼ੀ ਉਪਜ ਖਰੀਦੋ।",

    createFarmerAccount: "ਕਿਸਾਨ ਖਾਤਾ ਬਣਾਓ",
    startSellingDirectly:
        "KisanDirect ਰਾਹੀਂ ਸਿੱਧਾ ਵੇਚਣਾ ਸ਼ੁਰੂ ਕਰੋ",

    fullName: "ਪੂਰਾ ਨਾਮ",
    villageCity: "ਪਿੰਡ / ਸ਼ਹਿਰ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    state: "ਰਾਜ",
    primaryCrop: "ਮੁੱਖ ਫਸਲ",
    createPassword: "ਪਾਸਵਰਡ ਬਣਾਓ",
    createFarmerAccountButton:
        "ਕਿਸਾਨ ਖਾਤਾ ਬਣਾਓ →",

    createBuyerAccount: "ਖਰੀਦਦਾਰ ਖਾਤਾ ਬਣਾਓ",
    sourceDirectlyFromFarmers:
        "ਕਿਸਾਨਾਂ ਤੋਂ ਸਿੱਧੀ ਉਪਜ ਪ੍ਰਾਪਤ ਕਰੋ",
    nameBusinessName: "ਨਾਮ / ਕਾਰੋਬਾਰ ਦਾ ਨਾਮ",
    buyerType: "ਖਰੀਦਦਾਰ ਦੀ ਕਿਸਮ",
    location: "ਸਥਾਨ",
    createBuyerAccountButton:
        "ਖਰੀਦਦਾਰ ਖਾਤਾ ਬਣਾਓ →",

    accountCreated: "ਖਾਤਾ ਬਣ ਗਿਆ!",
    accountCreatedSuccessfully:
        "ਤੁਹਾਡਾ KisanDirect ਖਾਤਾ ਸਫਲਤਾਪੂਰਵਕ ਬਣਾਇਆ ਗਿਆ ਹੈ।",
    continueToLogin: "ਲੌਗਇਨ ਕਰਨ ਲਈ ਜਾਰੀ ਰੱਖੋ →",

    // ADD PRODUCE

    farmManagement: "ਖੇਤੀਬਾੜੀ ਪ੍ਰਬੰਧਨ",
    addNewProduce: "ਨਵੀਂ ਉਪਜ ਸ਼ਾਮਲ ਕਰੋ 🌾",
    listFreshProduce:
        "ਖਪਤਕਾਰਾਂ ਅਤੇ ਥੋਕ ਖਰੀਦਦਾਰਾਂ ਲਈ ਆਪਣੀ ਤਾਜ਼ੀ ਉਪਜ ਸਿੱਧੀ ਸੂਚੀਬੱਧ ਕਰੋ।",

    produceName: "ਉਪਜ ਦਾ ਨਾਮ",
    category: "ਸ਼੍ਰੇਣੀ",
    qualityGrade: "ਗੁਣਵੱਤਾ ਗ੍ਰੇਡ",
    quantityAvailable: "ਉਪਲਬਧ ਮਾਤਰਾ",
    unit: "ਇਕਾਈ",
    pricePerKg: "ਪ੍ਰਤੀ ਕਿਲੋਗ੍ਰਾਮ ਕੀਮਤ",
    farmPickupLocation: "ਖੇਤ / ਪਿਕਅੱਪ ਸਥਾਨ",
    availableFrom: "ਉਪਲਬਧਤਾ ਸ਼ੁਰੂ",
    cancel: "ਰੱਦ ਕਰੋ",
    listProduce: "🌾 ਉਪਜ ਸੂਚੀਬੱਧ ਕਰੋ",

    // KISAN AI

    kisanDirectAIAssistant: "KISANDIRECT AI ਸਹਾਇਕ",
    kisanAIAnalysis: "KisanAI ਵਿਸ਼ਲੇਸ਼ਣ",
    smartGuidance:
        "ਮੌਜੂਦਾ ਫਸਲ ਜਾਣਕਾਰੀ ਦੇ ਆਧਾਰ 'ਤੇ ਸਮਾਰਟ ਮਾਰਗਦਰਸ਼ਨ।",
    selectedCrop: "ਚੁਣੀ ਗਈ ਫਸਲ",
    supply: "📦 ਸਪਲਾਈ",
    maintainSupplyMonitorMarket:
        "ਮੌਜੂਦਾ ਸਪਲਾਈ ਪੱਧਰ ਬਣਾਈ ਰੱਖੋ ਅਤੇ ਬਾਜ਼ਾਰ ਦੀ ਸਥਿਤੀ 'ਤੇ ਨਜ਼ਰ ਰੱਖੋ।",
    gotIt: "ਸਮਝ ਗਿਆ ✓"
},

or: {
    home: "ହୋମ୍",
    marketplace: "ବଜାର",
    howItWorks: "ଏହା କିପରି କାମ କରେ",
    aiSolutions: "AI ସମାଧାନ",
    login: "ଲଗଇନ୍",
    joinNow: "ବର୍ତ୍ତମାନ ଯୋଗ ଦିଅନ୍ତୁ",

    badge: "AI-ଚାଳିତ କୃଷି ବଜାର",
    heroTitle1: "କ୍ଷେତରୁ",
    heroTitle2: "ସିଧା",
    heroTitle3: "ବଜାର ପର୍ଯ୍ୟନ୍ତ।",
    heroText:
        "KisanDirect କୃଷକ ଏବଂ FPOs ମାନଙ୍କୁ ସିଧାସଳଖ ଉପଭୋକ୍ତା ଏବଂ ଥୋକ କ୍ରେତାଙ୍କ ସହିତ ଯୋଡ଼ିଥାଏ, ଯାହାଦ୍ୱାରା କୃଷକମାନେ ଭଲ ମୂଲ୍ୟ ପାଇପାରନ୍ତି ଏବଂ ସପ୍ଲାଇ-ଚେନ୍ ସମସ୍ୟା କମିଥାଏ।",

    explore: "ବଜାର ଦେଖନ୍ତୁ",
    joinFarmer: "କୃଷକ ଭାବେ ଯୋଗ ଦିଅନ୍ତୁ",

    smartAgriculture: "ସ୍ମାର୍ଟ କୃଷି",
    smartText:
        "କୃଷକ, କ୍ରେତା ଏବଂ ଲଜିଷ୍ଟିକ୍ସକୁ ଗୋଟିଏ ପ୍ଲାଟଫର୍ମରେ ଯୋଡ଼ିବା।",

    aiMarket: "AI ମାର୍କେଟ୍ ଇଣ୍ଟେଲିଜେନ୍ସ",
    demand: "ଆଗାମୀ 14 ଦିନରେ ଅନୁମାନିତ ଚାହିଦା ବୃଦ୍ଧି",
    recommendation: "AI ପରାମର୍ଶ",

    farmers: "କୃଷକ",
    buyers: "କ୍ରେତା",
    states: "ରାଜ୍ୟ",
    farmerSales: "କୃଷକ ବିକ୍ରୟ",

    farmer: "କୃଷକ",
    buyer: "କ୍ରେତା",

    freshFromFarm: "କ୍ଷେତରୁ ତାଜା",
    farmerMarketplace: "କୃଷକ ବଜାର",
    marketText:
        "କୃଷକମାନଙ୍କଠାରୁ ସିଧାସଳଖ ତାଜା ଉତ୍ପାଦ ପାରଦର୍ଶୀ ମୂଲ୍ୟରେ କିଣନ୍ତୁ।",

    whyKisanDirect: "KisanDirect କାହିଁକି",
    smarterSupplyChain: "ଏକ ଉନ୍ନତ କୃଷି ସପ୍ଲାଇ ଚେନ୍।",

    directMarketplace: "ସିଧା ବଜାର",
    directMarketplaceText:
        "କୃଷକମାନଙ୍କୁ ସିଧାସଳଖ ଉପଭୋକ୍ତା ଏବଂ ଥୋକ କ୍ରେତାଙ୍କ ସହିତ ଯୋଡ଼ନ୍ତୁ।",

    aiDemandForecasting: "AI ଚାହିଦା ପୂର୍ବାନୁମାନ",
    aiDemandForecastingText:
        "ଆଗାମୀ ଚାହିଦାର ପୂର୍ବାନୁମାନ କରନ୍ତୁ ଏବଂ କୃଷକମାନଙ୍କୁ ଭଲ ବିକ୍ରୟ ନିଷ୍ପତ୍ତି ନେବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ।",

    smartLogistics: "ସ୍ମାର୍ଟ ଲଜିଷ୍ଟିକ୍ସ",
    smartLogisticsText:
        "ରୁଟ୍‌ଗୁଡ଼ିକୁ ଉନ୍ନତ କରନ୍ତୁ ଏବଂ ପରିବହନ ଖର୍ଚ୍ଚ କମାନ୍ତୁ।",

    betterPrices: "ଭଲ ମୂଲ୍ୟ",
    betterPricesText:
        "ଅନାବଶ୍ୟକ ମଧ୍ୟସ୍ଥଙ୍କୁ କମାନ୍ତୁ ଏବଂ କୃଷକଙ୍କ ଆୟ ବଢ଼ାନ୍ତୁ।",

    artificialIntelligence: "କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତା",

    predictOptimize: "ଚାହିଦାର ପୂର୍ବାନୁମାନ କରନ୍ତୁ। ଯୋଗାଣକୁ ଉନ୍ନତ କରନ୍ତୁ।",

    aiEngineText:
        "ଆମର AI ଇଞ୍ଜିନ୍ ବଜାରର ଧାରା, ଐତିହାସିକ ଚାହିଦା ଏବଂ କ୍ରେତାଙ୍କ କାର୍ଯ୍ୟକଳାପକୁ ବିଶ୍ଳେଷଣ କରି କୃଷକମାନଙ୍କୁ କ'ଣ ବିକ୍ରି କରିବା, କେବେ ବିକ୍ରି କରିବା ଏବଂ କେଉଁଠାକୁ ପଠାଇବା ନିଷ୍ପତ୍ତି ନେବାରେ ସାହାଯ୍ୟ କରେ।",

    exploreAIInsights: "AI ସୂଚନା ଦେଖନ୍ତୁ →",

    demandForecast: "ଚାହିଦା ପୂର୍ବାନୁମାନ",
    liveDemo: "● ଲାଇଭ୍ ଡେମୋ",
    expectedDemandGrowth: "ଅନୁମାନିତ ଚାହିଦା ବୃଦ୍ଧି",

    farmerAccount: "କୃଷକ ଖାତା",

    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    myProduce: "ମୋର ଉତ୍ପାଦ",
    orders: "ଅର୍ଡର",
    aiInsights: "AI ସୂଚନା",
    logistics: "ଲଜିଷ୍ଟିକ୍ସ",
    earnings: "ଆୟ",
    settings: "ସେଟିଂସ୍",
    logout: "ଲଗଆଉଟ୍",

    farmerPortal: "କୃଷକ ପୋର୍ଟାଲ୍",
    goodMorning: "ଶୁଭ ସକାଳ,",
    farmTodayMessage:
        "ଆଜି ଆପଣଙ୍କ କ୍ଷେତରେ କ'ଣ ଘଟୁଛି, ଏଠାରେ ଦେଖନ୍ତୁ।",

    totalSales: "ମୋଟ ବିକ୍ରୟ",
    comparedLastMonth: "ଗତ ମାସ ତୁଳନାରେ",

    activeOrders: "ସକ୍ରିୟ ଅର୍ଡର",
    readyForDispatch: "ଡିସ୍ପାଚ୍ ପାଇଁ 4ଟି ପ୍ରସ୍ତୁତ",

    produceListed: "ତାଲିକାଭୁକ୍ତ ଉତ୍ପାଦ",
    availableForBuyers: "କ୍ରେତାଙ୍କ ପାଇଁ ଉପଲବ୍ଧ",

    avgPrice: "ହାରାହାରି ମୂଲ୍ୟ",
    betterThanMandi: "ମଣ୍ଡି ଠାରୁ ଭଲ",

    aiMarketIntelligence: "AI ବଜାର ସୂଚନା",
    demandForecast: "ଚାହିଦା ପୂର୍ବାନୁମାନ",
    liveDemo: "• ଲାଇଭ୍ ଡେମୋ",
    expectedDemandGrowth: "ଅନୁମାନିତ ଚାହିଦା ବୃଦ୍ଧି",
    highDemand: "ଅଧିକ ଚାହିଦା ↑",

    aiRecommendation: "AI ପରାମର୍ଶ",
    tomatoRecommendation:
        "ଆଗାମୀ 14 ଦିନରେ ଟମାଟୋର ଚାହିଦା ବଢ଼ିପାରେ। ଯୋଗାଣରେ 15% ବୃଦ୍ଧି କରିବାକୁ ବିଚାର କରନ୍ତୁ।",

    quickActions: "ତୁରନ୍ତ କାର୍ଯ୍ୟ",
    manageFarm: "କ୍ଷେତ ପରିଚାଳନା",

    listProduce: "ଉତ୍ପାଦ ତାଲିକାଭୁକ୍ତ କରନ୍ତୁ",
    sellYourCrops: "ଆପଣଙ୍କ ଫସଲ ବିକ୍ରି କରନ୍ତୁ",

    viewOrders: "ଅର୍ଡର ଦେଖନ୍ତୁ",
    manageOrders: "ଅର୍ଡର ପରିଚାଳନା କରନ୍ତୁ",

    trackDelivery: "ଡେଲିଭରି ଟ୍ରାକ୍ କରନ୍ତୁ",
    viewShipments: "ଶିପମେଣ୍ଟ ଦେଖନ୍ତୁ",

    aiInsights: "AI ସୂଚନା",
    marketPredictions: "ବଜାର ପୂର୍ବାନୁମାନ",

    recentActivity: "ସାମ୍ପ୍ରତିକ କାର୍ଯ୍ୟକଳାପ",
    recentOrders: "ସାମ୍ପ୍ରତିକ ଅର୍ଡର",
    viewAll: "ସବୁ ଦେଖନ୍ତୁ →",

    inTransit: "ରାସ୍ତାରେ",
    delivered: "ଡେଲିଭରି ହୋଇଛି",
    processing: "ପ୍ରକ୍ରିୟା ଚାଲିଛି",

    farmerAccount: "କୃଷକ ଖାତା",

    market: "ବଜାର",
    todaysPrices: "ଆଜିର ମୂଲ୍ୟ",

    salesManagement: "ବିକ୍ରୟ ପରିଚାଳନା",
    ordersReceived: "ପ୍ରାପ୍ତ ଅର୍ଡର 📦",
    manageBuyerOrders:
        "କ୍ରେତାମାନଙ୍କ ଦ୍ୱାରା ଦିଆଯାଇଥିବା ଅର୍ଡର ଦେଖନ୍ତୁ ଏବଂ ପରିଚାଳନା କରନ୍ତୁ।",

    totalOrders: "ମୋଟ ଅର୍ଡର",
    pending: "ବିଚାରାଧୀନ",
    completed: "ସମ୍ପୂର୍ଣ୍ଣ",
    totalSales: "ମୋଟ ବିକ୍ରୟ",

    recentOrders: "ସାମ୍ପ୍ରତିକ ଅର୍ଡର",
    buyerOrders: "କ୍ରେତାଙ୍କ ଅର୍ଡର",
    noOrdersYet: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଅର୍ଡର ନାହିଁ",
    buyerOrdersAppearHere:
        "କ୍ରେତାମାନଙ୍କ ଦ୍ୱାରା ଦିଆଯାଇଥିବା ଅର୍ଡର ଏଠାରେ ଦେଖାଯିବ।",

    // AI INSIGHTS PAGE

    artificialIntelligence: "କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତା",
    aiFarmingIntelligence: "AI କୃଷି ବୁଦ୍ଧିମତ୍ତା",
    aiDescription:
        "ସ୍ମାର୍ଟ ବଜାର ପୂର୍ବାନୁମାନ ମାଧ୍ୟମରେ କ'ଣ ଚାଷ କରିବେ, କେବେ ବିକ୍ରି କରିବେ ଏବଂ କେତେ ଷ୍ଟକ୍ ରଖିବେ ତାହା ନିଷ୍ପତ୍ତି ନିଅନ୍ତୁ।",

    aiActive: "AI ସକ୍ରିୟ",

    analyseYourCrop: "ଆପଣଙ୍କ ଫସଲ ବିଶ୍ଳେଷଣ କରନ୍ତୁ",
    selectCropForInsights:
        "AI ସୂଚନା ଦେଖିବା ପାଇଁ ଫସଲ ବାଛନ୍ତୁ",

    crop: "ଫସଲ",
    tomato: "ଟମାଟୋ",
    potato: "ଆଳୁ",
    onion: "ପିଆଜ",
    rice: "ଚାଉଳ",

    gradeA: "ଗ୍ରେଡ୍ A",
    fresh: "ତାଜା",
    premium: "ପ୍ରିମିୟମ୍",

    expectedDemand: "ଅନୁମାନିତ ଚାହିଦା",
    next14Days: "ଆଗାମୀ 14 ଦିନ",

    priceTrend: "ମୂଲ୍ୟର ଧାରା",
    rising: "ବଢ଼ୁଛି",
    highConfidence: "ଉଚ୍ଚ ବିଶ୍ୱସନୀୟତା",

    bestOpportunity: "ସର୍ବୋତ୍ତମ ସୁଯୋଗ",
    highDemandCrop: "ଅଧିକ ଚାହିଦା ଥିବା ଫସଲ",

    supply: "ଯୋଗାଣ",
    marketOutlook: "ବଜାର ଆକଳନ",

    // AI INSIGHTS - REMAINING

    forecastPeriod: "ପୂର୍ବାନୁମାନ ଅବଧି",
    days14: "14 ଦିନ",
    confidence: "ବିଶ୍ୱସନୀୟତା",

    aiMarketIntelligenceTitle: "AI ବଜାର ସୂଚନା",
    demandForecastTitle: "ଚାହିଦା ପୂର୍ବାନୁମାନ",

    aiPredictionDescription:
        "ଐତିହାସିକ ବଜାର ଧାରା, କ୍ରେତାଙ୍କ କାର୍ଯ୍ୟକଳାପ ଏବଂ ଋତୁକାଳୀନ ପ୍ୟାଟର୍ନର ସିମୁଲେସନ୍ ଆଧାରରେ AI ପୂର୍ବାନୁମାନ।",

    expectedDemandGrowth: "ଅନୁମାନିତ ଚାହିଦା ବୃଦ୍ଧି",
    highDemand: "ଅଧିକ ଚାହିଦା",

    now: "ବର୍ତ୍ତମାନ",
    days7: "7 ଦିନ",

    aiQuickInsight: "AI ଶୀଘ୍ର ସୂଚନା",

    tomatoDemandInsight:
        "ଆଗାମୀ 14 ଦିନରେ ଟମାଟୋର ଚାହିଦା ବଢ଼ିବାର ଆଶା ଅଛି।",

    considerIncreasingSupply:
        "ବଜାର ମୂଲ୍ୟ ଉପରେ ନଜର ରଖି ଯୋଗାଣ ବଢ଼ାଇବାକୁ ବିଚାର କରନ୍ତୁ।",

    aiConfidence: "AI ବିଶ୍ୱସନୀୟତା",
    predictionConfidence: "ପୂର୍ବାନୁମାନର ବିଶ୍ୱସନୀୟତା",

    basedOnMarketData:
        "ଐତିହାସିକ ବଜାର ଧାରା, କ୍ରେତାଙ୍କ କାର୍ଯ୍ୟକଳାପ ଏବଂ ଋତୁକାଳୀନ ଚାହିଦା ପ୍ୟାଟର୍ନର ସିମୁଲେସନ୍ ଉପରେ ଆଧାରିତ।",

    priceTrend: "ମୂଲ୍ୟର ଧାରା",
    rising: "↑ ବଢ଼ୁଛି",
    highConfidence: "ଉଚ୍ଚ ବିଶ୍ୱସନୀୟତା",

    bestOpportunity: "ସର୍ବୋତ୍ତମ ସୁଯୋଗ",
    highDemandCrop: "ଅଧିକ ଚାହିଦା ଥିବା ଫସଲ",
    recommendedSupply: "ସୁପାରିଶ କରାଯାଇଥିବା ଯୋଗାଣ",
    suggestedIncrease: "ସୁପାରିଶ କରାଯାଇଥିବା ବୃଦ୍ଧି",

    // AI INSIGHTS - REMAINING

    forecastPeriod: "ପୂର୍ବାନୁମାନ ଅବଧି",
    days14: "14 ଦିନ",
    confidence: "ବିଶ୍ୱସନୀୟତା",

    aiMarketIntelligenceTitle: "AI ବଜାର ସୂଚନା",
    demandForecastTitle: "ଚାହିଦା ପୂର୍ବାନୁମାନ",

    aiPredictionDescription:
        "ଐତିହାସିକ ବଜାର ଧାରା, କ୍ରେତାଙ୍କ କାର୍ଯ୍ୟକଳାପ ଏବଂ ଋତୁକାଳୀନ ପ୍ୟାଟର୍ନର ସିମୁଲେସନ୍ ଆଧାରରେ AI ପୂର୍ବାନୁମାନ।",

    expectedDemandGrowth: "ଅନୁମାନିତ ଚାହିଦା ବୃଦ୍ଧି",
    highDemand: "ଅଧିକ ଚାହିଦା",

    now: "ବର୍ତ୍ତମାନ",
    days7: "7 ଦିନ",

    aiQuickInsight: "AI ଶୀଘ୍ର ସୂଚନା",

    tomatoDemandInsight:
        "ଆଗାମୀ 14 ଦିନରେ ଟମାଟୋର ଚାହିଦା ବଢ଼ିବାର ଆଶା ଅଛି।",

    considerIncreasingSupply:
        "ବଜାର ମୂଲ୍ୟ ଉପରେ ନଜର ରଖି ଯୋଗାଣ ବଢ଼ାଇବାକୁ ବିଚାର କରନ୍ତୁ।",

    aiConfidence: "AI ବିଶ୍ୱସନୀୟତା",
    predictionConfidence: "ପୂର୍ବାନୁମାନର ବିଶ୍ୱସନୀୟତା",

    basedOnMarketData:
        "ଐତିହାସିକ ବଜାର ଧାରା, କ୍ରେତାଙ୍କ କାର୍ଯ୍ୟକଳାପ ଏବଂ ଋତୁକାଳୀନ ଚାହିଦା ପ୍ୟାଟର୍ନର ସିମୁଲେସନ୍ ଉପରେ ଆଧାରିତ।",

    aiRecommendations: "AI ପରାମର୍ଶ",
    whatShouldYouDo: "ଆପଣ କ'ଣ କରିବା ଉଚିତ୍? 💡",
    actionableSuggestions:
        "ବର୍ତ୍ତମାନର ବଜାର ପରିସ୍ଥିତି ଆଧାରରେ ପରାମର୍ଶ।",

    high: "ଉଚ୍ଚ",
    medium: "ମଧ୍ୟମ",

    increaseTomatoSupply: "ଟମାଟୋ ଯୋଗାଣ ବଢ଼ାନ୍ତୁ",
    tomatoDemandIncrease:
        "ଆଗାମୀ 14 ଦିନରେ ଟମାଟୋର ଚାହିଦା ବଢ଼ିବାର ଅନୁମାନ ଅଛି।",
    recommended: "ସୁପାରିଶ କରାଯାଇଛି",

    monitorPrices: "ମୂଲ୍ୟ ଉପରେ ନଜର ରଖନ୍ତୁ",
    marketPricesUpward:
        "ଅଧିକ ଚାହିଦା ଥିବା ଫସଲର ବଜାର ମୂଲ୍ୟରେ ବୃଦ୍ଧିର ଧାରା ଦେଖାଯାଉଛି।",
    opportunity: "ସୁଯୋଗ",

    trackMarketPrices: "ବଜାର ମୂଲ୍ୟ ଟ୍ରାକ୍ କରନ୍ତୁ →",

    planInventory: "ଇନଭେଣ୍ଟୋରୀ ଯୋଜନା କରନ୍ତୁ",
    maintainSufficientStock:
        "ଆସୁଥିବା କ୍ରେତାଙ୍କ ଚାହିଦା ପୂରଣ ପାଇଁ ପର୍ଯ୍ୟାପ୍ତ ଷ୍ଟକ୍ ରଖନ୍ତୁ।",
    priority: "ପ୍ରାଥମିକତା",

    planInventoryButton: "ଇନଭେଣ୍ଟୋରୀ ଯୋଜନା କରନ୍ତୁ →",
    viewSupplyPlan: "ଯୋଗାଣ ଯୋଜନା ଦେଖନ୍ତୁ →",

    kisanAiAssistant: "କିସାନ୍ AI ସହାୟକ",
    needHelpDeciding: "ନିଷ୍ପତ୍ତି ନେବାରେ ସାହାଯ୍ୟ ଦରକାର କି?",
    askKisanAiDescription:
        "ଫସଲ, ମୂଲ୍ୟ, ଚାହିଦା କିମ୍ବା ଆପଣଙ୍କ ପରବର୍ତ୍ତୀ କୃଷି ନିଷ୍ପତ୍ତି ବିଷୟରେ KisanAI କୁ ପଚାରନ୍ତୁ।",
    askKisanAI: "KisanAI କୁ ପଚାରନ୍ତୁ",

    explainableAI: "ବ୍ୟାଖ୍ୟାଯୋଗ୍ୟ AI",
    whyThisPrediction: "ଏହି ପୂର୍ବାନୁମାନ କାହିଁକି? 🧠",
    understandSignals:
        "AI ପରାମର୍ଶ ପଛରେ ଥିବା ସଙ୍କେତଗୁଡ଼ିକୁ ବୁଝନ୍ତୁ।",
    viewReasoning: "କାରଣ ଦେଖନ୍ତୁ",

    buyerActivityIncreased: "କ୍ରେତାଙ୍କ କାର୍ଯ୍ୟକଳାପ ବଢ଼ିଛି",
    buyerActivityDescription:
        "ସିମୁଲେଟେଡ୍ କ୍ରେତା କାର୍ଯ୍ୟକଳାପ ସକାରାତ୍ମକ ଚାହିଦାର ସଙ୍କେତ ଦେଖାଉଛି।",

    historicalDemandRising: "ଐତିହାସିକ ଚାହିଦା ବଢ଼ୁଛି",
    historicalDemandDescription:
        "ପୂର୍ବ ବଜାର ପ୍ୟାଟର୍ନ ଟମାଟୋର ବଢ଼ୁଥିବା ଚାହିଦାର ସଙ୍କେତ ଦେଉଛି।",

    marketPricesFavorable: "ବଜାର ମୂଲ୍ୟ ଅନୁକୂଳ",
    marketPricesDescription:
        "ବର୍ତ୍ତମାନର ସିମୁଲେଟେଡ୍ ମୂଲ୍ୟ ବିକ୍ରୟ ପାଇଁ ସକାରାତ୍ମକ ସୁଯୋଗ ଦେଖାଉଛି।",

    seasonalPatternDetected: "ଋତୁକାଳୀନ ପ୍ୟାଟର୍ନ ଚିହ୍ନଟ ହୋଇଛି",
    seasonalPatternDescription:
        "ଐତିହାସିକ ତଥ୍ୟରେ ସମାନ ଋତୁକାଳୀନ ଚାହିଦା ପ୍ୟାଟର୍ନ ଦେଖାଯାଇଛି।",

    aiPrototypeMode: "AI ପ୍ରୋଟୋଟାଇପ୍ ମୋଡ୍",
    simulatedDataNotice:
        "ଏହି ପୂର୍ବାନୁମାନଗୁଡ଼ିକ ବର୍ତ୍ତମାନ KisanDirect SIH ପ୍ରୋଟୋଟାଇପ୍ ପାଇଁ ସିମୁଲେଟେଡ୍ ତଥ୍ୟ ବ୍ୟବହାର କରୁଛି।",
    analysisReady: "● ବିଶ୍ଳେଷଣ ପ୍ରସ୍ତୁତ",

    farmManagement: "କୃଷି ପରିଚାଳନା",
    myProduce: "ମୋର ଉତ୍ପାଦ 🌾",
    manageCrops:
        "ଆପଣଙ୍କ ଫସଲ, ମୂଲ୍ୟ ଏବଂ ଉପଲବ୍ଧ ଷ୍ଟକ୍ ପରିଚାଳନା କରନ୍ତୁ।",
    addProduce: "+ ଉତ୍ପାଦ ଯୋଡନ୍ତୁ",
    totalListings: "ମୋଟ ତାଲିକା",
    activeProduceListings: "ସକ୍ରିୟ ଉତ୍ପାଦ ତାଲିକା",
    totalStock: "ମୋଟ ଷ୍ଟକ୍",
    availableForBuyers: "କ୍ରେତାଙ୍କ ପାଇଁ ଉପଲବ୍ଧ",
    todaysSales: "ଆଜିର ବିକ୍ରୟ",
    fromDirectBuyers: "ସିଧାସଳଖ କ୍ରେତାଙ୍କଠାରୁ",
    averagePrice: "ହାରାହାରି ମୂଲ୍ୟ",
    perKilogram: "ପ୍ରତି କିଲୋଗ୍ରାମ୍",
    inventory: "ଇନଭେଣ୍ଟୋରୀ",
    yourProduce: "ଆପଣଙ୍କ ଉତ୍ପାଦ",
    produce: "ଉତ୍ପାଦ",
    quantity: "ପରିମାଣ",
    price: "ମୂଲ୍ୟ",
    status: "ସ୍ଥିତି",
    action: "କାର୍ଯ୍ୟ",
    freshTomato: "ତାଜା ଟମାଟୋ",
    gradeARanchi: "ଗ୍ରେଡ୍ A • ରାଞ୍ଚି",
    active: "ସକ୍ରିୟ",
    edit: "ସମ୍ପାଦନା କରନ୍ତୁ",
    premiumRice: "ପ୍ରିମିୟମ୍ ଚାଉଳ",
    premiumPotato: "ପ୍ରିମିୟମ୍ ଆଳୁ",

    // Earnings & Payments

    financialManagement: "ଆର୍ଥିକ ପରିଚାଳନା",
    earningsPayments: "ଆୟ ଏବଂ ଦେୟ 💰",
    trackFarmIncome:
        "ଆପଣଙ୍କ କୃଷି ଆୟ, ଦେୟ ଏବଂ ଆର୍ଥିକ ପ୍ରଦର୍ଶନକୁ ଟ୍ରାକ୍ କରନ୍ତୁ।",

    totalEarnings: "ମୋଟ ଆୟ",
    lifetimeFarmEarnings: "ଏପର୍ଯ୍ୟନ୍ତର ମୋଟ କୃଷି ଆୟ",

    thisMonth: "ଏହି ମାସ",
    earningsInAugust: "ଅଗଷ୍ଟ ମାସର ଆୟ",

    twoPayments: "2ଟି ଦେୟ",
    pendingPayments: "ବିଚାରାଧୀନ ଦେୟ",
    awaitingBuyerPayment: "କ୍ରେତାଙ୍କ ଦେୟକୁ ଅପେକ୍ଷା କରାଯାଉଛି",

    available: "ଉପଲବ୍ଧ",
    availableBalance: "ଉପଲବ୍ଧ ବାଲାନ୍ସ",
    readyForWithdrawal: "ଉଠାଣ ପାଇଁ ପ୍ରସ୍ତୁତ",

    earningsOverview: "ଆୟର ସମୀକ୍ଷା",
    monthlyEarnings: "ମାସିକ ଆୟ",

    cropPerformance: "ଫସଲ ପ୍ରଦର୍ଶନ",
    earningsByCrop: "ଫସଲ ଅନୁସାରେ ଆୟ",

    tomatoEarningsPercent: "ଆୟର 38%",
    riceEarningsPercent: "ଆୟର 34%",
    potatoEarningsPercent: "ଆୟର 28%",

    paymentActivity: "ଦେୟ କାର୍ଯ୍ୟକଳାପ",
    recentTransactions: "ସାମ୍ପ୍ରତିକ କାରବାର",

    paid: "ଦେୟ ପ୍ରଦାନ କରାଯାଇଛି",

    paymentAccount: "ଦେୟ ଖାତା",
    settlementInformation: "ଦେୟ ନିଷ୍ପତ୍ତି ସୂଚନା",

    nextSettlement: "ପରବର୍ତ୍ତୀ ନିଷ୍ପତ୍ତି",
    pendingAmount: "ବିଚାରାଧୀନ ରାଶି",
    paymentMethod: "ଦେୟ ପଦ୍ଧତି",
    bankTransfer: "ବ୍ୟାଙ୍କ ଟ୍ରାନ୍ସଫର୍",

    viewPaymentDetails: "💰 ଦେୟ ବିବରଣୀ ଦେଖନ୍ତୁ",

    // BUYER DASHBOARD

    buyerAccount: "କ୍ରେତା ଖାତା",

    myOrders: "ମୋର ଅର୍ଡର",
    deliveries: "ଡେଲିଭରି",
    payments: "ଦେୟ",

    buyerPortal: "କ୍ରେତା ପୋର୍ଟାଲ୍",
    welcomeBack: "ପୁଣି ସ୍ୱାଗତ,",
    buyerDashboardDescription:
        "କୃଷକ ଏବଂ FPOs ଠାରୁ ସିଧାସଳଖ ତାଜା ଉତ୍ପାଦ ପାଆନ୍ତୁ।",

    totalPurchases: "ମୋଟ କ୍ରୟ",
    thisMonth: "ଏହି ମାସ",

    threeActive: "3ଟି ସକ୍ରିୟ",
    activeOrders: "ସକ୍ରିୟ ଅର୍ଡର",
    ordersInProgress: "ଅର୍ଡର ପ୍ରଗତିରେ ଅଛି",

    fourNew: "+4 ନୂଆ",
    savedFarmers: "ସଞ୍ଚିତ କୃଷକ",
    trustedSuppliers: "ବିଶ୍ୱସନୀୟ ଯୋଗାଣକାରୀ",

    onTime: "ସମୟରେ",
    deliveries: "ଡେଲିଭରି",
    deliverySuccessRate: "ଡେଲିଭରି ସଫଳତା ହାର",

    recommendedProduce: "ସୁପାରିଶ କରାଯାଇଥିବା ଉତ୍ପାଦ",
    viewMarketplace: "ମାର୍କେଟପ୍ଲେସ୍ ଦେଖନ୍ତୁ →",
    buy: "କିଣନ୍ତୁ",

    kgAvailable800: "800 କିଲୋଗ୍ରାମ୍ ଉପଲବ୍ଧ",
    kgAvailable1200: "1,200 କିଲୋଗ୍ରାମ୍ ଉପଲବ୍ଧ",
    kgAvailable650: "650 କିଲୋଗ୍ରାମ୍ ଉପଲବ୍ଧ",

    smartBuying: "ସ୍ମାର୍ଟ କ୍ରୟ",
    tomatoDemandExpected:
        "ଆଗାମୀ 14 ଦିନରେ ଟମାଟୋର ଚାହିଦା ବଢ଼ିବାର ଆଶା ଅଛି।",

    purchaseTomatoEarly:
        "ସମ୍ଭାବ୍ୟ ମୂଲ୍ୟ ବୃଦ୍ଧିରୁ ବଞ୍ଚିବା ପାଇଁ ଟମାଟୋ ଷ୍ଟକ୍ ପୂର୍ବରୁ କିଣିବାକୁ ବିଚାର କରନ୍ତୁ।",

    viewAIInsights: "AI ସୂଚନା ଦେଖନ୍ତୁ →",

    yourActivity: "ଆପଣଙ୍କ କାର୍ଯ୍ୟକଳାପ",

    inTransit: "ରାସ୍ତାରେ",
    delivered: "ଡେଲିଭରି ହୋଇଛି",
    processing: "ପ୍ରକ୍ରିୟା ଚାଲିଛି",

    activeDelivery: "ସକ୍ରିୟ ଡେଲିଭରି",
    you: "ଆପଣ",
    estimatedArrival: "ଅନୁମାନିତ ପହଞ୍ଚିବା ସମୟ",
    distance: "ଦୂରତା",
    trackDelivery: "🚚 ଡେଲିଭରି ଟ୍ରାକ୍ କରନ୍ତୁ",

    farmerNetwork: "କୃଷକ ନେଟୱର୍କ",
    farmersTitle: "କୃଷକ 👨‍🌾",
    farmerNetworkDescription:
        "ବିଶ୍ୱସନୀୟ ସ୍ଥାନୀୟ କୃଷକମାନଙ୍କୁ ଖୋଜନ୍ତୁ ଏବଂ ସେମାନଙ୍କ ସହିତ ଯୋଡ଼ିହୁଅନ୍ତୁ।",

    availableFarmers: "ଉପଲବ୍ଧ କୃଷକ",
    verifiedFarmers: "ଯାଞ୍ଚ ହୋଇଥିବା କୃଷକ",
    yourTrustedSuppliers: "ଆପଣଙ୍କ ବିଶ୍ୱସନୀୟ ଯୋଗାଣକାରୀ",
    nearbyFarmers: "ନିକଟସ୍ଥ କୃଷକ",
    withinYourRegion: "ଆପଣଙ୍କ ଅଞ୍ଚଳରେ",

    fpos: "FPOs",
    farmerOrganizations: "କୃଷକ ସଂଗଠନ",

    localFarmers: "ସ୍ଥାନୀୟ କୃଷକ",
    trustedFarmers: "ବିଶ୍ୱସନୀୟ କୃଷକ 👨‍🌾",
    verifiedFarmersDirectPurchase:
        "ସିଧାସଳଖ କ୍ରୟ ପାଇଁ ଯାଞ୍ଚ ହୋଇଥିବା କୃଷକ ଉପଲବ୍ଧ ଅଛନ୍ତି",

    verifiedNetwork: "✓ ଯାଞ୍ଚ ହୋଇଥିବା ନେଟୱର୍କ",

    view: "ଦେଖନ୍ତୁ",

    purchaseManagement: "କ୍ରୟ ପରିଚାଳନା",
    trackManagePurchases:
        "ସ୍ଥାନୀୟ କୃଷକମାନଙ୍କଠାରୁ କରାଯାଇଥିବା ସମସ୍ତ କ୍ରୟକୁ ଟ୍ରାକ୍ ଏବଂ ପରିଚାଳନା କରନ୍ତୁ।",

    farmerDirect: "🌱 କୃଷକଙ୍କଠାରୁ ସିଧାସଳଖ କ୍ରୟ",
    secureOrders: "🔒 ସୁରକ୍ଷିତ ଅର୍ଡର",
    trackable: "🚚 ଟ୍ରାକ୍ କରିହେବ",

    orderHub: "ଅର୍ଡର ହବ୍",
    allPurchasesOnePlace: "ସମସ୍ତ କ୍ରୟ ଗୋଟିଏ ସ୍ଥାନରେ",

    orderHistory: "ଅର୍ଡର ଇତିହାସ",
    yourOrders: "ଆପଣଙ୍କ ଅର୍ଡର",
    noOrdersYet: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଅର୍ଡର ନାହିଁ",
    placedOrdersAppearHere:
        "ଆପଣଙ୍କ ଦ୍ୱାରା ଦିଆଯାଇଥିବା ଅର୍ଡର ଏଠାରେ ଦେଖାଯିବ।",

    footerDescription:
        "ଏକ ସ୍ମାର୍ଟ ଏବଂ ନ୍ୟାୟସଙ୍ଗତ କୃଷି ମାର୍କେଟପ୍ଲେସ୍ ନିର୍ମାଣ।",
    footerCopyright:
        "© 2026 KisanDirect • SIH ପ୍ରୋଟୋଟାଇପ୍",

    // LOGIN

    loginToContinue:
        "KisanDirect ରେ ଜାରି ରଖିବା ପାଇଁ ଲଗଇନ୍ କରନ୍ତୁ",
    mobileNumber: "ମୋବାଇଲ୍ ନମ୍ବର",
    password: "ପାସୱାର୍ଡ",
    rememberMe: "ମୋତେ ମନେ ରଖନ୍ତୁ",
    forgotPassword: "ପାସୱାର୍ଡ ଭୁଲିଗଲେ?",
    loginButton: "ଲଗଇନ୍ →",

    newToKisanDirect: "KisanDirect ରେ ନୂଆ କି?",
    createAccount: "ଖାତା ତିଆରି କରନ୍ତୁ",

    prototypeDemo: "ପ୍ରୋଟୋଟାଇପ୍ ଡେମୋ",
    localAccountLogin:
        "ଆପଣ ସ୍ଥାନୀୟ ଭାବରେ ଖାତା ତିଆରି କରି ଲଗଇନ୍ କରିପାରିବେ।",

    back: "← ପଛକୁ",
    joinKisanDirect: "KisanDirect ସହିତ ଯୋଡ଼ିହୁଅନ୍ତୁ",
    howUsePlatform:
        "ଆପଣ ପ୍ଲାଟଫର୍ମକୁ କିପରି ବ୍ୟବହାର କରିବାକୁ ଚାହାଁନ୍ତି?",

    farmerFpoAccount: "ମୁଁ କୃଷକ / FPO",
    farmerAccountDescription:
        "ସିଧାସଳଖ ଉତ୍ପାଦ ବିକ୍ରି କରନ୍ତୁ, ଅର୍ଡର ପାଆନ୍ତୁ ଏବଂ AI ବଜାର ସୂଚନା ବ୍ୟବହାର କରନ୍ତୁ।",

    buyerAccountOption: "ମୁଁ କ୍ରେତା",
    buyerAccountDescription:
        "ଯାଞ୍ଚ ହୋଇଥିବା କୃଷକ ଏବଂ FPOs ଠାରୁ ସିଧାସଳଖ ତାଜା ଉତ୍ପାଦ କିଣନ୍ତୁ।",

    createFarmerAccount: "କୃଷକ ଖାତା ତିଆରି କରନ୍ତୁ",
    startSellingDirectly:
        "KisanDirect ମାଧ୍ୟମରେ ସିଧାସଳଖ ବିକ୍ରି କରିବା ଆରମ୍ଭ କରନ୍ତୁ",

    fullName: "ପୂର୍ଣ୍ଣ ନାମ",
    villageCity: "ଗାଁ / ସହର",
    district: "ଜିଲ୍ଲା",
    state: "ରାଜ୍ୟ",
    primaryCrop: "ମୁଖ୍ୟ ଫସଲ",
    createPassword: "ପାସୱାର୍ଡ ତିଆରି କରନ୍ତୁ",
    createFarmerAccountButton:
        "କୃଷକ ଖାତା ତିଆରି କରନ୍ତୁ →",

    createBuyerAccount: "କ୍ରେତା ଖାତା ତିଆରି କରନ୍ତୁ",
    sourceDirectlyFromFarmers:
        "କୃଷକମାନଙ୍କଠାରୁ ସିଧାସଳଖ ଉତ୍ପାଦ ପାଆନ୍ତୁ",
    nameBusinessName: "ନାମ / ବ୍ୟବସାୟର ନାମ",
    buyerType: "କ୍ରେତା ପ୍ରକାର",
    location: "ସ୍ଥାନ",
    createBuyerAccountButton:
        "କ୍ରେତା ଖାତା ତିଆରି କରନ୍ତୁ →",

    accountCreated: "ଖାତା ତିଆରି ହୋଇଛି!",
    accountCreatedSuccessfully:
        "ଆପଣଙ୍କ KisanDirect ଖାତା ସଫଳତାର ସହିତ ତିଆରି ହୋଇଛି।",
    continueToLogin: "ଲଗଇନ୍ କରିବାକୁ ଆଗକୁ ବଢ଼ନ୍ତୁ →",

    // ADD PRODUCE

    farmManagement: "କୃଷି ପରିଚାଳନା",
    addNewProduce: "ନୂଆ ଉତ୍ପାଦ ଯୋଡନ୍ତୁ 🌾",
    listFreshProduce:
        "ଉପଭୋକ୍ତା ଏବଂ ଥୋକ କ୍ରେତାଙ୍କ ପାଇଁ ଆପଣଙ୍କ ତାଜା ଉତ୍ପାଦକୁ ସିଧାସଳଖ ତାଲିକାଭୁକ୍ତ କରନ୍ତୁ।",

    produceName: "ଉତ୍ପାଦର ନାମ",
    category: "ଶ୍ରେଣୀ",
    qualityGrade: "ଗୁଣବତ୍ତା ଗ୍ରେଡ୍",
    quantityAvailable: "ଉପଲବ୍ଧ ପରିମାଣ",
    unit: "ଏକକ",
    pricePerKg: "ପ୍ରତି କିଲୋଗ୍ରାମ୍ ମୂଲ୍ୟ",
    farmPickupLocation: "କ୍ଷେତ / ପିକଅପ୍ ସ୍ଥାନ",
    availableFrom: "ଉପଲବ୍ଧତା ଆରମ୍ଭ",
    cancel: "ବାତିଲ୍ କରନ୍ତୁ",
    listProduce: "🌾 ଉତ୍ପାଦ ତାଲିକାଭୁକ୍ତ କରନ୍ତୁ",

    // KISAN AI

    kisanDirectAIAssistant: "KISANDIRECT AI ସହାୟକ",
    kisanAIAnalysis: "KisanAI ବିଶ୍ଳେଷଣ",
    smartGuidance:
        "ବର୍ତ୍ତମାନର ଫସଲ ସୂଚନା ଆଧାରରେ ସ୍ମାର୍ଟ ମାର୍ଗଦର୍ଶନ।",
    selectedCrop: "ଚୟନିତ ଫସଲ",
    supply: "📦 ଯୋଗାଣ",
    maintainSupplyMonitorMarket:
        "ବର୍ତ୍ତମାନର ଯୋଗାଣ ସ୍ତର ବଜାୟ ରଖନ୍ତୁ ଏବଂ ବଜାର ସ୍ଥିତି ଉପରେ ନଜର ରଖନ୍ତୁ।",
    gotIt: "ବୁଝିଲି ✓"
},

as: {
    home: "হোম",
    marketplace: "বজাৰ",
    howItWorks: "ই কেনেকৈ কাম কৰে",
    aiSolutions: "AI সমাধান",
    login: "লগইন",
    joinNow: "এতিয়াই যোগদান কৰক",

    badge: "AI-চালিত কৃষি বজাৰ",
    heroTitle1: "খেতিৰ পৰা",
    heroTitle2: "পোনপটীয়াকৈ",
    heroTitle3: "বজাৰলৈ।",
    heroText:
        "KisanDirect-এ কৃষক আৰু FPOসমূহক পোনপটীয়াকৈ গ্ৰাহক আৰু পাইকাৰী ক্ৰেতাৰ সৈতে সংযোগ কৰে, যাৰ ফলত কৃষকে ভাল মূল্য লাভ কৰে আৰু যোগান শৃংখলৰ সমস্যা হ্ৰাস পায়।",

    explore: "বজাৰ চাওক",
    joinFarmer: "কৃষক হিচাপে যোগদান কৰক",

    smartAgriculture: "স্মাৰ্ট কৃষি",
    smartText:
        "কৃষক, ক্ৰেতা আৰু লজিষ্টিকছক এটা প্লেটফৰ্মত সংযোগ কৰা।",

    aiMarket: "AI বজাৰ বুদ্ধিমত্তা",
    demand: "আগন্তুক 14 দিনত অনুমান কৰা চাহিদা বৃদ্ধি",
    recommendation: "AI পৰামৰ্শ",

    farmers: "কৃষক",
    buyers: "ক্ৰেতা",
    states: "ৰাজ্য",
    farmerSales: "কৃষক বিক্ৰী",

    farmer: "কৃষক",
    buyer: "ক্ৰেতা",

    freshFromFarm: "খেতিৰ পৰা সতেজ",
    farmerMarketplace: "কৃষক বজাৰ",
    marketText:
        "কৃষকৰ পৰা পোনপটীয়াকৈ সতেজ উৎপাদন স্বচ্ছ মূল্যত ক্ৰয় কৰক।",

    whyKisanDirect: "KisanDirect কিয়",
    smarterSupplyChain: "এটা উন্নত কৃষি যোগান শৃংখলা।",

    directMarketplace: "পোনপটীয়া বজাৰ",
    directMarketplaceText:
        "কৃষকসকলক পোনপটীয়াকৈ গ্ৰাহক আৰু পাইকাৰী ক্ৰেতাৰ সৈতে সংযোগ কৰক।",

    aiDemandForecasting: "AI চাহিদা পূৰ্বানুমান",
    aiDemandForecastingText:
        "আগন্তুক চাহিদাৰ পূৰ্বানুমান কৰক আৰু কৃষকসকলক উন্নত বিক্ৰীৰ সিদ্ধান্ত লোৱাত সহায় কৰক।",

    smartLogistics: "স্মাৰ্ট লজিষ্টিকছ",
    smartLogisticsText:
        "পথসমূহ উন্নত কৰক আৰু পৰিবহণৰ খৰচ হ্ৰাস কৰক।",

    betterPrices: "উন্নত মূল্য",
    betterPricesText:
        "অপ্ৰয়োজনীয় মধ্যস্থতাকাৰী হ্ৰাস কৰক আৰু কৃষকৰ আয় বৃদ্ধি কৰক।",

    artificialIntelligence: "কৃত্ৰিম বুদ্ধিমত্তা",

    predictOptimize:
        "চাহিদাৰ পূৰ্বানুমান কৰক। যোগান উন্নত কৰক।",

    aiEngineText:
        "আমাৰ AI ইঞ্জিনে বজাৰৰ প্ৰৱণতা, ঐতিহাসিক চাহিদা আৰু ক্ৰেতাৰ কাৰ্যকলাপ বিশ্লেষণ কৰি কৃষকসকলক কি বিক্ৰী কৰিব, কেতিয়া বিক্ৰী কৰিব আৰু ক'লৈ পঠিয়াব সেই সিদ্ধান্ত লোৱাত সহায় কৰে।",

    exploreAIInsights: "AI তথ্য চাওক →",

    demandForecast: "চাহিদাৰ পূৰ্বানুমান",
    liveDemo: "● লাইভ ডেমো",
    expectedDemandGrowth: "অনুমানিত চাহিদা বৃদ্ধি",

    farmerAccount: "কৃষকৰ একাউণ্ট",

    dashboard: "ডেশ্বব'ৰ্ড",
    myProduce: "মোৰ উৎপাদন",
    orders: "অৰ্ডাৰ",
    aiInsights: "AI তথ্য",
    logistics: "লজিষ্টিকছ",
    earnings: "উপাৰ্জন",
    settings: "ছেটিংছ",
    logout: "লগআউট",

    farmerPortal: "কৃষক প'ৰ্টেল",
    goodMorning: "সুপ্ৰভাত,",
    farmTodayMessage:
        "আজি আপোনাৰ খেতিত কি ঘটিছে, ইয়াত চাওক।",

    totalSales: "মুঠ বিক্ৰী",
    comparedLastMonth: "যোৱা মাহৰ তুলনাত",

    activeOrders: "সক্ৰিয় অৰ্ডাৰ",
    readyForDispatch: "ডিছপেচৰ বাবে 4টা সাজু",

    produceListed: "তালিকাভুক্ত উৎপাদন",
    availableForBuyers: "ক্ৰেতাসকলৰ বাবে উপলব্ধ",

    avgPrice: "গড় মূল্য",
    betterThanMandi: "মাণ্ডীতকৈ উন্নত",

    aiMarketIntelligence: "AI বজাৰ তথ্য",
    demandForecast: "চাহিদাৰ পূৰ্বানুমান",
    liveDemo: "• লাইভ ডেমো",
    expectedDemandGrowth: "অনুমানিত চাহিদা বৃদ্ধি",
    highDemand: "উচ্চ চাহিদা ↑",

    aiRecommendation: "AI পৰামৰ্শ",
    tomatoRecommendation:
        "আগন্তুক 14 দিনত বিলাহীৰ চাহিদা বৃদ্ধি পাব পাৰে। যোগানত 15% বৃদ্ধি কৰাৰ কথা বিবেচনা কৰক।",

    quickActions: "দ্ৰুত কাৰ্য",
    manageFarm: "খেতি পৰিচালনা",

    listProduce: "উৎপাদন তালিকাভুক্ত কৰক",
    sellYourCrops: "আপোনাৰ শস্য বিক্ৰী কৰক",

    viewOrders: "অৰ্ডাৰ চাওক",
    manageOrders: "অৰ্ডাৰ পৰিচালনা কৰক",

    trackDelivery: "ডেলিভাৰী ট্ৰেক কৰক",
    viewShipments: "শিপমেণ্ট চাওক",

    aiInsights: "AI তথ্য",
    marketPredictions: "বজাৰ পূৰ্বানুমান",

    recentActivity: "শেহতীয়া কাৰ্যকলাপ",
    recentOrders: "শেহতীয়া অৰ্ডাৰ",
    viewAll: "সকলো চাওক →",

    inTransit: "বাটত আছে",
    delivered: "ডেলিভাৰী সম্পূৰ্ণ",
    processing: "প্ৰক্ৰিয়াধীন",

    farmerAccount: "কৃষকৰ একাউণ্ট",

    market: "বজাৰ",
    todaysPrices: "আজিৰ মূল্য",

    salesManagement: "বিক্ৰী পৰিচালনা",
    ordersReceived: "প্ৰাপ্ত অৰ্ডাৰ 📦",
    manageBuyerOrders:
        "ক্ৰেতাসকলে দিয়া অৰ্ডাৰসমূহ চাওক আৰু পৰিচালনা কৰক।",

    totalOrders: "মুঠ অৰ্ডাৰ",
    pending: "বাকী",
    completed: "সম্পূৰ্ণ",
    totalSales: "মুঠ বিক্ৰী",

    recentOrders: "শেহতীয়া অৰ্ডাৰ",
    buyerOrders: "ক্ৰেতাৰ অৰ্ডাৰ",
    noOrdersYet: "এতিয়ালৈ কোনো অৰ্ডাৰ নাই",
    buyerOrdersAppearHere:
        "ক্ৰেতাসকলে দিয়া অৰ্ডাৰসমূহ ইয়াত দেখা যাব।",

    // AI INSIGHTS PAGE

    artificialIntelligence: "কৃত্ৰিম বুদ্ধিমত্তা",
    aiFarmingIntelligence: "AI কৃষি বুদ্ধিমত্তা",
    aiDescription:
        "স্মাৰ্ট বজাৰ পূৰ্বানুমানৰ সহায়ত কি খেতি কৰিব, কেতিয়া বিক্ৰী কৰিব আৰু কিমান ষ্টক ৰাখিব সেই সিদ্ধান্ত লওক।",

    aiActive: "AI সক্ৰিয়",

    analyseYourCrop: "আপোনাৰ শস্য বিশ্লেষণ কৰক",
    selectCropForInsights:
        "AI তথ্য চাবলৈ শস্য বাছনি কৰক",

    crop: "শস্য",
    tomato: "বিলাহী",
    potato: "আলু",
    onion: "পিয়াঁজ",
    rice: "চাউল",

    gradeA: "গ্ৰেড A",
    fresh: "সতেজ",
    premium: "প্ৰিমিয়াম",

    expectedDemand: "অনুমানিত চাহিদা",
    next14Days: "আগন্তুক 14 দিন",

    priceTrend: "মূল্যৰ প্ৰৱণতা",
    rising: "বৃদ্ধি পাইছে",
    highConfidence: "উচ্চ বিশ্বাসযোগ্যতা",

    bestOpportunity: "সৰ্বোত্তম সুযোগ",
    highDemandCrop: "উচ্চ চাহিদাৰ শস্য",

    supply: "যোগান",
    marketOutlook: "বজাৰৰ পূৰ্বানুমান",

    forecastPeriod: "পূৰ্বানুমানৰ সময়সীমা",
    days14: "14 দিন",
    confidence: "বিশ্বাসযোগ্যতা",

    aiMarketIntelligenceTitle: "AI বজাৰ তথ্য",
    demandForecastTitle: "চাহিদাৰ পূৰ্বানুমান",

    aiPredictionDescription:
        "ঐতিহাসিক বজাৰৰ প্ৰৱণতা, ক্ৰেতাৰ কাৰ্যকলাপ আৰু ঋতুভিত্তিক আৰ্হিৰ চিমুলেচনৰ ওপৰত ভিত্তি কৰি AI পূৰ্বানুমান।",

    expectedDemandGrowth: "অনুমানিত চাহিদা বৃদ্ধি",
    highDemand: "উচ্চ চাহিদা",

    now: "এতিয়া",
    days7: "7 দিন",

    aiQuickInsight: "AI দ্ৰুত তথ্য",

    tomatoDemandInsight:
        "আগন্তুক 14 দিনত বিলাহীৰ চাহিদা বৃদ্ধি পোৱাৰ সম্ভাৱনা আছে।",

    considerIncreasingSupply:
        "বজাৰৰ মূল্যৰ ওপৰত নজৰ ৰাখি যোগান বৃদ্ধি কৰাৰ কথা বিবেচনা কৰক।",

    aiConfidence: "AI বিশ্বাসযোগ্যতা",
    predictionConfidence: "পূৰ্বানুমানৰ বিশ্বাসযোগ্যতা",

    basedOnMarketData:
        "ঐতিহাসিক বজাৰৰ প্ৰৱণতা, ক্ৰেতাৰ কাৰ্যকলাপ আৰু ঋতুভিত্তিক চাহিদাৰ আৰ্হিৰ চিমুলেচনৰ ওপৰত ভিত্তি কৰি।",

    priceTrend: "মূল্যৰ প্ৰৱণতা",
    rising: "↑ বৃদ্ধি পাইছে",
    highConfidence: "উচ্চ বিশ্বাসযোগ্যতা",

    bestOpportunity: "সৰ্বোত্তম সুযোগ",
    highDemandCrop: "উচ্চ চাহিদাৰ শস্য",
    recommendedSupply: "পৰামৰ্শ দিয়া যোগান",
    suggestedIncrease: "পৰামৰ্শ দিয়া বৃদ্ধি",

    aiRecommendations: "AI পৰামৰ্শ",
    whatShouldYouDo: "আপুনি কি কৰিব লাগে? 💡",
    actionableSuggestions:
        "বৰ্তমানৰ বজাৰৰ পৰিস্থিতিৰ ওপৰত ভিত্তি কৰি পৰামৰ্শ।",

    high: "উচ্চ",
    medium: "মধ্যম",

    increaseTomatoSupply: "বিলাহীৰ যোগান বৃদ্ধি কৰক",
    tomatoDemandIncrease:
        "আগন্তুক 14 দিনত বিলাহীৰ চাহিদা বৃদ্ধি পোৱাৰ অনুমান কৰা হৈছে।",
    recommended: "পৰামৰ্শ দিয়া হৈছে",

    monitorPrices: "মূল্যৰ ওপৰত নজৰ ৰাখক",
    marketPricesUpward:
        "উচ্চ চাহিদাৰ শস্যসমূহৰ বজাৰ মূল্যত বৃদ্ধিৰ প্ৰৱণতা দেখা গৈছে।",
    opportunity: "সুযোগ",

    trackMarketPrices: "বজাৰৰ মূল্য ট্ৰেক কৰক →",

    planInventory: "ইনভেণ্টৰী পৰিকল্পনা কৰক",
    maintainSufficientStock:
        "আগন্তুক ক্ৰেতাৰ চাহিদা পূৰণ কৰিবলৈ পৰ্যাপ্ত ষ্টক ৰাখক।",
    priority: "অগ্ৰাধিকাৰ",

    planInventoryButton: "ইনভেণ্টৰী পৰিকল্পনা কৰক →",
    viewSupplyPlan: "যোগান পৰিকল্পনা চাওক →",

    kisanAiAssistant: "কিষাণ AI সহায়ক",
    needHelpDeciding:
        "সিদ্ধান্ত লোৱাত সহায়ৰ প্ৰয়োজন নেকি?",
    askKisanAiDescription:
        "শস্য, মূল্য, চাহিদা বা আপোনাৰ পৰৱৰ্তী কৃষি সিদ্ধান্তৰ বিষয়ে KisanAI-ক সুধিব।",
    askKisanAI: "KisanAI-ক সুধক",

    explainableAI: "ব্যাখ্যাযোগ্য AI",
    whyThisPrediction: "এই পূৰ্বানুমান কিয়? 🧠",
    understandSignals:
        "AI পৰামৰ্শৰ আঁৰত থকা সংকেতসমূহ বুজি লওক।",
    viewReasoning: "কাৰণ চাওক",

    buyerActivityIncreased: "ক্ৰেতাৰ কাৰ্যকলাপ বৃদ্ধি পাইছে",
    buyerActivityDescription:
        "চিমুলেটেড ক্ৰেতাৰ কাৰ্যকলাপে ইতিবাচক চাহিদাৰ সংকেত দেখুৱাইছে।",

    historicalDemandRising: "ঐতিহাসিক চাহিদা বৃদ্ধি পাইছে",
    historicalDemandDescription:
        "পূৰ্বৰ বজাৰৰ আৰ্হিয়ে বিলাহীৰ বৃদ্ধি পোৱা চাহিদাৰ সংকেত দিয়ে।",

    marketPricesFavorable: "বজাৰৰ মূল্য অনুকূল",
    marketPricesDescription:
        "বৰ্তমানৰ চিমুলেটেড মূল্যই বিক্ৰীৰ বাবে ইতিবাচক সুযোগ দেখুৱাইছে।",

    seasonalPatternDetected:
        "ঋতুভিত্তিক আৰ্হি চিনাক্ত কৰা হৈছে",
    seasonalPatternDescription:
        "ঐতিহাসিক তথ্যত একেধৰণৰ ঋতুভিত্তিক চাহিদাৰ আৰ্হি দেখা গৈছে।",

    aiPrototypeMode: "AI প্ৰ'ট'টাইপ মোড",
    simulatedDataNotice:
        "এই পূৰ্বানুমানসমূহে বৰ্তমান KisanDirect SIH প্ৰ'ট'টাইপৰ বাবে চিমুলেটেড তথ্য ব্যৱহাৰ কৰিছে।",
    analysisReady: "● বিশ্লেষণ প্ৰস্তুত",

    farmManagement: "কৃষি পৰিচালনা",
    myProduce: "মোৰ উৎপাদন 🌾",
    manageCrops:
        "আপোনাৰ শস্য, মূল্য আৰু উপলব্ধ ষ্টক পৰিচালনা কৰক।",
    addProduce: "+ উৎপাদন যোগ কৰক",
    totalListings: "মুঠ তালিকা",
    activeProduceListings: "সক্ৰিয় উৎপাদন তালিকা",
    totalStock: "মুঠ ষ্টক",
    availableForBuyers: "ক্ৰেতাসকলৰ বাবে উপলব্ধ",
    todaysSales: "আজিৰ বিক্ৰী",
    fromDirectBuyers: "পোনপটীয়া ক্ৰেতাৰ পৰা",
    averagePrice: "গড় মূল্য",
    perKilogram: "প্ৰতি কিলোগ্ৰাম",
    inventory: "ইনভেণ্টৰী",
    yourProduce: "আপোনাৰ উৎপাদন",
    produce: "উৎপাদন",
    quantity: "পৰিমাণ",
    price: "মূল্য",
    status: "স্থিতি",
    action: "কাৰ্য",
    freshTomato: "সতেজ বিলাহী",
    gradeARanchi: "গ্ৰেড A • ৰাঁচী",
    active: "সক্ৰিয়",
    edit: "সম্পাদনা কৰক",
    premiumRice: "প্ৰিমিয়াম চাউল",
    premiumPotato: "প্ৰিমিয়াম আলু",

    // Earnings & Payments

    financialManagement: "বিত্তীয় পৰিচালনা",
    earningsPayments: "উপাৰ্জন আৰু পেমেণ্ট 💰",
    trackFarmIncome:
        "আপোনাৰ কৃষি আয়, পেমেণ্ট আৰু বিত্তীয় প্ৰদৰ্শন ট্ৰেক কৰক।",

    totalEarnings: "মুঠ উপাৰ্জন",
    lifetimeFarmEarnings: "এতিয়ালৈকে মুঠ কৃষি উপাৰ্জন",

    thisMonth: "এই মাহত",
    earningsInAugust: "আগষ্ট মাহৰ উপাৰ্জন",

    twoPayments: "2টা পেমেণ্ট",
    pendingPayments: "বাকী থকা পেমেণ্ট",
    awaitingBuyerPayment:
        "ক্ৰেতাৰ পেমেণ্টৰ বাবে অপেক্ষা কৰি আছে",

    available: "উপলব্ধ",
    availableBalance: "উপলব্ধ বেলেঞ্চ",
    readyForWithdrawal: "উলিওৱাৰ বাবে সাজু",

    earningsOverview: "উপাৰ্জনৰ সংক্ষিপ্ত বিৱৰণ",
    monthlyEarnings: "মাহেকীয়া উপাৰ্জন",

    cropPerformance: "শস্যৰ প্ৰদৰ্শন",
    earningsByCrop: "শস্য অনুসৰি উপাৰ্জন",

    tomatoEarningsPercent: "উপাৰ্জনৰ 38%",
    riceEarningsPercent: "উপাৰ্জনৰ 34%",
    potatoEarningsPercent: "উপাৰ্জনৰ 28%",

    paymentActivity: "পেমেণ্ট কাৰ্যকলাপ",
    recentTransactions: "শেহতীয়া লেনদেন",

    paid: "পেমেণ্ট কৰা হৈছে",

    paymentAccount: "পেমেণ্ট একাউণ্ট",
    settlementInformation: "পেমেণ্ট নিষ্পত্তিৰ তথ্য",

    nextSettlement: "পৰৱৰ্তী নিষ্পত্তি",
    pendingAmount: "বাকী থকা পৰিমাণ",
    paymentMethod: "পেমেণ্ট পদ্ধতি",
    bankTransfer: "বেংক ট্ৰেন্সফাৰ",

    viewPaymentDetails: "💰 পেমেণ্টৰ বিৱৰণ চাওক",

    // BUYER DASHBOARD

    buyerAccount: "ক্ৰেতাৰ একাউণ্ট",

    myOrders: "মোৰ অৰ্ডাৰ",
    deliveries: "ডেলিভাৰী",
    payments: "পেমেণ্ট",

    buyerPortal: "ক্ৰেতা প'ৰ্টেল",
    welcomeBack: "পুনৰ স্বাগতম,",
    buyerDashboardDescription:
        "কৃষক আৰু FPOসমূহৰ পৰা পোনপটীয়াকৈ সতেজ উৎপাদন লাভ কৰক।",

    totalPurchases: "মুঠ ক্ৰয়",
    thisMonth: "এই মাহত",

    threeActive: "3টা সক্ৰিয়",
    activeOrders: "সক্ৰিয় অৰ্ডাৰ",
    ordersInProgress: "অৰ্ডাৰ প্ৰক্ৰিয়াধীন",

    fourNew: "+4 নতুন",
    savedFarmers: "সংৰক্ষিত কৃষক",
    trustedSuppliers: "বিশ্বাসযোগ্য যোগানকাৰী",

    onTime: "সময়মতে",
    deliveries: "ডেলিভাৰী",
    deliverySuccessRate: "ডেলিভাৰী সফলতাৰ হাৰ",

    recommendedProduce: "পৰামৰ্শ দিয়া উৎপাদন",
    viewMarketplace: "মাৰ্কেটপ্লেচ চাওক →",
    buy: "ক্ৰয় কৰক",

    kgAvailable800: "800 কিলোগ্ৰাম উপলব্ধ",
    kgAvailable1200: "1,200 কিলোগ্ৰাম উপলব্ধ",
    kgAvailable650: "650 কিলোগ্ৰাম উপলব্ধ",

    smartBuying: "স্মাৰ্ট ক্ৰয়",
    tomatoDemandExpected:
        "আগন্তুক 14 দিনত বিলাহীৰ চাহিদা বৃদ্ধি পোৱাৰ আশা কৰা হৈছে।",

    purchaseTomatoEarly:
        "সম্ভাৱ্য মূল্য বৃদ্ধিৰ পৰা বাচিবলৈ বিলাহীৰ ষ্টক আগতীয়াকৈ ক্ৰয় কৰাৰ কথা বিবেচনা কৰক।",

    viewAIInsights: "AI তথ্য চাওক →",

    yourActivity: "আপোনাৰ কাৰ্যকলাপ",

    inTransit: "বাটত আছে",
    delivered: "ডেলিভাৰী সম্পূৰ্ণ",
    processing: "প্ৰক্ৰিয়াধীন",

    activeDelivery: "সক্ৰিয় ডেলিভাৰী",
    you: "আপুনি",
    estimatedArrival: "অনুমানিত আগমনৰ সময়",
    distance: "দূৰত্ব",
    trackDelivery: "🚚 ডেলিভাৰী ট্ৰেক কৰক",

    farmerNetwork: "কৃষক নেটৱৰ্ক",
    farmersTitle: "কৃষক 👨‍🌾",
    farmerNetworkDescription:
        "বিশ্বাসযোগ্য স্থানীয় কৃষকসকলক বিচাৰি উলিয়াওক আৰু তেওঁলোকৰ সৈতে সংযোগ স্থাপন কৰক।",

    availableFarmers: "উপলব্ধ কৃষক",
    verifiedFarmers: "পৰীক্ষিত কৃষক",
    yourTrustedSuppliers: "আপোনাৰ বিশ্বাসযোগ্য যোগানকাৰী",
    nearbyFarmers: "ওচৰৰ কৃষক",
    withinYourRegion: "আপোনাৰ অঞ্চলৰ ভিতৰত",

    fpos: "FPOs",
    farmerOrganizations: "কৃষক সংগঠন",

    localFarmers: "স্থানীয় কৃষক",
    trustedFarmers: "বিশ্বাসযোগ্য কৃষক 👨‍🌾",
    verifiedFarmersDirectPurchase:
        "পোনপটীয়া ক্ৰয়ৰ বাবে পৰীক্ষিত কৃষক উপলব্ধ",

    verifiedNetwork: "✓ পৰীক্ষিত নেটৱৰ্ক",

    view: "চাওক",

    purchaseManagement: "ক্ৰয় পৰিচালনা",
    trackManagePurchases:
        "স্থানীয় কৃষকৰ পৰা কৰা সকলো ক্ৰয় ট্ৰেক আৰু পৰিচালনা কৰক।",

    farmerDirect: "🌱 কৃষকৰ পৰা পোনপটীয়া ক্ৰয়",
    secureOrders: "🔒 সুৰক্ষিত অৰ্ডাৰ",
    trackable: "🚚 ট্ৰেক কৰিব পৰা যায়",

    orderHub: "অৰ্ডাৰ হাব",
    allPurchasesOnePlace: "সকলো ক্ৰয় এটা ঠাইতে",

    orderHistory: "অৰ্ডাৰৰ ইতিহাস",
    yourOrders: "আপোনাৰ অৰ্ডাৰ",
    noOrdersYet: "এতিয়ালৈ কোনো অৰ্ডাৰ নাই",
    placedOrdersAppearHere:
        "আপোনাৰ দ্বাৰা দিয়া অৰ্ডাৰসমূহ ইয়াত দেখা যাব।",

    footerDescription:
        "এটা স্মাৰ্ট আৰু ন্যায্য কৃষি মাৰ্কেটপ্লেচ নিৰ্মাণ।",
    footerCopyright:
        "© 2026 KisanDirect • SIH প্ৰ'ট'টাইপ",

    // LOGIN

    loginToContinue:
        "KisanDirect-ত আগবাঢ়িবলৈ লগইন কৰক",
    mobileNumber: "ম'বাইল নম্বৰ",
    password: "পাছৱৰ্ড",
    rememberMe: "মোক মনত ৰাখক",
    forgotPassword: "পাছৱৰ্ড পাহৰিলে?",
    loginButton: "লগইন →",

    newToKisanDirect: "KisanDirect-ত নতুন নেকি?",
    createAccount: "একাউণ্ট সৃষ্টি কৰক",

    prototypeDemo: "প্ৰ'ট'টাইপ ডেমো",
    localAccountLogin:
        "আপুনি স্থানীয়ভাৱে একাউণ্ট সৃষ্টি কৰি লগইন কৰিব পাৰে।",

    back: "← পিছলৈ",
    joinKisanDirect: "KisanDirect-ৰ সৈতে যোগদান কৰক",
    howUsePlatform:
        "আপুনি প্লেটফৰ্মটো কেনেকৈ ব্যৱহাৰ কৰিব বিচাৰে?",

    farmerFpoAccount: "মই কৃষক / FPO",
    farmerAccountDescription:
        "পোনপটীয়াকৈ উৎপাদন বিক্ৰী কৰক, অৰ্ডাৰ লাভ কৰক আৰু AI বজাৰ তথ্য ব্যৱহাৰ কৰক।",

    buyerAccountOption: "মই ক্ৰেতা",
    buyerAccountDescription:
        "পৰীক্ষিত কৃষক আৰু FPOসমূহৰ পৰা পোনপটীয়াকৈ সতেজ উৎপাদন ক্ৰয় কৰক।",

    createFarmerAccount: "কৃষকৰ একাউণ্ট সৃষ্টি কৰক",
    startSellingDirectly:
        "KisanDirect-ৰ জৰিয়তে পোনপটীয়াকৈ বিক্ৰী আৰম্ভ কৰক",

    fullName: "সম্পূৰ্ণ নাম",
    villageCity: "গাঁও / চহৰ",
    district: "জিলা",
    state: "ৰাজ্য",
    primaryCrop: "মুখ্য শস্য",
    createPassword: "পাছৱৰ্ড সৃষ্টি কৰক",
    createFarmerAccountButton:
        "কৃষকৰ একাউণ্ট সৃষ্টি কৰক →",

    createBuyerAccount: "ক্ৰেতাৰ একাউণ্ট সৃষ্টি কৰক",
    sourceDirectlyFromFarmers:
        "কৃষকৰ পৰা পোনপটীয়াকৈ উৎপাদন লাভ কৰক",
    nameBusinessName: "নাম / ব্যৱসায়ৰ নাম",
    buyerType: "ক্ৰেতাৰ প্ৰকাৰ",
    location: "স্থান",
    createBuyerAccountButton:
        "ক্ৰেতাৰ একাউণ্ট সৃষ্টি কৰক →",

    accountCreated: "একাউণ্ট সৃষ্টি হৈছে!",
    accountCreatedSuccessfully:
        "আপোনাৰ KisanDirect একাউণ্ট সফলভাৱে সৃষ্টি কৰা হৈছে।",
    continueToLogin: "লগইন কৰিবলৈ আগবাঢ়ক →",

    // ADD PRODUCE

    farmManagement: "কৃষি পৰিচালনা",
    addNewProduce: "নতুন উৎপাদন যোগ কৰক 🌾",
    listFreshProduce:
        "গ্ৰাহক আৰু পাইকাৰী ক্ৰেতাৰ বাবে আপোনাৰ সতেজ উৎপাদন পোনপটীয়াকৈ তালিকাভুক্ত কৰক।",

    produceName: "উৎপাদনৰ নাম",
    category: "শ্ৰেণী",
    qualityGrade: "গুণগত মানৰ গ্ৰেড",
    quantityAvailable: "উপলব্ধ পৰিমাণ",
    unit: "একক",
    pricePerKg: "প্ৰতি কিলোগ্ৰাম মূল্য",
    farmPickupLocation: "খেতি / পিকআপ স্থান",
    availableFrom: "উপলব্ধতাৰ আৰম্ভণি",
    cancel: "বাতিল কৰক",
    listProduce: "🌾 উৎপাদন তালিকাভুক্ত কৰক",

    // KISAN AI

    kisanDirectAIAssistant: "KISANDIRECT AI সহায়ক",
    kisanAIAnalysis: "KisanAI বিশ্লেষণ",
    smartGuidance:
        "বৰ্তমানৰ শস্যৰ তথ্যৰ ওপৰত ভিত্তি কৰি স্মাৰ্ট নিৰ্দেশনা।",
    selectedCrop: "নিৰ্বাচিত শস্য",
    supply: "📦 যোগান",
    maintainSupplyMonitorMarket:
        "বৰ্তমানৰ যোগানৰ স্তৰ বজাই ৰাখক আৰু বজাৰৰ পৰিস্থিতিৰ ওপৰত নজৰ ৰাখক।",
    gotIt: "বুজিলোঁ ✓"
},

ur: {
    home: "ہوم",
    marketplace: "مارکیٹ پلیس",
    howItWorks: "یہ کیسے کام کرتا ہے",
    aiSolutions: "AI حل",
    login: "لاگ اِن",
    joinNow: "ابھی شامل ہوں",

    badge: "AI سے چلنے والی زرعی مارکیٹ",
    heroTitle1: "کھیت سے",
    heroTitle2: "براہِ راست",
    heroTitle3: "مارکیٹ تک۔",
    heroText:
        "KisanDirect کسانوں اور FPOs کو براہِ راست صارفین اور تھوک خریداروں سے جوڑتا ہے، جس سے کسانوں کو بہتر قیمت ملتی ہے اور سپلائی چین کے مسائل کم ہوتے ہیں۔",

    explore: "مارکیٹ دیکھیں",
    joinFarmer: "کسان کے طور پر شامل ہوں",

    smartAgriculture: "اسمارٹ زراعت",
    smartText:
        "کسانوں، خریداروں اور لاجسٹکس کو ایک پلیٹ فارم پر جوڑنا۔",

    aiMarket: "AI مارکیٹ انٹیلی جنس",
    demand: "اگلے 14 دنوں میں متوقع طلب میں اضافہ",
    recommendation: "AI سفارش",

    farmers: "کسان",
    buyers: "خریدار",
    states: "ریاستیں",
    farmerSales: "کسانوں کی فروخت",

    farmer: "کسان",
    buyer: "خریدار",

    freshFromFarm: "کھیت سے تازہ",
    farmerMarketplace: "کسان مارکیٹ",
    marketText:
        "کسانوں سے براہِ راست تازہ پیداوار شفاف قیمتوں پر خریدیں۔",

    whyKisanDirect: "KisanDirect کیوں",
    smarterSupplyChain: "ایک بہتر زرعی سپلائی چین۔",

    directMarketplace: "براہِ راست مارکیٹ",
    directMarketplaceText:
        "کسانوں کو براہِ راست صارفین اور تھوک خریداروں سے جوڑیں۔",

    aiDemandForecasting: "AI طلب کی پیش گوئی",
    aiDemandForecastingText:
        "مستقبل کی طلب کی پیش گوئی کریں اور کسانوں کو بہتر فروخت کے فیصلے کرنے میں مدد دیں۔",

    smartLogistics: "اسمارٹ لاجسٹکس",
    smartLogisticsText:
        "راستوں کو بہتر بنائیں اور نقل و حمل کے اخراجات کم کریں۔",

    betterPrices: "بہتر قیمتیں",
    betterPricesText:
        "غیر ضروری درمیانی افراد کو کم کریں اور کسانوں کی آمدنی بڑھائیں۔",

    artificialIntelligence: "مصنوعی ذہانت",

    predictOptimize:
        "طلب کی پیش گوئی کریں۔ سپلائی کو بہتر بنائیں۔",

    aiEngineText:
        "ہمارا AI انجن مارکیٹ کے رجحانات، تاریخی طلب اور خریداروں کی سرگرمیوں کا تجزیہ کرکے کسانوں کو یہ فیصلہ کرنے میں مدد کرتا ہے کہ کیا فروخت کرنا ہے، کب فروخت کرنا ہے اور کہاں بھیجنا ہے۔",

    exploreAIInsights: "AI معلومات دیکھیں →",

    demandForecast: "طلب کی پیش گوئی",
    liveDemo: "● لائیو ڈیمو",
    expectedDemandGrowth: "متوقع طلب میں اضافہ",

    farmerAccount: "کسان اکاؤنٹ",

    dashboard: "ڈیش بورڈ",
    myProduce: "میری پیداوار",
    orders: "آرڈرز",
    aiInsights: "AI معلومات",
    logistics: "لاجسٹکس",
    earnings: "آمدنی",
    settings: "ترتیبات",
    logout: "لاگ آؤٹ",

    farmerPortal: "کسان پورٹل",
    goodMorning: "صبح بخیر،",
    farmTodayMessage:
        "آج آپ کے کھیت میں کیا ہو رہا ہے، یہاں دیکھیں۔",

    totalSales: "کل فروخت",
    comparedLastMonth: "گزشتہ ماہ کے مقابلے میں",

    activeOrders: "فعال آرڈرز",
    readyForDispatch: "ڈسپیچ کے لیے 4 تیار",

    produceListed: "درج شدہ پیداوار",
    availableForBuyers: "خریداروں کے لیے دستیاب",

    avgPrice: "اوسط قیمت",
    betterThanMandi: "منڈی سے بہتر",

    aiMarketIntelligence: "AI مارکیٹ انٹیلی جنس",
    demandForecast: "طلب کی پیش گوئی",
    liveDemo: "• لائیو ڈیمو",
    expectedDemandGrowth: "متوقع طلب میں اضافہ",
    highDemand: "زیادہ طلب ↑",

    aiRecommendation: "AI سفارش",
    tomatoRecommendation:
        "اگلے 14 دنوں میں ٹماٹر کی طلب بڑھ سکتی ہے۔ سپلائی میں 15% اضافہ کرنے پر غور کریں۔",

    quickActions: "فوری اقدامات",
    manageFarm: "کھیت کا انتظام",

    listProduce: "پیداوار درج کریں",
    sellYourCrops: "اپنی فصلیں فروخت کریں",

    viewOrders: "آرڈرز دیکھیں",
    manageOrders: "آرڈرز کا انتظام کریں",

    trackDelivery: "ڈیلیوری ٹریک کریں",
    viewShipments: "شپمنٹس دیکھیں",

    aiInsights: "AI معلومات",
    marketPredictions: "مارکیٹ کی پیش گوئیاں",

    recentActivity: "حالیہ سرگرمی",
    recentOrders: "حالیہ آرڈرز",
    viewAll: "سب دیکھیں →",

    inTransit: "راستے میں",
    delivered: "ڈیلیوری ہو گئی",
    processing: "زیرِ عمل",

    farmerAccount: "کسان اکاؤنٹ",

    market: "مارکیٹ",
    todaysPrices: "آج کی قیمتیں",

    salesManagement: "فروخت کا انتظام",
    ordersReceived: "موصول شدہ آرڈرز 📦",
    manageBuyerOrders:
        "خریداروں کی جانب سے دیے گئے آرڈرز دیکھیں اور ان کا انتظام کریں۔",

    totalOrders: "کل آرڈرز",
    pending: "زیرِ التوا",
    completed: "مکمل",
    totalSales: "کل فروخت",

    recentOrders: "حالیہ آرڈرز",
    buyerOrders: "خریداروں کے آرڈرز",
    noOrdersYet: "ابھی تک کوئی آرڈر نہیں",
    buyerOrdersAppearHere:
        "خریداروں کی جانب سے دیے گئے آرڈرز یہاں نظر آئیں گے۔",

    // AI INSIGHTS PAGE

    artificialIntelligence: "مصنوعی ذہانت",
    aiFarmingIntelligence: "AI زرعی ذہانت",
    aiDescription:
        "اسمارٹ مارکیٹ کی پیش گوئیوں کے ذریعے فیصلہ کریں کہ کیا اگانا ہے، کب فروخت کرنا ہے اور کتنا اسٹاک رکھنا ہے۔",

    aiActive: "AI فعال",

    analyseYourCrop: "اپنی فصل کا تجزیہ کریں",
    selectCropForInsights:
        "AI معلومات دیکھنے کے لیے فصل منتخب کریں",

    crop: "فصل",
    tomato: "ٹماٹر",
    potato: "آلو",
    onion: "پیاز",
    rice: "چاول",

    gradeA: "گریڈ A",
    fresh: "تازہ",
    premium: "پریمیم",

    expectedDemand: "متوقع طلب",
    next14Days: "اگلے 14 دن",

    priceTrend: "قیمت کا رجحان",
    rising: "بڑھ رہا ہے",
    highConfidence: "زیادہ اعتماد",

    bestOpportunity: "بہترین موقع",
    highDemandCrop: "زیادہ طلب والی فصل",

    supply: "سپلائی",
    marketOutlook: "مارکیٹ کا جائزہ",

    forecastPeriod: "پیش گوئی کی مدت",
    days14: "14 دن",
    confidence: "اعتماد",

    aiMarketIntelligenceTitle: "AI مارکیٹ انٹیلی جنس",
    demandForecastTitle: "طلب کی پیش گوئی",

    aiPredictionDescription:
        "تاریخی مارکیٹ کے رجحانات، خریداروں کی سرگرمی اور موسمی نمونوں کے سمیولیشن کی بنیاد پر AI پیش گوئی۔",

    expectedDemandGrowth: "متوقع طلب میں اضافہ",
    highDemand: "زیادہ طلب",

    now: "ابھی",
    days7: "7 دن",

    aiQuickInsight: "AI فوری معلومات",

    tomatoDemandInsight:
        "اگلے 14 دنوں میں ٹماٹر کی طلب بڑھنے کی توقع ہے۔",

    considerIncreasingSupply:
        "مارکیٹ کی قیمتوں پر نظر رکھتے ہوئے سپلائی بڑھانے پر غور کریں۔",

    aiConfidence: "AI اعتماد",
    predictionConfidence: "پیش گوئی کا اعتماد",

    basedOnMarketData:
        "تاریخی مارکیٹ کے رجحانات، خریداروں کی سرگرمی اور موسمی طلب کے نمونوں کے سمیولیشن کی بنیاد پر۔",

    priceTrend: "قیمت کا رجحان",
    rising: "↑ بڑھ رہا ہے",
    highConfidence: "زیادہ اعتماد",

    bestOpportunity: "بہترین موقع",
    highDemandCrop: "زیادہ طلب والی فصل",
    recommendedSupply: "تجویز کردہ سپلائی",
    suggestedIncrease: "تجویز کردہ اضافہ",

    aiRecommendations: "AI سفارشات",
    whatShouldYouDo: "آپ کو کیا کرنا چاہیے؟ 💡",
    actionableSuggestions:
        "موجودہ مارکیٹ کی صورتحال کی بنیاد پر سفارشات۔",

    high: "زیادہ",
    medium: "درمیانہ",

    increaseTomatoSupply: "ٹماٹر کی سپلائی بڑھائیں",
    tomatoDemandIncrease:
        "اگلے 14 دنوں میں ٹماٹر کی طلب بڑھنے کا امکان ہے۔",
    recommended: "تجویز کردہ",

    monitorPrices: "قیمتوں پر نظر رکھیں",
    marketPricesUpward:
        "زیادہ طلب والی فصلوں کی مارکیٹ قیمتوں میں اضافے کا رجحان دیکھا جا رہا ہے۔",
    opportunity: "موقع",

    trackMarketPrices: "مارکیٹ کی قیمتیں ٹریک کریں →",

    planInventory: "انوینٹری کی منصوبہ بندی کریں",
    maintainSufficientStock:
        "آنے والے خریداروں کی طلب پوری کرنے کے لیے کافی اسٹاک رکھیں۔",
    priority: "ترجیح",

    planInventoryButton: "انوینٹری کی منصوبہ بندی کریں →",
    viewSupplyPlan: "سپلائی پلان دیکھیں →",

    kisanAiAssistant: "کسان AI اسسٹنٹ",
    needHelpDeciding: "فیصلہ کرنے میں مدد چاہیے؟",
    askKisanAiDescription:
        "فصل، قیمت، طلب یا اپنے اگلے زرعی فیصلے کے بارے میں KisanAI سے پوچھیں۔",
    askKisanAI: "KisanAI سے پوچھیں",

    explainableAI: "قابلِ وضاحت AI",
    whyThisPrediction: "یہ پیش گوئی کیوں؟ 🧠",
    understandSignals:
        "AI سفارش کے پیچھے موجود اشاروں کو سمجھیں۔",
    viewReasoning: "وجہ دیکھیں",

    buyerActivityIncreased: "خریداروں کی سرگرمی میں اضافہ ہوا ہے",
    buyerActivityDescription:
        "سمولیٹڈ خریداروں کی سرگرمی مثبت طلب کے اشارے دکھا رہی ہے۔",

    historicalDemandRising: "تاریخی طلب بڑھ رہی ہے",
    historicalDemandDescription:
        "ماضی کے مارکیٹ پیٹرنز ٹماٹر کی بڑھتی ہوئی طلب کے اشارے دے رہے ہیں۔",

    marketPricesFavorable: "مارکیٹ کی قیمتیں سازگار ہیں",
    marketPricesDescription:
        "موجودہ سمولیٹڈ قیمتیں فروخت کے لیے مثبت موقع دکھا رہی ہیں۔",

    seasonalPatternDetected: "موسمی پیٹرن کی نشاندہی ہوئی ہے",
    seasonalPatternDescription:
        "تاریخی ڈیٹا میں اسی طرح کے موسمی طلب کے پیٹرنز دیکھے گئے ہیں۔",

    aiPrototypeMode: "AI پروٹوٹائپ موڈ",
    simulatedDataNotice:
        "یہ پیش گوئیاں فی الحال KisanDirect SIH پروٹوٹائپ کے لیے سمولیٹڈ ڈیٹا استعمال کر رہی ہیں۔",
    analysisReady: "● تجزیہ تیار ہے",

    farmManagement: "زرعی انتظام",
    myProduce: "میری پیداوار 🌾",
    manageCrops:
        "اپنی فصلوں، قیمتوں اور دستیاب اسٹاک کا انتظام کریں۔",
    addProduce: "+ پیداوار شامل کریں",
    totalListings: "کل فہرستیں",
    activeProduceListings: "فعال پیداوار کی فہرستیں",
    totalStock: "کل اسٹاک",
    availableForBuyers: "خریداروں کے لیے دستیاب",
    todaysSales: "آج کی فروخت",
    fromDirectBuyers: "براہِ راست خریداروں سے",
    averagePrice: "اوسط قیمت",
    perKilogram: "فی کلوگرام",
    inventory: "انوینٹری",
    yourProduce: "آپ کی پیداوار",
    produce: "پیداوار",
    quantity: "مقدار",
    price: "قیمت",
    status: "حیثیت",
    action: "کارروائی",
    freshTomato: "تازہ ٹماٹر",
    gradeARanchi: "گریڈ A • رانچی",
    active: "فعال",
    edit: "ترمیم کریں",
    premiumRice: "پریمیم چاول",
    premiumPotato: "پریمیم آلو",

    // Earnings & Payments

    financialManagement: "مالیاتی انتظام",
    earningsPayments: "آمدنی اور ادائیگیاں 💰",
    trackFarmIncome:
        "اپنی زرعی آمدنی، ادائیگیوں اور مالی کارکردگی کو ٹریک کریں۔",

    totalEarnings: "کل آمدنی",
    lifetimeFarmEarnings: "اب تک کی کل زرعی آمدنی",

    thisMonth: "اس ماہ",
    earningsInAugust: "اگست کی آمدنی",

    twoPayments: "2 ادائیگیاں",
    pendingPayments: "زیرِ التوا ادائیگیاں",
    awaitingBuyerPayment: "خریدار کی ادائیگی کا انتظار ہے",

    available: "دستیاب",
    availableBalance: "دستیاب بیلنس",
    readyForWithdrawal: "رقم نکالنے کے لیے تیار",

    earningsOverview: "آمدنی کا جائزہ",
    monthlyEarnings: "ماہانہ آمدنی",

    cropPerformance: "فصل کی کارکردگی",
    earningsByCrop: "فصل کے لحاظ سے آمدنی",

    tomatoEarningsPercent: "آمدنی کا 38%",
    riceEarningsPercent: "آمدنی کا 34%",
    potatoEarningsPercent: "آمدنی کا 28%",

    paymentActivity: "ادائیگی کی سرگرمی",
    recentTransactions: "حالیہ لین دین",

    paid: "ادائیگی کر دی گئی",

    paymentAccount: "ادائیگی اکاؤنٹ",
    settlementInformation: "ادائیگی کی تصفیہ معلومات",

    nextSettlement: "اگلی تصفیہ",
    pendingAmount: "زیرِ التوا رقم",
    paymentMethod: "ادائیگی کا طریقہ",
    bankTransfer: "بینک ٹرانسفر",

    viewPaymentDetails: "💰 ادائیگی کی تفصیلات دیکھیں",

    // BUYER DASHBOARD

    buyerAccount: "خریدار اکاؤنٹ",

    myOrders: "میرے آرڈرز",
    deliveries: "ڈیلیوری",
    payments: "ادائیگیاں",

    buyerPortal: "خریدار پورٹل",
    welcomeBack: "دوبارہ خوش آمدید،",
    buyerDashboardDescription:
        "کسانوں اور FPOs سے براہِ راست تازہ پیداوار حاصل کریں۔",

    totalPurchases: "کل خریداری",
    thisMonth: "اس ماہ",

    threeActive: "3 فعال",
    activeOrders: "فعال آرڈرز",
    ordersInProgress: "آرڈرز زیرِ عمل ہیں",

    fourNew: "+4 نئے",
    savedFarmers: "محفوظ کیے گئے کسان",
    trustedSuppliers: "قابلِ اعتماد سپلائرز",

    onTime: "وقت پر",
    deliveries: "ڈیلیوری",
    deliverySuccessRate: "ڈیلیوری کی کامیابی کی شرح",

    recommendedProduce: "تجویز کردہ پیداوار",
    viewMarketplace: "مارکیٹ پلیس دیکھیں →",
    buy: "خریدیں",

    kgAvailable800: "800 کلوگرام دستیاب",
    kgAvailable1200: "1,200 کلوگرام دستیاب",
    kgAvailable650: "650 کلوگرام دستیاب",

    smartBuying: "اسمارٹ خریداری",
    tomatoDemandExpected:
        "اگلے 14 دنوں میں ٹماٹر کی طلب بڑھنے کی توقع ہے۔",

    purchaseTomatoEarly:
        "ممکنہ قیمت میں اضافے سے بچنے کے لیے ٹماٹر کا اسٹاک پہلے خریدنے پر غور کریں۔",

    viewAIInsights: "AI معلومات دیکھیں →",

    yourActivity: "آپ کی سرگرمی",

    inTransit: "راستے میں",
    delivered: "ڈیلیوری ہو گئی",
    processing: "زیرِ عمل",

    activeDelivery: "فعال ڈیلیوری",
    you: "آپ",
    estimatedArrival: "متوقع آمد",
    distance: "فاصلہ",
    trackDelivery: "🚚 ڈیلیوری ٹریک کریں",

    farmerNetwork: "کسان نیٹ ورک",
    farmersTitle: "کسان 👨‍🌾",
    farmerNetworkDescription:
        "قابلِ اعتماد مقامی کسانوں کو تلاش کریں اور ان سے جڑیں۔",

    availableFarmers: "دستیاب کسان",
    verifiedFarmers: "تصدیق شدہ کسان",
    yourTrustedSuppliers: "آپ کے قابلِ اعتماد سپلائرز",
    nearbyFarmers: "قریبی کسان",
    withinYourRegion: "آپ کے علاقے میں",

    fpos: "FPOs",
    farmerOrganizations: "کسان تنظیمیں",

    localFarmers: "مقامی کسان",
    trustedFarmers: "قابلِ اعتماد کسان 👨‍🌾",
    verifiedFarmersDirectPurchase:
        "براہِ راست خریداری کے لیے تصدیق شدہ کسان دستیاب ہیں",

    verifiedNetwork: "✓ تصدیق شدہ نیٹ ورک",

    view: "دیکھیں",

    purchaseManagement: "خریداری کا انتظام",
    trackManagePurchases:
        "مقامی کسانوں سے کی گئی تمام خریداریوں کو ٹریک اور منظم کریں۔",

    farmerDirect: "🌱 کسانوں سے براہِ راست خریداری",
    secureOrders: "🔒 محفوظ آرڈرز",
    trackable: "🚚 ٹریک کیا جا سکتا ہے",

    orderHub: "آرڈر ہب",
    allPurchasesOnePlace: "تمام خریداری ایک ہی جگہ",

    orderHistory: "آرڈر کی تاریخ",
    yourOrders: "آپ کے آرڈرز",
    noOrdersYet: "ابھی تک کوئی آرڈر نہیں",
    placedOrdersAppearHere:
        "آپ کے دیے گئے آرڈرز یہاں نظر آئیں گے۔",

    footerDescription:
        "ایک اسمارٹ اور منصفانہ زرعی مارکیٹ پلیس کی تعمیر۔",
    footerCopyright:
        "© 2026 KisanDirect • SIH پروٹوٹائپ",

    // LOGIN

    loginToContinue:
        "KisanDirect پر جاری رکھنے کے لیے لاگ اِن کریں",
    mobileNumber: "موبائل نمبر",
    password: "پاس ورڈ",
    rememberMe: "مجھے یاد رکھیں",
    forgotPassword: "پاس ورڈ بھول گئے؟",
    loginButton: "لاگ اِن →",

    newToKisanDirect: "KisanDirect پر نئے ہیں؟",
    createAccount: "اکاؤنٹ بنائیں",

    prototypeDemo: "پروٹوٹائپ ڈیمو",
    localAccountLogin:
        "آپ مقامی طور پر اکاؤنٹ بنا کر لاگ اِن کر سکتے ہیں۔",

    back: "← واپس",
    joinKisanDirect: "KisanDirect کے ساتھ شامل ہوں",
    howUsePlatform:
        "آپ پلیٹ فارم کو کس طرح استعمال کرنا چاہتے ہیں؟",

    farmerFpoAccount: "میں کسان / FPO ہوں",
    farmerAccountDescription:
        "براہِ راست پیداوار فروخت کریں، آرڈرز حاصل کریں اور AI مارکیٹ کی معلومات استعمال کریں۔",

    buyerAccountOption: "میں خریدار ہوں",
    buyerAccountDescription:
        "تصدیق شدہ کسانوں اور FPOs سے براہِ راست تازہ پیداوار خریدیں۔",

    createFarmerAccount: "کسان اکاؤنٹ بنائیں",
    startSellingDirectly:
        "KisanDirect کے ذریعے براہِ راست فروخت شروع کریں",

    fullName: "پورا نام",
    villageCity: "گاؤں / شہر",
    district: "ضلع",
    state: "ریاست",
    primaryCrop: "اہم فصل",
    createPassword: "پاس ورڈ بنائیں",
    createFarmerAccountButton:
        "کسان اکاؤنٹ بنائیں →",

    createBuyerAccount: "خریدار اکاؤنٹ بنائیں",
    sourceDirectlyFromFarmers:
        "کسانوں سے براہِ راست پیداوار حاصل کریں",
    nameBusinessName: "نام / کاروبار کا نام",
    buyerType: "خریدار کی قسم",
    location: "مقام",
    createBuyerAccountButton:
        "خریدار اکاؤنٹ بنائیں →",

    accountCreated: "اکاؤنٹ بن گیا!",
    accountCreatedSuccessfully:
        "آپ کا KisanDirect اکاؤنٹ کامیابی سے بنا دیا گیا ہے۔",
    continueToLogin: "لاگ اِن کرنے کے لیے آگے بڑھیں →",

    // ADD PRODUCE

    farmManagement: "زرعی انتظام",
    addNewProduce: "نئی پیداوار شامل کریں 🌾",
    listFreshProduce:
        "صارفین اور تھوک خریداروں کے لیے اپنی تازہ پیداوار براہِ راست درج کریں۔",

    produceName: "پیداوار کا نام",
    category: "زمرہ",
    qualityGrade: "معیار کا گریڈ",
    quantityAvailable: "دستیاب مقدار",
    unit: "اکائی",
    pricePerKg: "فی کلوگرام قیمت",
    farmPickupLocation: "کھیت / پک اپ مقام",
    availableFrom: "دستیابی شروع",
    cancel: "منسوخ کریں",
    listProduce: "🌾 پیداوار درج کریں",

    // KISAN AI

    kisanDirectAIAssistant: "KISANDIRECT AI اسسٹنٹ",
    kisanAIAnalysis: "KisanAI تجزیہ",
    smartGuidance:
        "موجودہ فصل کی معلومات کی بنیاد پر اسمارٹ رہنمائی۔",
    selectedCrop: "منتخب فصل",
    supply: "📦 سپلائی",
    maintainSupplyMonitorMarket:
        "موجودہ سپلائی کی سطح برقرار رکھیں اور مارکیٹ کی صورتحال پر نظر رکھیں۔",
    gotIt: "سمجھ گیا ✓"
},





};


function changeLanguage(language) {

    console.log("Selected language:", language);

    const t = translations[language];

    if (!t) return;


    /* NAVBAR */

    document.querySelectorAll("[data-i18n]").forEach(function(element) {

        const key = element.getAttribute("data-i18n");

        if (t[key]) {
            element.textContent = t[key];
        }

    });

}