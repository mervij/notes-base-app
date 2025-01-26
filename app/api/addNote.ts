import { createClient } from '@/utils/supabase/client';

export default async function addNote(title: string, index: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('notes')
    .insert({ name: title, checked: false, type: "task", index: index })
    .select()

  return data?.[0] || null;
}
