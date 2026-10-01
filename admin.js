// =========================
// SUPABASE CONNECTION
// =========================

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

// =========================
// ADMIN LOGIN
// =========================

let loginForm =
    document.getElementById("loginForm");

let loginStatus =
    document.getElementById("loginStatus");

let loginSection =
    document.getElementById("loginSection");

let moderationSection =
    document.getElementById("moderationSection");


loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    let email =
        document.getElementById("adminEmail").value;

    let password =
        document.getElementById("adminPassword").value;


    loginStatus.innerText =
        "Logging in...";


    let result =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });


    if (result.error) {

        loginStatus.innerText =
            "Login failed: " + result.error.message;

        return;
    }


    loginStatus.innerText =
        "Login successful!";


    loginSection.style.display = "none";

    moderationSection.style.display = "block";


    console.log("ADMIN LOGIN SUCCESSFUL");
    loadPendingMessages();

});
// =========================
// LOAD PENDING MESSAGES
// =========================

async function loadPendingMessages() {

    let pendingMessages =
        document.getElementById("pendingMessages");


    pendingMessages.innerHTML =
        "<p>Loading messages...</p>";


    let result =
        await supabaseClient
            .from("guestbook_messages")
            .select("*")
            .eq("status", "pending")
            .order("created_at", {
                ascending: false
            });


    if (result.error) {

    pendingMessages.innerHTML =
        "<p>Error loading messages.</p>";

    console.error(
        "SUPABASE ERROR:",
        result.error
    );

    return;
}


    if (result.data.length === 0) {

        pendingMessages.innerHTML =
            "<p>No pending messages right now.</p>";

        return;
    }


    pendingMessages.innerHTML = "";


    result.data.forEach(function(message) {

        let messageCard =
            document.createElement("div");

        messageCard.className =
            "message-card";


        messageCard.innerHTML = `

            <h3>${message.name}</h3>

            <p>${message.message}</p>

            <button
                onclick="approveMessage('${message.id}')"
            >
                Approve
            </button>

            <button
                onclick="rejectMessage('${message.id}')"
            >
                Reject
            </button>

        `;


        pendingMessages.appendChild(messageCard);

    });

}

// =========================
// APPROVE MESSAGE
// =========================

async function approveMessage(messageId) {

    let result =
        await supabaseClient
            .from("guestbook_messages")
            .update({ status: "approved" })
            .eq("id", messageId);

    if (result.error) {
        console.error(result.error);
        return;
    }

    loadPendingMessages();
}

// =========================
// REJECT MESSAGE
// =========================

async function rejectMessage(messageId) {

    let result =
        await supabaseClient
            .from("guestbook_messages")
            .update({ status: "rejected" })
            .eq("id", messageId);

    if (result.error) {
        console.error(result.error);
        return;
    }

    loadPendingMessages();
}
