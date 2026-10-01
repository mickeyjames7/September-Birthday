const SUPABASE_URL =
    "https://cbbomvzwojpdqadgmwrl.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_o6jRIe8olnK90IkEq3j2OA_jINwJm35";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

console.log("SUPABASE CONNECTED");
(function() {

    console.log("JAVASCRIPT STARTED");


    // =========================
    // BIRTHDAY SURPRISE
    // =========================

    let surpriseActivated = false;

    let birthdayMessages = [
        "Let's turn UP for The BIG 10!",
        "The Number 1, Not the 2 :P",
        "Happy Birthday September!",
        "Thank you for blessing our lives with your presence!",
        "We love you so much and are so proud of you!",
        "Wishing you a day filled with love, laughter, and all your favorite things!",
        "Remember all the fun times we've had together! Here's to many more amazing memories.",
        "Thank you for being the best daughter ever and the coolest kid I know :P",
        "WOW! THE BIG 10!"
    ];


    function birthdaySurprise() {

        if (surpriseActivated === true) {
            return;
        }

        surpriseActivated = true;

        let randomIndex = Math.floor(Math.random() * birthdayMessages.length);

        let randomMessage = birthdayMessages[randomIndex];

        document.body.classList.add("disco");

        let surpriseMessage = document.getElementById("surpriseMessage");
        let birthdayButton = document.getElementById("birthdayButton");

        surpriseMessage.innerText = randomMessage;

        surpriseMessage.classList.add("specialMessage");

        surpriseMessage.style.opacity = "1";

        surpriseMessage.style.transform = "scale(1.3) rotate(360deg)";

        surpriseMessage.style.color = "whitesmoke";

        surpriseMessage.style.fontSize = "75px";

        birthdayButton.innerText = "Surprise Activated!";

        birthdayButton.style.backgroundColor = "purple";

        birthdayButton.style.fontSize = "30px";

        birthdayButton.style.borderRadius = "10px";

        birthdayButton.style.transform = "translateY(-20px)";

        setTimeout(function() {

            surpriseMessage.style.transform = "scale(1)";

        }, 2500);

    }


    function resetSurprise() {

        surpriseActivated = false;

        let surpriseMessage = document.getElementById("surpriseMessage");

        let birthdayButton = document.getElementById("birthdayButton");

        surpriseMessage.innerText = "";

        surpriseMessage.classList.remove("specialMessage");

        surpriseMessage.style.opacity = "1";

        surpriseMessage.style.transform = "scale(1)";

        birthdayButton.innerText = "Click For Birthday Surprise!";

        birthdayButton.style.backgroundColor = "";

        birthdayButton.style.transform = "translateY(0)";

        birthdayButton.style.fontSize = "20px";

        document.body.style.backgroundColor = "";

        document.body.classList.remove("disco");

    }


    document.getElementById("birthdayButton")
        .addEventListener("click", birthdaySurprise);

    document.getElementById("resetButton")
        .addEventListener("click", resetSurprise);



    // =========================
    // BIRTHDAY GREETING
    // =========================

    function birthdaygreeting(name) {

        document.getElementById("greetingMessage").innerText =
            "Happy Birthday " + name + "!";

    }

    birthdaygreeting("Baby Girl");


    function birthdayinfo(name, age) {

        return "Happy Birthday " + name +
            "! You are now " + age + " years old!";

    }

    let birthdayMessage = birthdayinfo("September", 10);

    document.getElementById("greetingMessage").innerText =
        birthdayMessage;



    // =========================
    // AGE MESSAGE
    // =========================

    function displayBirthdayMessage(age) {

        if (age === 10) {

            return "WOW! THE BIG 10!";

        } else if (age === 11) {

            return "Welcome To 11!";

        } else {

            return "Happy Birthday!";

        }

    }


    let agemessage = displayBirthdayMessage(10);

    document.getElementById("ageMessage").innerText = agemessage;



    // =========================
    // FEATURE CARDS
    // =========================

    let selectedFeature = "";

    let featureCards =
        document.querySelectorAll(".feature-card");

    let featureTitle =
        document.getElementById("featureTitle");

    let featureDescription =
        document.getElementById("featureDescription");


    let featureInformation = {

        Family: {

            title: "Family ❤️",

            description:
                "Family will always be there to love, support, and encourage you."

        },

        Memories: {

            title: "Amazing Memories 📸",

            description:
                "Every year gives us new moments together that we can remember forever."

        },

        Future: {

            title: "Your Future 🚀",

            description:
                "You have an entire future ahead of you filled with possibilities and exciting adventures."

        }

    };


    featureCards.forEach(function(card) {

        card.addEventListener("click", function() {

            featureCards.forEach(function(otherCard) {

                otherCard.classList.remove("selected");

            });


            card.classList.add("selected");


            let featureKey =
                card.querySelector("h3").innerText;


            selectedFeature = featureKey;


            console.log(selectedFeature);


            featureTitle.innerText =
                featureInformation[featureKey].title;


            featureDescription.innerText =
                featureInformation[featureKey].description;

        });

    });



 // =========================
// PHOTO LIGHTBOX
// =========================

let galleryImages =
    document.querySelectorAll(".photo-grid img, .card-memory-grid img");

let lightbox =
    document.getElementById("lightbox");

let lightboxImage =
    document.getElementById("lightboxImage");

let lightboxClose =
    document.getElementById("lightboxClose");

let lightboxPrev =
    document.getElementById("lightboxPrev");

let lightboxNext =
    document.getElementById("lightboxNext");

let currentImageIndex = 0;


// OPEN LIGHTBOX

galleryImages.forEach(function(image) {

    image.addEventListener("click", function() {

        currentImageIndex =
            Array.from(galleryImages).indexOf(image);

        lightboxImage.src = image.src;

        lightbox.style.display = "flex";

    });

});


// PREVIOUS PHOTO

lightboxPrev.addEventListener("click", function(event) {

    event.stopPropagation();

    currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length)
        % galleryImages.length;

    lightboxImage.src =
        galleryImages[currentImageIndex].src;

});


// NEXT PHOTO

lightboxNext.addEventListener("click", function(event) {

    event.stopPropagation();

    currentImageIndex =
        (currentImageIndex + 1)
        % galleryImages.length;

    lightboxImage.src =
        galleryImages[currentImageIndex].src;

});


// CLOSE LIGHTBOX

lightboxClose.addEventListener("click", function() {

    lightbox.style.display = "none";

});


lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

        lightbox.style.display = "none";

    }

});


