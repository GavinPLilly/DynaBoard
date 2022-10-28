import { createClient } from "@supabase/supabase-js"
const supabaseUrl = 'https://uxugmioardnyredowtry.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

export default async function handler(req, res) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    const {id} = req.query

    let { data: nodedata, error } = await supabase
        .from('node-data')
        .select('id, scenario_id, pnode_name, date, lmp, hour')
        .eq('id', id)

    res.status(200).json(nodedata)
}