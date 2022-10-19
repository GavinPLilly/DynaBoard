import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://uxugmioardnyredowtry.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {

    let { data: groups, error } = await supabase
        .from('scenarios')
        .select('*')

    res.status(200).json(groups)
}