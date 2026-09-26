// Adapter contract for a later Supabase-backed sync. No credentials live in this repository.
// Callers must supply a configured Supabase client and authenticated user session.
export function createSupabaseAdapter(client, userId){
  if(!client || !userId)throw new Error('Authenticated Supabase client and user ID required');
  const check=({data,error})=>{if(error)throw error;return data};
  return {
    async listSaves(){return check(await client.from('saves').select('*').eq('user_id',userId).order('created_at',{ascending:false}))},
    async upsertSave(save){return check(await client.from('saves').upsert({...save,user_id:userId}).select().single())},
    async removeSave(id){return check(await client.from('saves').delete().eq('user_id',userId).eq('id',id))},
    async listCollections(){return check(await client.from('collections').select('*').eq('user_id',userId))},
    async upsertCollection(collection){return check(await client.from('collections').upsert({...collection,user_id:userId}).select().single())},
    async getProfile(){return check(await client.from('profiles').select('*').eq('user_id',userId).maybeSingle())},
    async upsertProfile(profile){return check(await client.from('profiles').upsert({...profile,user_id:userId}).select().single())},
  };
}
