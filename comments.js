const supabaseUrl = "https://ukhveaepphmzustzdnog.supabase.co";

const supabaseKey = "sb_publishable_GDHVSZOf6R44EI4Q4YoSLg_B9VUeQNb";

const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

async function testConnection() {

    const { data, error } = await supabase
        .from("comments")
        .select("*");

    console.log(data);

    console.log(error);

}

testConnection();
