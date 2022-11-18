  const number = (value) => (value && !/^[1-9]\d*$/i.test(value) ? 'Bu alanda sadece sayı kullanılabilir' : undefined);
  
  const required = (value) => (value ? undefined : 'Bu alan zorunludur');

  const name_surname = (value) => (value.split(' ').length > 1 ? undefined : 'Lütfen adınızı ve soyadınızı aralarında birer boşluk olacak şekilde giriniz.');

  const char_16 = (value) => (value && value.length  !== 16 ? 'Kart numarası 16 karakter olmalıdır' : undefined);

  const char_3 = (value) => (value && value.length !== 3 ? 'Güvenlik numarası 3 karakter olmalıdır' : undefined);

  const letter = (value) => (value && !/^[a-zA-ZığüşöçİĞÜŞÖÇ a-zA-ZığüşöçİĞÜŞÖÇ]+$/i.test(value) ? 'Bu alanda sadece harf kullanılabilir' : undefined);

  const email = value => (value && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(value) ? 'Geçersiz e-posta adresi' : undefined);
  
  export const rules = {
    required,
    number,
    char_16,
    char_3,
    letter,
    name_surname,
    email
  };
  