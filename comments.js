const supabaseUrl = "https://ukhveaepphmzustzdnog.supabase.co";
const supabaseKey = "sb_publishable_GDHVSZOf6R44EI4Q4YoSLg_B9VUeQNb";

const { createClient } = window.supabase;
const db = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("comment-form");
const commentsList = document.getElementById("comments-list");

async function loadComments() {

    const { data, error } = await db
        .from("comments")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    commentsList.innerHTML = "";

    if (data.length === 0) {
        commentsList.innerHTML = `
            <div class="empty-comments">
                هنوز نظری ثبت نشده است.
            </div>
        `;
        return;
    }

    data.forEach(comment => {

        commentsList.innerHTML += `

        <div class="comment-card">

            <div class="comment-header">

    <div class="comment-user">

        <div class="avatar">

            ${comment.name.charAt(0).toUpperCase()}

        </div>

        <div>

            <div class="comment-name">
                ${comment.name}
            </div>

            <div class="comment-stars">
                ${"★".repeat(comment.rating)}
                ${"☆".repeat(5-comment.rating)}
            </div>

        </div>

    </div>

</div>

            <div class="comment-message">
               ${comment.message.replace(/\n/g,"<br>")}
            </div>

        </div>

        `;

    });
document.querySelectorAll(".comment-card").forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform="translateY(20px)";

    setTimeout(()=>{

        card.style.transition=".5s";

        card.style.opacity="1";

        card.style.transform="translateY(0)";

    },index*120);

});
}

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const rating = Number(document.getElementById("rating").value);

    const message = document.getElementById("message").value.trim();

    const { error } = await db
        .from("comments")
        .insert([{

            name,
            email,
            rating,
            message

        }]);

    if(error){

        alert("خطا در ثبت نظر");

        console.error(error);

        return;

    }

    alert("نظر شما ثبت شد و پس از تایید مدیر نمایش داده خواهد شد.");

    form.reset();

});

loadComments();
