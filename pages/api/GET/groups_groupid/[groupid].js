import { createClient } from "@supabase/supabase-js"
const supabaseUrl = 'https://uxugmioardnyredowtry.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

export default async function handler(req, res) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    const {groupid} = req.query

    let { data: groups, error } = await supabase
        .from('groups')
        .select('GROUP_ID, GROUP_NAME')
        .eq('GROUP_ID', groupid)

    res.status(200).json(groups)
}