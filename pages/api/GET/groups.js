import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://uxugmioardnyredowtry.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
console.log(supabaseKey);

export default async function handler(req, res) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    let { data: groups, error } = await supabase
        .from('groups')
        .select('*')

    res.status(200).json(groups)
}