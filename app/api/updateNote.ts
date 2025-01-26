import { createClient } from '@/utils/supabase/client';

export default async function updateNote(id: string, title?: string, checked?: boolean, index?: number) {
  const updatedData: { name?: string, checked?: boolean, index?: number } = {
    name: undefined,
    checked: undefined,
    index: undefined
  };

  const supabase = createClient();

  if (title) {
    updatedData.name = title;
  }

  if (typeof checked === 'boolean') {
    updatedData.checked = checked;
  }

  if (index) {
    updatedData.index = index;
  }

  const { data, error } = await supabase
    .from('notes')
    .update(updatedData)
    .eq('id', id)
    .select()

  return data?.[0] || null;
};
