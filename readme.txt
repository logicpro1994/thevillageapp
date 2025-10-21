npx create-expo-app@latest ./ --template

npx expo start

https://app.eraser.io/workspace/R2oHagtPXBlqNomUc397

--To Create REACT NATIVE COMPONENTS
rnfe or rnfes

---Install dependencies
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

www.hugeicons.com

npm i react-native-svg


npx expo install @supabase/supabase-js @react-native-async-storage/async-storage @rneui/themed react-native-url-polyfill


create function public.handle_new_user() 
returns trigger 
language plpgsql 
security definer set search_path = public 
as $$ 
begin 
  insert into public.users (id, name, email) 
  values (
    new.id, 
    new.raw_user_meta_data ->> 'name', 
    new.email  -- Changed this line
  ); 
  return new; 
end; 
$$;

create trigger on_auth_user_created 
  after insert on auth.users 
  for each row 
  execute procedure public.handle_new_user();


DROP TRIGGER on_auth_user_created ON auth.users;
DROP FUNCTION public.handle_new_user();


npx expo install expo-image

npx expo install expo-image-picker

npx expo install expo-file-system

npm i base64-arraybuffer