// KEYBOARD CONTROLS

document.addEventListener("keydown", function(event) {

    if (lightbox.style.display !== "flex") {
        return;
    }

    if (event.key === "ArrowLeft") {

        currentImageIndex =
            (currentImageIndex - 1 + galleryImages.length)
            % galleryImages.length;

        lightboxImage.src =
            galleryImages[currentImageIndex].src;

    }

    if (event.key === "ArrowRight") {

        currentImageIndex =
            (currentImageIndex + 1)
            % galleryImages.length;

        lightboxImage.src =
            galleryImages[currentImageIndex].src;

    }

    if (event.key === "Escape") {

        lightbox.style.display = "none";

    }

});

// =========================
// MOBILE MENU
// =========================

let menuToggle =
    document.getElementById("menuToggle");

let navLinks =
    document.querySelector(".nav-links");


menuToggle.addEventListener("click", function() {

    if (navLinks.style.display === "flex") {

        navLinks.style.display = "none";

    } else {

        navLinks.style.display = "flex";

    }

});


// CLOSE MENU WHEN LINK IS CLICKED

navLinks.querySelectorAll("a").forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.style.display = "none";

    });

});


console.log("LIGHTBOX CODE REACHED");

// =========================
// GUESTBOOK FORM
// =========================

let guestbookForm =
    document.getElementById("guestbookForm");

let guestbookStatus =
    document.getElementById("guestbookStatus");


guestbookForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    let guestName =
        document.getElementById("guestName").value.trim();

    let guestMessage =
        document.getElementById("guestMessage").value.trim();


    guestbookStatus.innerText =
        "Submitting your message...";


    let result =
    await supabaseClient
        .from("guestbook_messages")
        .insert([
            {
                name: guestName,
                message: guestMessage,
                status: "pending"
            }
        ]);


    if (result.error) {

        console.error(
            "GUESTBOOK ERROR:",
            result.error
        );

        guestbookStatus.innerText =
            "Sorry, there was a problem submitting your message.";

        return;
    }


    guestbookStatus.innerText =
        "❤️ Thank you! Your message has been submitted for review.";


    guestbookForm.reset();

});

let approvedMessageList = [];

let currentMessageIndex = 0;


async function loadApprovedMessages() {

    let approvedMessages =
        document.getElementById("approvedMessages");

    approvedMessages.innerHTML =
        "<p>Loading birthday messages...</p>";

    let result =
        await supabaseClient
            .from("guestbook_messages")
            .select("name, message, created_at")
            .eq("status", "approved")
            .order("created_at", {
                ascending: false
            });

    if (result.error) {

        console.error(
            "APPROVED MESSAGE ERROR:",
            result.error
        );

        approvedMessages.innerHTML =
            "<p>Unable to load birthday messages.</p>";

        return;
    }

    approvedMessageList = result.data;

    if (approvedMessageList.length === 0) {

        approvedMessages.innerHTML =
            "<p>No birthday messages yet. Be the first! ❤️</p>";

        return;
    }

    showApprovedMessage();
}

loadApprovedMessages();
function showApprovedMessage() {

    let approvedMessages =
        document.getElementById("approvedMessages");

    let message =
        approvedMessageList[currentMessageIndex];

    approvedMessages.innerHTML = "";

    let messageCard =
        document.createElement("div");

    messageCard.className =
        "approved-message-card";

    let name =
        document.createElement("h3");

    name.textContent =
        message.name;

    let text =
        document.createElement("p");

    text.textContent =
        message.message;

    messageCard.appendChild(name);
    messageCard.appendChild(text);

    approvedMessages.appendChild(messageCard);
}
document
    .getElementById("previousMessage")
    .addEventListener("click", function() {

        if (approvedMessageList.length === 0) {
            return;
        }

        currentMessageIndex--;

        if (currentMessageIndex < 0) {
            currentMessageIndex =
                approvedMessageList.length - 1;
        }

        showApprovedMessage();
    });


document
   document
    .getElementById("nextMessage")
    .addEventListener("click", function() {

        if (approvedMessageList.length === 0) {
            return;
        }

        currentMessageIndex++;

        if (
            currentMessageIndex >=
            approvedMessageList.length
        ) {
            currentMessageIndex = 0;
        }

        showApprovedMessage();
    });


setInterval(function() {

    if (approvedMessageList.length <= 1) {
        return;
    }

    currentMessageIndex++;

    if (
        currentMessageIndex >=
        approvedMessageList.length
    ) {
        currentMessageIndex = 0;
    }

    showApprovedMessage();

}, 5000);


// CLOSE THE MAIN JAVASCRIPT WRAPPER
})();