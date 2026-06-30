const supabaseUrl = "https://ukhveaepphmzustzdnog.supabase.co";

const supabaseKey = "sb_publishable_GDHVSZOf6R44EI4Q4YoSLg_B9VUeQNb";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

console.log("Supabase Connected");

async function testConnection() {

const { data, error } = await supabaseClient
        .from("comments")
        .select("*");

    console.log(data);

    console.log(error);

}

testConnection();
