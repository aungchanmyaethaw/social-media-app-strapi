export function handleDateFormat(string) {
  return new Date(string).toLocaleString();
}

export function slugify(str){
  return str.toLowerCase();
}
